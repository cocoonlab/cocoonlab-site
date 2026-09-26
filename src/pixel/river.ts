import { Raster, seeded, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";

/**
 * The St. Lawrence at eye level: the far shore, the Jacques-Cartier Bridge,
 * downtown under Mount Royal and the Olympic tower, all pale with distance.
 * The water moves, a ferry crosses, and a gold signal glides along the line
 * where the city meets the river, the way it does in Cocoon Triage.
 */

const P = {
  mount: 1,
  far: 2,
  far2: 3,
  mid: 4,
  steel: 5,
  water: 6,
  water2: 7,
  water3: 8,
  paper: 9,
  gold: 10,
  blue: 11,
  sun: 12,
  copper: 13,
} as const;

const palette = [
  "",
  "#d9e0d5", // mount
  "#cdd8d6", // far
  "#b6c6c7", // far2
  "#9cb1b5", // mid
  "#1f4d58", // steel
  "#dfe8e7", // water
  "#cbdada", // water2
  "#b3c7c9", // water3
  "#f7f7f2", // paper
  "#e8a900", // gold
  "#3a606e", // blue
  "#efce6e", // sun
  "#86ab9c", // copper
] as const;

const W = 640;
const H = 72;
const SHORE = 50; // where the city meets the water

function still(): Raster {
  const r = new Raster(W, H);
  r.disc(512, 14, 6, P.sun);

  // Mount Royal, its cross, and downtown kept below its summit.
  const peak = 352;
  for (let x = 190; x < 520; x++) {
    const d = (x - peak) / (x < peak ? 70 : 96);
    const top = Math.round(SHORE - 40 * Math.exp(-(Math.abs(d) ** 2.4)));
    r.rect(x, top, 1, SHORE - top, P.mount);
  }
  r.rect(peak, 2, 1, 8, P.mid);
  r.rect(peak - 2, 4, 5, 1, P.mid);
  const towers: [number, number, number, number][] = [
    [282, 7, 30, P.far2],
    [291, 9, 22, P.mid],
    [302, 6, 26, P.far2],
    [310, 8, 16, P.mid],
    [320, 7, 20, P.mid],
    [329, 6, 24, P.far2],
    [337, 9, 28, P.mid],
    [348, 6, 32, P.far2],
  ];
  for (const [x, w, top, ink] of towers) {
    r.rect(x, top, w, SHORE - top, ink);
    for (let c = x + 2; c < x + w - 1; c += 3) r.rect(c, top + 2, 1, SHORE - top - 2, P.far);
  }
  for (let i = 0; i < 4; i++) r.rect(310 + i, 15 - i, 8 - i * 2, 1, P.copper);

  // The low city along the shore.
  const rand = seeded(19);
  for (let x = 0; x < W; ) {
    const w = 4 + Math.floor(rand() * 9);
    const h = 2 + Math.floor(rand() * 6);
    r.rect(x, SHORE - h, w, h, P.far);
    x += w + Math.floor(rand() * 3);
  }

  // The Olympic tower leaning over its shell.
  for (let y = 22; y < SHORE; y++) {
    const t = (SHORE - y) / 28;
    const left = Math.round(452 + 14 * t ** 1.15);
    const right = Math.round(457 + 13 * t ** 0.9);
    r.rect(left, y, right - left + 1, 1, P.far2);
  }
  for (let x = 460; x < 492; x++) {
    const s = (2 * (x - 460)) / 32 - 1;
    const top = Math.round(SHORE - 3 - 4 * Math.sqrt(Math.max(0, 1 - Math.abs(s) ** 3)));
    r.rect(x, top, 1, SHORE - top, P.far2);
  }

  // The Jacques-Cartier Bridge, small with distance.
  const deck = 40;
  r.rect(0, deck, 270, 1, P.steel);
  const chord = (x: number) => {
    const ease = (v: number) => (1 - Math.cos(Math.PI * v)) / 2;
    if (x < 130) return deck - 2 - 10 * ease((x - 100) / 30);
    if (x < 160) return deck - 12 + 6 * ease((x - 130) / 30);
    if (x < 190) return deck - 6 - 6 * ease((x - 160) / 30);
    return deck - 12 + 10 * ease((x - 190) / 30);
  };
  for (let x = 100; x <= 220; x++) {
    const y = Math.round(chord(x));
    r.set(x, y, P.steel);
    if (x % 4 === 0) r.rect(x, y, 1, deck - y, P.steel);
  }
  for (const px of [130, 190]) r.rect(px - 1, deck + 1, 3, SHORE - deck - 1, P.far2);
  for (const px of [60, 240]) r.rect(px, deck + 1, 1, SHORE - deck - 1, P.steel);

  // The river, with reflections of the towers and the piers.
  r.rect(0, SHORE, W, H - SHORE, P.water);
  for (let y = SHORE; y < H; y += 2) {
    const depth = y - SHORE;
    for (const [x, w, , ink] of towers) if (depth < 14) r.rect(x + 1, y, w - 2, 1, ink === P.mid ? P.water3 : P.water2);
    for (const px of [130, 190]) if (depth < 10) r.rect(px - 1, y, 3, 1, P.water3);
    if (depth > 1 && depth % 4 === 2) r.rect(508 - (depth % 8), y, 6, 1, P.paper);
  }
  for (let y = SHORE + 3; y < H; y++) {
    for (let x = Math.floor(rand() * 16); x < W; x += 14 + Math.floor(rand() * 30)) {
      r.rect(x, y, 3 + Math.floor(rand() * 6), 1, P.water2);
    }
  }
  return r;
}

const ferry = sprite(["   bbbb   ", " pppppppp ", "pppppppppp"], { b: P.blue, p: P.paper });
const signal = sprite(["  g  ", " ggg ", "ggggg", " ggg ", "  g  "], { g: P.gold });

const loop = (v: number, span: number) => ((v % span) + span) % span;

function animate(paint: Painter, t: number) {
  for (let y = SHORE + 2; y < H; y++) {
    const dx = Math.round(Math.sin(t * 1.4 + y * 0.8));
    if (dx !== 0) paint.shiftRow(y, dx, 0, W);
  }
  const fx = loop(t * 4, W + 40) - 20;
  paint.stamp(ferry, Math.round(fx), SHORE + 6);
  for (let i = 1; i <= 3; i++) paint.rect(Math.round(fx) - i * 4, SHORE + 8 + (i % 2), 3, 1, P.paper);
  // The signal glides east along the shoreline and back.
  const span = W - 60;
  const s = loop(t * 18, span * 2);
  const gx = 30 + (s < span ? s : span * 2 - s);
  paint.stamp(signal, Math.round(gx), SHORE - 3);
}

export const riverScene: Scene = {
  width: W,
  height: H,
  palette,
  still: still(),
  focus: 0.5,
  animate,
};
