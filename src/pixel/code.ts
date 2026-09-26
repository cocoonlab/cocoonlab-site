import { Raster, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";

/**
 * Cocoon Code — a Montréal corner building in axonometric: brick on the
 * sunlit face, the same brick in shade on the other, a planted roof and a
 * shopfront under a green awning. A gold plane rises through the building
 * floor by floor; each floor it clears keeps a gold check, the evidence.
 */

const P = {
  ground: 1,
  ground2: 2,
  road: 3,
  line: 4,
  brick: 5,
  brickShade: 6,
  window: 7,
  windowShade: 8,
  sill: 9,
  roof: 10,
  parapet: 11,
  leaf: 12,
  leaf2: 13,
  trunk: 14,
  ink: 15,
  gold: 16,
  glass: 17,
  awning: 18,
  curb: 19,
  paper: 20,
  blue: 21,
  lawn: 22,
  rail: 23,
} as const;

const palette = [
  "",
  "#e7e2d6", // ground (sidewalk)
  "#ddd7ca", // ground2
  "#aab3b1", // road
  "#f7f7f2", // line
  "#b36a5e", // brick
  "#8e5048", // brickShade
  "#2f4f5a", // window
  "#223b43", // windowShade
  "#e2dccf", // sill
  "#dcd5c6", // roof
  "#c8bfad", // parapet
  "#aebb8f", // leaf
  "#859a77", // leaf2
  "#5d4b3d", // trunk
  "#1c201b", // ink
  "#e8a900", // gold
  "#cfdcdc", // glass
  "#5f8a7c", // awning
  "#c8bfad", // curb
  "#f7f7f2", // paper
  "#3a606e", // blue
  "#c4cda9", // lawn
  "#1f4d58", // rail
] as const;

const W = 240;
const H = 140;

// Axonometric frame (2:1): i runs down-right, j runs down-left, z runs up.
const OX = 114;
const OY = 62;
const A = 26; // building length along i
const B = 15; // building depth along j
const FLOOR = 8;
const FLOORS = 6;
const HEIGHT = FLOOR * FLOORS + 2;
const WALK = 6; // sidewalk width
const STREET = 9; // roadway width

type Pt = readonly [number, number];
const pt = (i: number, j: number, z = 0): Pt => [OX + (i - j) * 2, OY + i + j - z];

function quad(r: Raster, a: Pt, b: Pt, c: Pt, d: Pt, ink: number) {
  r.polygon([a, b, c, d], ink);
}
/** A patch of the ground plane between two corners, at height z. */
function plane(r: Raster, i0: number, j0: number, i1: number, j1: number, z: number, ink: number) {
  quad(r, pt(i0, j0, z), pt(i1, j0, z), pt(i1, j1, z), pt(i0, j1, z), ink);
}
/** A patch of the sunlit face (the plane j = B). */
function faceL(r: Raster, i0: number, i1: number, z0: number, z1: number, ink: number, j = B) {
  quad(r, pt(i0, j, z0), pt(i1, j, z0), pt(i1, j, z1), pt(i0, j, z1), ink);
}
/** A patch of the shaded face (the plane i = A). */
function faceR(r: Raster, j0: number, j1: number, z0: number, z1: number, ink: number, i = A) {
  quad(r, pt(i, j0, z0), pt(i, j1, z0), pt(i, j1, z1), pt(i, j0, z1), ink);
}

function ground(r: Raster) {
  const far = 110;
  // Sidewalks everywhere, then the two streets meeting at the corner.
  plane(r, -far, -far, far, far, 0, P.ground);
  plane(r, -far, -far, -2, -2, 0, P.lawn);
  const j0 = B + WALK;
  const i0 = A + WALK;
  plane(r, -far, j0, far, j0 + STREET, 0, P.road);
  plane(r, i0, -far, i0 + STREET, far, 0, P.road);
  plane(r, -far, j0 - 1, i0, j0, 0, P.curb);
  plane(r, i0 - 1, -far, i0, j0, 0, P.curb);
  // Lane lines and crosswalks at the corner.
  for (let i = -far; i < i0 - 6; i += 6) plane(r, i, j0 + 4, i + 3, j0 + 5, 0, P.line);
  for (let j = -far; j < j0 - 6; j += 6) plane(r, i0 + 4, j, i0 + 5, j + 3, 0, P.line);
  for (let j = j0 + 1; j < j0 + STREET - 1; j += 2) plane(r, i0 - 5, j, i0 - 1, j + 1, 0, P.line);
  for (let i = i0 + 1; i < i0 + STREET - 1; i += 2) plane(r, i, j0 - 5, i + 1, j0 - 1, 0, P.line);
  // Paving joints on the sidewalks.
  for (let i = -8; i < i0 - 1; i += 5) plane(r, i, B + 1, i + 0.5, j0 - 1, 0, P.ground2);
}

function building(r: Raster) {
  // Sunlit face: brick, windows with sills, the shopfront and awning.
  faceL(r, 0, A, 0, HEIGHT, P.brick);
  for (let f = 1; f < FLOORS; f++) {
    for (let i = 1.5; i < A - 1; i += 4) {
      faceL(r, i, i + 2, f * FLOOR + 2, f * FLOOR + 6, P.window);
      faceL(r, i, i + 2, f * FLOOR + 1, f * FLOOR + 2, P.sill);
    }
  }
  faceL(r, 1, A - 1, 1, 6, P.glass);
  for (let i = 5; i < A - 1; i += 5) faceL(r, i, i + 0.5, 1, 6, P.window);
  faceL(r, 0.5, A - 0.5, 6, 7.5, P.awning);
  faceL(r, 0, A, HEIGHT - 2, HEIGHT, P.parapet);

  // Shaded face.
  faceR(r, 0, B, 0, HEIGHT, P.brickShade);
  for (let f = 1; f < FLOORS; f++) {
    for (let j = 1.5; j < B - 1; j += 4) faceR(r, j, j + 2, f * FLOOR + 2, f * FLOOR + 6, P.windowShade);
  }
  faceR(r, 1, B - 1, 1, 6, P.windowShade);
  faceR(r, 0, B, HEIGHT - 2, HEIGHT, P.parapet);

  // Roof: parapet, planted terrace, and a mechanical box.
  plane(r, 0, 0, A, B, HEIGHT, P.parapet);
  plane(r, 1, 1, A - 1, B - 1, HEIGHT, P.roof);
  plane(r, 3, 3, 14, B - 3, HEIGHT, P.leaf2);
  for (let k = 0; k < 5; k++) {
    const [x, y] = pt(4.5 + k * 2, 5 + (k % 3) * 2, HEIGHT);
    r.disc(x, y - 1, 1.6, P.leaf);
  }
  const [bi0, bj0, bi1, bj1] = [A - 9, 3, A - 3, 7];
  faceL(r, bi0, bi1, HEIGHT, HEIGHT + 4, P.parapet, bj1);
  faceR(r, bj0, bj1, HEIGHT, HEIGHT + 4, P.brickShade, bi1);
  plane(r, bi0, bj0, bi1, bj1, HEIGHT + 4, P.roof);

  // Balconies on two bays of the sunlit face: slab and rail.
  for (let f = 2; f < FLOORS; f += 1) {
    for (const i of [5.5, 17.5]) {
      plane(r, i - 0.5, B, i + 2.5, B + 1.5, f * FLOOR + 1, P.parapet);
      faceL(r, i - 0.5, i + 2.5, f * FLOOR + 1, f * FLOOR + 3, P.rail, B + 1.5);
      faceL(r, i, i + 2, f * FLOOR + 1.5, f * FLOOR + 2.5, P.window, B + 1.5);
    }
  }
}

function tree(r: Raster, i: number, j: number) {
  const [x, y] = pt(i, j);
  r.rect(x, y - 6, 2, 6, P.trunk);
  r.disc(x + 1, y - 10, 5, P.leaf2);
  r.disc(x - 0.5, y - 11.5, 3, P.leaf);
}

function still(): Raster {
  const r = new Raster(W, H);
  ground(r);
  // Trees behind the building first, then the building, then the street trees.
  tree(r, -6, 4);
  tree(r, 6, -6);
  building(r);
  tree(r, 5, B + 3);
  tree(r, 15, B + 3);
  tree(r, A + 3, 5);
  return r;
}

const carEast = sprite([" bbbbbb ", "bbggbbgb", "bbbbbbbb", " i    i "], { b: P.blue, g: P.glass, i: P.ink });
const carSouth = sprite([" bbbbbb ", "bgbbggbb", "bbbbbbbb", " i    i "], { b: P.brick, g: P.glass, i: P.ink });
const person = sprite([" h ", "sss", " s ", "i i"], { h: P.trunk, s: P.gold, i: P.ink });

/** Seconds per inspection: rise through the floors, hold, then start over. */
export const CODE_CYCLE = 11;
export const CODE_CHECKS = FLOORS;
const RISE = 7;

/** How many floors the gold plane has cleared at `t`. */
export function checksDone(t: number) {
  const phase = ((t % CODE_CYCLE) + CODE_CYCLE) % CODE_CYCLE;
  return Math.min(FLOORS, Math.floor((phase / RISE) * FLOORS));
}

const loop = (v: number, span: number) => ((v % span) + span) % span;

function animate(paint: Painter, t: number) {
  // Traffic on both streets and a walker on the sidewalk.
  const ci = loop(t * 7, 110) - 60;
  const [cx, cy] = pt(ci, B + WALK + 6);
  paint.stamp(carEast, cx - 4, cy - 3);
  const cj = loop(t * 5 + 30, 110) - 60;
  const [dx, dy] = pt(A + WALK + 3, cj);
  paint.stamp(carSouth, dx - 4, dy - 3);
  const pi = A - loop(t * 1.4, A + 16);
  const [px, py] = pt(pi, B + 3);
  paint.stamp(person, px - 1, py - 4);

  // The gold plane: an outline round the building at the height it checks.
  const phase = ((t % CODE_CYCLE) + CODE_CYCLE) % CODE_CYCLE;
  if (phase < RISE) {
    const z = Math.round((phase / RISE) * HEIGHT);
    for (let i = -2; i <= A + 2; i++) {
      const [x1, y1] = pt(i, B + 2, z);
      const [x2, y2] = pt(i, -2, z);
      paint.rect(x1, y1, 2, 1, P.gold);
      paint.rect(x2, y2, 2, 1, P.gold);
    }
    for (let j = -2; j <= B + 2; j++) {
      const [x1, y1] = pt(A + 2, j, z);
      const [x2, y2] = pt(-2, j, z);
      paint.rect(x1 - 2, y1, 2, 1, P.gold);
      paint.rect(x2 - 2, y2, 2, 1, P.gold);
    }
  }
  // A gold check beside every floor already cleared.
  const done = checksDone(t);
  for (let f = 0; f < done; f++) {
    const [x, y] = pt(A + 3, 0, f * FLOOR + 5);
    paint.px(x + 2, y + 1, P.gold);
    paint.px(x + 3, y + 2, P.gold);
    paint.px(x + 4, y + 1, P.gold);
    paint.px(x + 5, y, P.gold);
    paint.px(x + 6, y - 1, P.gold);
  }
}

export const codeScene: Scene = {
  width: W,
  height: H,
  palette,
  still: still(),
  focus: 0.5,
  animate,
};
