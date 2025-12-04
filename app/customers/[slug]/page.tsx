import Link from "next/link";
import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import type { UrlObject } from "url";

import { LayoutShell } from "@/components/layout/LayoutShell";

const caseStudies = {
  sour: {
    name: "SOUR",
    headline: "SOUR doubles design iterations on a tight infill site.",
    summary: [
      "SOUR was asked to reimagine a constrained mixed-use parcel tucked between existing brick party walls. Tight setbacks, a patchwork of easements, and an ambitious program meant every meter of floor area mattered.",
      "By building a Project Brain in Cocoon, the team centralized zoning rules, site photos, and client guardrails. AI-suggested moves gave SOUR viable massing paths without breaking daylight or floor-area limits, letting the studio focus reviews on the best-performing ideas."
    ],
    metadata: [
      { label: "Company", value: "SOUR" },
      { label: "Project type", value: "Mixed-use infill, Montréal" },
      { label: "Cocoon since", value: "2024" }
    ],
    storySections: [
      {
        title: "Before Cocoon",
        body: "Sketchbook notes lived beside zoning spreadsheets, while consultants emailed new interpretations every few days. The team spent hours reconciling updates before each internal review."
      },
      {
        title: "Setting up a Project Brain",
        body: "SOUR ingested the brief, setback tables, and annotated site photos into Cocoon. The workspace became the single reference for massing studies, letting the team tag options by viability and program mix."
      },
      {
        title: "AI-suggested massing moves",
        body: "Cocoon proposed podium and mid-rise blends that respected shadow envelopes, then simulated unit stacking to keep circulation efficient. Each suggestion came with rationale tied back to the uploaded bylaws."
      },
      {
        title: "Measured outcomes",
        body: "First zoning-read options landed 70% faster, aligning with the team’s target from earlier pilots. Internal rework dropped by roughly 8 hours per milestone because decisions stayed linked to a single source of truth."
      },
      {
        title: "Client-ready iterations",
        body: "By week two, SOUR had double the viable iterations ready for client review, each annotated with compliance notes and estimated program splits, making approvals smoother."
      }
    ],
    gradient: "from-[#7C67FF] via-[#5EEAD4] to-[#22D3EE]"
  },
  civiliti: {
    name: "Civiliti",
    headline: "Civiliti aligns public-realm partners around one living brief.",
    summary: [
      "Civiliti coordinates landscape and civic projects with multiple agencies. With Cocoon, policy PDFs, utility constraints, and stakeholder notes sit in one AI-searchable layer so workshops stay focused on the next decision, not on chasing references.",
      "Scenario plans now carry inline feasibility notes, letting the studio share trade-offs early and keep city partners aligned without adding another meeting."
    ],
    metadata: [
      { label: "Company", value: "Civiliti" },
      { label: "Project type", value: "Civic realm & landscape" },
      { label: "Cocoon since", value: "2023" }
    ],
    storySections: [
      {
        title: "Before Cocoon",
        body: "Landscape, transportation, and engineering inputs lived in separate drives. Every workshop started with a recap instead of new ideas."
      },
      {
        title: "One shared source",
        body: "Civiliti built a Project Brain that connected precedent imagery, utility constraints, and partner comments. Queries like ‘options that keep tree canopy above 40%’ returned ready-to-sketch prompts."
      },
      {
        title: "AI-backed scenarios",
        body: "Cocoon suggested phased public-realm moves that respected staging limits and budget envelopes, while flagging risks inline for agency review."
      },
      {
        title: "Outcomes",
        body: "Teams recovered dozens of coordination hours each month and arrived at sign-off meetings with fewer surprises because everyone worked from the same annotated plan."
      }
    ],
    gradient: "from-[#22D3EE] via-[#9F7AEA] to-[#34D399]"
  },
  "sid-lee-architecture": {
    name: "Sid Lee Architecture",
    headline: "Sid Lee Architecture keeps creative work grounded in constraints.",
    summary: [
      "For a cultural venue expansion, Sid Lee Architecture balanced bold form with tight urban guidelines. Cocoon kept the brief, acoustic criteria, and neighbour views in one place so the team could test daring moves without losing compliance.",
      "AI-assisted massing checks surfaced daylight and frontage impacts while designers explored, letting leadership green-light options with confidence."
    ],
    metadata: [
      { label: "Company", value: "Sid Lee Architecture" },
      { label: "Project type", value: "Cultural venue, urban infill" },
      { label: "Cocoon since", value: "2024" }
    ],
    storySections: [
      {
        title: "Before Cocoon",
        body: "Creative directions were tested offline, then reworked when constraints reappeared. Reviews slowed while teams reconciled which file was current."
      },
      {
        title: "Project Brain setup",
        body: "The studio collected acoustic benchmarks, facade guidance, and neighbour sightline studies into Cocoon, turning them into prompts for AI-assisted moves."
      },
      {
        title: "AI guardrails while sketching",
        body: "As designers iterated, Cocoon called out sightline conflicts and frontage ratios, keeping ideas ambitious yet approvable."
      },
      {
        title: "Measured impact",
        body: "Leadership saw twice as many options ready for pin-up with compliance notes attached, and reduced back-and-forth with consultants by summarizing decisions inside the workspace."
      }
    ],
    gradient: "from-[#F59E0B] via-[#7C67FF] to-[#22D3EE]"
  }
} as const;

export const caseStudySlugs = Object.keys(caseStudies);

type CaseStudy = (typeof caseStudies)[keyof typeof caseStudies];

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
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
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
                <div className="rounded-full border border-white/30 bg-white/15 px-6 py-3 text-lg font-semibold uppercase tracking-[0.28em] text-white shadow-lg">
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
                <p className="text-base font-medium text-white md:text-lg">{item.value}</p>
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
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Meet the teams behind Cocoon and our partners
              </h2>
              <p className="text-sm leading-relaxed text-text-soft md:text-base">
                Leaders from SOUR, Civiliti, and Sid Lee Architecture pair their creative intuition with Cocoon’s AI guardrails. Our leadership builds the rails that keep every iteration grounded.
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start text-sm font-semibold text-accent-blue underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-accent-blue"
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
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-black/30 text-sm font-semibold uppercase tracking-wide text-white shadow-inner-glow"
                  >
                    {card.avatar}
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white md:text-lg">{card.title}</p>
                    <p className="text-sm text-text-muted">{card.subtitle}</p>
                  </div>
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-text-soft">
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  className="relative mt-4 inline-flex text-sm font-semibold text-accent-blue underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-accent-blue"
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
