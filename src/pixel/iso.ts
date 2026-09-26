import type { Raster } from "./raster.ts";

/**
 * A 2:1 axonometric frame placed on the canvas: i runs down-right, j runs
 * down-left, z runs up. Planes and walls are filled as polygons, so large
 * surfaces stay solid at any size.
 */
export type Pt = readonly [number, number];

export function view(ox: number, oy: number) {
  const pt = (i: number, j: number, z = 0): Pt => [ox + (i - j) * 2, oy + i + j - z];
  const quad = (r: Raster, a: Pt, b: Pt, c: Pt, d: Pt, ink: number) => r.polygon([a, b, c, d], ink);
  return {
    pt,
    /** A patch of a horizontal plane between two corners, at height z. */
    plane(r: Raster, i0: number, j0: number, i1: number, j1: number, z: number, ink: number) {
      quad(r, pt(i0, j0, z), pt(i1, j0, z), pt(i1, j1, z), pt(i0, j1, z), ink);
    },
    /** A patch of a wall facing +j (in the sun), the plane j = const. */
    wallJ(r: Raster, j: number, i0: number, i1: number, z0: number, z1: number, ink: number) {
      quad(r, pt(i0, j, z0), pt(i1, j, z0), pt(i1, j, z1), pt(i0, j, z1), ink);
    },
    /** A patch of a wall facing +i (in shade), the plane i = const. */
    wallI(r: Raster, i: number, j0: number, j1: number, z0: number, z1: number, ink: number) {
      quad(r, pt(i, j0, z0), pt(i, j1, z0), pt(i, j1, z1), pt(i, j0, z1), ink);
    },
    quad,
  };
}

export type View = ReturnType<typeof view>;
