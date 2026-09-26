import type { Ink, Raster } from "./raster.ts";

/** Draw calls available to a scene's moving parts, in scene coordinates. */
export type Painter = {
  px(x: number, y: number, ink: Ink): void;
  rect(x: number, y: number, w: number, h: number, ink: Ink): void;
  stamp(sprite: Raster, x: number, y: number): void;
  /** Redraw one row of the back layer, sampled `dx` cells to the left (ripples). */
  shiftRow(y: number, dx: number, x0: number, x1: number): void;
  /** Paint the front layer over everything drawn so far. */
  front(): void;
};

export type Scene = {
  width: number;
  height: number;
  /** Index 0 is transparent; every other index is a flat brand colour. */
  palette: readonly string[];
  /** Everything behind the moving parts that never moves. */
  still: Raster;
  /** Still foreground (railings, lamps) that moving parts pass behind. */
  front?: Raster;
  /** Where to crop when the view is narrower than the scene: 0 = left, 1 = right. */
  focus: number;
  /** Draws what moves at `t` seconds, calling `paint.front()` where the
   * foreground belongs. Scenes animate on a 12 fps step. */
  animate?: (paint: Painter, t: number) => void;
};
