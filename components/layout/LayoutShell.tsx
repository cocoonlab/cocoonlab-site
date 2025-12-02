import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.22),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg to-[#02020a]" />
      </div>

      <Nav />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
