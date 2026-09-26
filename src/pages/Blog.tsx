import { Glyph } from "../Glyph.tsx";
import { glyphs } from "../pixel/glyphs.ts";
import { useSite } from "../site/Site.tsx";
import { ArrowLink, PageIntro } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";
import { formatDate, posts } from "./posts.ts";

const copy = {
  en: {
    title: "Blog",
    lead: "News and notes from Cocoon Lab: our products, events, and partners.",
    read: "Read article",
    stayTitle: "Stay updated.",
    stay: "Follow the feed or contact Cocoon Lab to keep the conversation going.",
    feed: "Open RSS feed",
    contact: "Contact Cocoon Lab",
  },
  fr: {
    title: "Blogue",
    lead: "Nouvelles et notes de Cocoon Lab : nos produits, nos événements et nos partenaires.",
    read: "Lire l’article",
    stayTitle: "Rester à jour.",
    stay: "Suivez le fil ou contactez Cocoon Lab pour poursuivre la conversation.",
    feed: "Ouvrir le fil RSS",
    contact: "Contacter Cocoon Lab",
  },
} as const;

export function Blog() {
  const { locale, href } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <ul className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)]`}>
        {posts.map((post) => {
          const content = post.content[locale];
          return (
            <li key={post.id} className="relative grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-9 md:py-11">
              <p className="col-span-12 font-body text-[0.875rem] tabular-nums text-muted lg:col-span-3 lg:pt-2">
                <time dateTime={post.published}>{formatDate(post.published, locale)}</time>
                <span aria-hidden="true" className="mx-2 text-muted/50">
                  ·
                </span>
                {post.section[locale]}
              </p>
              <div className="col-span-12 lg:col-span-8">
                <h2 className="max-w-[20em] text-balance font-display text-[clamp(1.75rem,2.8vw,2.625rem)] font-medium leading-[1.05] tracking-[-0.026em]">
                  <a href={href(post.path)} className="after:absolute after:inset-0 hover:underline hover:decoration-1 hover:underline-offset-[0.12em]">
                    {content.title}
                  </a>
                </h2>
                <p className="mt-4 max-w-[38rem] text-pretty font-body text-[1.0625rem] leading-[1.6] text-muted">{content.excerpt}</p>
                <p aria-hidden="true" className="mt-5 inline-flex items-center gap-2.5 font-body text-[0.9375rem] font-medium text-ink">
                  {text.read}
                  <Glyph glyph={glyphs.arrowRight} />
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <section aria-labelledby="stay-title" className={`${wrap}`}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line pt-9 md:pt-11">
          <h2 id="stay-title" className="col-span-12 font-display text-[1.5rem] font-medium tracking-[-0.02em] lg:col-span-3">
            {text.stayTitle}
          </h2>
          <div className="col-span-12 lg:col-span-8">
            <p className="max-w-[34rem] font-body text-[1.0625rem] leading-[1.6] text-muted">{text.stay}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/feed.xml">{text.feed}</ArrowLink>
              <ArrowLink href="/contact/">{text.contact}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
