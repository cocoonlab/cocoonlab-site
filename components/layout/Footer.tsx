import type { Route } from "next";
import Link from "next/link";
import { Logo } from "../Logo";
import { siteConfig } from "@/lib/config";
import { getHomeSection, homeSectionHref, type HomeSectionId } from "@/lib/sections";

type InternalFooterLink = {
  label: string;
  href: ReturnType<typeof homeSectionHref> | Route;
  external?: false;
};

type FooterLink = InternalFooterLink;

function makeSectionLink(id: HomeSectionId): FooterLink | null {
  const section = getHomeSection(id);

  if (!section) return null;

  return { label: section.label, href: homeSectionHref(section.id) };
}

function compactLinks(links: (FooterLink | null)[]) {
  return links.filter((link): link is FooterLink => Boolean(link));
}

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: compactLinks([
      makeSectionLink("product"),
      makeSectionLink("demo"),
      makeSectionLink("outcomes")
    ])
  },
  {
    title: "Company",
    links: compactLinks([
      makeSectionLink("team"),
      { label: "Changelog", href: "/changelog" as Route },
      { label: "Contact", href: "/contact" as Route }
    ])
  },
  {
    title: "Resources",
    links: compactLinks([
      { label: "Resources", href: "/resources" as Route },
      { label: "Privacy", href: "/privacy" as Route },
      { label: "Terms", href: "/terms" as Route }
    ])
  }
];

export function Footer() {
  return (
    <footer className="border-t border-divider bg-bg text-text-muted">
      <div className="container-x flex flex-col gap-10 py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(200px,_1fr)_2fr] md:items-start">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-text-muted/80">
              Keeping design fun, simple and inspired.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-text-muted/80">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-sm text-text-muted transition hover:text-text hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-divider pt-4 text-xs text-text-muted/80">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
