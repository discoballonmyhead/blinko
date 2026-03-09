/**
 * grid.config.ts
 *
 * All visual settings for the AnimatedGridPattern background.
 * Edit here — no need to touch the component itself.
 *
 * ── TILT ────────────────────────────────────────────────────────────────────
 * tiltX: forward/backward tilt in degrees (positive = top tilts away from viewer)
 * tiltY: left/right tilt in degrees
 * tiltZ: clockwise rotation in degrees
 * perspective: CSS perspective depth in px (lower = more dramatic 3D, higher = flatter)
 *
 * Example presets:
 *   Flat (no tilt):         tiltX:0,  tiltY:0,  tiltZ:0
 *   Subtle floor:           tiltX:25, tiltY:0,  tiltZ:0
 *   Indium-style diagonal:  tiltX:35, tiltY:0,  tiltZ:-12
 *   Hard perspective:       tiltX:55, tiltY:5,  tiltZ:-8, perspective:600
 *
 * ── GRID LINES ──────────────────────────────────────────────────────────────
 * cellSize: px size of each grid cell (larger = fewer, more spread-out lines)
 * strokeColor: CSS color of the grid lines
 * strokeOpacity: line opacity 0–1
 * strokeDasharray: "0" = solid lines, "4 4" = dashed, "1 8" = dotted
 *
 * ── GLOWING SQUARES ─────────────────────────────────────────────────────────
 * numSquares: how many squares glow at once
 * squareColor: CSS color of the glowing squares
 * maxOpacity: peak opacity of each glowing square (0–1)
 * duration: seconds each square takes to fade in + out
 * repeatDelay: seconds between each square's animation repeat
 */

export const gridConfig = {
  // ── Tilt / 3D transform ──────────────────────────────────────────
  tiltX: 35,          // degrees — top of grid tilts back (floor perspective)
  tiltY: 0,           // degrees — left/right lean
  tiltZ: -10,         // degrees — clockwise rotation
  perspective: 800,   // px — CSS perspective depth

  // ── Grid lines ───────────────────────────────────────────────────
  cellSize: 44,                        // px per cell
  strokeColor: "rgba(0,194,255,1)",    // cyan to match brand
  strokeOpacity: 0.12,                 // subtle — grid is background, not foreground
  strokeDasharray: 0,                  // 0 = solid lines

  // ── Glowing squares ──────────────────────────────────────────────
  numSquares: 20,                      // active squares at once
  squareColor: "rgba(0,194,255,1)",    // same cyan
  maxOpacity: 0.18,                    // soft glow
  duration: 5,                         // seconds per fade cycle
  repeatDelay: 0.3,                    // seconds between repeats

  // ── Layout ───────────────────────────────────────────────────────
  /** Where the grid sits vertically — "full" covers entire hero, "bottom" = bottom 60% */
  coverage: "full" as "full" | "bottom",
  /** Fade the grid out toward the bottom edge */
  fadeBottom: true,
  /** Fade the grid out toward the sides */
  fadeSides: true,
};
