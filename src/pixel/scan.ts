import { hexToRgb } from "./raster.ts";
import type { Painter } from "./scene.ts";

/** Indexed tints preserve the scene's light, shadow and windows under the scan. */
export function scanPalette(base: readonly string[]) {
  const blend = (hex: string, strength: number) => {
    const rgb = hexToRgb(hex || "#1c201b");
    const tint = hexToRgb("#9ec7b9");
    return `#${rgb.map((value, i) => Math.round(value * (1 - strength) + tint[i]! * strength).toString(16).padStart(2, "0")).join("")}`;
  };
  const count = base.length;
  return {
    palette: [...base, ...base.map((ink) => blend(ink, 0.2)), ...base.map((ink) => blend(ink, 0.45)), "#a2c7b8", "#f8f4ec"],
    soft: (ink: number) => count + ink,
    lit: (ink: number) => count * 2 + ink,
    edge: count * 3,
    light: count * 3 + 1,
  };
}

/** A crisp one-cell stroke. No blur, antialiasing, or fractional pixels. */
export function scanLine(p: Painter, a: readonly [number, number], b: readonly [number, number], ink: number) {
  let x = Math.round(a[0]);
  let y = Math.round(a[1]);
  const tx = Math.round(b[0]);
  const ty = Math.round(b[1]);
  const dx = Math.abs(tx - x);
  const dy = -Math.abs(ty - y);
  const sx = x < tx ? 1 : -1;
  const sy = y < ty ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    p.px(x, y, ink);
    if (x === tx && y === ty) break;
    const e = err * 2;
    if (e >= dy) { err += dy; x += sx; }
    if (e <= dx) { err += dx; y += sy; }
  }
}
