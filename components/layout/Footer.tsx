import type { ReactNode } from "react";
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

type ExternalFooterLink = {
  label: string;
  href: string;
  external: true;
};

type FooterLink = InternalFooterLink | ExternalFooterLink;

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
      makeSectionLink("outcomes"),
      makeSectionLink("use-cases")
    ])
  },
  {
    title: "Company",
    links: compactLinks([
      { label: "Changelog", href: "/changelog" as Route },
      makeSectionLink("team"),
      makeSectionLink("roadmap"),
      { label: "Contact", href: "/contact" as Route }
    ])
  },
  {
    title: "Resources",
    links: compactLinks([
      { label: "Resource library", href: "/resources" as Route },
      { label: "Privacy", href: "/privacy" as Route },
      { label: "Terms", href: "/terms" as Route }
    ])
  },
  {
    title: "Connect",
    links: [
      {
        label: "Twitter/X",
        href: "https://twitter.com/cocoonlab",
        external: true
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/cocoon-lab",
        external: true
      },
      { label: "Email", href: "mailto:hello@cocoonlab.ai", external: true }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/60 bg-surface-sunken text-text-muted">
      <div className="container-x flex flex-col gap-12 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(220px,_1fr)_2.5fr] lg:items-start">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-text-muted/90">
              Tools for teams designing the next generation of cities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:grid-cols-5">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-text-muted/80">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-text-muted transition hover:text-text"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-text-muted transition hover:text-text"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border-subtle/60 pt-6 text-xs text-text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <button className="inline-flex items-center gap-2 rounded-full border border-border-subtle/80 bg-[#070712] px-3 py-1.5 text-[0.78rem] font-medium text-text-soft transition hover:border-text-muted/80 hover:text-text">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-blue/80 shadow-inner" aria-hidden />
              English (US)
            </button>
            <div className="flex items-center gap-2">
              <SocialIcon href="https://twitter.com/cocoonlab" label="Twitter/X">
                <XIcon />
              </SocialIcon>
              <SocialIcon
                href="https://www.linkedin.com/company/cocoon-lab"
                label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle/80 bg-[#070712] text-text-muted transition hover:border-text-muted/80 hover:text-text"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M18.9 4.5h-3l-3.05 4.08L9.4 4.5H4.5l5.14 6.9-5.2 8.1h3l3.35-4.56 3.6 4.56h4.8l-5.4-7.3 5.11-7.7Zm-3.74 12.5-6-7.91 1.09-1.58 6.09 8-1.18 1.49Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M5.16 9.5V19H2V9.5h3.16ZM3.6 3.5a1.84 1.84 0 1 1 0 3.68 1.84 1.84 0 0 1 0-3.68Zm5.77 6c1.65 0 2.76.86 3.23 1.69V9.5h3.17c-.04.9 0 9.5 0 9.5h-3.17v-5.3c0-1.4-.7-2.33-1.92-2.33-1 0-1.57.67-1.84 1.32-.1.23-.13.55-.13.87V19H6.54s.04-7.7 0-8.5h3.17Z" />
    </svg>
  );
}
