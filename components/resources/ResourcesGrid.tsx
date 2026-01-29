import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";

import { Section } from "@/components/Section";
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
      title="A quiet library of guides, templates, and notes we keep close during early feasibility."
    >
      <div className="relative">
        <div className="pointer-events-none absolute -right-6 -top-20 hidden h-24 w-40 overflow-hidden rounded-2xl border border-divider/70 bg-surface-sunken opacity-60 blur-[1px] md:block">
          <Image
            src={knowledgeGraphCanvas}
            alt="Soft focus of Cocoon's architectural knowledge graph canvas behind the resources header."
            fill
            sizes="12rem"
            className="object-cover"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="card-surface group flex h-full flex-col justify-between rounded-2xl p-5 transition-[border-color,transform] duration-200 hover:-translate-y-[1px] hover:border-divider focus-visible:-translate-y-[1px] focus-visible:border-divider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 sm:p-6"
            >
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {r.tag}
                </p>
                <h3 className="text-base font-semibold text-ink">{r.title}</h3>
                <p className="text-sm text-text-muted">
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                    {r.description}
                  </span>
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay">
                Open <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-divider/60 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-ink">Monthly studio updates.</p>
            <p className="text-xs text-text-muted">Pilot invites, launch notes, no spam.</p>
          </div>
          <div className="w-full md:max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
