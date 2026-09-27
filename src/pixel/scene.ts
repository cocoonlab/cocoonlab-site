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

/** A two-pixel sample of the live drawing, gathering into its resting cell. */
export type PixelPiece = {
  sx: number; sy: number; x: number; y: number; size: number; alpha: number;
};

export type AssemblyFrame = { mask: Raster; pieces: readonly PixelPiece[] };

export type Scene = {
  width: number;
  height: number;
  /** Index 0 is transparent; every other index is a flat brand colour. */
  palette: readonly string[];
  /** Everything behind the moving parts that never moves. */
  still: Raster;
  /** Still foreground (railings, lamps) that moving parts pass behind. */
  front?: Raster;
  /** Optional per-cell alpha, applied after moving parts so edges stay seamless. */
  mask?: Raster;
  /** Cellular edge motion, sampled from the fully painted scene. */
  assembly?: (t: number) => AssemblyFrame;
  /** Where to crop when the view is narrower than the scene: 0 = left, 1 = right. */
  focus: number;
  /** Draws what moves at `t` seconds, calling `paint.front()` where the
   * foreground belongs. Assembly scenes use 24 fps; others use 12. */
  animate?: (paint: Painter, t: number) => void;
  /** Crisp editorial objects drawn above the composition's optional edge mask. */
  overlay?: (paint: Painter, t: number) => void;
};
