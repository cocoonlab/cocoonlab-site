import type { CSSProperties } from "react";
import type { Glyph as GlyphData } from "./pixel/glyphs.ts";

/** A pixel glyph in `currentColor`, two CSS pixels per cell so it stays crisp. */
export function Glyph({ glyph, className }: { glyph: GlyphData; className?: string }) {
  return (
    <svg
      className={`glyph${className ? ` ${className}` : ""}`}
      style={{ "--gw": glyph.width, "--gh": glyph.height } as CSSProperties}
      viewBox={`0 0 ${glyph.width} ${glyph.height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path d={glyph.path} fill="currentColor" />
    </svg>
  );
}
