import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";

import { Section } from "@/components/Section";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import knowledgeGraphCanvas from "@/public/images/architectural-knowledge-graph-canvas.png";

const resources: { title: string; href: Route; tag: string }[] = [
  {
    title: "Why early-stage design deserves its own AI workspace",
    href: "/resources",
    tag: "Essay"
  },
  {
    title: "Design brief template for feasibility studies",
    href: "/resources",
    tag: "Template"
  },
  {
    title: "Checklist: data you need before a first massing session",
    href: "/resources",
    tag: "Checklist"
  },
  {
    title: "Integrating Cocoon with your CAD/BIM stack",
    href: "/resources",
    tag: "Guide"
  }
];

type Props = {
  compact?: boolean;
};

export function ResourcesGrid({ compact }: Props) {
  const items = compact ? resources.slice(0, 3) : resources;

  return (
    <Section
      id="resources"
      eyebrow="Resources"
      title="Guides and templates for fast-moving studios."
      kicker="Practical notes you can skim in a minute."
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
            <article key={r.title} className="card-surface p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                {r.tag}
              </p>
              <h3 className="mt-2 text-base font-semibold text-white">
                {r.title}
              </h3>
              <p className="mt-3 text-sm text-text-muted">Available first to private beta teams.</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <PrimaryCtaLink className="btn-primary px-6 py-2.5 text-sm font-semibold" />
          <Link
            href={{ pathname: "/", hash: "demo" }}
            className="btn-ghost px-5 py-2.5 text-sm font-semibold"
          >
            Watch demo
          </Link>
        </div>
      </div>
    </Section>
  );
}
