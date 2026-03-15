/**
 * pointSamplers.ts
 *
 * Generates Point3D[] from three sources:
 *   1. Builtin procedural 3D shapes  (pure math, instant)
 *   2. SVG paths                      (DOM API, instant)
 *   3. GLB/GLTF 3D models            (Three.js, loaded lazily on demand)
 *
 * Three.js is dynamically imported only when sampleGLBModel() is called,
 * so builtin/svg users pay zero Three.js load cost.
 */

import type { BuiltinShape } from "../config/particles.config";

export interface Point3D { x: number; y: number; z: number; }

// ── BUILTIN SHAPES ────────────────────────────────────────────────────────────

export function sampleBuiltin(shape: BuiltinShape, n: number): Point3D[] {
  switch (shape) {
    case "sphere": return sampleSphere(n);
    case "torus": return sampleTorus(n);
    case "cube": return sampleCube(n);
    case "cylinder": return sampleCylinder(n);
    case "cone": return sampleCone(n);
    case "helix": return sampleHelix(n);
    case "grid": return sampleGrid(n);
    case "ring": return sampleRing(n);
    case "dna": return sampleDNA(n);
    case "wave": return sampleWave(n);
    case "network": return sampleNetwork(n);
    case "piechart": return samplePieChart(n);
    case "scatter": return sampleScatter(n);
    case "boxplot": return sampleBoxplot(n);
    case "neural": return sampleNeural(n);
    case "eye": return sampleEye(n);
    default: return sampleSphere(n);
  }
}

function sampleSphere(n: number): Point3D[] {
  return Array.from({ length: n }, (_, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 0.90 + Math.random() * 0.10;
    return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.cos(phi), z: r * Math.sin(phi) * Math.sin(theta) };
  });
}
function sampleTorus(n: number): Point3D[] {
  const R = 0.65, r = 0.28;
  return Array.from({ length: n }, () => {
    const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
    return { x: (R + r * Math.cos(v)) * Math.cos(u), y: r * Math.sin(v), z: (R + r * Math.cos(v)) * Math.sin(u) };
  });
}
function sampleCube(n: number): Point3D[] {
  return Array.from({ length: n }, () => {
    const face = Math.floor(Math.random() * 6);
    const u = (Math.random() - 0.5) * 2, v = (Math.random() - 0.5) * 2, d = 0.85;
    const faces: Point3D[] = [
      { x: d, y: u, z: v }, { x: -d, y: u, z: v },
      { y: d, x: u, z: v }, { y: -d, x: u, z: v },
      { z: d, x: u, y: v }, { z: -d, x: u, y: v },
    ];
    return faces[face];
  });
}
function sampleCylinder(n: number): Point3D[] {
  return Array.from({ length: n }, () => {
    const t = Math.random(), theta = Math.random() * Math.PI * 2, r = 0.7;
    if (t < 0.65) return { x: r * Math.cos(theta), y: (Math.random() - 0.5) * 1.8, z: r * Math.sin(theta) };
    const cr = Math.random() * r, yy = t < 0.82 ? 0.9 : -0.9;
    return { x: cr * Math.cos(theta), y: yy, z: cr * Math.sin(theta) };
  });
}
function sampleCone(n: number): Point3D[] {
  return Array.from({ length: n }, () => {
    const y = Math.random() * 1.8 - 0.9, r = ((y + 0.9) / 1.8) * 0.75, theta = Math.random() * Math.PI * 2;
    return { x: r * Math.cos(theta), y: -y, z: r * Math.sin(theta) };
  });
}
function sampleHelix(n: number): Point3D[] {
  const turns = 3, r = 0.5;
  return Array.from({ length: n }, (_, i) => {
    const strand = i % 2, t = (i / n) * turns * Math.PI * 2, noise = (Math.random() - 0.5) * 0.07;
    return { x: (r + noise) * Math.cos(t + strand * Math.PI), y: (i / n) * 1.8 - 0.9, z: (r + noise) * Math.sin(t + strand * Math.PI) };
  });
}
function sampleGrid(n: number): Point3D[] {
  const side = Math.ceil(Math.sqrt(n));
  return Array.from({ length: n }, (_, i) => ({
    x: (i % side) / side * 1.8 - 0.9,
    y: Math.floor(i / side) / side * 1.8 - 0.9,
    z: (Math.random() - 0.5) * 0.12,
  }));
}
function sampleRing(n: number): Point3D[] {
  return Array.from({ length: n }, (_, i) => {
    const r = 0.55 + (i % 3) * 0.15, theta = Math.random() * Math.PI * 2;
    return { x: r * Math.cos(theta), y: (Math.random() - 0.5) * 0.15, z: r * Math.sin(theta) };
  });
}
function sampleDNA(n: number): Point3D[] {
  const turns = 4, r = 0.45;
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * turns * Math.PI * 2, y = (i / n) * 1.8 - 0.9, mod = i % 12;
    if (mod < 5) return { x: r * Math.cos(t), y, z: r * Math.sin(t) };
    if (mod < 10) return { x: r * Math.cos(t + Math.PI), y, z: r * Math.sin(t + Math.PI) };
    const frac = (mod - 10) / 2;
    const ax = r * Math.cos(t), az = r * Math.sin(t), bx = r * Math.cos(t + Math.PI), bz = r * Math.sin(t + Math.PI);
    return { x: ax + (bx - ax) * frac, y, z: az + (bz - az) * frac };
  });
}
function sampleWave(n: number): Point3D[] {
  const cols = Math.ceil(Math.sqrt(n * 2)), rows = Math.ceil(n / cols);
  const pts: Point3D[] = [];
  for (let r = 0; r < rows && pts.length < n; r++)
    for (let c = 0; c < cols && pts.length < n; c++) {
      const x = (c / cols) * 1.8 - 0.9, z = (r / rows) * 1.8 - 0.9;
      pts.push({ x, y: 0.3 * Math.sin(x * 4 + z * 3) * Math.cos(z * 2), z });
    }
  return pts;
}

