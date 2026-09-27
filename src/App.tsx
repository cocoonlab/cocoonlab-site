import { useEffect, useState } from "react";
import { type Locale, localizePath, saveLocale } from "./locale.ts";
import { type PageId, pages } from "./pages/index.tsx";
import { Layout, SiteProvider } from "./site/Site.tsx";

/**
 * Resolves a site path from the current page, in the page's language
 * (`/team/` on an English page, `/fr/team/` on a French one). On the
 * homepage, links to its own sections become plain anchors. With a
 * `linkBase` (a static copy of the site opened from files), site paths
 * become relative files such as `../team/index.html`.
 */
export function resolveHref(to: string, isHome: boolean, locale: Locale, linkBase?: string) {
  if (isHome && to.startsWith("/#")) return to.slice(1);
  const localized = localizePath(to, locale);
  if (linkBase === undefined || !localized.startsWith("/") || localized.startsWith("//")) return localized;
  const [, path = "", rest = ""] = /^([^?#]*)(.*)$/.exec(localized) ?? [];
  const file = path.endsWith("/") ? `${path}index.html` : path;
  return `${linkBase}${file.slice(1)}${rest}`;
}

export default function App({ page, locale: initialLocale, linkBase }: { page: PageId; locale: Locale; linkBase?: string }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const meta = pages[page].meta[locale];
  const isHome = page === "home";

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
    document.title = meta.title;
    const tags = [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
    ] as const;
    for (const [selector, content] of tags) document.querySelector(selector)?.setAttribute("content", content);
  }, [locale, meta]);

  // The toggle swaps the page into the other language in place and moves the
  // address to that language's URL, so a reload or a shared link keeps it.
  const switchLocale = (nextLocale: Locale) => {
    saveLocale(nextLocale);
    if (linkBase === undefined) {
      try {
        const nextUrl = new URL(window.location.href);
        nextUrl.pathname = localizePath(nextUrl.pathname, nextLocale);
        nextUrl.searchParams.delete("lang");
        window.history.replaceState(null, "", nextUrl);
      } catch {
        /* Embedded frames can refuse URL changes; the switch still applies. */
      }
    }
    setLocale(nextLocale);
  };

  return (
    <SiteProvider value={{ locale, setLocale: switchLocale, isHome, href: (to) => resolveHref(to, isHome, locale, linkBase) }}>
      {"layout" in pages[page] ? pages[page].render() : <Layout>{pages[page].render()}</Layout>}
    </SiteProvider>
  );
}
