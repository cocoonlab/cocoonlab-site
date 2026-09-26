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
import { Studio } from "./Studio.tsx";
import { Team } from "./Team.tsx";

type Meta = { title: string; description: string };

export type Page = {
  /** The public URL path. */
  path: string;
  /** Where the prerendered page is written, relative to dist/. */
  file: string;
  meta: Record<Locale, Meta>;
  render: () => ReactNode;
};

export const pages = {
  home: {
    path: "/",
    file: "index.html",
    meta: {
      en: {
        title: "Cocoon Lab | AI for streets and buildings",
        description:
          "Cocoon Lab builds tools for safer streets and better buildings: Cocoon Triage for temporary street plans and Cocoon Code for building-code checks.",
      },
      fr: {
        title: "Cocoon Lab | L’IA pour les rues et les bâtiments",
        description:
          "Cocoon Lab conçoit des outils pour des rues plus sûres et de meilleurs bâtiments : Cocoon Triage pour les plans de signalisation temporaire et Cocoon Code pour les vérifications du code du bâtiment.",
      },
    },
    render: () => <Home />,
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
      en: { title: "Partners | Cocoon Lab", description: "Meet the partners who work with Cocoon Lab, including Mila." },
      fr: { title: "Partenaires | Cocoon Lab", description: "Découvrez les partenaires de Cocoon Lab, dont Mila." },
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
      en: { title: "Cocoon at InDesCanada | Cocoon Lab", description: "Rashid Mushkani will present Cocoon at InDesCanada in Ottawa." },
      fr: { title: "Cocoon à InDesCanada | Cocoon Lab", description: "Rashid Mushkani présentera Cocoon à InDesCanada, à Ottawa." },
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
      en: { title: "Monograph | Cocoon Lab", description: "The thesis, ideals, and founding position behind Cocoon Lab." },
      fr: { title: "Manifeste | Cocoon Lab", description: "La thèse, les principes et la position fondatrice de Cocoon Lab." },
    },
    render: () => <Monograph />,
  },
  studio: {
    path: "/studio/",
    file: "studio/index.html",
    meta: {
      en: {
        title: "Studio | Cocoon Lab",
        description: "Upload a site, compare early options, and see fit, cost, carbon, and planning risks before design is fixed.",
      },
      fr: {
        title: "Studio | Cocoon Lab",
        description: "Importez un site, comparez des options et voyez la forme, le coût, le carbone et les risques avant de fixer le design.",
      },
    },
    render: () => <Studio />,
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

/** The page for a URL path, for the dev server where every route serves index.html. */
export function pageForPath(pathname: string): PageId {
  const path = pathname.replace(/index\.html$/, "");
  const match = (Object.keys(pages) as PageId[]).find((id) => pages[id].path === path || pages[id].path === `${path}/`);
  return match ?? "not-found";
}
