export function EarlySignalsStrip() {
  const signals = ["Code compliance", "Cost", "Sustainability"];

  return (
    <section className="border-y border-border-subtle/70 bg-bg py-6">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted sm:gap-6">
          {signals.map((signal, index) => (
            <div key={signal} className="flex items-center gap-4">
              <span>{signal}</span>
              {index < signals.length - 1 ? (
                <span className="h-4 w-px bg-divider" aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