// ── NETWORK GRAPH ─────────────────────────────────────────────────────────────
// Clustered nodes with hub-spoke layout — looks like a social network / knowledge graph

function sampleNetwork(n: number): Point3D[] {
  const clusterCount = 6;
  const pts: Point3D[] = [];

  // Generate cluster centers spread across the volume
  const centers: Point3D[] = [];
  for (let c = 0; c < clusterCount; c++) {
    const phi = Math.acos(1 - 2 * (c + 0.5) / clusterCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * c;
    const r = 0.55 + Math.random() * 0.25;
    centers.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta),
    });
  }

  // Place hub node at each cluster center
  for (const c of centers) {
    pts.push({ x: c.x, y: c.y, z: c.z });
  }

  // Distribute remaining particles around cluster centers with varying spread
  const remaining = n - clusterCount;
  for (let i = 0; i < remaining; i++) {
    const cluster = centers[i % clusterCount];
    const spread = 0.12 + Math.random() * 0.22;
    // Random direction
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = spread * Math.cbrt(Math.random()); // cube root for uniform volume
    pts.push({
      x: cluster.x + r * Math.sin(phi) * Math.cos(theta),
      y: cluster.y + r * Math.cos(phi),
      z: cluster.z + r * Math.sin(phi) * Math.sin(theta),
    });
  }

  // Add a few "bridge" nodes between clusters for inter-cluster connections
  const bridgeCount = Math.floor(n * 0.08);
  for (let i = 0; i < bridgeCount && pts.length < n + bridgeCount; i++) {
    const c1 = centers[Math.floor(Math.random() * clusterCount)];
    const c2 = centers[Math.floor(Math.random() * clusterCount)];
    const t = 0.3 + Math.random() * 0.4;
    pts.push({
      x: c1.x + (c2.x - c1.x) * t + (Math.random() - 0.5) * 0.06,
      y: c1.y + (c2.y - c1.y) * t + (Math.random() - 0.5) * 0.06,
      z: c1.z + (c2.z - c1.z) * t + (Math.random() - 0.5) * 0.06,
    });
  }

  return pts.slice(0, n);
}

// ── CHART SHAPES (for morphing analytics) ─────────────────────────────────────

