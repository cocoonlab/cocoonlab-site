import { useSite } from "../site/Site.tsx";
import { ArrowLink, ButtonLink, PageIntro } from "../site/ui.tsx";
import { wrap } from "../site/styles.ts";
import { formatDate, posts, type Post as PostData } from "./posts.ts";

/** A blog article: title and dek, the essay on the left, the facts and next steps on the right. */
export function Post({ id }: { id: PostData["id"] }) {
  const { locale } = useSite();
  const post = posts.find((entry) => entry.id === id)!;
  const content = post.content[locale];

  return (
    <article>
      <PageIntro title={content.title} lead={content.dek}>
        <p className="enter enter-late mt-8 font-body text-[0.875rem] tabular-nums text-muted">
          <time dateTime={post.published}>{formatDate(post.published, locale)}</time>
          <span aria-hidden="true" className="mx-2 text-muted/50">
            ·
          </span>
          {post.section[locale]}
        </p>
      </PageIntro>

      <div className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-12 gap-x-6 gap-y-16`}>
        <div className="prose col-span-12 border-t border-line pt-8 lg:col-span-7">
          {content.body.map((block) => (
            <section key={block.heading}>
              <h2>{block.heading}</h2>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <aside className="col-span-12 grid content-start gap-12 lg:col-span-4 lg:col-start-9">
          {content.aside.map((note) => (
            <section key={note.title} className="border-t border-line pt-8">
              <h2 className="font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.018em]">{note.title}</h2>
              {note.items ? (
                <ul className="mt-5 font-body text-[0.9375rem] leading-[1.5]">
                  {note.items.map((item) => (
                    <li key={item} className="border-t border-line py-3 first:border-t-0 first:pt-0">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {note.text ? <p className="mt-4 font-body text-[0.9375rem] leading-[1.6] text-muted">{note.text}</p> : null}
              {note.links.length ? (
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {note.links.map((link) =>
                    link.primary ? (
                      <ButtonLink key={link.href} href={link.href}>
                        {link.label}
                      </ButtonLink>
                    ) : (
                      <ArrowLink key={link.href} href={link.href}>
                        {link.label}
                      </ArrowLink>
                    ),
                  )}
                </div>
              ) : null}
            </section>
          ))}
        </aside>
      </div>
    </article>
  );
}
