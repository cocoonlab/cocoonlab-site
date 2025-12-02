import { Section } from "@/components/Section";

type Feature = {
  title: string;
  illustration: "layers" | "massing" | "timeline";
};

const features: Feature[] = [
  {
    title: "Project Brain for complex sites",
    illustration: "layers"
  },
  {
    title: "Zoning-aware concepting",
    illustration: "massing"
  },
  {
    title: "Decision trails for every option",
    illustration: "timeline"
  }
];

function FeatureIllustration({ variant }: { variant: Feature["illustration"] }) {
  if (variant === "layers") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(136,156,250,0.35),transparent_35%),_radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.28),transparent_38%)]" />
        <div className="relative flex h-full flex-col justify-center gap-3 p-4">
          {["Requirements", "Constraints", "Options"].map((label, index) => (
            <div
              key={label}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
              style={{ marginLeft: index * 6 }}
            >
              <div className="h-9 w-10 rounded-lg bg-gradient-to-br from-white/30 to-white/5" />
              <div className="space-y-1">
                <div className="h-2 w-20 rounded-full bg-white/50" />
                <div className="h-2 w-28 rounded-full bg-white/30" />
              </div>
              <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "massing") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,212,191,0.35),transparent_42%),_radial-gradient(circle_at_10%_40%,rgba(129,140,248,0.35),transparent_36%)]" />
        <div className="relative flex h-full items-end gap-3 p-4">
          {[64, 96, 132].map((height, idx) => (
            <div key={height} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-lg bg-gradient-to-br from-white/50 to-white/15"
                style={{ height }}
              />
              <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                <span className="h-5 w-[2px] rounded-full bg-white/40" />
                <span>{idx === 0 ? "T1" : idx === 1 ? "T2" : "T3"}</span>
              </div>
            </div>
          ))}
          <div className="absolute inset-x-5 bottom-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            <span>Height</span>
            <span>Setback</span>
            <span>FAR</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(129,140,248,0.38),transparent_40%),_radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.28),transparent_40%)]" />
      <div className="relative flex h-full items-center justify-between px-4">
        <div className="h-[3px] flex-1 bg-gradient-to-r from-white/70 via-white/50 to-white/20" />
        {[0, 1, 2, 3].map((_, idx) => (
          <div key={idx} className="relative -mt-2 flex flex-col items-center gap-2">
            <div className="h-11 w-[3px] rounded-full bg-white/50" />
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span>{idx === 0 ? "Brief" : idx === 1 ? "Option" : idx === 2 ? "Review" : "Decision"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MadeForSection() {
  return (
    <Section className="bg-gradient-to-b from-bg via-bg/95 to-bg/90">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-baseline md:gap-10">
        <div className="md:col-span-6 space-y-3">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Made for architecture,
            <br />
            urban design, and cities.
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="text-base leading-relaxed text-text-muted sm:text-lg">
            Early-stage work in the built environment is messy. Cocoon turns briefs, zoning, and site context into a shared,
            structured space where teams can explore options with AI, stay aligned with codes, and tell a clear story to clients and cities.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface-raised/80 via-surface-raised/70 to-surface-sunken/60 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 ease-out hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-6"
          >
            <div className="relative mb-8 h-[60%] min-h-[12rem]">
              <FeatureIllustration variant={feature.illustration} />
            </div>
            <div className="mt-auto flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <button
                type="button"
                aria-label={`Open more about ${feature.title}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-200 hover:scale-105 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
