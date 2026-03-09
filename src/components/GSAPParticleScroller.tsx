/**
 * GSAPParticleScroller
 * 
 * The "Indium effect":
 * - The section is PINNED by GSAP ScrollTrigger
 * - While pinned, scroll progress (0→1) is the single source of truth
 * - Particles start scattered, then assemble into shape1 at progress 0.2
 * - At progress 0.5 they scatter again, then reassemble into shape2 at 0.7
 * - At progress 1.0 they scatter to their final resting ambient positions
 * - Canvas renders every frame via requestAnimationFrame
 * - Each particle lerps toward its current target driven by scroll progress
 * 
 * This is 100% scroll-scrubbed — pausing scroll pauses the animation exactly.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ────────────────────────────────────────────────────────────────────

interface ShapeStage {
  /** Label shown while this shape is assembled */
  label: string;
  /** SVG path d string, sampled at runtime */
  path: string;
  /** Accent color for this stage */
  color: string;
}

interface GSAPParticleScrollerProps {
  /** The stages to morph through, in order */
  stages: ShapeStage[];
  /** How many particles (more = denser shape outlines) */
  particleCount?: number;
  /** Background color of canvas */
  bgColor?: string;
  /** Total scroll distance (px) the pin section occupies */
  scrollLength?: number;
  className?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const c = hex.replace("#", "");
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
}

/** Sample `n` points along an SVG path string */
function sampleSVGPath(
  d: string,
  n: number,
  vw: number,
  vh: number
): Array<[number, number]> {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", String(vw));
  svg.setAttribute("height", String(vh));
  svg.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;";
  document.body.appendChild(svg);
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", d);
  svg.appendChild(path);
  const total = path.getTotalLength();
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const pt = path.getPointAtLength((i / n) * total);
    pts.push([pt.x, pt.y]);
  }
  document.body.removeChild(svg);
  return pts;
}

/** Smooth step easing */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

// ── Component ────────────────────────────────────────────────────────────────

