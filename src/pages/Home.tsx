import { useRef } from "react";
import { Glyph } from "../Glyph.tsx";
import { PixelScene } from "../PixelScene.tsx";
import { codeScene } from "../pixel/code.ts";
import { glyphs } from "../pixel/glyphs.ts";
import { heroScene } from "../pixel/hero.ts";
import { triageScene } from "../pixel/triage.ts";
import { useSite } from "../site/Site.tsx";
import { textLink, wrap } from "../site/styles.ts";

const productScenes = {
  triage: triageScene,
  code: codeScene,
} as const;

const copy = {
  en: {
    heroTitle: "We make it faster and safer to build better places for people.",
    heroLead: "Cocoon Triage prepares temporary signage plans. Cocoon Code checks building drawings against the code, with evidence.",
    heroCta: "Request a demo",
    heroScene: "Pixel view of Montréal from the Old Port, with the Jacques-Cartier Bridge and downtown.",
    productsTitle: "Products",
    more: "Explore",
    products: [
      {
        id: "triage",
        name: "Cocoon Triage",
        description: "Prepare work-zone signage, lane closures, and detours before work begins.",
        audience: "For contractors and the permit teams that review their plans.",
        href: "/triage/",
        scene: "Pixel view of Rue Saint-Paul, closed for work with RUE BARRÉE and DÉTOUR signs.",
      },
      {
        id: "code",
        name: "Cocoon Code",
        description: "Run building-code rules on drawings and review verdicts you can verify.",
        audience: "For architects, engineers, and building inspectors.",
        href: "/code/",
        scene: "Habitat 67 in pixels, scanned level by level.",
      },
    ],
    companyTitle: "Company",
    companyStatement: "Cocoon Lab makes tools for the people who plan, review, and build our cities.",
    companyLinks: [
      { label: "Team", href: "/team/" },
      { label: "Partners", href: "/partners/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  fr: {
    heroTitle: "Nous rendons plus rapide et plus sûre la construction de meilleurs milieux de vie.",
    heroLead:
      "Cocoon Triage prépare les plans de signalisation temporaire. Cocoon Code vérifie les plans de bâtiment selon le code, preuves à l’appui.",
    heroCta: "Demander une démo",
    heroScene: "Vue en pixels de Montréal depuis le Vieux-Port, avec le pont Jacques-Cartier et le centre-ville.",
    productsTitle: "Produits",
    more: "Découvrir",
    products: [
      {
        id: "triage",
        name: "Cocoon Triage",
        description: "Préparez la signalisation de chantier, les fermetures de voies et les détours avant le début des travaux.",
        audience: "Pour les entrepreneurs et les équipes qui approuvent leurs plans.",
        href: "/triage/",
        scene: "Vue en pixels de la rue Saint-Paul, fermée pour travaux avec des panneaux RUE BARRÉE et DÉTOUR.",
      },
      {
        id: "code",
        name: "Cocoon Code",
        description: "Appliquez les règles du code du bâtiment aux plans et examinez des verdicts vérifiables.",
        audience: "Pour les architectes, les ingénieurs et les inspecteurs en bâtiment.",
        href: "/code/",
        scene: "Habitat 67 en pixels, balayé niveau par niveau.",
      },
    ],
    companyTitle: "Entreprise",
    companyStatement: "Cocoon Lab crée des outils pour celles et ceux qui planifient, examinent et construisent nos villes.",
    companyLinks: [
      { label: "Équipe", href: "/team/" },
      { label: "Partenaires", href: "/partners/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
} as const;

export function Home() {
  const { locale, href } = useSite();
  const text = copy[locale];
  const heroCopy = useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="hero">
        <div ref={heroCopy} className={`${wrap} hero-copy`}>
          <h1
            id="hero-title"
            className="enter max-w-[13.5em] text-balance font-display text-[clamp(2.5rem,5.6vw,6rem)] font-medium leading-[0.98] tracking-[-0.036em] text-ink"
          >
            {text.heroTitle}
          </h1>
          <p className="enter enter-late mt-7 max-w-[30rem] text-pretty font-body text-[1.125rem] leading-[1.5] text-muted sm:text-[1.25rem]">
            {text.heroLead}
          </p>
          <a
            href={href("/contact/?intent=studio-demo#contact-form")}
            className="enter enter-late group mt-9 inline-flex h-12 items-center gap-4 bg-ink pl-5 pr-[1.125rem] font-body text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-civic"
          >
            {text.heroCta}
            <Glyph glyph={glyphs.arrowRight} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
        <PixelScene scene={heroScene} className="hero-scene" label={text.heroScene} clearOf={heroCopy} />
      </section>

      <section id="products" aria-labelledby="products-title" className={`${wrap} pt-[clamp(5rem,10vw,9rem)]`}>
        <h2 id="products-title" className="sr-only">
          {text.productsTitle}
        </h2>
        <ul className="grid border-t border-line md:grid-cols-2">
          {text.products.map((product) => (
            <li
              key={product.id}
              className="product group relative flex flex-col border-line pt-10 max-md:[&+&]:border-t md:pt-12 md:[&+&]:border-l md:[&+&]:pl-10 md:[&:has(+li)]:pr-10 xl:[&+&]:pl-16 xl:[&:has(+li)]:pr-16"
            >
              <h3 className="font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                <a href={href(product.href)} className="product-link">
                  {product.name}
                </a>
              </h3>
              {/* It grows so both cards' links and scenes line up, whatever the length of the text. */}
              <p className="mt-3 max-w-[24rem] grow text-pretty font-body text-[1.0625rem] leading-[1.5] text-muted sm:text-[1.125rem]">
                {product.description}{" "}
                <span className="mt-2 block">{product.audience}</span>
              </p>
              <p
                aria-hidden="true"
                className="mt-5 inline-flex items-center gap-2.5 self-start font-body text-[0.9375rem] font-medium text-ink underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors duration-200 group-hover:decoration-current"
              >
                {text.more} {product.id === "triage" ? "Triage" : "Code"}
                <Glyph glyph={glyphs.arrowRight} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </p>
              <PixelScene scene={productScenes[product.id]} className="product-scene" label={product.scene} />
            </li>
          ))}
        </ul>
      </section>

      <section id="company" aria-labelledby="company-title" className="pt-[clamp(6rem,11vw,10rem)]">
        <div className={wrap}>
          <h2 id="company-title" className="sr-only">
            {text.companyTitle}
          </h2>
          <p className="max-w-[19em] text-balance font-display text-[clamp(2.125rem,4.4vw,4rem)] font-normal leading-[1.04] tracking-[-0.032em] text-ink">
            {text.companyStatement}
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-body text-[0.9375rem] font-medium">
            {text.companyLinks.map((link) => (
              <li key={link.href}>
                <a href={href(link.href)} className={`group inline-flex items-center gap-2.5 ${textLink}`}>
                  {link.label}
                  <Glyph glyph={glyphs.arrowRight} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
