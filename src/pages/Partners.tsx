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
    montreal: {
      name: "City of Montréal",
      role: "Municipal partner",
      logo: "City of Montréal logo",
      text: "Working with the City of Montréal keeps our tools close to the people who plan, review, and permit the city’s streets and buildings.",
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
    montreal: {
      name: "Ville de Montréal",
      role: "Partenaire municipal",
      logo: "Logo de la Ville de Montréal",
      text: "Travailler avec la Ville de Montréal garde nos outils proches de celles et ceux qui planifient, examinent et autorisent les rues et les bâtiments de la ville.",
    },
    whyTitle: "Pourquoi ces relations comptent",
    why: "Ensemble, ces partenaires aident notre travail à rester informé par la recherche, guidé par la pratique et ancré dans de vraies décisions plutôt que dans une automatisation générique.",
  },
} as const;

function Partner({ mark, name, role, text }: { mark: ReactNode; name: string; role: string; text: string }) {
  return (
    <li className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-line pt-8 md:pt-10">
      <div className="col-span-12 flex aspect-[16/9] items-center justify-center bg-white/70 md:col-span-6 lg:col-span-5">
        {mark}
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
        <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.375rem)] font-medium leading-[1.05] tracking-[-0.025em]">
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
          mark={
            <img
              src={href("/assets/partners/ville-de-montreal-logo.svg")}
              alt={text.montreal.logo}
              width={185}
              height={39}
              loading="lazy"
              decoding="async"
              className="h-auto w-[52%]"
            />
          }
          name={text.montreal.name}
          role={text.montreal.role}
          text={text.montreal.text}
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
