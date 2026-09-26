import type { Locale } from "../locale.ts";

type Block = { heading: string; paragraphs: string[] };
type Aside = { title: string; items?: string[]; text?: string; links: { label: string; href: string; primary?: boolean }[] };

export type Post = {
  id: "indescanada" | "mila-partnership";
  path: string;
  published: string;
  section: Record<Locale, string>;
  content: Record<Locale, { title: string; dek: string; excerpt: string; body: Block[]; aside: Aside[] }>;
};

export const posts: Post[] = [
  {
    id: "indescanada",
    path: "/blog/indescanada/",
    published: "2026-04-13",
    section: { en: "Events", fr: "Événements" },
    content: {
      en: {
        title: "Cocoon at InDesCanada",
        dek: "Rashid Mushkani will present Cocoon in Ottawa at InDesCanada, a student-led industrial design conference, competition, and networking event built to connect emerging talent, academia, and industry.",
        excerpt:
          "Rashid Mushkani will present Cocoon at InDesCanada in Ottawa, a student-led industrial design conference, competition, and networking event.",
        body: [
          {
            heading: "Why we’re showing up",
            paragraphs: [
              "Cocoon is built for the earliest stages of architecture, where context is incomplete, timelines are compressed, and the most important decisions are often made before the full picture is visible. That makes design conversation especially important.",
              "InDesCanada feels like the right room for that conversation. The event is positioned by its organizers as a student-led industrial design conference, competition, and networking platform intended to bring emerging Canadian design talent into direct exchange with academia and industry. That ambition aligns closely with how we think about practice: serious design work improves when different forms of intelligence meet early.",
            ],
          },
          {
            heading: "What Rashid will present",
            paragraphs: [
              "Rashid will present Cocoon as a design intelligence system for the front end of architecture. The focus is not automated authorship and not generic image generation. It is about helping teams read a site more clearly, test feasibility earlier, and keep cost, carbon, regulatory, and contextual signals visible before a direction hardens into a fixed proposal.",
              "We want the presentation to open a broader discussion about how AI can support design without flattening it: faster synthesis, clearer validation, and more room for architectural judgment.",
            ],
          },
          {
            heading: "Why InDesCanada matters",
            paragraphs: [
              "What stands out about InDesCanada is its framing. Public event materials describe it as an inaugural, student-led event built for real outcomes: stronger connections, research-informed thinking, and a more visible path between people who are learning, people who are already leading, and people who are about to shape what comes next.",
              "The event also reaches beyond a narrow disciplinary audience. Its organizers explicitly position it for industrial designers, graduate students, and professionals across disciplines who want to understand how design research and design thinking shape products, services, and systems. That broader lens is part of why Cocoon belongs there.",
            ],
          },
          {
            heading: "See you in Ottawa",
            paragraphs: [
              "InDesCanada is scheduled for Sunday, May 3, 2026 at Richcraft Hall in Ottawa. We’re looking forward to meeting students, researchers, practitioners, and collaborators who care about where design is heading and how new tools should responsibly fit into that future.",
              "If you’ll be there, come find us. We’d love to show what Cocoon is building and hear how early-stage design work is changing in your world.",
            ],
          },
        ],
        aside: [
          {
            title: "InDesCanada, Ottawa.",
            items: ["Sunday, May 3, 2026", "10:00 AM to 4:30 PM", "Richcraft Hall, Ottawa", "Conference, competition, and networking"],
            links: [],
          },
          {
            title: "Follow the event.",
            text: "Visit the organizer site for registration and event updates, or come back to the Cocoon Lab blog for more announcements.",
            links: [
              { label: "Visit InDesCanada", href: "https://indescanada.ca/" },
              { label: "Back to blog", href: "/blog/" },
            ],
          },
        ],
      },
      fr: {
        title: "Cocoon à InDesCanada",
        dek: "Rashid Mushkani présentera Cocoon à Ottawa lors d’InDesCanada, un événement étudiant de design industriel, de concours et de réseautage conçu pour relier les talents émergents, le milieu académique et l’industrie.",
        excerpt:
          "Rashid Mushkani présentera Cocoon à InDesCanada, à Ottawa, lors d’un événement étudiant de design industriel combinant conférence, concours et réseautage.",
        body: [
          {
            heading: "Pourquoi nous y participons",
            paragraphs: [
              "Cocoon est conçu pour les toutes premières étapes de l’architecture, là où le contexte est incomplet, les délais sont comprimés et les décisions les plus importantes sont souvent prises avant que l’ensemble soit visible. C’est pourquoi la conversation de design est essentielle.",
              "InDesCanada est le bon lieu pour cette conversation. Les organisateurs le présentent comme une plateforme étudiante de conférence, concours et réseautage en design industriel, destinée à mettre les talents canadiens émergents en relation directe avec le milieu académique et l’industrie. Cette ambition rejoint notre vision : le travail de conception sérieux s’améliore lorsque différentes formes d’intelligence se rencontrent tôt.",
            ],
          },
          {
            heading: "Ce que Rashid présentera",
            paragraphs: [
              "Rashid présentera Cocoon comme un système d’intelligence de conception pour l’amont de l’architecture. Il ne s’agit ni d’auteur automatisé ni de génération d’images génériques. Il s’agit d’aider les équipes à lire un site plus clairement, à tester la faisabilité plus tôt et à garder visibles les signaux de coût, carbone, réglementation et contexte avant qu’une direction ne se fige.",
              "Nous voulons que la présentation ouvre une discussion plus large sur la façon dont l’IA peut soutenir le design sans l’aplatir : synthèse plus rapide, validation plus claire et plus d’espace pour le jugement architectural.",
            ],
          },
          {
            heading: "Pourquoi InDesCanada compte",
            paragraphs: [
              "Ce qui distingue InDesCanada, c’est son cadrage. Les documents publics décrivent un événement inaugural, mené par des étudiants, construit pour des retombées concrètes : des liens plus forts, une réflexion informée par la recherche et un parcours plus visible entre celles et ceux qui apprennent, dirigent déjà ou s’apprêtent à façonner la suite.",
              "L’événement dépasse aussi un public disciplinaire étroit. Ses organisateurs l’adressent aux designers industriels, aux étudiants gradués et aux professionnels de plusieurs disciplines qui veulent comprendre comment la recherche et la pensée design façonnent produits, services et systèmes. Cette portée élargie explique pourquoi Cocoon y a sa place.",
            ],
          },
          {
            heading: "Rendez-vous à Ottawa",
            paragraphs: [
              "InDesCanada est prévu le dimanche 3 mai 2026 au Richcraft Hall, à Ottawa. Nous avons hâte de rencontrer étudiants, chercheurs, praticiens et collaborateurs qui se soucient de l’avenir du design et de la place responsable des nouveaux outils.",
              "Si vous y êtes, venez nous voir. Nous serons heureux de montrer ce que Cocoon construit et d’entendre comment le travail de conception en amont évolue dans votre milieu.",
            ],
          },
        ],
        aside: [
          {
            title: "InDesCanada, Ottawa.",
            items: ["Dimanche 3 mai 2026", "De 10 h à 16 h 30", "Richcraft Hall, Ottawa", "Conférence, concours et réseautage"],
            links: [],
          },
          {
            title: "Suivre l’événement.",
            text: "Visitez le site de l’organisateur pour l’inscription et les mises à jour, ou revenez sur le blogue de Cocoon Lab pour d’autres annonces.",
            links: [
              { label: "Visiter InDesCanada", href: "https://indescanada.ca/" },
              { label: "Retour au blogue", href: "/blog/" },
            ],
          },
        ],
      },
    },
  },
  {
    id: "mila-partnership",
    path: "/blog/mila-partnership/",
    published: "2026-04-13",
    section: { en: "Partnerships", fr: "Partenariats" },
    content: {
      en: {
        title: "Cocoon Lab in partnership with Mila",
        dek: "Why the Mila partnership matters to Cocoon Lab, and how it supports the kind of architectural feasibility product we want Cocoon to be.",
        excerpt: "Why the Mila partnership matters to Cocoon Lab, and how it supports responsible AI product building around Cocoon.",
        body: [
          {
            heading: "Research depth in service of practice",
            paragraphs: [
              "At Cocoon Lab, we believe AI should strengthen architectural judgment, not replace it. That conviction is one reason our partnership with Mila matters to us.",
              "Mila brings research depth, rigor, and a serious culture of responsible AI. For Cocoon Lab, that partnership creates a strong context for building product systems that remain useful to architects, developers, and design teams at the earliest stages of a project.",
              "Our work on Cocoon focuses on site intelligence, cost visibility, carbon awareness, code and planning review, and clearer early-stage decisions. The partnership with Mila supports that direction by keeping us close to advanced thinking in machine learning while staying disciplined about real-world application.",
            ],
          },
          {
            heading: "What stays central",
            paragraphs: [
              "We are interested in AI that helps teams see more clearly: understand context, test constraints, and make better decisions before design is fixed. That means tools that are legible, grounded, and accountable to the realities of architecture and development practice.",
              "As Cocoon Lab grows, this partnership will continue to inform how we build: research-aware, design-respectful, and focused on better environments rather than automation for its own sake.",
            ],
          },
        ],
        aside: [
          {
            title: "Clearer foundations for Cocoon.",
            items: [
              "Stronger thinking around responsible and useful AI.",
              "Closer alignment between product development and research rigor.",
              "Clearer foundations for how Cocoon evolves over time.",
            ],
            links: [],
          },
          {
            title: "Continue the conversation.",
            text: "The role of Cocoon remains the same: support the people who design by making early-stage signals clearer, more structured, and easier to act on.",
            links: [
              { label: "Book a demo", href: "/contact/?intent=studio-demo#contact-form", primary: true },
              { label: "Back to blog", href: "/blog/" },
            ],
          },
        ],
      },
      fr: {
        title: "Cocoon Lab en partenariat avec Mila",
        dek: "Pourquoi le partenariat avec Mila compte pour Cocoon Lab et comment il soutient le type de produit de faisabilité architecturale que nous voulons construire avec Cocoon.",
        excerpt:
          "Pourquoi le partenariat avec Mila compte pour Cocoon Lab et comment il soutient une construction produit responsable autour de Cocoon.",
        body: [
          {
            heading: "La profondeur de recherche au service de la pratique",
            paragraphs: [
              "Chez Cocoon Lab, nous croyons que l’IA doit renforcer le jugement architectural, pas le remplacer. Cette conviction est l’une des raisons pour lesquelles notre partenariat avec Mila compte.",
              "Mila apporte profondeur de recherche, rigueur et une culture sérieuse de l’IA responsable. Pour Cocoon Lab, ce partenariat crée un contexte solide pour construire des systèmes utiles aux architectes, développeurs et équipes de conception dès les premières étapes d’un projet.",
              "Notre travail sur Cocoon porte sur l’intelligence de site, la visibilité des coûts, la conscience carbone, la revue du code et de la planification, et des décisions plus claires en amont. Le partenariat avec Mila soutient cette direction en nous gardant proches de la réflexion avancée en apprentissage machine tout en restant disciplinés sur l’application réelle.",
            ],
          },
          {
            heading: "Ce qui reste central",
            paragraphs: [
              "Nous nous intéressons à une IA qui aide les équipes à voir plus clairement : comprendre le contexte, tester les contraintes et prendre de meilleures décisions avant que le design ne soit fixé. Cela signifie des outils lisibles, ancrés et responsables face aux réalités de l’architecture et du développement.",
              "À mesure que Cocoon Lab grandit, ce partenariat continuera d’informer notre manière de construire : attentive à la recherche, respectueuse du design et centrée sur de meilleurs milieux plutôt que sur l’automatisation pour elle-même.",
            ],
          },
        ],
        aside: [
          {
            title: "Des fondations plus claires pour Cocoon.",
            items: [
              "Une réflexion plus solide sur une IA responsable et utile.",
              "Un meilleur alignement entre développement produit et rigueur de recherche.",
              "Des bases plus claires pour l’évolution de Cocoon.",
            ],
            links: [],
          },
          {
            title: "Poursuivre la conversation.",
            text: "Le rôle de Cocoon demeure le même : soutenir celles et ceux qui conçoivent en rendant les signaux en amont plus clairs, plus structurés et plus faciles à mettre en action.",
            links: [
              { label: "Réserver une démo", href: "/contact/?intent=studio-demo#contact-form", primary: true },
              { label: "Retour au blogue", href: "/blog/" },
            ],
          },
        ],
      },
    },
  },
];

const dates = {
  en: new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }),
  fr: new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }),
};

export const formatDate = (iso: string, locale: Locale) => dates[locale].format(new Date(`${iso}T00:00:00Z`));
