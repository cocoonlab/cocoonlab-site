"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { cn } from "@/lib/utils";

const segments = [
  { label: "Site study", width: "18%" },
  { label: "Concept design", width: "22%" },
  { label: "Community feedback", width: "20%" },
  { label: "Permitting & codes", width: "20%" },
  { label: "Execution handoff", width: "16%" }
];

const milestones = [
  { label: "Client review", left: "22%", color: "from-green-200/90 to-emerald-400/80" },
  { label: "City meeting", left: "58%", color: "from-amber-200/90 to-orange-400/80" },
  { label: "Budget gate", left: "82%", color: "from-sky-200/90 to-blue-400/80" }
];

const dateTicks = [
  { label: "APR 3", left: "6%" },
  { label: "MAY 18", left: "36%" },
  { label: "JUN 27", left: "68%" },
  { label: "AUG 12", left: "94%" }
];

export default function PlanningHeroPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <LayoutShell>
      <section className="relative overflow-hidden section-pad">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.18) 0, transparent 32%), radial-gradient(circle at 72% 40%, rgba(45, 212, 191, 0.14) 0, transparent 35%), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "240px 240px, 320px 320px, 80px 80px, 80px 80px"
          }}
        />
        <div className="container-x relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-teal-100 shadow-lg shadow-emerald-500/10 backdrop-blur">
              Project and long-term planning
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                Set the direction for every site.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
                See studies, design options, and approvals on one shared timeline. Cocoon keeps your long-term plan in view—from first sketch to city sign-off.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-emerald-500/10 backdrop-blur">
                <p className="text-sm font-medium text-teal-100">Manage projects end-to-end</p>
                <div className="mt-3 space-y-2 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/70 to-slate-800/40 p-3">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Mixed-use campus</span>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] text-emerald-200">On track</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400" />
                  </div>
                  <div className="flex gap-2 text-[11px] text-text-muted">
                    <span className="rounded-full bg-white/5 px-2 py-0.5">Site study</span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5">Codes & zoning</span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5">Stakeholders</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-indigo-500/10 backdrop-blur">
                <p className="text-sm font-medium text-indigo-100">Project updates</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-100">On track</span>
                  <span className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-100">At risk – zoning</span>
                  <span className="rounded-full bg-sky-400/15 px-3 py-1 text-sky-100">Client review Friday</span>
                  <span className="rounded-full bg-pink-400/15 px-3 py-1 text-pink-100">Community brief due</span>
                </div>
                <div className="mt-3 rounded-xl border border-white/5 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-sky-400/15 px-4 py-3 text-sm text-white">
                  New study package shared — invite city planning review and sync handoff with delivery partner.
                </div>
              </div>
            </div>
          </div>

          <div className="relative" ref={containerRef}>
            <div className="pointer-events-none absolute inset-0 translate-x-8 scale-110 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-indigo-400/10 blur-3xl" />
            <div className="relative overflow-visible">
              <div className="absolute -top-4 left-2 right-10 h-6 opacity-60">
                {dateTicks.map(tick => (
                  <span
                    key={tick.label}
                    className="absolute -translate-x-1/2 text-[11px] font-semibold text-white/70"
                    style={{ left: tick.left }}
                  >
                    {tick.label}
                  </span>
                ))}
              </div>
              <div className="relative mt-10 h-44 w-[115%] max-w-[720px] origin-left rotate-[-9deg] rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10 backdrop-blur lg:ml-auto">
                <div className="absolute inset-x-10 -top-6 h-16 bg-gradient-to-r from-white/10 via-white/0 to-transparent blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-full">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:60px_1px] opacity-20" />
                </div>

                <div className="absolute inset-x-6 top-8 space-y-3">
                  {segments.map((segment, index) => (
                    <div
                      key={segment.label}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-3 py-2 shadow-lg shadow-black/20 transition-all duration-700",
                        visible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                      )}
                      style={{
                        width: segment.width,
                        transitionDelay: `${index * 120}ms`
                      }}
                    >
                      <span className="h-2 w-2 rotate-45 rounded-[3px] bg-gradient-to-br from-emerald-300 to-cyan-400" />
                      <span className="text-xs font-medium text-white">{segment.label}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <span className="h-[3px] w-12 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300" />
                        <span className="h-1 w-1 rotate-45 rounded-sm bg-white/80" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-x-0 top-0 h-full">
                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.label}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-8 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-black/30",
                        "bg-gradient-to-r",
                        milestone.color,
                        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      )}
                      style={{
                        left: milestone.left,
                        transition: "all 0.6s ease",
                        transitionDelay: `${index * 150 + 200}ms`
                      }}
                    >
                      {milestone.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