export function GSAPParticleScroller({
  stages,
  particleCount = 300,
  bgColor = "#030814",
  scrollLength = 3000,
  className = "",
}: GSAPParticleScrollerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0); // 0→1, driven by ScrollTrigger scrub

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    // ── Resize ──
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    function resize() {
      if (!canvas) return;
      canvas.width = W() * dpr;
      canvas.height = H() * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Sample all shape paths ──
    const shapeSamples = stages.map((s) =>
      sampleSVGPath(s.path, particleCount, W(), H())
    );

    // ── Build particles ──
    // Each particle has: current pos, target pos, scatter pos, color
    type Particle = {
      x: number; y: number;       // current drawn position
      tx: number; ty: number;     // current target
      sx: number; sy: number;     // scatter position (random field)
      color: string;
      alpha: number;
      size: number;
    };

    function makeScatterPos() {
      return [
        (Math.random() - 0.5) * W() * 1.6 + W() / 2,
        (Math.random() - 0.5) * H() * 1.6 + H() / 2,
      ];
    }

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const [sx, sy] = makeScatterPos();
      const stageIdx = i % stages.length;
      return {
        x: sx, y: sy,
        tx: sx, ty: sy,
        sx, sy,
        color: stages[stageIdx].color,
        alpha: 0.5 + Math.random() * 0.5,
        size: 1.5 + Math.random() * 1.5,
      };
    });

    /**
     * Build scroll timeline:
     * 
     * progress 0.00 → 0.15  : scattered (initial ambient)
     * progress 0.15 → 0.35  : assemble into stage[0]
     * progress 0.35 → 0.50  : hold stage[0]
     * progress 0.50 → 0.60  : scatter
     * progress 0.60 → 0.75  : assemble into stage[1]  (if exists)
     * progress 0.75 → 0.85  : hold stage[1]
     * progress 0.85 → 1.00  : scatter to ambient
     * 
     * For N stages, divide progress evenly.
     */

    // Pre-compute breakpoints
    const N = stages.length;
    // Each stage: scatter-in, assemble, hold, then scatter-out for next
    // Layout: [scatter=0.15] [N × (assemble=0.15 + hold=0.1)] [final-scatter=0.10]

    const SCATTER_IN = 0.12;
    const ASSEMBLE = 0.18;
    const HOLD = 0.12;
    const SCATTER_BETWEEN = 0.10;
    // Last stage always scatters out at end

    // Build a simple array of { atProgress, shapeIdx, phase:'scatter'|'shape' }
    type Phase = { start: number; end: number; type: "scatter" | "shape"; shapeIdx: number };
    const phases: Phase[] = [];
    let cursor = 0;

    // Initial scatter
    phases.push({ start: cursor, end: cursor + SCATTER_IN, type: "scatter", shapeIdx: -1 });
    cursor += SCATTER_IN;

    for (let si = 0; si < N; si++) {
      // Assemble
      phases.push({ start: cursor, end: cursor + ASSEMBLE, type: "shape", shapeIdx: si });
      cursor += ASSEMBLE;
      // Hold
      phases.push({ start: cursor, end: cursor + HOLD, type: "shape", shapeIdx: si });
      cursor += HOLD;
      // Scatter before next (or at end)
      if (si < N - 1) {
        phases.push({ start: cursor, end: cursor + SCATTER_BETWEEN, type: "scatter", shapeIdx: si });
        cursor += SCATTER_BETWEEN;
      }
    }
    // Final scatter
    phases.push({ start: cursor, end: 1.0, type: "scatter", shapeIdx: N - 1 });

    // Normalize so phases span 0→1
    // ── Current label ──
    let currentLabel = "";
    const labelEl = wrapper.querySelector(".particle-label") as HTMLElement | null;

    function updateTargets(progress: number) {
      // Find current phase
      let phase = phases[phases.length - 1];
      for (const p of phases) {
        if (progress >= p.start && progress <= p.end) {
          phase = p;
          break;
        }
      }

      const localT = phase.end === phase.start
        ? 1
        : (progress - phase.start) / (phase.end - phase.start);
      const _t = smoothstep(Math.max(0, Math.min(1, localT)));
      void _t;

      if (phase.type === "shape" && phase.shapeIdx >= 0) {
        const pts = shapeSamples[phase.shapeIdx];
        const stageColor = stages[phase.shapeIdx].color;
        // Update label
        if (labelEl && currentLabel !== stages[phase.shapeIdx].label) {
          currentLabel = stages[phase.shapeIdx].label;
          labelEl.style.opacity = "0";
          setTimeout(() => {
            if (labelEl) {
              labelEl.textContent = currentLabel;
              labelEl.style.opacity = "1";
            }
          }, 200);
        }
        particles.forEach((p, i) => {
          const [ptx, pty] = pts[i % pts.length];
          p.tx = ptx;
          p.ty = pty;
          p.color = stageColor;
        });
      } else {
        // scatter
        if (labelEl && phase.shapeIdx >= 0 && localT > 0.5) {
          currentLabel = "";
          labelEl.style.opacity = "0";
        }
        particles.forEach((p) => {
          p.tx = p.sx;
          p.ty = p.sy;
        });
      }
    }

    // ── ScrollTrigger ──
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${scrollLength}`,
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        updateTargets(self.progress);
        const bar = wrapper.querySelector("#particle-scroll-progress") as HTMLElement | null;
        if (bar) bar.style.width = `${self.progress * 100}%`;
      },
    });

    // ── Render loop ──
    let raf: number;
    const EASE = 0.07; // how fast particles chase target (lower = smoother/lazier)

    function render() {
      raf = requestAnimationFrame(render);
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i += 3) {
        for (let j = i + 1; j < particles.length; j += 3) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 2500) { // 50px
            const op = (1 - dist2 / 2500) * 0.1;
            const rgb = hexToRgb(a.color);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${op})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Spring toward target
        p.x += (p.tx - p.x) * EASE;
        p.y += (p.ty - p.y) * EASE;

        const rgb = hexToRgb(p.color);

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.alpha})`;
        ctx.fill();
      });

      // Scroll hint overlay at bottom
      const prog = progressRef.current;
      if (prog < 0.05) {
        ctx.fillStyle = `rgba(255,255,255,${(0.05 - prog) * 10 * 0.4})`;
        ctx.font = "12px DM Sans, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Scroll to explore", w / 2, h - 32);
      }
    }

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, [stages, particleCount, scrollLength]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: bgColor,
        overflow: "hidden",
      }}
    >
      {/* Canvas fills full viewport */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Shape label — fades in/out as shapes assemble */}
      <div
        className="particle-label"
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          transition: "opacity 0.4s ease",
          opacity: 0,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      />

      {/* Scroll progress bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <div
          id="particle-scroll-progress"
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #00C2FF, #0066FF)",
            width: "0%",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
