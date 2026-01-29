import Image from "next/image";

const partners = [
  {
    name: "Adamson and AAI",
    src: "/logos/adamsonandaai-logo.png"
  }
];

const blurredLogoNames = new Set(["Adamson and AAI"]);

const getLogoBlurClass = (name: string) =>
  blurredLogoNames.has(name)
    ? "blur-[14px] brightness-90 contrast-75 saturate-0"
    : "";

export function TrustedByBand() {
  return (
    <section className="relative overflow-hidden border-y border-border-subtle/70 bg-surface-sunken/80 py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />
      <div className="container-x relative">
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-20 items-center justify-center rounded-2xl border border-border-subtle/60 bg-white/5 px-6 opacity-80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-[opacity,filter,transform] duration-200 ease-out sm:h-24"
              >
                {partner.src ? (
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={260}
                    height={110}
                    className={`h-auto w-52 max-w-full object-contain sm:w-60 ${getLogoBlurClass(partner.name)}`}
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
