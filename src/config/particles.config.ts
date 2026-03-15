/**

 *  BLINKO ANALYTICS — PARTICLE SYSTEM CONFIG

 *
* PER-SECTION SHAPE CONTROLS 
 *  autoRotateY   Degrees added per frame on the Y axis.
 *                  0        = completely static — no rotation at all
 *                  0.10     = slow drift
 *                  0.20     = medium (default)
 *                  0.40     = fast spin
 *
 *  initialRotationY  Starting Y angle in degrees before any autoRotate.
 *                    Fixes the "stuck at wrong angle on load" problem.
 *                    If autoRotateY is 0 this is the permanent viewing angle.
 *                      0    = front face
 *                      45   = 45° turned right
 *                      -30  = 30° turned left
 *
 *  particleCount   How many particles to render for THIS section.
 *                  Overrides the global default (380).
 *                  More = denser/heavier shape. Less = airy/sparse.
 *                    150–250  = sparse, Indium-style
 *                    300–400  = medium density
 *                    500–700  = very dense
 *
 *  showLines     Whether to draw connection lines between nearby particles.
 *                  true  = lines drawn (default)
 *                  false = pure particles only — clean Indium-style look
 *
 *  lineOpacity   Opacity of connection lines when showLines is true (0–1).
 *                  0.05  = barely visible
 *                  0.15  = subtle (default)
 *                  0.4   = prominent
 *
 * ── SHAPE TYPES ─────────────────────────────────────────────────────
 *  "builtin" → procedural 3D (sphere, torus, cube, cylinder, cone,
 *              helix, grid, ring, dna, wave)
 *  "svg"     → sample points along an SVG path d="" string
 *  "glb"     → load a .glb model from /public/models/
 *
 * ── GLB SETUP ───────────────────────────────────────────────────────
 *  1. Place file in /public/models/your-model.glb
 *  2. Set type:"glb", modelPath:"/models/your-model.glb"
 *  3. Tune rotationX/Y/Z (initial bake-in rotation), modelScale, autoRotateY
 *  Free models: sketchfab.com, poly.pizza, market.pmnd.rs
 *  Optimize first at gltf.report (aim for <4000 faces)
 */

export type ShapeType = "builtin" | "svg" | "glb";
export type BuiltinShape =
  | "sphere" | "torus" | "cube" | "cylinder" | "cone"
  | "helix" | "grid" | "ring" | "dna" | "wave"
  | "network" | "piechart" | "scatter" | "boxplot"
  | "neural" | "eye";

export interface ParticleShapeConfig {
  type: ShapeType;

  // ── builtin ───────────────────────────────────────────────────────
  builtinShape?: BuiltinShape;

  // ── svg ───────────────────────────────────────────────────────────
  /** Single path d="" string */
  svgPath?: string;
  /** Multiple paths — pass as array, points distributed by path length */
  svgPaths?: string[];
  /** The SVG's viewBox dimensions e.g. "0 0 80 80". Default "0 0 600 400" */
  svgViewBox?: string;

  // ── glb ───────────────────────────────────────────────────────────
  modelPath?: string;
  /** Baked-in rotation applied during mesh sampling (degrees) */
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  modelScale?: number;

  // ── rotation ──────────────────────────────────────────────────────
  /** Degrees per frame on Y axis. 0 = completely static. */
  autoRotateY?: number;
  /** Starting Y angle in degrees. Use this when autoRotateY is 0
   *  to lock the shape at a specific viewing angle. */
  initialRotationY?: number;

  // ── appearance ────────────────────────────────────────────────────
  color: string;
  colorFar?: string;
  particleSize?: number;

  // ── particle count ────────────────────────────────────────────────
  /** Overrides the global particleCount for this section only.
   *  Lower = sparser/faster. Higher = denser. Default: 380 */
  particleCount?: number;

  // ── connection lines ──────────────────────────────────────────────
  /** Draw lines between nearby particles. Default: true */
  showLines?: boolean;
  /** Opacity of connection lines (0–1). Default: 0.10 */
  lineOpacity?: number;

  // ── morphing ────────────────────────────────────────────────────
  /** Array of builtin shapes to auto-cycle between.
   *  When set, particles morph through these shapes in a loop.
   *  holdSeconds: time to hold each shape (default 2.5s)
   *  morphSeconds: transition duration (default 1.5s) */
  morphTargets?: BuiltinShape[];
  morphHoldSeconds?: number;
  morphTransitionSeconds?: number;
}

export interface SectionParticleConfig {
  sectionId: string;
  label: string;
  sublabel?: string;
  shape: ParticleShapeConfig;
  triggerStart?: string;
}

export const particleGlobalConfig = {
  /** Default particle count — overridden per-section via shape.particleCount */
  particleCount: 380,
  lerpSpeed: 0.06,
  /** Global connection distance in px — lines only draw within this radius */
  connectionDistance: 55,
  /** Global line opacity — overridden per-section via shape.lineOpacity */
  connectionOpacity: 0.10,
  bgColor: "#020912",
  scrubAmount: 1.2,
};

// ── SECTION CONFIGS ───────────────────────────────────────────────────────────
// index 0 → text LEFT  / shape RIGHT
// index 1 → text RIGHT / shape LEFT
// index 2 → text LEFT  / shape RIGHT  ...

export const sectionParticles: SectionParticleConfig[] = [
  // ── Blink Analytics: morphing chart types — pie → scatter → boxplot
  {
    sectionId: "service-analytics",
    label: "Blink Analytics",
    sublabel: "Statistical analysis, reporting & dashboards",
    shape: {
      type: "builtin",
      builtinShape: "boxplot",
      color: "#00C2FF",
      colorFar: "#002244",
      particleSize: 1.2,
      autoRotateY: 0.12,
      initialRotationY: 0,
      particleCount: 400,
      showLines: false,
    },
  },
  // ── Blink Intelligence: grid → cube → wave (raw data → structure → predictions)
  {
    sectionId: "service-intelligence",
    label: "Blink Intelligence",
    sublabel: "Custom platforms, pipelines & predictive modeling",
    shape: {
      type: "builtin",
      builtinShape: "dna",
      color: "#00FFB2",
      colorFar: "#004D33",
      particleSize: 1.3,
      autoRotateY: 0.15,
      initialRotationY: 0,
      particleCount: 400,
      showLines: true,
      lineOpacity: 0.14,
    },
  },
  // ── Blink AI: network → sphere (neural net) → dna (learning patterns)
  {
    sectionId: "service-ai",
    label: "Blink AI",
    sublabel: "AI-powered insights & anomaly detection",
    shape: {
      type: "builtin",
      builtinShape: "network",
      color: "#7B61FF",
      colorFar: "#1A0044",
      particleSize: 1.2,
      autoRotateY: 0.10,
      initialRotationY: 0,
      particleCount: 320,
      showLines: true,
      lineOpacity: 0.20,
    },
  },
];
