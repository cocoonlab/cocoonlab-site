"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

export function Hero() {
  return (
    <section className="section-pad pb-10 pt-16 md:pt-20 lg:pt-24">
      <div className="container-x grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-pill border border-border-subtle bg-surface-raised/80 px-3 py-1 text-[11px] font-medium text-text-muted shadow-soft">
            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-tr from-accent-lime to-accent-blue" />
            AI workspace for early-stage architectural design
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
              From brief to zoning-aware concepts in a single workspace.
            </h1>
            <p className="max-w-xl text-sm text-text-muted md:text-base">
              Cocoon captures your client goals, regulations, and site context
              into a live knowledge graph—so you can explore options, validate
              compliance, and make better investment calls without juggling
              spreadsheets and PDFs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryCtaLink label="Get early access" className="btn-primary" />
            <Link href="#product" className="btn-ghost">
              See how Cocoon works
            </Link>
          </div>
          <p className="text-xs text-text-muted/80">
            Already in pilots with studios in Montréal and abroad.{" "}
            <a
              href="/changelog"
              className="underline underline-offset-4 hover:text-text-soft"
            >
              View changelog
            </a>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
          className="card-surface relative overflow-hidden"
          aria-label="Cocoon concept board preview"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/15 via-transparent to-accent-purple/20" />
          <div className="relative p-4 md:p-6 lg:p-7">
            <div className="mb-4 flex items-center justify-between text-xs text-text-muted">
              <span className="font-medium text-text-soft">Concept board</span>
              <span className="rounded-pill border border-border-subtle bg-surface-sunken/70 px-2 py-0.5 text-[11px]">
                Live zoning check
              </span>
            </div>
            <Image
              src="/images/saas-ui-visual.png"
              alt="Cocoon Lab concept board UI preview"
              width={640}
              height={420}
              className="h-auto w-full rounded-2xl border border-border-subtle/70 object-cover"
              priority
            />
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-text-muted md:grid-cols-4">
              <div>
                <dt className="text-[11px] uppercase tracking-wide">
                  Height
                </dt>
                <dd className="mt-1 inline-flex rounded-pill bg-emerald-900/40 px-2 py-1 text-[11px] text-emerald-200">
                  Compliant
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide">
                  Coverage
                </dt>
                <dd className="mt-1 inline-flex rounded-pill bg-emerald-900/40 px-2 py-1 text-[11px] text-emerald-200">
                  Compliant
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide">
                  Parking
                </dt>
                <dd className="mt-1 inline-flex rounded-pill bg-amber-900/40 px-2 py-1 text-[11px] text-amber-200">
                  At risk
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide">
                  Yield vs baseline
                </dt>
                <dd className="mt-1 text-[11px] text-emerald-400">+14%</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
