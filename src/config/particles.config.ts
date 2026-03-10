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
  | "helix" | "grid" | "ring" | "dna" | "wave";

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
  {
    sectionId: "service-analytics",
    label: "Advanced Analytics",
    sublabel: "Real-time intelligence from your data",
    shape: {
      type: "glb",
      modelPath: `${import.meta.env.BASE_URL}models/Ai_Chart.glb`,
      rotationX: -90,  // best guess — may need tweaking
      rotationY: 0,
      rotationZ: 0,
      particleCount: 2000,
      modelScale: 1.0,
      color: "#00C2FF",
      colorFar: "#001133",
      autoRotateY: 0.2,
      showLines: false,
    }
    // shape: {
    //   type: "builtin",
    //   builtinShape: "torus",
    //   color: "#00C2FF",
    //   colorFar: "#0033aa",
    //   particleSize: 1.8,
    //   autoRotateY: 0.20,
    //   initialRotationY: 0,
    //   particleCount: 320,
    //   showLines: false,        // pure particles — no lines
    // },
  },
  {
    sectionId: "service-predictive",
    label: "Predictive Modeling",
    sublabel: "AI-driven forecasting at enterprise scale",
    shape: {
      type: "glb",
      modelPath: `${import.meta.env.BASE_URL}models/watches.glb`,
      rotationX: 45,   // corrects the -45 bake
      rotationY: 0,
      rotationZ: 0,   // corrects the -90 Z bake
      particleCount: 600,
      modelScale: 1.0,
      autoRotateY: 0.3,  // looks great rotating slowly
      color: "#00FFB2",
      colorFar: "#006644",
      particleSize: 1.6,

      initialRotationY: 0,

      showLines: false,

    },
  },
  {
    sectionId: "service-engineering",
    label: "Data Engineering",
    sublabel: "Infrastructure built to scale with you",
    shape: {
      type: "builtin",
      builtinShape: "cube",
      color: "#7B61FF",
      colorFar: "#220066",
      particleSize: 1.7,
      autoRotateY: 0,          // static — no rotation
      initialRotationY: 35,    // locked at this angle permanently
      particleCount: 400,
      showLines: true,
      lineOpacity: 0.12,
    },
  },

  // ── GLB example ────────────────────────────────────────────────────────────
  // Uncomment and fill in modelPath after placing file in /public/models/
  // {
  //   sectionId: "service-yourname",
  //   label: "Your Section",
  //   sublabel: "Your subtitle",
  //   shape: {
  //     type: "glb",
  //     modelPath: "/models/your-model.glb",
  //     rotationX: 0,          // baked rotation during sampling
  //     rotationY: 0,
  //     rotationZ: 0,
  //     modelScale: 1.0,
  //     autoRotateY: 0.15,     // live rotation speed (0 = static)
  //     initialRotationY: 20,  // starting angle
  //     color: "#00C2FF",
  //     colorFar: "#002244",
  //     particleSize: 1.5,
  //     particleCount: 350,
  //     showLines: false,
  //   },
  // },
];
