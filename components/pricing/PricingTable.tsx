import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/Section";

import projectHoursCard from "@/public/images/project-hours-infographic-card.png";
import revisionComparisonChart from "@/public/images/revision-comparison-chart.png";

type Tier = {
  name: string;
  price: string;
  description: string;
  highlights: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Studio",
    price: "Contact us",
    description:
      "For small teams running feasibility studies and early-stage projects across one region.",
    highlights: [
      "Up to 10 active projects",
      "Shared brief & concept boards",
      "Zoning-aware options for a primary region",
      "Email support and onboarding"
    ]
  },
  {
    name: "Practice",
    price: "Contact us",
    description:
      "For established practices coordinating multiple studios, sectors, or geographies.",
    highlights: [
      "Higher project limits",
      "Multi-region zoning configurations",
      "Advanced admin & permissions",
      "Priority support and onboarding sessions"
    ],
    featured: true
  },
  {
    name: "Enterprise & public sector",
    price: "Let’s talk",
    description:
      "For city agencies, large enterprises, or bespoke workflows that need deeper integrations.",
    highlights: [
      "Custom data integrations",
      "Security review & SSO",
      "Dedicated success partner",
      "Flexible deployment options"
    ]
  }
];

export function PricingTable() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Early access for studios that want to shape the product."
      kicker="We’re working closely with a small number of teams. Pricing reflects the value of unblocking early-stage design work."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-start">
        {/* Tiers */}
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`card-surface flex flex-col justify-between p-5 sm:p-6 ${
                tier.featured
                  ? "border-accent-blue/80 bg-surface-raised/80 shadow-inner-glow"
                  : ""
              }`}
            >
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                  {tier.name}
                </p>
                <p className="text-sm text-text-soft">{tier.description}</p>
                <p className="text-base font-semibold text-white">{tier.price}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {tier.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-emerald"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  href="/contact"
                  className={`inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-medium ${
                    tier.featured
                      ? "bg-accent-blue text-bg hover:bg-accent-blue/90"
                      : "border border-border-subtle bg-surface-sunken hover:border-border"
                  }`}
                >
                  {tier.name === "Practice" ? "Talk to us" : "Contact us"}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Efficiency visuals */}
        <div className="relative mt-4 lg:mt-0">
          <div className="card-surface relative overflow-hidden bg-gradient-to-b from-surface-raised/80 via-surface-raised/95 to-bg/80 shadow-inner-glow">
            <div className="relative h-44 sm:h-52">
              <Image
                src={projectHoursCard}
                alt="Infographic showing project hours saved when feasibility and admin move into Cocoon."
                fill
                sizes="(min-width: 1024px) 20rem, 60vw"
                className="object-cover"
              />
            </div>
            <div className="border-t border-border-subtle/70 px-4 py-3 text-xs text-text-muted sm:px-5 sm:py-4">
              <p>
                Early pilots see{" "}
                <span className="font-medium text-white">dozens of hours</span>{" "}
                saved per project by consolidating feasibility, admin, and
                compliance work into Cocoon.
              </p>
            </div>
          </div>

          <div className="card-surface absolute -bottom-8 -left-4 hidden w-40 overflow-hidden shadow-inner-glow sm:block md:w-48 lg:-bottom-10 lg:-left-8">
            <div className="relative aspect-[4/3]">
              <Image
                src={revisionComparisonChart}
                alt="Revision comparison chart illustrating reduced rework when teams adopt Cocoon."
                fill
                sizes="12rem"
                className="object-cover"
              />
            </div>
            <p className="px-3 pb-3 pt-2 text-[11px] text-text-muted">
              Fewer late-stage revisions from clearer early decisions.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-text-muted">
        Early pilots are discounted in exchange for regular feedback on product direction.
      </p>
    </Section>
  );
}
