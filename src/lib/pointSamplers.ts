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