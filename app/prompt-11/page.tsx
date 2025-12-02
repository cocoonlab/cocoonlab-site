"use client";

import { LayoutShell } from "@/components/layout/LayoutShell";
import type { KeyboardEvent, PointerEvent } from "react";
import { useMemo, useRef, useState } from "react";

const integrations = [
  {
    name: "Revit",
    description: "Sync sheets and issue IDs while keeping decisions traceable.",
    accent: "from-blue-400/40 to-indigo-400/20"
  },
  {
    name: "AutoCAD",
    description: "Attach comments to DWGs without changing the source file.",
    accent: "from-cyan-400/40 to-sky-300/10"
  },
  {
    name: "Rhino / Grasshopper",
    description: "Capture geometry options and approvals alongside scripts.",
    accent: "from-emerald-400/35 to-lime-300/10"
  },
  {
    name: "BIM 360",
    description: "Mirror issues and submittals into Cocoon’s shared thread.",
    accent: "from-amber-400/35 to-orange-300/10"
  },
  {
    name: "Notion",
    description: "Pull briefs, decisions, and meeting notes into one feed.",
    accent: "from-fuchsia-400/35 to-purple-300/10"
  },
  {
    name: "Slack",
    description: "Send channel updates and reply without leaving your stack.",
    accent: "from-rose-400/35 to-pink-300/10"
  }
];

const carouselItems = [
  {
    label: "Build better zoning briefs",
    content: "Draft zoning narratives with site assumptions, then tie them to the drawings and approvals that evolve them.",
    color: "from-blue-500/20 via-indigo-500/10 to-transparent"
  },
  {
    label: "Automate code checks",
    content: "Use saved rulesets to flag FAR, egress, or accessibility risks early—before they reach consultants.",
    color: "from-emerald-500/20 via-teal-400/10 to-transparent"
  },
  {
    label: "Move every stakeholder into one view",
    content: "Invite owners, consultants, and fabricators to a shared record of decisions with context from your source tools.",
    color: "from-amber-500/20 via-orange-400/10 to-transparent"
  },
  {
    label: "Turn project history into a knowledge graph",
    content: "Link RFIs, markups, and approvals to reusable patterns so future projects inherit what your team already learned.",
    color: "from-pink-500/20 via-rose-400/10 to-transparent"
  }
];

function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ isDragging: false, startX: 0, scrollLeft: 0, pointerId: 0 });

  const onPointerDown = (event: PointerEvent<T>) => {
    if (!ref.current) return;
    state.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: ref.current.scrollLeft,
      pointerId: event.pointerId
    };
    ref.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<T>) => {
    if (!ref.current || !state.current.isDragging) return;
    const deltaX = event.clientX - state.current.startX;
    ref.current.scrollLeft = state.current.scrollLeft - deltaX;
  };

  const endDrag = (event: PointerEvent<T>) => {
    if (!ref.current || !state.current.isDragging) return;
    state.current.isDragging = false;
    if (ref.current.hasPointerCapture(state.current.pointerId)) {
      ref.current.releasePointerCapture(state.current.pointerId);
    }
  };

  return { ref, onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerLeave: endDrag } as const;
}

