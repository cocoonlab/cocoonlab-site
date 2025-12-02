import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface IssueCardProps {
  title: string;
  priority: string;
  tags: string[];
  stats: { label: string; value: string }[];
  assignees: { name: string; color: string }[];
}

interface IssueTrackingHeroProps {
  eyebrow: string;
  headline: ReactNode;
  description: string;
  primaryCard: IssueCardProps;
  backgroundCards?: IssueCardProps[];
}

export function IssueTrackingHero({
  eyebrow,
  headline,
  description,
  primaryCard,
  backgroundCards = []
}: IssueTrackingHeroProps) {
  return (
    <section className="section-pad overflow-hidden">
      <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_minmax(0,1.05fr)] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-soft">
              {eyebrow}
            </span>
            <h1 className="text-balance text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
              {headline}
            </h1>
            <p className="max-w-2xl text-lg text-text-soft">{description}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.2),transparent_38%),radial-gradient(circle_at_40%_70%,rgba(16,185,129,0.24),transparent_42%)] blur-3xl" />
          <div className="relative w-full max-w-[620px] lg:ml-auto">
            <div className="group relative">
              {backgroundCards.map((card, index) => (
                <motion.div
                  key={card.title + index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 0.22, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.25, 0.6, 0.3, 1] }}
                  className={`absolute left-1/2 top-1/2 h-[220px] w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/5 bg-white/5 blur-[1px] transition duration-500 group-hover:scale-[1.01] group-hover:blur-[2px] group-hover:opacity-25 ${
                    index % 2 === 0
                      ? "rotate-2 group-hover:translate-y-2"
                      : "-rotate-2 group-hover:-translate-y-2"
                  }`}
                >
                  <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.14em] text-white/30">
                    {card.title}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.6, 0.3, 1] }}
                className="relative rotate-[-3deg] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/15 via-white/8 to-white/0 p-1 shadow-[0_30px_140px_rgba(0,0,0,0.55)] backdrop-blur transition duration-500 group-hover:-translate-y-3 group-hover:rotate-[-1deg] group-hover:shadow-[0_42px_160px_rgba(0,0,0,0.65)]"
              >
                <div className="rounded-[22px] border border-white/10 bg-gradient-to-br from-bg/90 via-bg/80 to-bg-alt/70 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Issue</p>
                      <p className="text-2xl font-semibold text-white">{primaryCard.title}</p>
                    </div>
                    <span className="rounded-full border border-white/15 bg-gradient-to-r from-amber-400/20 via-amber-300/15 to-amber-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
                      {primaryCard.priority}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-text-soft">
                    {primaryCard.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_minmax(0,1fr)]">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Assignees</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {primaryCard.assignees.map(person => (
                          <div
                            key={person.name}
                            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white"
                          >
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-bg"
                              style={{ backgroundColor: person.color }}
                            >
                              {person.name}
                            </span>
                            <span className="text-sm">{person.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Activity</p>
                      <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-text-soft">
                        {primaryCard.stats.map(stat => (
                          <div key={stat.label} className="flex items-center justify-between gap-4">
                            <span>{stat.label}</span>
                            <span className="text-white">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