function samplePieChart(n: number): Point3D[] {
  const pts: Point3D[] = [];
  // Pie with 5 slices of varying sizes
  const slices = [0.28, 0.22, 0.20, 0.17, 0.13];
  const R = 0.75;
  let startAngle = 0;

  // Points along the outer rim and slice dividers
  const rimPoints = Math.floor(n * 0.55);
  const fillPoints = n - rimPoints;

  // Outer rim
  for (let i = 0; i < rimPoints; i++) {
    const angle = (i / rimPoints) * Math.PI * 2;
    pts.push({
      x: R * Math.cos(angle),
      y: R * Math.sin(angle),
      z: (Math.random() - 0.5) * 0.06,
    });
  }

  // Slice divider lines (spokes from center to rim)
  startAngle = 0;
  const spokePoints = Math.floor(fillPoints * 0.3);
  for (let s = 0; s < slices.length; s++) {
    const angle = startAngle;
    const pointsPerSpoke = Math.floor(spokePoints / slices.length);
    for (let i = 0; i < pointsPerSpoke; i++) {
      const r = (i / pointsPerSpoke) * R;
      pts.push({
        x: r * Math.cos(angle),
        y: r * Math.sin(angle),
        z: (Math.random() - 0.5) * 0.06,
      });
    }
    startAngle += slices[s] * Math.PI * 2;
  }

  // Fill remaining with scattered points inside slices
  while (pts.length < n) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * R * 0.85;
    pts.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
      z: (Math.random() - 0.5) * 0.06,
    });
  }

  return pts.slice(0, n);
}

function sampleScatter(n: number): Point3D[] {
  const pts: Point3D[] = [];
  const spread = 0.85;

  // Axes
  const axisPoints = Math.floor(n * 0.12);
  // X axis
  for (let i = 0; i < axisPoints / 2; i++) {
    const t = (i / (axisPoints / 2)) * spread * 2 - spread;
    pts.push({ x: t, y: -spread, z: (Math.random() - 0.5) * 0.04 });
  }
  // Y axis
  for (let i = 0; i < axisPoints / 2; i++) {
    const t = (i / (axisPoints / 2)) * spread * 2 - spread;
    pts.push({ x: -spread, y: t, z: (Math.random() - 0.5) * 0.04 });
  }

  // Scatter dots — positive correlation with noise
  while (pts.length < n) {
    const base = Math.random();
    const x = (base * 2 - 1) * spread * 0.85;
    const y = (base * 2 - 1) * spread * 0.85 + (Math.random() - 0.5) * spread * 0.5;
    pts.push({
      x: x,
      y: Math.max(-spread, Math.min(spread, y)),
      z: (Math.random() - 0.5) * 0.06,
    });
  }

  return pts.slice(0, n);
}

function sampleBoxplot(n: number): Point3D[] {
  const pts: Point3D[] = [];
  // 3 box plots side by side
  const boxes = [
    { cx: -0.55, median: 0.1, q1: -0.15, q3: 0.35, lo: -0.45, hi: 0.65 },
    { cx: 0.0,   median: -0.05, q1: -0.30, q3: 0.20, lo: -0.60, hi: 0.50 },
    { cx: 0.55,  median: 0.20, q1: -0.05, q3: 0.45, lo: -0.35, hi: 0.75 },
  ];
  const boxW = 0.22;
  const perBox = Math.floor(n / boxes.length);

  for (const box of boxes) {
    const allocated = Math.min(perBox, n - pts.length);
    const edges = Math.floor(allocated * 0.6);
    const whiskerPts = Math.floor(allocated * 0.2);
    const medianPts = allocated - edges - whiskerPts;

    // Box edges (q1 to q3)
    for (let i = 0; i < edges; i++) {
      const side = i % 4;
      const t = Math.random();
      let x: number, y: number;
      if (side === 0) { x = box.cx - boxW; y = box.q1 + t * (box.q3 - box.q1); }      // left
      else if (side === 1) { x = box.cx + boxW; y = box.q1 + t * (box.q3 - box.q1); }  // right
      else if (side === 2) { x = box.cx - boxW + t * boxW * 2; y = box.q1; }            // bottom
      else { x = box.cx - boxW + t * boxW * 2; y = box.q3; }                            // top
      pts.push({ x, y, z: (Math.random() - 0.5) * 0.04 });
    }

    // Median line
    for (let i = 0; i < medianPts; i++) {
      const t = Math.random();
      pts.push({
        x: box.cx - boxW + t * boxW * 2,
        y: box.median,
        z: (Math.random() - 0.5) * 0.04,
      });
    }

    // Whiskers (vertical lines + caps)
    for (let i = 0; i < whiskerPts; i++) {
      const upper = i % 2 === 0;
      if (upper) {
        // Upper whisker
        const t = Math.random();
        if (t < 0.7) {
          pts.push({ x: box.cx, y: box.q3 + t / 0.7 * (box.hi - box.q3), z: 0 });
        } else {
          // Cap
          pts.push({ x: box.cx + (Math.random() - 0.5) * boxW * 0.6, y: box.hi, z: 0 });
        }
      } else {
        // Lower whisker
        const t = Math.random();
        if (t < 0.7) {
          pts.push({ x: box.cx, y: box.q1 - t / 0.7 * (box.q1 - box.lo), z: 0 });
        } else {
          pts.push({ x: box.cx + (Math.random() - 0.5) * boxW * 0.6, y: box.lo, z: 0 });
        }
      }
    }
  }

  while (pts.length < n) {
    pts.push({ x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1, z: 0 });
  }

  return pts.slice(0, n);
}