export default function PromptElevenPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const integrationScroll = useDragScroll<HTMLDivElement>();
  const pillScroll = useDragScroll<HTMLDivElement>();
  const tabPanelId = "workflow-tabpanel";
  const getTabId = (index: number) => `workflow-tab-${index}`;

  const activeItem = useMemo(() => carouselItems[activeIndex], [activeIndex]);

  const scrollByAmount = (node: HTMLDivElement | null, direction: "left" | "right") => {
    if (!node) return;
    const offset = node.clientWidth * 0.7 * (direction === "left" ? -1 : 1);
    node.scrollBy({ left: offset, behavior: "smooth" });
  };

  const changeActive = (direction: "left" | "right") => {
    const delta = direction === "right" ? 1 : -1;
    const nextIndex = (activeIndex + delta + carouselItems.length) % carouselItems.length;
    setActiveIndex(nextIndex);
    const buttons = pillScroll.ref.current?.querySelectorAll<HTMLButtonElement>("button[role='tab']");
    const target = buttons?.[nextIndex];
    target?.focus();
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handlePillKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + carouselItems.length) % carouselItems.length;
    setActiveIndex(nextIndex);
    const buttons = pillScroll.ref.current?.querySelectorAll<HTMLButtonElement>("button[role='tab']");
    buttons?.[nextIndex]?.focus();
  };

  return (
    <LayoutShell>
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101021] via-[#0b0b17] to-[#06060d]" />
        <div className="absolute inset-x-0 top-12 h-72 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.16),transparent_50%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.14),transparent_55%)] blur-3xl" />
        <div className="relative container-x space-y-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Workflows and integrations</p>
              <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                Collaborate across tools and teams
              </h1>
              <p className="max-w-xl text-lg text-text-soft">
                Connect Cocoon to the tools your team already uses—BIM, CAD, and collaboration platforms—so decisions stay traceable even when files live elsewhere.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Integrations</p>
              <div
                className="integration-scroll mt-4 flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory touch-pan-x"
                ref={integrationScroll.ref}
                onPointerDown={integrationScroll.onPointerDown}
                onPointerMove={integrationScroll.onPointerMove}
                onPointerUp={integrationScroll.onPointerUp}
                onPointerLeave={integrationScroll.onPointerLeave}
              >
                <style>{`.integration-scroll::-webkit-scrollbar{display:none}`}</style>
                {integrations.map((integration, index) => (
                  <article
                    key={integration.name}
                    className="integration-scroll relative min-w-[220px] flex-1 snap-start rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/0 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_22px_80px_rgba(0,0,0,0.5)]"
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${integration.accent}`} />
                    <div className="relative space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/30 text-sm font-bold text-white/80">
                          {integration.name.charAt(0)}
                        </div>
                        <div className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                          {index < 3 ? "Native" : "Webhook"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-white">{integration.name}</p>
                        <p className="text-sm text-text-soft">{integration.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/0" />
            <div className="relative space-y-6">
              <div className="flex flex-col gap-4">
                <div
                  className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70"
                  role="group"
                  aria-label="Workflow highlights"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">↺</span>
                  What you can do
                </div>
                <div
                  className="pill-scroll flex gap-3 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory touch-pan-x"
                  ref={pillScroll.ref}
                  onPointerDown={pillScroll.onPointerDown}
                  onPointerMove={pillScroll.onPointerMove}
                  onPointerUp={pillScroll.onPointerUp}
                  onPointerLeave={pillScroll.onPointerLeave}
                  onKeyDown={handlePillKeyDown}
                  role="tablist"
                  aria-label="Workflow carousel"
                >
                  <style>{`.pill-scroll::-webkit-scrollbar{display:none}`}</style>
                  {carouselItems.map((item, index) => (
                    <button
                      key={item.label}
                      className={`pill-scroll snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        index === activeIndex
                          ? "border-white/70 bg-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                          : "border-white/15 bg-white/5 text-text-soft hover:-translate-y-[1px] hover:border-white/30 hover:text-white"
                      }`}
                      onClick={() => setActiveIndex(index)}
                      role="tab"
                      id={getTabId(index)}
                      aria-controls={tabPanelId}
                      aria-selected={index === activeIndex}
                      tabIndex={index === activeIndex ? 0 : -1}
                    >
                      <span className="inline-flex items-center gap-2">
                        {index === activeIndex ? <span aria-hidden>➜</span> : <span aria-hidden>•</span>}
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:-translate-y-[1px] hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    onClick={() => {
                      changeActive("left");
                      scrollByAmount(pillScroll.ref.current, "left");
                    }}
                    aria-label="Scroll carousel left"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:-translate-y-[1px] hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    onClick={() => {
                      changeActive("right");
                      scrollByAmount(pillScroll.ref.current, "right");
                    }}
                    aria-label="Scroll carousel right"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                id={tabPanelId}
                role="tabpanel"
                aria-labelledby={getTabId(activeIndex)}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.5)]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activeItem.color} blur-3xl`} />
                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    {activeItem.label}
                  </div>
                  <p className="text-lg font-semibold text-white">{activeItem.label}</p>
                  <p className="text-base text-text-soft">{activeItem.content}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {integrations.slice(0, 3).map(integration => (
                      <div
                        key={integration.name}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-semibold uppercase tracking-[0.14em]">
                          {integration.name.slice(0, 2)}
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-semibold">{integration.name}</p>
                          <p className="text-text-soft">Sync updates into this flow</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
