import { Raster, seeded, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";

/**
 * Cocoon Code — Habitat 67 in axonometric: prefabricated concrete homes
 * stacked on the Cité du Havre, each roof the garden of the home above,
 * with the river behind. A gold plane rises through the stack level by
 * level and leaves a check beside each level it clears, the evidence.
 */

const P = {
  lawn: 1,
  lawn2: 2,
  path: 3,
  road: 4,
  line: 5,
  water: 6,
  water2: 7,
  top: 8,
  face: 9,
  shade: 10,
  joint: 11,
  window: 12,
  windowShade: 13,
  glass: 14,
  leaf: 15,
  leaf2: 16,
  trunk: 17,
  ink: 18,
  gold: 19,
  paper: 20,
  blue: 21,
  brick: 22,
  curb: 23,
  jointShade: 24,
} as const;

const palette = [
  "",
  "#c4cda9", // lawn
  "#bcc69f", // lawn2
  "#e7e2d6", // path
  "#aab3b1", // road
  "#f7f7f2", // line
  "#d3e0df", // water
  "#bccfd0", // water2
  "#ece8de", // top (concrete roof)
  "#d9d2c4", // face (concrete in sun)
  "#aba393", // shade (concrete in shade)
  "#b9b1a1", // joint
  "#2f4f5a", // window
  "#223b43", // windowShade
  "#cfdcdc", // glass
  "#aebb8f", // leaf
  "#859a77", // leaf2
  "#5d4b3d", // trunk
  "#1c201b", // ink
  "#e8a900", // gold
  "#f7f7f2", // paper
  "#3a606e", // blue
  "#b36a5e", // brick
  "#c8bfad", // curb
  "#958d7d", // jointShade
] as const;

const W = 240;
const H = 140;

// Axonometric frame (2:1): i runs down-right, j runs down-left, z runs up.
const OX = 94;
const OY = 58;
type Pt = readonly [number, number];
const pt = (i: number, j: number, z = 0): Pt => [OX + (i - j) * 2, OY + i + j - z];

function quad(r: Raster, a: Pt, b: Pt, c: Pt, d: Pt, ink: number) {
  r.polygon([a, b, c, d], ink);
}
/** A patch of a horizontal plane between two corners, at height z. */
function plane(r: Raster, i0: number, j0: number, i1: number, j1: number, z: number, ink: number) {
  quad(r, pt(i0, j0, z), pt(i1, j0, z), pt(i1, j1, z), pt(i0, j1, z), ink);
}
/** A patch of a sunlit wall, the plane j = const. */
function wallJ(r: Raster, j: number, i0: number, i1: number, z0: number, z1: number, ink: number) {
  quad(r, pt(i0, j, z0), pt(i1, j, z0), pt(i1, j, z1), pt(i0, j, z1), ink);
}
/** A patch of a shaded wall, the plane i = const. */
function wallI(r: Raster, i: number, j0: number, j1: number, z0: number, z1: number, ink: number) {
  quad(r, pt(i, j0, z0), pt(i, j1, z0), pt(i, j1, z1), pt(i, j0, z1), ink);
}

// Every home is the same prefabricated box, turned one way or the other.
const LONG = 12;
const SHORT = 5;
const LEVEL = 7;
const LEVELS = 7;
const SPAN_I = 46;
const SPAN_J = 20;

type Box = { i: number; j: number; z: number; li: number; lj: number };

const area = (a: Box, b: Box) =>
  Math.max(0, Math.min(a.i + a.li, b.i + b.li) - Math.max(a.i, b.i)) *
  Math.max(0, Math.min(a.j + a.lj, b.j + b.lj) - Math.max(a.j, b.j));
const clear = (a: Box, b: Box) =>
  a.i + a.li + 1 <= b.i || b.i + b.li + 1 <= a.i || a.j + a.lj + 1 <= b.j || b.j + b.lj + 1 <= a.j;

/**
 * Stacks the homes by a seeded rule, the way the complex steps up from the
 * river: each level draws in from the one below, and every home rests at
 * least partly on a home beneath it, the rest cantilevered.
 */
function stack(seed: number): Box[] {
  const rand = seeded(seed);
  const boxes: Box[] = [];
  for (let level = 0; level < LEVELS; level++) {
    const z = level * LEVEL;
    const i0 = Math.round(level * 2.6);
    const i1 = Math.round(SPAN_I - level * 2.2);
    const j0 = Math.round(level * 1.1);
    const j1 = Math.round(SPAN_J - level * 1.4);
    const want = Math.max(1, Math.round(6 - level * 0.85));
    let placed = 0;
    for (let tries = 0; tries < 400 && placed < want; tries++) {
      const long = rand() < 0.5;
      const li = long ? LONG : SHORT;
      const lj = long ? SHORT : LONG;
      if (i1 - i0 < li || j1 - j0 < lj) continue;
      const b: Box = {
        i: i0 + Math.floor(rand() * (i1 - i0 - li + 1)),
        j: j0 + Math.floor(rand() * (j1 - j0 - lj + 1)),
        z,
        li,
        lj,
      };
      const peers = boxes.filter((o) => o.z === z);
      if (!peers.every((o) => clear(o, b))) continue;
      if (level > 0) {
        const below = boxes.filter((o) => o.z === z - LEVEL);
        const support = below.reduce((sum, o) => sum + area(o, b), 0);
        if (support < 0.4 * li * lj) continue;
      }
      boxes.push(b);
      placed++;
    }
  }
  return boxes;
}

const homes = stack(47);
const TOP = (1 + Math.max(...homes.map((h) => h.z / LEVEL))) * LEVEL;
const I0 = Math.min(...homes.map((h) => h.i));
const I1 = Math.max(...homes.map((h) => h.i + h.li));
const J0 = Math.min(...homes.map((h) => h.j));
const J1 = Math.max(...homes.map((h) => h.j + h.lj));

/** Whether two boxes' outlines overlap on screen (the three axes of the hexagon). */
function overlaps(a: Box, b: Box) {
  const ranges = (h: Box) => [
    [h.i - (h.j + h.lj), h.i + h.li - h.j],
    [2 * h.i - (h.z + LEVEL), 2 * (h.i + h.li) - h.z],
    [2 * h.j - (h.z + LEVEL), 2 * (h.j + h.lj) - h.z],
  ];
  const ra = ranges(a);
  const rb = ranges(b);
  return ra.every(([a0, a1], k) => a1! > rb[k]![0]! && rb[k]![1]! > a0!);
}

/** Whether `a` must be painted before `b`: the viewer looks from +i, +j, +z. */
function behind(a: Box, b: Box) {
  if (a.i + a.li <= b.i) return true;
  if (b.i + b.li <= a.i) return false;
  if (a.j + a.lj <= b.j) return true;
  if (b.j + b.lj <= a.j) return false;
  return a.z + LEVEL <= b.z;
}

/** Painter's order: every home that hides part of another is drawn after it. */
function paintOrder(boxes: Box[]) {
  const done = new Set<Box>();
  const order: Box[] = [];
  const visit = (b: Box) => {
    if (done.has(b)) return;
    done.add(b);
    for (const other of boxes) if (other !== b && overlaps(other, b) && behind(other, b)) visit(other);
    order.push(b);
  };
  boxes.forEach(visit);
  return order;
}

/** Whether a point on a home's roof is open to the sky. */
function open(i: number, j: number, z: number) {
  return !homes.some((h) => h.z === z && i > h.i && i < h.i + h.li && j > h.j && j < h.j + h.lj);
}

function home(r: Raster, h: Box, rand: () => number) {
  const { i, j, z, li, lj } = h;
  const i1 = i + li;
  const j1 = j + lj;
  const roof = z + LEVEL;

  // Walls in sun (j = j1) and in shade (i = i1), then the roof.
  wallJ(r, j1, i, i1, z, roof, P.face);
  wallI(r, i1, j, j1, z, roof, P.shade);
  plane(r, i, j, i1, j1, roof, P.top);

  if (li > lj) {
    // Long wall in the sun: a row of deep windows. Glazed end in the shade.
    for (let k = i + 1; k < i1 - 1; k += 3) wallJ(r, j1, k, k + 2, z + 2, z + 4, P.window);
    wallI(r, i1, j + 0.5, j1 - 0.5, z + 1, z + 5, P.windowShade);
    wallI(r, i1, j + 1.5, j + 2, z + 1, z + 5, P.shade);
  } else {
    // Glazed end in the sun. Long wall in the shade with its windows.
    wallJ(r, j1, i + 0.5, i1 - 0.5, z + 1, z + 5, P.window);
    wallJ(r, j1, i + 1.5, i + 2, z + 1, z + 5, P.face);
    for (let k = j + 1; k < j1 - 1; k += 3) wallI(r, i1, k, k + 2, z + 2, z + 4, P.windowShade);
  }
  // The joint where each home rests on the one below.
  wallJ(r, j1, i, i1, z, z + 1, P.joint);
  wallI(r, i1, j, j1, z, z + 1, P.jointShade);

  // Roof garden where the roof is open: planters along the edge in the sun.
  if (open(i + li / 2, j + lj / 2, roof)) {
    plane(r, i + 1, j1 - 2, i1 - 1, j1 - 1, roof, P.leaf2);
    for (let k = 0; k < 3; k++) {
      const [x, y] = pt(i + 2 + rand() * (li - 4), j1 - 1.5, roof);
      r.disc(x, y - 1, 1.2, P.leaf);
    }
  }
}

function tree(r: Raster, i: number, j: number, s = 1) {
  const [x, y] = pt(i, j);
  r.rect(x, y - 5 * s, 2, 5 * s, P.trunk);
  r.disc(x + 1, y - 9 * s, 4.5 * s, P.leaf2);
  r.disc(x, y - 10.5 * s, 2.6 * s, P.leaf);
}

const SHORE = -14; // the river runs along j < SHORE
const ROAD = J1 + 9; // Avenue Pierre-Dupuy, in front
const ROAD_W = 7;

function ground(r: Raster) {
  const far = 140;
  plane(r, -far, -far, far, far, 0, P.lawn);
  // The river behind, with a promenade along its edge.
  plane(r, -far, -far, far, SHORE, 0, P.water);
  plane(r, -far, SHORE, far, SHORE + 2, 0, P.path);
  const rand = seeded(67);
  for (let k = 0; k < 70; k++) {
    const i = -40 + rand() * 120;
    const j = SHORE - 3 - rand() * 60;
    plane(r, i, j, i + 1.5 + rand() * 2, j + 0.5, 0, P.water2);
  }
  // A path from the avenue up to the homes.
  plane(r, I0 + 14, J1, I0 + 17, ROAD - 1, 0, P.path);
  // The avenue in front, with its curb and centre line.
  plane(r, -far, ROAD - 1, far, ROAD, 0, P.curb);
  plane(r, -far, ROAD, far, ROAD + ROAD_W, 0, P.road);
  for (let i = -far; i < far; i += 6) plane(r, i, ROAD + 3, i + 3, ROAD + 4, 0, P.line);
}

function still(): Raster {
  const r = new Raster(W, H);
  ground(r);
  tree(r, -8, 4);
  tree(r, -2, -8, 0.9);
  const rand = seeded(1967);
  for (const h of paintOrder(homes)) home(r, h, rand);
  tree(r, -6, J1 + 4);
  tree(r, 6, J1 + 5, 0.9);
  tree(r, 34, J1 + 5);
  return r;
}

const STILL = still();
/** Inks of the homes and trees, which hide the far side of the gold plane. */
const hidden = new Set<number>([
  P.top,
  P.face,
  P.shade,
  P.joint,
  P.jointShade,
  P.window,
  P.windowShade,
  P.leaf,
  P.leaf2,
  P.trunk,
]);

const carEast = sprite([" bbbbbb ", "bbggbbgb", "bbbbbbbb", " i    i "], { b: P.blue, g: P.glass, i: P.ink });
const carWest = sprite([" bbbbbb ", "bgbbggbb", "bbbbbbbb", " i    i "], { b: P.brick, g: P.glass, i: P.ink });
const boat = sprite(["  pp  ", "pppppp", " pppp "], { p: P.paper });
const person = sprite([" h ", "sss", " s ", "i i"], { h: P.trunk, s: P.brick, i: P.ink });

/** Seconds per inspection: rise through the levels, hold, then start over. */
const CYCLE = 11;
const RISE = 7;

/** How many levels the gold plane has cleared at `t`. */
function checksDone(t: number) {
  const phase = ((t % CYCLE) + CYCLE) % CYCLE;
  const levels = TOP / LEVEL;
  return Math.min(levels, Math.floor((phase / RISE) * levels));
}

const loop = (v: number, span: number) => ((v % span) + span) % span;

function animate(paint: Painter, t: number) {
  // Traffic both ways on the avenue, a boat on the river, a walker on the path.
  const [ex, ey] = pt(loop(t * 7, 150) - 70, ROAD + 5.5);
  paint.stamp(carEast, ex - 4, ey - 3);
  const [wx, wy] = pt(80 - loop(t * 6 + 40, 150), ROAD + 1.5);
  paint.stamp(carWest, wx - 4, wy - 3);
  const [bx, by] = pt(loop(t * 2.2, 150) - 60, SHORE - 16);
  paint.stamp(boat, bx - 3, by - 2);
  for (let k = 1; k <= 3; k++) paint.rect(bx - 3 - k * 4, by + (k % 2), 3, 1, P.paper);
  const [px, py] = pt(70 - loop(t * 1.5, 110), SHORE + 1);
  paint.stamp(person, px - 1, py - 4);

  // The gold plane: an outline round the whole stack at the height it checks.
  // Its two far edges pass behind the homes, so they hide wherever a home is.
  const phase = ((t % CYCLE) + CYCLE) % CYCLE;
  if (phase < RISE) {
    const z = Math.round((phase / RISE) * TOP);
    const far = (x: number, y: number) => {
      if (!hidden.has(STILL.get(x, y)) && !hidden.has(STILL.get(x + 1, y))) paint.rect(x, y, 2, 1, P.gold);
    };
    for (let i = I0 - 2; i <= I1 + 2; i++) {
      const [x1, y1] = pt(i, J1 + 2, z);
      const [x2, y2] = pt(i, J0 - 2, z);
      paint.rect(x1, y1, 2, 1, P.gold);
      far(x2, y2);
    }
    for (let j = J0 - 2; j <= J1 + 2; j++) {
      const [x1, y1] = pt(I1 + 2, j, z);
      const [x2, y2] = pt(I0 - 2, j, z);
      paint.rect(x1 - 2, y1, 2, 1, P.gold);
      far(x2 - 2, y2);
    }
  }
  // A gold check beside every level already cleared.
  const done = checksDone(t);
  for (let f = 0; f < done; f++) {
    const [x, y] = pt(I1 + 4, J0, f * LEVEL + 3);
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
  still: STILL,
  focus: 0.5,
  animate,
};
