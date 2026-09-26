import { createContext, useContext, type ReactNode } from "react";
import { Logotype } from "../Logotype.tsx";
import { PixelScene } from "../PixelScene.tsx";
import type { Locale } from "../locale.ts";
import { riverScene } from "../pixel/river.ts";
import { chrome, localeNames } from "./chrome.ts";
import { label, textLink, wrap } from "./styles.ts";

type Site = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isHome: boolean;
  /** Resolves a site path from the current page (see `resolveHref` in App.tsx). */
  href: (to: string) => string;
};

const SiteContext = createContext<Site | null>(null);
export const SiteProvider = SiteContext.Provider;

export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite must be used inside SiteProvider.");
  return site;
}

function Header() {
  const { locale, setLocale, isHome, href } = useSite();
  const copy = chrome[locale];

  return (
    <header className={wrap}>
      <div className="flex h-20 items-center justify-between gap-6 md:h-24">
        <a href={isHome ? "#top" : href("/")} aria-label={isHome ? copy.topLabel : copy.homeLabel} className="-m-2 p-2 text-ink">
          <Logotype className="block h-[1.125rem] w-auto sm:h-[1.3125rem]" />
        </a>

        <div className="flex items-center gap-5 sm:gap-8">
          <nav aria-label={copy.navLabel} className="hidden sm:block">
            <ul className="flex items-center gap-7 font-body text-[0.875rem] font-medium">
              {copy.nav.map((item) => (
                <li key={item.href}>
                  <a href={href(item.href)} className={textLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
          <div role="group" aria-label={copy.languageLabel} className="flex items-center gap-1 font-body text-[0.8125rem] font-medium">
            {(["en", "fr"] as const).map((language, index) => (
              <span key={language} className="flex items-center gap-1">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-muted/60">
                    /
                  </span>
                ) : null}
                <button
                  type="button"
                  lang={language}
                  aria-label={localeNames[language]}
                  aria-pressed={locale === language}
                  onClick={() => setLocale(language)}
                  className={`min-h-10 min-w-8 px-1 tracking-[0.06em] transition-colors ${
                    locale === language ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {language.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { locale, isHome, href } = useSite();
  const copy = chrome[locale];
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <PixelScene scene={riverScene} className="river-scene" label={copy.riverScene} />
      <div className="bg-river">
        <div className={`${wrap} pb-10 pt-14 md:pt-16`}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <a
                href={isHome ? "#top" : href("/")}
                aria-label={isHome ? copy.topLabel : copy.homeLabel}
                className="-m-2 inline-block p-2 text-ink"
              >
                <Logotype className="block h-[1.375rem] w-auto" />
              </a>
              <p className="mt-3 font-body text-[0.9375rem] text-muted">{copy.signature}</p>
            </div>
            <nav aria-label={copy.footerLabel} className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
              {copy.footerGroups.map((group) => (
                <div key={group.title}>
                  <p className={label}>{group.title}</p>
                  <ul className="mt-4 grid gap-1 font-body text-[0.9375rem] text-ink">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a href={href(link.href)} className={`inline-block py-1 ${textLink}`}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line pt-5 font-body text-[0.8125rem] text-muted">
            <p className="py-1">© {currentYear} Cocoon Lab</p>
            <nav aria-label={copy.legalLabel}>
              <ul className="flex flex-wrap gap-x-6">
                {copy.legalLinks.map((link) => (
                  <li key={link.href}>
                    <a href={href(link.href)} className={`inline-block py-1 ${textLink} hover:text-ink`}>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#cookie-preferences" data-cookie-preferences-link className={`inline-block py-1 ${textLink} hover:text-ink`}>
                    {copy.cookiePreferences}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Every page: header, the page itself, then the footer, which opens with the river. */
export function Layout({ children }: { children: ReactNode }) {
  const { locale } = useSite();
  const copy = chrome[locale];

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-mist">
      <a
        href="#main"
        className="sr-only z-50 bg-ink px-4 py-3 font-body text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {copy.skipToContent}
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
