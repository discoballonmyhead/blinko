/**
 * ParticleCanvas.tsx
 *
 * NOT fixed/full-page. This is used per-section (ParticleSplitSection)
 * to render a 3D particle shape into the section's particle-side half.
 *
 * The hero has its own separate HeroWaveCanvas (wave animation).
 * The AnimatedGridPattern (tilted 3D grid) is the persistent hero background.
 */

import { useRef, forwardRef, useImperativeHandle } from "react";
import { ParticleEngine } from "./ParticleEngine";
import type { ParticleEngineHandle } from "./ParticleEngine";

export interface ParticleCanvasHandle extends ParticleEngineHandle {}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle>((_, ref) => {
  const engineRef = useRef<ParticleEngineHandle>(null);

  useImperativeHandle(ref, () => ({
    setTarget: (...args) => engineRef.current?.setTarget(...args),
    setScrollProgress: (...args) => engineRef.current?.setScrollProgress(...args),
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
      aria-hidden="true"
    >
      <ParticleEngine
        ref={engineRef}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
});

ParticleCanvas.displayName = "ParticleCanvas";
