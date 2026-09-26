import { useSite } from "../site/Site.tsx";
import { PageIntro } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";

const copy = {
  en: {
    title: "Cocoon Studio",
    lead: "Upload a site, compare early options, and see fit, cost, carbon, and planning risks before design is fixed.",
    features: [
      ["See the whole picture", "Cocoon reads site, cost, carbon, rules, and visuals together so teams can see tradeoffs in one place."],
      ["Compare options quickly", "Test different site ideas early, while changes are still easy."],
      ["Decide with evidence", "Cocoon keeps constraints, tradeoffs, and opportunities clear so architects can choose the next step."],
    ],
    image: "Monochrome atmospheric visual representing the Cocoon studio environment",
    exchange: [
      ["What you bring", "Surveys, planning documents, sketches, massing studies, and team knowledge."],
      ["What Cocoon checks", "Site context, budget, carbon, rules, access, and visual fit."],
      ["What you get", "Clean 3D models, simple reports, and realistic previews for the next conversation."],
    ],
  },
  fr: {
    title: "Studio Cocoon",
    lead: "Importez un site, comparez des options en amont et voyez la forme, le coût, le carbone et les risques avant de fixer le design.",
    features: [
      ["Voir l’ensemble", "Cocoon lit ensemble le site, le coût, le carbone, les règles et les visuels afin que l’équipe voie les compromis au même endroit."],
      ["Comparer vite les options", "Testez tôt différentes idées de site, quand les changements sont encore simples."],
      ["Décider avec des preuves", "Cocoon garde les contraintes, compromis et occasions clairs afin que les architectes choisissent la prochaine étape."],
    ],
    image: "Visuel atmosphérique monochrome représentant l’environnement du studio Cocoon",
    exchange: [
      ["Ce que vous apportez", "Relevés, documents d’urbanisme, croquis, études de volumétrie et connaissances d’équipe."],
      ["Ce que Cocoon vérifie", "Contexte du site, budget, carbone, règles, accès et forme visuelle."],
      ["Ce que vous obtenez", "Des modèles 3D propres, des rapports simples et des aperçus réalistes pour la prochaine discussion."],
    ],
  },
} as const;

function Trio({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 md:grid-cols-3">
      {items.map(([title, body]) => (
        <li key={title} className="border-t border-line pt-6">
          <h2 className="font-display text-[1.5rem] font-medium leading-[1.12] tracking-[-0.02em]">{title}</h2>
          <p className="mt-3 max-w-[24rem] font-body text-[1rem] leading-[1.6] text-muted">{body}</p>
        </li>
      ))}
    </ul>
  );
}

export function Studio() {
  const { locale, href } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <div className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)]`}>
        <Trio items={text.features} />
      </div>

      <figure className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)]`}>
        <img
          src={href("/assets/outputs/atmospheric-previews2.webp")}
          alt={text.image}
          width={1600}
          height={1067}
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] w-full bg-mist/50 object-cover"
        />
      </figure>

      <div className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)]`}>
        <Trio items={text.exchange} />
      </div>
    </>
  );
}
