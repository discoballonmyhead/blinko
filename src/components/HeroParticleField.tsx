/**
 * HeroParticleField.tsx
 *
 * Full-hero ambient particle field — Indium-style.
 *
 * Characteristics:
 *  - Covers the entire hero, not just the bottom strip
 *  - 180–220 tiny dots drifting slowly in independent directions
 *  - No connection lines — pure particles
 *  - Three size tiers: micro (majority), small, accent (few bright ones)
 *  - Subtle depth simulation: slower + dimmer particles feel far away
 *  - Very gentle parallax on mouse move (3–5% shift) — optional
 *  - Edge fade on all four sides so particles blend into page
 *  - Zero dependencies beyond React
 */

import { useEffect, useRef } from "react";

interface Props {
  count?: number;
  /** Primary particle colour */
  color?: string;
  /** Accent colour for the brighter highlight dots */
  accentColor?: string;
  /** 0–1 — global opacity multiplier */
  opacity?: number;
  /** Enable subtle mouse parallax */
  parallax?: boolean;
}

export function HeroParticleField({
  count = 200,
  color = "#00C2FF",
  accentColor = "#ffffff",
  opacity = 1,
  parallax = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    // Parse hex → rgb once
    const hexRgb = (hex: string): [number, number, number] => {
      const h = hex.replace("#", "");
      return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    };
    const [cr, cg, cb] = hexRgb(color);
    const [ar, ag, ab] = hexRgb(accentColor);

    function resize() {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Mouse for parallax
    let mx = 0.5, my = 0.5; // normalised 0–1
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top)  / r.height;
    };
    if (parallax) window.addEventListener("mousemove", onMove);

    // ── Particle definition ──────────────────────────────────────────
    type Tier = "micro" | "small" | "accent";
    interface P {
      x: number; y: number;       // position 0–1 normalised
      vx: number; vy: number;     // velocity per frame (normalised)
      size: number;               // radius in px
      baseAlpha: number;          // peak opacity
      alpha: number;              // current opacity (twinkle)
      twinkleSpeed: number;       // how fast alpha oscillates
      twinklePhase: number;       // phase offset for sine
      depth: number;              // 0=far (dim/slow) → 1=near (bright/fast)
      tier: Tier;
      isAccent: boolean;
      r: number; g: number; b: number; // colour
    }

    // Distribute tiers: 70% micro, 22% small, 8% accent
    const particles: P[] = Array.from({ length: count }, () => {
      const rand = Math.random();
      const tier: Tier = rand < 0.70 ? "micro" : rand < 0.92 ? "small" : "accent";
      const isAccent = tier === "accent";
      const depth = Math.random(); // 0=far, 1=near

      // Size by tier
      const size =
        tier === "micro"  ? 0.6 + Math.random() * 0.8 :
        tier === "small"  ? 1.2 + Math.random() * 0.9 :
                            1.8 + Math.random() * 1.2;

      // Speed: near particles faster, far slower
      const speed = (0.00006 + depth * 0.00012) * (tier === "micro" ? 0.7 : 1);
      const angle = Math.random() * Math.PI * 2;

      // Accent dots use the accent colour, others use primary
      const [pr, pg, pb] = isAccent
        ? [ar, ag, ab]
        : [cr, cg, cb];

      // Opacity: micro are dim, accents are bright
      const baseAlpha =
        tier === "micro"  ? (0.08 + depth * 0.14) :
        tier === "small"  ? (0.15 + depth * 0.20) :
                            (0.35 + depth * 0.30);

      return {
        x: Math.random(), y: Math.random(),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size, baseAlpha, alpha: baseAlpha * Math.random(),
        twinkleSpeed: 0.004 + Math.random() * 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
        depth, tier, isAccent,
        r: pr, g: pg, b: pb,
      };
    });

    // Parallax depth multipliers: far particles barely move, near ones shift more
    // max parallax offset = 4% of canvas in each direction
    const PARALLAX_STRENGTH = 0.04;

    let raf: number;
    let t = 0;

    function render() {
      raf = requestAnimationFrame(render);
      t += 1;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Parallax offset for this frame (smooth lerp toward mouse)
      const px = parallax ? (mx - 0.5) * PARALLAX_STRENGTH : 0;
      const py = parallax ? (my - 0.5) * PARALLAX_STRENGTH : 0;

      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around edges (seamless)
        if (p.x < -0.02) p.x += 1.04;
        if (p.x >  1.02) p.x -= 1.04;
        if (p.y < -0.02) p.y += 1.04;
        if (p.y >  1.02) p.y -= 1.04;

        // Twinkle — slow sine on alpha
        p.alpha = p.baseAlpha * (0.55 + 0.45 * Math.sin(t * p.twinkleSpeed + p.twinklePhase));

        // Parallax shift: near particles move more
        const ox = p.x + px * p.depth;
        const oy = p.y + py * p.depth;

        const sx = ox * W;
        const sy = oy * H;

        // 4-sided edge fade — fade in over 6% from each edge
        const edgeFade =
          Math.min(ox / 0.06, 1) *
          Math.min((1 - ox) / 0.06, 1) *
          Math.min(oy / 0.06, 1) *
          Math.min((1 - oy) / 0.06, 1);

        const alpha = p.alpha * edgeFade * opacity;
        if (alpha < 0.005) continue;

        // Soft glow for accent and near-small dots
        if (p.isAccent || (p.tier === "small" && p.depth > 0.65)) {
          ctx.beginPath();
          ctx.arc(sx, sy, p.size * 3.5, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, p.size * 3.5);
          grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${alpha * 0.18})`);
          grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.fill();
      }
    }

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (parallax) window.removeEventListener("mousemove", onMove);
    };
  }, [color, accentColor, count, opacity, parallax]);

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
