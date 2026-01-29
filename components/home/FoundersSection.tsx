import Image from "next/image";

import { Section } from "@/components/Section";
const founders = [
  {
    name: "Rashid Mushkani",
    role: "CEO, AI & design researcher",
    src: "/headshots/rashid-mushkani.png"
  },
  {
    name: "Hugo Berard",
    role: "CTO, AI systems researcher",
    src: "/headshots/hugo-berard.png"
  },
  {
    name: "Shin Koseki",
    role: "Product, urbanist & professor",
    src: "/headshots/shin-koseki.png"
  }
];

export function FoundersSection() {
  return (
    <Section
      id="team"
      eyebrow="Founders"
      title="People who ship with studios and cities."
      kicker="Hands-on leaders across architecture, AI research, and urban policy."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {founders.map((person) => (
          <article
            key={person.name}
            className="card-surface flex flex-col gap-4 p-5 sm:p-6"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/5 bg-surface-sunken">
              <Image
                src={person.src}
                alt={person.name}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">{person.name}</h3>
              <p className="text-sm text-text-soft">{person.role}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
