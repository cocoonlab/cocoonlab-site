import { useEffect, useState } from "react";
import { type Locale, resolveInitialLocale, saveLocale } from "./locale.ts";
import { type PageId, pages } from "./pages/index.tsx";
import { Layout, SiteProvider } from "./site/Site.tsx";

/**
 * Resolves a site path from the current page. On the homepage, links to its
 * own sections become plain anchors. With a `linkBase` (a static copy of the
 * site opened from files), site paths become relative files such as
 * `../team/index.html`.
 */
export function resolveHref(to: string, isHome: boolean, linkBase?: string) {
  if (isHome && to.startsWith("/#")) return to.slice(1);
  if (linkBase === undefined || !to.startsWith("/") || to.startsWith("//")) return to;
  const [, path = "", rest = ""] = /^([^?#]*)(.*)$/.exec(to) ?? [];
  const file = path.endsWith("/") ? `${path}index.html` : path;
  return `${linkBase}${file.slice(1)}${rest}`;
}

export default function App({ page, linkBase }: { page: PageId; linkBase?: string }) {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);
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
    saveLocale(locale);
    window.dispatchEvent(new CustomEvent("cocoon:language-change", { detail: { locale } }));
  }, [locale, meta]);

  const switchLocale = (nextLocale: Locale) => {
    try {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("lang", nextLocale);
      window.history.replaceState(null, "", nextUrl);
    } catch {
      /* Embedded frames can refuse URL changes; the switch still applies. */
    }
    setLocale(nextLocale);
  };

  return (
    <SiteProvider value={{ locale, setLocale: switchLocale, isHome, href: (to) => resolveHref(to, isHome, linkBase) }}>
      <Layout>{pages[page].render()}</Layout>
    </SiteProvider>
  );
}
