/**
 * SVG shape paths for particle effects.
 * 
 * ALL paths are designed for a ~1200×700 viewport (full-screen hero).
 * The GSAPParticleScroller samples these paths at runtime using
 * the actual canvas dimensions, so they scale automatically.
 * 
 * HOW TO ADD YOUR OWN SHAPES:
 * 1. Open Figma / Illustrator, set artboard to 1200×700
 * 2. Draw your shape, export as SVG
 * 3. Copy the `d="..."` value from the exported <path> tag
 * 4. Paste it below and add it to the stages array in HomePage.tsx
 * 
 * TIPS:
 * - Simpler paths with fewer anchor points morph more smoothly
 * - Keep shapes roughly centered in the canvas
 * - Closed paths (ending with Z) work best
 */

// ── Full-screen shapes (1200×700 coordinate space) ──────────────────────────

/** Hexagon — data cell / analytics icon */
export const hexagonPath = `
  M 600 120
  L 800 230 L 800 450
  L 600 560 L 400 450
  L 400 230 Z
`;

/** Diamond / insight gem */
export const diamondPath = `
  M 600 110
  L 780 290 L 760 400
  L 600 570 L 440 400
  L 420 290 Z
`;

/** Rising trend arrow */
export const trendArrowPath = `
  M 160 520
  L 280 420 L 360 450 L 480 350
  L 600 300 L 700 240 L 820 180
  L 900 130 L 960 100
  L 960 160 L 900 190 L 820 240
  L 700 300 L 600 360 L 480 410
  L 360 510 L 280 480 L 160 580 Z
`;

/** Circle / data loop */
export const circlePath = `
  M 600 120
  A 260 260 0 1 1 599.9 120
  M 600 180
  A 200 200 0 1 0 600.1 180 Z
`;

/** Bar chart */
export const barChartPath = `
  M 260 560 L 260 380 L 340 380 L 340 560 Z
  M 380 560 L 380 280 L 460 280 L 460 560 Z
  M 500 560 L 500 320 L 580 320 L 580 560 Z
  M 620 560 L 620 200 L 700 200 L 700 560 Z
  M 740 560 L 740 260 L 820 260 L 820 560 Z
  M 860 560 L 860 150 L 940 150 L 940 560 Z
`;

/** Neural network nodes connected */
export const neuralPath = `
  M 180 180 A 40 40 0 1 1 179.9 180
  M 180 350 A 40 40 0 1 1 179.9 350
  M 180 520 A 40 40 0 1 1 179.9 520
  M 600 260 A 40 40 0 1 1 599.9 260
  M 600 440 A 40 40 0 1 1 599.9 440
  M 1020 350 A 40 40 0 1 1 1019.9 350
`;

// ── Particle scroller stages ─────────────────────────────────────────────────

/** Used by GSAPParticleScroller in the hero section */
export const heroScrollStages = [
  {
    label: "Advanced Analytics",
    path: hexagonPath,
    color: "#00C2FF",
  },
  {
    label: "Business Intelligence",
    path: barChartPath,
    color: "#0066FF",
  },
  {
    label: "Predictive Modeling",
    path: trendArrowPath,
    color: "#00FFB2",
  },
  {
    label: "Data Engineering",
    path: circlePath,
    color: "#00C2FF",
  },
];

/** Smaller shapes used in the ParticleMorph widget (right side of hero) */
export const heroMorphShapes = [
  hexagonPath,
  diamondPath,
  trendArrowPath,
  circlePath,
];
