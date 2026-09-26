import { Raster, seeded, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";

/**
 * Montréal from the Old Port, drawn flat: the St. Lawrence and the
 * Jacques-Cartier Bridge, the Biosphère on Île Sainte-Hélène, the Olympic
 * Stadium on the horizon, Habitat 67 at the water, downtown under Mount Royal,
 * and the promenade in front. Far planes are pale and cool, near planes darker
 * and warmer; no gradients, no texture, one colour per plane.
 */

const P = {
  cloud: 1,
  sun: 2,
  mount: 3,
  far: 4,
  far2: 5,
  mid: 6,
  mid2: 7,
  blue: 8,
  steel: 9,
  ink: 10,
  stone: 11,
  stone2: 12,
  copper: 13,
  copper2: 14,
  brick: 15,
  sage: 16,
  sage2: 17,
  water: 18,
  water2: 19,
  water3: 20,
  paper: 21,
  pave: 22,
  pave2: 23,
  gold: 24,
  glass: 25,
  trunk: 26,
  wood: 27,
} as const;

const palette = [
  "",
  "#ecebe2", // cloud
  "#efce6e", // sun
  "#d9e0d5", // mount
  "#cdd8d6", // far
  "#b6c6c7", // far2
  "#9cb1b5", // mid
  "#7b979e", // mid2
  "#3a606e", // blue
  "#1f4d58", // steel
  "#1c201b", // ink
  "#e2dccf", // stone
  "#c8bfad", // stone2
  "#86ab9c", // copper
  "#5f8a7c", // copper2
  "#b36a5e", // brick
  "#b0bd90", // sage
  "#869a78", // sage2
  "#dfe8e7", // water
  "#cbdada", // water2
  "#b3c7c9", // water3
  "#f7f7f2", // paper
  "#e7e2d6", // pave
  "#d6d0c2", // pave2
  "#e8a900", // gold
  "#f1ecd8", // glass
  "#5d4b3d", // trunk
  "#a37b58", // wood
] as const;

const W = 640;
const H = 192;
const HORIZON = 126; // top of the far bank
const WATER = 132; // first row of the river
const QUAY = 470; // where the river meets the Old Port on the right
const CURB = 170; // front edge of the promenade
const DECK = 104; // bridge roadway

/** Mount Royal crests above every tower, as the city's height bylaw requires. */
function mountRoyal(r: Raster) {
  const peak = 528;
  for (let x = 380; x < W; x++) {
    const d = (x - peak) / (x < peak ? 86 : 120);
    const top = Math.round(HORIZON + 2 - 94 * Math.exp(-(Math.abs(d) ** 2.4)));
    r.rect(x, top, 1, HORIZON + 3 - top, P.mount);
  }
}

function farBank(r: Raster) {
  const rand = seeded(7);
  r.rect(0, HORIZON, W, WATER - HORIZON, P.far);
  for (let x = 0; x < 372; ) {
    const w = 3 + Math.floor(rand() * 7);
    const h = 1 + Math.floor(rand() * 6);
    if (rand() > 0.35) r.rect(x, HORIZON - h, w, h, P.far);
    x += w + Math.floor(rand() * 4);
  }
}

function olympicStadium(r: Raster) {
  const x0 = 104;
  // The ribbed shell.
  for (let x = x0 + 12; x <= x0 + 56; x++) {
    const s = (2 * (x - x0 - 12)) / 44 - 1;
    const top = Math.round(HORIZON - 3 - 7 * Math.sqrt(Math.max(0, 1 - Math.abs(s) ** 3)));
    for (let y = top; y < HORIZON; y++) {
      const rib = (x - x0) % 3 !== 0;
      if (y <= top + 1 || y >= HORIZON - 1 || rib) r.set(x, y, P.far2);
    }
  }
  // The inclined tower and its cables.
  for (let y = HORIZON - 40; y < HORIZON; y++) {
    const t = (HORIZON - y) / 40;
    const left = Math.round(x0 + 2 + 20 * t ** 1.15);
    const right = Math.round(x0 + 9 + 18 * t ** 0.9);
    r.rect(left, y, right - left + 1, 1, P.far2);
  }
  r.rect(x0 + 21, HORIZON - 38, 5, 1, P.far);
  r.rect(x0 + 21, HORIZON - 36, 5, 1, P.far);
  r.line(x0 + 26, HORIZON - 34, x0 + 32, HORIZON - 10, P.far2);
  r.line(x0 + 26, HORIZON - 33, x0 + 40, HORIZON - 11, P.far2);
  r.line(x0 + 25, HORIZON - 32, x0 + 48, HORIZON - 10, P.far2);
}

function tower(
  r: Raster,
  x: number,
  w: number,
  top: number,
  body: number,
  line: number,
  base = 150,
) {
  r.rect(x, top, w, base - top, body);
  for (let c = x + 2; c < x + w - 1; c += 3) r.rect(c, top + 3, 1, base - top - 3, line);
}

function downtown(r: Raster) {
  // Back row.
  tower(r, 404, 12, 84, P.far2, P.far);
  tower(r, 418, 10, 70, P.far2, P.far);
  tower(r, 548, 12, 72, P.far2, P.far);
  tower(r, 562, 10, 86, P.far2, P.far);
  tower(r, 574, 14, 94, P.far2, P.far);

  // Place Ville Marie, broad and flat, with its beacon.
  tower(r, 430, 22, 62, P.mid, P.far2);
  r.rect(438, 59, 6, 3, P.mid);
  // 1000 De La Gauchetière and its copper pyramid.
  tower(r, 456, 16, 46, P.mid, P.far2);
  for (let i = 0; i < 8; i++) r.rect(456 + i, 45 - i, 16 - i * 2, 1, P.copper2);
  r.rect(463, 35, 2, 3, P.copper2);
  // 1250 René-Lévesque and its stepped crown.
  tower(r, 476, 14, 50, P.mid, P.far2);
  r.rect(477, 47, 12, 3, P.mid);
  r.rect(479, 43, 8, 4, P.mid);
  r.rect(482, 38, 2, 5, P.mid);
  // Tour CIBC and its mast.
  tower(r, 494, 12, 56, P.mid2, P.mid);
  r.rect(499, 52, 2, 4, P.mid2);
  r.rect(499, 42, 1, 10, P.mid2);
  // Tour de la Bourse, dark.
  tower(r, 510, 14, 64, P.mid2, P.mid);
  r.rect(510, 68, 14, 1, P.mid);
  tower(r, 526, 14, 70, P.mid, P.far2);
}

function habitat67(r: Raster) {
  const x0 = 352;
  const ground = WATER - 1;
  // The Cité du Havre quay.
  r.rect(x0 - 4, ground - 1, 76, 2, P.stone2);
  type Box = [x: number, level: number, face: "long" | "end"];
  const boxes: Box[] = [
    [0, 0, "end"], [6, 0, "long"], [17, 0, "long"], [28, 0, "end"], [34, 0, "long"], [45, 0, "end"], [51, 0, "long"], [62, 0, "end"],
    [3, 1, "long"], [14, 1, "end"], [20, 1, "long"], [31, 1, "long"], [42, 1, "end"], [48, 1, "long"], [59, 1, "end"],
    [0, 2, "end"], [8, 2, "long"], [22, 2, "end"], [28, 2, "long"], [39, 2, "long"], [50, 2, "end"],
    [11, 3, "long"], [22, 3, "end"], [28, 3, "end"], [34, 3, "long"], [45, 3, "end"],
    [14, 4, "end"], [20, 4, "long"], [31, 4, "long"],
  ];
  for (const [bx, level, face] of boxes) {
    const x = x0 + bx;
    const y = ground - 1 - (level + 1) * 5 + 1;
    if (face === "long") {
      r.rect(x, y, 10, 4, P.stone);
      r.rect(x + 2, y + 1, 5, 1, P.mid2);
    } else {
      r.rect(x, y, 5, 4, P.stone2);
      r.rect(x + 1, y + 1, 3, 2, P.mid2);
    }
  }
}

function island(r: Raster) {
  r.rect(116, HORIZON + 1, 98, WATER - HORIZON - 1, P.sage2);
  const rand = seeded(3);
  for (let x = 118; x < 210; x += 4 + Math.floor(rand() * 4)) {
    const h = 2 + Math.floor(rand() * 3);
    r.disc(x, HORIZON + 1 - h / 2, h / 2 + 0.5, rand() > 0.5 ? P.sage2 : P.sage);
  }
}

function biosphere(r: Raster) {
  const cx = 170;
  const rad = 17;
  const cy = WATER - 2 - Math.round(rad * 0.62);
  r.fill(cx - rad - 1, cy - rad - 1, rad * 2 + 3, rad * 2 + 3, P.far, (x, y) => {
    const d = Math.hypot(x - cx, y - cy);
    return d <= rad + 0.4 && y < WATER - 1;
  });
  r.fill(cx - rad - 1, cy - rad - 1, rad * 2 + 3, rad * 2 + 3, P.mid2, (x, y) => {
    const d = Math.hypot(x - cx, y - cy);
    if (d > rad + 0.4 || y >= WATER - 1) return false;
    const u = x - cx;
    return d > rad - 0.6 || (u + y + 600) % 5 === 0 || (u - y + 600) % 5 === 0;
  });
}

/** The Jacques-Cartier Bridge: approach trestles over the island, a cantilever
 * truss with two crowned peaks over the river, and a ramp down into the city. */
function bridge(r: Raster) {
  const deck = DECK;
  const a = 200;
  const b = 420;
  const peaks = [252, 368];
  const chord = (x: number) => {
    const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
    if (x <= peaks[0]!) return deck - 4 - 24 * ease((x - a) / (peaks[0]! - a));
    if (x <= 310) return deck - 28 + 14 * ease((x - peaks[0]!) / (310 - peaks[0]!));
    if (x <= peaks[1]!) return deck - 14 - 14 * ease((x - 310) / (peaks[1]! - 310));
    return deck - 28 + 24 * ease((x - peaks[1]!) / (b - peaks[1]!));
  };

  // Main piers.
  for (const px of peaks) {
    r.polygon(
      [
        [px - 3, deck + 2],
        [px + 4, deck + 2],
        [px + 5, WATER],
        [px - 4, WATER],
      ],
      P.stone2,
    );
  }
  // Approach trestles, kept clear of the stadium and the Biosphère.
  for (const x of [26, 58, a - 8]) {
    r.rect(x, deck + 2, 1, HORIZON - deck - 2, P.steel);
    r.rect(x + 5, deck + 2, 1, HORIZON - deck - 2, P.steel);
    r.rect(x, deck + 12, 6, 1, P.steel);
  }

  // Truss: top chord, verticals, and alternating diagonals.
  let prev = Math.round(chord(a));
  for (let x = a; x <= b; x++) {
    const y = Math.round(chord(x));
    r.line(x - 1, prev, x, y, P.steel);
    prev = y;
  }
  for (let x = a; x <= b; x += 6) {
    const y = Math.round(chord(x));
    r.rect(x, y, 1, deck - y, P.steel);
    const nx = Math.min(b, x + 6);
    const ny = Math.round(chord(nx));
    if ((x - a) % 12 === 0) r.line(x, deck - 1, nx, ny, P.steel);
    else r.line(x, y, nx, deck - 1, P.steel);
  }
  // Crowned pinnacles over the piers.
  for (const px of peaks) {
    const y = Math.round(chord(px));
    r.rect(px - 1, y - 7, 3, 7, P.steel);
    r.set(px, y - 8, P.steel);
  }

  // Deck and roadway, then the ramp into the city.
  r.rect(0, deck, b, 2, P.steel);
  r.rect(0, deck + 2, b, 1, P.blue);
  for (let x = b; x < QUAY + 4; x++) {
    const y = Math.round(deck + ((x - b) / (QUAY + 4 - b)) * 22);
    r.rect(x, y, 1, 3, P.steel);
  }
}

function river(r: Raster) {
  r.rect(0, WATER, QUAY, CURB - WATER, P.water);
  r.rect(0, WATER, QUAY, 2, P.water2);
  const rand = seeded(11);
  for (let y = WATER + 3; y < CURB - 1; y++) {
    for (let x = Math.floor(rand() * 12); x < QUAY; x += 10 + Math.floor(rand() * 26)) {
      r.rect(x, y, 3 + Math.floor(rand() * 7), 1, P.water2);
    }
  }
  // Reflections: piers, Habitat 67, the Biosphère, and the sun.
  for (let y = WATER; y < CURB - 1; y += 2) {
    const depth = y - WATER;
    for (const px of [252, 368]) r.rect(px - 3, y, 8 - Math.min(4, depth >> 2), 1, P.water3);
    if (depth < 12) r.rect(356, y, 60 - depth * 4, 1, P.stone2);
    if (depth < 10) r.rect(160, y, 24 - depth * 2, 1, P.water3);
    if (depth > 2 && depth % 4 === 0) r.rect(376 - (depth % 8), y, 6, 1, P.glass);
  }
}

function oldMontreal(r: Raster) {
  const base = 152;
  const building = (x: number, w: number, top: number, face: number, roof: number) => {
    r.rect(x, top, w, base - top, face);
    r.rect(x - 1, top - 3, w + 2, 3, roof);
    r.rect(x, top - 4, w, 1, roof);
    for (let wy = top + 3; wy < base - 3; wy += 6) {
      for (let wx = x + 2; wx < x + w - 2; wx += 5) r.rect(wx, wy, 2, 3, P.mid2);
    }
  };
  building(468, 24, 126, P.stone, P.copper2);
  building(492, 16, 120, P.stone2, P.mid2);
  // The copper dome, drum and lantern.
  r.rect(508, 118, 30, base - 118, P.stone);
  for (let wy = 124; wy < base - 3; wy += 6) for (let wx = 510; wx < 536; wx += 5) r.rect(wx, wy, 2, 3, P.mid2);
  r.rect(514, 108, 18, 10, P.stone2);
  for (let wx = 516; wx < 530; wx += 4) r.rect(wx, 110, 2, 5, P.mid2);
  r.fill(512, 92, 22, 17, P.copper, (x, y) => Math.hypot((x - 522.5) / 9, (y - 108) / 12) <= 1);
  r.fill(512, 92, 22, 17, P.copper2, (x, y) => Math.hypot((x - 522.5) / 9, (y - 108) / 12) <= 1 && x > 525);
  r.rect(521, 91, 3, 5, P.stone2);
  r.rect(522, 89, 1, 2, P.copper2);
  building(540, 22, 124, P.stone2, P.copper2);
  building(562, 20, 118, P.stone, P.mid2);
  building(582, 26, 128, P.stone2, P.copper2);
  building(608, 32, 122, P.stone, P.mid2);
}

function lawn(r: Raster) {
  r.rect(QUAY, 150, W - QUAY, CURB - 150, P.sage);
  r.rect(QUAY, 150, W - QUAY, 1, P.sage2);
  r.rect(QUAY - 2, WATER, 2, CURB - WATER, P.stone2);
}

function tree(r: Raster, x: number, y: number, s: number) {
  r.rect(x - 1, y + s, 3, CURB + 6 - y - s, P.trunk);
  const blobs: [number, number, number, number][] = [
    [0, 0, 1, P.sage2],
    [-0.62, 0.28, 0.66, P.sage2],
    [0.64, 0.3, 0.68, P.sage2],
    [-0.18, -0.52, 0.64, P.sage2],
    [-0.4, -0.32, 0.46, P.sage],
    [0.08, -0.68, 0.4, P.sage],
    [-0.78, 0.1, 0.34, P.sage],
  ];
  for (const [dx, dy, rr, ink] of blobs) r.disc(x + dx * s, y + dy * s, rr * s, ink);
}

function promenade(r: Raster) {
  r.rect(0, CURB, W, H - CURB, P.pave);
  r.rect(0, CURB, W, 1, P.stone2);
  for (let y = CURB + 6; y < H; y += 8) r.rect(0, y, W, 1, P.pave2);
  for (let y = CURB + 1; y < H; y += 8) {
    const shift = ((y - CURB) / 8) % 2 === 0 ? 0 : 11;
    for (let x = shift; x < W; x += 22) r.rect(x, y, 1, 5, P.pave2);
  }
}

function railing(r: Raster) {
  const end = QUAY;
  const top = CURB - 14;
  r.rect(0, top, end, 2, P.ink);
  r.rect(0, CURB - 4, end, 1, P.ink);
  for (let x = 2; x < end; x += 4) r.rect(x, top + 2, 1, 10, P.ink);
  for (let x = 24; x < end; x += 48) {
    r.rect(x, top - 3, 2, 17, P.ink);
    r.rect(x - 1, top - 4, 4, 1, P.ink);
  }
  r.rect(0, CURB - 3, end, 3, P.stone2);
}

function lamp(r: Raster, x: number) {
  const foot = CURB + 10;
  r.rect(x - 2, foot - 3, 6, 3, P.ink);
  r.rect(x, 118, 2, foot - 121, P.ink);
  r.rect(x - 1, 146, 4, 2, P.ink);
  r.rect(x - 3, 106, 8, 12, P.ink);
  r.rect(x - 2, 108, 6, 8, P.glass);
  r.rect(x, 108, 2, 8, P.ink);
  r.rect(x - 2, 104, 6, 2, P.ink);
  r.rect(x, 101, 2, 3, P.ink);
}

function bench(r: Raster, x: number) {
  const y = CURB + 4;
  r.rect(x, y, 22, 2, P.wood);
  r.rect(x, y + 3, 22, 2, P.wood);
  r.rect(x + 1, y - 4, 20, 2, P.wood);
  r.rect(x + 2, y + 5, 1, 4, P.ink);
  r.rect(x + 19, y + 5, 1, 4, P.ink);
}

function planter(r: Raster, x: number) {
  const y = CURB + 2;
  r.rect(x, y - 8, 26, 10, P.stone2);
  r.rect(x, y - 8, 26, 1, P.stone);
  const rand = seeded(x);
  for (let i = 0; i < 9; i++) r.disc(x + 3 + i * 2.5, y - 10 - rand() * 2, 2.4, rand() > 0.4 ? P.sage2 : P.sage);
  for (let i = 0; i < 7; i++) r.set(x + 3 + Math.floor(rand() * 20), y - 11 - Math.floor(rand() * 3), rand() > 0.5 ? P.paper : P.gold);
}

function back(): Raster {
  const r = new Raster(W, H);
  r.disc(380, 30, 9, P.sun);
  mountRoyal(r);
  farBank(r);
  olympicStadium(r);
  downtown(r);
  island(r);
  biosphere(r);
  river(r);
  bridge(r);
  // Habitat 67 sits in front of the bridge's west pier.
  habitat67(r);
  oldMontreal(r);
  lawn(r);
  tree(r, 618, 118, 24);
  tree(r, 572, 130, 17);
  tree(r, 486, 134, 15);
  promenade(r);
  return r;
}

function foreground(): Raster {
  const r = new Raster(W, H);
  railing(r);
  planter(r, 218);
  lamp(r, 150);
  lamp(r, 330);
  lamp(r, 602);
  bench(r, 560);
  return r;
}

/* ------------------------------------------------------------------ */
/* What moves                                                          */
/* ------------------------------------------------------------------ */

const cloudShapes = [
  sprite(["      ######        ", "  ##############    ", "####################"], { "#": P.cloud }),
  sprite(["    #######     ", "################"], { "#": P.cloud }),
  sprite(["        ########          ", "   ###################    ", "##########################"], { "#": P.cloud }),
];

const birdFrames = [
  sprite(["# #", " # "], { "#": P.mid2 }),
  sprite(["   ", "###"], { "#": P.mid2 }),
];

const boat = sprite(
  ["    ####    ", "  ########  ", "############", " ########## "],
  { "#": P.paper },
);
const boatTrim = sprite(["            ", "  ########  ", "            ", " ########## "], { "#": P.blue });

const walker = (shirt: number, legs: number) => [
  sprite([" hh ", " hh ", " ss ", "ssss", "ssss", " ss ", " ll ", " ll ", "l  l", "l  l"], { h: P.trunk, s: shirt, l: legs }),
  sprite([" hh ", " hh ", " ss ", "ssss", "ssss", " ss ", " ll ", " ll ", " ll ", " ll "], { h: P.trunk, s: shirt, l: legs }),
];
const walkers = [walker(P.brick, P.ink), walker(P.blue, P.steel), walker(P.gold, P.ink)];
const cyclist = [
  sprite(
    ["     hh   ", "     ss   ", "    sss   ", "   ss  s  ", "   ll  #  ", " ### l ###", "#   ##   #", "#   #    #", " ###   ### "],
    { h: P.trunk, s: P.blue, l: P.ink, "#": P.ink },
  ),
];

const cars = [P.gold, P.brick, P.paper, P.blue, P.stone2, P.brick, P.paper, P.gold];

const loop = (v: number, span: number) => ((v % span) + span) % span;

function animate(paint: Painter, t: number) {
  // Clouds drift east, slowly.
  cloudShapes.forEach((cloud, i) => {
    const speed = [1.1, 0.8, 0.6][i]!;
    const y = [18, 58, 36][i]!;
    const x = loop(t * speed + i * 230, W + 60) - 40;
    paint.stamp(cloud, Math.round(x), y);
  });

  // Ripples: each row of the river sways a cell either way.
  for (let y = WATER + 2; y < CURB - 1; y++) {
    const dx = Math.round(Math.sin(t * 1.6 + y * 0.9));
    if (dx !== 0) paint.shiftRow(y, dx, 0, QUAY);
  }
  // Sparkles under the sun.
  for (let i = 0; i < 6; i++) {
    const phase = Math.floor(t * 3 + i * 1.7) % 5;
    if (phase < 2) paint.rect(372 + ((i * 7) % 18), WATER + 4 + i * 3, 2, 1, P.paper);
  }

  // Traffic on the bridge deck, both ways.
  cars.forEach((ink, i) => {
    const east = i % 2 === 0;
    const span = 420;
    const x = east ? loop(t * 9 + i * 57, span) : span - loop(t * 8 + i * 71, span);
    paint.rect(Math.round(x), DECK - 2, 3, 2, ink);
  });

  // A tour boat crossing the river, with its wake.
  const bx = loop(t * 3.2, QUAY + 80) - 40;
  const by = WATER + 12;
  paint.stamp(boat, Math.round(bx), by);
  paint.stamp(boatTrim, Math.round(bx), by);
  for (let i = 1; i <= 3; i++) paint.rect(Math.round(bx) - i * 4, by + 3 + (i % 2), 3, 1, P.paper);

  // Birds crossing the sky.
  for (let i = 0; i < 3; i++) {
    const x = W - loop(t * 11 + i * 9, W + 400);
    const y = 64 + i * 5 + Math.round(Math.sin(t * 2 + i) * 2);
    paint.stamp(birdFrames[Math.floor(t * 4 + i) % 2]!, Math.round(x), y);
  }

  paint.front();

  // People on the promenade.
  walkers.forEach((frames, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const x = dir > 0 ? loop(t * 3 + i * 210, W + 20) - 10 : W - loop(t * 2.6 + i * 150, W + 20);
    paint.stamp(frames[Math.floor(t * 4) % 2]!, Math.round(x), CURB + 2 + i * 3);
  });
  paint.stamp(cyclist[0]!, Math.round(loop(t * 12, W + 40) - 20), CURB + 8);

  // Place Ville Marie's beacon turns.
  if (Math.floor(t * 1.5) % 2 === 0) paint.rect(440, 58, 2, 1, P.gold);
}

export const heroScene: Scene = {
  width: W,
  height: H,
  palette,
  still: back(),
  front: foreground(),
  focus: 0.5,
  animate,
};
