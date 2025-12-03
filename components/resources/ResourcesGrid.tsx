import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";

import { Section } from "@/components/Section";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import knowledgeGraphCanvas from "@/public/images/architectural-knowledge-graph-canvas.png";

const resources: { title: string; href: Route; tag: "Guide" | "Template" | "Note"; description: string }[] = [
  {
    title: "30-minute feasibility sprint",
    href: "/contact",
    tag: "Guide",
    description: "How we prep a site review and capture risks fast."
  },
  {
    title: "Zoning brief template (Mile-End example)",
    href: "/waitlist",
    tag: "Template",
    description: "A concise intake we refine with pilot teams."
  },
  {
    title: "Coordinating with your CAD/BIM stack",
    href: "/contact",
    tag: "Guide",
    description: "Workflow note for Revit, Rhino, and IFC handoff."
  },
  {
    title: "Stakeholder playback notes",
    href: "/waitlist",
    tag: "Note",
    description: "Slides we use to summarize options and blockers."
  }
];

type Props = {
  compact?: boolean;
};

export function ResourcesGrid({ compact }: Props) {
  const items = (compact ? resources.slice(0, 3) : resources).slice(0, 5);

  return (
    <Section
      id="resources"
      eyebrow="Resources"
      title="Field notes we share with pilots."
      kicker="Skimmable references, no filler."
    >
      <div className="relative">
        <div className="pointer-events-none absolute -right-4 -top-16 hidden h-28 w-44 overflow-hidden rounded-2xl border border-border-subtle/70 bg-surface-sunken/80 opacity-70 blur-[1px] sm:block">
          <Image
            src={knowledgeGraphCanvas}
            alt="Soft focus of Cocoon's architectural knowledge graph canvas behind the resources header."
            fill
            sizes="12rem"
            className="object-cover"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="card-surface group flex h-full flex-col justify-between rounded-2xl p-5 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:border-border focus-visible:-translate-y-[1px] focus-visible:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 sm:p-6"
            >
              <div className="space-y-2.5">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                  <span className="h-[1px] w-8 bg-border-muted" aria-hidden />
                  {r.tag}
                </p>
                <h3 className="text-base font-semibold text-white">{r.title}</h3>
                <p className="text-sm text-text-muted">{r.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-blue">
                Open {r.tag.toLowerCase()}
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <PrimaryCtaLink
            label="Talk with us"
            className="btn-primary px-6 py-2.5 text-sm font-semibold"
          />
          <Link
            href={{ pathname: "/", hash: "demo" }}
            className="btn-ghost px-5 py-2.5 text-sm font-semibold"
          >
            See the live demo
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-sunken/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="text-sm font-semibold text-white">We share updates monthly.</p>
              <p className="text-xs text-text-muted">Pilot invites, launch notes, no spam.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
