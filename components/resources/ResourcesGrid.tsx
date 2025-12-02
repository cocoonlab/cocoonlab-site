import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";

import { Section } from "@/components/Section";
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
      title="Tools and writing for forward-looking studios."
      kicker="Short guides and templates to help you rethink early-stage design work."
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
              <div className="mt-4">
                <Link
                  href={r.href}
                  className="text-sm text-accent-blue underline-offset-4 hover:underline"
                >
                  Coming soon
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