// ── NEURAL NETWORK ────────────────────────────────────────────────────────────
// Vertical columns of nodes like a neural network diagram (input → hidden → output)

function sampleNeural(n: number): Point3D[] {
  const pts: Point3D[] = [];
  // 5 layers with varying node counts
  const layers = [
    { x: -0.8, nodes: 4 },   // input
    { x: -0.35, nodes: 7 },  // hidden 1
    { x: 0.0, nodes: 8 },    // hidden 2
    { x: 0.35, nodes: 6 },   // hidden 3
    { x: 0.8, nodes: 3 },    // output
  ];

  const totalNodes = layers.reduce((s, l) => s + l.nodes, 0);
  // Points per node for the node clusters
  const nodePoints = Math.floor(n * 0.45);

  // Place clustered particles at each node position
  for (const layer of layers) {
    for (let node = 0; node < layer.nodes; node++) {
      const ny = ((node + 0.5) / layer.nodes) * 1.6 - 0.8;
      const count = Math.round((nodePoints / totalNodes));
      for (let i = 0; i < count && pts.length < nodePoints; i++) {
        // Small cluster around the node center
        const spread = 0.045;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = spread * Math.cbrt(Math.random());
        pts.push({
          x: layer.x + r * Math.sin(phi) * Math.cos(theta),
          y: ny + r * Math.cos(phi),
          z: r * Math.sin(phi) * Math.sin(theta),
        });
      }
    }
  }

  // Connection lines between adjacent layers — scatter particles along them
  while (pts.length < n) {
    const li = Math.floor(Math.random() * (layers.length - 1));
    const fromLayer = layers[li];
    const toLayer = layers[li + 1];
    const fromNode = Math.floor(Math.random() * fromLayer.nodes);
    const toNode = Math.floor(Math.random() * toLayer.nodes);
    const fy = ((fromNode + 0.5) / fromLayer.nodes) * 1.6 - 0.8;
    const ty = ((toNode + 0.5) / toLayer.nodes) * 1.6 - 0.8;
    const t = Math.random();
    pts.push({
      x: fromLayer.x + (toLayer.x - fromLayer.x) * t + (Math.random() - 0.5) * 0.02,
      y: fy + (ty - fy) * t + (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.04,
    });
  }

  return pts.slice(0, n);
}

// ── EYE / IRIS ────────────────────────────────────────────────────────────────
// An iris with pupil — the "all-seeing" AI eye

function sampleEye(n: number): Point3D[] {
  const pts: Point3D[] = [];

  // Outer eye shape — almond/lemon shape using parametric curve
  const outlinePoints = Math.floor(n * 0.25);
  for (let i = 0; i < outlinePoints; i++) {
    const t = (i / outlinePoints) * Math.PI * 2;
    const rx = 0.9;  // wider
    const ry = 0.45; // narrower vertically
    // Lemon shape: multiply y by cos to pinch the ends
    const x = rx * Math.cos(t);
    const squeeze = Math.cos(t);
    const y = ry * Math.sin(t) * Math.abs(squeeze) ** 0.3 * Math.sign(Math.sin(t));
    pts.push({ x, y, z: (Math.random() - 0.5) * 0.04 });
  }

  // Iris — concentric rings
  const irisPoints = Math.floor(n * 0.45);
  const irisR = 0.35;
  for (let i = 0; i < irisPoints; i++) {
    const ring = Math.random();
    const r = irisR * (0.3 + ring * 0.7); // bias toward outer iris
    const theta = Math.random() * Math.PI * 2;
    pts.push({
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
      z: (Math.random() - 0.5) * 0.05,
    });
  }

  // Pupil — dense center
  const pupilPoints = Math.floor(n * 0.15);
  const pupilR = 0.12;
  for (let i = 0; i < pupilPoints; i++) {
    const r = pupilR * Math.sqrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    pts.push({
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
      z: (Math.random() - 0.5) * 0.03,
    });
  }

  // Iris radial lines (spokes)
  const spokePoints = n - pts.length;
  const spokeCount = 12;
  for (let i = 0; i < spokePoints; i++) {
    const spoke = (i % spokeCount) / spokeCount * Math.PI * 2;
    const r = pupilR + Math.random() * (irisR - pupilR);
    pts.push({
      x: r * Math.cos(spoke) + (Math.random() - 0.5) * 0.015,
      y: r * Math.sin(spoke) + (Math.random() - 0.5) * 0.015,
      z: (Math.random() - 0.5) * 0.04,
    });
  }

  return pts.slice(0, n);
}

// ── SVG PATH ──────────────────────────────────────────────────────────────────

export function sampleSVGPath(
  d: string | string[],
  n: number,
  viewBox = "0 0 600 400"
): Point3D[] {
  if (typeof document === "undefined") return sampleSphere(n);

  const paths = Array.isArray(d) ? d : [d];
  const [, , vbW, vbH] = viewBox.split(" ").map(Number);

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;";
  document.body.appendChild(svg);

  const pathEls = paths.map(pd => {
    const el = document.createElementNS(NS, "path");
    el.setAttribute("d", pd);
    svg.appendChild(el);
    return el;
  });

  const lengths = pathEls.map(el => el.getTotalLength());
  const totalLength = lengths.reduce((a, b) => a + b, 0);

  if (totalLength === 0) {
    document.body.removeChild(svg);
    return sampleSphere(n);
  }

  const pts: Point3D[] = [];
  pathEls.forEach((el, pi) => {
    const share = Math.max(1, Math.round((lengths[pi] / totalLength) * n));
    for (let i = 0; i < share && pts.length < n; i++) {
      const pt = el.getPointAtLength((i / share) * lengths[pi]);
      const nx = (pt.x / vbW) * 2 - 1;
      const ny = -((pt.y / vbH) * 2 - 1);
      const z = Math.sin(pts.length * 0.3) * 0.08;
      pts.push({ x: nx, y: ny, z });
    }
  });

  document.body.removeChild(svg);
  return pts.slice(0, n);
}

// ── GLB MODEL ─────────────────────────────────────────────────────────────────

/**
 * sampleGLBModel
 *
 * Samples n points evenly across the surface of a GLB/GLTF mesh using
 * area-weighted triangle sampling. Works correctly for both high-poly and
 * low-poly models.
 *
 * ROTATION:
 *   rotX / rotY / rotZ are applied AFTER normalisation to [-1,1], so
 *   they behave intuitively regardless of the model's original scale.
 *
 *   Per-mesh rotations baked by Blender (the most common source of weirdness)
 *   are handled automatically — we read each mesh's world matrix directly
 *   rather than touching the scene root, so baked transforms are always
 *   included correctly.
 *
 *   Common corrections by export source:
 *     Blender (applied transforms before export): rotX/Y/Z = 0  ← just works
 *     Blender (transforms NOT applied):           rotationX: -90
 *     Blender watches-style (-45X, -90Z bake):    rotationX: 45, rotationZ: 90
 *     Sketchfab / other tools:                    try rotationX: -90 first
 */
export async function sampleGLBModel(
  modelPath: string,
  n: number,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1.0,
): Promise<Point3D[]> {
  console.log(`[GLB] Loading: ${modelPath}`);

  let THREE: typeof import("three");
  let GLTFLoaderMod: typeof import("three/addons/loaders/GLTFLoader.js");

  try {
    [THREE, GLTFLoaderMod] = await Promise.all([
      import("three"),
      import("three/addons/loaders/GLTFLoader.js"),
    ]);
  } catch (e) {
    console.error("[GLB] Failed to load Three.js:", e);
    return sampleSphere(n);
  }

  const { GLTFLoader } = GLTFLoaderMod;

  return new Promise((resolve) => {
    new GLTFLoader().load(
      modelPath,
      (gltf) => {
        // ── Collect triangles in world space ───────────────────────────────
        // We read each mesh's matrixWorld directly — this correctly includes
        // any per-mesh rotations baked by Blender or other exporters, without
        // needing to guess or reset anything at the scene level.
        type V3 = InstanceType<typeof THREE.Vector3>;
        type Tri = { a: V3; b: V3; c: V3; area: number };

        const triangles: Tri[] = [];
        let totalArea = 0;

        // Ensure all world matrices are up to date before we read them
        gltf.scene.updateMatrixWorld(true);

        gltf.scene.traverse((child: any) => {
          if (!child.isMesh) return;
          const geom = child.geometry;
          const pos = geom.attributes.position;
          if (!pos) return;

          child.updateWorldMatrix(true, false);
          const mat = child.matrixWorld;

          const getV = (i: number): V3 =>
            new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(mat);

          const index = geom.index;
          if (index) {
            for (let i = 0; i < index.count; i += 3) {
              const a = getV(index.getX(i));
              const b = getV(index.getX(i + 1));
              const c = getV(index.getX(i + 2));
              const area = b.clone().sub(a).cross(c.clone().sub(a)).length() * 0.5;
              totalArea += area;
              triangles.push({ a, b, c, area });
            }
          } else {
            for (let i = 0; i < pos.count; i += 3) {
              const a = getV(i);
              const b = getV(Math.min(i + 1, pos.count - 1));
              const c = getV(Math.min(i + 2, pos.count - 1));
              const area = b.clone().sub(a).cross(c.clone().sub(a)).length() * 0.5;
              totalArea += area;
              triangles.push({ a, b, c, area });
            }
          }
        });

        console.log(`[GLB] ${triangles.length} triangles, area=${totalArea.toFixed(3)}`);

        if (!triangles.length) {
          console.warn("[GLB] No mesh data — falling back to sphere");
          resolve(sampleSphere(n));
          return;
        }

        // ── Area-weighted surface sampling ─────────────────────────────────
        // Build CDF so larger triangles get proportionally more particles
        const cdf: number[] = [];
        let cum = 0;
        for (const tri of triangles) {
          cum += tri.area / totalArea;
          cdf.push(cum);
        }

        const rawPts: V3[] = Array.from({ length: n }, () => {
          // Binary search into CDF
          const r = Math.random();
          let lo = 0, hi = cdf.length - 1;
          while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (cdf[mid] < r) lo = mid + 1; else hi = mid;
          }
          const { a, b, c } = triangles[lo];
          // Uniform random point on triangle (barycentric)
          let r1 = Math.random(), r2 = Math.random();
          if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
          const r3 = 1 - r1 - r2;
          return new THREE.Vector3(
            a.x * r3 + b.x * r1 + c.x * r2,
            a.y * r3 + b.y * r1 + c.y * r2,
            a.z * r3 + b.z * r1 + c.z * r2,
          );
        });

        // ── Normalise to [-1, 1] then apply user rotation ──────────────────
        const box = new THREE.Box3().setFromPoints(rawPts);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;

        const rotMat = new THREE.Matrix4().makeRotationFromEuler(
          new THREE.Euler(
            THREE.MathUtils.degToRad(rotX),
            THREE.MathUtils.degToRad(rotY),
            THREE.MathUtils.degToRad(rotZ),
          )
        );

        const pts: Point3D[] = rawPts.map(v => {
          const p = v.clone()
            .sub(center)
            .divideScalar(maxDim / 2)
            .multiplyScalar(scale)
            .applyMatrix4(rotMat);
          return { x: p.x, y: p.y, z: p.z };
        });

        console.log(`[GLB] Done — ${pts.length} surface points`);
        resolve(pts);
      },
      (xhr) => {
        if (xhr.total) console.log(`[GLB] ${Math.round(xhr.loaded / xhr.total * 100)}%`);
      },
      (error) => {
        console.error("[GLB] Load error:", error);
        console.error("[GLB] Ensure the file is in /public/models/ and path starts with /models/ (or /blinko/models/ on prod)");
        resolve(sampleSphere(n));
      }
    );
  });
}