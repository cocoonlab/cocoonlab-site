import type { Metadata } from "next";

import { ArchitecturalWorkspacePage } from "@/components/architectural/ArchitecturalWorkspacePage";

export const metadata: Metadata = {
  title: "Workspace preview",
  description:
    "Preview Cocoon's editorial architectural workspace: portfolio command, massing review, and technical dossier screens."
};

export default function ProductShellPlaceholder() {
  return <ArchitecturalWorkspacePage />;
}
