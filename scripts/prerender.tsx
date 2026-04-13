import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToString } from "react-dom/server";
import App from "../src/App.tsx";

const distIndexPath = resolve(process.cwd(), "dist/index.html");
const renderedApp = renderToString(<App />);
const indexHtml = readFileSync(distIndexPath, "utf8");
const hydratedHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`);

if (hydratedHtml === indexHtml) {
  throw new Error("Prerender failed because the root placeholder was not found in dist/index.html.");
}

writeFileSync(distIndexPath, hydratedHtml, "utf8");
