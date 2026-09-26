/** Small pixel glyphs for links, authored as rows (`#` = on) and compiled to one SVG path. */

export type Glyph = {
  width: number;
  height: number;
  path: string;
};

function glyph(rows: readonly string[]): Glyph {
  const width = Math.max(...rows.map((row) => row.length));
  let path = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (row[x] !== "#") {
        x++;
        continue;
      }
      const start = x;
      while (row[x] === "#") x++;
      path += `M${start} ${y}h${x - start}v1h-${x - start}z`;
    }
  });
  return { width, height: rows.length, path };
}

export const glyphs = {
  arrowRight: glyph(["....#..", ".....#.", "#######", ".....#.", "....#.."]),
  arrowUpRight: glyph([".#####", "....##", "...#.#", "..#..#", ".#...#", "#....."]),
  arrowDown: glyph(["..#..", "..#..", "..#..", "..#..", "#.#.#", ".###.", "..#.."]),
} as const;
