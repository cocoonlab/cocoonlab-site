import Image from "next/image";

const partners = [
  {
    name: "Adamson and AAI",
    src: "/logos/adamsonandaai-logo.png"
  }
];

export function TrustedByBand() {
  return (
    <section className="border-y border-border-subtle/70 bg-surface-sunken/70 py-10 sm:py-12">
      <div className="container-x relative">
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 text-center">
          <p className="text-sm font-medium text-text-muted">
            Built with studios designing housing, institutional buildings, and civic spaces.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:flex-nowrap md:gap-10">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-16 items-center justify-center px-4 opacity-70"
              >
                {partner.src ? (
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={260}
                    height={110}
                    className="h-auto w-40 max-w-full object-contain saturate-0"
                  />
                ) : (
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-text-soft">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
