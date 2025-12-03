import Image from "next/image";

import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

const founders = [
  {
    name: "Rashid Mushkani",
    role: "CEO, Architect",
    summary: "Led civic and cultural work at Mila",
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
  { name: "Mila", src: "/logos/mila-logo.png", width: 96, height: 32 },
  { name: "Centech", src: "/logos/centech-logo.png", width: 112, height: 32 },
  { name: "NEUF architect(e)s", src: "/logos/neuf-logo.png", width: 120, height: 32 }
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

      <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 bg-surface-sunken px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-soft">
          Backed by research-grade AI
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {researchLogos.map((logo) => (
            <div
              key={logo.name}
              className="relative flex h-8 items-center justify-center rounded-lg bg-white/5 px-3"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={logo.height}
                className="h-6 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
