export type Locale = "en" | "fr";

const STORAGE_KEY = "cocoon_language";

export const isLocale = (value: unknown): value is Locale => value === "en" || value === "fr";

/** French pages live under `/fr/`; every other path is English. */
export function localeForPath(pathname: string): Locale {
  return /^\/fr(\/|$)/.test(pathname) ? "fr" : "en";
}

/**
 * A site path in `locale`: `/team/` becomes `/fr/team/` and back, keeping any
 * query and hash. Files such as `/feed.xml` are shared by both languages.
 */
export function localizePath(to: string, locale: Locale) {
  const [, path = "", rest = ""] = /^([^?#]*)(.*)$/.exec(to) ?? [];
  if (!path.startsWith("/") || path.startsWith("//") || /\.[a-z0-9]+$/i.test(path)) return to;
  const bare = path.replace(/^\/fr(?=\/|$)/, "") || "/";
  return `${locale === "fr" ? `/fr${bare}` : bare}${rest}`;
}

/**
 * Remembers an explicit choice from the language toggle. The head script in
 * index.html reads it on the next visit to an English page.
 */
export function saveLocale(locale: Locale) {
  // Storage throws when site data is blocked or the page runs in a sandboxed
  // frame; the language then simply isn't remembered.
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* Ignore storage failures. */
  }
}
