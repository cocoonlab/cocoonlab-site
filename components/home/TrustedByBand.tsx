"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { MouseEvent } from "react";
import { homeSectionHref } from "@/lib/sections";

//const partners = [
 // {
  //  name: "NEUF",
  //  src: "/logos/neuf-logo.png"
 // },
 // {
 //   name: "Civiliti",
  //  src: "/logos/civiliti-logo.png"
 // },
 // {
 //   name: "Sid Lee Architecture",
 //   src: "/logos/sidlee-architecture-logo.png"
 // },
 // {
 //   name: "Adamson and AAI",
 //   src: "/logos/adamsonandaai-logo.png"
 // }
//];

export function TrustedByBand() {
  const [isHovered, setIsHovered] = useState(false);
  const [ctaFocused, setCtaFocused] = useState(false);

  const active = isHovered || ctaFocused;

  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("customers");
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-border-subtle/70 bg-surface-sunken/80 py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Powering forward-looking design teams</p>
          <p className="mt-3 text-sm leading-relaxed text-text-soft md:text-base">
            Studios shipping dense infill, campuses, and civic realm projects.
          </p>
        </div>

        <div
          className="relative mx-auto mt-9 max-w-5xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div
            className={`grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 ${
              active ? "opacity-60 blur-[1px]" : "opacity-100 blur-0"
            } transition-[opacity,filter] duration-200 ease-out`}
          >
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
                    className="h-auto w-52 max-w-full object-contain sm:w-60"
                  />
                ) : (
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-text-soft">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          <Link
            href={homeSectionHref("outcomes")}
            onClick={handleCtaClick}
            onFocus={() => setCtaFocused(true)}
            onBlur={() => setCtaFocused(false)}
            onMouseEnter={() => setCtaFocused(true)}
            onMouseLeave={() => setCtaFocused(false)}
            className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_45px_rgba(148,163,184,0.35)] ring-1 ring-white/40 transition duration-200 ease-out hover:-translate-y-1/2 hover:shadow-[0_12px_50px_rgba(148,163,184,0.48)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 sm:flex ${
              active ? "opacity-100 blur-0" : "opacity-0 blur-[1px]"
            }`}
          >
            See outcomes
            <span aria-hidden="true" className="text-base">
              →
            </span>
          </Link>
        </div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href={homeSectionHref("outcomes")}
            className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            See outcomes
            <span aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
