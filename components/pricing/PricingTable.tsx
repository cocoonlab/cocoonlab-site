import { Section } from "@/components/Section";
import Link from "next/link";

const tiers = [
  {
    name: "Studio",
    price: "Contact us",
    description:
      "For small teams running multiple feasibility studies and early-stage projects per year.",
    highlights: [
      "Up to 10 active projects",
      "Shared brief and concept boards",
      "Zoning-aware options for one primary region",
      "Email support and onboarding"
    ],
    cta: "Talk to us"
  },
  {
    name: "Practice",
    price: "Custom",
    description:
      "For growing practices that want Cocoon at the center of early design work.",
    highlights: [
      "Unlimited active projects",
      "Region bundles for zoning knowledge",
      "Workspace-level controls and review tools",
      "Priority support and roadmap input"
    ],
    cta: "Book a conversation"
  }
];

export function PricingTable() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Simple plans aligned with your project pipeline."
      kicker="We are in active development and keep pricing straightforward while we co-design Cocoon with early partners."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {tiers.map((tier, index) => (
          <article
            key={tier.name}
            className={`card-surface flex flex-col gap-4 p-6 ${
              index === 1 ? "border-accent-blue/60" : ""
            }`}
          >
            <header className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              <p className="text-sm text-text-muted">{tier.description}</p>
              <p className="text-sm font-semibold text-text-soft">
                {tier.price}
              </p>
            </header>
            <ul className="space-y-2 text-sm text-text-muted">
              {tier.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1 text-accent-lime">
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link href="/waitlist" className="btn-primary">
                {tier.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
