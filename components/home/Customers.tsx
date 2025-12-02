import Image from "next/image";

import { Section } from "@/components/Section";
import uiSlice from "@/public/images/saas-ui-visual.png";

const logos = [
  "Studio Nord",
  "Atelier Saint-Laurent",
  "Riverbank Design",
  "Parallax Partners",
  "Montreal Urban Lab"
];

const quotes = [
  {
    quote:
      "Cocoon lets us walk into client meetings with options and zoning implications already framed.",
    name: "Design director, mid-size studio in Montréal"
  },
  {
    quote:
      "We used to lose days reconciling regulations with floor area; now it happens live as we sketch.",
    name: "Partner, European practice in early access"
  }
];

export function Customers() {
  return (
    <Section
      id="customers"
      eyebrow="Early partners"
      title="Already informing live projects."
      kicker="We are running pilots with a handful of firms in Montréal and abroad."
    >
      <div className="space-y-10 md:space-y-12">
        <div className="flex flex-wrap items-center gap-3.5 text-xs text-text-muted md:gap-4">
          {logos.map((name) => (
            <div
              key={name}
              className="rounded-full border border-border-subtle/80 bg-surface-sunken/80 px-3 py-1"
            >
              {name}
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -right-6 -top-8 hidden h-28 w-48 overflow-hidden rounded-2xl border border-border-subtle/70 bg-surface-sunken/80 opacity-70 blur-[1px] sm:block sm:h-32 sm:w-56 md:h-36 md:w-64">
            <Image
              src={uiSlice}
              alt="Soft focus view of Cocoon's workspace, used as a background accent behind testimonials."
              fill
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 12rem"
              className="object-cover"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {quotes.map((q) => (
              <figure
                key={q.name}
                className="card-surface relative space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-7"
              >
                <blockquote className="text-sm leading-relaxed text-text-soft md:text-base">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-3 text-xs text-text-muted">
                  {q.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
