import changelogData from "@/data/changelog.json";

export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  summary: string;
  kind: "improvement" | "feature" | "fix" | "note";
};

export function getChangelog(): ChangelogEntry[] {
  return changelogData as ChangelogEntry[];
}
