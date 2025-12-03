export const homeSections = [
  { id: "product", label: "Product" },
  { id: "how-it-works", label: "How it works" },
  { id: "use-cases", label: "Use cases" },
  { id: "customers", label: "Customers" },
  { id: "pricing", label: "Pricing" },
  { id: "resources", label: "Resources" }
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

const homeSectionMap = Object.fromEntries(
  homeSections.map((section) => [section.id, section])
) as Record<HomeSectionId, (typeof homeSections)[number]>;

export function getHomeSection(id: HomeSectionId) {
  return homeSectionMap[id];
}

export function homeSectionHref(id: HomeSectionId) {
  return { pathname: "/", hash: id } as const;
}
