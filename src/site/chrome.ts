import type { Locale } from "../locale.ts";

type Link = { label: string; href: string };

/** Copy for what every page shares: header, river and footer. */
export const chrome: Record<
  Locale,
  {
    skipToContent: string;
    homeLabel: string;
    topLabel: string;
    navLabel: string;
    nav: Link[];
    languageLabel: string;
    riverScene: string;
    signature: string;
    footerLabel: string;
    footerGroups: { title: string; links: Link[] }[];
    legalLabel: string;
    legalLinks: Link[];
    cookiePreferences: string;
  }
> = {
  en: {
    skipToContent: "Skip to content",
    homeLabel: "Cocoon Lab, home",
    topLabel: "Cocoon Lab, back to top",
    navLabel: "Primary",
    nav: [
      { label: "Products", href: "/#products" },
      { label: "Company", href: "/#company" },
      { label: "Contact", href: "/contact/" },
    ],
    languageLabel: "Language",
    riverScene: "The St. Lawrence and the Montréal skyline at a distance, with a ferry crossing.",
    signature: "Made in Montréal",
    footerLabel: "Site",
    footerGroups: [
      {
        title: "Products",
        links: [
          { label: "Cocoon Triage", href: "https://triage.cocoonlab.ai" },
          { label: "Cocoon Code", href: "https://code.cocoonlab.ai" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Team", href: "/team/" },
          { label: "Partners", href: "/partners/" },
          { label: "Studio", href: "/studio/" },
          { label: "Contact", href: "/contact/" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog/" },
          { label: "Monograph", href: "/monograph/" },
          { label: "Press kit", href: "/press-kit/" },
        ],
      },
    ],
    legalLabel: "Legal",
    legalLinks: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
    cookiePreferences: "Cookie preferences",
  },
  fr: {
    skipToContent: "Aller au contenu",
    homeLabel: "Cocoon Lab, accueil",
    topLabel: "Cocoon Lab, retour en haut",
    navLabel: "Navigation principale",
    nav: [
      { label: "Produits", href: "/#products" },
      { label: "Entreprise", href: "/#company" },
      { label: "Contact", href: "/contact/" },
    ],
    languageLabel: "Langue",
    riverScene: "Le Saint-Laurent et le panorama de Montréal au loin, avec un traversier.",
    signature: "Fait à Montréal",
    footerLabel: "Site",
    footerGroups: [
      {
        title: "Produits",
        links: [
          { label: "Cocoon Triage", href: "https://triage.cocoonlab.ai" },
          { label: "Cocoon Code", href: "https://code.cocoonlab.ai" },
        ],
      },
      {
        title: "Entreprise",
        links: [
          { label: "Équipe", href: "/team/" },
          { label: "Partenaires", href: "/partners/" },
          { label: "Studio", href: "/studio/" },
          { label: "Contact", href: "/contact/" },
        ],
      },
      {
        title: "Ressources",
        links: [
          { label: "Blogue", href: "/blog/" },
          { label: "Manifeste", href: "/monograph/" },
          { label: "Kit média", href: "/press-kit/" },
        ],
      },
    ],
    legalLabel: "Mentions légales",
    legalLinks: [
      { label: "Confidentialité", href: "/privacy/" },
      { label: "Conditions", href: "/terms/" },
    ],
    cookiePreferences: "Préférences de témoins",
  },
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};
