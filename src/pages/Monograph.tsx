import { useSite } from "../site/Site.tsx";
import { PageIntro, Section } from "../site/ui.tsx";

type Line = string | { statement: string };

const copy = {
  en: {
    title: "Every place starts as a plan.",
    lead: "Cocoon Lab builds tools that help the people who plan, review, and build our cities get those plans right, early.",
    thesisTitle: "Thesis",
    thesis: [
      "The decisions that shape a street or a building are made on paper, long before work begins.",
      "When those plans are unclear, the cost shows up later: on the street, on the site, and in the lives of the people who use them.",
      { statement: "We make plans clear early." },
      { statement: "We do not replace the people who plan, review, and build." },
      { statement: "We give them evidence." },
    ],
    idealsTitle: "Ideals",
    ideals: [
      ["People decide", "Our tools check and explain. Planners, reviewers, and builders make the call."],
      ["Evidence over opinion", "Every result points back to the rule, the drawing, and the reason behind it."],
      ["Early is everything", "A problem caught on a plan is a change of lines. Caught on site, it is a closed street."],
      ["Clarity is safety", "Clear plans keep crews, drivers, cyclists, and pedestrians out of harm’s way."],
      ["Rooted in Montréal", "We build from the city we know: its streets, its rules, and its neighbourhoods."],
    ],
    monographTitle: "Manifesto",
    monograph: [
      { statement: "Cocoon Lab was founded in 2025 by Rashid Mushkani, Hugo Berard, and Shin Koseki." },
      "It grew out of years of work alongside designers, architectural firms, and community organizations in Montréal. Again and again, the same pattern appeared: the decisions that matter most are made early, with incomplete information and little time.",
      { statement: "Cocoon Lab was created for that moment." },
      "Cocoon Triage helps teams review temporary street plans, so a work zone is clear before a lane closes. Cocoon Code runs building-code rules on drawings, and every verdict comes with the evidence to check it.",
      { statement: "Our position is deliberate." },
      "We do not believe cities should be planned by machines. Streets and buildings are shaped by people, by context, and by care. They call for judgment and for responsibility.",
      { statement: "AI should not replace that judgment." },
      { statement: "It should support it." },
      { statement: "Time saved is not the end goal." },
      { statement: "Better places are." },
    ],
  },
  fr: {
    title: "Tout lieu commence par un plan.",
    lead: "Cocoon Lab conçoit des outils qui aident celles et ceux qui planifient, examinent et construisent nos villes à réussir leurs plans, dès le départ.",
    thesisTitle: "Thèse",
    thesis: [
      "Les décisions qui façonnent une rue ou un bâtiment se prennent sur papier, bien avant le début des travaux.",
      "Quand ces plans manquent de clarté, le coût apparaît plus tard : dans la rue, sur le chantier et dans la vie de celles et ceux qui les utilisent.",
      { statement: "Nous rendons les plans clairs, tôt." },
      { statement: "Nous ne remplaçons pas celles et ceux qui planifient, examinent et construisent." },
      { statement: "Nous leur donnons des preuves." },
    ],
    idealsTitle: "Principes",
    ideals: [
      ["Les personnes décident", "Nos outils vérifient et expliquent. Les urbanistes, les examinateurs et les bâtisseurs tranchent."],
      ["Des preuves plutôt que des opinions", "Chaque résultat renvoie à la règle, au plan et à ce qui le justifie."],
      ["Tôt, c’est tout", "Un problème repéré sur un plan, c’est un trait à corriger. Repéré sur le chantier, c’est une rue fermée."],
      ["La clarté, c’est la sécurité", "Des plans clairs protègent les équipes, les automobilistes, les cyclistes et les piétons."],
      ["Ancré à Montréal", "Nous partons de la ville que nous connaissons : ses rues, ses règles et ses quartiers."],
    ],
    monographTitle: "Manifeste",
    monograph: [
      { statement: "Cocoon Lab a été fondé en 2025 par Rashid Mushkani, Hugo Berard et Shin Koseki." },
      "Il est né de plusieurs années de travail aux côtés de designers, de firmes d’architecture et d’organisations communautaires à Montréal. Un même constat revenait sans cesse : les décisions qui comptent le plus se prennent tôt, avec une information incomplète et peu de temps.",
      { statement: "Cocoon Lab a été créé pour ce moment." },
      "Cocoon Triage aide les équipes à examiner les plans de signalisation temporaire, pour qu’un chantier soit clair avant qu’une voie ferme. Cocoon Code applique les règles du code du bâtiment aux plans, et chaque verdict s’accompagne des preuves pour le vérifier.",
      { statement: "Notre position est délibérée." },
      "Nous ne croyons pas que les villes doivent être planifiées par des machines. Les rues et les bâtiments sont façonnés par des personnes, par un contexte et par du soin. Ils demandent du jugement et de la responsabilité.",
      { statement: "L’IA ne doit pas remplacer ce jugement." },
      { statement: "Elle doit le soutenir." },
      { statement: "Le temps gagné n’est pas l’objectif final." },
      { statement: "De meilleurs lieux le sont." },
    ],
  },
} satisfies Record<string, { thesis: Line[]; monograph: Line[]; [key: string]: unknown }>;

/** The manifesto's beats are set as statements; the reasoning between them as prose. */
function Passage({ lines }: { lines: readonly Line[] }) {
  return (
    <div className="prose">
      {lines.map((line) =>
        typeof line === "string" ? (
          <p key={line}>{line}</p>
        ) : (
          <p key={line.statement} className="statement">
            {line.statement}
          </p>
        ),
      )}
    </div>
  );
}

export function Monograph() {
  const { locale } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <Section id="thesis-title" title={text.thesisTitle}>
        <Passage lines={text.thesis} />
      </Section>

      <Section id="ideals-title" title={text.idealsTitle}>
        <ul>
          {text.ideals.map(([title, body]) => (
            <li
              key={title}
              className="grid gap-x-8 gap-y-2 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
            >
              <h3 className="font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.018em]">{title}</h3>
              <p className="max-w-[28rem] font-body text-[1rem] leading-[1.6] text-muted sm:pt-1">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="monograph-title" title={text.monographTitle}>
        <Passage lines={text.monograph} />
      </Section>
    </>
  );
}
