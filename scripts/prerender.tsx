import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { renderToString } from "react-dom/server";
import App from "../src/App.tsx";
import type { Locale } from "../src/locale.ts";
import { type PageId, pages } from "../src/pages/index.tsx";
import { headFor } from "./heads.ts";

/**
 * Renders every page to static HTML in English and in French. The English
 * homepage fills Vite's dist/index.html; every other page gets its own
 * document, the French ones under dist/fr/, each with its own head and the
 * same hashed script and stylesheet, and hydrates on load. The one 404 page
 * is English and switches to French at runtime under /fr/.
 */

const dist = resolve(process.cwd(), "dist");
const indexPath = resolve(dist, "index.html");
const indexHtml = readFileSync(indexPath, "utf8");

const root = (page: PageId, locale: Locale) =>
  `<div id="root" data-page="${page}" data-locale="${locale}">${renderToString(<App page={page} locale={locale} />)}</div>`;

const home = indexHtml.replace('<div id="root"></div>', root("home", "en"));
if (home === indexHtml) {
  throw new Error("Prerender failed because the root placeholder was not found in dist/index.html.");
}
writeFileSync(indexPath, home, "utf8");

/** Tags every page shares with index.html's head. */
function shared(pattern: RegExp, what: string) {
  const tags = [...indexHtml.matchAll(pattern)].map((match) => match[0]);
  if (!tags.length) {
    throw new Error(`Prerender failed because ${what} was not found in dist/index.html.`);
  }
  return tags.join("\n    ");
}

const assets = shared(/<script type="module" crossorigin [^>]*><\/script>|<link rel="(?:stylesheet|modulepreload)" crossorigin [^>]*>/g, "Vite's assets");
if (!assets.includes("<script")) {
  throw new Error("Prerender failed because Vite's module script was not found in dist/index.html.");
}
const fonts = shared(/<link rel="preload" href="\/fonts\/[^"]+"[^>]*>/g, "the font preloads");
const language = shared(/<script id="language">[\s\S]*?<\/script>/g, "the language script");

const document = (page: PageId, locale: Locale) => `<!doctype html>
<html lang="${locale === "fr" ? "fr-CA" : "en-CA"}" class="cocoon-dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${language}
    ${headFor(page, locale)}
    <meta name="theme-color" content="#1c201b" />
    <meta name="color-scheme" content="dark" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    ${fonts}
    ${assets}
  </head>
  <body>
    ${root(page, locale)}
  </body>
</html>
`;

for (const page of Object.keys(pages) as PageId[]) {
  for (const locale of ["en", "fr"] as const) {
    // The English homepage is index.html, above; the one 404 page serves both languages.
    if ((page === "home" && locale === "en") || (page === "not-found" && locale === "fr")) continue;
    const file = resolve(dist, locale === "fr" ? "fr" : ".", pages[page].file);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, document(page, locale), "utf8");
  }
}
