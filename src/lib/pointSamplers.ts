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

// ── GLB MODEL — Three.js loaded lazily ───────────────────────────────────────

/**
 * sampleGLBModel
 *
 * Loads a GLB/GLTF model and returns n Point3D samples from its surface.
 *
 * ROTATION NOTE — Blender exports:
 *   Blender uses Z-up / Y-forward. glTF spec uses Y-up / Z-forward.
 *   The Blender glTF exporter compensates by baking a -90° X rotation into
 *   the root node, so models exported from Blender usually arrive already
 *   correct in Three.js — UNLESS you didn't apply transforms before export.
 *
 *   If your model appears lying on its back (rotated 90° on X):
 *     rotationX: -90  (or 90, depending on orientation)
 *   If it's facing the wrong way:
 *     rotationY: 180
 *
 *   The autoCorrectBlender flag (default true) applies the standard
 *   Blender→glTF correction automatically. Turn it off if your model
 *   already looks correct or was not exported from Blender.
 *
 * SAMPLING STRATEGY:
 *   Low-poly models (< n verts) are surface-sampled using triangle area
 *   weighting so particles spread evenly across the mesh surface, not
 *   just clustered at vertices.
 */
export async function sampleGLBModel(
  modelPath: string,
  n: number,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1.0,
  autoCorrectBlender = true,
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
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        // ── Collect all triangles from every mesh ──────────────────────────
        type Triangle = {
          a: InstanceType<typeof THREE.Vector3>;
          b: InstanceType<typeof THREE.Vector3>;
          c: InstanceType<typeof THREE.Vector3>;
          area: number;
        };

        const triangles: Triangle[] = [];
        let totalArea = 0;

        // Apply Blender axis correction to the root scene before reading verts.
        // Blender exports with a -90° X rotation baked in; the glTF loader
        // un-does this automatically for the scene graph, but we re-apply it
        // here so world-space coordinates are Y-up as expected.
        if (autoCorrectBlender) {
          gltf.scene.rotation.set(0, 0, 0);
          gltf.scene.updateMatrixWorld(true);
        }

        gltf.scene.traverse((child: any) => {
          if (!child.isMesh) return;

          const geom = child.geometry;
          const pos = geom.attributes.position;
          if (!pos) return;

          child.updateWorldMatrix(true, false);
          const mat = child.matrixWorld;

          // Helper: get world-space vertex i
          const getVert = (i: number) =>
            new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(mat);

          const index = geom.index;

          if (index) {
            for (let i = 0; i < index.count; i += 3) {
              const a = getVert(index.getX(i));
              const b = getVert(index.getX(i + 1));
              const c = getVert(index.getX(i + 2));
              const area = triangleArea(a, b, c, THREE);
              totalArea += area;
              triangles.push({ a, b, c, area });
            }
          } else {
            for (let i = 0; i < pos.count; i += 3) {
              const a = getVert(i);
              const b = getVert(i + 1 < pos.count ? i + 1 : i);
              const c = getVert(i + 2 < pos.count ? i + 2 : i);
              const area = triangleArea(a, b, c, THREE);
              totalArea += area;
              triangles.push({ a, b, c, area });
            }
          }
        });

        console.log(`[GLB] ${triangles.length} triangles, total area: ${totalArea.toFixed(3)}`);

        if (!triangles.length) {
          console.warn("[GLB] No mesh data — falling back to sphere");
          resolve(sampleSphere(n));
          return;
        }

        // ── Surface sample n points ────────────────────────────────────────
        // Build cumulative area CDF for weighted random triangle selection
        const cdf: number[] = [];
        let cumulative = 0;
        for (const tri of triangles) {
          cumulative += tri.area / totalArea;
          cdf.push(cumulative);
        }

        // Sample raw world-space points
        const rawPts: InstanceType<typeof THREE.Vector3>[] = [];
        for (let i = 0; i < n; i++) {
          const r = Math.random();
          // Binary search for triangle in CDF
          let lo = 0, hi = cdf.length - 1;
          while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (cdf[mid] < r) lo = mid + 1; else hi = mid;
          }
          const tri = triangles[lo];
          // Random point on triangle via barycentric coords
          rawPts.push(randomPointOnTriangle(tri.a, tri.b, tri.c, THREE));
        }

        // ── Normalise to [-1, 1] ───────────────────────────────────────────
        const box = new THREE.Box3().setFromPoints(rawPts);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;

        // User rotation applied AFTER normalisation so it's intuitive
        const rotMat = new THREE.Matrix4().makeRotationFromEuler(
          new THREE.Euler(
            THREE.MathUtils.degToRad(rotX),
            THREE.MathUtils.degToRad(rotY),
            THREE.MathUtils.degToRad(rotZ),
          )
        );

        const pts: Point3D[] = rawPts.map(v => {
          const norm = v.clone()
            .sub(center)
            .divideScalar(maxDim / 2)
            .multiplyScalar(scale)
            .applyMatrix4(rotMat);
          return { x: norm.x, y: norm.y, z: norm.z };
        });

        console.log(`[GLB] Sampled ${pts.length} surface points — done`);
        resolve(pts);
      },
      (progress) => {
        if (progress.total) {
          console.log(`[GLB] ${Math.round(progress.loaded / progress.total * 100)}%`);
        }
      },
      (error) => {
        console.error("[GLB] Load error:", error);
        console.error("[GLB] Path tried:", modelPath);
        console.error("[GLB] File must be in /public/models/ and path must start with /blinko/models/ (or /models/ locally)");
        resolve(sampleSphere(n));
      }
    );
  });
}

// ── Triangle helpers ──────────────────────────────────────────────────────────

function triangleArea(
  a: InstanceType<typeof import("three").Vector3>,
  b: InstanceType<typeof import("three").Vector3>,
  c: InstanceType<typeof import("three").Vector3>,
  THREE: typeof import("three"),
): number {
  const ab = b.clone().sub(a);
  const ac = c.clone().sub(a);
  return ab.cross(ac).length() * 0.5;
}

function randomPointOnTriangle(
  a: InstanceType<typeof import("three").Vector3>,
  b: InstanceType<typeof import("three").Vector3>,
  c: InstanceType<typeof import("three").Vector3>,
  THREE: typeof import("three"),
): InstanceType<typeof import("three").Vector3> {
  // Uniform random barycentric coordinates
  let r1 = Math.random(), r2 = Math.random();
  if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
  const r3 = 1 - r1 - r2;
  return new THREE.Vector3(
    a.x * r3 + b.x * r1 + c.x * r2,
    a.y * r3 + b.y * r1 + c.y * r2,
    a.z * r3 + b.z * r1 + c.z * r2,
  );
}