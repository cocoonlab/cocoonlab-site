import type { ReactNode } from "react";
import type { Locale } from "../locale.ts";
import { useSite } from "../site/Site.tsx";
import { PageIntro } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";

type Document = { title: string; lead: string; sections: [string, ReactNode][]; note?: string };

const mail = (
  <a href="mailto:rashid@cocoonlab.ai" className="underline decoration-1 underline-offset-[0.2em]">
    rashid@cocoonlab.ai
  </a>
);

const privacy: Record<Locale, Document> = {
  en: {
    title: "Privacy Policy",
    lead: "How Cocoon Lab handles information shared through cocoonlab.ai when you contact us, request a demo, or begin a conversation.",
    sections: [
      [
        "1. Data Collection",
        "Cocoon Lab may receive information you choose to share through cocoonlab.ai, including your name, email address, company, role, project details, and any other context provided when you contact us or request a demo.",
      ],
      [
        "2. Essential Cookies",
        "Cocoon Lab currently uses only essential first-party cookies required to operate this website and remember your cookie preference. We do not set advertising, retargeting, or analytics cookies. The cookie preference record is stored for 180 days, then the site asks again. If you choose French or English, that language preference may be stored locally in your browser to keep the site readable on later visits.",
      ],
      [
        "3. How Information Is Used",
        "We use submitted information to respond to your inquiry, continue a conversation you initiated, evaluate whether our products are relevant to your team or project, and maintain the security and reliability of this website and related communications.",
      ],
      [
        "4. Sharing and Retention",
        "Cocoon Lab does not sell personal information. Information may be processed by trusted service providers involved in hosting, email, infrastructure, or security, only to the extent reasonably necessary to operate the site and support legitimate business communication. We retain correspondence for as long as it remains operationally useful or legally required.",
      ],
      [
        "5. Security",
        "We use reasonable technical and operational measures to protect information shared through this website. No internet-based system can guarantee absolute security, so if you need to share especially sensitive material, contact us first and we can agree on an appropriate channel.",
      ],
      [
        "6. Your Choices",
        <>
          You can contact {mail} to ask what information you have shared with Cocoon Lab, request correction of inaccurate details, or request
          deletion where appropriate.
        </>,
      ],
    ],
    note: "Last updated: September 26, 2026. For privacy questions, please contact Cocoon Lab directly.",
  },
  fr: {
    title: "Politique de confidentialité",
    lead: "Comment Cocoon Lab traite les informations partagées sur cocoonlab.ai lorsque vous nous contactez, demandez une démo ou entamez une conversation.",
    sections: [
      [
        "1. Collecte des données",
        "Cocoon Lab peut recevoir les informations que vous choisissez de partager sur cocoonlab.ai, notamment votre nom, adresse courriel, organisation, rôle, détails de projet et tout autre contexte fourni lors d’un contact ou d’une demande de démo.",
      ],
      [
        "2. Témoins essentiels",
        "Cocoon Lab utilise actuellement uniquement des témoins essentiels de première partie nécessaires au fonctionnement du site et à la mémorisation de votre préférence. Nous n’utilisons pas de témoins publicitaires, de reciblage ou d’analytique. La préférence est conservée 180 jours, puis le site redemande votre choix. Si vous choisissez le français ou l’anglais, cette préférence de langue peut être stockée localement dans votre navigateur afin de garder le site lisible lors de visites ultérieures.",
      ],
      [
        "3. Utilisation des informations",
        "Nous utilisons les informations soumises pour répondre à votre demande, poursuivre une conversation initiée par vous, évaluer la pertinence de nos produits pour votre équipe ou votre projet et maintenir la sécurité et la fiabilité du site et des communications.",
      ],
      [
        "4. Partage et conservation",
        "Cocoon Lab ne vend pas de renseignements personnels. Des prestataires de confiance liés à l’hébergement, au courriel, à l’infrastructure ou à la sécurité peuvent traiter certaines informations uniquement dans la mesure nécessaire au fonctionnement du site et aux communications légitimes. Nous conservons la correspondance tant qu’elle demeure utile sur le plan opérationnel ou légalement requise.",
      ],
      [
        "5. Sécurité",
        "Nous utilisons des mesures techniques et opérationnelles raisonnables pour protéger les informations partagées sur ce site. Aucun système en ligne ne peut garantir une sécurité absolue ; si vous devez partager du contenu particulièrement sensible, contactez-nous d’abord afin de convenir d’un canal approprié.",
      ],
      [
        "6. Vos choix",
        <>
          Vous pouvez écrire à {mail} pour demander quelles informations vous avez partagées avec Cocoon Lab, corriger des renseignements
          inexacts ou demander leur suppression lorsque cela est approprié.
        </>,
      ],
    ],
    note: "Dernière mise à jour : 26 septembre 2026. Pour toute question de confidentialité, contactez directement Cocoon Lab.",
  },
};

