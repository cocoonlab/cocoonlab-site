import { Fragment, useEffect, useState } from "react";
import { Glyph } from "./Glyph.tsx";
import { Logotype } from "./Logotype.tsx";
import { type Locale, resolveInitialLocale, saveLocale } from "./locale.ts";
import { PixelScene } from "./PixelScene.tsx";
import { codeScene } from "./pixel/code.ts";
import { glyphs } from "./pixel/glyphs.ts";
import { heroScene } from "./pixel/hero.ts";
import { riverScene } from "./pixel/river.ts";
import { triageScene } from "./pixel/triage.ts";

const productScenes = {
  triage: triageScene,
  code: codeScene,
} as const;

const homeCopy = {
  en: {
    metaTitle: "Cocoon Lab | AI for streets and buildings",
    metaDescription:
      "Cocoon Lab builds tools for safer streets and better buildings: Cocoon Triage for temporary street plans and Cocoon Code for building-code checks.",
    skipToContent: "Skip to content",
    homeLabel: "Cocoon Lab, back to top",
    navLabel: "Primary",
    nav: [
      { label: "Products", href: "#products" },
      { label: "Company", href: "#company" },
      { label: "Contact", href: "/contact/" },
    ],
    languageLabel: "Language",
    heroTitle: ["AI for streets", "and buildings."],
    heroLead: "Cocoon Lab builds tools for safer streets and better buildings.",
    heroCta: "Explore products",
    heroScene:
      "Montréal in pixels, from the Old Port: the Jacques-Cartier Bridge over the St. Lawrence, the Biosphère, the Olympic Stadium, Habitat 67, and downtown under Mount Royal.",
    productsTitle: "Products",
    products: [
      {
        id: "triage",
        field: "Streets",
        name: "Cocoon Triage",
        description: "Temporary street plans, reviewed faster.",
        href: "https://triage.cocoonlab.ai",
        domain: "triage.cocoonlab.ai",
        scene: "A Montréal street from above: a work zone closes the curb lane, traffic shifts around it, and the temporary plan is outlined in gold.",
      },
      {
        id: "code",
        field: "Buildings",
        name: "Cocoon Code",
        description: "Building-code checks, with evidence.",
        href: "https://code.cocoonlab.ai",
        domain: "code.cocoonlab.ai",
        scene: "A corner building in axonometric: a gold plane rises floor by floor and leaves a check beside each floor it clears.",
      },
    ],
    companyTitle: "Company",
    companyStatement: "Cocoon Lab is a small Montréal team of designers, planners, and AI researchers.",
    companyLinks: [
      { label: "Team", href: "/team/" },
      { label: "Partners", href: "/partners/" },
      { label: "Contact", href: "/contact/" },
    ],
    riverScene: "The St. Lawrence and the Montréal skyline at a distance, with a ferry crossing.",
    location: "Montréal, Québec",
    signature: "Made in Montréal",
    footerLabel: "Site",
    footerLinks: [
      { label: "Team", href: "/team/" },
      { label: "Partners", href: "/partners/" },
      { label: "Blog", href: "/blog/" },
      { label: "Monograph", href: "/monograph/" },
      { label: "Studio", href: "/studio/" },
      { label: "Press kit", href: "/press-kit/index.html" },
      { label: "Contact", href: "/contact/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
    cookiePreferences: "Cookie preferences",
  },
  fr: {
    metaTitle: "Cocoon Lab | L’IA pour les rues et les bâtiments",
    metaDescription:
      "Cocoon Lab conçoit des outils pour des rues plus sûres et de meilleurs bâtiments : Cocoon Triage pour les plans de signalisation temporaire et Cocoon Code pour les vérifications du code du bâtiment.",
    skipToContent: "Aller au contenu",
    homeLabel: "Cocoon Lab, retour en haut",
    navLabel: "Navigation principale",
    nav: [
      { label: "Produits", href: "#products" },
      { label: "Entreprise", href: "#company" },
      { label: "Contact", href: "/contact/" },
    ],
    languageLabel: "Langue",
    heroTitle: ["L’IA pour les rues", "et les bâtiments."],
    heroLead: "Cocoon Lab conçoit des outils pour des rues plus sûres et de meilleurs bâtiments.",
    heroCta: "Découvrir les produits",
    heroScene:
      "Montréal en pixels, depuis le Vieux-Port : le pont Jacques-Cartier sur le Saint-Laurent, la Biosphère, le Stade olympique, Habitat 67 et le centre-ville sous le mont Royal.",
    productsTitle: "Produits",
    products: [
      {
        id: "triage",
        field: "Rues",
        name: "Cocoon Triage",
        description: "Plans de signalisation temporaire, examinés plus vite.",
        href: "https://triage.cocoonlab.ai",
        domain: "triage.cocoonlab.ai",
        scene: "Une rue de Montréal vue du ciel : un chantier ferme la voie de droite, la circulation le contourne et le plan temporaire est tracé en or.",
      },
      {
        id: "code",
        field: "Bâtiments",
        name: "Cocoon Code",
        description: "Vérifications du code du bâtiment, preuves à l’appui.",
        href: "https://code.cocoonlab.ai",
        domain: "code.cocoonlab.ai",
        scene: "Un bâtiment d’angle en axonométrie : un plan doré monte étage par étage et laisse une coche à chaque étage vérifié.",
      },
    ],
    companyTitle: "Entreprise",
    companyStatement: "Cocoon Lab est une petite équipe montréalaise de designers, d’urbanistes et de chercheurs en IA.",
    companyLinks: [
      { label: "Équipe", href: "/team/" },
      { label: "Partenaires", href: "/partners/" },
      { label: "Contact", href: "/contact/" },
    ],
    riverScene: "Le Saint-Laurent et le panorama de Montréal au loin, avec un traversier.",
    location: "Montréal, Québec",
    signature: "Fait à Montréal",
    footerLabel: "Site",
    footerLinks: [
      { label: "Équipe", href: "/team/" },
      { label: "Partenaires", href: "/partners/" },
      { label: "Blogue", href: "/blog/" },
      { label: "Manifeste", href: "/monograph/" },
      { label: "Studio", href: "/studio/" },
      { label: "Kit média", href: "/press-kit/index.html" },
      { label: "Contact", href: "/contact/" },
      { label: "Confidentialité", href: "/privacy/" },
      { label: "Conditions", href: "/terms/" },
    ],
    cookiePreferences: "Préférences de témoins",
  },
} as const;

const localeNames = {
  en: "English",
  fr: "Français",
} as const;

const wrap = "mx-auto w-full max-w-[110rem] px-5 sm:px-8 lg:px-12 2xl:px-16";
const label = "font-body text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.18em] text-muted";
const textLink =
  "underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors duration-200 hover:decoration-current";

export default function App() {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);
  const currentYear = new Date().getFullYear();
  const copy = homeCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
    document.title = copy.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", copy.metaTitle);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", copy.metaDescription);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", copy.metaTitle);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", copy.metaDescription);
    saveLocale(locale);
    window.dispatchEvent(new CustomEvent("cocoon:language-change", { detail: { locale } }));
  }, [copy.metaDescription, copy.metaTitle, locale]);

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
    <div className="min-h-screen bg-paper text-ink selection:bg-mist">
      <a
        href="#main"
        className="sr-only z-50 bg-ink px-4 py-3 font-body text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {copy.skipToContent}
      </a>

      <header className={wrap}>
        <div className="flex h-20 items-center justify-between gap-6 md:h-24">
          <a href="#top" aria-label={copy.homeLabel} className="-m-2 p-2 text-ink">
            <Logotype className="block h-[1.125rem] w-auto sm:h-[1.3125rem]" />
          </a>

          <div className="flex items-center gap-5 sm:gap-8">
            <nav aria-label={copy.navLabel} className="hidden sm:block">
              <ul className="flex items-center gap-7 font-body text-[0.875rem] font-medium">
                {copy.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={textLink}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
            <div
              role="group"
              aria-label={copy.languageLabel}
              className="flex items-center gap-1 font-body text-[0.8125rem] font-medium"
            >
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
                    onClick={() => switchLocale(language)}
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

      <main id="main">
        <section id="top" aria-labelledby="hero-title" className="hero">
          <div className={`${wrap} hero-copy`}>
            <h1
              id="hero-title"
              className="enter font-display text-[clamp(2.875rem,7.4vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.038em] text-ink"
            >
              {copy.heroTitle.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? " " : null}
                  <span className="block">{line}</span>
                </Fragment>
              ))}
            </h1>
            <p className="enter enter-late mt-7 max-w-[27rem] text-pretty font-body text-[1.125rem] leading-[1.5] text-muted sm:text-[1.25rem]">
              {copy.heroLead}
            </p>
            <a
              href="#products"
              className="enter enter-late group mt-9 inline-flex h-12 items-center gap-4 bg-ink pl-5 pr-[1.125rem] font-body text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-civic"
            >
              {copy.heroCta}
              <Glyph glyph={glyphs.arrowDown} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>
          <PixelScene scene={heroScene} className="hero-scene" label={copy.heroScene} />
        </section>

        <section id="products" aria-labelledby="products-title" className={`${wrap} pt-[clamp(5rem,10vw,9rem)]`}>
          <h2 id="products-title" className="sr-only">
            {copy.productsTitle}
          </h2>
          <ul className="grid border-t border-line md:grid-cols-2">
            {copy.products.map((product, index) => (
              <li
                key={product.id}
                className="product group relative flex flex-col border-line pt-10 max-md:[&+&]:border-t md:pt-12 md:[&+&]:border-l md:[&+&]:pl-10 md:[&:has(+li)]:pr-10 xl:[&+&]:pl-16 xl:[&:has(+li)]:pr-16"
              >
                <p className={label}>
                  <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="mx-2 text-muted/50">
                    —
                  </span>
                  {product.field}
                </p>
                <h3 className="mt-5 font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                  <a href={product.href} className="product-link">
                    {product.name}
                  </a>
                </h3>
                <p className="mt-3 max-w-[24rem] text-pretty font-body text-[1.0625rem] leading-[1.5] text-muted sm:text-[1.125rem]">
                  {product.description}
                </p>
                <p
                  aria-hidden="true"
                  className="mt-5 inline-flex items-center gap-2.5 self-start font-body text-[0.9375rem] font-medium text-ink underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors duration-200 group-hover:decoration-current"
                >
                  {product.domain}
                  <Glyph
                    glyph={glyphs.arrowUpRight}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
                <PixelScene scene={productScenes[product.id]} className="product-scene" label={product.scene} />
              </li>
            ))}
          </ul>
        </section>

        <section id="company" aria-labelledby="company-title" className="pt-[clamp(6rem,11vw,10rem)]">
          <div className={`${wrap} grid grid-cols-12 gap-x-6`}>
            <h2 id="company-title" className={`${label} col-span-12 lg:col-span-3 lg:pt-3`}>
              {copy.companyTitle}
            </h2>
            <div className="col-span-12 mt-8 lg:col-span-9 lg:mt-0">
              <p className="max-w-[46rem] text-balance font-display text-[clamp(1.75rem,3.1vw,2.75rem)] font-normal leading-[1.14] tracking-[-0.02em] text-ink">
                {copy.companyStatement}
              </p>
              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3 font-body text-[0.9375rem] font-medium">
                {copy.companyLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={`group inline-flex items-center gap-2.5 ${textLink}`}>
                      {link.label}
                      <Glyph glyph={glyphs.arrowRight} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <PixelScene scene={riverScene} className="river-scene" label={copy.riverScene} />
        </section>
      </main>

      <footer className={wrap}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-12 pt-10 font-body text-[0.8125rem] leading-[1.7] text-muted">
          <div className="col-span-12 flex flex-col gap-4 sm:col-span-6 lg:col-span-3">
            <Logotype className="block h-4 w-auto text-ink" />
            <p className={label}>{copy.signature}</p>
          </div>
          <p className="col-span-12 sm:col-span-6 lg:col-span-3">
            © {currentYear} Cocoon Lab
            <br />
            {copy.location}
          </p>
          <nav aria-label={copy.footerLabel} className="col-span-12 lg:col-span-6">
            <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-6 gap-y-1">
              {copy.footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`inline-block py-0.5 ${textLink} hover:text-ink`}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#cookie-preferences"
                  data-cookie-preferences-link
                  className={`inline-block py-0.5 ${textLink} hover:text-ink`}
                >
                  {copy.cookiePreferences}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
