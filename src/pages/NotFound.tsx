import { PixelScene } from "../PixelScene.tsx";
import { triageScene } from "../pixel/triage.ts";
import { useSite } from "../site/Site.tsx";
import { Actions, ArrowLink, ButtonLink, PageIntro } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";

const copy = {
  en: {
    title: "This page does not exist.",
    lead: "The link may be outdated, or the page may have moved. You can return to the homepage or get in touch.",
    home: "Go back to cocoonlab.ai",
    contact: "Contact Cocoon Lab",
  },
  fr: {
    title: "Cette page n’existe pas.",
    lead: "Le lien est peut-être périmé ou la page a été déplacée. Vous pouvez revenir à l’accueil ou nous écrire.",
    home: "Retourner à cocoonlab.ai",
    contact: "Contacter Cocoon Lab",
  },
} as const;

/** The missing page: the street is closed for work, so here is the detour. */
export function NotFound() {
  const { locale } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead}>
        <Actions>
          <ButtonLink href="/">{text.home}</ButtonLink>
          <ArrowLink href="/contact/">{text.contact}</ArrowLink>
        </Actions>
      </PageIntro>
      <div className={wrap}>
        <PixelScene scene={triageScene} className="detour-scene" />
      </div>
    </>
  );
}
