/**
 * HeroWaveCanvas.tsx
 *
 * A canvas that renders an ambient wave-particle animation
 * scoped to the BOTTOM portion of the hero section only.
 *
 * - Particles drift in slow sine-wave paths along the lower ~35% of the canvas
 * - Very subtle, dim — purely atmospheric, not interactive
 * - Fades out naturally at both left/right edges and top edge
 * - Stops after the last section's shape has formed (canvas is inside hero only,
 *   so it naturally disappears when you scroll past the hero)
 */

import { useEffect, useRef } from "react";

interface Props {
  /** Height of the wave zone as a fraction of canvas height. Default: 0.38 */
  waveZone?: number;
  /** Particle color */
  color?: string;
  /** Number of wave particles */
  count?: number;
}

export function HeroWaveCanvas({ waveZone = 0.38, color = "#00C2FF", count = 120 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Parse color to RGB once
    const hex = color.replace("#", "");
    const cr = parseInt(hex.slice(0, 2), 16);
    const cg = parseInt(hex.slice(2, 4), 16);
    const cb = parseInt(hex.slice(4, 6), 16);

    // Build particles — each lives in the lower waveZone of the canvas
    type WaveParticle = {
      x: number;       // 0–1 normalized x
      baseY: number;   // 0–1 normalized base y (within wave zone)
      phase: number;   // sine wave phase offset
      freq: number;    // sine wave frequency
      amp: number;     // sine wave amplitude (normalized)
      speed: number;   // horizontal drift speed (normalized per frame)
      size: number;    // radius in px
      alpha: number;   // base opacity
    };

    const particles: WaveParticle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      baseY: Math.random(),             // 0=top of wave zone, 1=bottom
      phase: Math.random() * Math.PI * 2,
      freq: 0.8 + Math.random() * 1.4,
      amp: 0.015 + Math.random() * 0.04,
      speed: 0.00015 + Math.random() * 0.0003,
      size: 0.8 + Math.random() * 1.4,
      alpha: 0.15 + Math.random() * 0.35,
    }));

    let raf: number;
    let t = 0;

    function render() {
      raf = requestAnimationFrame(render);
      t += 0.012;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Wave zone starts at (1 - waveZone) from top
      const zoneTop = (1 - waveZone) * H;

      particles.forEach((p) => {
        // Drift horizontally, wrap around
        p.x += p.speed;
        if (p.x > 1) p.x -= 1;

        // Sine wave Y offset
        const waveY = Math.sin(t * p.freq + p.phase + p.x * 4) * p.amp;

        // Screen coords
        const sx = p.x * W;
        const sy = zoneTop + p.baseY * (H - zoneTop) + waveY * H;

        // Fade out at left/right edges (within 8% of edge)
        const edgeFade = Math.min(p.x / 0.08, 1) * Math.min((1 - p.x) / 0.08, 1);
        // Fade in from top of wave zone (top 20% of zone fades in)
        const topFade = Math.min((p.baseY) / 0.20, 1);

        const alpha = p.alpha * edgeFade * topFade;
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      });
    }

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, count, waveZone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
