import { Raster, seeded, sprite } from "./raster.ts";
import type { Painter, Scene } from "./scene.ts";

/**
 * Cocoon Triage — a Montréal street from above during roadwork. Plex roofs
 * line both sides, trees shade the sidewalks, a REV bike lane runs along the
 * south curb. The work zone takes the eastbound curb lane: fence, excavator,
 * cone taper, flashing arrow board. Traffic keeps moving, and the temporary
 * plan is traced around it in gold.
 */

// Every ink is a Cocoon brand colour (Ink, Ivory, Warm White, Stone, Mist
// Blue, Sage, Sand, Graphite) or an even mix of two; gold is kept for the plan.
const P = {
  roof: 1,
  roof2: 2,
  roof3: 3,
  wall: 4,
  hatch: 5,
  walk: 6,
  walk2: 7,
  road: 8,
  road2: 9,
  line: 10,
  bike: 11,
  leaf: 12,
  leaf2: 13,
  ink: 14,
  gold: 15,
  sand: 16,
  mist: 17,
  paper: 18,
  trench: 19,
  graphite: 20,
  glass: 21,
  tar: 22,
  deck: 23,
  window: 24,
} as const;

const palette = [
  "",
  "#f8f4ec", // roof: ivory
  "#fefcf8", // roof2: warm white
  "#e8e2d8", // roof3: stone and ivory
  "#d7d0c4", // wall: stone
  "#b2b2aa", // hatch: stone and graphite
  "#d7d0c4", // walk: stone
  "#e8e2d8", // walk2: stone and ivory
  "#abaca5", // road: graphite and stone
  "#a0a39d", // road2: graphite, deeper
  "#fefcf8", // line: warm white
  "#a9b39f", // bike: sage and ivory
  "#b4bcaa", // leaf: sage, lit
  "#87977e", // leaf2: sage
  "#1c201b", // ink
  "#e8a900", // gold
  "#d8be8f", // sand
  "#c9d9da", // mist blue
  "#fefcf8", // paper: warm white
  "#545a56", // trench: ink and graphite
  "#8d9490", // graphite
  "#c9d9da", // glass: mist blue
  "#e8e2d8", // tar: stone and ivory
  "#e8d9be", // deck: sand and ivory
  "#8d9490", // window: graphite
] as const;

type StreetOptions = {
  width: number;
  height: number;
  /** Row of the north sidewalk; the rest of the cross-section follows from it. */
  top: number;
  /** Plex roofs on both sides, or the street alone on the page. */
  roofs: boolean;
  /** Left edge of the work zone. */
  zoneX: number;
  /** Parked cars along the curb lane, by x. */
  parked: number[];
  /** Street trees on the north sidewalk, by x; the south row is offset. */
  trees: number[];
};

/** A row of plex roofs from above: parapet on the street side, hatches,
 * skylights, the odd rooftop terrace, and the ruelle behind. */
function roofs(r: Raster, width: number, y0: number, y1: number, block: "north" | "south", seed: number) {
  const rand = seeded(seed);
  const tones = [P.roof, P.roof2, P.tar, P.roof, P.roof3, P.roof2];
  // The ruelle runs behind the block, away from the street.
  const lane = block === "north" ? y0 : y1 - 3;
  r.rect(0, lane, width, 3, P.roof3);
  const top = block === "north" ? y0 + 3 : y0;
  const bottom = block === "north" ? y1 : y1 - 3;
  const front = block === "north" ? bottom - 1 : top;
  for (let x = 0; x < width; ) {
    const w = 10 + Math.floor(rand() * 7);
    const tone = tones[Math.floor(rand() * tones.length)]!;
    r.rect(x, top, w, bottom - top, tone);
    r.rect(x + w - 1, top, 1, bottom - top, P.wall);
    r.rect(x, front, w - 1, 1, P.wall);
    const mid = top + ((bottom - top) >> 1);
    if (rand() > 0.6) {
      // Rooftop terrace with its railing.
      r.rect(x + 2, mid - 3, w - 5, 6, P.deck);
      r.rect(x + 2, mid - 3, w - 5, 1, P.hatch);
    } else {
      r.rect(x + 2 + Math.floor(rand() * Math.max(1, w - 6)), mid - 1, 2, 2, P.hatch);
      if (rand() > 0.5) r.rect(x + w - 6, mid + 2, 3, 2, P.glass);
    }
    x += w;
  }
}

function tree(r: Raster, x: number, y: number, s: number) {
  r.disc(x, y, s, P.leaf2);
  r.disc(x - s * 0.3, y - s * 0.3, s * 0.62, P.leaf);
}

