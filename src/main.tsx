import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./site/theme.css";
import { isLocale, localeForPath } from "./locale.ts";
import { isPageId, pageForPath } from "./pages/index.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

// Prerendered pages name themselves; the dev server serves every route from index.html.
const page = isPageId(rootElement.dataset.page) ? rootElement.dataset.page : pageForPath(window.location.pathname);

// Each prerendered page names its language too. The one 404 page answers for
// both languages, so it and the dev server read the language from the path.
const rendered = rootElement.dataset.locale;
const locale = page !== "not-found" && isLocale(rendered) ? rendered : localeForPath(window.location.pathname);

const app = (
  <StrictMode>
    <App page={page} locale={locale} linkBase={rootElement.dataset.linkBase} />
  </StrictMode>
);

if (rootElement.hasChildNodes() && rendered === locale) {
  hydrateRoot(rootElement, app);
} else {
  rootElement.textContent = "";
  createRoot(rootElement).render(app);
}
