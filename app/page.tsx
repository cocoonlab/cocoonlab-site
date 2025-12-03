import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Hero } from "@/components/home/Hero";
import { TrustedByBand } from "@/components/home/TrustedByBand";
import { ProblemSection } from "@/components/home/ProblemSection";
import { UseCases } from "@/components/home/UseCases";
import { NewsletterForm } from "@/components/NewsletterForm";
import { WhatCocoonDoes } from "@/components/home/WhatCocoonDoes";
import { DemoSection } from "@/components/home/DemoSection";
import { OutcomesSection } from "@/components/home/OutcomesSection";
import { FoundersSection } from "@/components/home/FoundersSection";
import { RoadmapNowSection } from "@/components/home/RoadmapNowSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cocoon – AI workspace for architects and designers",
  description:
    "Cocoon is an AI workspace for early-stage architectural design. Capture briefs, explore zoning-aware options, and align stakeholders faster.",
  openGraph: {
    title: "Cocoon – AI workspace for architects and designers",
    description:
      "Capture briefs, explore zoning-aware options, and align stakeholders faster with Cocoon Lab.",
    url: siteConfig.url,
    siteName: "Cocoon Lab",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630
      }
    ],
    type: "website"
  },
  metadataBase: new URL(siteConfig.url)
};

export default function HomePage() {
  return (
    <LayoutShell>
      <Hero />
      <TrustedByBand />
      <ProblemSection />
      <WhatCocoonDoes />
      <DemoSection />
      <OutcomesSection />
      <UseCases />
      <FoundersSection />
      <RoadmapNowSection />
      <RoadmapSection />
      <section className="section-pad pt-4">
        <div className="container-x grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Stay close to Cocoon as we build.
            </h2>
            <p className="text-sm leading-relaxed text-text-muted md:text-base">
              We share short notes on new capabilities, pilot learnings, and
              ideas for how AI can support better architectural decisions.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </LayoutShell>
  );
}
