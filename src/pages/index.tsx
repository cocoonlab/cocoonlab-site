import type { ReactNode } from "react";
import type { Locale } from "../locale.ts";
import { Blog } from "./Blog.tsx";
import { Contact } from "./Contact.tsx";
import { Home } from "./Home.tsx";
import { Legal } from "./Legal.tsx";
import { Monograph } from "./Monograph.tsx";
import { NotFound } from "./NotFound.tsx";
import { Partners } from "./Partners.tsx";
import { Post } from "./Post.tsx";
import { PressKit } from "./PressKit.tsx";
import { Product } from "./Product.tsx";
import { Team } from "./Team.tsx";

type Meta = { title: string; description: string };

export type Page = {
  /** The public URL path in English; the French page is the same path under `/fr/`. */
  path: string;
  /** Where the prerendered English page is written, relative to dist/; French goes under dist/fr/. */
  file: string;
  meta: Record<Locale, Meta>;
  /** `screen` pages fill one screen on their own, without the site's header and footer. */
  layout?: "screen";
  render: () => ReactNode;
};

export const pages = {
  home: {
    path: "/",
    file: "index.html",
    meta: {
      en: {
        title: "Cocoon Lab | Temporary signage plans & building-code checks",
        description:
          "Software to prepare temporary signage plans and check building drawings before work begins.",
      },
      fr: {
        title: "Cocoon Lab | Signalisation temporaire et code du bâtiment",
        description:
          "Des logiciels pour préparer les plans de signalisation temporaire et vérifier les plans de bâtiments avant le début des travaux.",
      },
    },
    render: () => <Home />,
  },
  triage: {
    path: "/triage/",
    file: "triage/index.html",
    layout: "screen",
    meta: {
      en: {
        title: "Cocoon Triage | Cocoon Lab",
        description: "Prepare temporary signage plans. Prepare work-zone signage, lane closures, and detours before work begins.",
      },
      fr: {
        title: "Cocoon Triage | Cocoon Lab",
        description:
          "Préparez vos plans de signalisation temporaire. Préparez la signalisation de chantier, les fermetures de voies et les détours avant le début des travaux.",
      },
    },
    render: () => <Product product="triage" />,
  },
  code: {
    path: "/code/",
    file: "code/index.html",
    layout: "screen",
    meta: {
      en: {
        title: "Cocoon Code | Cocoon Lab",
        description: "Building-code checks, with evidence. Run building-code rules on drawings and review verdicts you can verify.",
      },
      fr: {
        title: "Cocoon Code | Cocoon Lab",
        description:
          "Vérifications du code du bâtiment, preuves à l’appui. Appliquez les règles du code du bâtiment aux plans et examinez des verdicts vérifiables.",
      },
    },
    render: () => <Product product="code" />,
  },
  team: {
    path: "/team/",
    file: "team/index.html",
    meta: {
      en: { title: "Team | Cocoon Lab", description: "Meet the founding team behind Cocoon Lab: Rashid Mushkani, Hugo Berard, and Shin Koseki." },
      fr: { title: "Équipe | Cocoon Lab", description: "Rencontrez l’équipe fondatrice de Cocoon Lab : Rashid Mushkani, Hugo Berard et Shin Koseki." },
    },
    render: () => <Team />,
  },
  partners: {
    path: "/partners/",
    file: "partners/index.html",
    meta: {
      en: { title: "Partners | Cocoon Lab", description: "Meet the partners who work with Cocoon Lab: Mila and the City of Montréal." },
      fr: { title: "Partenaires | Cocoon Lab", description: "Découvrez les partenaires de Cocoon Lab : Mila et la Ville de Montréal." },
    },
    render: () => <Partners />,
  },
  contact: {
    path: "/contact/",
    file: "contact/index.html",
    meta: {
      en: { title: "Contact | Cocoon Lab", description: "Book a demo, ask a question, or bring a real project for Cocoon Lab to test." },
      fr: { title: "Contact | Cocoon Lab", description: "Réservez une démo, posez une question ou apportez un vrai projet à tester avec Cocoon Lab." },
    },
    render: () => <Contact />,
  },
  blog: {
    path: "/blog/",
    file: "blog/index.html",
    meta: {
      en: { title: "Blog | Cocoon Lab", description: "News and notes from Cocoon Lab: products, events, and partnerships such as Mila." },
      fr: { title: "Blogue | Cocoon Lab", description: "Nouvelles et notes de Cocoon Lab : produits, événements et partenariats comme Mila." },
    },
    render: () => <Blog />,
  },
  "post-indescanada": {
    path: "/blog/indescanada/",
    file: "blog/indescanada/index.html",
    meta: {
      en: { title: "Cocoon Lab at InDesCanada | Cocoon Lab", description: "Rashid Mushkani will present Cocoon Lab at InDesCanada in Ottawa." },
      fr: { title: "Cocoon Lab à InDesCanada | Cocoon Lab", description: "Rashid Mushkani présentera Cocoon Lab à InDesCanada, à Ottawa." },
    },
    render: () => <Post id="indescanada" />,
  },
  "post-mila": {
    path: "/blog/mila-partnership/",
    file: "blog/mila-partnership/index.html",
    meta: {
      en: { title: "Cocoon Lab in partnership with Mila | Cocoon Lab", description: "Why the Mila partnership matters to Cocoon Lab." },
      fr: { title: "Cocoon Lab en partenariat avec Mila | Cocoon Lab", description: "Pourquoi le partenariat avec Mila compte pour Cocoon Lab." },
    },
    render: () => <Post id="mila-partnership" />,
  },
  monograph: {
    path: "/monograph/",
    file: "monograph/index.html",
    meta: {
      en: { title: "Manifesto | Cocoon Lab", description: "Every place starts as a plan. The thesis, ideals, and founding position behind Cocoon Lab." },
      fr: { title: "Manifeste | Cocoon Lab", description: "Tout lieu commence par un plan. La thèse, les principes et la position fondatrice de Cocoon Lab." },
    },
    render: () => <Monograph />,
  },
  "press-kit": {
    path: "/press-kit/",
    file: "press-kit/index.html",
    meta: {
      en: {
        title: "Press Kit | Cocoon Lab",
        description:
          "Download the official Cocoon Lab press kit with logos, lockups, glyphs, color tokens, typography direction, social cards, favicons, and imagery.",
      },
      fr: {
        title: "Kit média | Cocoon Lab",
        description:
          "Téléchargez le kit média officiel de Cocoon Lab avec logos, compositions, glyphes, couleurs, typographie, cartes sociales, favicons et images.",
      },
    },
    render: () => <PressKit />,
  },
  privacy: {
    path: "/privacy/",
    file: "privacy/index.html",
    meta: {
      en: { title: "Privacy Policy | Cocoon Lab", description: "How Cocoon Lab handles inquiries, demo requests, site data, and communication through cocoonlab.ai." },
      fr: {
        title: "Politique de confidentialité | Cocoon Lab",
        description: "Comment Cocoon Lab traite les demandes, les démos, les données du site et les communications sur cocoonlab.ai.",
      },
    },
    render: () => <Legal document="privacy" />,
  },
  terms: {
    path: "/terms/",
    file: "terms/index.html",
    meta: {
      en: { title: "Terms of Service | Cocoon Lab", description: "Terms for accessing and using the Cocoon Lab website and its materials." },
      fr: { title: "Conditions d’utilisation | Cocoon Lab", description: "Conditions d’accès et d’utilisation du site de Cocoon Lab et de ses contenus." },
    },
    render: () => <Legal document="terms" />,
  },
  "not-found": {
    path: "/404.html",
    file: "404.html",
    meta: {
      en: { title: "Page not found | Cocoon Lab", description: "The page you requested could not be found." },
      fr: { title: "Page introuvable | Cocoon Lab", description: "La page demandée est introuvable." },
    },
    render: () => <NotFound />,
  },
} satisfies Record<string, Page>;

export type PageId = keyof typeof pages;

export const isPageId = (value: unknown): value is PageId => typeof value === "string" && value in pages;

/** The page for a URL path in either language, for the dev server where every route serves index.html. */
export function pageForPath(pathname: string): PageId {
  const path = pathname.replace(/^\/fr(?=\/|$)/, "").replace(/index\.html$/, "") || "/";
  const match = (Object.keys(pages) as PageId[]).find((id) => pages[id].path === path || pages[id].path === `${path}/`);
  return match ?? "not-found";
}
