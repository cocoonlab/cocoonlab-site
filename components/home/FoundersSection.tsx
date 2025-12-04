import Image from "next/image";

import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

const founders = [
  {
    name: "Rashid Mushkani",
    role: "CEO, AI & design researcher",
    summary: "PhD in AI & design from Mila, working at the intersection of architecture, design, and intelligent systems.",
    src: "/headshots/rashid-mushkani.png",
    emailSubject: "Hello%20Rashid%20%E2%80%93%20Cocoon"
  },
  {
    name: "Hugo Berard",
    role: "CTO, AI systems researcher",
    summary: "Built generative tooling with Mila teams and industry pilots.",
    src: "/headshots/hugo-berard.png",
    emailSubject: "Hello%20Hugo%20%E2%80%93%20Cocoon"
  },
  {
    name: "Shin Koseki",
    role: "Product, urbanist & professor",
    summary: "Advises cities on resilient public-realm design and policy.",
    src: "/headshots/shin-koseki.png",
    emailSubject: "Hello%20Shin%20%E2%80%93%20Cocoon"
  }
];

const researchLogos = [
  { name: "Mila", src: "/logos/mila-logo.png", width: 140, height: 44 },
  { name: "Centech", src: "/logos/centech-logo.png", width: 156, height: 44 },
  { name: "NEUF architect(e)s", src: "/logos/neuf-logo.png", width: 160, height: 44 }
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
            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                <p className="text-sm text-text-soft">{person.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-text-muted">{person.summary}</p>
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${person.emailSubject}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Connect
            </a>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl border border-white/5 bg-surface-sunken px-5 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-soft sm:text-base">
          Backed by research-grade AI
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {researchLogos.map((logo) => (
            <div
              key={logo.name}
              className="relative flex h-10 items-center justify-center rounded-lg bg-white/5 px-4 sm:h-12 sm:px-5"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto object-contain sm:h-9"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
