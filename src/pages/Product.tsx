import { Glyph } from "../Glyph.tsx";
import { Logotype } from "../Logotype.tsx";
import { PixelScene } from "../PixelScene.tsx";
import { codeLandingScene } from "../pixel/code.ts";
import { glyphs } from "../pixel/glyphs.ts";
import { triageLandingScene } from "../pixel/triage.ts";
import { chrome } from "../site/chrome.ts";
import { LanguageToggle, useSite } from "../site/Site.tsx";

const products = {
  triage: {
    scene: triageLandingScene,
    signIn: "https://triage.cocoonlab.ai/auth",
    domain: "triage.cocoonlab.ai",
    copy: {
      en: {
        name: "Cocoon Triage",
        promise: "Prepare temporary signage plans.",
        line: "Prepare work-zone signage, lane closures, and detours before work begins.",
        scene: "A signage plan on Rue Saint-Paul, with Bonsecours Market and the chapel. A RUE BARRÉE sign and barrier close the left end for construction. The adjacent DÉTOUR sign directs approaching cars into the side street before the barrier. Living pixel colonies emerge, gather, and dissolve along the scene’s edges.",
      },
      fr: {
        name: "Cocoon Triage",
        promise: "Préparez vos plans de signalisation temporaire.",
        line: "Préparez la signalisation de chantier, les fermetures de voies et les détours avant le début des travaux.",
        scene: "Plan de signalisation sur la rue Saint-Paul : le marché Bonsecours et la chapelle. Un panneau RUE BARRÉE et une barrière ferment le bout gauche de la rue pour travaux. Le panneau DÉTOUR adjacent dirige les véhicules vers la rue transversale avant la barrière. Des colonies de pixels naissent, se rassemblent et se dissolvent aux bords de la scène.",
      },
    },
  },
  code: {
    scene: codeLandingScene,
    signIn: "https://code.cocoonlab.ai/sign-in",
    domain: "code.cocoonlab.ai",
    copy: {
      en: {
        name: "Cocoon Code",
        promise: "Building-code checks, with evidence.",
        line: "Run building-code rules on drawings and review verdicts you can verify.",
        scene: "Habitat 67 in pixels: a luminous scan travels through the building, illuminating each reviewed level.",
      },
      fr: {
        name: "Cocoon Code",
        promise: "Vérifications du code du bâtiment, preuves à l’appui.",
        line: "Appliquez les règles du code du bâtiment aux plans et examinez des verdicts vérifiables.",
        scene: "Habitat 67 en pixels : un plan lumineux traverse les bâtiments et illumine chaque niveau vérifié.",
      },
    },
  },
} as const;

const copy = {
  en: {
    signIn: "Sign in",
    welcome: "Pick up where you left off.",
    cta: (name: string) => `Sign in to ${name}`,
    newTo: (name: string) => `New to ${name}?`,
    demo: "Request a demo",
  },
  fr: {
    signIn: "Connexion",
    welcome: "Reprenez là où vous en étiez.",
    cta: (name: string) => `Se connecter à ${name}`,
    newTo: (name: string) => `Nouveau sur ${name} ?`,
    demo: "Demander une démo",
  },
} as const;

export type ProductId = keyof typeof products;

/**
 * A product's front door, on one screen: what it is on the left, over its
 * pixel scene; the way in on the right, on ink.
 */
export function Product({ product }: { product: ProductId }) {
  const { locale, href } = useSite();
  const item = products[product];
  const text = item.copy[locale];
  const ui = copy[locale];
  const site = chrome[locale];
  const year = new Date().getFullYear();

  return (
    <div className="bg-paper text-ink selection:bg-mist">
      <a
        href="#sign-in"
        className="sr-only z-50 bg-ink px-4 py-3 font-body text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {ui.signIn}
      </a>
      <main id="main" className="grid min-h-[100svh] lg:grid-cols-12">
        <section aria-labelledby="product-title" className="relative flex flex-col lg:col-span-7 lg:min-h-[100svh]">
          <div className="relative z-10 flex items-center justify-between px-5 pt-5 sm:px-8 lg:px-12 lg:pt-10">
            <a href={href("/")} aria-label={site.homeLabel} className="-m-2 p-2 text-ink">
              <Logotype className="block h-[1.125rem] w-auto sm:h-[1.3125rem]" />
            </a>
            <LanguageToggle className="lg:hidden" />
          </div>
          <div className="relative z-10 px-5 pt-[clamp(2.5rem,9vh,6rem)] sm:px-8 lg:px-12 lg:pt-[clamp(4rem,14vh,9rem)]">
            <h1
              id="product-title"
              className="enter font-display text-[clamp(3rem,5.6vw,6rem)] font-medium leading-[0.94] tracking-[-0.042em]"
            >
              {text.name}
            </h1>
            <p className="enter enter-late mt-5 font-display text-[clamp(1.5rem,2.3vw,2.375rem)] leading-[1.1] tracking-[-0.024em]">
              {/* Each promise reads as two lines, broken at its comma. */}
              {text.promise.split(", ").map((part, index, parts) => (
                <span key={part} className="sm:block">
                  {part}
                  {index < parts.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="enter enter-late mt-6 max-w-[27rem] text-pretty font-body text-[1.0625rem] leading-[1.6] text-muted">
              {text.line}
            </p>
          </div>
          <PixelScene scene={item.scene} className={`landing-scene landing-${product}`} label={text.scene} />
        </section>

        <section
          id="sign-in"
          aria-labelledby="sign-in-title"
          className="flex flex-col bg-[#151c18] px-5 pb-8 pt-12 text-ivory sm:px-8 lg:col-span-5 lg:min-h-[100svh] lg:px-12 lg:pb-10 lg:pt-10"
        >
          <LanguageToggle tone="dark" className="hidden justify-end lg:flex" />
          <div className="py-10 lg:my-auto lg:py-0">
            <h2 id="sign-in-title" className="font-display text-[clamp(2.25rem,3.3vw,3.5rem)] font-medium leading-none tracking-[-0.032em]">
              {ui.signIn}
            </h2>
            <p className="mt-4 max-w-[22rem] font-body text-[1.0625rem] leading-[1.55] text-ivory/70">{ui.welcome}</p>
            <a
              href={item.signIn}
              className="group mt-10 flex h-14 w-full max-w-[26rem] items-center justify-between gap-4 bg-ivory px-5 font-body text-[0.9375rem] font-medium text-[#1c201b] transition-colors duration-200 hover:bg-white"
            >
              {ui.cta(text.name)}
              <Glyph
                glyph={glyphs.arrowUpRight}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="mt-3 font-body text-[0.8125rem] tracking-[0.02em] text-ivory/55">{item.domain}</p>
            <p className="mt-8 max-w-[26rem] border-t border-ivory/15 pt-6 font-body text-[0.9375rem] text-ivory/70">
              {ui.newTo(text.name)}{" "}
              <a
                href={href(`/contact/?intent=studio-demo&product=${product}#contact-form`)}
                className="text-ivory underline decoration-ivory/40 decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-ivory"
              >
                {ui.demo}
              </a>
            </p>
          </div>
          <nav aria-label={site.legalLabel} className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-1 font-body text-[0.8125rem] text-ivory/55">
            <span className="py-1">© {year} Cocoon Lab</span>
            {site.legalLinks.map((link) => (
              <a key={link.href} href={href(link.href)} className="inline-block py-1 transition-colors hover:text-ivory">
                {link.label}
              </a>
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
}
