import type { ReactNode } from "react";
import { Glyph } from "../Glyph.tsx";
import { glyphs } from "../pixel/glyphs.ts";
import { useSite } from "./Site.tsx";
import { textLink, wrap } from "./styles.ts";

/** The opening of an inner page: its name, set large, and one line of lead. */
export function PageIntro({ title, lead, children }: { title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <div className={`${wrap} pt-[clamp(2.5rem,7vw,6rem)]`}>
      <h1 className="enter max-w-[15em] text-balance font-display text-[clamp(2.75rem,6.2vw,6rem)] font-medium leading-[0.96] tracking-[-0.036em] text-ink">
        {title}
      </h1>
      {lead ? (
        <p className="enter enter-late mt-6 max-w-[36rem] text-pretty font-body text-[1.125rem] leading-[1.55] text-muted sm:text-[1.25rem]">
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** A titled band of the page: the title on the left, its content on the grid's right side. */
export function Section({ id, title, children }: { id: string; title: ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`${wrap} mt-[clamp(4.5rem,9vw,8rem)]`}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-line pt-8 md:pt-10">
        <h2
          id={id}
          className="col-span-12 text-balance font-display text-[clamp(1.5rem,2.3vw,2.125rem)] font-medium leading-[1.08] tracking-[-0.022em] lg:col-span-4"
        >
          {title}
        </h2>
        <div className="col-span-12 lg:col-span-8 xl:col-span-7">{children}</div>
      </div>
    </section>
  );
}

/** Running text: comfortable measure, paragraphs spaced by rhythm rather than rules. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose ${className}`}>{children}</div>;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** The one solid action on a page. */
export function ButtonLink({ href, children, download }: { href: string; children: ReactNode; download?: boolean }) {
  const { href: resolve } = useSite();
  return (
    <a
      href={resolve(href)}
      download={download || undefined}
      className="group inline-flex h-12 items-center gap-4 bg-ink pl-5 pr-[1.125rem] font-body text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-civic"
    >
      {children}
      <Glyph
        glyph={download ? glyphs.arrowDown : glyphs.arrowRight}
        className={`transition-transform duration-200 ${download ? "group-hover:translate-y-0.5" : "group-hover:translate-x-0.5"}`}
      />
    </a>
  );
}

/** A quiet text link with a pixel arrow; external links point up and out. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const { href: resolve } = useSite();
  const external = isExternal(href);
  return (
    <a href={resolve(href)} className={`group inline-flex items-center gap-2.5 font-body text-[0.9375rem] font-medium text-ink ${textLink}`}>
      {children}
      <Glyph
        glyph={external ? glyphs.arrowUpRight : glyphs.arrowRight}
        className={`transition-transform duration-200 ${
          external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
      />
    </a>
  );
}

/** A row of actions under an intro or a section. */
export function Actions({ children }: { children: ReactNode }) {
  return <div className="enter enter-late mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">{children}</div>;
}
