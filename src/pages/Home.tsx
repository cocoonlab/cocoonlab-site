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
    heroLead: "Software to prepare temporary signage plans and check building drawings before work begins.",
    heroCta: "Explore products",
    heroScene:
      "Montréal in pixels, from the Old Port: the Jacques-Cartier Bridge over the St. Lawrence, the Biosphère, the Olympic Stadium, Habitat 67, and downtown under Mount Royal.",
    productsTitle: "Products",
    more: "Explore",
    products: [
      {
        id: "triage",
        name: "Cocoon Triage",
        description: "Prepare temporary signage plans.",
        href: "/triage/",
        scene: "A signage plan on Rue Saint-Paul, with Bonsecours Market and the chapel. A RUE BARRÉE sign and barrier close the left end for construction. The adjacent DÉTOUR sign directs approaching cars into the side street before the barrier. Living pixel colonies emerge, gather, and dissolve along the scene’s edges.",
      },
      {
        id: "code",
        name: "Cocoon Code",
        description: "Building-code checks, with evidence.",
        href: "/code/",
        scene: "Habitat 67 in pixels: a luminous scan travels through the building, illuminating each reviewed level.",
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
    heroLead: "Des logiciels pour préparer les plans de signalisation temporaire et vérifier les plans de bâtiments avant le début des travaux.",
    heroCta: "Découvrir les produits",
    heroScene:
      "Montréal en pixels, depuis le Vieux-Port : le pont Jacques-Cartier sur le Saint-Laurent, la Biosphère, le Stade olympique, Habitat 67 et le centre-ville sous le mont Royal.",
    productsTitle: "Produits",
    more: "Découvrir",
    products: [
      {
        id: "triage",
        name: "Cocoon Triage",
        description: "Préparez vos plans de signalisation temporaire.",
        href: "/triage/",
        scene: "Plan de signalisation sur la rue Saint-Paul : le marché Bonsecours et la chapelle. Un panneau RUE BARRÉE et une barrière ferment le bout gauche de la rue pour travaux. Le panneau DÉTOUR adjacent dirige les véhicules vers la rue transversale avant la barrière. Des colonies de pixels naissent, se rassemblent et se dissolvent aux bords de la scène.",
      },
      {
        id: "code",
        name: "Cocoon Code",
        description: "Vérifications du code du bâtiment, preuves à l’appui.",
        href: "/code/",
        scene: "Habitat 67 en pixels : un plan lumineux traverse les bâtiments et illumine chaque niveau vérifié.",
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

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="hero">
        <div className={`${wrap} hero-copy`}>
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
            href="#products"
            className="enter enter-late group mt-9 inline-flex h-12 items-center gap-4 bg-ink pl-5 pr-[1.125rem] font-body text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-civic"
          >
            {text.heroCta}
            <Glyph glyph={glyphs.arrowDown} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
        </div>
        <PixelScene scene={heroScene} className="hero-scene" label={text.heroScene} />
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
              <p className="mt-3 max-w-[24rem] text-pretty font-body text-[1.0625rem] leading-[1.5] text-muted sm:text-[1.125rem]">
                {product.description}
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
