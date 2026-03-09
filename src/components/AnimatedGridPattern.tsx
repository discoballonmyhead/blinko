/**
 * AnimatedGridPattern — framer-motion removed, pure CSS keyframe animation.
 * Squares fade in/out via CSS animation — zero JS animation overhead.
 */
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { gridConfig } from "../config/grid.config";

interface AnimatedGridPatternProps {
  width?: number; height?: number; x?: number; y?: number;
  strokeDasharray?: number | string; numSquares?: number; className?: string;
  maxOpacity?: number; duration?: number; repeatDelay?: number;
  tiltX?: number; tiltY?: number; tiltZ?: number; perspective?: number;
  customCellPath?: string; cellPathViewBox?: string;
}

export function AnimatedGridPattern({
  width = gridConfig.cellSize, height = gridConfig.cellSize, x = -1, y = -1,
  strokeDasharray = gridConfig.strokeDasharray, numSquares = gridConfig.numSquares,
  className, maxOpacity = gridConfig.maxOpacity, duration = gridConfig.duration,
  repeatDelay = gridConfig.repeatDelay,
  tiltX = gridConfig.tiltX, tiltY = gridConfig.tiltY,
  tiltZ = gridConfig.tiltZ, perspective = gridConfig.perspective,
  customCellPath, cellPathViewBox = "0 0 40 40",
}: AnimatedGridPatternProps) {
  const id = useId();
  const maskId = `${id}-mask`;
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<{ id: number; pos: [number, number]; delay: number }[]>([]);

  function getPos(): [number, number] {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    setSquares(Array.from({ length: numSquares }, (_, i) => ({
      id: i, pos: [
        Math.floor((Math.random() * dimensions.width) / width),
        Math.floor((Math.random() * dimensions.height) / height),
      ] as [number, number],
      delay: i * (duration / numSquares),
    })));
  }, [dimensions, numSquares, width, height, duration]);

  // Hop each square to a new position when its CSS animation iteration ends
  const handleAnimEnd = (sqId: number) => {
    setSquares(cur => cur.map(sq =>
      sq.id === sqId ? { ...sq, pos: getPos(), delay: 0 } : sq
    ));
  };

  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      for (const e of entries)
        setDimensions({ width: e.contentRect.width, height: e.contentRect.height });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { if (containerRef.current) ro.unobserve(containerRef.current); };
  }, []);

  const tiltTransform = [
    tiltX !== 0 ? `rotateX(${tiltX}deg)` : "",
    tiltY !== 0 ? `rotateY(${tiltY}deg)` : "",
    tiltZ !== 0 ? `rotateZ(${tiltZ}deg)` : "",
  ].filter(Boolean).join(" ") || "none";

  const strokeRgb = gridConfig.strokeColor.replace(
    /rgba?\(([^)]+)\)/,
    (_, p) => { const v = p.split(",").map((s: string) => s.trim()); return `rgba(${v[0]},${v[1]},${v[2]},${gridConfig.strokeOpacity})`; }
  );

  const useMask = gridConfig.fadeBottom || gridConfig.fadeSides;
  const animDuration = `${duration + repeatDelay}s`;

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes grid-sq-pulse {
          0%,100% { opacity: 0; }
          40%,60% { opacity: ${maxOpacity}; }
        }
      `}</style>
      <div aria-hidden="true" style={{ position:"absolute", inset:0, perspective:`${perspective}px`, perspectiveOrigin:"50% 0%", pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:"-25% -15%", transform:tiltTransform, transformOrigin:"50% 40%" }}>
          <svg ref={containerRef} aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
            style={{ fill: gridConfig.squareColor, stroke: strokeRgb }}>
            <defs>
              <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                {customCellPath
                  ? <svg viewBox={cellPathViewBox} width={width} height={height}><path d={customCellPath} fill="none" /></svg>
                  : <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />}
              </pattern>
              {useMask && (
                <mask id={maskId}>
                  <defs>
                    <linearGradient id={`${id}-fb`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="65%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={`${id}-fs`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="10%" stopColor="white" stopOpacity="1" />
                      <stop offset="90%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill={gridConfig.fadeBottom ? `url(#${id}-fb)` : "white"} />
                  {gridConfig.fadeSides && <rect width="100%" height="100%" fill={`url(#${id}-fs)`} style={{ mixBlendMode:"multiply" }} />}
                </mask>
              )}
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} mask={useMask ? `url(#${maskId})` : undefined} />
            <svg x={x} y={y} style={{ overflow:"visible" }}>
              {squares.map(({ pos: [sx, sy], id: sqId, delay }) => (
                <rect
                  key={sqId}
                  width={width - 1} height={height - 1}
                  x={sx * width + 1} y={sy * height + 1}
                  fill="currentColor" strokeWidth={0}
                  mask={useMask ? `url(#${maskId})` : undefined}
                  style={{
                    animation: `grid-sq-pulse ${animDuration} ${delay}s ease-in-out infinite`,
                    opacity: 0,
                  }}
                  onAnimationIteration={() => handleAnimEnd(sqId)}
                />
              ))}
            </svg>
          </svg>
        </div>
      </div>
    </>
  );
}
