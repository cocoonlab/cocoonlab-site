import { LayoutShell } from "@/components/layout/LayoutShell";
import { ResourcesGrid } from "@/components/resources/ResourcesGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources – Cocoon Lab",
  description:
    "Guides and templates on early-stage architectural design, feasibility studies, and how to use Cocoon in your studio."
};

export default function ResourcesPage() {
  return (
    <LayoutShell>
      <ResourcesGrid />
    </LayoutShell>
  );
}
