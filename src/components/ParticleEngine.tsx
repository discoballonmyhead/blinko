/**
 * ParticleEngine.tsx
 *
 * Core rendering engine for 3D particle shape morphing.
 * Used by ParticleSplitSection for per-section shapes only.
 *
 * NO star background here — stars were removed.
 * The hero uses HeroWaveCanvas for its wave animation.
 * The AnimatedGridPattern handles the persistent tilted grid.
 */

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Point3D } from "../lib/pointSamplers";
import { particleGlobalConfig } from "../config/particles.config";

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ParticleTarget {
  points: Point3D[];
  color: string;
  colorFar: string;
  particleSize: number;
  /** Which horizontal side to render on (0=centered, -1=left half, 1=right half) */
  side: -1 | 0 | 1;
  autoRotateY: number;
}

export interface ParticleEngineHandle {
  setTarget: (target: ParticleTarget | null, progress?: number) => void;
  setScrollProgress: (p: number) => void;
}

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const c = hex.replace("#", "").replace(/^([0-9a-f]{3})$/, "$1$1$1$1$1$1");
  return [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)] as const;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function smoothstep(t: number) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

// ── Component ─────────────────────────────────────────────────────────────────

export const ParticleEngine = forwardRef<ParticleEngineHandle, Props>(function ParticleEngine({ className, style }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    // Particles
    particles: [] as Array<{
      x: number; y: number; z: number;
      tx: number; ty: number; tz: number;
      ox: number; oy: number; oz: number;
      r: number; g: number; b: number;
      tr: number; tg: number; tb: number;
      size: number; tsize: number;
      alpha: number;
    }>,
    // State
    target: null as ParticleTarget | null,
    side: 0 as -1 | 0 | 1,
    rotY: 0,
    autoRotateY: 0,
    morphProgress: 0, // 0=scattered, 1=fully assembled
    initialized: false,
  });

  useImperativeHandle(ref, () => ({
    setTarget(target, _progress) {
      const state = stateRef.current;
      state.target = target;
      state.side = target?.side ?? 0;
      state.autoRotateY = target?.autoRotateY ?? 0;
      if (!target) {
        state.morphProgress = 0;
      }
    },
    setScrollProgress(p: number) {
      stateRef.current.morphProgress = p;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const state = stateRef.current;
    const N = particleGlobalConfig.particleCount;

    // ── Resize ──
    function resize() {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── Particles ──
    function initParticles() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const [r, g, b] = hexToRgb("#00C2FF");
      state.particles = Array.from({ length: N }, () => {
        const ox = (Math.random() - 0.5) * 2;
        const oy = (Math.random() - 0.5) * 2;
        const oz = (Math.random() - 0.5) * 2;
        return {
          x: ox, y: oy, z: oz,
          tx: ox, ty: oy, tz: oz,
          ox, oy, oz,
          r, g, b, tr: r, tg: g, tb: b,
          size: 1.5, tsize: 1.5,
          alpha: 0.1 + Math.random() * 0.3,
        };
      });
      state.initialized = true;
      void W; void H;
    }

    resize();
    initParticles();
    window.addEventListener("resize", resize);

    // ── 3D → 2D projection ──
    const FOV = 2.8; // perspective field of view factor

    function project(px: number, py: number, pz: number, W: number, H: number, side: -1 | 0 | 1) {
      const depth = pz + 1.5; // shift so depth > 0
      const scale = FOV / depth;

      // Center X based on side layout
      let cx = W / 2;
      if (side === 1) cx = W * 0.72;
      if (side === -1) cx = W * 0.28;

      const cy = H / 2;
      const sx = cx + px * scale * Math.min(W, H) * 0.32;
      const sy = cy - py * scale * Math.min(W, H) * 0.32;
      return { sx, sy, scale };
    }

    // ── Render loop ──
    let raf: number;
    let frame = 0;

    function render() {
      raf = requestAnimationFrame(render);
      frame++;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // ── Update and draw particles ──
      const target = state.target;
      const morphP = smoothstep(Math.max(0, Math.min(1, state.morphProgress)));
      const ease = particleGlobalConfig.lerpSpeed;

      // Auto-rotate the shape
      if (state.autoRotateY !== 0) {
        state.rotY += state.autoRotateY * 0.017; // convert deg/frame to rad
      }

      const cosR = Math.cos(state.rotY);
      const sinR = Math.sin(state.rotY);

      state.particles.forEach((p, i) => {
        // Determine target position
        let ttx = p.ox, tty = p.oy, ttz = p.oz;
        let ttr = 50, ttg = 50, ttb = 80; // scatter color (dim blue-grey)

        if (target && morphP > 0) {
          const pts = target.points;
          const pt = pts[i % pts.length];

          // Rotate around Y axis
          const rx = pt.x * cosR - pt.z * sinR;
          const rz = pt.x * sinR + pt.z * cosR;

          ttx = lerp(p.ox, rx, morphP);
          tty = lerp(p.oy, pt.y, morphP);
          ttz = lerp(p.oz, rz, morphP);

          // Color: interpolate near/far based on z depth
          const depthFactor = (rz + 1) / 2; // 0=far, 1=near
          const [r1, g1, b1] = hexToRgb(target.color);
          const [r2, g2, b2] = hexToRgb(target.colorFar || "#001133");
          ttr = lerp(r2, r1, depthFactor);
          ttg = lerp(g2, g1, depthFactor);
          ttb = lerp(b2, b1, depthFactor);
        }

        // Spring toward target
        p.tx += (ttx - p.tx) * ease;
        p.ty += (tty - p.ty) * ease;
        p.tz += (ttz - p.tz) * ease;
        p.r  += (ttr  - p.r)  * ease;
        p.g  += (ttg  - p.g)  * ease;
        p.b  += (ttb  - p.b)  * ease;

        p.x = lerp(p.x, p.tx, ease * 2);
        p.y = lerp(p.y, p.ty, ease * 2);
        p.z = lerp(p.z, p.tz, ease * 2);

        // Project to screen
        const side = state.side;
        const { sx, sy, scale } = project(p.x, p.y, p.z, W, H, side);

        // Depth-based alpha: near particles brighter
        const depth = (p.z + 1.5);
        const depthAlpha = Math.max(0.05, Math.min(1, (depth / 3) * 0.8 + 0.15));
        const targetAlpha = target ? 0.55 + depthAlpha * 0.45 : 0.15 + Math.random() * 0.05;
        p.alpha = lerp(p.alpha, targetAlpha, 0.05);

        const pr = Math.max(0.3, (target?.particleSize ?? 1.5) * scale * 0.4);
        const cr = Math.round(p.r), cg = Math.round(p.g), cb = Math.round(p.b);

        // Glow for near/bright particles
        if (depthAlpha > 0.5 && morphP > 0.3) {
          ctx.beginPath();
          ctx.arc(sx, sy, pr * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.alpha * 0.08})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.alpha})`;
        ctx.fill();
      });

      // ── Connections (only when assembled) ──
      if (morphP > 0.5) {
        const maxDist = particleGlobalConfig.connectionDistance;
        const maxDist2 = maxDist * maxDist;
        const side = state.side;

        for (let i = 0; i < state.particles.length; i += 2) {
          for (let j = i + 2; j < state.particles.length; j += 2) {
            const a = state.particles[i], b = state.particles[j];
            const { sx: ax, sy: ay } = project(a.x, a.y, a.z, W, H, side);
            const { sx: bx, sy: by } = project(b.x, b.y, b.z, W, H, side);
            const dx = ax - bx, dy = ay - by;
            const d2 = dx * dx + dy * dy;
            if (d2 < maxDist2) {
              const op = (1 - d2 / maxDist2) * particleGlobalConfig.connectionOpacity * morphP;
              const cr = Math.round((a.r + b.r) / 2);
              const cg = Math.round((a.g + b.g) / 2);
              const cb2 = Math.round((a.b + b.b) / 2);
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.strokeStyle = `rgba(${cr},${cg},${cb2},${op})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }
    }

    render();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
});
