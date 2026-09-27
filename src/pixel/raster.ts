/**
 * A tiny indexed-colour raster for authoring pixel scenes.
 *
 * Scenes are drawn once into a `Raster` (one byte per cell, 0 = transparent)
 * and painted to a canvas at one canvas pixel per cell; CSS then scales the
 * canvas by a whole number with `image-rendering: pixelated`, so every cell
 * stays a crisp square.
 */

export type Ink = number;

export class Raster {
  readonly data: Uint8Array;

  constructor(
    readonly width: number,
    readonly height: number,
  ) {
    this.data = new Uint8Array(width * height);
  }

  set(x: number, y: number, ink: Ink) {
    const cx = Math.round(x);
    const cy = Math.round(y);
    if (cx < 0 || cy < 0 || cx >= this.width || cy >= this.height) return;
    this.data[cy * this.width + cx] = ink;
  }

  get(x: number, y: number): Ink {
    const cx = Math.round(x);
    const cy = Math.round(y);
    if (cx < 0 || cy < 0 || cx >= this.width || cy >= this.height) return 0;
    return this.data[cy * this.width + cx] ?? 0;
  }

  rect(x: number, y: number, w: number, h: number, ink: Ink) {
    for (let yy = Math.round(y); yy < Math.round(y + h); yy++) {
      for (let xx = Math.round(x); xx < Math.round(x + w); xx++) this.set(xx, yy, ink);
    }
  }

  /** Fill every cell of a bounding box that `shape` accepts. */
  fill(x: number, y: number, w: number, h: number, ink: Ink, shape: (x: number, y: number) => boolean) {
    for (let yy = Math.round(y); yy < Math.round(y + h); yy++) {
      for (let xx = Math.round(x); xx < Math.round(x + w); xx++) {
        if (shape(xx, yy)) this.set(xx, yy, ink);
      }
    }
  }

  /** Bresenham line, one cell thick. */
  line(x0: number, y0: number, x1: number, y1: number, ink: Ink) {
    let x = Math.round(x0);
    let y = Math.round(y0);
    const tx = Math.round(x1);
    const ty = Math.round(y1);
    const dx = Math.abs(tx - x);
    const dy = -Math.abs(ty - y);
    const sx = x < tx ? 1 : -1;
    const sy = y < ty ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      this.set(x, y, ink);
      if (x === tx && y === ty) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y += sy;
      }
    }
  }

  disc(cx: number, cy: number, r: number, ink: Ink) {
    this.fill(cx - r - 1, cy - r - 1, r * 2 + 3, r * 2 + 3, ink, (x, y) => Math.hypot(x - cx, y - cy) <= r + 0.35);
  }

  /** Fill a polygon given as [x, y] points (even-odd scanline). */
  polygon(points: readonly (readonly [number, number])[], ink: Ink) {
    const ys = points.map((p) => p[1]);
    const top = Math.floor(Math.min(...ys));
    const bottom = Math.ceil(Math.max(...ys));
    for (let y = top; y <= bottom; y++) {
      const cy = y + 0.5;
      const hits: number[] = [];
      for (let i = 0; i < points.length; i++) {
        const [ax, ay] = points[i]!;
        const [bx, by] = points[(i + 1) % points.length]!;
        if ((ay <= cy && by > cy) || (by <= cy && ay > cy)) {
          hits.push(ax + ((cy - ay) / (by - ay)) * (bx - ax));
        }
      }
      hits.sort((a, b) => a - b);
      for (let i = 0; i + 1 < hits.length; i += 2) {
        for (let x = Math.round(hits[i]!); x < Math.round(hits[i + 1]!); x++) this.set(x, y, ink);
      }
    }
  }

  /** Copy every opaque cell of `sprite` onto this raster. */
  stamp(sprite: Raster, x: number, y: number) {
    for (let sy = 0; sy < sprite.height; sy++) {
      for (let sx = 0; sx < sprite.width; sx++) {
        const ink = sprite.data[sy * sprite.width + sx]!;
        if (ink) this.set(x + sx, y + sy, ink);
      }
    }
  }
}

/** A sprite authored as rows of characters mapped to inks; spaces are transparent. */
export function sprite(rows: readonly string[], key: Readonly<Record<string, Ink>>): Raster {
  const width = Math.max(...rows.map((row) => row.length));
  const r = new Raster(width, rows.length);
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      const ink = key[c];
      if (ink) r.set(x, y, ink);
    });
  });
  return r;
}

/** Deterministic pseudo-random numbers, so every render of a scene is identical. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** `hex` moved `amount` (0–1) of the way toward Warm White. */
export function lighten(hex: string, amount: number) {
  const light = hexToRgb("#f8f4ec");
  return `#${hexToRgb(hex).map((value, i) => Math.round(value + (light[i]! - value) * amount).toString(16).padStart(2, "0")).join("")}`;
}
