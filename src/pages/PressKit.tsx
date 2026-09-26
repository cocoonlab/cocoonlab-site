import { useSite } from "../site/Site.tsx";
import { Actions, ArrowLink, ButtonLink, PageIntro, Section } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";

const KIT = "/press-kit/Cocoon_Lab_Press_Kit";

const copy = {
  en: {
    title: "Cocoon Lab brand assets.",
    lead: "Official logos, lockups, glyphs, color tokens, typography direction, social cards, favicons, and imagery for press and partner use.",
    download: "Download ZIP",
    notes: "Read usage notes",
    preview: "Press kit preview",
    lockup: "Cocoon Lab horizontal lockup in ink",
    lockupOnInk: "Cocoon Lab horizontal lockup on an ink background",
    useTitle: "Use cleanly.",
    rules: [
      "Keep the logo clear, legible, and unmodified.",
      "Use Ink assets on light backgrounds and Ivory or OnInk assets on dark backgrounds.",
      "Use SVG or EPS for production artwork; use PNG for web, slides, and social layouts.",
    ],
  },
  fr: {
    title: "Actifs de marque Cocoon Lab.",
    lead: "Logos, compositions, glyphes, jetons de couleur, direction typographique, cartes sociales, favicons et images officiels, pour la presse et les partenaires.",
    download: "Télécharger le ZIP",
    notes: "Lire les notes d’usage",
    preview: "Aperçu du kit média",
    lockup: "Composition horizontale de Cocoon Lab, en encre",
    lockupOnInk: "Composition horizontale de Cocoon Lab sur fond encre",
    useTitle: "Utiliser proprement.",
    rules: [
      "Gardez le logo dégagé, lisible et intact.",
      "Utilisez les versions Ink sur fond clair, et Ivory ou OnInk sur fond foncé.",
      "Utilisez SVG ou EPS pour la production; PNG pour le web, les présentations et les réseaux sociaux.",
    ],
  },
} as const;

export function PressKit() {
  const { locale, href } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead}>
        <Actions>
          <ButtonLink href="/press-kit/Cocoon_Lab_Press_Kit.zip" download>
            {text.download}
          </ButtonLink>
          <ArrowLink href={`${KIT}/README.md`}>{text.notes}</ArrowLink>
        </Actions>
      </PageIntro>

      <figure aria-label={text.preview} className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)] grid gap-6 md:grid-cols-2`}>
        <div className="flex aspect-[1200/630] items-center justify-center bg-white/70">
          <img src={href(`${KIT}/03_Lockups/SVG/Cocoon_Lockup_Horizontal_Ink.svg`)} alt={text.lockup} className="h-auto w-[58%]" />
        </div>
        <div className="flex aspect-[1200/630] items-center justify-center bg-ink">
          <img src={href(`${KIT}/03_Lockups/SVG/Cocoon_Lockup_Horizontal_OnInk.svg`)} alt={text.lockupOnInk} className="h-auto w-[58%]" />
        </div>
      </figure>

      <Section id="use-title" title={text.useTitle}>
        <ul className="font-body text-[1.0625rem] leading-[1.55]">
          {text.rules.map((rule) => (
            <li key={rule} className="border-t border-line py-4 first:border-t-0 first:pt-0">
              {rule}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