const terms: Record<Locale, Document> = {
  en: {
    title: "Terms of Service",
    lead: "Terms for using cocoonlab.ai and engaging with materials, communications, and demo requests related to Cocoon Lab and its products.",
    sections: [
      [
        "1. Acceptance of Terms",
        "By accessing cocoonlab.ai, you agree to be bound by these terms. This website exists to present Cocoon Lab and its products, and to support lawful business, informational, and professional use.",
      ],
      [
        "2. Use of the Site",
        "You may browse, read, and contact Cocoon Lab through this website. You may not misuse the site, interfere with its operation, or attempt to access systems or data you are not authorized to access.",
      ],
      [
        "3. Content and License",
        "The text, brand elements, layouts, and materials on this site belong to Cocoon Lab unless stated otherwise. They are provided to present Cocoon Lab and its products and may not be reused in a way that implies ownership, endorsement, or affiliation without permission.",
      ],
      [
        "4. Disclaimer",
        "Website content is provided for general information. Sending an email or demo request does not by itself create a client, vendor, or confidential relationship, and any external sites linked from this site operate under their own terms and practices.",
      ],
      [
        "5. Liability and Updates",
        "To the fullest extent permitted by law, Cocoon Lab is not liable for indirect, incidental, special, or consequential damages arising from your use of this website or reliance on its content. These terms may be revised from time to time, and the current version will remain available on this page.",
      ],
    ],
    note: "Last updated: September 26, 2026.",
  },
  fr: {
    title: "Conditions d’utilisation",
    lead: "Conditions d’utilisation de cocoonlab.ai et des contenus, communications et demandes de démo liés à Cocoon Lab et à ses produits.",
    sections: [
      [
        "1. Acceptation des conditions",
        "En accédant à cocoonlab.ai, vous acceptez d’être lié par ces conditions. Ce site présente Cocoon Lab et ses produits, et sert à un usage commercial, informatif et professionnel légitime.",
      ],
      [
        "2. Utilisation du site",
        "Vous pouvez consulter ce site, le lire et contacter Cocoon Lab par son intermédiaire. Vous ne pouvez pas en faire un usage abusif, perturber son fonctionnement ni tenter d’accéder à des systèmes ou à des données auxquels vous n’êtes pas autorisé à accéder.",
      ],
      [
        "3. Contenu et licence",
        "Les textes, éléments de marque, mises en page et contenus de ce site appartiennent à Cocoon Lab sauf indication contraire. Ils servent à présenter Cocoon Lab et ses produits et ne peuvent être réutilisés d’une façon qui suggère propriété, approbation ou affiliation sans autorisation.",
      ],
      [
        "4. Avis de non-responsabilité",
        "Le contenu du site est fourni à titre informatif. L’envoi d’un courriel ou d’une demande de démo ne crée pas en soi de relation client, fournisseur ou confidentielle, et les sites externes liés depuis ce site sont régis par leurs propres conditions et pratiques.",
      ],
      [
        "5. Responsabilité et mises à jour",
        "Dans toute la mesure permise par la loi, Cocoon Lab n’est pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs découlant de votre utilisation de ce site ou de la confiance accordée à son contenu. Ces conditions peuvent être révisées de temps à autre, et la version en vigueur restera disponible sur cette page.",
      ],
    ],
    note: "Dernière mise à jour : 26 septembre 2026.",
  },
};

const documents = { privacy, terms } as const;

/** Privacy and Terms: numbered clauses, each title on the left of its text. */
export function Legal({ document }: { document: keyof typeof documents }) {
  const { locale } = useSite();
  const text = documents[document][locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <div className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)]`}>
        {text.sections.map(([title, body]) => (
          <section key={title} className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-8 md:py-10">
            <h2 className="col-span-12 font-display text-[1.25rem] font-medium leading-[1.2] tracking-[-0.014em] lg:col-span-4">{title}</h2>
            <p className="col-span-12 max-w-[40rem] text-pretty font-body text-[1.0625rem] leading-[1.7] text-ink lg:col-span-8 xl:col-span-7">
              {body}
            </p>
          </section>
        ))}
        {text.note ? (
          <p className="border-t border-line pt-6 font-body text-[0.875rem] text-muted lg:grid lg:grid-cols-12 lg:gap-x-6">
            <span className="lg:col-span-8 lg:col-start-5">{text.note}</span>
          </p>
        ) : null}
      </div>
    </>
  );
}
