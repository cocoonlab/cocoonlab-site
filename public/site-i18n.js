(function () {
  const STORAGE_KEY = "cocoon_language";
  const locales = ["en", "fr"];

  const pageMeta = {
    "/404.html": {
      en: { title: "Page not found | Cocoon Lab", description: "The page you requested could not be found." },
      fr: { title: "Page introuvable | Cocoon Lab", description: "La page demandée est introuvable." },
    },
    "/blog/": {
      en: {
        title: "Blog | Cocoon Lab on Architectural Feasibility",
        description:
          "Read articles and updates from Cocoon Lab about Cocoon, architectural feasibility, responsible AI, events, and partnerships such as Mila.",
      },
      fr: {
        title: "Blogue | Cocoon Lab sur la faisabilité architecturale",
        description:
          "Articles et nouvelles de Cocoon Lab sur Cocoon, la faisabilité architecturale, l’IA responsable, les événements et les partenariats comme Mila.",
      },
    },
    "/blog/indescanada/": {
      en: {
        title: "Cocoon at InDesCanada | Cocoon Lab",
        description: "Rashid Mushkani will present Cocoon at InDesCanada in Ottawa.",
      },
      fr: {
        title: "Cocoon à InDesCanada | Cocoon Lab",
        description: "Rashid Mushkani présentera Cocoon à InDesCanada, à Ottawa.",
      },
    },
    "/blog/mila-partnership/": {
      en: {
        title: "Cocoon Lab in partnership with Mila | Cocoon Lab",
        description: "Why the Mila partnership matters to Cocoon Lab and Cocoon.",
      },
      fr: {
        title: "Cocoon Lab en partenariat avec Mila | Cocoon Lab",
        description: "Pourquoi le partenariat avec Mila compte pour Cocoon Lab et Cocoon.",
      },
    },
    "/contact/": {
      en: {
        title: "Contact | Cocoon Lab",
        description: "Book a demo, ask a question, or bring a real site for Cocoon to test.",
      },
      fr: {
        title: "Contact | Cocoon Lab",
        description: "Réservez une démo, posez une question ou apportez un vrai site à tester avec Cocoon.",
      },
    },
    "/monograph/": {
      en: {
        title: "Monograph | Cocoon Lab",
        description: "Read the Cocoon monograph: the thesis, ideals, and founding position behind Cocoon by Cocoon Lab.",
      },
      fr: {
        title: "Manifeste | Cocoon Lab",
        description: "Lire le manifeste de Cocoon : la thèse, les valeurs et la position fondatrice derrière Cocoon par Cocoon Lab.",
      },
    },
    "/partners/": {
      en: {
        title: "Partners | Cocoon Lab",
        description: "Meet the partners connected to Cocoon Lab and Cocoon.",
      },
      fr: {
        title: "Partenaires | Cocoon Lab",
        description: "Découvrez les partenaires liés à Cocoon Lab et Cocoon.",
      },
    },
    "/press-kit/": {
      en: {
        title: "Press Kit | Cocoon Lab",
        description:
          "Download the official Cocoon Lab press kit with logos, lockups, glyphs, color tokens, typography direction, social cards, favicons, and imagery.",
      },
      fr: {
        title: "Kit média | Cocoon Lab",
        description:
          "Téléchargez le kit média officiel de Cocoon Lab avec logos, compositions, glyphes, couleurs, typographie, cartes sociales, favicons et images.",
      },
    },
    "/privacy/": {
      en: {
        title: "Privacy Policy | Cocoon Lab",
        description: "How Cocoon Lab handles inquiries, demo requests for Cocoon, site data, and communication through cocoonlab.ai.",
      },
      fr: {
        title: "Politique de confidentialité | Cocoon Lab",
        description: "Comment Cocoon Lab traite les demandes, les démonstrations de Cocoon, les données de site et les communications.",
      },
    },
    "/studio/": {
      en: {
        title: "Studio | Cocoon Lab",
        description: "Upload a site, compare early options, and see fit, cost, carbon, and planning risks before design is fixed.",
      },
      fr: {
        title: "Studio | Cocoon Lab",
        description: "Importez un site, comparez des options et voyez la forme, le coût, le carbone et les risques avant de fixer le design.",
      },
    },
    "/team/": {
      en: {
        title: "Team | Cocoon Lab",
        description: "Meet the Cocoon Lab team building Cocoon for architects and early-stage feasibility workflows.",
      },
      fr: {
        title: "Équipe | Cocoon Lab",
        description: "Rencontrez l’équipe de Cocoon Lab qui construit Cocoon pour les architectes et les flux de faisabilité en amont.",
      },
    },
    "/terms/": {
      en: {
        title: "Terms of Service | Cocoon Lab",
        description: "Terms for accessing and using the Cocoon Lab website and materials about Cocoon.",
      },
      fr: {
        title: "Conditions d’utilisation | Cocoon Lab",
        description: "Conditions d’accès et d’utilisation du site Cocoon Lab et des documents concernant Cocoon.",
      },
    },
  };

  const textFr = {
    "Book a demo": "Réserver une démo",
    "Cookie Preferences": "Préférences de témoins",
    "Privacy": "Confidentialité",
    "Terms": "Conditions",
    "Studio": "Studio",
    "Contact": "Contact",
    "Press Kit": "Kit média",
    "Partners": "Partenaires",
    "Team": "Équipe",
    "Blog": "Blogue",
    "© 2026 Cocoon Lab. Cocoon is built for the architect.": "© 2026 Cocoon Lab. Cocoon est conçu pour l’architecte.",
    "This page does not exist.": "Cette page n’existe pas.",
    "The link may be outdated, or the page may have moved. You can return to the homepage to keep exploring Cocoon.":
      "Le lien est peut-être périmé ou la page a été déplacée. Vous pouvez revenir à l’accueil pour continuer à explorer Cocoon.",
    "Go back to cocoonlab.ai": "Retourner à cocoonlab.ai",
    "Contact Cocoon Lab": "Contacter Cocoon Lab",
    "Cocoon Studio": "Studio Cocoon",
    "Upload a site, compare early options, and see fit, cost, carbon, and planning risks before design is fixed.":
      "Importez un site, comparez des options en amont et voyez la forme, le coût, le carbone et les risques avant de fixer le design.",
    "See the whole picture": "Voir l’ensemble",
    "Cocoon reads site, cost, carbon, rules, and visuals together so teams can see tradeoffs in one place.":
      "Cocoon lit ensemble le site, le coût, le carbone, les règles et les visuels afin que l’équipe voie les compromis au même endroit.",
    "Compare options quickly": "Comparer vite les options",
    "Test different site ideas early, while changes are still easy.":
      "Testez tôt différentes idées de site, quand les changements sont encore simples.",
    "Decide with evidence": "Décider avec des preuves",
    "Cocoon keeps constraints, tradeoffs, and opportunities clear so architects can choose the next step.":
      "Cocoon garde les contraintes, compromis et occasions clairs afin que les architectes choisissent la prochaine étape.",
    "What you bring": "Ce que vous apportez",
    "Surveys, planning documents, sketches, massing studies, and team knowledge.":
      "Relevés, documents d’urbanisme, croquis, études de volumétrie et connaissances d’équipe.",
    "What Cocoon checks": "Ce que Cocoon vérifie",
    "Site context, budget, carbon, rules, access, and visual fit.":
      "Contexte du site, budget, carbone, règles, accès et forme visuelle.",
    "What you get": "Ce que vous obtenez",
    "Clean 3D models, simple reports, and realistic previews for the next conversation.":
      "Des modèles 3D propres, des rapports simples et des aperçus réalistes pour la prochaine discussion.",
    "Contact": "Contact",
    "Book a demo, ask a question, or bring a real site for Cocoon to test.":
      "Réservez une démo, posez une question ou apportez un vrai site à tester avec Cocoon.",
    "Contact details": "Coordonnées",
    "Email": "Courriel",
    "Location": "Localisation",
    "Montreal, QC Canada": "Montréal, QC Canada",
    "Focus": "Priorités",
    "Demos, partnerships, and product questions about Cocoon.":
      "Démos, partenariats et questions produit sur Cocoon.",
    "Tell us about your team, project, and timeline so we can prepare the right demo.":
      "Parlez-nous de votre équipe, de votre projet et du calendrier afin de préparer la bonne démo.",
    "Name": "Nom",
    "Email address": "Adresse courriel",
    "Company": "Organisation",
    "Project": "Projet",
    "Project / site context": "Contexte du projet ou du site",
    "Preferred Timing": "Moment souhaité",
    "Preferred timing": "Moment souhaité",
    "Message": "Message",
    "Website": "Site web",
    "Send message": "Envoyer le message",
    "Messages go straight to Cocoon Lab.": "Les messages vont directement à Cocoon Lab.",
    "Privacy Policy": "Politique de confidentialité",
    "How Cocoon Lab handles information shared through cocoonlab.ai when you contact us, request a demo of Cocoon, or begin a conversation.":
      "Comment Cocoon Lab traite les informations partagées sur cocoonlab.ai lorsque vous nous contactez, demandez une démo de Cocoon ou entamez une conversation.",
    "1. Data Collection": "1. Collecte des données",
    "Cocoon Lab may receive information you choose to share through cocoonlab.ai, including your name, email address, company, role, project details, and any other context provided when you contact us or request a demo of Cocoon.":
      "Cocoon Lab peut recevoir les informations que vous choisissez de partager sur cocoonlab.ai, notamment votre nom, adresse courriel, organisation, rôle, détails de projet et tout autre contexte fourni lors d’un contact ou d’une demande de démo.",
    "2. Essential Cookies": "2. Témoins essentiels",
    "Cocoon Lab currently uses only essential first-party cookies required to operate this website and remember your cookie preference. We do not set advertising, retargeting, or analytics cookies. The cookie preference record is stored for 180 days, then the site asks again. If you choose French or English, that language preference may be stored locally in your browser to keep the site readable on later visits.":
      "Cocoon Lab utilise actuellement uniquement des témoins essentiels de première partie nécessaires au fonctionnement du site et à la mémorisation de votre préférence. Nous n’utilisons pas de témoins publicitaires, de reciblage ou d’analytique. La préférence est conservée 180 jours, puis le site redemande votre choix. Si vous choisissez le français ou l’anglais, cette préférence de langue peut être stockée localement dans votre navigateur afin de garder le site lisible lors de visites ultérieures.",
    "3. How Information Is Used": "3. Utilisation des informations",
    "We use submitted information to respond to your inquiry, continue a conversation you initiated, evaluate whether Cocoon is relevant to your team or project, and maintain the security and reliability of this website and related communications.":
      "Nous utilisons les informations soumises pour répondre à votre demande, poursuivre une conversation initiée par vous, évaluer la pertinence de Cocoon pour votre équipe ou projet et maintenir la sécurité et la fiabilité du site et des communications.",
    "4. Sharing and Retention": "4. Partage et conservation",
    "Cocoon Lab does not sell personal information. Information may be processed by trusted service providers involved in hosting, email, infrastructure, or security, only to the extent reasonably necessary to operate the site and support legitimate business communication. We retain correspondence for as long as it remains operationally useful or legally required.":
      "Cocoon Lab ne vend pas de renseignements personnels. Des prestataires de confiance liés à l’hébergement, au courriel, à l’infrastructure ou à la sécurité peuvent traiter certaines informations uniquement dans la mesure nécessaire au fonctionnement du site et aux communications légitimes. Nous conservons la correspondance tant qu’elle demeure utile sur le plan opérationnel ou légalement requise.",
    "5. Security": "5. Sécurité",
    "We use reasonable technical and operational measures to protect information shared through this website. No internet-based system can guarantee absolute security, so if you need to share especially sensitive material, contact us first and we can agree on an appropriate channel.":
      "Nous utilisons des mesures techniques et opérationnelles raisonnables pour protéger les informations partagées sur ce site. Aucun système en ligne ne peut garantir une sécurité absolue ; si vous devez partager du contenu particulièrement sensible, contactez-nous d’abord afin de convenir d’un canal approprié.",
    "6. Your Choices": "6. Vos choix",
    "You can contact rashid@cocoonlab.ai to ask what information you have shared with Cocoon Lab, request correction of inaccurate details, or request deletion where appropriate.":
      "Vous pouvez écrire à rashid@cocoonlab.ai pour demander quelles informations vous avez partagées avec Cocoon Lab, corriger des renseignements inexacts ou demander leur suppression lorsque cela est approprié.",
    "Last updated: April 30, 2026. For privacy questions, please contact Cocoon Lab directly.":
      "Dernière mise à jour : 30 avril 2026. Pour toute question de confidentialité, contactez directement Cocoon Lab.",
    "Terms of Service": "Conditions d’utilisation",
    "Terms for using cocoonlab.ai and engaging with materials, communications, and demo requests related to Cocoon and Cocoon Lab.":
      "Conditions d’utilisation de cocoonlab.ai et des contenus, communications et demandes de démo liés à Cocoon et Cocoon Lab.",
    "1. Acceptance of Terms": "1. Acceptation des conditions",
    "By accessing cocoonlab.ai, you agree to be bound by these terms. This website exists to explain Cocoon, the product built by Cocoon Lab, and to support legitimate communication with interested teams, partners, and clients.":
      "En accédant à cocoonlab.ai, vous acceptez ces conditions. Ce site présente Cocoon, le produit construit par Cocoon Lab, et soutient les échanges légitimes avec les équipes, partenaires et clients intéressés.",
    "2. Use of the Site": "2. Utilisation du site",
    "You may browse, read, and contact Cocoon Lab through this website. You may not misuse the site, interfere with its operation, or attempt to access systems that are not intentionally made public.":
      "Vous pouvez consulter le site et contacter Cocoon Lab. Vous ne pouvez pas en faire un usage abusif, perturber son fonctionnement ou tenter d’accéder à des systèmes non rendus publics.",
    "3. Content and License": "3. Contenu et licence",
    "The text, brand elements, layouts, and materials on this site belong to Cocoon Lab unless stated otherwise. They are provided to help explain Cocoon and may not be reused in a way that implies ownership, endorsement, or affiliation without permission.":
      "Les textes, éléments de marque, mises en page et contenus de ce site appartiennent à Cocoon Lab sauf indication contraire. Ils servent à expliquer Cocoon et ne peuvent être réutilisés d’une façon qui suggère propriété, approbation ou affiliation sans autorisation.",
    "4. Disclaimer": "4. Avis de non-responsabilité",
    "Content on this site is provided for general information only. Cocoon Lab may update, change, or remove content at any time as the product, company, and services evolve.":
      "Le contenu de ce site est fourni à titre informatif. Cocoon Lab peut le modifier, le mettre à jour ou le retirer à tout moment à mesure que le produit, l’entreprise et les services évoluent.",
    "5. Liability and Updates": "5. Responsabilité et mises à jour",
    "To the fullest extent permitted by law, Cocoon Lab is not liable for indirect, incidental, special, or consequential damages arising from use of this website. These terms may be updated periodically, and continued use of the site means you accept the updated terms.":
      "Dans la pleine mesure permise par la loi, Cocoon Lab n’est pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs liés à l’utilisation du site. Ces conditions peuvent être mises à jour périodiquement ; l’utilisation continue du site vaut acceptation des conditions mises à jour.",
    "Cocoon by Cocoon Lab": "Cocoon par Cocoon Lab",
    "Cocoon Lab builds design intelligence for the earliest stages of architecture. We transform fragmented inputs into clear, structured signals so teams can understand constraints, reveal opportunities, and make confident decisions before design is fixed.":
      "Cocoon Lab construit une intelligence de conception pour les premières étapes de l’architecture. Nous transformons des données fragmentées en signaux clairs et structurés afin que les équipes comprennent les contraintes, révèlent les occasions et décident avec confiance avant que le design ne soit figé.",
    "Thesis": "Thèse",
    "Cocoon Lab builds design intelligence for the earliest stages of architecture.": "Cocoon Lab construit une intelligence de conception pour les premières étapes de l’architecture.",
    "We transform fragmented inputs into clear, structured signals so teams can understand constraints, reveal opportunities, and make confident decisions before design is fixed.":
      "Nous transformons des données fragmentées en signaux clairs et structurés afin que les équipes comprennent les contraintes, révèlent les occasions et décident avec confiance avant que le design ne soit figé.",
    "We do not generate architecture.": "Nous ne générons pas l’architecture.",
    "We support the people who do.": "Nous soutenons celles et ceux qui la conçoivent.",
    "Ideals": "Principes",
    "Architects remain the authors": "Les architectes demeurent les auteurs",
    "Our tools strengthen judgment and process without replacing creative agency.": "Nos outils renforcent le jugement et le processus sans remplacer l’agence créative.",
    "Context comes first": "Le contexte d’abord",
    "Site, history, culture, and lived experience are the foundation of meaningful design.":
      "Le site, l’histoire, la culture et l’expérience vécue fondent une conception significative.",
    "Clarity is essential": "La clarté est essentielle",
    "Information must be visible, structured, and immediately usable.": "L’information doit être visible, structurée et immédiatement utilisable.",
    "Validation over generation": "La validation avant la génération",
    "We focus on understanding, testing, and decision-making, not producing generic outputs.":
      "Nous nous concentrons sur la compréhension, les tests et la décision, non sur la production de sorties génériques.",
    "Time should return to design": "Le temps doit revenir au design",
    "Efficiency is valuable only when it allows deeper thinking and better environments.":
      "L’efficacité n’a de valeur que si elle permet une pensée plus profonde et de meilleurs milieux.",
    "Monograph": "Manifeste",
    "Cocoon Lab was founded in 2025 by Rashid Mushkani, Hugo Berard, and Shin Koseki.":
      "Cocoon Lab a été fondé en 2025 par Rashid Mushkani, Hugo Berard et Shin Koseki.",
    "It emerged from years of work alongside creative professionals, architectural firms, and community organizations in Montreal. During this time, a consistent pattern became clear: the earliest stages of a project carry the greatest impact, yet they are often shaped through incomplete information, shifting constraints, and limited time.":
      "Il est né de plusieurs années de travail aux côtés de professionnels créatifs, de firmes d’architecture et d’organisations communautaires à Montréal. Une tendance claire s’est imposée : les premières étapes d’un projet portent le plus grand impact, mais elles sont souvent façonnées par une information incomplète, des contraintes mouvantes et un temps limité.",
    "Critical decisions are made before the full context is understood.": "Les décisions critiques sont prises avant que le contexte complet soit compris.",
    "Cocoon Lab was created to address this moment.": "Cocoon Lab a été créé pour répondre à ce moment.",
    "We build tools that transform drawings, site data, planning documents, and team knowledge into structured, visual intelligence. By making constraints, costs, environmental impact, and regulatory conditions legible from the start, we help teams move from uncertainty to clarity.":
      "Nous construisons des outils qui transforment dessins, données de site, documents d’urbanisme et connaissances d’équipe en intelligence visuelle structurée. En rendant contraintes, coûts, impact environnemental et conditions réglementaires lisibles dès le départ, nous aidons les équipes à passer de l’incertitude à la clarté.",
    "Our position is deliberate.": "Notre position est délibérée.",
    "We do not believe architecture should be generated by artificial systems. We reject the idea that design can be reduced to automated outputs. Architecture is shaped by context, by culture, by people, and by experience. It requires interpretation, intention, and responsibility.":
      "Nous ne croyons pas que l’architecture doive être générée par des systèmes artificiels. Nous rejetons l’idée que le design puisse être réduit à des sorties automatisées. L’architecture est façonnée par le contexte, la culture, les personnes et l’expérience. Elle exige interprétation, intention et responsabilité.",
    "AI should not replace that process.": "L’IA ne doit pas remplacer ce processus.",
    "It should support it.": "Elle doit le soutenir.",
    "Cocoon Lab exists to extend the capacity of architects and development teams. By reducing friction in early-stage workflows, we create space for deeper thinking, stronger collaboration, and more deliberate design decisions.":
      "Cocoon Lab existe pour étendre la capacité des architectes et des équipes de développement. En réduisant les frictions des flux de travail en amont, nous créons de l’espace pour une réflexion plus profonde, une collaboration plus forte et des décisions de conception plus délibérées.",
    "Time saved is not the end goal.": "Le temps gagné n’est pas l’objectif final.",
    "Better environments are.": "De meilleurs milieux le sont.",
    "The future of architecture will not be defined by automation alone, but by how well we equip those who design. Cocoon Lab is built to support that future.":
      "L’avenir de l’architecture ne sera pas défini par l’automatisation seule, mais par la qualité des outils que nous donnons à celles et ceux qui conçoivent. Cocoon Lab est construit pour soutenir cet avenir.",
    "The Team": "L’équipe",
    "Cocoon Lab is a small team of designers, planners, and AI researchers building tools for early architecture decisions.":
      "Cocoon Lab est une petite équipe de designers, planificateurs et chercheurs en IA qui construit des outils pour les premières décisions architecturales.",
    "Co-founder": "Cofondateur",
    "Built from practice.": "Issu de la pratique.",
    "Cocoon Lab emerged from work alongside creative professionals, architectural firms, and community organizations in Montreal. That background keeps Cocoon focused on real decisions, real constraints, and real studio workflows.":
      "Cocoon Lab est né d’un travail aux côtés de professionnels créatifs, de firmes d’architecture et d’organisations communautaires à Montréal. Cet ancrage garde Cocoon centré sur de vraies décisions, de vraies contraintes et de vrais flux de studio.",
    "Partners": "Partenaires",
    "Partner": "Partenaire",
    "Cocoon Lab builds Cocoon with partners who keep the product close to research rigor, design practice, and real project conditions.":
      "Cocoon Lab construit Cocoon avec des partenaires qui gardent le produit proche de la rigueur de recherche, de la pratique du design et des conditions réelles de projet.",
    "Mila brings research rigor, responsible AI thinking, and a strong technical foundation to the broader context in which Cocoon is being built.":
      "Mila apporte une rigueur de recherche, une réflexion sur l’IA responsable et une base technique solide au contexte dans lequel Cocoon est construit.",
    "Core Partner": "Partenaire principal",
    "Partner announcement pending": "Annonce de partenaire à venir",
    "Coming Soon": "Bientôt",
    "A future partner profile will appear here once it is ready to be public.":
      "Un futur profil partenaire apparaîtra ici lorsqu’il sera prêt à être public.",
    "Civiliti contributes a civic and urban systems perspective that aligns with clearer planning, feasibility, and public-facing decision-making at the earliest project stages.":
      "Civiliti apporte une perspective civique et urbaine qui s’aligne avec une planification, une faisabilité et des décisions publiques plus claires dès les premières étapes du projet.",
    "Sid Lee Architecture brings practice-based design insight that keeps Cocoon connected to authorship, architectural judgment, and the real needs of early-stage workflow.":
      "Sid Lee Architecture apporte une lecture issue de la pratique qui garde Cocoon lié à l’auteur, au jugement architectural et aux besoins réels du travail en amont.",
    "Why these relationships matter": "Pourquoi ces relations comptent",
    "Together, these partners help Cocoon stay research-aware, architect-led, and grounded in real decisions rather than generic automation.":
      "Ensemble, ces partenaires aident Cocoon à rester informé par la recherche, guidé par les architectes et ancré dans de vraies décisions plutôt que dans une automatisation générique.",
    "Cocoon Lab brand assets.": "Actifs de marque Cocoon Lab.",
    "Download the official Cocoon Lab press kit for approved use in press, partner, event, and product references.":
      "Téléchargez le kit média officiel de Cocoon Lab pour les usages approuvés dans la presse, les partenariats, les événements et les références produit.",
    "Download ZIP": "Télécharger le ZIP",
    "Read usage notes": "Lire les notes d’usage",
    "Use cleanly.": "Utiliser proprement.",
    "Use the assets as provided. Do not redraw, stretch, recolor outside the approved palette, or place marks on low-contrast backgrounds. For unusual uses, contact Cocoon Lab before publishing.":
      "Utilisez les actifs tels que fournis. Ne les redessinez pas, ne les étirez pas, ne les recolorez pas hors de la palette approuvée et ne les placez pas sur des fonds à faible contraste. Pour tout usage particulier, contactez Cocoon Lab avant publication.",
    "Updates": "Nouvelles",
    "News and notes from Cocoon Lab about Cocoon, events, partners, and early design decisions.":
      "Nouvelles et notes de Cocoon Lab sur Cocoon, les événements, les partenaires et les décisions de design en amont.",
    "Cocoon at InDesCanada": "Cocoon à InDesCanada",
    "Cocoon Lab in partnership with Mila": "Cocoon Lab en partenariat avec Mila",
    "Rashid Mushkani will present Cocoon at InDesCanada in Ottawa, a student-led industrial design conference, competition, and networking event.":
      "Rashid Mushkani présentera Cocoon à InDesCanada, à Ottawa, lors d’un événement étudiant de design industriel combinant conférence, concours et réseautage.",
    "The post looks at why Cocoon belongs in that conversation and what we hope to contribute around early-stage design intelligence.":
      "L’article explique pourquoi Cocoon a sa place dans cette conversation et ce que nous souhaitons apporter à l’intelligence de conception en amont.",
    "Why the Mila partnership matters to Cocoon Lab, and how it supports responsible AI product building around Cocoon.":
      "Pourquoi le partenariat avec Mila compte pour Cocoon Lab et comment il soutient une construction produit responsable autour de Cocoon.",
    "Stay updated.": "Rester à jour.",
    "Follow the feed or contact Cocoon Lab to keep the conversation going.":
      "Suivez le fil ou contactez Cocoon Lab pour poursuivre la conversation.",
    "Back to blog": "Retour au blogue",
    "Why we’re showing up": "Pourquoi nous y participons",
    "What Rashid will present": "Ce que Rashid présentera",
    "Why InDesCanada matters": "Pourquoi InDesCanada compte",
    "See you in Ottawa": "Rendez-vous à Ottawa",
    "Rashid Mushkani will present Cocoon in Ottawa at InDesCanada, a student-led industrial design conference, competition, and networking event built to connect emerging talent, academia, and industry.":
      "Rashid Mushkani présentera Cocoon à Ottawa lors d’InDesCanada, un événement étudiant de design industriel, de concours et de réseautage conçu pour relier les talents émergents, le milieu académique et l’industrie.",
    "Cocoon is built for the earliest stages of architecture, where context is incomplete, timelines are compressed, and the most important decisions are often made before the full picture is visible. That makes design conversation especially important.":
      "Cocoon est conçu pour les toutes premières étapes de l’architecture, là où le contexte est incomplet, les délais sont comprimés et les décisions les plus importantes sont souvent prises avant que l’ensemble soit visible. C’est pourquoi la conversation de design est essentielle.",
    "InDesCanada feels like the right room for that conversation. The event is positioned by its organizers as a student-led industrial design conference, competition, and networking platform intended to bring emerging Canadian design talent into direct exchange with academia and industry. That ambition aligns closely with how we think about practice: serious design work improves when different forms of intelligence meet early.":
      "InDesCanada est le bon lieu pour cette conversation. Les organisateurs le présentent comme une plateforme étudiante de conférence, concours et réseautage en design industriel, destinée à mettre les talents canadiens émergents en relation directe avec le milieu académique et l’industrie. Cette ambition rejoint notre vision : le travail de conception sérieux s’améliore lorsque différentes formes d’intelligence se rencontrent tôt.",
    "Rashid will present Cocoon as a design intelligence system for the front end of architecture. The focus is not automated authorship and not generic image generation. It is about helping teams read a site more clearly, test feasibility earlier, and keep cost, carbon, regulatory, and contextual signals visible before a direction hardens into a fixed proposal.":
      "Rashid présentera Cocoon comme un système d’intelligence de conception pour l’amont de l’architecture. Il ne s’agit ni d’auteur automatisé ni de génération d’images génériques. Il s’agit d’aider les équipes à lire un site plus clairement, à tester la faisabilité plus tôt et à garder visibles les signaux de coût, carbone, réglementation et contexte avant qu’une direction ne se fige.",
    "We want the presentation to open a broader discussion about how AI can support design without flattening it: faster synthesis, clearer validation, and more room for architectural judgment.":
      "Nous voulons que la présentation ouvre une discussion plus large sur la façon dont l’IA peut soutenir le design sans l’aplatir : synthèse plus rapide, validation plus claire et plus d’espace pour le jugement architectural.",
    "What stands out about InDesCanada is its framing. Public event materials describe it as an inaugural, student-led event built for real outcomes: stronger connections, research-informed thinking, and a more visible path between people who are learning, people who are already leading, and people who are about to shape what comes next.":
      "Ce qui distingue InDesCanada, c’est son cadrage. Les documents publics décrivent un événement inaugural, mené par des étudiants, construit pour des retombées concrètes : des liens plus forts, une réflexion informée par la recherche et un parcours plus visible entre celles et ceux qui apprennent, dirigent déjà ou s’apprêtent à façonner la suite.",
    "The event also reaches beyond a narrow disciplinary audience. Its organizers explicitly position it for industrial designers, graduate students, and professionals across disciplines who want to understand how design research and design thinking shape products, services, and systems. That broader lens is part of why Cocoon belongs there.":
      "L’événement dépasse aussi un public disciplinaire étroit. Ses organisateurs l’adressent aux designers industriels, aux étudiants gradués et aux professionnels de plusieurs disciplines qui veulent comprendre comment la recherche et la pensée design façonnent produits, services et systèmes. Cette portée élargie explique pourquoi Cocoon y a sa place.",
    "InDesCanada is scheduled for Sunday, May 3, 2026 at Richcraft Hall in Ottawa. We’re looking forward to meeting students, researchers, practitioners, and collaborators who care about where design is heading and how new tools should responsibly fit into that future.":
      "InDesCanada est prévu le dimanche 3 mai 2026 au Richcraft Hall, à Ottawa. Nous avons hâte de rencontrer étudiants, chercheurs, praticiens et collaborateurs qui se soucient de l’avenir du design et de la place responsable des nouveaux outils.",
    "If you’ll be there, come find us. We’d love to show what Cocoon is building and hear how early-stage design work is changing in your world.":
      "Si vous y êtes, venez nous voir. Nous serons heureux de montrer ce que Cocoon construit et d’entendre comment le travail de conception en amont évolue dans votre milieu.",
    "Conference, competition, and networking": "Conférence, concours et réseautage",
    "Follow the event.": "Suivre l’événement.",
    "Visit the organizer site for registration and event updates, or come back to the Cocoon Lab blog for more announcements.":
      "Visitez le site de l’organisateur pour l’inscription et les mises à jour, ou revenez sur le blogue de Cocoon Lab pour d’autres annonces.",
    "Visit InDesCanada": "Visiter InDesCanada",
    "Research depth in service of practice": "La profondeur de recherche au service de la pratique",
    "What stays central": "Ce qui reste central",
    "Why the Mila partnership matters to Cocoon Lab, and how it supports the kind of architectural feasibility product we want Cocoon to be.":
      "Pourquoi le partenariat avec Mila compte pour Cocoon Lab et comment il soutient le type de produit de faisabilité architecturale que nous voulons construire avec Cocoon.",
    "At Cocoon Lab, we believe AI should strengthen architectural judgment, not replace it. That conviction is one reason our partnership with Mila matters to us.":
      "Chez Cocoon Lab, nous croyons que l’IA doit renforcer le jugement architectural, pas le remplacer. Cette conviction est l’une des raisons pour lesquelles notre partenariat avec Mila compte.",
    "Mila brings research depth, rigor, and a serious culture of responsible AI. For Cocoon Lab, that partnership creates a strong context for building product systems that remain useful to architects, developers, and design teams at the earliest stages of a project.":
      "Mila apporte profondeur de recherche, rigueur et une culture sérieuse de l’IA responsable. Pour Cocoon Lab, ce partenariat crée un contexte solide pour construire des systèmes utiles aux architectes, développeurs et équipes de conception dès les premières étapes d’un projet.",
    "Our work on Cocoon focuses on site intelligence, cost visibility, carbon awareness, code and planning review, and clearer early-stage decisions. The partnership with Mila supports that direction by keeping us close to advanced thinking in machine learning while staying disciplined about real-world application.":
      "Notre travail sur Cocoon porte sur l’intelligence de site, la visibilité des coûts, la conscience carbone, la revue du code et de la planification, et des décisions plus claires en amont. Le partenariat avec Mila soutient cette direction en nous gardant proches de la réflexion avancée en apprentissage machine tout en restant disciplinés sur l’application réelle.",
    "We are interested in AI that helps teams see more clearly: understand context, test constraints, and make better decisions before design is fixed. That means tools that are legible, grounded, and accountable to the realities of architecture and development practice.":
      "Nous nous intéressons à une IA qui aide les équipes à voir plus clairement : comprendre le contexte, tester les contraintes et prendre de meilleures décisions avant que le design ne soit fixé. Cela signifie des outils lisibles, ancrés et responsables face aux réalités de l’architecture et du développement.",
    "As Cocoon Lab grows, this partnership will continue to inform how we build: research-aware, design-respectful, and focused on better environments rather than automation for its own sake.":
      "À mesure que Cocoon Lab grandit, ce partenariat continuera d’informer notre manière de construire : attentive à la recherche, respectueuse du design et centrée sur de meilleurs milieux plutôt que sur l’automatisation pour elle-même.",
    "Clearer foundations for Cocoon.": "Des fondations plus claires pour Cocoon.",
    "Stronger thinking around responsible and useful AI.": "Une réflexion plus solide sur une IA responsable et utile.",
    "Closer alignment between product development and research rigor.": "Un meilleur alignement entre développement produit et rigueur de recherche.",
    "Clearer foundations for how Cocoon evolves over time.": "Des bases plus claires pour l’évolution de Cocoon.",
    "Continue the conversation.": "Poursuivre la conversation.",
    "The role of Cocoon remains the same: support the people who design by making early-stage signals clearer, more structured, and easier to act on.":
      "Le rôle de Cocoon demeure le même : soutenir celles et ceux qui conçoivent en rendant les signaux en amont plus clairs, plus structurés et plus faciles à mettre en action.",
  };

  const attrFr = {
    "Cocoon home": "Accueil Cocoon",
    "Contact details": "Coordonnées",
    "Headshot of Rashid Mushkani": "Portrait de Rashid Mushkani",
    "Headshot of Hugo Berard": "Portrait de Hugo Berard",
    "Headshot of Shin Koseki": "Portrait de Shin Koseki",
    "Your Name": "Votre nom",
    "you@company.com": "vous@organisation.com",
    "Your Company": "Votre organisation",
    "Project or site context": "Contexte du projet ou du site",
    "When would you like the demo?": "Quel moment vous conviendrait pour la démo ?",
    "How can we help?": "Comment pouvons-nous aider ?",
    "Tell us about your team, project, and what you’d like to see in the demo.":
      "Parlez-nous de votre équipe, de votre projet et de ce que vous souhaitez voir dans la démo.",
    "Partner announcement pending": "Annonce de partenaire à venir",
  };

  function normalizePath(pathname) {
    if (pathname.endsWith("/index.html")) {
      return pathname.slice(0, -"index.html".length);
    }
    if (pathname.endsWith(".html")) {
      return pathname;
    }
    return pathname.endsWith("/") ? pathname : `${pathname}/`;
  }

  function getStoredLocale() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredLocale(locale) {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* Ignore storage failures. */
    }
  }

  function resolveLocale() {
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    if (locales.includes(requestedLocale)) {
      setStoredLocale(requestedLocale);
      return requestedLocale;
    }

    const storedLocale = getStoredLocale();
    if (locales.includes(storedLocale)) {
      return storedLocale;
    }

    return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
  }

  function addOrUpdateMeta(selector, content) {
    const node = document.querySelector(selector);
    if (node && content) {
      node.setAttribute("content", content);
    }
  }

  function updateMetadata(locale) {
    const path = normalizePath(window.location.pathname);
    const meta = pageMeta[path]?.[locale] || pageMeta[path.replace(/\/$/, "/index.html")]?.[locale];

    if (!meta) {
      return;
    }

    document.title = meta.title;
    addOrUpdateMeta('meta[name="description"]', meta.description);
    addOrUpdateMeta('meta[property="og:title"]', meta.title);
    addOrUpdateMeta('meta[property="og:description"]', meta.description);
    addOrUpdateMeta('meta[name="twitter:title"]', meta.title);
    addOrUpdateMeta('meta[name="twitter:description"]', meta.description);
  }

  function translateTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "SVG"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const original = node.nodeValue;
      const normalized = original.replace(/\s+/g, " ").trim();
      const translated = textFr[normalized];
      if (!translated) {
        return;
      }

      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    });
  }

  function translateAttributes() {
    document.querySelectorAll("[aria-label], [alt], [placeholder], [title]").forEach((element) => {
      ["aria-label", "alt", "placeholder", "title"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value && attrFr[value]) {
          element.setAttribute(attribute, attrFr[value]);
        }
      });
    });
  }

  function createLanguageSwitcher(locale) {
    if (document.querySelector("[data-language-switcher]")) {
      return;
    }

    const switcher = document.createElement("nav");
    switcher.className = "site-language-switcher";
    switcher.dataset.languageSwitcher = "true";
    switcher.setAttribute("aria-label", locale === "fr" ? "Choisir la langue" : "Choose language");
    switcher.innerHTML = locales
      .map(
        (item) =>
          `<button type="button" data-locale="${item}" aria-pressed="${locale === item}">${item.toUpperCase()}</button>`,
      )
      .join("");

    switcher.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-locale]") : null;
      const nextLocale = button?.getAttribute("data-locale");
      if (!locales.includes(nextLocale)) {
        return;
      }
      setStoredLocale(nextLocale);
      window.dispatchEvent(new CustomEvent("cocoon:language-change", { detail: { locale: nextLocale } }));
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("lang", nextLocale);
      window.location.assign(nextUrl.toString());
    });

    const topbarCta = document.querySelector(".page-topbar-cta");
    if (topbarCta) {
      topbarCta.before(switcher);
    }
  }

  function applyLocale(locale) {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
    document.body.dataset.locale = locale;
    updateMetadata(locale);
    document.querySelectorAll(".home-link").forEach((link) => {
      link.dataset.homeLabel = locale === "fr" ? "Accueil" : "Home";
      link.setAttribute("title", locale === "fr" ? "Accueil Cocoon" : "Cocoon home");
      link.setAttribute("aria-label", locale === "fr" ? "Retour à l’accueil Cocoon" : "Back to Cocoon home");
    });
    createLanguageSwitcher(locale);

    if (locale === "fr") {
      translateTextNodes();
      translateAttributes();
    }
  }

  const locale = resolveLocale();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyLocale(locale), { once: true });
  } else {
    applyLocale(locale);
  }
})();
