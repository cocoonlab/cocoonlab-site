import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { renderToString } from "react-dom/server";
import App from "../src/App.tsx";
import { type PageId, pages } from "../src/pages/index.tsx";
import { headFor } from "./heads.ts";

/**
 * Renders every page to static HTML in English. The homepage fills Vite's
 * dist/index.html; each inner page gets its own document with its own head
 * and the same hashed script and stylesheet, and hydrates on load.
 */

const dist = resolve(process.cwd(), "dist");
const indexPath = resolve(dist, "index.html");
const indexHtml = readFileSync(indexPath, "utf8");

const render = (page: PageId) => renderToString(<App page={page} />);

const home = indexHtml.replace('<div id="root"></div>', `<div id="root">${render("home")}</div>`);
if (home === indexHtml) {
  throw new Error("Prerender failed because the root placeholder was not found in dist/index.html.");
}
writeFileSync(indexPath, home, "utf8");

const assets = [...indexHtml.matchAll(/<script type="module" crossorigin [^>]*><\/script>|<link rel="(?:stylesheet|modulepreload)" crossorigin [^>]*>/g)]
  .map((match) => match[0])
  .join("\n    ");
if (!assets.includes("<script")) {
  throw new Error("Prerender failed because Vite's module script was not found in dist/index.html.");
}

const document = (page: Exclude<PageId, "home">) => `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${headFor(page)}
    <meta name="theme-color" content="#F7F7F2" />
    <meta name="color-scheme" content="light" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="stylesheet" href="/cookie-consent.css" />
    ${assets}
  </head>
  <body>
    <div id="root" data-page="${page}">${render(page)}</div>
    <script src="/cookie-consent.js" defer></script>
  </body>
</html>
`;

for (const page of Object.keys(pages) as PageId[]) {
  if (page === "home") continue;
  const file = resolve(dist, pages[page].file);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, document(page), "utf8");
}