/** A car from above: windscreen forward, rear window aft. */
function car(body: number, east: boolean) {
  const rows = [" bbbbbbbb ", "bbrbbbwwbb", "bbrbbbwwbb", " bbbbbbbb "];
  return sprite(east ? rows : rows.map((row) => [...row].reverse().join("")), { b: body, w: P.window, r: P.window });
}
const parkedCars = [P.hatch, P.mist, P.paper, P.sand];
const eastCars = [P.mist, P.paper, P.sand].map((body) => car(body, true));
const westCars = [P.ink, P.graphite, P.paper, P.sand].map((body) => car(body, false));
const bus = sprite(
  ["bbbbbbbbbbbbbbbbbbbb", "bwbllbbllbbllbbllbbb", "bwbllbbllbbllbbllbbb", "bbbbbbbbbbbbbbbbbbbb"],
  { b: P.mist, w: P.paper, l: P.trench },
);
const cyclistEast = sprite(["  s    ", "iishhii", "  s    "], { i: P.ink, s: P.sand, h: P.ink });
const cyclistWest = sprite(["    s  ", "iihhsii", "    s  "], { i: P.ink, s: P.paper, h: P.ink });
const walker = (shirt: number) => sprite([" h ", "shs", " s "], { h: P.ink, s: shirt });

const loop = (v: number, span: number) => ((v % span) + span) % span;

/**
 * A Montréal street from above, west to east across the frame: sidewalks and
 * trees, two traffic lanes around a centre line, the eastbound curb lane
 * closed by the work zone, and the REV bike lane along the south curb.
 */
