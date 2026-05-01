import { motion } from "motion/react";
import {
  Map,
  Banknote,
  Sprout,
  Gavel,
  Sparkles,
  Zap,
  Crosshair,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

const demoRequestHref = "/contact/?intent=studio-demo#contact-form";
const engineExplorationHref = "/contact/#contact-form";

type Locale = "en" | "fr";

const lensAssetVersion = "20260413-lenses-1";
const demoButtonClassName =
  "inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-label text-[0.8125rem] font-semibold leading-none text-on-primary shadow-[0_10px_24px_rgba(58,96,110,0.18)] transition-all duration-200 hover:bg-primary-dim active:scale-95 sm:px-6 sm:text-sm";
const secondaryCtaClassName =
  "rounded-md border border-outline-variant/35 bg-surface-container-low px-6 py-2 font-label text-sm font-semibold text-on-surface shadow-sm transition-all duration-200 hover:border-primary/35 hover:bg-surface-container active:scale-95";

const heroBackgroundSlides = [
  { src: "/assets/lenses/visual-cocoon.png", position: "center center" },
  { src: "/assets/lenses/site-cocoon.png", position: "center center" },
  { src: "/assets/lenses/cost-cocoon.png", position: "center center" },
  { src: "/assets/lenses/carbon-cocoon.png", position: "center center" },
  { src: "/assets/lenses/code-cocoon.png", position: "center center" },
] as const;

const heroBackgroundIntervalMs = 4200;

const dossierPageIds = ["summary", "site", "cost", "carbon", "code", "export"] as const;
type DossierPageId = (typeof dossierPageIds)[number];
type DossierPageContent = {
  id: DossierPageId;
  eyebrow: string;
  tab: string;
  title: string;
  accent: string;
  metric: string;
  metricLabel: string;
  status: readonly string[];
  copy: string;
};

type DiagramLabels = {
  baseline: string;
  hybridTimber: string;
  codeRows: readonly string[];
  codeStates: readonly string[];
  summaryItems: readonly string[];
};

type ReportCopy = {
  appendix: string;
  carbonScenario: string;
  page02: string;
  figure06: string;
  appendixNotes: string;
  carbonStructure: string;
  regulatoryBudget: string;
  page03: string;
  codeMatrix: string;
  resolvedPending: string;
  codeItems: readonly string[];
  codeStates: readonly string[];
  budgetCodeAppendix: string;
  dossierTitle: string;
  reportTitle: string;
  reportMeta: string;
  draft: string;
  page01: string;
  coverSummary: string;
  waterfront: string;
  coverLead: string;
  coverBody: string;
  coverStats: readonly { label: string; value: string }[];
  concept: string;
  scheme: string;
  keySignals: string;
  keyMetrics: readonly { label: string; value: string; note: string; tone: string }[];
  figure02: string;
  embodiedComparison: string;
  chartLabels: readonly string[];
  figureCaption: string;
  carbonDelta: string;
  figure03: string;
  budgetMix: string;
  packageMix: readonly { label: string; value: string; tone: string }[];
  figure04: string;
  materialDeltas: string;
  relativeShift: string;
  deltas: readonly { label: string; value: string; width: string; gradient: string }[];
  readiness: string;
  regulatorySnapshot: string;
  pages18: string;
  readinessItems: readonly { title: string; note: string; tone: string }[];
  tabs: readonly string[];
  dossier01: string;
  lowerCarbonCallout: string;
  lowerCarbonMetric: string;
};

const homeCopy = {
  en: {
    localeName: "English",
    otherLocaleName: "Français",
    metaTitle: "Cocoon | Architectural Feasibility Software by Cocoon Lab",
    metaDescription:
      "Cocoon is architectural feasibility software by Cocoon Lab for site analysis, cost planning, carbon analysis, regulatory audit, and clearer early-stage design decisions.",
    demoAriaLabel: "Open the Cocoon studio demo request form",
    heroTitleLine1: "Know what",
    heroTitleLine2Start: "a site can",
    heroTitleLine2Accent: "become.",
    heroSubtitle: "Test massing, cost, carbon, and code early to turn ideas into feasible schemes.",
    demoCta: "Book a Studio Demo",
    heroSnapshotAlt: "Cocoon feasibility snapshot with site fit, massing, carbon, and code metrics",
    heroWorkflowLabel: "Cocoon workflow",
    heroSignals: [
      { icon: Zap, title: "Seconds,", note: "not days" },
      { icon: Crosshair, title: "Evidence for", note: "early decisions" },
      { icon: UsersRound, title: "Built for", note: "architects" },
    ],
    heroWorkflowSteps: [
      { id: "1", title: "Upload site", note: "PDF, CAD, or image" },
      { id: "2", title: "Generate options", note: "AI explores in seconds" },
      { id: "3", title: "Compare & decide", note: "Choose with confidence" },
    ],
    lensTitle: "Every scheme checked across four essentials.",
    lensChips: ["Site", "Cost", "Carbon", "Code"],
    lensBody: "Cocoon checks every option against the practical signals that determine whether a scheme can move forward.",
    lensCta: "See feasibility in action",
    lensFeatures: [
      {
        icon: Map,
        title: "Does it fit the parcel?",
        desc: "Parcel geometry, adjacencies, solar access, and movement patterns clarified before design locks in.",
      },
      {
        icon: Banknote,
        title: "What drives the budget?",
        desc: "Early quantity logic and budget sensitivity remain attached to every massing iteration.",
      },
      {
        icon: Sprout,
        title: "Which option has lower impact?",
        desc: "Embodied impact is surfaced early enough to compare structural and material decisions meaningfully.",
      },
      {
        icon: Gavel,
        title: "What needs attention?",
        desc: "Setbacks, frontage, access, height, and zoning logic are organized into one readable compliance layer.",
      },
    ],
    outputsEyebrow: "The Handover",
    outputsTitle: "Clear outputs.",
    outputsBody: "Export BIM-ready geometry, technical dossiers, and atmospheric previews from the same feasibility record.",
    outputCards: [
      {
        assetSrc: "/assets/outputs/bim-ready-geometry.png",
        title: "BIM-Ready Geometry",
        desc: "Export clean Revit or Rhino files with correctly classified IFC data.",
      },
      {
        assetSrc: "/assets/outputs/technical-dossiers.png",
        title: "Technical Dossiers",
        desc: "Automated reports summarizing feasibility, cost, and sustainability metrics.",
      },
      {
        assetSrc: "/assets/outputs/atmospheric-previews.png",
        title: "Atmospheric Previews",
        desc: "High-fidelity renders that capture the material intent of your design.",
      },
    ],
    workflowTitleLine1: "Studio workflow,",
    workflowTitleLine2: "digital speed.",
    workflowSteps: [
      {
        id: "01",
        title: "Ingestion",
        desc: "Upload surveys, zoning documents, or quick sketches to seed the feasibility model.",
      },
      {
        id: "02",
        title: "Synthesize",
        desc: "Compare validated scheme options against site, cost, carbon, and code constraints.",
      },
      {
        id: "03",
        title: "Refine",
        desc: "Tune the chosen direction with interactive sliders and manual geometry overrides.",
      },
    ],
    finalTitle: "Bring one site. We'll show feasibility live.",
    finalBody: "Get feasible options, metrics, and export-ready outputs in one working session.",
    monographCta: "Read the Monograph",
    footerBuilt: "Cocoon is built for the architect.",
    cookiePreferences: "Cookie Preferences",
    footerLinks: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
      { label: "Studio", href: "/studio/" },
      { label: "Contact", href: "/contact/" },
      { label: "Press Kit", href: "/press-kit/index.html" },
      { label: "Partners", href: "/partners/" },
      { label: "Team", href: "/team/" },
      { label: "Blog", href: "/blog/" },
    ],
    exportPackageItems: ["BIM Geometry", "Technical Dossier", "Carbon Scenario", "Code Watchlist", "Decision Log", "Atmospheric Preview"],
    diagram: {
      baseline: "Baseline",
      hybridTimber: "Hybrid timber",
      codeRows: ["Height", "Setback", "Fire access", "Daylight", "Frontage", "Parking"],
      codeStates: ["Clear", "Clear", "Watch", "Watch", "Clear", "Pending"],
      summaryItems: ["Site: Strong", "Cost: Optimized", "Carbon: Improved", "Code: Watch"],
    },
    dossierPages: [
      {
        id: "summary",
        eyebrow: "01 / Feasibility",
        tab: "Summary",
        title: "Project Feasibility Snapshot",
        accent: "#2D2E28",
        metric: "87%",
        metricLabel: "Scheme Confidence",
        status: ["Site Strong", "Cost Optimized", "Carbon Improved", "Code Watch"],
        copy: "A decision-grade view of site, cost, carbon, and code feasibility.",
      },
      {
        id: "site",
        eyebrow: "02 / Site",
        tab: "Site",
        title: "Site Logic and Parcel Fit",
        accent: "#3A606E",
        metric: "4.2",
        metricLabel: "FAR",
        status: ["Primary access", "Frontage strong", "Solar watch"],
        copy: "Parcel geometry, movement, frontage, and exposure are translated into development logic.",
      },
      {
        id: "cost",
        eyebrow: "03 / Cost",
        tab: "Cost",
        title: "Cost Sensitivity and Quantity Logic",
        accent: "#EBC04D",
        metric: "-8.4%",
        metricLabel: "Cost Delta",
        status: ["Structure -6.2%", "Envelope +4.8%", "Core 11.7%"],
        copy: "Early-stage massing choices are converted into quantity and cost-risk signals.",
      },
      {
        id: "carbon",
        eyebrow: "04 / Carbon",
        tab: "Carbon",
        title: "Embodied Carbon Comparison",
        accent: "#A8B58A",
        metric: "-31%",
        metricLabel: "Carbon Delta",
        status: ["Hybrid timber", "Baseline compared", "Podium transfer"],
        copy: "Material and structural scenarios are evaluated before design lock-in.",
      },
      {
        id: "code",
        eyebrow: "05 / Code",
        tab: "Code",
        title: "Code Watchpoints",
        accent: "#B36A5E",
        metric: "6",
        metricLabel: "Rules Checked",
        status: ["Height clear", "Setback clear", "Fire access watch"],
        copy: "Planning constraints and unresolved watchpoints are surfaced early.",
      },
      {
        id: "export",
        eyebrow: "06 / Handover",
        tab: "Export",
        title: "Ready for Handover",
        accent: "#2D2E28",
        metric: "4",
        metricLabel: "Export Assets",
        status: ["BIM Geometry", "Technical Dossier", "Carbon Scenario", "Code Watchlist"],
        copy: "A structured feasibility package is prepared for review and handover.",
      },
    ] satisfies readonly DossierPageContent[],
    report: {
      appendix: "Appendix",
      carbonScenario: "Carbon scenario comparison",
      page02: "Page 02",
      figure06: "Figure 06",
      appendixNotes: "Appendix notes",
      carbonStructure: "Carbon + structure",
      regulatoryBudget: "Regulatory and budget matrix",
      page03: "Page 03",
      codeMatrix: "Code matrix",
      resolvedPending: "Resolved / pending",
      codeItems: ["Setbacks", "Height", "Access", "Loading"],
      codeStates: ["clear", "clear", "watch", "watch"],
      budgetCodeAppendix: "Budget + code appendix",
      dossierTitle: "Cocoon technical dossier",
      reportTitle: "Feasibility Report",
      reportMeta: "Parcel 07 / mixed-use waterfront / Issue 01 / generated in 18 seconds.",
      draft: "Draft for review",
      page01: "Page 01",
      coverSummary: "Cover summary",
      waterfront: "Waterfront mixed-use",
      coverLead: "A stepped timber-hybrid scheme aligns frontage, daylight, and zoning while lowering carbon from the first iteration.",
      coverBody: "Generated from site inputs, zoning envelopes, and material scenarios so carbon, cost, code, and geometry stay reviewable in one place.",
      coverStats: [
        { label: "FAR", value: "4.2" },
        { label: "Height", value: "28 m" },
        { label: "Retail edge", value: "1,980 m²" },
      ],
      concept: "Concept A",
      scheme: "Stepped timber-hybrid scheme",
      keySignals: "Key signals",
      keyMetrics: [
        { label: "Gross floor area", value: "14,280 m²", note: "6 levels / mixed-use", tone: "from-[#3A606E] to-[#A8B58A]" },
        { label: "CapEx range", value: "$46.4M", note: "structure, envelope, systems", tone: "from-[#EBC04D] to-[#F2D984]" },
        { label: "Embodied carbon", value: "420 kgCO₂e/m²", note: "-31% vs baseline", tone: "from-[#A8B58A] to-[#D2DABE]" },
      ],
      figure02: "Figure 02",
      embodiedComparison: "Embodied carbon scenario comparison",
      chartLabels: ["Baseline", "Hybrid", "Timber"],
      figureCaption: "Figure caption",
      carbonDelta: "-31% vs baseline",
      figure03: "Figure 03",
      budgetMix: "Budget package mix",
      packageMix: [
        { label: "Structure", value: "34%", tone: "#3A606E" },
        { label: "Envelope", value: "28%", tone: "#EBC04D" },
        { label: "Interiors", value: "22%", tone: "#A8B58A" },
        { label: "Systems", value: "16%", tone: "#B36A5E" },
      ],
      figure04: "Figure 04",
      materialDeltas: "Material and systems deltas",
      relativeShift: "relative shift",
      deltas: [
        { label: "Timber-hybrid floors", value: "-31%", width: "78%", gradient: "linear-gradient(90deg,#A8B58A,#D2DABE)" },
        { label: "Low-carbon concrete core", value: "-18%", width: "61%", gradient: "linear-gradient(90deg,#3A606E,#7898A2)" },
        { label: "Facade shading depth", value: "+4.5%", width: "44%", gradient: "linear-gradient(90deg,#B36A5E,#D59A91)" },
      ],
      readiness: "Readiness",
      regulatorySnapshot: "Regulatory and delivery snapshot",
      pages18: "18 pages",
      readinessItems: [
        { title: "Zoning envelope aligned", note: "Setbacks and frontage logic resolved.", tone: "bg-[#3A606E]" },
        { title: "Fire access validated", note: "Loading and service maneuvering remain clear.", tone: "bg-[#EBC04D]" },
        { title: "Daylight risk flagged", note: "Northwest corner needs terrace refinement.", tone: "bg-[#B36A5E]" },
      ],
      tabs: ["01 Cover", "02 Carbon", "03 Cost + Code"],
      dossier01: "Dossier / 01",
      lowerCarbonCallout: "DESIGNED FOR LOWER CARBON IMPACT",
      lowerCarbonMetric: "31% lower embodied carbon",
    },
  },
  fr: {
    localeName: "Français",
    otherLocaleName: "English",
    metaTitle: "Cocoon | Logiciel de faisabilité architecturale par Cocoon Lab",
    metaDescription:
      "Cocoon est le logiciel de faisabilité architecturale de Cocoon Lab pour l’analyse de site, les coûts, le carbone, le code et des décisions plus claires en amont.",
    demoAriaLabel: "Ouvrir le formulaire de demande de démonstration Cocoon",
    heroTitleLine1: "Sachez ce qu’un",
    heroTitleLine2Start: "site peut",
    heroTitleLine2Accent: "devenir.",
    heroSubtitle: "Testez la volumétrie, les coûts, le carbone et le code dès le départ pour transformer les idées en scénarios faisables.",
    demoCta: "Réserver une démo Studio",
    heroSnapshotAlt: "Aperçu de faisabilité Cocoon avec indicateurs de site, volumétrie, carbone et code",
    heroWorkflowLabel: "Flux de travail Cocoon",
    heroSignals: [
      { icon: Zap, title: "Secondes,", note: "pas des jours" },
      { icon: Crosshair, title: "Preuves pour", note: "décider tôt" },
      { icon: UsersRound, title: "Pensé pour", note: "les architectes" },
    ],
    heroWorkflowSteps: [
      { id: "1", title: "Importer le site", note: "PDF, CAD ou image" },
      { id: "2", title: "Générer des options", note: "L’IA explore en secondes" },
      { id: "3", title: "Comparer et décider", note: "Choisir avec confiance" },
    ],
    lensTitle: "Chaque scénario vérifié sur quatre essentiels.",
    lensChips: ["Site", "Coût", "Carbone", "Code"],
    lensBody: "Cocoon vérifie chaque option contre les signaux pratiques qui déterminent si un scénario peut avancer.",
    lensCta: "Voir la faisabilité en action",
    lensFeatures: [
      {
        icon: Map,
        title: "Est-ce que ça tient sur la parcelle ?",
        desc: "Géométrie de parcelle, voisinage, accès solaire et flux clarifiés avant de verrouiller la conception.",
      },
      {
        icon: Banknote,
        title: "Qu’est-ce qui pèse sur le budget ?",
        desc: "La logique quantitative et la sensibilité budgétaire restent attachées à chaque itération de volumétrie.",
      },
      {
        icon: Sprout,
        title: "Quelle option réduit l’impact ?",
        desc: "L’impact carbone est rendu visible assez tôt pour comparer les choix structurels et matériels.",
      },
      {
        icon: Gavel,
        title: "Qu’est-ce qui demande attention ?",
        desc: "Reculs, façade active, accès, hauteur et zonage sont organisés dans une couche de conformité lisible.",
      },
    ],
    outputsEyebrow: "Le livrable",
    outputsTitle: "Des sorties claires.",
    outputsBody: "Exportez la géométrie prête pour le BIM, les dossiers techniques et les aperçus atmosphériques depuis le même dossier de faisabilité.",
    outputCards: [
      {
        assetSrc: "/assets/outputs/bim-ready-geometry.png",
        title: "Géométrie prête pour le BIM",
        desc: "Exportez des fichiers Revit ou Rhino propres avec des données IFC correctement classées.",
      },
      {
        assetSrc: "/assets/outputs/technical-dossiers.png",
        title: "Dossiers techniques",
        desc: "Rapports automatisés qui résument la faisabilité, les coûts et les indicateurs de durabilité.",
      },
      {
        assetSrc: "/assets/outputs/atmospheric-previews.png",
        title: "Aperçus atmosphériques",
        desc: "Rendus haute fidélité qui capturent l’intention matérielle de votre projet.",
      },
    ],
    workflowTitleLine1: "Flux de studio,",
    workflowTitleLine2: "vitesse numérique.",
    workflowSteps: [
      {
        id: "01",
        title: "Ingestion",
        desc: "Importez relevés, documents de zonage ou croquis rapides pour amorcer le modèle de faisabilité.",
      },
      {
        id: "02",
        title: "Synthèse",
        desc: "Comparez des options validées selon les contraintes de site, coût, carbone et code.",
      },
      {
        id: "03",
        title: "Affinage",
        desc: "Ajustez la direction choisie avec des curseurs interactifs et des modifications manuelles de géométrie.",
      },
    ],
    finalTitle: "Apportez un site. Nous montrerons la faisabilité en direct.",
    finalBody: "Obtenez des options faisables, des métriques et des livrables prêts à exporter en une session de travail.",
    monographCta: "Lire le manifeste",
    footerBuilt: "Cocoon est conçu pour l’architecte.",
    cookiePreferences: "Préférences de témoins",
    footerLinks: [
      { label: "Confidentialité", href: "/privacy/" },
      { label: "Conditions", href: "/terms/" },
      { label: "Studio", href: "/studio/" },
      { label: "Contact", href: "/contact/" },
      { label: "Kit média", href: "/press-kit/index.html" },
      { label: "Partenaires", href: "/partners/" },
      { label: "Équipe", href: "/team/" },
      { label: "Blogue", href: "/blog/" },
    ],
    exportPackageItems: ["Géométrie BIM", "Dossier technique", "Scénario carbone", "Liste de vigilance code", "Journal de décision", "Aperçu atmosphérique"],
    diagram: {
      baseline: "Référence",
      hybridTimber: "Bois hybride",
      codeRows: ["Hauteur", "Recul", "Accès pompiers", "Lumière du jour", "Façade", "Stationnement"],
      codeStates: ["Clair", "Clair", "À surveiller", "À surveiller", "Clair", "En attente"],
      summaryItems: ["Site : fort", "Coût : optimisé", "Carbone : amélioré", "Code : à surveiller"],
    },
    dossierPages: [
      {
        id: "summary",
        eyebrow: "01 / Faisabilité",
        tab: "Résumé",
        title: "Aperçu de faisabilité du projet",
        accent: "#2D2E28",
        metric: "87%",
        metricLabel: "Confiance du scénario",
        status: ["Site fort", "Coût optimisé", "Carbone amélioré", "Code à surveiller"],
        copy: "Une lecture décisionnelle de la faisabilité du site, des coûts, du carbone et du code.",
      },
      {
        id: "site",
        eyebrow: "02 / Site",
        tab: "Site",
        title: "Logique de site et adéquation parcellaire",
        accent: "#3A606E",
        metric: "4.2",
        metricLabel: "FAR",
        status: ["Accès principal", "Façade forte", "Solaire à surveiller"],
        copy: "La géométrie, les flux, la façade et l’exposition sont traduits en logique de développement.",
      },
      {
        id: "cost",
        eyebrow: "03 / Coût",
        tab: "Coût",
        title: "Sensibilité des coûts et logique quantitative",
        accent: "#EBC04D",
        metric: "-8.4%",
        metricLabel: "Écart de coût",
        status: ["Structure -6.2%", "Enveloppe +4.8%", "Noyau 11.7%"],
        copy: "Les choix de volumétrie en amont deviennent des signaux de quantités et de risque de coût.",
      },
      {
        id: "carbon",
        eyebrow: "04 / Carbone",
        tab: "Carbone",
        title: "Comparaison du carbone incorporé",
        accent: "#A8B58A",
        metric: "-31%",
        metricLabel: "Écart carbone",
        status: ["Bois hybride", "Référence comparée", "Transfert podium"],
        copy: "Les scénarios matériels et structurels sont évalués avant le verrouillage du design.",
      },
      {
        id: "code",
        eyebrow: "05 / Code",
        tab: "Code",
        title: "Points de vigilance réglementaires",
        accent: "#B36A5E",
        metric: "6",
        metricLabel: "Règles vérifiées",
        status: ["Hauteur claire", "Recul clair", "Accès pompiers à surveiller"],
        copy: "Les contraintes de planification et les points non résolus sont rendus visibles tôt.",
      },
      {
        id: "export",
        eyebrow: "06 / Livraison",
        tab: "Export",
        title: "Prêt pour la revue",
        accent: "#2D2E28",
        metric: "4",
        metricLabel: "Actifs exportés",
        status: ["Géométrie BIM", "Dossier technique", "Scénario carbone", "Liste code"],
        copy: "Un dossier de faisabilité structuré est préparé pour la revue et la transmission.",
      },
    ] satisfies readonly DossierPageContent[],
    report: {
      appendix: "Annexe",
      carbonScenario: "Comparaison du scénario carbone",
      page02: "Page 02",
      figure06: "Figure 06",
      appendixNotes: "Notes d’annexe",
      carbonStructure: "Carbone + structure",
      regulatoryBudget: "Matrice réglementaire et budget",
      page03: "Page 03",
      codeMatrix: "Matrice code",
      resolvedPending: "Résolu / en attente",
      codeItems: ["Reculs", "Hauteur", "Accès", "Livraison"],
      codeStates: ["clair", "clair", "veille", "veille"],
      budgetCodeAppendix: "Annexe budget + code",
      dossierTitle: "Dossier technique Cocoon",
      reportTitle: "Rapport de faisabilité",
      reportMeta: "Parcelle 07 / mixte riverain / version 01 / généré en 18 secondes.",
      draft: "Brouillon pour revue",
      page01: "Page 01",
      coverSummary: "Résumé de couverture",
      waterfront: "Mixte riverain",
      coverLead: "Un scénario bois hybride en gradins aligne façade, lumière et zonage tout en réduisant le carbone dès la première itération.",
      coverBody: "Généré à partir des données de site, des enveloppes de zonage et des scénarios matériaux pour garder carbone, coût, code et géométrie vérifiables au même endroit.",
      coverStats: [
        { label: "FAR", value: "4.2" },
        { label: "Hauteur", value: "28 m" },
        { label: "Rez-de-chaussée", value: "1,980 m²" },
      ],
      concept: "Concept A",
      scheme: "Scénario bois hybride en gradins",
      keySignals: "Signaux clés",
      keyMetrics: [
        { label: "Surface brute", value: "14,280 m²", note: "6 niveaux / mixte", tone: "from-[#3A606E] to-[#A8B58A]" },
        { label: "Fourchette CapEx", value: "$46.4M", note: "structure, enveloppe, systèmes", tone: "from-[#EBC04D] to-[#F2D984]" },
        { label: "Carbone incorporé", value: "420 kgCO₂e/m²", note: "-31% vs référence", tone: "from-[#A8B58A] to-[#D2DABE]" },
      ],
      figure02: "Figure 02",
      embodiedComparison: "Comparaison du carbone incorporé",
      chartLabels: ["Référence", "Hybride", "Bois"],
      figureCaption: "Légende",
      carbonDelta: "-31% vs référence",
      figure03: "Figure 03",
      budgetMix: "Composition budgétaire",
      packageMix: [
        { label: "Structure", value: "34%", tone: "#3A606E" },
        { label: "Enveloppe", value: "28%", tone: "#EBC04D" },
        { label: "Intérieurs", value: "22%", tone: "#A8B58A" },
        { label: "Systèmes", value: "16%", tone: "#B36A5E" },
      ],
      figure04: "Figure 04",
      materialDeltas: "Écarts matériaux et systèmes",
      relativeShift: "écart relatif",
      deltas: [
        { label: "Planchers bois hybrides", value: "-31%", width: "78%", gradient: "linear-gradient(90deg,#A8B58A,#D2DABE)" },
        { label: "Noyau béton bas carbone", value: "-18%", width: "61%", gradient: "linear-gradient(90deg,#3A606E,#7898A2)" },
        { label: "Profondeur d’ombrage", value: "+4.5%", width: "44%", gradient: "linear-gradient(90deg,#B36A5E,#D59A91)" },
      ],
      readiness: "Préparation",
      regulatorySnapshot: "Aperçu réglementaire et livraison",
      pages18: "18 pages",
      readinessItems: [
        { title: "Enveloppe de zonage alignée", note: "Reculs et logique de façade résolus.", tone: "bg-[#3A606E]" },
        { title: "Accès pompiers validé", note: "Livraison et manœuvres de service restent claires.", tone: "bg-[#EBC04D]" },
        { title: "Risque de lumière signalé", note: "Le coin nord-ouest demande un affinage des terrasses.", tone: "bg-[#B36A5E]" },
      ],
      tabs: ["01 Couverture", "02 Carbone", "03 Coût + Code"],
      dossier01: "Dossier / 01",
      lowerCarbonCallout: "CONÇU POUR RÉDUIRE L’IMPACT CARBONE",
      lowerCarbonMetric: "31% de carbone incorporé en moins",
    },
  },
} as const;

