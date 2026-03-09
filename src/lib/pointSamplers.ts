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
    case "sphere":   return sampleSphere(n);
    case "torus":    return sampleTorus(n);
    case "cube":     return sampleCube(n);
    case "cylinder": return sampleCylinder(n);
    case "cone":     return sampleCone(n);
    case "helix":    return sampleHelix(n);
    case "grid":     return sampleGrid(n);
    case "ring":     return sampleRing(n);
    case "dna":      return sampleDNA(n);
    case "wave":     return sampleWave(n);
    default:         return sampleSphere(n);
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
    if (mod < 5)  return { x: r * Math.cos(t), y, z: r * Math.sin(t) };
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

/**
 * sampleSVGPath — samples n points from one or more SVG path d-strings.
 *
 * SINGLE PATH:
 *   sampleSVGPath("M10 10 L90 90...", 300)
 *
 * MULTI-PATH (pass array — each path gets points proportional to its length):
 *   sampleSVGPath(["M10 10...", "M50 50..."], 300)
 *
 * viewBox: the coordinate space of your SVG. Default "0 0 600 400".
 * Match this to your SVG's actual viewBox attribute, e.g. "0 0 80 80" for icons8.
 */
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

  // Create all path elements and measure their lengths
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

  // Distribute n points across paths proportional to each path's length
  const pts: Point3D[] = [];
  pathEls.forEach((el, pi) => {
    const share = Math.max(1, Math.round((lengths[pi] / totalLength) * n));
    for (let i = 0; i < share && pts.length < n; i++) {
      const pt = el.getPointAtLength((i / share) * lengths[pi]);
      // Normalise from viewBox coords to [-1, 1]
      const nx =  (pt.x / vbW) * 2 - 1;
      const ny = -((pt.y / vbH) * 2 - 1); // Y flipped: SVG top=0, 3D top=+1
      // Subtle z ripple so shape reads as 3D even for flat SVGs
      const z = Math.sin(pts.length * 0.3) * 0.08;
      pts.push({ x: nx, y: ny, z });
    }
  });

  document.body.removeChild(svg);
  return pts.slice(0, n);
}

// ── GLB MODEL — Three.js loaded lazily ───────────────────────────────────────

export async function sampleGLBModel(
  modelPath: string, n: number,
  rotX = 0, rotY = 0, rotZ = 0, scale = 1.0
): Promise<Point3D[]> {
  console.log(`[GLB] Loading model: ${modelPath}`);

  let THREE: typeof import("three");
  let GLTFLoaderMod: typeof import("three/addons/loaders/GLTFLoader.js");

  try {
    [THREE, GLTFLoaderMod] = await Promise.all([
      import("three"),
      import("three/addons/loaders/GLTFLoader.js"),
    ]);
    console.log("[GLB] Three.js loaded OK");
  } catch (e) {
    console.error("[GLB] Failed to load Three.js:", e);
    return sampleSphere(n);
  }

  const { GLTFLoader } = GLTFLoaderMod;

  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    console.log(`[GLB] Fetching: ${modelPath}`);

    loader.load(
      modelPath,
      (gltf) => {
        console.log("[GLB] Model loaded, traversing scene...");
        const allVerts: InstanceType<typeof THREE.Vector3>[] = [];

        gltf.scene.traverse((child: any) => {
          if (child.isMesh) {
            console.log(`[GLB]  mesh: ${child.name}, verts: ${child.geometry.attributes.position?.count ?? 0}`);
            const geom = child.geometry;
            const pos = geom.attributes.position;
            if (!pos) return;
            child.updateWorldMatrix(true, false);
            const index = geom.index;
            if (index) {
              const seen = new Set<number>();
              for (let i = 0; i < index.count; i++) {
                const vi = index.getX(i);
                if (seen.has(vi)) continue;
                seen.add(vi);
                allVerts.push(
                  new THREE.Vector3(pos.getX(vi), pos.getY(vi), pos.getZ(vi))
                    .applyMatrix4(child.matrixWorld)
                );
              }
            } else {
              for (let i = 0; i < pos.count; i++) {
                allVerts.push(
                  new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
                    .applyMatrix4(child.matrixWorld)
                );
              }
            }
          }
        });

        console.log(`[GLB] Total unique verts: ${allVerts.length}`);

        if (!allVerts.length) {
          console.warn("[GLB] No mesh data found — falling back to sphere");
          resolve(sampleSphere(n));
          return;
        }

        // Normalise to [-1, 1] bounding box
        const box = new THREE.Box3().setFromPoints(allVerts);
        const center = new THREE.Vector3(); box.getCenter(center);
        const size   = new THREE.Vector3(); box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const rotMat = new THREE.Matrix4().makeRotationFromEuler(
          new THREE.Euler(
            THREE.MathUtils.degToRad(rotX),
            THREE.MathUtils.degToRad(rotY),
            THREE.MathUtils.degToRad(rotZ)
          )
        );

        const step = Math.max(1, Math.floor(allVerts.length / n));
        const pts: Point3D[] = [];
        for (let i = 0; i < allVerts.length && pts.length < n; i += step) {
          const v = allVerts[i].clone().sub(center).divideScalar(maxDim / 2 / scale).applyMatrix4(rotMat);
          pts.push({ x: v.x, y: v.y, z: v.z });
        }
        // Pad to exactly n if model has fewer verts than requested
        while (pts.length < n) {
          const s = pts[Math.floor(Math.random() * pts.length)];
          pts.push({ x: s.x + (Math.random()-0.5)*0.02, y: s.y + (Math.random()-0.5)*0.02, z: s.z + (Math.random()-0.5)*0.02 });
        }

        console.log(`[GLB] Sampled ${pts.length} points — ready`);
        resolve(pts.slice(0, n));
      },
      (progress) => {
        if (progress.total) {
          console.log(`[GLB] Loading... ${Math.round(progress.loaded / progress.total * 100)}%`);
        }
      },
      (error) => {
        console.error("[GLB] Load error:", error);
        console.error("[GLB] Tried path:", modelPath);
        console.error("[GLB] Make sure file is in /public/models/ and the path starts with /models/");
        resolve(sampleSphere(n));
      }
    );
  });
}
