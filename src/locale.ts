export type Locale = "en" | "fr";

const STORAGE_KEY = "cocoon_language";

const isLocale = (value: string | null): value is Locale => value === "en" || value === "fr";

// Storage throws when site data is blocked or the page runs in a sandboxed
// frame; the language then simply isn't remembered.
function readStoredLocale() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* Ignore storage failures. */
  }
}

/** `?lang` first, then the remembered choice, then the browser's language. */
export function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const searchLocale = new URLSearchParams(window.location.search).get("lang");
  if (isLocale(searchLocale)) {
    return searchLocale;
  }

  const storedLocale = readStoredLocale();
  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}
