import { useSite } from "../site/Site.tsx";
import { PageIntro, Prose, Section } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";

const people = [
  { id: "rashid-mushkani", name: "Rashid Mushkani" },
  { id: "hugo-berard", name: "Hugo Berard" },
  { id: "shin-koseki", name: "Shin Koseki" },
] as const;

const copy = {
  en: {
    title: "The team",
    lead: "Cocoon Lab is a small Montréal team of designers, planners, and AI researchers building tools for safer streets and better buildings.",
    role: "Co-founder",
    portrait: (name: string) => `Headshot of ${name}`,
    notes: {
      "rashid-mushkani": "PhD candidate in AI and planning. Built WeDesign+.",
      "hugo-berard": "PhD in AI. Built Praxagora; ex-Facebook AI.",
      "shin-koseki": "PhD in design. Founded Chôros.",
    },
    practiceTitle: "Built from practice.",
    practice:
      "Cocoon Lab emerged from work alongside creative professionals, architectural firms, and community organizations in Montréal. That background keeps our tools focused on real decisions, real constraints, and real workflows.",
  },
  fr: {
    title: "L’équipe",
    lead: "Cocoon Lab est une petite équipe montréalaise de designers, d’urbanistes et de chercheurs en IA qui conçoit des outils pour des rues plus sûres et de meilleurs bâtiments.",
    role: "Cofondateur",
    portrait: (name: string) => `Portrait de ${name}`,
    notes: {
      "rashid-mushkani": "Doctorant en IA et en urbanisme. A créé WeDesign+.",
      "hugo-berard": "Doctorat en IA. A créé Praxagora; ancien de Facebook AI.",
      "shin-koseki": "Doctorat en design. Fondateur de Chôros.",
    },
    practiceTitle: "Issu de la pratique.",
    practice:
      "Cocoon Lab est né d’un travail aux côtés de professionnels créatifs, de firmes d’architecture et d’organisations communautaires à Montréal. Cet ancrage garde nos outils centrés sur de vraies décisions, de vraies contraintes et de vrais flux de travail.",
  },
} as const;

export function Team() {
  const { locale, href } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <ul className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3`}>
        {people.map((person) => (
          <li key={person.id}>
            <div className="aspect-[4/5] overflow-hidden bg-mist/50">
              <img
                src={href(`/assets/team/${person.id}.webp`)}
                alt={text.portrait(person.name)}
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[0.35]"
              />
            </div>
            <h2 className="mt-5 font-display text-[1.5rem] font-medium leading-[1.1] tracking-[-0.02em]">{person.name}</h2>
            <p className="mt-1.5 font-body text-[0.9375rem] text-muted">{text.role}</p>
            <p className="mt-3 max-w-[22rem] text-pretty font-body text-[0.9375rem] leading-[1.55] text-ink">{text.notes[person.id]}</p>
          </li>
        ))}
      </ul>

      <Section id="practice-title" title={text.practiceTitle}>
        <Prose>
          <p>{text.practice}</p>
        </Prose>
      </Section>
    </>
  );
}
