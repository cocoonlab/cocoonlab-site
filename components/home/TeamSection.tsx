import Image from "next/image";

import { Section } from "@/components/Section";

const founders = [
  {
    name: "Rashid Mushkani",
    role: "CEO, ex-Sid Lee Architecture",
    src: "/headshots/rashid-mushkani.png"
  },
  {
    name: "Hugo Berard",
    role: "CTO, AI systems researcher",
    src: "/headshots/hugo-berard.png"
  },
  {
    name: "Shin Koseki",
    role: "Head of Product, urbanist + prof.",
    src: "/headshots/shin-koseki.png"
  }
];

export function TeamSection() {
  return (
    <Section
      id="team"
      eyebrow="Team"
      title="Built by designers, planners, and AI researchers."
      kicker="We ship fast with partner studios to keep Cocoon grounded in real constraints."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {founders.map((person) => (
          <div
            key={person.name}
            className="card-surface flex items-center gap-4 p-5 sm:p-6"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-surface-sunken">
              <Image
                src={person.src}
                alt={person.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-ink">{person.name}</p>
              <p className="text-xs text-text-muted">{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