function DossierDiagram({
  page,
  isActive,
  labels,
  exportPackageItems,
}: {
  page: DossierPageContent;
  isActive: boolean;
  labels: DiagramLabels;
  exportPackageItems: readonly string[];
}) {
  const lineTransition = { duration: 1.2, ease: "easeOut" as const };

  if (page.id === "site") {
    return (
      <svg viewBox="0 0 260 156" className="h-full w-full" aria-hidden="true">
        <motion.path
          d="M24 110 L92 70 L178 94 L124 136 Z"
          fill="none"
          stroke={page.accent}
          strokeWidth="2.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.72 }}
          transition={lineTransition}
        />
        <path d="M34 126 C84 104 124 100 158 118 C184 132 204 124 236 106" fill="none" stroke={page.accent} strokeOpacity="0.38" strokeWidth="5" />
        <path d="M42 62 L96 42 L192 58" fill="none" stroke={page.accent} strokeOpacity="0.48" strokeDasharray="6 7" />
        <path d="M118 28 C158 34 190 48 220 76" fill="none" stroke="#EBC04D" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="74" cy="88" r="4" fill="#EBC04D" />
        <circle cx="194" cy="104" r="4" fill="#B36A5E" />
      </svg>
    );
  }

  if (page.id === "cost") {
    return (
      <div className="grid h-full grid-cols-[1fr_1.2fr] items-end gap-4">
        <div className="space-y-2">
          {[62, 48, 74, 54].map((height, index) => (
            <div key={height} className="h-3 rounded-full bg-surface-container">
              <motion.div
                className="h-full rounded-full"
                style={{ background: page.accent, width: `${height}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0.68 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>
        <div className="flex h-32 items-end gap-2 border-b border-outline-variant/20 px-2">
          {[42, 78, 56, 92, 68, 84].map((height, index) => (
            <motion.div
              key={height}
              className="w-full rounded-t-sm"
              style={{ background: page.accent }}
              initial={{ height: 0 }}
              animate={{ height: isActive ? height : height * 0.45 }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (page.id === "carbon") {
    return (
      <div className="grid h-full content-center gap-5">
        <div>
          <div className="mb-2 flex justify-between text-[0.62rem] uppercase tracking-[0.14em] text-on-surface-variant">
            <span>{labels.baseline}</span>
            <span>100%</span>
          </div>
          <div className="h-5 rounded-full bg-surface-container">
            <motion.div
              className="h-full rounded-full bg-on-surface/70"
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "100%" : "70%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-[0.62rem] uppercase tracking-[0.14em] text-on-surface-variant">
            <span>{labels.hybridTimber}</span>
            <span>69%</span>
          </div>
          <div className="h-5 rounded-full bg-surface-container">
            <motion.div
              className="h-full rounded-full"
              style={{ background: page.accent }}
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "69%" : "42%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            />
          </div>
        </div>
        <svg viewBox="0 0 260 52" className="h-16 w-full" aria-hidden="true">
          <path d="M22 26 H238" stroke={page.accent} strokeWidth="8" strokeLinecap="round" strokeOpacity="0.38" />
          <path d="M42 14 H220" stroke={page.accent} strokeWidth="3" strokeLinecap="round" />
          <path d="M62 38 H190" stroke={page.accent} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (page.id === "code") {
    const rows = labels.codeRows;

    return (
      <div className="grid h-full content-center gap-2">
        {rows.map((row, index) => {
          const state = labels.codeStates[index] ?? "";
          const tone = index === 0 || index === 1 || index === 4 ? "#3A606E" : index === 5 ? "#EBC04D" : page.accent;

          return (
            <motion.div
              key={row}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-outline-variant/12 py-1.5 text-xs"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isActive ? 1 : 0.58, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <span className="font-semibold text-on-surface">{row}</span>
              <span className="rounded-full px-2 py-1 font-semibold" style={{ background: `${tone}24`, color: tone }}>
                {state}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (page.id === "export") {
    return (
      <div className="grid h-full grid-cols-2 content-center gap-2">
        {exportPackageItems.map((item, index) => (
          <motion.div
            key={item}
            className="border border-outline-variant/16 bg-surface/62 px-3 py-3 text-[0.68rem] font-semibold text-on-surface"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[0.8fr_1.2fr] items-center gap-4">
      <div className="grid gap-2">
        {labels.summaryItems.map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: isActive ? 1 : 0.62, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: ["#3A606E", "#EBC04D", "#A8B58A", "#B36A5E"][index] }} />
            {item}
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
        <motion.path
          d="M24 112 L88 76 L144 92 L216 52"
          fill="none"
          stroke={page.accent}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.7 }}
          transition={lineTransition}
        />
        <path d="M48 72 L96 48 L158 64 L110 92 Z" fill="#DCE8EB" stroke={page.accent} strokeWidth="1.4" />
        <path d="M48 72 L110 92 V124 L48 102 Z" fill="#E9EBDF" stroke={page.accent} strokeOpacity="0.38" />
        <path d="M158 64 L110 92 V124 L158 96 Z" fill="#C7D9DE" stroke={page.accent} strokeOpacity="0.38" />
        <circle cx="206" cy="54" r="5" fill="#EBC04D" />
      </svg>
    </div>
  );
}

function DossierPageCard({
  page,
  isActive,
  labels,
  exportPackageItems,
  stackIndex = 0,
  compact = false,
}: {
  page: DossierPageContent;
  isActive: boolean;
  labels: DiagramLabels;
  exportPackageItems: readonly string[];
  stackIndex?: number;
  compact?: boolean;
}) {
  const showContent = compact || isActive;

  return (
    <motion.article
      className={`overflow-hidden border border-outline-variant/20 bg-surface shadow-[0_24px_60px_rgba(45,46,40,0.08)] ${
        compact ? "relative min-h-[30rem] p-5" : "absolute inset-0 p-6 sm:p-7"
      }`}
      style={{
        borderTopColor: page.accent,
        borderTopWidth: "4px",
        zIndex: compact ? 1 : isActive ? 40 : 10 - stackIndex,
      }}
      animate={
        compact
          ? { opacity: 1, y: 0, scale: 1 }
          : {
              opacity: 1,
              x: isActive ? 0 : 16 + stackIndex * 10,
              y: isActive ? -10 : 18 + stackIndex * 10,
              rotate: isActive ? 0 : [-1.1, 0.7, -0.5, 1, -0.7, 0.4][stackIndex] ?? 0,
              scale: isActive ? 1 : 0.965 - stackIndex * 0.01,
            }
      }
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      {showContent ? (
        <>
          <header className="border-b border-outline-variant/16 pb-4">
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em]" style={{ color: page.accent }}>
              {page.eyebrow}
            </div>
            <h3 className="mt-2 max-w-[22rem] font-headline text-2xl font-bold leading-tight text-on-surface sm:text-3xl">{page.title}</h3>
            <p className="mt-2 max-w-[26rem] text-xs leading-relaxed text-on-surface-variant sm:text-sm">{page.copy}</p>
          </header>

          <div className="grid min-h-[16rem] grid-cols-1 gap-5 py-5 sm:grid-cols-[0.66fr_1fr] sm:items-center">
            <div className="rounded-md border border-outline-variant/14 bg-surface-container-low/70 p-4">
              <motion.div
                className="font-headline text-5xl font-bold leading-none sm:text-6xl"
                style={{ color: page.accent }}
                animate={{ opacity: isActive ? 1 : 0.72, y: isActive ? 0 : 5 }}
                transition={{ duration: 0.35 }}
              >
                {page.metric}
              </motion.div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-on-surface-variant">{page.metricLabel}</div>
            </div>

            <div className="min-h-[11rem]">
              <DossierDiagram page={page} isActive={isActive} labels={labels} exportPackageItems={exportPackageItems} />
            </div>
          </div>

          <footer className="flex flex-wrap gap-2 border-t border-outline-variant/14 pt-4">
            {page.status.map((status, index) => (
              <motion.span
                key={status}
                className="border border-outline-variant/16 bg-surface-container-low/60 px-2.5 py-1.5 text-[0.68rem] font-semibold text-on-surface-variant"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: isActive ? 1 : 0.55, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
              >
                {status}
              </motion.span>
            ))}
          </footer>
        </>
      ) : (
        <div aria-hidden="true" className="grid h-full content-between opacity-35">
          <div className="space-y-3">
            <div className="h-1 w-full" style={{ background: page.accent }} />
            <div className="h-2 w-36 bg-on-surface/20" />
            <div className="h-8 w-64 bg-on-surface/10" />
          </div>
          <div className="grid grid-cols-[0.8fr_1fr] gap-5">
            <div className="h-28 border border-outline-variant/20 bg-surface-container-low/60" />
            <div className="h-28 border border-outline-variant/20 bg-surface-container-low/45" />
          </div>
          <div className="flex gap-2">
            <span className="h-7 w-20 border border-outline-variant/16 bg-surface-container-low/60" />
            <span className="h-7 w-24 border border-outline-variant/16 bg-surface-container-low/60" />
            <span className="h-7 w-16 border border-outline-variant/16 bg-surface-container-low/60" />
          </div>
        </div>
      )}
    </motion.article>
  );
}

function DossierAssemblyPreview({
  pages,
  labels,
  exportPackageItems,
}: {
  pages: readonly DossierPageContent[];
  labels: DiagramLabels;
  exportPackageItems: readonly string[];
}) {
  const [activePageId, setActivePageId] = useState<DossierPageId>("summary");
  const [isDossierAutoplayPaused, setIsDossierAutoplayPaused] = useState(false);
  const activeIndex = Math.max(
    0,
    pages.findIndex((page) => page.id === activePageId),
  );
  const activePage = pages[activeIndex] ?? pages[0] ?? homeCopy.en.dossierPages[0]!;

  useEffect(() => {
    if (isDossierAutoplayPaused || prefersReducedMotion()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActivePageId((currentPageId) => {
        const currentIndex = pages.findIndex((page) => page.id === currentPageId);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % pages.length : 0;
        return pages[nextIndex]?.id ?? "summary";
      });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isDossierAutoplayPaused, pages]);

  const selectDossierPage = (pageId: DossierPageId) => {
    setActivePageId(pageId);
    setIsDossierAutoplayPaused(true);
  };

  return (
    <div className="relative min-h-0 w-full max-w-[56rem] overflow-hidden border border-outline-variant/18 bg-surface-container-low/35 p-4 shadow-[0_24px_80px_rgba(45,46,40,0.06)] sm:p-6 lg:min-h-[40rem]">
      <div className="hidden lg:block">
        <div className="pointer-events-none absolute left-8 right-8 top-14 z-10 grid gap-7 opacity-35">
          {["#3A606E", "#B36A5E", "#A8B58A", "#EBC04D"].map((tone, index) => (
            <motion.span
              key={tone}
              className="h-px w-full origin-left"
              style={{ background: tone }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: [0, 1, 0.72] }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: index * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="absolute left-8 right-8 top-7 h-[31rem] xl:left-10 xl:right-10 xl:h-[32rem]">
          {pages.map((page, index) => (
            <DossierPageCard
              key={page.id}
              page={page}
              isActive={activePageId === page.id}
              labels={labels}
              exportPackageItems={exportPackageItems}
              stackIndex={index}
            />
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <DossierPageCard page={activePage} isActive labels={labels} exportPackageItems={exportPackageItems} compact />
      </div>

      <div className="relative z-50 mt-4 grid grid-cols-3 gap-1 rounded-lg border border-outline-variant/18 bg-surface/86 p-1 shadow-sm backdrop-blur-xl sm:grid-cols-6 lg:absolute lg:bottom-4 lg:left-4 lg:right-4 lg:mt-0">
        {pages.map((page) => {
          const isActive = activePageId === page.id;

          return (
            <button
              key={page.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectDossierPage(page.id)}
              onMouseEnter={() => selectDossierPage(page.id)}
              onFocus={() => selectDossierPage(page.id)}
              className="rounded-md px-2.5 py-2 text-[0.68rem] font-semibold transition-all duration-200"
              style={{
                background: isActive ? page.accent : "transparent",
                color: isActive ? (page.id === "cost" || page.id === "carbon" ? "#2D2E28" : "#F7F7F2") : "#596057",
              }}
            >
              {page.tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorkflowReportPreview({ report }: { report: ReportCopy }) {
  return (
    <motion.div
      initial={{ rotate: 0, scale: 0.92 }}
      whileInView={{ rotate: 1.8, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.95, ease: "easeOut" }}
      className="relative aspect-[4/5] w-full max-w-[23rem] sm:max-w-[28rem] lg:max-w-[34rem]"
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-6, -4.6, -6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-7 bottom-3 top-5 overflow-hidden rounded-[1.15rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,247,242,0.66))] p-4 shadow-[0_26px_70px_rgba(45,46,40,0.08)] backdrop-blur-sm"
      >
        <div className="space-y-3 opacity-70">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/60">{report.appendix}</div>
              <div className="mt-1 font-body text-[11px] font-semibold text-on-surface/75">{report.carbonScenario}</div>
            </div>
            <div className="rounded-full border border-outline-variant/10 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60">
              {report.page02}
            </div>
          </div>
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
              <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/55">
                <span>{report.figure06}</span>
                <span>kgCO₂e / m²</span>
              </div>
              <div className="h-24 rounded-[0.8rem] border border-outline-variant/8 bg-[linear-gradient(to_top,rgba(58,96,110,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(58,96,110,0.05)_1px,transparent_1px)] bg-[size:100%_20px,32px_100%]" />
            </div>
            <div className="space-y-3">
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
                <div className="h-2 w-20 rounded-full bg-[#A8B58A]/75" />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-surface-container" />
                  <div className="h-2 w-4/5 rounded-full bg-surface-container" />
                  <div className="h-2 w-2/3 rounded-full bg-surface-container" />
                </div>
              </div>
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
                <div className="h-2 w-16 rounded-full bg-[#EBC04D]/80" />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-surface-container">
                    <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#EBC04D,#F2D984)]" />
                  </div>
                  <div className="h-2 rounded-full bg-surface-container">
                    <div className="h-full w-[58%] rounded-full bg-[linear-gradient(90deg,#3A606E,#A8B58A)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/50">
            <span>{report.appendixNotes}</span>
            <span>{report.carbonStructure}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [4.2, 5.5, 4.2] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute inset-x-4 bottom-2 top-3 overflow-hidden rounded-[1.2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,247,242,0.68))] p-4 shadow-[0_24px_62px_rgba(45,46,40,0.1)] backdrop-blur-sm"
      >
        <div className="space-y-3 opacity-80">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/60">{report.appendix}</div>
              <div className="mt-1 font-body text-[11px] font-semibold text-on-surface/78">{report.regulatoryBudget}</div>
            </div>
            <div className="rounded-full border border-outline-variant/10 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60">
              {report.page03}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
              <div className="mb-3 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/55">
                <span>{report.codeMatrix}</span>
                <span>{report.resolvedPending}</span>
              </div>
              <div className="space-y-2">
                {report.codeItems.map((item, index) => (
                  <div key={item} className="grid grid-cols-[0.8fr_1fr_auto] items-center gap-2 text-[9px] text-on-surface-variant/70">
                    <span>{item}</span>
                    <div className="h-2 rounded-full bg-surface-container">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: ["86%", "100%", "74%", "68%"][index],
                          background: ["#3A606E", "#EBC04D", "#A8B58A", "#B36A5E"][index],
                        }}
                      />
                    </div>
                    <span>{report.codeStates[index]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
                <div className="mb-3 h-2.5 w-20 rounded-full bg-[#EBC04D]/85" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-surface-container" />
                  <div className="h-2 w-4/5 rounded-full bg-surface-container" />
                  <div className="h-2 w-3/5 rounded-full bg-surface-container" />
                </div>
              </div>
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
                <div className="mb-3 h-2.5 w-20 rounded-full bg-[#A8B58A]/85" />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3A606E]" />
                    <div className="h-2 w-full rounded-full bg-surface-container" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#EBC04D]" />
                    <div className="h-2 w-2/3 rounded-full bg-surface-container" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/50">
            <span>{report.budgetCodeAppendix}</span>
            <span>Dossier 03</span>
          </div>
        </div>
      </motion.div>

      <div className="relative h-full overflow-hidden rounded-[1.3rem] border border-white/65 bg-surface p-1.5 shadow-[0_36px_90px_rgba(45,46,40,0.14)] sm:p-2">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.15rem] border border-outline-variant/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,247,242,0.95))] p-4 sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,192,77,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(58,96,110,0.14),transparent_24%)]" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="text-[9px] uppercase tracking-[0.26em] text-on-surface-variant/66">{report.dossierTitle}</div>
              <div className="font-headline text-[1.55rem] leading-none text-on-surface sm:text-[1.9rem]">{report.reportTitle}</div>
              <p className="max-w-[12rem] text-[10px] leading-[1.45] text-on-surface-variant/78 sm:max-w-[16rem] sm:text-[11px]">
                {report.reportMeta}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 text-right">
              <div className="rounded-full border border-outline-variant/10 bg-surface/70 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/72">
                {report.draft}
              </div>
              <div className="text-[9px] text-on-surface-variant/66">{report.page01}</div>
            </div>
          </div>

          <div className="relative mt-4 grid gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.44fr_0.68fr]">
              <section className="rounded-[1.05rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">
                  <span>{report.coverSummary}</span>
                  <span>{report.waterfront}</span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1.6fr)_minmax(6.8rem,0.72fr)] sm:gap-3">
                  <div>
                    <div className="font-body text-[0.94rem] font-semibold leading-[1.32] text-on-surface sm:text-[1.08rem]">
                      {report.coverLead}
                    </div>
                    <p className="mt-2 max-w-none text-[10.5px] leading-[1.55] text-on-surface-variant/78 sm:text-[11px]">
                      {report.coverBody}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {report.coverStats.map((stat) => (
                        <div key={stat.label} className="rounded-[0.85rem] border border-outline-variant/10 bg-surface-container-lowest/75 p-2">
                          <div className="text-[7px] uppercase tracking-[0.2em] text-on-surface-variant/64">{stat.label}</div>
                          <div className="mt-1 text-[10.5px] font-semibold text-on-surface">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[0.95rem] border border-outline-variant/10 bg-[radial-gradient(circle_at_top_left,rgba(235,192,77,0.2),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(241,242,235,0.72))] p-2.5">
                    <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/58">{report.concept}</div>
                    <div className="relative mx-auto mt-3 h-24 w-24 sm:h-28 sm:w-28">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-0 left-1/2 h-8 w-24 -translate-x-1/2 rounded-sm bg-[linear-gradient(180deg,#F2D984,#EBC04D)] shadow-[0_10px_24px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 12, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                        className="absolute bottom-5 left-4 h-8 w-16 rounded-[2px] bg-[linear-gradient(180deg,#F7F7F2,#DCE8EB)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 14, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                        className="absolute bottom-5 right-5 h-10 w-10 rounded-[2px] bg-[linear-gradient(180deg,#FFFFFF,#D2DABE)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 16, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
                        className="absolute bottom-11 left-9 h-10 w-12 rounded-[2px] bg-[linear-gradient(180deg,#FFFFFF,#EAD0CA)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
                        className="absolute bottom-[3.9rem] left-1/2 h-8 w-10 -translate-x-1/2 rounded-[2px] bg-[linear-gradient(180deg,#FFFFFF,#DCE8EB)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <div className="absolute inset-x-3 bottom-2 h-px bg-[#EBC04D]/70" />
                    </div>
                    <div className="mt-2 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/64">{report.scheme}</div>
                  </div>
                </div>
              </section>

              <aside className="rounded-[1.05rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">{report.keySignals}</div>
                <div className="mt-3 space-y-3">
                  {report.keyMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                      className="rounded-[0.9rem] border border-outline-variant/10 bg-surface-container-lowest/72 p-2.5"
                    >
                      <div className="text-[7px] uppercase tracking-[0.18em] text-on-surface-variant/60">{metric.label}</div>
                      <div className="mt-1 text-[0.95rem] font-semibold leading-none text-on-surface">{metric.value}</div>
                      <div className="mt-1 text-[9px] leading-[1.5] text-on-surface-variant/70">{metric.note}</div>
                      <div className="mt-2 h-1.5 rounded-full bg-surface-container">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: "easeOut" }}
                          className={`h-full origin-left rounded-full bg-gradient-to-r ${metric.tone}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.26fr_0.84fr]">
              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">{report.figure02}</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">{report.embodiedComparison}</div>
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/56">kgCO₂e / m² GFA</div>
                </div>

                <div className="relative h-[8.3rem] rounded-[0.95rem] border border-outline-variant/10 bg-[linear-gradient(to_top,rgba(58,96,110,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(58,96,110,0.05)_1px,transparent_1px)] bg-[size:100%_22px,40px_100%] p-2.5">
                  <div className="absolute left-2 top-2 text-[7px] uppercase tracking-[0.18em] text-on-surface-variant/44">A1-A3 + C3-C4</div>
                  <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden="true">
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.25, ease: "easeOut" }}
                      d="M10 88 C30 84, 44 46, 72 54 S116 96, 146 72 S190 26, 214 34 S228 60, 232 24"
                      fill="none"
                      stroke="#3A606E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      whileInView={{ pathLength: 1, opacity: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
                      d="M10 98 C34 92, 56 80, 84 84 S124 62, 154 68 S192 92, 232 60"
                      fill="none"
                      stroke="#EBC04D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="72" cy="54" r="3.5" fill="#3A606E" />
                    <circle cx="146" cy="72" r="3.5" fill="#3A606E" />
                    <circle cx="214" cy="34" r="3.5" fill="#3A606E" />
                    <circle cx="84" cy="84" r="3" fill="#EBC04D" />
                    <circle cx="154" cy="68" r="3" fill="#EBC04D" />
                  </svg>
                  <div className="absolute inset-x-3 bottom-2 flex justify-between text-[7px] uppercase tracking-[0.16em] text-on-surface-variant/50">
                    {report.chartLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/56">
                  <span>{report.figureCaption}</span>
                  <span>{report.carbonDelta}</span>
                </div>
              </section>

              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">{report.figure03}</div>
                <div className="mt-1 text-[11px] font-semibold text-on-surface">{report.budgetMix}</div>

                <div className="mt-3 flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: -120, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative h-24 w-24 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#3A606E 0 34%, #EBC04D 34% 62%, #A8B58A 62% 84%, #B36A5E 84% 100%)",
                    }}
                  >
                    <div className="absolute inset-[18px] rounded-full border border-outline-variant/10 bg-surface-container-lowest" />
                  </motion.div>
                </div>

                <div className="mt-3 space-y-2">
                  {report.packageMix.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-2 text-[9px]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.tone }} />
                        <span className="text-on-surface-variant/72">{item.label}</span>
                      </div>
                      <span className="font-semibold text-on-surface">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.02fr_0.98fr]">
              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">{report.figure04}</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">{report.materialDeltas}</div>
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.16em] text-on-surface-variant/56">{report.relativeShift}</div>
                </div>

                <div className="mt-3 space-y-3">
                  {report.deltas.map((item, index) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-[9px]">
                        <span className="text-on-surface-variant/72">{item.label}</span>
                        <span className="font-semibold text-on-surface">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-container">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                          className="h-full origin-left rounded-full"
                          style={{ width: item.width, background: item.gradient }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">{report.readiness}</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">{report.regulatorySnapshot}</div>
                  </div>
                  <div className="rounded-full border border-outline-variant/10 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-on-surface-variant/60">
                    {report.pages18}
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  {report.readinessItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone}`} />
                      <div>
                        <div className="text-[9px] font-semibold text-on-surface">{item.title}</div>
                        <div className="mt-0.5 text-[8.5px] leading-[1.5] text-on-surface-variant/72">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-outline-variant/10 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {report.tabs.map((tab, index) => (
                <div
                  key={tab}
                  className={`rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.18em] ${
                    index === 0
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant/10 bg-surface/72 text-on-surface-variant/66"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/58">{report.dossier01}</div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-3 top-3 max-w-[9.2rem] rounded-[0.7rem] bg-on-surface px-3 py-3 font-body text-[9px] text-surface shadow-xl sm:right-2 sm:left-auto sm:top-8 sm:max-w-[11.5rem] sm:px-4 sm:py-3.5 sm:text-[10px] lg:right-0 lg:max-w-[12rem]"
        >
          <Sparkles size={14} className="mb-1.5" />
          <div className="leading-[1.45] sm:text-[10.5px]">{report.lowerCarbonCallout}</div>
          <div className="mt-1.5 text-[8px] uppercase tracking-[0.16em] text-surface/60 sm:text-[8.5px]">{report.lowerCarbonMetric}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const searchLocale = new URLSearchParams(window.location.search).get("lang");
  if (searchLocale === "fr" || searchLocale === "en") {
    window.localStorage.setItem("cocoon_language", searchLocale);
    return searchLocale;
  }

  const storedLocale = window.localStorage.getItem("cocoon_language");
  if (storedLocale === "fr" || storedLocale === "en") {
    return storedLocale;
  }

  return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);
  const [activeHeroBackgroundIndex, setActiveHeroBackgroundIndex] = useState(0);
  const currentYear = new Date().getFullYear();
  const copy = homeCopy[locale];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
    document.title = copy.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", copy.metaTitle);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", copy.metaDescription);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", copy.metaTitle);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", copy.metaDescription);
    window.localStorage.setItem("cocoon_language", locale);
    window.dispatchEvent(new CustomEvent("cocoon:language-change", { detail: { locale } }));
  }, [copy.metaDescription, copy.metaTitle, locale]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroBackgroundIndex((currentIndex) => (currentIndex + 1) % heroBackgroundSlides.length);
    }, heroBackgroundIntervalMs);

    return () => window.clearInterval(intervalId);
  }, []);

  const switchLocale = (nextLocale: Locale) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", nextLocale);
    window.history.replaceState(null, "", nextUrl);
    setLocale(nextLocale);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <nav className="fixed top-0 z-50 w-full bg-surface/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 px-3 py-4 sm:px-6 sm:py-6 md:px-16">
          <a
            href="#top"
            aria-label={locale === "fr" ? "Retour à l’accueil Cocoon" : "Back to Cocoon home"}
            title={locale === "fr" ? "Accueil Cocoon" : "Cocoon home"}
            className="inline-flex shrink-0 rounded-md px-1 py-1 font-headline text-xl font-bold text-on-surface underline-offset-4 transition-colors hover:bg-surface-container-low hover:underline focus-visible:bg-surface-container-low sm:text-2xl"
          >
            COCOON
          </a>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-4">
            <div
              className="flex rounded-md border border-outline-variant/25 bg-surface/70 p-0.5 font-label text-[0.66rem] font-bold text-on-surface-variant shadow-sm sm:text-[0.72rem]"
              role="group"
              aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}
            >
              {(["en", "fr"] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  aria-pressed={locale === language}
                  onClick={() => switchLocale(language)}
                  className={`rounded-[0.28rem] px-2 py-1.5 transition-colors sm:px-2.5 ${
                    locale === language ? "bg-primary text-on-primary" : "hover:bg-surface-container"
                  }`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={demoRequestHref}
              aria-label={copy.demoAriaLabel}
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-2.5 py-2 font-label text-[0.68rem] font-semibold leading-none text-on-primary shadow-[0_10px_24px_rgba(58,96,110,0.18)] transition-all duration-200 hover:bg-primary-dim active:scale-95 min-[430px]:px-3.5 min-[430px]:text-[0.8125rem] sm:px-6 sm:text-sm"
            >
              <span className="hidden min-[430px]:inline">{copy.demoCta}</span>
              <span className="min-[430px]:hidden">{locale === "fr" ? "Démo" : "Demo"}</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-0">
        <section id="top" className="relative min-h-[100svh] scroll-mt-0 overflow-hidden border-b border-outline-variant/12 bg-surface">
          <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
            {heroBackgroundSlides.map((slide, index) => (
              <motion.img
                key={slide.src}
                className="absolute bottom-16 right-0 h-[56%] w-full object-cover opacity-70 sm:bottom-14 sm:h-[64%] md:h-[70%] lg:bottom-0 lg:h-[82%] lg:w-[80%] lg:opacity-95"
                src={`${slide.src}?v=${lensAssetVersion}`}
                alt=""
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                style={{ objectPosition: slide.position }}
                initial={false}
                animate={{
                  opacity: index === activeHeroBackgroundIndex ? 1 : 0,
                  scale: index === activeHeroBackgroundIndex ? 1 : 1.015,
                }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#F7F7F2_0%,rgba(247,247,242,0.98)_22%,rgba(247,247,242,0.84)_42%,rgba(247,247,242,0.22)_67%,rgba(247,247,242,0)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#F7F7F2_0%,rgba(247,247,242,0.72)_16%,rgba(247,247,242,0)_44%,rgba(247,247,242,0.04)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,#F7F7F2_0%,rgba(247,247,242,0.78)_45%,rgba(247,247,242,0)_100%)] lg:h-40" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1920px] flex-col px-4 pt-28 sm:px-6 sm:pt-32 md:px-16 lg:pt-36">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="grid flex-1 grid-cols-1 items-start gap-8 pb-8 lg:grid-cols-[minmax(32rem,0.9fr)_minmax(24rem,1.1fr)] lg:pb-8 xl:grid-cols-[minmax(40rem,0.95fr)_minmax(24rem,1.05fr)]"
            >
              <motion.div variants={fadeInUp} className="max-w-[52rem] lg:pt-20">
                <h1 className="serif max-w-[52rem] text-[clamp(3.1rem,8vw,5.65rem)] font-semibold leading-[1.12] text-on-surface lg:text-[clamp(4.35rem,4.9vw,5.35rem)]">
                  {copy.heroTitleLine1}
                  <br />
                  <span className="xl:whitespace-nowrap">
                    {copy.heroTitleLine2Start} <span className="text-primary">{copy.heroTitleLine2Accent}</span>
                  </span>
                </h1>
                <p className="mt-9 max-w-[31rem] font-body text-lg leading-[1.72] text-on-surface-variant sm:text-xl md:text-[1.32rem]">
                  {copy.heroSubtitle}
                </p>

                <a
                  href={demoRequestHref}
                  aria-label={copy.demoAriaLabel}
                  className="mt-10 inline-flex min-h-14 items-center justify-center rounded-md bg-primary px-7 py-3 font-label text-base font-semibold leading-none text-on-primary shadow-[0_18px_38px_rgba(34,63,73,0.22)] transition-all duration-200 hover:bg-primary-dim active:scale-95 sm:px-9"
                >
                  {copy.demoCta}
                </a>

                <div className="mt-12 grid max-w-[39rem] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-16">
                  {copy.heroSignals.map((signal) => {
                    const SignalIcon = signal.icon;

                    return (
                      <div key={signal.title} className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary-container text-on-surface shadow-sm">
                          <SignalIcon size={23} strokeWidth={1.7} />
                        </span>
                        <span className="font-body text-sm leading-snug text-on-surface-variant">
                          <strong className="block font-semibold text-on-surface">{signal.title}</strong>
                          {signal.note}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative min-h-[25rem] sm:min-h-[31rem] lg:min-h-[32rem]">
                <img
                  className="relative z-20 ml-auto w-[min(88vw,23rem)] rounded-xl shadow-[0_28px_80px_rgba(45,46,40,0.16)] ring-1 ring-on-surface/8 sm:w-[min(68vw,25rem)] lg:absolute lg:right-[4vw] lg:top-0 lg:w-[min(24vw,23.75rem)]"
                  src="/assets/lenses/card-cocoon.png"
                  alt={copy.heroSnapshotAlt}
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              className="relative z-20 mt-auto border border-outline-variant/16 bg-surface/94 px-5 py-6 shadow-[0_-18px_46px_rgba(45,46,40,0.06)] backdrop-blur-xl sm:px-8 lg:ml-auto lg:w-[40rem] lg:-mr-16 lg:rounded-tl-[2rem] lg:border-b-0 lg:border-r-0 lg:px-10"
              aria-label={copy.heroWorkflowLabel}
            >
              <div className="relative grid gap-5 sm:grid-cols-3">
                <div className="absolute left-[16%] right-[16%] top-5 hidden border-t border-dashed border-outline-variant/35 sm:block" />
                {copy.heroWorkflowSteps.map((step) => (
                  <div key={step.id} className="relative z-10 flex items-center gap-3 sm:block sm:text-center">
                    <span className="mx-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container font-headline text-sm font-bold text-on-secondary-container shadow-sm sm:mx-auto">
                      {step.id}
                    </span>
                    <span className="block sm:mt-4">
                      <strong className="block font-body text-sm font-semibold text-on-surface">{step.title}</strong>
                      <span className="mt-1 block font-body text-xs leading-relaxed text-on-surface-variant">{step.note}</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="lenses" className="scroll-mt-28 bg-surface-container-low px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-32 md:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="serif mb-8 text-4xl text-on-surface sm:text-5xl">
                {copy.lensTitle}
              </h2>
              <div className="mb-8 flex flex-wrap gap-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {copy.lensChips.map((item) => (
                  <span key={item} className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mb-12 font-body leading-relaxed text-on-surface-variant">
                {copy.lensBody}
              </p>
              <a href={engineExplorationHref} className="group inline-flex items-center text-primary">
                <span className="font-headline border-b border-outline-variant/30 text-xl font-medium transition-all group-hover:border-primary">
                  {copy.lensCta}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-px bg-outline-variant/10 sm:grid-cols-2 md:col-span-8">
              {copy.lensFeatures.map((feature, index) => (
                <div key={index} className="group bg-surface-container-low p-6 transition-colors duration-500 hover:bg-surface sm:p-8 md:p-10">
                  <feature.icon className="mb-6 text-primary" size={32} strokeWidth={1.5} />
                  <h3 className="mb-4 font-body text-xl font-semibold">{feature.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="outputs" className="scroll-mt-28 px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-28 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 flex flex-col items-center text-center sm:mb-20">
              <span className="blueprint-chip mb-6 rounded-full bg-tertiary-container px-4 py-1 text-xs text-on-tertiary-container">
                {copy.outputsEyebrow}
              </span>
              <h2 className="serif mb-6 text-5xl text-on-surface sm:text-6xl">{copy.outputsTitle}</h2>
              <p className="max-w-xl font-body text-on-surface-variant">
                {copy.outputsBody}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {copy.outputCards.map((card) => (
                <motion.div key={card.title} whileHover={{ y: -8 }} className="group">
                  <div className="relative mb-6 aspect-square overflow-hidden rounded-xl border border-outline-variant/16 bg-surface-container-high p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:p-4">
                    <img
                      className="h-full w-full object-contain contrast-[1.14] saturate-[1.04] drop-shadow-[0_16px_22px_rgba(45,46,40,0.14)] transition-transform duration-700 group-hover:scale-105"
                      src={card.assetSrc}
                      alt={`${card.title} illustration`}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <h4 className="mb-2 font-body text-lg font-semibold">{card.title}</h4>
                  <p className="font-body text-sm text-on-surface-variant">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="relative scroll-mt-28 overflow-hidden bg-surface-container px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-32 md:px-12">
          <div className="workflow-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-16 xl:grid-cols-[minmax(22rem,0.74fr)_minmax(0,1.26fr)] xl:gap-20">
              <div>
                <h2 className="serif mb-12 text-5xl text-on-surface sm:text-6xl">
                  {copy.workflowTitleLine1}
                  <br />
                  {copy.workflowTitleLine2}
                </h2>
                <div className="space-y-12">
                  {copy.workflowSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`flex gap-4 border-l-2 py-2 pl-5 transition-colors duration-500 sm:gap-8 sm:pl-8 ${
                        index === 0 ? "border-primary" : "border-outline-variant/20 hover:border-primary"
                      }`}
                    >
                      <span className="font-headline text-3xl font-semibold text-outline-variant/50 sm:text-4xl">{step.id}</span>
                      <div>
                        <h4 className="mb-2 font-body text-lg font-bold sm:text-xl">{step.title}</h4>
                        <p className="font-body text-sm text-on-surface-variant">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 items-center justify-center lg:justify-end">
                <DossierAssemblyPreview pages={copy.dossierPages} labels={copy.diagram} exportPackageItems={copy.exportPackageItems} />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-32 text-center sm:px-6 sm:py-40 md:px-12">
          <motion.div whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="serif mb-8 text-5xl text-on-surface sm:text-6xl md:text-7xl">{copy.finalTitle}</h2>
            <p className="mx-auto mb-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant sm:text-xl">
              {copy.finalBody}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={demoRequestHref}
                aria-label={copy.demoAriaLabel}
                className={`inline-flex w-full justify-center sm:w-auto ${demoButtonClassName}`}
              >
                {copy.demoCta}
              </a>
              <a
                href="/monograph/"
                className={`inline-flex w-full justify-center sm:w-auto ${secondaryCtaClassName}`}
              >
                {copy.monographCta}
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="w-full bg-surface-container px-4 py-16 sm:px-6 sm:py-20 md:px-12">
        <div className="mx-auto flex max-w-[1920px] flex-col justify-between md:flex-row md:items-end">
          <div className="flex w-full flex-col items-start gap-6 md:w-auto">
            <div className="font-headline text-xl font-semibold text-on-surface">COCOON</div>
            <div className="font-body text-sm tracking-wide text-on-surface-variant">
              © {currentYear} Cocoon Lab. {copy.footerBuilt}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-5 sm:gap-8 md:mt-0">
            {copy.footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm tracking-wide text-on-surface-variant opacity-60 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cookie-preferences"
              data-cookie-preferences-link
              className="font-body text-sm tracking-wide text-on-surface-variant opacity-60 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
            >
              {copy.cookiePreferences}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
