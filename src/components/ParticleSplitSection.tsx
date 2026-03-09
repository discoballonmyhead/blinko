/**
 * ParticleSplitSection.tsx
 *
 * Each section owns its own canvas. All visual controls come from
 * particles.config.ts — particleCount, showLines, lineOpacity,
 * autoRotateY, initialRotationY are all per-section.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SectionParticleConfig } from "../config/particles.config";
import { particleGlobalConfig } from "../config/particles.config";
import { sampleBuiltin, sampleSVGPath, sampleGLBModel } from "../lib/pointSamplers";
import type { Point3D } from "../lib/pointSamplers";

gsap.registerPlugin(ScrollTrigger);

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function smoothstep(t: number) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

// ── Per-section canvas ────────────────────────────────────────────────────────

interface CanvasProps {
  points: Point3D[];
  color: string;
  colorFar: string;
  particleSize: number;
  /** Degrees per frame. 0 = fully static. */
  autoRotateY: number;
  /** Starting Y angle in degrees — fixes the "wrong angle on load" bug.
   *  When autoRotateY is 0 this is the permanent viewing angle. */
  initialRotationY: number;
  showLines: boolean;
  lineOpacity: number;
  progressRef: React.MutableRefObject<number>;
}

function ShapeCanvas({
  points, color, colorFar, particleSize,
  autoRotateY, initialRotationY,
  showLines, lineOpacity,
  progressRef,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const N = points.length;
    const [r1, g1, b1] = hexToRgb(color);
    const [r2, g2, b2] = hexToRgb(colorFar || "#001133");
    const ease = particleGlobalConfig.lerpSpeed;
    const FOV = 2.8;

    // initialRotationY converted to radians — this is the permanent start angle.
    // autoRotateY accumulates on top of it each frame.
    let rotY = initialRotationY * (Math.PI / 180);

    function resize() {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number; y: number; z: number;
      ox: number; oy: number; oz: number;
      r: number; g: number; b: number;
      alpha: number;
    };
    // Scatter origin — random unit cube, same seed each mount
    const particles: P[] = Array.from({ length: N }, () => {
      const ox = (Math.random() - 0.5) * 2, oy = (Math.random() - 0.5) * 2, oz = (Math.random() - 0.5) * 2;
      return { x: ox, y: oy, z: oz, ox, oy, oz, r: 40, g: 40, b: 60, alpha: 0.08 };
    });

    function project(px: number, py: number, pz: number, W: number, H: number) {
      const depth = pz + 1.5;
      const scale = FOV / Math.max(depth, 0.1);
      return {
        sx: W / 2 + px * scale * Math.min(W, H) * 0.10,
        sy: H / 2 - py * scale * Math.min(W, H) * 0.10,
        scale,
      };
    }

    let raf: number;
    function render() {
      raf = requestAnimationFrame(render);
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const morphP = smoothstep(progressRef.current);
      // Only increment rotation if autoRotateY > 0
      if (autoRotateY !== 0) rotY += autoRotateY * 0.017;
      const cosR = Math.cos(rotY), sinR = Math.sin(rotY);

      particles.forEach((p, i) => {
        const pt = points[i];
        // Rotate target point around Y
        const rx = pt.x * cosR - pt.z * sinR;
        const rz = pt.x * sinR + pt.z * cosR;

        const ttx = lerp(p.ox, rx, morphP);
        const tty = lerp(p.oy, pt.y, morphP);
        const ttz = lerp(p.oz, rz, morphP);

        // Depth-based colour blend
        const df = ((rz + 1) / 2);
        const ttr = lerp(r2, r1, df);
        const ttg = lerp(g2, g1, df);
        const ttb = lerp(b2, b1, df);

        p.x = lerp(p.x, ttx, ease * 2);
        p.y = lerp(p.y, tty, ease * 2);
        p.z = lerp(p.z, ttz, ease * 2);
        p.r = lerp(p.r, ttr, ease);
        p.g = lerp(p.g, ttg, ease);
        p.b = lerp(p.b, ttb, ease);

        const { sx, sy } = project(p.x, p.y, p.z, W, H);
        const { scale } = project(p.x, p.y, p.z, W, H);
        const depthA = Math.max(0.05, Math.min(1, ((p.z + 1.5) / 3) * 0.85 + 0.15));
        const tAlpha = morphP > 0.05 ? 0.45 + depthA * 0.55 : 0.06;
        p.alpha = lerp(p.alpha, tAlpha, 0.06);

        const pr = Math.max(0.4, particleSize * scale * 0.10);
        const cr = Math.round(p.r), cg = Math.round(p.g), cb = Math.round(p.b);

        // Soft glow halo on near particles
        if (depthA > 0.55 && morphP > 0.25) {
          ctx.beginPath();
          ctx.arc(sx, sy, pr * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.alpha * 0.07})`;
          ctx.fill();
        }
        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.alpha})`;
        ctx.fill();
      });

      // Connection lines — only when showLines is true AND shape is assembled
      if (showLines && morphP > 0.45) {
        const maxD = particleGlobalConfig.connectionDistance;
        const maxD2 = maxD * maxD;
        const effOpacity = lineOpacity;
        for (let i = 0; i < particles.length; i += 2) {
          for (let j = i + 2; j < particles.length; j += 2) {
            const a = particles[i], b = particles[j];
            const { sx: ax, sy: ay } = project(a.x, a.y, a.z, W, H);
            const { sx: bx, sy: by } = project(b.x, b.y, b.z, W, H);
            const dx = ax - bx, dy = ay - by, d2 = dx * dx + dy * dy;
            if (d2 < maxD2) {
              const op = (1 - d2 / maxD2) * effOpacity * morphP;
              const mr = Math.round((a.r + b.r) / 2), mg = Math.round((a.g + b.g) / 2), mb = Math.round((a.b + b.b) / 2);
              ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
              ctx.strokeStyle = `rgba(${mr},${mg},${mb},${op})`;
              ctx.lineWidth = 0.4; ctx.stroke();
            }
          }
        }
      }
    }

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // Re-run only when shape data or visual config changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, color, colorFar, particleSize, autoRotateY, initialRotationY, showLines, lineOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface Props {
  config: SectionParticleConfig;
  index: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ParticleSplitSection({ config, index, children, className = "", style }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [points, setPoints] = useState<Point3D[] | null>(null);

  const isEven = index % 2 === 0;
  const { shape } = config;

  // Per-section particle count — falls back to global default
  const particleCount = shape.particleCount ?? particleGlobalConfig.particleCount;

  // Load shape points
  useEffect(() => {
    async function load() {
      const n = particleCount;
      if (shape.type === "builtin" && shape.builtinShape) {
        setPoints(sampleBuiltin(shape.builtinShape, n));
      } else if (shape.type === "svg" && (shape.svgPath || shape.svgPaths)) {
        const paths = shape.svgPaths ?? (shape.svgPath ? [shape.svgPath] : []);
        setPoints(sampleSVGPath(paths.length === 1 ? paths[0] : paths, n, shape.svgViewBox));
      } else if (shape.type === "glb" && shape.modelPath) {
        const pts = await sampleGLBModel(
          shape.modelPath, n,
          shape.rotationX ?? 0, shape.rotationY ?? 0, shape.rotationZ ?? 0,
          shape.modelScale ?? 1.0
        );
        setPoints(pts);
      }
    }
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  // GSAP ScrollTrigger — scrubs progressRef 0→1
  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "top 5%",
      scrub: 1.0,
      onUpdate: (self) => { progressRef.current = self.progress; },
    });

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: isEven ? -28 : 28 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 65%", end: "top 35%", scrub: 0.9 }
        }
      );
    }

    return () => { st.kill(); };
  }, [isEven]);

  return (
    <section
      ref={sectionRef}
      id={config.sectionId}
      className={`relative ${className}`}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", ...style }}
    >
      {/* Colour glow behind shape side */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isEven
          ? `radial-gradient(ellipse 40% 60% at 75% 50%, ${shape.color}0a 0%, transparent 70%)`
          : `radial-gradient(ellipse 40% 60% at 25% 50%, ${shape.color}0a 0%, transparent 70%)`,
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", width: "100%", padding: "80px 64px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
      }}>
        {/* Text side */}
        <div ref={textRef} style={{ order: isEven ? 1 : 2, opacity: 0 }}>

          {children}
        </div>

        {/* Canvas side */}
        <div style={{ order: isEven ? 2 : 1, position: "relative", height: 460 }}>
          {points && (
            <ShapeCanvas
              points={points}
              color={shape.color}
              colorFar={shape.colorFar ?? "#001133"}
              particleSize={shape.particleSize ?? 1.8}
              autoRotateY={shape.autoRotateY ?? 0.15}
              initialRotationY={shape.initialRotationY ?? 0}
              showLines={shape.showLines ?? true}
              lineOpacity={shape.lineOpacity ?? particleGlobalConfig.connectionOpacity}
              progressRef={progressRef}
            />
          )}
          <div style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.18)", fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap",
            pointerEvents: "none",
          }}>
            {config.sublabel}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: "8%", right: "8%", height: 1,
        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
      }} />
    </section>
  );
}
