import type { ReactNode } from "react";
import Link from "next/link";

import { ArchitecturalShell } from "./ArchitecturalShell";
import {
  dossierModules,
  liveChecks,
  portfolioProjects,
  workspaceNavItems
} from "./data";
import { StudioIcon } from "./icons";

const studyTabs = ["Site", "Cost", "Carbon", "Code", "Visuals"] as const;

export function ArchitecturalWorkspacePage() {
  return (
    <ArchitecturalShell
      navItems={workspaceNavItems}
      ctaLabel="Request Access"
      ctaHref="/contact"
      footerMode="compact"
    >
      <section id="overview" className="pb-16 pt-6 md:pb-20">
        <div className="studio-container">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end">
            <div>
              <p className="editorial-kicker mb-5">Workspace preview</p>
              <h1 className="max-w-5xl font-display text-[3.3rem] leading-[0.95] tracking-[-0.05em] text-studio-ink sm:text-[4.5rem] md:text-[5.6rem]">
                A calm interface
                <br />
                for early-stage proof.
              </h1>
            </div>
            <div className="max-w-sm justify-self-end text-sm leading-7 text-studio-muted">
              This is where Cocoon turns briefs, constraints, and architectural
              judgment into a living study record instead of a pile of detached
              exports.
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Active studies" value="12" detail="Across housing, civic, and retrofit programs." />
            <SummaryCard label="Compliance confidence" value="92%" detail="Based on current site and zoning evidence." />
            <SummaryCard label="Avg. decision cycle" value="2.4 days" detail="From first upload to aligned preferred option." />
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="studio-container">
          <ScreenFrame
            eyebrow="Screen 01"
            title="Portfolio command"
            subtitle="A studio-wide view of active opportunities, where every study keeps its latest lens signals visible."
          >
            <div className="grid gap-5 xl:grid-cols-[15rem_minmax(0,1fr)_20rem]">
              <aside className="rounded-[1.5rem] bg-studio-low p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                  Studio rail
                </p>
                <div className="mt-6 space-y-2">
                  {["Portfolio", "Sites", "Studies", "Dossiers", "Exports"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={[
                          "rounded-[1rem] px-4 py-3 text-sm",
                          index === 0
                            ? "bg-studio-background text-studio-ink"
                            : "text-studio-muted"
                        ].join(" ")}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </aside>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-[1.4rem] bg-studio-low p-5">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                      Active studies
                    </p>
                    <p className="mt-2 font-display text-3xl italic text-studio-ink">
                      Architectural portfolio
                    </p>
                  </div>
                  <div className="rounded-full bg-studio-background px-4 py-2 text-xs text-studio-primary">
                    Synced every 6 min
                  </div>
                </div>

                <div className="space-y-3">
                  {portfolioProjects.map((project) => (
                    <div
                      key={project.name}
                      className="grid gap-4 rounded-[1.35rem] bg-studio-low p-5 md:grid-cols-[minmax(0,1fr)_11rem_11rem]"
                    >
                      <div>
                        <p className="text-lg font-semibold tracking-[-0.02em] text-studio-ink">
                          {project.name}
                        </p>
                        <p className="mt-2 text-sm text-studio-muted">{project.stage}</p>
                      </div>
                      <div className="rounded-[1rem] bg-studio-background px-4 py-3">
                        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
                          Team
                        </p>
                        <p className="mt-2 text-sm font-semibold text-studio-ink">
                          {project.team}
                        </p>
                      </div>
                      <div className="rounded-[1rem] bg-studio-background px-4 py-3">
                        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
                          Signal
                        </p>
                        <p className="mt-2 text-sm font-semibold text-studio-ink">
                          {project.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.4rem] bg-studio-low p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                    Submission queue
                  </p>
                  <div className="mt-4 space-y-3">
                    <QueueItem label="Westmount Civic Block" status="Export ready" />
                    <QueueItem label="Harbour Infill Housing" status="Awaiting client review" />
                    <QueueItem label="Monk Street Retrofit" status="Carbon revisions" />
                  </div>
                </div>

                <div className="rounded-[1.4rem] bg-studio-primary p-5 text-studio-lowest">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-lowest/70">
                    Curatorial note
                  </p>
                  <p className="mt-3 font-display text-3xl leading-tight tracking-[-0.04em]">
                    Two schemes are commercially strong. One is also planning
                    quiet.
                  </p>
                </div>
              </div>
            </div>
          </ScreenFrame>
        </div>
      </section>

      <section id="studies" className="bg-studio-low py-16 md:py-20">
        <div className="studio-container">
          <ScreenFrame
            eyebrow="Screen 02"
            title="Massing review"
            subtitle="A working canvas where site context, live lens checks, and architectural judgment stay in the same field."
            inset
          >
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="rounded-[1.5rem] bg-studio-background p-5 shadow-studio">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {studyTabs.map((tab, index) => (
                    <span
                      key={tab}
                      className={[
                        "rounded-full px-4 py-2 text-xs tracking-[0.08em]",
                        index === 0
                          ? "bg-studio-primary text-studio-lowest"
                          : "bg-studio-low text-studio-muted"
                      ].join(" ")}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="relative min-h-[28rem] overflow-hidden rounded-[1.4rem] bg-studio-low">
                    <div className="absolute inset-0 studio-grid opacity-45" />
                    <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]" />
                    <div className="absolute left-[16%] top-[20%] h-36 w-24 rounded-[1rem] bg-[#d5dcd7]" />
                    <div className="absolute left-[40%] top-[14%] h-48 w-32 rounded-[1.25rem] bg-[#cbd3cd]" />
                    <div className="absolute left-[67%] top-[24%] h-28 w-16 rounded-[1rem] bg-[#dee4df]" />
                    <div className="absolute bottom-[16%] left-[12%] right-[10%] h-16 rounded-[1.2rem] bg-[#e8ece8]" />
                    <div className="absolute bottom-[20%] left-[20%] h-10 w-10 rounded-full bg-[#dce5dc]" />
                    <div className="absolute left-5 top-5 rounded-full bg-studio-background/85 px-4 py-2 text-xs text-studio-primary">
                      Lot depth / access / context
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.35rem] bg-studio-low p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                        Live zoning check
                      </p>
                      <div className="mt-5 space-y-3">
                        {liveChecks.map((check) => (
                          <div
                            key={check.label}
                            className="flex items-center justify-between gap-4 text-sm"
                          >
                            <span className="text-studio-ink">{check.label}</span>
                            <StatusPill tone={check.tone}>{check.value}</StatusPill>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.35rem] bg-studio-low p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                        Yield vs baseline
                      </p>
                      <div className="mt-5 flex items-end gap-5">
                        <MetricBar label="Base" height="h-24" tone="bg-studio-line/65" />
                        <MetricBar label="A" height="h-32" tone="bg-[#7bb59f]" />
                        <MetricBar label="B" height="h-28" tone="bg-[#c7d7cb]" />
                      </div>
                      <p className="mt-4 text-sm text-studio-muted">
                        Scheme A improves usable area by 14% while retaining
                        daylight targets.
                      </p>
                    </div>

                    <div className="rounded-[1.35rem] bg-studio-primary p-5 text-studio-lowest">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-lowest/70">
                        Studio note
                      </p>
                      <p className="mt-3 font-display text-[2rem] leading-tight tracking-[-0.04em]">
                        Pull parking below grade only if the civic frontage
                        remains generous.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <PanelNote
                  title="Design brief"
                  body="Seven-storey mixed-use housing with a porous courtyard and low-carbon structural ambition."
                />
                <PanelNote
                  title="Key constraints"
                  body="Rear setback pressure, east daylight corridor, and a parking ratio that needs careful moderation."
                />
                <PanelNote
                  title="Current guidance"
                  body="Keep the courtyard legible from the street while shifting mass toward the north-west corner."
                />
              </aside>
            </div>
          </ScreenFrame>
        </div>
      </section>

      <section id="handover" className="py-16 md:py-20">
        <div className="studio-container">
          <ScreenFrame
            eyebrow="Screen 03"
            title="Technical dossier"
            subtitle="Once a direction is chosen, Cocoon organizes geometry, rationale, and evidence into a package others can actually use."
          >
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="rounded-[1.5rem] bg-studio-low p-5">
                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.35rem] bg-studio-lowest p-6 shadow-studio">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                          Handover pack
                        </p>
                        <p className="mt-2 font-display text-3xl italic text-studio-ink">
                          Harbour Infill Housing
                        </p>
                      </div>
                      <div className="rounded-full bg-studio-low px-4 py-2 text-xs text-studio-primary">
                        Revision 07
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {dossierModules.map((module) => (
                        <div
                          key={module.title}
                          className="rounded-[1rem] bg-studio-low px-4 py-4"
                        >
                          <p className="text-sm font-semibold text-studio-ink">
                            {module.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-studio-muted">
                            {module.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.35rem] bg-studio-lowest p-5 shadow-studio">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                        Export kit
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {["Rhino", "Revit", "IFC", "PDF", "PNG sheets"].map((item) => (
                          <span key={item} className="blueprint-chip bg-studio-low">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.35rem] bg-studio-lowest p-5 shadow-studio">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
                        Ready for
                      </p>
                      <div className="mt-4 space-y-3">
                        <ChecklistItem>Client review meeting</ChecklistItem>
                        <ChecklistItem>Planning pre-consultation</ChecklistItem>
                        <ChecklistItem>Consultant coordination</ChecklistItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <PanelNote
                  title="Why this matters"
                  body="The handoff preserves reasoning, not only geometry, which means the next reviewer inherits architectural context instead of guesswork."
                />
                <PanelNote
                  title="Security posture"
                  body="This public route is a static product preview. No user data, credentials, or private project content are embedded in the page."
                />
              </aside>
            </div>
          </ScreenFrame>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="studio-container">
          <div className="rounded-[1.8rem] bg-studio-inset p-8 text-center md:p-12">
            <p className="editorial-kicker mb-4">Next step</p>
            <h2 className="font-display text-5xl leading-tight tracking-[-0.04em] text-studio-ink md:text-6xl">
              Bring a live site into the workspace.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-studio-muted md:text-base">
              We onboard teams against real constraints so the study screens and
              handoff packages reflect actual practice instead of demo theater.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="studio-primary-button px-8">
                Request studio onboarding
              </Link>
              <Link href="/resources" className="studio-secondary-button px-8">
                Review the monograph
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ArchitecturalShell>
  );
}

function ScreenFrame({
  eyebrow,
  title,
  subtitle,
  children,
  inset = false
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  inset?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-[2rem] p-6 md:p-8",
        inset ? "bg-studio-background" : "bg-studio-inset"
      ].join(" ")}
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-studio-muted">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight tracking-[-0.04em] text-studio-ink md:text-5xl">
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-studio-muted">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.4rem] bg-studio-inset p-5">
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-studio-muted">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl italic tracking-[-0.04em] text-studio-ink">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-studio-muted">{detail}</p>
    </div>
  );
}

function QueueItem({ label, status }: { label: string; status: string }) {
  return (
    <div className="rounded-[1rem] bg-studio-background px-4 py-3">
      <p className="text-sm font-semibold text-studio-ink">{label}</p>
      <p className="mt-2 text-xs text-studio-muted">{status}</p>
    </div>
  );
}

function StatusPill({
  tone,
  children
}: {
  tone: "success" | "caution";
  children: ReactNode;
}) {
  const toneClass =
    tone === "success"
      ? "bg-[#d9ebe0] text-studio-success"
      : "bg-[#eadfcf] text-studio-caution";

  return <span className={`rounded-full px-3 py-1 ${toneClass}`}>{children}</span>;
}

function MetricBar({
  label,
  height,
  tone
}: {
  label: string;
  height: string;
  tone: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`w-14 rounded-t-[0.8rem] ${tone} ${height}`} />
      <span className="text-xs uppercase tracking-[0.18em] text-studio-muted">
        {label}
      </span>
    </div>
  );
}

function PanelNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.35rem] bg-studio-inset p-5">
      <div className="mb-4 rounded-full bg-studio-background p-3 text-studio-primary w-fit">
        <StudioIcon name="stack" className="h-4 w-4" />
      </div>
      <p className="text-sm font-semibold tracking-[-0.02em] text-studio-ink">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-studio-muted">{body}</p>
    </div>
  );
}

function ChecklistItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-[1rem] bg-studio-low px-4 py-3">
      <div className="mt-0.5 rounded-full bg-studio-high p-1 text-studio-primary">
        <StudioIcon name="spark" className="h-3.5 w-3.5" />
      </div>
      <p className="text-sm text-studio-ink">{children}</p>
    </div>
  );
}
