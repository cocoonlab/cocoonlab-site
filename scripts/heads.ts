import { type PageId, pages } from "../src/pages/index.tsx";
import { posts } from "../src/pages/posts.ts";

/**
 * The <head> of each prerendered inner page: English title and description
 * (the page switches them for French at runtime), canonical URL, social
 * cards and structured data. The homepage keeps its own head in index.html.
 */

const SITE = "https://cocoonlab.ai";
const IMAGE = `${SITE}/og-cocoonlab-home.png`;
const IMAGE_ALT =
  "We make it faster and safer to build better places for people: Cocoon Lab, over a pixel view of Montréal from the Old Port with the Jacques-Cartier Bridge, the Biosphère, Habitat 67 and downtown under Mount Royal";

const organization = { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Cocoon Lab", url: `${SITE}/` };

const person = (name: string, file: string) => ({
  "@type": "Person",
  name,
  image: `${SITE}/assets/team/${file}.png`,
  worksFor: organization,
});

function postLd(id: (typeof posts)[number]["id"], about: string[]) {
  const post = posts.find((entry) => entry.id === id)!;
  const content = post.content.en;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.excerpt,
    url: `${SITE}${post.path}`,
    mainEntityOfPage: `${SITE}${post.path}`,
    datePublished: post.published,
    dateModified: post.published,
    author: organization,
    publisher: { ...organization, logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` } },
    about: about.map((name) => ({ "@type": "Thing", name })),
    image: IMAGE,
  };
}

type Extra = {
  type?: "website" | "article";
  article?: { published: string; section: string; tags: string[] };
  feed?: boolean;
  index?: boolean;
  jsonLd?: object;
};

const extras: Record<Exclude<PageId, "home">, Extra> = {
  team: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Team | Cocoon Lab",
      url: `${SITE}/team/`,
      description: "Meet the founding team behind Cocoon Lab.",
      about: organization,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          person("Rashid Mushkani", "rashid-mushkani"),
          person("Hugo Berard", "hugo-berard"),
          person("Shin Koseki", "shin-koseki"),
        ].map((item, index) => ({ "@type": "ListItem", position: index + 1, item })),
      },
    },
  },
  partners: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Partners | Cocoon Lab",
      url: `${SITE}/partners/`,
      description: "Partners who work with Cocoon Lab.",
      about: organization,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          { "@type": "ListItem", position: 1, item: { "@type": "Organization", name: "Mila" } },
          { "@type": "ListItem", position: 2, item: { "@type": "GovernmentOrganization", name: "Ville de Montréal", url: "https://montreal.ca/" } },
        ],
      },
    },
  },
  contact: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Cocoon Lab",
      url: `${SITE}/contact/`,
      description: pages.contact.meta.en.description,
      about: organization,
      mainEntity: { "@type": "ContactPoint", contactType: "general inquiries", email: "rashid@cocoonlab.ai", url: `${SITE}/contact/` },
    },
  },
  blog: {
    feed: true,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Cocoon Lab Blog",
      url: `${SITE}/blog/`,
      description: pages.blog.meta.en.description,
      publisher: organization,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.content.en.title,
        url: `${SITE}${post.path}`,
        datePublished: post.published,
        dateModified: post.published,
        author: organization,
      })),
    },
  },
  "post-indescanada": {
    type: "article",
    feed: true,
    article: { published: "2026-04-13", section: "Events", tags: ["InDesCanada", "Cocoon Lab", "Rashid Mushkani", "Ottawa"] },
    jsonLd: postLd("indescanada", ["InDesCanada", "Cocoon Lab", "Rashid Mushkani", "Industrial design"]),
  },
  "post-mila": {
    type: "article",
    feed: true,
    article: { published: "2026-04-13", section: "Partnerships", tags: ["Mila", "Cocoon Lab", "Responsible AI"] },
    jsonLd: postLd("mila-partnership", ["Mila", "Cocoon Lab", "Responsible AI"]),
  },
  monograph: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Monograph | Cocoon Lab",
      url: `${SITE}/monograph/`,
      description: pages.monograph.meta.en.description,
      about: organization,
    },
  },
  triage: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#cocoon-triage`,
      name: "Cocoon Triage",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE}/triage/`,
      description: pages.triage.meta.en.description,
      creator: organization,
    },
  },
  code: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#cocoon-code`,
      name: "Cocoon Code",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE}/code/`,
      description: pages.code.meta.en.description,
      creator: organization,
    },
  },
  "press-kit": {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Press Kit | Cocoon Lab",
      url: `${SITE}/press-kit/`,
      description: pages["press-kit"].meta.en.description,
      about: organization,
      mainEntity: {
        "@type": "MediaObject",
        name: "Cocoon Lab Press Kit",
        contentUrl: `${SITE}/press-kit/Cocoon_Lab_Press_Kit.zip`,
        encodingFormat: "application/zip",
      },
    },
  },
  privacy: {},
  terms: {},
  "not-found": { index: false },
};

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function headFor(id: Exclude<PageId, "home">) {
  const page = pages[id];
  const { title, description } = page.meta.en;
  const extra = extras[id];
  const indexable = extra.index !== false;
  const url = `${SITE}${page.path}`;
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="author" content="Cocoon Lab" />`,
    `<meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}" />`,
  ];
  if (indexable) {
    lines.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="${extra.type ?? "website"}" />`,
      `<meta property="og:site_name" content="Cocoon Lab" />`,
      `<meta property="og:locale" content="en_CA" />`,
      `<meta property="og:locale:alternate" content="fr_CA" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${IMAGE}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(IMAGE_ALT)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      `<meta name="twitter:image" content="${IMAGE}" />`,
      `<meta name="twitter:image:alt" content="${esc(IMAGE_ALT)}" />`,
    );
  }
  if (extra.article) {
    lines.push(
      `<meta property="article:published_time" content="${extra.article.published}" />`,
      `<meta property="article:modified_time" content="${extra.article.published}" />`,
      `<meta property="article:section" content="${esc(extra.article.section)}" />`,
      ...extra.article.tags.map((tag) => `<meta property="article:tag" content="${esc(tag)}" />`),
    );
  }
  if (extra.feed) {
    lines.push(`<link rel="alternate" type="application/rss+xml" title="Cocoon Lab Blog" href="${SITE}/feed.xml" />`);
  }
  if (extra.jsonLd) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(extra.jsonLd).replace(/</g, "\\u003c")}</script>`);
  }
  return lines.join("\n    ");
}
