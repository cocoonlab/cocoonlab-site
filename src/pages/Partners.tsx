import type { ReactNode } from "react";
import { useSite } from "../site/Site.tsx";
import { PageIntro, Prose, Section } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";

const copy = {
  en: {
    title: "Partners",
    lead: "Cocoon Lab works with partners who keep our tools close to research rigor, design practice, and real project conditions.",
    mila: {
      name: "Mila",
      role: "Core partner",
      logo: "Mila logo",
      text: "Mila brings research rigor, responsible AI thinking, and a strong technical foundation to the broader context in which our tools are built.",
    },
    pending: {
      mark: "Partner",
      name: "Partner announcement pending",
      role: "Coming soon",
      text: "A future partner profile will appear here once it is ready to be public.",
    },
    whyTitle: "Why these relationships matter",
    why: "Together, these partners help our work stay research-aware, practice-led, and grounded in real decisions rather than generic automation.",
  },
  fr: {
    title: "Partenaires",
    lead: "Cocoon Lab travaille avec des partenaires qui gardent nos outils proches de la rigueur de la recherche, de la pratique du design et des conditions réelles de projet.",
    mila: {
      name: "Mila",
      role: "Partenaire principal",
      logo: "Logo de Mila",
      text: "Mila apporte une rigueur de recherche, une réflexion sur l’IA responsable et une base technique solide au contexte dans lequel nos outils sont construits.",
    },
    pending: {
      mark: "Partenaire",
      name: "Annonce de partenaire à venir",
      role: "Bientôt",
      text: "Un futur profil partenaire apparaîtra ici lorsqu’il sera prêt à être public.",
    },
    whyTitle: "Pourquoi ces relations comptent",
    why: "Ensemble, ces partenaires aident notre travail à rester informé par la recherche, guidé par la pratique et ancré dans de vraies décisions plutôt que dans une automatisation générique.",
  },
} as const;

function Partner({ mark, name, role, text, pending }: { mark: ReactNode; name: string; role: string; text: string; pending?: boolean }) {
  return (
    <li className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-line pt-8 md:pt-10">
      <div
        className={`col-span-12 flex aspect-[16/9] items-center justify-center md:col-span-6 lg:col-span-5 ${
          pending ? "border border-dashed border-ink/20" : "bg-white/70"
        }`}
      >
        {mark}
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
        <h2 className={`font-display text-[clamp(1.75rem,2.6vw,2.375rem)] font-medium leading-[1.05] tracking-[-0.025em] ${pending ? "text-muted" : ""}`}>
          {name}
        </h2>
        <p className="mt-2 font-body text-[0.9375rem] text-muted">{role}</p>
        <p className="mt-5 max-w-[34rem] text-pretty font-body text-[1.0625rem] leading-[1.65] text-ink">{text}</p>
      </div>
    </li>
  );
}

export function Partners() {
  const { locale, href } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <ul className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)] grid gap-y-14`}>
        <Partner
          mark={
            <img
              src={href("/assets/partners/mila-logo.webp")}
              alt={text.mila.logo}
              width={800}
              height={408}
              loading="lazy"
              decoding="async"
              className="h-auto w-[46%] brightness-0"
            />
          }
          name={text.mila.name}
          role={text.mila.role}
          text={text.mila.text}
        />
        <Partner
          pending
          mark={<span className="font-body text-[0.8125rem] font-medium tracking-[0.06em] text-muted">{text.pending.mark}</span>}
          name={text.pending.name}
          role={text.pending.role}
          text={text.pending.text}
        />
      </ul>

      <Section id="why-title" title={text.whyTitle}>
        <Prose>
          <p>{text.why}</p>
        </Prose>
      </Section>
    </>
  );
}
