import { Section } from "@/components/Section";
import Link from "next/link";

const resources = [
  {
    title: "Why early-stage design deserves its own AI workspace",
    href: "#",
    tag: "Essay"
  },
  {
    title: "Design brief template for feasibility studies",
    href: "#",
    tag: "Template"
  },
  {
    title: "Checklist: data you need before a first massing session",
    href: "#",
    tag: "Checklist"
  },
  {
    title: "Integrating Cocoon with your CAD/BIM stack",
    href: "#",
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
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((r) => (
          <article key={r.title} className="card-surface p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              {r.tag}
            </p>
            <h3 className="mt-2 text-base font-semibold text-white">
              {r.title}
            </h3>
            <div className="mt-4">
              <Link href={r.href} className="text-sm text-accent-blue underline-offset-4 hover:underline">
                Coming soon
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
