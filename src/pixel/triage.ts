import { type Pt, type View, view } from "./iso.ts";
import { lighten, Raster, seeded, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";
import { scanLine } from "./scan.ts";
import { pixelAssembly } from "./cellular.ts";

/**
 * Cocoon Triage — rue Saint-Paul in Old Montréal, in axonometric: greystone
 * facades under copper mansards, the silver dome of Marché Bonsecours,
 * granite setts and cast-iron lanterns, the river behind. The planning
 * sequence defines an intervention, draws a route, and places direction
 * signs. This represents preparation of a signage layout, not a site scan.
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
  "#414b3f", // walk
  "#3b4439", // joint
  "#87977e", // curb
  "#303c32", // setts
  "#263128", // settsDark
  "#3e4b3d", // settsLight
  "#3c483c", // cut
  "#90968b", // grey limestone
  "#525f54", // stoneShade
  "#a4ab9c", // pale limestone
  "#959881", // sand
  "#666a54", // sandShade
  "#a5b3a2", // roof
  "#c9d9da", // trim
  "#293e35", // window
  "#182b24", // windowShade
  "#d8be8f", // glow
  "#7e9688", // copper
  "#526e5e", // copperShade
  "#a8baa5", // copperTop
  "#8ba29f", // dome
  "#c9d9da", // domeLight
  "#586f63", // domeShade
  "#1c201b", // ink
  "#0e0f0d", // black
  "#68796a", // graphite
  "#d8be8f", // planning accent
  "#f8f4ec", // paper
  "#c9d9da", // mist blue
  "#26362d", // trench
  "#4e5a46", // soil
  "#d8be8f", // machine: sand
  "#e8d9be", // machineTop: sand and ivory
  "#22352e", // water
  "#30483d", // water2
] as const;

// The street across, from the facades (j = 0) toward the viewer.
const WALK = 3; // the far sidewalk
const NEAR = 15; // the near curb
const EDGE = 18; // the near sidewalk ends in a clean cut
const FLOOR = 7;
const DEPTH = 8;

type Stone = "stone" | "pale" | "sand" | "dark";
const walls: Record<Stone, readonly [face: number, shade: number]> = {
  stone: [P.stone, P.stoneShade],
  pale: [P.pale, P.stoneShade],
  sand: [P.sand, P.sandShade],
  dark: [P.stoneShade, P.graphite],
};

type Building = { i: number; w: number; floors: number; stone: Stone; mansard?: boolean };

/** A condensed Saint-Paul streetscape: shops, the market, then the chapel.
 * Three distinct groups retain the street's identity without a solid wall. */
const MARKET = { i: 47, w: 40 };
const block: Building[] = [
  { i: 18, w: 12, floors: 3, stone: "stone", mansard: true },
  { i: 30, w: 9, floors: 3, stone: "sand" },
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

function building(r: Raster, v: View, b: Building) {
  const i0 = b.i;
  const i1 = b.i + b.w;
  const H = b.floors * FLOOR + 2;
  const [face, shade] = walls[b.stone];
  box(r, v, i0, -DEPTH, 0, i1, 0, H, P.roof, face, shade);

  // Tall sash windows and limestone lintels, reduced to a two-bay rhythm.
  for (const center of [i0 + b.w * 0.28, i0 + b.w * 0.72]) {
    for (const z of [9, 16]) {
      v.wallJ(r, 0, center - 1, center + 1, z, z + 4, P.windowShade);
      v.wallJ(r, 0, center - 1.3, center + 1.3, z + 4, z + 4.6, P.pale);
      v.wallJ(r, 0, center - 0.8, center - 0.3, z + 0.5, z + 3.5, P.copper);
    }
  }
  v.wallJ(r, 0, i0 + 1.5, i1 - 1.5, 1, 6, P.windowShade);
  v.wallJ(r, 0, i0 + b.w / 2 - 0.3, i0 + b.w / 2 + 0.3, 0, 6, face);
  // A folded shop awning, with an unlettered valance.
  v.quad(r, v.pt(i0 + 0.8, 0, 7), v.pt(i1 - 0.8, 0, 7), v.pt(i1 - 0.8, 2, 5.8), v.pt(i0 + 0.8, 2, 5.8), P.copperShade);
  v.wallJ(r, 2, i0 + 0.8, i1 - 0.8, 5.2, 5.8, P.copper);
  v.wallJ(r, 0, i0, i1, H - 0.6, H, P.copperTop);
  v.plane(r, i0 - 0.5, -0.5, i1 + 0.5, 0.8, H, P.copper);

  if (b.mansard) {
    // One folded copper roof plane, with no tiny decorative details.
    const top = H + 4;
    const set = 2.5;
    v.quad(r, v.pt(i0, 0, H), v.pt(i1, 0, H), v.pt(i1, -set, top), v.pt(i0, -set, top), P.copper);
    v.plane(r, i0, -DEPTH, i1, -set, top, P.copperTop);
    v.quad(r, v.pt(i1, 0, H), v.pt(i1, -set, top), v.pt(i1, -DEPTH, top), v.pt(i1, -DEPTH, H), shade);
    // One dormer and chimney are enough to distinguish the Old Montréal roof.
    const mid = (i0 + i1) / 2;
    box(r, v, mid - 1.2, -3, H + 1, mid + 1.2, -1.4, H + 5, P.roof, P.pale, P.stoneShade);
    v.wallJ(r, -1.4, mid - 0.5, mid + 0.5, H + 2, H + 4, P.window);
    box(r, v, i0 + 1, -7, top, i0 + 2.5, -5.5, top + 3, P.stone, P.stoneShade, P.window);
  }
}

/** The silver dome of Marché Bonsecours on its drum, centred at (i, j, z). */
function dome(r: Raster, v: View, i: number, j: number, z: number) {
  const [cx, base] = v.pt(i, j, z);
  const rx = 10; // the silver dome is the primary geographic signature
  const drum = 10;
  const ry = 12;
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
  for (const phi of [-0.7, 0.5]) {
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
function market(r: Raster, v: View) {
  const i0 = MARKET.i;
  const i1 = MARKET.i + MARKET.w;
  const mid = MARKET.i + MARKET.w / 2;
  const D = 10;
  const H = 2 * FLOOR + 6;
  const back = -1;

  box(r, v, i0, -D, 0, i1, back, H, P.domeShade, P.stone, P.stoneShade);
  // Long, low pitched roof rather than a generic flat pavilion.
  v.quad(r, v.pt(i0, back, H), v.pt(i1, back, H), v.pt(i1, -6, H + 4), v.pt(i0, -6, H + 4), P.dome);
  v.quad(r, v.pt(i0, -6, H + 4), v.pt(i1, -6, H + 4), v.pt(i1, -D, H), v.pt(i0, -D, H), P.domeShade);
  for (let k = i0 + 2; k < i1 - 2; k += 4.5) {
    if (Math.abs(k - mid) < 6) continue;
    v.wallJ(r, back, k, k + 1.7, 11, 17, P.window);
    v.wallJ(r, back, k - 0.3, k + 2, 17, 17.6, P.pale);
    // Tall shop openings form the ground-floor arcade.
    v.wallJ(r, back, k - 0.2, k + 2.1, 0, 6.5, P.windowShade);
    v.wallJ(r, back, k + 0.4, k + 1.5, 6.5, 7.5, P.windowShade);
  }
  v.wallJ(r, back, i0, i1, 8.5, 9, P.pale);
  v.wallJ(r, back, i0, i1, H - 0.6, H, P.copperTop);

  // The central pavilion, forward of the hall and taller, with its portico.
  const p0 = mid - 5.5;
  const p1 = mid + 5.5;
  const ph = H + 2;
  box(r, v, p0, -4, 0, p1, 0, ph, P.roof, P.stone, P.stoneShade);
  v.wallJ(r, 0, p0 + 0.8, p1 - 0.8, 0, 2 * FLOOR, P.stoneShade);
  for (let k = p0 + 1.4; k + 1 <= p1 - 1; k += 2.6) {
    v.wallJ(r, 0, k + 0.4, k + 0.9, 0.5, 5, P.windowShade);
    v.wallJ(r, 0, k - 0.5, k + 0.3, 0, 2 * FLOOR, P.trim);
  }
  v.wallJ(r, 0, p1 - 1.3, p1 - 0.5, 0, 2 * FLOOR, P.trim);
  v.wallJ(r, 0, p0, p1, 2 * FLOOR, 2 * FLOOR + 1.5, P.trim);
  v.wallJ(r, 0, p0, p1, ph - 0.6, ph, P.copperTop);

  dome(r, v, mid, -7, ph);

  // The pediment and its roof, in front of the drum.
  const apex = ph + 5;
  v.quad(r, v.pt(p0, 0, ph), v.pt(mid, 0, apex), v.pt(mid, -3, apex), v.pt(p0, -3, ph), P.domeLight);
  v.quad(r, v.pt(mid, 0, apex), v.pt(p1, 0, ph), v.pt(p1, -3, ph), v.pt(mid, -3, apex), P.domeShade);
  r.polygon([v.pt(p0, 0, ph), v.pt(mid, 0, apex), v.pt(p1, 0, ph)], P.trim);
  seg(r, v, [p0 + 1, 0, ph + 0.5], [p1 - 1, 0, ph + 0.5], P.stone);

  // Small café canopies keep the pavement recognizably Saint-Paul.
  for (const start of [i0 + 1.5, i1 - 10]) {
    v.quad(r, v.pt(start, back, 8), v.pt(start + 8, back, 8), v.pt(start + 8, 2, 6.5), v.pt(start, 2, 6.5), P.copperShade);
    v.wallJ(r, 2, start, start + 8, 6, 6.5, P.copper);
  }
}

/** Notre-Dame-de-Bon-Secours: narrow stone body, central bell tower and spire. */
function chapel(r: Raster, v: View) {
  const i0 = 103;
  const i1 = 116;
  const mid = (i0 + i1) / 2;
  box(r, v, i0, -11, 0, i1, 0, 19, P.domeShade, P.stone, P.stoneShade);
  r.polygon([v.pt(i0, 0, 19), v.pt(mid, 0, 27), v.pt(i1, 0, 19)], P.pale);
  v.quad(r, v.pt(mid, 0, 27), v.pt(mid, -11, 27), v.pt(i1, -11, 19), v.pt(i1, 0, 19), P.copperShade);
  v.wallJ(r, 0, mid - 1.6, mid + 1.6, 0, 7, P.windowShade);
  v.wallJ(r, 0, mid - 1, mid + 1, 7, 8, P.windowShade);
  box(r, v, mid - 2.3, -4, 18, mid + 2.3, 0.4, 34, P.pale, P.stone, P.stoneShade);
  v.wallJ(r, 0.4, mid - 0.8, mid + 0.8, 27, 32, P.windowShade);
  const apex = v.pt(mid, -1.8, 46);
  r.polygon([v.pt(mid - 3, 0.8, 34), apex, v.pt(mid + 3, 0.8, 34)], P.copper);
  r.polygon([apex, v.pt(mid + 3, 0.8, 34), v.pt(mid + 3, -4.8, 34)], P.copperShade);
  seg(r, v, [mid, -1.8, 46], [mid, -1.8, 49], P.domeLight);
  const [cx, cy] = v.pt(mid, -1.8, 48);
  r.rect(cx - 1, cy, 3, 1, P.domeLight);
  for (const k of [i0 + 0.8, i1 - 0.8]) {
    box(r, v, k - 0.8, -1.5, 16, k + 0.8, 0.4, 25, P.pale, P.stone, P.stoneShade);
    r.polygon([v.pt(k - 1.2, 0.4, 25), v.pt(k, -0.5, 29), v.pt(k + 1.2, 0.4, 25)], P.copperShade);
  }
}

const lampPost = sprite([" i ", "igi", "igi", "iii", " i ", " i ", " i ", " i ", " i ", " i ", " i ", "iii"], {
  i: P.ink,
  g: P.glow,
});
const lampAt = (v: View, i: number, j: number): Pt => {
  const [x, y] = v.pt(i, j);
  return [Math.round(x) - 1, Math.round(y) - 11];
};


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
  { sprite: car(P.mist, P.dome, P.domeLight), gap: 0 },
  { sprite: car(P.paper, P.stone, P.paper), gap: 28 },
];

// The closed western end sits beyond a working junction. Approaching cars
// leave via the side street before reaching the barrier.
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
  // A calm, enclosed intervention. No cones, machinery, stripes or rubble.
  v.plane(r, i0, FAR, i1, CLOSE, 0, P.joint);
  v.wallJ(f, CLOSE, i0, i1, 0, 3.2, P.copperTop);
  v.wallI(f, i1, FAR, CLOSE, 0, 3.2, P.copperShade);
  v.plane(f, i0, CLOSE - 0.35, i1, CLOSE, 3.2, P.trim);
  for (let i = i0 + 4; i < i1; i += 5) {
    seg(f, v, [i, CLOSE, 0], [i, CLOSE, 3.2], P.copper);
  }
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
  /** Start whole rather than gathering from scattered pieces. */
  whole?: boolean;
  /** How far (0–1) the buildings move toward Warm White, to stand off the page. */
  lift?: number;
};

/** The inks of the facades, roofs and the market's dome. */
const buildings = new Set<number>([
  P.stone,
  P.stoneShade,
  P.pale,
  P.sand,
  P.sandShade,
  P.roof,
  P.window,
  P.windowShade,
  P.copper,
  P.copperShade,
  P.copperTop,
  P.dome,
  P.domeLight,
  P.domeShade,
]);

const loop = (value: number, span: number) => ((value % span) + span) % span;
/** Steps along j run down-left, so each two-cell dash sits left of its point. */
const shift = ([x, y]: Pt): Pt => [x - 2, y];
const half = (value: number) => Math.round(value * 2) / 2;

/** A readable roadside detour panel, lettered on the same pixel grid. */
function detourSign() {
  const r = new Raster(33, 24);
  r.rect(1, 0, 31, 16, P.gold);
  r.rect(0, 1, 33, 14, P.gold);
  r.rect(2, 1, 29, 1, P.sand);
  pixelWord(r, "DÉTOUR", 5, 4);
  r.line(24, 11, 16, 11, P.ink);
  r.line(16, 11, 11, 15, P.ink);
  r.line(11, 15, 11, 11, P.ink);
  r.line(11, 15, 15, 15, P.ink);
  r.rect(8, 16, 1, 7, P.graphite);
  r.rect(24, 16, 1, 7, P.graphite);
  return r;
}

/** Three-cell lettering, including a drawn acute accent rather than a font. */
function pixelWord(r: Raster, text: string, x0: number, y0: number) {
  const letters: Record<string, readonly string[]> = {
    A: ["010", "101", "111", "101", "101"],
    B: ["110", "101", "110", "101", "110"],
    D: ["110", "101", "101", "101", "110"],
    E: ["111", "100", "110", "100", "111"],
    T: ["111", "010", "010", "010", "010"],
    O: ["010", "101", "101", "101", "010"],
    U: ["101", "101", "101", "101", "111"],
    R: ["110", "101", "110", "101", "101"],
  };
  [...text].forEach((letter, n) => {
    const left = x0 + n * 4;
    if (letter === "É") { r.set(left + 2, y0 - 2, P.ink); r.set(left + 1, y0 - 1, P.ink); }
    letters[letter === "É" ? "E" : letter]!.forEach((row, y) => [...row].forEach((cell, x) => {
      if (cell === "1") r.set(left + x, y0 + y, P.ink);
    }));
  });
}

function closedStreetSign() {
  const r = new Raster(33, 29);
  r.rect(1, 0, 31, 21, P.paper);
  r.rect(0, 1, 33, 19, P.paper);
  r.rect(2, 1, 29, 1, P.gold);
  pixelWord(r, "RUE", 11, 4);
  pixelWord(r, "BARRÉE", 5, 13);
  r.rect(7, 21, 1, 8, P.graphite);
  r.rect(25, 21, 1, 8, P.graphite);
  return r;
}

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
    for (let k = 0; k < 55; k++) {
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
  if (o.ends) v.wallI(r, to, o.river ? shore : -13, EDGE, -2.5, 0, P.cut);
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

  // A perpendicular street, its crosswalk and a small planted corner locate
  // the plan in a walkable waterfront neighbourhood rather than on an island.
  const closure = from + 14;
  const junction = closure + 17;
  v.plane(r, junction - 4, NEAR, junction + 4, 34, 0, P.setts);
  v.plane(r, junction - 5, EDGE, junction - 4, 34, 0, P.curb);
  v.plane(r, junction + 4, EDGE, junction + 5, 34, 0, P.curb);
  for (let j = NEAR + 1; j < EDGE + 2; j += 2) {
    v.plane(r, junction - 3.5, j, junction + 3.5, j + 0.7, 0, P.trim);
  }
  v.plane(r, junction + 8, EDGE + 2, junction + 18, EDGE + 9, 0, P.soil);
  for (const i of [junction + 10, junction + 16]) {
    const [x, y] = v.pt(i, EDGE + 6);
    r.rect(x, y - 8, 1, 8, P.ink);
    r.rect(x - 3, y - 13, 7, 6, P.copperShade);
    r.rect(x - 2, y - 15, 5, 2, P.copper);
  }
  // A few square quay trees give the riverbank a scale cue.
  for (const i of [from + 11, o.zone + 28, to - 9]) {
    const [x, y] = v.pt(i, -20);
    r.rect(x, y - 6, 1, 6, P.graphite);
    r.rect(x - 2, y - 10, 5, 5, P.copperShade);
    r.rect(x - 1, y - 11, 3, 2, P.copper);
  }

  // Open courtyards connect the street to the quay between the three forms.
  // A planted square and a low bench give these gaps purpose and human scale.
  for (const [i0, i1] of [[40, 46], [89, 101]] as const) {
    v.plane(r, i0, -22, i1, 0, 0, P.walk);
    v.plane(r, i0 + 2, -13, i1 - 2, -6, 0, P.soil);
    box(r, v, i0 + 2, -3.5, 0, i1 - 2, -2.5, 1.5, P.copperTop, P.stoneShade, P.joint);
    const [x, y] = v.pt((i0 + i1) / 2, -10);
    r.rect(x, y - 7, 1, 7, P.graphite);
    r.rect(x - 3, y - 13, 7, 6, P.copperShade);
    r.rect(x - 2, y - 15, 5, 3, P.copper);
  }

  // The block, west to east, the market in its place; a cut stretch keeps
  // only what stands inside it.
  const within = (b: Building): Building | null => {
    const i0 = Math.max(b.i, from);
    const i1 = Math.min(b.i + b.w, to);
    return i1 - i0 >= 4 ? { ...b, i: i0, w: i1 - i0 } : null;
  };
  for (const b of block.filter((b) => b.i < MARKET.i)) {
    const part = within(b);
    if (part) building(r, v, part);
  }
  if (from <= MARKET.i && MARKET.i + MARKET.w <= to) market(r, v);
  for (const b of block.filter((b) => b.i > MARKET.i)) {
    const part = within(b);
    if (part) building(r, v, part);
  }
  if (to >= 116) chapel(r, v);
  // Low stone planters along the café frontage, leaving the route legible.
  for (const i of [49, 83]) {
    box(r, v, i, 1, 0, i + 2, 2.4, 1.8, P.copper, P.stoneShade, P.joint);
    const [x, y] = v.pt(i + 1, 1.7, 2.5);
    r.rect(x - 2, y - 1, 4, 2, P.copperShade);
    r.set(x - 1, y - 2, P.copperTop);
  }
  for (let i = from + 6; i < to - 2; i += 20) {
    const [x, y] = lampAt(v, i, 2.2);
    r.stamp(lampPost, x, y);
  }

  // A full-width closed end: exposed sub-base, an orderly stack of paving
  // stones, side hoarding, and a physical barrier across both traffic lanes.
  v.plane(r, from + 1, WALK + 1, closure - 1, NEAR - 1, 0, P.soil);
  hole(r, v, from + 3, WALK + 3, closure - 3, NEAR - 3, 1.8);
  for (let n = 0; n < 3; n++) {
    box(r, v, from + 2 + n * 1.5, WALK + 1, 0, from + 3 + n * 1.5, WALK + 3, 1.5, P.stone, P.stoneShade, P.joint);
  }
  v.wallJ(front, NEAR, from + 1, closure, 0, 3, P.copperShade);
  seg(front, v, [from + 1, NEAR, 3], [closure, NEAR, 3], P.copperTop);
  for (const j of [WALK + .6, NEAR - .6]) {
    seg(front, v, [closure, j, 0], [closure, j, 5], P.graphite);
    seg(front, v, [closure - 1, j, 0], [closure + 1, j, 0], P.ink);
  }
  v.wallI(front, closure, WALK, NEAR, 2, 4.5, P.paper);
  for (let j = WALK; j < NEAR; j += 3) v.wallI(front, closure, j, j + 1.5, 2, 4.5, P.ink);


  // The New Plan workflow prepares editable sign positions and a route.
  // Keep the street as context; draw the proposed layout over it in Sand.
  const route: Pt[] = [];
  const routeCorners = [v.pt(to - 7, 10.6), v.pt(junction + 5, 10.6), v.pt(junction, 15), v.pt(junction, 33)];
  for (let k = 1; k < routeCorners.length; k++) {
    const a = routeCorners[k - 1]!;
    const b = routeCorners[k]!;
    const steps = Math.ceil(Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])));
    for (let n = 0; n < steps; n++) route.push([Math.round(a[0] + (b[0] - a[0]) * n / steps), Math.round(a[1] + (b[1] - a[1]) * n / steps)]);
  }
  const signPositions = [v.pt(junction + 8, 24), v.pt(junction + 21, 17.5)];
  const detour = detourSign();
  const closed = closedStreetSign();
  const closedAt = v.pt(closure + 1, 10);
  const sign = sprite([
    " sssssssssss ",
    "sppppppppppps",
    "spiiiipiiiips",
    "spiiipiiiiips",
    "spiippppppips",
    "spiiipiiiiips",
    "spiiiipiiiips",
    "sppppppppppps",
    " sssssssssss ",
    "      g      ",
    "      g      ",
    "      g      ",
    "     ggg     ",
  ], { s: P.gold, p: P.paper, i: P.ink, g: P.graphite });

  function layout(paint: Painter, elapsed: number) {
    const phase = (elapsed + 2) % 15;
    // A measured layout line is drawn, then sign positions resolve one by one.
    const visible = Math.floor(route.length * Math.min(1, phase / 4));
    for (let n = 0; n < visible; n++) {
      const pt = route[n]!;
      if (n % 8 < 5) paint.px(pt[0], pt[1], P.gold);
    }
    const tip = route[Math.min(visible, route.length - 1)]!;
    if (phase < 4) {
      paint.rect(tip[0] - 1, tip[1] - 1, 3, 3, P.paper);
      paint.px(tip[0], tip[1], P.gold);
    }
    // Directional chevrons stay small and belong to the plan, not the scenery.
    if (phase >= 4) {
      for (const i of [junction + 20, to - 18]) {
        const at = v.pt(i, 10.6);
        scanLine(paint, v.pt(i + 2.5, 9.3), at, P.gold);
        scanLine(paint, at, v.pt(i + 2.5, 11.9), P.gold);
      }
    }
    // The selected work area has precise corner handles.
    for (const i of [from + 1, closure]) {
      for (const j of [WALK, NEAR]) {
        const [x, y] = v.pt(i, j, 3.5);
        paint.rect(x - 1, y - 1, 2, 2, P.gold);
      }
    }
  }

  function signs(paint: Painter, elapsed: number) {
    paint.stamp(closed, closedAt[0] - 16, closedAt[1] - 28);
    const phase = (elapsed + 2) % 15;
    signPositions.forEach(([x, y], n) => {
      const placed = n === 0 || phase >= 2 + n * 1.6;
      if (placed) paint.stamp(n === 0 ? detour : sign, x - (n === 0 ? 16 : 6), y - (n === 0 ? 23 : 12));
      else {
        paint.rect(x - 2, y, 5, 1, P.graphite);
        paint.rect(x, y - 2, 1, 5, P.graphite);
      }
      // The square drafting handle briefly selects each newly placed sign.
      if (placed && phase < 3.3 + n * 1.6) {
        for (const dx of n === 0 ? [-19, 18] : [-9, 8]) for (const dy of n === 0 ? [-26, 2] : [-15, 2]) {
          paint.rect(x + dx, y + dy, 2, 2, P.mist);
        }
      }
    });
  }

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

  function animate(paint: Painter, elapsed: number) {
    const t = elapsed * 0.55;
    walkers(paint, t, false);

    paint.front();


    // Cars approach from the right, then take the side street before the closure.
    const approach = to - 4 - junction;
    const travel = approach + 34 - 10.6;
    for (const car of traffic) {
      const along = loop(t * 2.4 + car.gap, travel + 30);
      if (along > travel) continue;
      const i = along < approach ? to - 4 - along : junction;
      const j = along < approach ? 10.6 : 10.6 + along - approach;
      const [x, y] = v.pt(half(i), half(j));
      stamp(paint, car.sprite, Math.round(x) - MX, Math.round(y) - MY, clip(j));
    }
    layout(paint, elapsed);
    walkers(paint, t, true);
  }

  const cells = pixelAssembly(r, new Set([P.walk, P.joint, P.curb, P.setts, P.settsDark, P.settsLight, P.cut, P.water, P.water2, P.soil]), 7, !o.whole);
  const inks = o.lift ? palette.map((ink, i) => (buildings.has(i) ? lighten(ink, o.lift!) : ink)) : palette;
  return { width: o.width, height: o.height, palette: inks, still: r, front, ...cells, focus: 0.5, animate, overlay: signs };
}

/** The homepage panel: the street, the block, and the market's dome, whole as it scrolls into view. */
export const triageScene = saintPaul({ width: 272, height: 184, ox: -4, oy: 34, zone: 58, river: true, ends: [14, 120], whole: true, lift: 0.15 });

/** The product page: the market's stretch of the street, cut clean, the river behind. */
export const triageLandingScene = saintPaul({ width: 272, height: 148, ox: -48, oy: 4, zone: 77, river: true, ends: [44, 120] });