function street(o: StreetOptions): Scene {
  const W = o.width;
  // Street cross-section, north to south.
  const NORTH_WALK = o.top;
  const WEST_LANE = NORTH_WALK + 8; // westbound traffic
  const CENTER = NORTH_WALK + 20;
  const EAST_LANE = NORTH_WALK + 22; // eastbound traffic
  const CURB_LANE = NORTH_WALK + 34; // eastbound curb lane (parking, closed by the work)
  const BIKE = NORTH_WALK + 44;
  const SOUTH_WALK = NORTH_WALK + 52;
  const SOUTH_ROOFS = NORTH_WALK + 60;
  const ZONE_X = o.zoneX;
  const ZONE_W = 60;

  const r = new Raster(W, o.height);
  if (o.roofs) {
    roofs(r, W, 0, NORTH_WALK - 6, "north", 21);
    roofs(r, W, SOUTH_ROOFS + 6, o.height, "south", 34);
    // Front yards.
    r.rect(0, NORTH_WALK - 6, W, 6, P.walk2);
    r.rect(0, SOUTH_ROOFS, W, 6, P.walk2);
  }
  // Sidewalks with their joints.
  r.rect(0, NORTH_WALK, W, WEST_LANE - NORTH_WALK, P.walk);
  r.rect(0, SOUTH_WALK, W, SOUTH_ROOFS - SOUTH_WALK, P.walk);
  for (let x = 6; x < W; x += 12) {
    r.rect(x, NORTH_WALK, 1, WEST_LANE - NORTH_WALK, P.walk2);
    r.rect(x, SOUTH_WALK, 1, SOUTH_ROOFS - SOUTH_WALK, P.walk2);
  }
  // Roadway, lane lines, the REV bike lane and its separator.
  r.rect(0, WEST_LANE, W, BIKE - WEST_LANE, P.road);
  r.rect(0, CENTER, W, 1, P.sand);
  r.rect(0, CENTER + 1, W, 1, P.road2);
  for (let x = 0; x < W; x += 10) r.rect(x, CURB_LANE, 5, 1, P.line);
  r.rect(0, BIKE - 1, W, 1, P.line);
  r.rect(0, BIKE, W, SOUTH_WALK - BIKE, P.bike);
  for (let x = 4; x < W; x += 30) {
    // A bicycle stencil every so often.
    r.rect(x, BIKE + 3, 2, 2, P.line);
    r.rect(x + 4, BIKE + 3, 2, 2, P.line);
    r.rect(x + 2, BIKE + 2, 2, 1, P.line);
  }
  // Parked cars along the curb lane, clear of the work zone.
  o.parked.forEach((x, i) => r.stamp(car(parkedCars[i % parkedCars.length]!, i % 2 === 0), x, CURB_LANE + 3));
  // Street trees on both sidewalks.
  for (const x of o.trees) {
    tree(r, x, NORTH_WALK - 1, 6);
    tree(r, x + 17, SOUTH_WALK + 7, 6);
  }

  // The work zone: fence, trench, spoil, and a gap for the crossing.
  r.rect(ZONE_X, CURB_LANE + 1, ZONE_W, BIKE - CURB_LANE - 2, P.road2);
  r.rect(ZONE_X + 8, CURB_LANE + 3, 30, 4, P.trench);
  r.rect(ZONE_X + 40, CURB_LANE + 3, 10, 4, P.roof3);
  for (let x = ZONE_X; x < ZONE_X + ZONE_W; x += 2) {
    r.set(x, CURB_LANE, x % 4 === 0 ? P.sand : P.paper);
    r.set(x, BIKE - 2, x % 4 === 0 ? P.sand : P.paper);
  }
  for (let y = CURB_LANE; y < BIKE - 1; y += 2) {
    r.set(ZONE_X, y, y % 4 === 0 ? P.sand : P.paper);
    r.set(ZONE_X + ZONE_W - 1, y, y % 4 === 0 ? P.sand : P.paper);
  }
  // Excavator, seen from above.
  r.rect(ZONE_X + 38, CURB_LANE + 2, 9, 6, P.sand);
  r.rect(ZONE_X + 40, CURB_LANE + 3, 4, 3, P.ink);
  r.rect(ZONE_X + 30, CURB_LANE + 4, 8, 2, P.sand);
  r.rect(ZONE_X + 27, CURB_LANE + 3, 3, 4, P.graphite);
  // Cone taper, west of the zone.
  for (let i = 0; i < 6; i++) {
    const x = ZONE_X - 30 + i * 5;
    const y = BIKE - 3 - Math.round(i * 1.4);
    r.rect(x, y, 2, 2, P.sand);
    r.set(x, y, P.paper);
  }
  // Arrow board frame.
  r.rect(ZONE_X - 5, CURB_LANE + 2, 5, 6, P.ink);

  function animate(paint: Painter, t: number) {
    // Westbound traffic, with a bus.
    [0, 1, 2, 3].forEach((i) => {
      const x = W + 20 - loop(t * 16 + i * 52, W + 60);
      if (i === 2) paint.stamp(bus, Math.round(x), WEST_LANE + 4);
      else paint.stamp(westCars[i % westCars.length]!, Math.round(x), WEST_LANE + 4);
    });
    // Eastbound traffic keeps to the open lane past the work zone.
    [0, 1, 2].forEach((i) => {
      const x = loop(t * 14 + i * 66, W + 60) - 30;
      paint.stamp(eastCars[i % eastCars.length]!, Math.round(x), EAST_LANE + 4);
    });
    // Cyclists on the REV.
    [0, 1].forEach((i) => {
      const east = i === 0;
      const x = east ? loop(t * 9 + 40, W + 20) - 10 : W + 10 - loop(t * 8, W + 20);
      paint.stamp(east ? cyclistEast : cyclistWest, Math.round(x), BIKE + (east ? 4 : 1));
    });
    // People on the sidewalks.
    [P.sand, P.graphite, P.ink, P.mist].forEach((shirt, i) => {
      const north = i % 2 === 0;
      const speed = 3 + i * 0.6;
      const x = north ? loop(t * speed + i * 40, W + 10) - 5 : W + 5 - loop(t * speed + i * 57, W + 10);
      paint.stamp(walker(shirt), Math.round(x), north ? NORTH_WALK + 1 + i * 2 : SOUTH_WALK + i);
    });

    // The arrow board flashes, pointing traffic out of the closed lane.
    if (Math.floor(t * 2) % 2 === 0) {
      const x = ZONE_X - 4;
      const y = CURB_LANE + 3;
      paint.rect(x + 1, y, 1, 4, P.gold);
      paint.px(x, y + 1, P.gold);
      paint.px(x + 2, y + 1, P.gold);
      paint.px(x + 1, y - 0, P.gold);
    }

    // The temporary plan, traced in marching gold dashes around the work.
    const x0 = ZONE_X - 34;
    const x1 = ZONE_X + ZONE_W + 2;
    const y0 = CURB_LANE - 3;
    const y1 = BIKE;
    const march = Math.floor(t * 8);
    const dash = (i: number) => (i + march) % 6 < 3;
    let i = 0;
    for (let x = x0; x <= x1; x++, i++) {
      if (dash(i)) paint.px(x, y0, P.gold);
      if (dash(i + 3)) paint.px(x, y1, P.gold);
    }
    for (let y = y0; y <= y1; y++, i++) {
      if (dash(i)) paint.px(x0, y, P.gold);
      if (dash(i + 3)) paint.px(x1, y, P.gold);
    }
  }

  return { width: W, height: o.height, palette, still: r, focus: 0.5, animate };
}

/** The homepage panel: the street between two rows of plex roofs. */
export const triageScene = street({
  width: 240,
  height: 140,
  top: 40,
  roofs: true,
  zoneX: 112,
  parked: [6, 20, 34, 48, 62, 180, 194, 208, 222],
  trees: [14, 48, 82, 116, 150, 184, 218],
});

/** The product page: the street alone, running the width of the frame. */
export const triageLandingScene = street({
  width: 360,
  height: 92,
  top: 14,
  roofs: false,
  zoneX: 214,
  parked: [8, 22, 36, 50, 64, 78, 92, 290, 304, 318, 332, 346],
  trees: [16, 50, 84, 118, 152, 186, 220, 254, 288, 322],
});
