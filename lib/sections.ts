export const homeSections = [
  { id: "problem", label: "Problem" },
  { id: "product", label: "Product" },
  { id: "demo", label: "Demo" },
  { id: "outcomes", label: "Outcomes" },
  { id: "use-cases", label: "Use cases" },
  { id: "team", label: "Team" },
  { id: "now", label: "Now" },
  { id: "roadmap", label: "Roadmap" }
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
