"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const agents = [
  {
    name: "Zoning check",
    role: "Agent",
    color: "from-accent-blue to-indigo-500",
    highlighted: true
  },
  {
    name: "Program balancer",
    role: "Agent",
    color: "from-emerald-400 to-teal-500",
    highlighted: false
  },
  {
    name: "Transit access scan",
    role: "Agent",
    color: "from-amber-300 to-orange-500",
    highlighted: false
  }
];

export function AiAssistSection() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 36, filter: "blur(6px)" };
  const whileInView = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.12),transparent_40%),linear-gradient(160deg,rgba(255,255,255,0.03),transparent_45%)]" />

      <div className="container-x relative flex flex-col items-center text-center">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-soft">
            <span className="h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
            Artificial intelligence
          </span>

          <div className="space-y-3">
            <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl">
              AI-assisted design operations
            </h2>
            <p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-text-soft md:text-lg">
              Give every project a set of tireless assistants. Cocoon’s agents pull zoning, past studies, and site intelligence into the flow of your work—without taking control away from the team.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/contact"
              className="btn-primary px-7 py-3 text-base font-semibold shadow-[0_18px_60px_rgba(0,0,0,0.55),_0_0_0_1px_rgba(255,255,255,0.12)] hover:-translate-y-[3px]"
            >
              Learn more
            </Link>
          </div>
        </div>

        <motion.div
          className="relative mt-12 w-full max-w-3xl"
          initial={initial}
          whileInView={whileInView}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          style={{
            transform: prefersReducedMotion
              ? undefined
              : "perspective(1600px) rotateX(10deg) rotateY(-8deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="absolute inset-[-18%] -z-10 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.06),transparent_45%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-[0_28px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <p className="text-left text-sm font-semibold uppercase tracking-[0.16em] text-text-soft">
                Assign to…
              </p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Agents
              </span>
            </div>

            <div className="space-y-2 px-4 py-3">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-3.5 text-left transition-colors duration-200 ${
                    agent.highlighted
                      ? "bg-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                      : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${agent.color} text-sm font-semibold text-bg shadow-[0_12px_35px_rgba(0,0,0,0.4)]`}
                    >
                      {agent.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{agent.name}</p>
                      <p className="text-xs text-text-muted">Keeps your project in sync</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-soft">
                      {agent.role}
                    </span>
                    {agent.highlighted && (
                      <span
                        aria-hidden
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-accent-emerald/20 text-accent-emerald"
                      >
                        <svg
                          aria-hidden
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          className="h-3.5 w-3.5"
                        >
                          <path d="M5 10.5 8.5 14l6.5-8" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-10 text-left md:mt-16 md:grid-cols-2 md:gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              Self-updating project operations
            </h3>
            <p className="text-base leading-relaxed text-text-soft">
              Agents keep briefs, assumptions, and zoning checks synchronized across every project. When a regulation changes or a stakeholder adds constraints, the operating picture refreshes without losing the original context.
            </p>
            <p className="text-base leading-relaxed text-text-soft">
              Use the panel to assign checks to sites, then let your team review suggestions that remain auditable and editable.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              Built for architecture tools
            </h3>
            <p className="text-base leading-relaxed text-text-soft">
              Cocoon integrates with BIM and CAD environments so the same assistants can read your Revit sheets, coordinate with AutoCAD sets, and surface risks directly in your workflow.
            </p>
            <p className="text-base leading-relaxed text-text-soft">
              As your models evolve, the agents stay aware of changes in floor areas, adjacencies, or transit access—keeping the operations layer aligned with the live design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
