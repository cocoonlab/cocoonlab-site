import Image from "next/image";

import { Section } from "@/components/Section";

const pilots = [
  {
    name: "Sid Lee Architecture",
    src: "/logos/sidlee-architecture-logo.svg",
    width: 220,
    height: 88
  },
  {
    name: "Neuf Architects",
    src: "/logos/neuf-logo.png",
    width: 200,
    height: 86
  },
  {
    name: "Civiliti",
    src: "/logos/civiliti-logo.svg",
    width: 220,
    height: 88
  },
  {
    name: "SOUR",
    src: "/logos/sour-logo.svg",
    width: 200,
    height: 86
  },
  {
    name: "Allies and Morrison",
    src: "/logos/alliesandmorrison-logo.png",
    width: 220,
    height: 90
  }
];

const priorities = [
  "Zoning clarity before design lock.",
  "Capacity math planners can verify.",
  "Client decks that stay on brand."
];

const blurredLogoNames = new Set([
  "Sid Lee Architecture",
  "Neuf Architects",
  "Civiliti"
]);

export function Customers() {
  return (
    <Section
      id="customers"
      eyebrow="Pilots"
      title="Piloted with architecture firms in Montréal, New York, London"
      kicker="Live pilots validating compliance and story."
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr,1fr] lg:items-start">
        <div className="card-surface space-y-4 border border-border-subtle/80 p-6 shadow-[0_1px_0_rgba(255,255,255,0.05)] sm:p-7">
          <h3 className="text-base font-semibold tracking-tight text-ink">What these teams care about</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-text-soft md:text-base">
            {priorities.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface border border-border-subtle/80 bg-surface-sunken/70 p-6 sm:p-7">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-2">
            {pilots.map((pilot) => (
              <div
                key={pilot.name}
                className="flex h-24 items-center justify-center rounded-xl border border-border-subtle/70 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              >
                <Image
                  src={pilot.src}
                  alt={`${pilot.name} logo`}
                  width={pilot.width}
                  height={pilot.height}
                  className={`h-full w-full max-h-12 max-w-[10rem] object-contain brightness-110 contrast-110 saturate-0 sm:saturate-100 ${
                    blurredLogoNames.has(pilot.name)
                      ? "blur-[14px] brightness-90 contrast-75"
                      : ""
                  }`}
                  sizes="(min-width: 1024px) 14rem, (min-width: 768px) 12rem, 10rem"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
