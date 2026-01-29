import Link from "next/link";
import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import type { UrlObject } from "url";

import { LayoutShell } from "@/components/layout/LayoutShell";
import type { CaseStudy } from "@/app/customers/caseStudies";
import { caseStudies } from "@/app/customers/caseStudies";

type PageProps = { params: { slug: keyof typeof caseStudies } };

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = caseStudies[params.slug];
  if (!study) {
    return { title: "Customer story – Cocoon" };
  }

  return {
    title: `${study.name} – Customer story – Cocoon`,
    description: study.headline
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const study: CaseStudy | undefined = caseStudies[params.slug];

  if (!study) {
    notFound();
  }

  return (
    <LayoutShell>
      <section className="section-pad pb-10 md:pb-12">
        <div className="container-x space-y-10 md:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Customers / {study.name}</p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
              {study.headline}
            </h1>
          </div>

          <div className="mx-auto w-full max-w-4xl">
            <div
              className={`relative aspect-[16/9] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br ${study.gradient} shadow-[0_28px_90px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_36px_110px_rgba(0,0,0,0.7)]`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.35),transparent_55%)]" />
              <div className="absolute inset-3 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-[2px]" />
              <div className="relative flex h-full items-center justify-center">
                <div className="rounded-full border border-white/30 bg-white/15 px-6 py-3 text-lg font-semibold uppercase tracking-[0.28em] text-ink shadow-lg">
                  {study.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-x space-y-10 md:space-y-12">
          <div className="mx-auto max-w-4xl space-y-4 text-base leading-relaxed text-text-soft md:text-lg">
            {study.summary.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="h-px w-full bg-border-subtle/70" />

          <div className="grid gap-6 md:grid-cols-3">
            {study.metadata.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{item.label}</p>
                <p className="text-base font-medium text-ink md:text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl space-y-7 md:space-y-8">
            {study.storySections.map((section) => (
              <div key={section.title} className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">{section.title}</p>
                <p className="text-base leading-relaxed text-text-soft md:text-lg">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-x space-y-8 md:space-y-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3 md:max-w-2xl">
              <p className="badge-pill">Customer stories</p>
              <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                Meet the teams behind Cocoon and our partners
              </h2>
              <p className="text-sm leading-relaxed text-text-soft md:text-base">
                Leaders from SOUR, Civiliti, and Sid Lee Architecture pair their creative intuition with Cocoon’s AI guardrails. Our leadership builds the rails that keep every iteration grounded.
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start text-sm font-semibold text-clay underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-clay"
            >
              Make the switch →
            </Link>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {peopleCards.map((card) => (
              <article
                key={card.title}
                className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface-raised/80 p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.65)] md:p-6"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.28]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, transparent 28%), linear-gradient(225deg, rgba(255,255,255,0.04) 0%, transparent 32%)",
                    backgroundSize: "26px 26px, 32px 32px"
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-black/30 text-sm font-semibold uppercase tracking-wide text-ink shadow-inner-glow"
                  >
                    {card.avatar}
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-ink md:text-lg">{card.title}</p>
                    <p className="text-sm text-text-muted">{card.subtitle}</p>
                  </div>
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-text-soft">
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  className="relative mt-4 inline-flex text-sm font-semibold text-clay underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-clay"
                >
                  {card.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}

type PeopleCard = {
  avatar: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  href: Route | UrlObject;
};

const peopleCards: PeopleCard[] = [
  {
    avatar: "S",
    title: "SOUR",
    subtitle: "Mixed-use infill partner",
    body: "“Cocoon doubled the number of zoning-ready options we could share without adding to meeting load.”",
    cta: "Read story",
    href: { pathname: "/customers/[slug]", query: { slug: "sour" } }
  },
  {
    avatar: "C",
    title: "Civiliti",
    subtitle: "Civic realm partner",
    body: "“Workshops now start with aligned constraints so we can spend time on better public-realm moves.”",
    cta: "Read story",
    href: { pathname: "/customers/[slug]", query: { slug: "civiliti" } }
  },
  {
    avatar: "SL",
    title: "Sid Lee Architecture",
    subtitle: "Cultural venues & urban sites",
    body: "“Cocoon keeps ambitious concepts tied to the rules that make approvals smooth.”",
    cta: "Read story",
    href: { pathname: "/customers/[slug]", query: { slug: "sid-lee-architecture" } }
  },
  {
    avatar: "RM",
    title: "Rashid Mushkani",
    subtitle: "CEO, PhD AI & Design",
    body: "5+ years in design and architectural leadership, 7+ years in AI/ML. Rashid guides how Cocoon blends practice needs with trustworthy AI.",
    cta: "About",
    href: "/contact"
  },
  {
    avatar: "HB",
    title: "Hugo Berard",
    subtitle: "CTO, PhD AI",
    body: "10+ years building AI systems and software products. Hugo leads the platform that powers Cocoon’s fast, grounded suggestions.",
    cta: "About",
    href: "/contact"
  },
  {
    avatar: "SK",
    title: "Shin Koseki",
    subtitle: "CFO, PhD Urban Design",
    body: "10+ years leading financial strategy, operations, and grant management. Shin ensures pilots and partners get the support they need.",
    cta: "About",
    href: "/contact"
  }
];
