import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Hero } from "@/components/home/Hero";
import { TrustedByBand } from "@/components/home/TrustedByBand";
import { ProblemSection } from "@/components/home/ProblemSection";
import { UseCases } from "@/components/home/UseCases";
import { WhatCocoonDoes } from "@/components/home/WhatCocoonDoes";
import { OutcomesSection } from "@/components/home/OutcomesSection";
import { FoundersSection } from "@/components/home/FoundersSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EarlySignalsStrip } from "@/components/home/EarlySignalsStrip";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
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
      <HowItWorks />
      <WhatCocoonDoes />
      <EarlySignalsStrip />
      <OutcomesSection />
      <UseCases />
      <FoundersSection />
      <FinalCtaSection />
    </LayoutShell>
  );
}
