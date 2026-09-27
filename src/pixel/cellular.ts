import { Raster, seeded } from "./raster.ts";
import type { AssemblyFrame, PixelPiece, Scene } from "./scene.ts";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => { const v = clamp(n); return v * v * (3 - 2 * v); };
const CELL = 2;

function hash(x: number, y: number, seed: number) {
  let n = Math.imul(x + seed, 374761393) ^ Math.imul(y + seed, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

/** Broad, shared contours avoid the appearance of a rectangular noise filter. */
function field(x: number, y: number, seed: number) {
  const gx = Math.floor(x / 12), gy = Math.floor(y / 12);
  const u = smooth(x / 12 - gx), v = smooth(y / 12 - gy);
  const a = hash(gx, gy, seed) * (1 - u) + hash(gx + 1, gy, seed) * u;
  const b = hash(gx, gy + 1, seed) * (1 - u) + hash(gx + 1, gy + 1, seed) * u;
  return a * (1 - v) + b * v;
}

/** A deterministic Life field; only the perimeter borrows its rhythm. */
function life(seed: number) {
  const w = 48, h = 32;
  const rand = seeded(seed);
  let state = Uint8Array.from({ length: w * h }, () => rand() < .28 ? 1 : 0);
  const frames: Uint8Array[] = [];
  for (let generation = 0; generation < 48; generation++) {
    frames.push(state);
    const next = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let neighbours = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (dx || dy) neighbours += state[((y + dy + h) % h) * w + (x + dx + w) % w]!;
      }
      next[y * w + x] = neighbours === 3 || (neighbours === 2 && state[y * w + x]) ? 1 : 0;
    }
    state = next;
  }
  return (x: number, y: number, t: number) => {
    const tick = t / 1.1;
    const i = Math.floor(tick) % frames.length;
    const k = (y % h) * w + x % w;
    const blend = smooth(tick % 1);
    return frames[i]![k]! * (1 - blend) + frames[(i + 1) % frames.length]![k]! * blend;
  };
}

function distances(r: Raster) {
  const { width: w, height: h } = r;
  const d = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    d[y * w + x] = r.get(x, y) ? Math.min(x + 1, y + 1, w - x, h - y, 64) : 0;
  }
  for (let y = 1; y < h; y++) for (let x = 1; x < w; x++) {
    const k = y * w + x;
    d[k] = Math.min(d[k]!, d[k - 1]! + 1, d[k - w]! + 1);
  }
  for (let y = h - 2; y >= 0; y--) for (let x = w - 2; x >= 0; x--) {
    const k = y * w + x;
    d[k] = Math.min(d[k]!, d[k + 1]! + 1, d[k + w]! + 1);
  }
  return d;
}

type Cell = PixelPiece & {
  coverage: number; threshold: number; phase: number;
  dx: number; dy: number; delay: number; protected: boolean;
};

/**
 * A solid drawing inside a living shore of two-pixel pieces. Samples come
 * from the current animation, so water belongs to the assembly. Slow Life
 * births/deaths shape clusters; a shared wave gathers them. Architecture
 * assembles once, then remains still and legible inside the moving perimeter.
 */
function assembly(r: Raster, coverage: (x: number, y: number) => number,
  direction: (x: number, y: number) => [number, number], seed: number, intro: boolean): NonNullable<Scene["assembly"]> {
  const { width: w, height: h } = r;
  const mask = new Raster(w, h);
  mask.data.fill(255);
  const cells: Cell[] = [];
  const colonies = life(seed);
  for (let y = 0; y < h - 1; y += CELL) for (let x = 0; x < w - 1; x += CELL) {
    if (!r.get(x, y) && !r.get(x + 1, y) && !r.get(x, y + 1) && !r.get(x + 1, y + 1)) continue;
    // Preserve fine architecture whenever a piece includes a protected cell.
    const samples = [[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]] as const;
    const c = Math.max(...samples.filter(([sx, sy]) => r.get(sx, sy)).map(([sx, sy]) => coverage(sx, sy)));
    if (!intro && c >= 1) continue;
    const [dx, dy] = direction(x, y);
    cells.push({ sx: x, sy: y, x, y, size: CELL, alpha: 1, coverage: c,
      threshold: hash(x / CELL, y / CELL, seed + 9),
      phase: field(x, y, seed + 21) * Math.PI * 2,
      dx, dy, delay: (x / w + y / h) * .38 + field(x, y, seed) * .5,
      protected: c >= 1 });
  }
  const pieces: PixelPiece[] = [];
  const frame: AssemblyFrame = { mask, pieces };
  return (t) => {
    pieces.length = 0;
    for (const cell of cells) {
      const { sx: x, sy: y, coverage: c } = cell;
      const arrival = intro ? smooth((t - cell.delay) / 2.6) : 1;
      const pulse = smooth((Math.sin(t * .48 - x * .025 + y * .035 + cell.phase) + .35) / 1.35);
      const living = colonies(x / CELL, y / CELL, t);
      const density = c >= 1 ? 1 : clamp(c + (pulse - .55) * .28 + (living - .3) * .26);
      const opacity = c >= 1 ? 1 : smooth((density - cell.threshold) * 4.1 + .3);
      const looseness = (1 - arrival) + (cell.protected ? 0 : (1 - pulse) * (1 - c) * .72);
      const travel = (cell.protected ? 13 : 18) * looseness;
      cell.x = Math.round(x + cell.dx * travel);
      cell.y = Math.round(y + cell.dy * travel);
      // Taper before the canvas boundary: no new rectangular clipping line.
      const rim = Math.min(cell.x, cell.y, w - cell.x - CELL, h - cell.y - CELL);
      cell.alpha = opacity * (.24 + .76 * arrival) * (cell.protected ? 1 : smooth(rim / 9));
      if (cell.x === x && cell.y === y) {
        mask.rect(x, y, CELL, CELL, Math.round(cell.alpha * 255));
      } else {
        mask.rect(x, y, CELL, CELL, 0);
        if (cell.alpha > .025) pieces.push(cell);
      }
    }
    return frame;
  };
}

export function pixelAssembly(r: Raster, ground: ReadonlySet<number>, seed: number) {
  const d = distances(r);
  const { width: w, height: h } = r;
  const at = (x: number, y: number) => d[Math.max(0, Math.min(h - 1, y)) * w + Math.max(0, Math.min(w - 1, x))]!;
  return { assembly: assembly(r, (x, y) => {
    const rim = Math.min(x, y, w - x - 1, h - y - 1);
    const frame = smooth((rim - 2 + (field(x, y, seed) - .5) * 10) / 24);
    const edge = ground.has(r.get(x, y)) ? smooth((at(x, y) - 1 + (field(x, y, seed + 4) - .5) * 12) / 18) : 1;
    return Math.min(frame, edge);
  }, (x, y) => {
    let dx = at(x - 3, y) - at(x + 3, y);
    let dy = at(x, y - 3) - at(x, y + 3);
    if (!dx && !dy) { dx = (x - w / 2) / w; dy = (y - h / 2) / h; }
    const length = Math.hypot(dx, dy) || 1;
    return [dx / length, dy / length];
  }, seed, true) };
}

/** The promenade becomes irregular islands, then individual cells. */
export function bottomAssembly(r: Raster, start: number) {
  return { assembly: assembly(r, (x, y) => y < start ? 1
    : smooth((r.height - y - 3 + (field(x, y, 31) - .5) * 15) / (r.height - start)),
  (x, y) => [(field(x, y, 32) - .5) * .65, 1], 31, false) };
}
