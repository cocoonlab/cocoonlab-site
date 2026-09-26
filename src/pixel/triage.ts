import { type Pt, type View, view } from "./iso.ts";
import { Raster, seeded, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";

/**
 * Cocoon Triage — rue Saint-Paul in Old Montréal, in axonometric: greystone
 * facades under copper mansards, the silver dome of Marché Bonsecours,
 * granite setts and cast-iron lanterns, the river behind. Roadwork takes the
 * far lane (barriers, trench, excavator, cone taper, flashing arrow board);
 * traffic follows a calèche through the lane left open, and the temporary
 * plan is traced around the work in gold.
 */

// Every ink is a Cocoon brand colour (Ink, Soft Black, Ivory, Warm White,
// Stone, Mist Blue, Sage, Sand, Graphite) or an even mix of two; gold is
// kept for the plan.
const P = {
  walk: 1,
  joint: 2,
  curb: 3,
  setts: 4,
  settsDark: 5,
  settsLight: 6,
  cut: 7,
  stone: 8,
  stoneShade: 9,
  pale: 10,
  sand: 11,
  sandShade: 12,
  roof: 13,
  trim: 14,
  window: 15,
  windowShade: 16,
  glow: 17,
  copper: 18,
  copperShade: 19,
  copperTop: 20,
  dome: 21,
  domeLight: 22,
  domeShade: 23,
  ink: 24,
  black: 25,
  graphite: 26,
  gold: 27,
  paper: 28,
  mist: 29,
  trench: 30,
  soil: 31,
  machine: 32,
  machineTop: 33,
  water: 34,
  water2: 35,
} as const;

const palette = [
  "",
  "#e8e2d8", // walk: stone and ivory
  "#d7d0c4", // joint: stone
  "#fefcf8", // curb: warm white
  "#b3a990", // setts: sand and graphite, warm granite
  "#8d9490", // settsDark: graphite
  "#d8c7aa", // settsLight: sand and stone
  "#d7d0c4", // cut: stone
  "#d7d0c4", // stone: greystone in the sun
  "#b2b2aa", // stoneShade: stone and graphite
  "#e8e2d8", // pale: limestone, stone and ivory
  "#e8d9be", // sand: sand and ivory
  "#b3a990", // sandShade: sand and graphite
  "#e8e2d8", // roof: stone and ivory
  "#fefcf8", // trim: warm white
  "#545a56", // window: ink and graphite
  "#1c201b", // windowShade: ink
  "#ebddc4", // glow: sand and warm white
  "#a8b8ac", // copper: sage and mist blue, the verdigris
  "#87977e", // copperShade: sage
  "#c3cabb", // copperTop: sage and warm white
  "#abb7b5", // dome: mist blue and graphite, the tin
  "#e4ebe9", // domeLight: mist blue and warm white
  "#8d9490", // domeShade: graphite
  "#1c201b", // ink
  "#0e0f0d", // black: soft black
  "#8d9490", // graphite
  "#e8a900", // gold
  "#fefcf8", // paper: warm white
  "#c9d9da", // mist blue
  "#545a56", // trench: ink and graphite
  "#b3a990", // soil: sand and graphite
  "#d8be8f", // machine: sand
  "#e8d9be", // machineTop: sand and ivory
  "#c9d9da", // water: mist blue
  "#e4ebe9", // water2: mist blue and warm white
] as const;

// The street across, from the facades (j = 0) toward the viewer.
const WALK = 3; // the far sidewalk
const NEAR = 15; // the near curb
const EDGE = 18; // the near sidewalk ends in a clean cut
const FLOOR = 7;
const DEPTH = 10;

type Stone = "stone" | "pale" | "sand" | "dark";
const walls: Record<Stone, readonly [face: number, shade: number]> = {
  stone: [P.stone, P.stoneShade],
  pale: [P.pale, P.stoneShade],
  sand: [P.sand, P.sandShade],
  dark: [P.stoneShade, P.graphite],
};

type Building = { i: number; w: number; floors: number; stone: Stone; mansard?: boolean };

/** The block across the street, west to east, with the market in its place. */
const MARKET = { i: 44, w: 40 };
const block: Building[] = [
  { i: -56, w: 12, floors: 4, stone: "sand", mansard: true },
  { i: -44, w: 12, floors: 3, stone: "pale" },
  { i: -32, w: 10, floors: 4, stone: "dark", mansard: true },
  { i: -22, w: 13, floors: 5, stone: "pale" },
  { i: -9, w: 11, floors: 3, stone: "sand", mansard: true },
  { i: 2, w: 12, floors: 4, stone: "stone" },
  { i: 14, w: 10, floors: 3, stone: "dark", mansard: true },
  { i: 24, w: 9, floors: 4, stone: "pale" },
  { i: 33, w: 11, floors: 5, stone: "sand" },
  { i: 84, w: 12, floors: 4, stone: "pale", mansard: true },
  { i: 96, w: 13, floors: 3, stone: "dark" },
  { i: 109, w: 11, floors: 5, stone: "sand" },
  { i: 120, w: 14, floors: 4, stone: "stone", mansard: true },
  { i: 134, w: 12, floors: 3, stone: "pale" },
  { i: 146, w: 12, floors: 4, stone: "sand", mansard: true },
  { i: 158, w: 14, floors: 3, stone: "dark" },
];

/** A box seen from +i, +j, +z: side in shade, front in sun, top. */
function box(r: Raster, v: View, i0: number, j0: number, z0: number, i1: number, j1: number, z1: number, top: number, face: number, side: number) {
  v.wallI(r, i1, j0, j1, z0, z1, side);
  v.wallJ(r, j1, i0, i1, z0, z1, face);
  v.plane(r, i0, j0, i1, j1, z1, top);
}

/** A one-pixel line between two points of the frame. */
function seg(r: Raster, v: View, a: readonly [number, number, number], b: readonly [number, number, number], ink: number) {
  const [x0, y0] = v.pt(...a);
  const [x1, y1] = v.pt(...b);
  r.line(x0, y0, x1, y1, ink);
}

function building(r: Raster, v: View, b: Building, rand: () => number) {
  const i0 = b.i;
  const i1 = b.i + b.w;
  const H = b.floors * FLOOR + 2;
  const [face, shade] = walls[b.stone];
  box(r, v, i0, -DEPTH, 0, i1, 0, H, P.roof, face, shade);

  // Shopfronts between stone piers, each under its painted sign band.
  const sign = [P.copperShade, P.windowShade, P.soil][b.floors % 3]!;
  for (let k = i0 + 1; k + 2 <= i1 - 0.5; k += 3) {
    v.wallJ(r, 0, k, k + 2, 0, 4, P.window);
    v.wallJ(r, 0, k + 1.3, k + 2, 0, 3.5, P.windowShade);
    v.wallJ(r, 0, k, k + 2, 4, 5, sign);
  }
  v.wallJ(r, 0, i0, i1, FLOOR - 1, FLOOR, P.trim);

  // Tall windows on every floor above, each under a stone lintel.
  const n = Math.floor((b.w - 1) / 2.5);
  const start = i0 + (b.w - (n * 2.5 - 1.5)) / 2;
  for (let f = 1; f < b.floors; f++) {
    const z = f * FLOOR;
    for (let k = 0; k < n; k++) {
      const x = start + k * 2.5;
      v.wallJ(r, 0, x, x + 1, z + 0.5, z + 4.5, rand() < 0.12 ? P.mist : P.window);
      v.wallJ(r, 0, x - 0.25, x + 1.25, z + 4.5, z + 5.5, P.trim);
    }
  }
  v.wallJ(r, 0, i0, i1, H - 1, H, P.trim);

  if (b.mansard) {
    // A copper mansard, dormers along its slope, closed by the firewall.
    const top = H + 6;
    const set = 2.5;
    v.quad(r, v.pt(i0, 0, H), v.pt(i1, 0, H), v.pt(i1, -set, top), v.pt(i0, -set, top), P.copper);
    v.plane(r, i0, -DEPTH, i1, -set, top, P.copperTop);
    v.quad(r, v.pt(i1, 0, H), v.pt(i1, -set, top), v.pt(i1, -DEPTH, top), v.pt(i1, -DEPTH, H), shade);
    for (let k = i0 + 1.5; k + 1.6 <= i1 - 1; k += 3.5) {
      v.wallJ(r, -0.8, k, k + 1.6, H + 1.6, H + 5, P.trim);
      v.wallJ(r, -0.8, k + 0.4, k + 1.2, H + 2, H + 4.4, P.window);
    }
    box(r, v, i1 - 1.4, -set - 2.2, top, i1, -set - 0.8, top + 3, P.roof, face, shade);
  } else {
    box(r, v, i1 - 1.4, -2.4, H, i1, -1, H + 3, P.roof, face, shade);
  }
}

/** The silver dome of Marché Bonsecours on its drum, centred at (i, j, z). */
function dome(r: Raster, v: View, i: number, j: number, z: number) {
  const [cx, base] = v.pt(i, j, z);
  const rx = 10; // half-width of drum and dome, in cells
  const drum = 9;
  const ry = 14;
  const cy = base - drum;
  const arc = (u: number) => (rx / 2) * Math.sqrt(Math.max(0, 1 - u * u));

  // The drum: its front half-round, windows between piers.
  r.fill(cx - rx, cy - 1, rx * 2 + 1, drum + rx, P.stone, (x, y) => {
    const u = (x - cx) / rx;
    return Math.abs(u) <= 1 && y >= cy + arc(u) && y <= base + arc(u);
  });
  r.fill(cx - rx, cy - 1, rx * 2 + 1, drum + rx, P.stoneShade, (x, y) => {
    const u = (x - cx) / rx;
    return u > 0.45 && u <= 1 && y >= cy + arc(u) && y <= base + arc(u);
  });
  for (const u of [-0.72, -0.36, 0, 0.36, 0.72]) {
    const x = Math.round(cx + u * rx);
    const y0 = Math.round(cy + arc(u) + 2);
    r.rect(x, y0, 1, drum - 3, u > 0.45 ? P.windowShade : P.window);
  }
  for (let x = cx - rx; x <= cx + rx; x++) r.set(x, Math.round(cy + arc((x - cx) / rx) + 1), P.trim);

  // The dome, lit from the left, with its ribs.
  r.fill(cx - rx, cy - ry - 1, rx * 2 + 1, ry + rx, P.dome, (x, y) => {
    const u = (x - cx) / rx;
    return Math.abs(u) <= 1 && y <= cy + arc(u) && y >= cy - ry * Math.sqrt(1 - u * u);
  });
  r.fill(cx - rx, cy - ry - 1, rx * 2 + 1, ry + rx, P.domeShade, (x, y) => {
    const u = (x - cx) / rx;
    return u > 0.4 && u <= 1 && y <= cy + arc(u) && y >= cy - ry * Math.sqrt(1 - u * u);
  });
  r.fill(cx - rx, cy - ry - 1, rx * 2 + 1, ry + rx, P.domeLight, (x, y) => {
    const u = (x - cx) / rx;
    const w = (cy - y) / ry;
    return u < -0.1 && u > -0.75 && w > 0.2 && u * u + w * w < 0.7;
  });
  for (const phi of [-1.05, -0.5, 0.05, 0.6]) {
    for (let k = 0; k <= 24; k++) {
      const lat = (k / 24) * (Math.PI / 2) * 0.92;
      const x = cx + rx * Math.sin(phi) * Math.cos(lat);
      const y = cy - ry * Math.sin(lat) + (rx / 2) * Math.cos(lat) * Math.cos(phi);
      r.set(x, y, P.domeShade);
    }
  }

  // The lantern and its finial.
  r.rect(cx - 2, cy - ry - 4, 5, 4, P.trim);
  r.rect(cx + 1, cy - ry - 4, 2, 4, P.stoneShade);
  r.rect(cx - 1, cy - ry - 3, 1, 2, P.window);
  r.rect(cx - 2, cy - ry - 5, 5, 1, P.domeShade);
  r.rect(cx - 1, cy - ry - 6, 3, 1, P.dome);
  r.rect(cx, cy - ry - 9, 1, 3, P.ink);
}

/** Marché Bonsecours: the long market hall, its portico and pediment, and the dome. */
function market(r: Raster, v: View, rand: () => number) {
  const i0 = MARKET.i;
  const i1 = MARKET.i + MARKET.w;
  const mid = MARKET.i + MARKET.w / 2;
  const D = 13;
  const H = 3 * FLOOR + 2;
  const back = -1;

  box(r, v, i0, -D, 0, i1, back, H, P.roof, P.stone, P.stoneShade);
  for (let f = 0; f < 3; f++) {
    const z = f * FLOOR;
    for (let k = i0 + 1.25; k + 1 <= i1 - 0.5; k += 2.5) {
      if (k > mid - 7.5 && k < mid + 6.5) continue;
      if (f === 0) v.wallJ(r, back, k - 0.2, k + 1.2, 0, 5, P.windowShade);
      else v.wallJ(r, back, k, k + 1, z + 0.5, z + 4.5, rand() < 0.12 ? P.mist : P.window);
    }
    if (f > 0) v.wallJ(r, back, i0, i1, z - 0.8, z, P.trim);
  }
  v.wallJ(r, back, i0, i1, H - 1.5, H, P.trim);

  // The central pavilion, forward of the hall and taller, with its portico.
  const p0 = mid - 6;
  const p1 = mid + 6;
  const ph = H + 2;
  box(r, v, p0, -4, 0, p1, 0, ph, P.roof, P.stone, P.stoneShade);
  v.wallJ(r, 0, p0 + 0.8, p1 - 0.8, 0, 2 * FLOOR, P.stoneShade);
  for (let k = p0 + 1.4; k + 1 <= p1 - 1; k += 1.9) {
    v.wallJ(r, 0, k + 0.4, k + 0.9, 0.5, 5, P.windowShade);
    v.wallJ(r, 0, k - 0.5, k + 0.3, 0, 2 * FLOOR, P.trim);
  }
  v.wallJ(r, 0, p1 - 1.3, p1 - 0.5, 0, 2 * FLOOR, P.trim);
  v.wallJ(r, 0, p0, p1, 2 * FLOOR, 2 * FLOOR + 1.5, P.trim);
  for (let k = p0 + 1.5; k + 1 <= p1 - 1; k += 2.5) v.wallJ(r, 0, k, k + 1, 2 * FLOOR + 2.5, 2 * FLOOR + 6, P.window);
  v.wallJ(r, 0, p0, p1, ph - 1.5, ph, P.trim);

  dome(r, v, mid, -7, ph);

  // The pediment and its roof, in front of the drum.
  const apex = ph + 5;
  v.quad(r, v.pt(p0, 0, ph), v.pt(mid, 0, apex), v.pt(mid, -3, apex), v.pt(p0, -3, ph), P.domeLight);
  v.quad(r, v.pt(mid, 0, apex), v.pt(p1, 0, ph), v.pt(p1, -3, ph), v.pt(mid, -3, apex), P.domeShade);
  r.polygon([v.pt(p0, 0, ph), v.pt(mid, 0, apex), v.pt(p1, 0, ph)], P.trim);
  seg(r, v, [p0 + 1, 0, ph + 0.5], [p1 - 1, 0, ph + 0.5], P.stone);
}

const lampPost = sprite([" i ", "igi", "igi", "iii", " i ", " i ", " i ", " i ", " i ", " i ", " i ", "iii"], {
  i: P.ink,
  g: P.glow,
});
const lampAt = (v: View, i: number, j: number): Pt => {
  const [x, y] = v.pt(i, j);
  return [Math.round(x) - 1, Math.round(y) - 11];
};

const cone = sprite([" p ", " c ", "ppp"], { c: P.machine, p: P.paper });
const walker = (shirt: number, stride: boolean) =>
  sprite([" h ", "sss", " s ", stride ? "i i" : " i "], { h: P.ink, s: shirt, i: P.ink });

/** Draws a small object once, in the street's axonometric, as a sprite. */
function model(draw: (r: Raster, v: View) => void) {
  const r = new Raster(30, 22);
  draw(r, view(8, 11));
  return r;
}
const MX = 8;
const MY = 11;

/** A car heading west (-i): its side in the sun, its back toward us. */
const car = (face: number, side: number, top: number) =>
  model((r, v) => {
    box(r, v, 0, 0, 0.8, 4.4, 2, 2.2, top, face, side);
    box(r, v, 1, 0.2, 2.2, 3.4, 1.8, 3.4, top, P.window, P.windowShade);
    for (const i of [0.6, 3.2]) {
      const [x, y] = v.pt(i, 2, 0.8);
      r.rect(x, y - 1, 2, 2, P.ink);
    }
  });

/** A calèche heading west: the horse in front, the driver, the folded hood. */
const caleche = model((r, v) => {
  for (const i of [0.8, 2.3]) seg(r, v, [i, 1.2, 0], [i, 1.2, 1.8], P.graphite);
  box(r, v, 0.6, 0.6, 1.8, 2.8, 1.3, 3.2, P.paper, P.paper, P.stone);
  box(r, v, 0, 0.7, 3, 0.8, 1.2, 4.8, P.paper, P.paper, P.stone);
  seg(r, v, [2.8, 1.3, 2.4], [3.4, 1.4, 2.2], P.ink);
  box(r, v, 3.2, 0.2, 1.2, 6.2, 1.8, 2.8, P.window, P.ink, P.black);
  box(r, v, 3.4, 0.7, 2.8, 4, 1.3, 4.4, P.ink, P.machine, P.soil);
  box(r, v, 5, 0.2, 2.8, 6.2, 1.8, 4.8, P.window, P.ink, P.black);
  const [wx, wy] = v.pt(5.4, 1.9, 1.2);
  r.rect(wx - 1, wy - 1, 3, 3, P.ink);
  r.set(wx, wy, P.graphite);
  const [fx, fy] = v.pt(3.6, 1.9, 0.8);
  r.rect(fx - 1, fy - 1, 2, 2, P.ink);
});

const traffic = [
  { sprite: caleche, gap: 0 },
  { sprite: car(P.mist, P.dome, P.domeLight), gap: 11 },
  { sprite: car(P.paper, P.stone, P.paper), gap: 20 },
  { sprite: car(P.ink, P.black, P.window), gap: 58 },
];

// The work: a closed-off area in the far lane and the cone taper upstream of it
// (traffic heads west, toward -i). The plan is traced around both.
const ZONE = 22;
const TAPER = 15;
const FAR = 4.8; // the fence's far side, just off the curb
const CLOSE = 9.2; // its near side, at the edge of the open lane

/** A light fence along i, at j: a rail on posts. */
function fence(r: Raster, v: View, at: number, from: number, to: number) {
  seg(r, v, [from, at, 3], [to, at, 3], P.paper);
  for (let s = from; s <= to + 0.01; s += 2) seg(r, v, [s, at, 0], [s, at, 3], P.graphite);
}

/** Barrier panels along i (at j) or along j (at i), striped ink and white. */
function barrier(r: Raster, v: View, along: "i" | "j", at: number, from: number, to: number) {
  if (along === "i") {
    v.wallJ(r, at, from, to, 0, 3, P.paper);
    for (let s = from; s < to; s += 2) v.wallJ(r, at, s, s + 1, 0, 3, P.ink);
  } else {
    v.wallI(r, at, from, to, 0, 3, P.stone);
    for (let s = from; s < to; s += 2) v.wallI(r, at, s, s + 1, 0, 3, P.black);
  }
}

/** A hole cut into the street: its floor, the far wall in the sun, the end wall. */
function hole(r: Raster, v: View, i0: number, j0: number, i1: number, j1: number, depth: number) {
  const mask = new Raster(r.width, r.height);
  v.plane(mask, i0, j0, i1, j1, 0, 1);
  const cut = new Raster(r.width, r.height);
  v.plane(cut, i0, j0, i1, j1, -depth, P.trench);
  v.wallJ(cut, j0, i0, i1, -depth, 0, P.soil);
  v.wallI(cut, i0, j0, j1, -depth, 0, P.sandShade);
  for (let k = 0; k < mask.data.length; k++) if (mask.data[k]) r.data[k] = cut.data[k] || P.trench;
}

function workZone(r: Raster, f: Raster, v: View, i0: number) {
  const i1 = i0 + ZONE;
  // In the street: the trench, and the spoil heaped at the far end.
  hole(r, v, i0 + 2, 5.6, i0 + 10, 8.4, 3);
  const [hx, hy] = v.pt(i0 + 19.5, 7.2);
  r.disc(hx, hy - 1, 2.4, P.soil);
  r.disc(hx - 1, hy - 2, 1.3, P.machineTop);

  // Standing in it, drawn in front of the plan: far fence and the west end first.
  fence(f, v, FAR, i0, i1);
  barrier(f, v, "j", i0, FAR, CLOSE);
  // The excavator faces the trench: tracks, house, cab, boom and bucket.
  const e = i0 + 12.5;
  box(f, v, e, 5.3, 0, e + 5, 8.5, 1.4, P.trench, P.ink, P.black);
  box(f, v, e + 0.5, 5.6, 1.4, e + 4.6, 8.2, 4, P.machine, P.machine, P.soil);
  box(f, v, e + 0.5, 6.9, 4, e + 2.5, 8.2, 7.2, P.machine, P.machine, P.soil);
  v.wallJ(f, 8.2, e + 0.8, e + 2.2, 4.6, 6.6, P.windowShade);
  v.wallI(f, e + 2.5, 7.1, 8, 4.6, 6.6, P.windowShade);
  const arm = (a: readonly [number, number], b: readonly [number, number], di: number, dz: number, ink: number) =>
    f.polygon([v.pt(a[0], 7, a[1]), v.pt(b[0], 7, b[1]), v.pt(b[0] + di, 7, b[1] + dz), v.pt(a[0] + di, 7, a[1] + dz)], ink);
  arm([e + 1, 3.4], [e - 3.4, 10], 0, 1.6, P.machine);
  arm([e - 3.4, 10], [e - 6, 1], 0.9, 0, P.soil);
  box(f, v, e - 6.8, 6.3, -0.6, e - 5.2, 7.7, 1.4, P.ink, P.ink, P.black);
  // A crew member at the trench's edge.
  const [wx, wy] = v.pt(i0 + 10.5, 8.6);
  f.stamp(sprite([" p ", "mmm", " m ", "i i"], { p: P.paper, m: P.machine, i: P.ink }), wx - 1, wy - 4);
  // The east end and the near side, in front of everything inside.
  barrier(f, v, "j", i1, FAR, CLOSE);
  barrier(f, v, "i", CLOSE, i0, i1);

  // The cone taper, from the curb back out to the open lane.
  for (let k = 0; k < 6; k++) {
    const [x, y] = v.pt(i1 + 2 + k * 2.6, CLOSE - k * ((CLOSE - FAR) / 5));
    f.stamp(cone, Math.round(x) - 1, Math.round(y) - 2);
  }
  // The arrow board on its trailer, facing oncoming traffic.
  const a = i1 + 2.2;
  box(f, v, a - 0.2, 5.8, 0.4, a + 1.8, 7.6, 1.2, P.graphite, P.graphite, P.ink);
  seg(f, v, [a, 6.7, 1.2], [a, 6.7, 3.6], P.ink);
  v.wallI(f, a, 5, 8.4, 3.6, 7.4, P.black);
}

/** The arrow's lamps, lit when the board flashes: it points to the open lane. */
function arrowCells(v: View, width: number, height: number, i: number) {
  const r = new Raster(width, height);
  seg(r, v, [i, 5.7, 5.5], [i, 7.6, 5.5], P.gold);
  seg(r, v, [i, 7.6, 5.5], [i, 6.8, 6.7], P.gold);
  seg(r, v, [i, 7.6, 5.5], [i, 6.8, 4.3], P.gold);
  const cells: Pt[] = [];
  for (let k = 0; k < r.data.length; k++) if (r.data[k]) cells.push([k % width, Math.floor(k / width)]);
  return cells;
}

type StreetOptions = {
  width: number;
  height: number;
  /** Where the frame's origin sits on the canvas. */
  ox: number;
  oy: number;
  /** Where the work zone begins, along the street. */
  zone: number;
  /** Rue de la Commune and the river, behind the block. */
  river: boolean;
  /**
   * A stretch of the street cut clean at both ends, standing on the page
   * (the product page); without it the street runs off every edge.
   */
  ends?: readonly [number, number];
};

const loop = (value: number, span: number) => ((value % span) + span) % span;
/** Steps along j run down-left, so each two-cell dash sits left of its point. */
const shift = ([x, y]: Pt): Pt => [x - 2, y];
const half = (value: number) => Math.round(value * 2) / 2;

function saintPaul(o: StreetOptions): Scene {
  const v = view(o.ox, o.oy);
  const r = new Raster(o.width, o.height);
  const front = new Raster(o.width, o.height);
  const rand = seeded(1642);
  const [from, to] = o.ends ?? [-90, 220];
  const shore = o.ends ? -38 : -400;

  if (o.river) {
    // The river, its quay, and rue de la Commune running behind the block.
    v.plane(r, from, shore, to, -26, 0, P.water);
    for (let k = 0; k < 260; k++) {
      const i = from + 1 + rand() * (to - from - 5);
      const j = -29 - rand() * Math.min(150, -shore - 32);
      v.plane(r, i, j, i + 1.5 + rand() * 2.5, j + 0.5, 0, P.water2);
    }
    v.plane(r, from, -26, to, -24, 0, P.stoneShade);
    v.plane(r, from, -24, to, -DEPTH, 0, P.walk);
  }

  // The street: sidewalks and granite curbs, setts between, the cut in front.
  v.plane(r, from, 0, to, WALK, 0, P.walk);
  v.plane(r, from, WALK, to, NEAR, 0, P.setts);
  v.plane(r, from, NEAR, to, EDGE, 0, P.walk);
  v.plane(r, from, WALK - 0.5, to, WALK, 0, P.curb);
  v.plane(r, from, NEAR, to, NEAR + 0.5, 0, P.curb);
  v.wallJ(r, EDGE, from, to, -2.5, 0, P.cut);
  if (o.ends) v.wallI(r, to, o.river ? shore : -13, EDGE, -2.5, 0, P.stoneShade);
  for (let i = from; i < to; i += 4) {
    v.plane(r, i, 0, i + 0.5, WALK - 0.5, 0, P.joint);
    v.plane(r, i + 2, NEAR + 0.5, i + 2.5, EDGE, 0, P.joint);
  }
  // Setts: every stone catches the light on its west side.
  for (let y = 0; y < o.height; y++) {
    for (let x = 0; x < o.width; x++) {
      if (r.get(x, y) !== P.setts) continue;
      const u = (x - o.ox) & 7;
      const w = (y - o.oy) & 3;
      if ((u === 0 && w === 0) || (u === 4 && w === 2)) {
        r.set(x, y, P.settsLight);
        if (r.get(x + 1, y) === P.setts) r.set(x + 1, y, P.settsDark);
      }
    }
  }

  // The block, west to east, the market in its place; a cut stretch keeps
  // only what stands inside it.
  const seed = seeded(1847);
  const within = (b: Building): Building | null => {
    const i0 = Math.max(b.i, from);
    const i1 = Math.min(b.i + b.w, to);
    return i1 - i0 >= 4 ? { ...b, i: i0, w: i1 - i0 } : null;
  };
  for (const b of block.filter((b) => b.i < MARKET.i)) {
    const part = within(b);
    if (part) building(r, v, part, seed);
  }
  if (from <= MARKET.i && MARKET.i + MARKET.w <= to) market(r, v, seed);
  for (const b of block.filter((b) => b.i > MARKET.i)) {
    const part = within(b);
    if (part) building(r, v, part, seed);
  }
  for (let i = from + 6; i < to - 2; i += 20) {
    const [x, y] = lampAt(v, i, 2.2);
    r.stamp(lampPost, x, y);
  }

  workZone(r, front, v, o.zone);
  const arrow = arrowCells(v, o.width, o.height, o.zone + ZONE + 2.2);

  // The plan's outline, once round: far side, east end, near side, west end.
  const [i0, i1, j0, j1] = [o.zone - 2, o.zone + ZONE + TAPER + 2, 4, 10];
  const plan: Pt[] = [];
  for (let i = i0; i < i1; i++) plan.push(v.pt(i, j0));
  for (let j = j0; j < j1; j++) plan.push(shift(v.pt(i1, j)));
  for (let i = i1 - 1; i >= i0; i--) plan.push(v.pt(i, j1));
  for (let j = j1 - 1; j >= j0; j--) plan.push(shift(v.pt(i0, j)));

  /** The stretch of a line along the street at `j` that is in view, as a range of i. */
  const span = (j: number, margin: number): [number, number] =>
    o.ends
      ? [from - margin, to + margin]
      : [
          Math.max(j - o.ox / 2, -o.oy - j) - margin,
          Math.min(j + (o.width - o.ox) / 2, o.height - o.oy - j) + margin,
        ];
  /** Moving things stay inside a cut stretch: the columns past its ends are left out. */
  const clip = (j: number): [number, number] =>
    o.ends ? [v.pt(from, j)[0], v.pt(to, j)[0]] : [-Infinity, Infinity];
  const stamp = (paint: Painter, s: Raster, x: number, y: number, [x0, x1]: [number, number]) => {
    for (let sy = 0; sy < s.height; sy++) {
      for (let sx = 0; sx < s.width; sx++) {
        const ink = s.data[sy * s.width + sx]!;
        if (ink && x + sx >= x0 && x + sx < x1) paint.px(x + sx, y + sy, ink);
      }
    }
  };

  const lanes = [
    { j: 1.6, speed: 1.3, shirt: P.machine, dir: 1, at: 0 },
    { j: 1.2, speed: 1.1, shirt: P.copperShade, dir: -1, at: 37 },
    { j: 16.8, speed: 1.5, shirt: P.ink, dir: -1, at: 12 },
    { j: 16.2, speed: 1.2, shirt: P.mist, dir: 1, at: 58 },
    { j: 16.5, speed: 1.4, shirt: P.sandShade, dir: 1, at: 90 },
  ];

  function walkers(paint: Painter, t: number, near: boolean) {
    for (const w of lanes) {
      if (w.j > WALK !== near) continue;
      const [lo, hi] = span(w.j, 4);
      const d = loop(t * w.speed + w.at, hi - lo);
      const [x, y] = v.pt(half(w.dir > 0 ? lo + d : hi - d), w.j);
      const step = Math.floor(t * 4 + w.at) % 2 === 0;
      stamp(paint, walker(w.shirt, step), Math.round(x) - 1, Math.round(y) - 4, clip(w.j));
    }
  }

  const [west, east] = span(12, 12);
  const lane = clip(11.6);

  function animate(paint: Painter, t: number) {
    walkers(paint, t, false);

    // The temporary plan, traced in marching gold dashes round the work.
    const march = Math.floor(t * 8);
    plan.forEach(([x, y], k) => {
      if ((k + march) % 6 < 3) paint.rect(x, y, 2, 1, P.gold);
    });

    paint.front();
    if (Math.floor(t * 2) % 2 === 0) for (const [x, y] of arrow) paint.px(x, y, P.gold);

    // Traffic follows the calèche west through the open lane.
    const lead = east - loop(t * 2.4, east - west + 60);
    for (const car of traffic) {
      const [x, y] = v.pt(half(lead + car.gap), 10.6);
      stamp(paint, car.sprite, Math.round(x) - MX, Math.round(y) - MY, lane);
    }

    walkers(paint, t, true);
  }

  return { width: o.width, height: o.height, palette, still: r, front, focus: 0.5, animate };
}

/** The homepage panel: the street, the block, and the market's dome. */
export const triageScene = saintPaul({ width: 240, height: 140, ox: 0, oy: 38, zone: 36, river: true });

/** The product page: the market's stretch of the street, cut clean, the river behind. */
export const triageLandingScene = saintPaul({ width: 272, height: 148, ox: -48, oy: 4, zone: 77, river: true, ends: [44, 120] });
