/**
 * ParticleMorph — Indium-style particle system
 *
 * How it works:
 * 1. Each shape is defined as an SVG path string
 * 2. We sample N evenly-spaced points along each path using SVGPathElement.getPointAtLength()
 * 3. Each "particle" has a current position and a target position
 * 4. On morph trigger, target positions update to the next shape's sampled points
 * 5. Particles lerp (ease) toward their targets every animation frame
 * 6. Between morphs, particles drift slightly with noise for a "breathing" live feel
 * 7. The canvas sits over the hero with pointer-events for mouse repulsion
 */

import { useEffect, useRef } from "react";

interface ParticleMorphProps {
  /** SVG path `d` strings — particles will morph through these in sequence */
  shapes: string[];
  /** How many particles per shape */
  particleCount?: number;
  /** Pixel size of each particle dot */
  particleSize?: number;
  /** Primary color (hex) */
  color?: string;
  /** Accent color (hex) */
  accentColor?: string;
  /** Seconds to hold each shape before morphing */
  holdDuration?: number;
  /** Seconds the morph transition takes */
  morphDuration?: number;
  /** Canvas width (logical) */
  width?: number;
  /** Canvas height (logical) */
  height?: number;
  className?: string;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/** Sample `count` evenly-distributed points along an SVG path string */
function samplePath(d: string, count: number, vw: number, vh: number): [number, number][] {
  // We render into an offscreen SVG to use getPointAtLength
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("width", String(vw));
  svg.setAttribute("height", String(vh));
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  document.body.appendChild(svg);

  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", d);
  svg.appendChild(path);

  const total = path.getTotalLength();
  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const pt = path.getPointAtLength((i / count) * total);
    points.push([pt.x, pt.y]);
  }

  document.body.removeChild(svg);
  return points;
}

// ── component ─────────────────────────────────────────────────────────────────

export function ParticleMorph({
  shapes,
  particleCount = 280,
  particleSize = 2.2,
  color = "#00C2FF",
  accentColor = "#0066FF",
  holdDuration = 2.8,
  morphDuration = 1.6,
  width = 600,
  height = 420,
  className = "",
}: ParticleMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Retina
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    // Pre-sample all shape points
    const shapeSamples = shapes.map((d) => samplePath(d, particleCount, width, height));

    // Current particles: each has pos, target, velocity, hue offset
    type P = {
      x: number; y: number;
      tx: number; ty: number;
      vx: number; vy: number;
      phase: number;
      alpha: number;
      accent: boolean;
    };

    let shapeIdx = 0;
    let morphing = false;
    let morphStart = 0;
    let holdStart = performance.now();

    // Initialize at first shape
    const pts0 = shapeSamples[0];
    const particles: P[] = Array.from({ length: particleCount }, (_, i) => {
      const [tx, ty] = pts0[i] ?? [width / 2, height / 2];
      // Start scattered
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      return {
        x: sx, y: sy,
        tx, ty,
        vx: 0, vy: 0,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.6 + Math.random() * 0.4,
        accent: Math.random() < 0.3,
      };
    });

    // Mouse repulsion
    let mx = -9999, my = -9999;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) * (width / rect.width);
      my = (e.clientY - rect.top) * (height / rect.height);
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const c1 = hexToRgb(color);
    const c2 = hexToRgb(accentColor);

    let raf: number;
    const EASE = 0.055;
    const REPULSE_R = 60;
    const DRIFT = 0.8;

    function animate(now: number) {
      raf = requestAnimationFrame(animate);

      // ── Morphing state machine ──
      if (!morphing) {
        if (now - holdStart > holdDuration * 1000) {
          // Start next morph
          morphing = true;
          morphStart = now;
          shapeIdx = (shapeIdx + 1) % shapes.length;
          const nextPts = shapeSamples[shapeIdx];
          particles.forEach((p, i) => {
            const [ntx, nty] = nextPts[i] ?? [width / 2, height / 2];
            p.tx = ntx;
            p.ty = nty;
          });
        }
      } else {
        const progress = (now - morphStart) / (morphDuration * 1000);
        if (progress >= 1) {
          morphing = false;
          holdStart = now;
        }
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        // Spring to target
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * EASE;
        p.vy += dy * EASE;

        // Drift noise (breathing)
        const t = (now * 0.0004 + p.phase);
        p.vx += Math.sin(t * 1.3 + i * 0.1) * DRIFT * 0.015;
        p.vy += Math.cos(t * 0.9 + i * 0.07) * DRIFT * 0.015;

        // Mouse repulse
        const rDx = p.x - mx;
        const rDy = p.y - my;
        const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
        if (rDist < REPULSE_R && rDist > 0) {
          const force = (REPULSE_R - rDist) / REPULSE_R;
          p.vx += (rDx / rDist) * force * 3;
          p.vy += (rDy / rDist) * force * 3;
        }

        // Damping
        p.vx *= 0.84;
        p.vy *= 0.84;

        p.x += p.vx;
        p.y += p.vy;

        // Draw
        const rgb = p.accent ? c2 : c1;
        const alpha = p.alpha * (morphing ? 0.85 : 0.95);

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize * (p.accent ? 0.85 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.fill();

        // Soft glow
        if (!p.accent) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, particleSize * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.06)`;
          ctx.fill();
        }
      });

      // Draw faint lines between very close particles
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const a = particles[i], b = particles[j];
          const dx2 = a.x - b.x, dy2 = a.y - b.y;
          const d2 = dx2 * dx2 + dy2 * dy2;
          if (d2 < 1100) {
            const op = (1 - d2 / 1100) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${c1.r},${c1.g},${c1.b},${op})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [shapes, particleCount, color, accentColor, holdDuration, morphDuration, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ cursor: "crosshair" }}
    />
  );
}
