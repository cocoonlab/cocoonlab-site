import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./site/theme.css";
import { resolveInitialLocale } from "./locale.ts";
import { isPageId, pageForPath } from "./pages/index.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

// Prerendered pages name themselves; the dev server serves every route from index.html.
const page = isPageId(rootElement.dataset.page) ? rootElement.dataset.page : pageForPath(window.location.pathname);

const app = (
  <StrictMode>
    <App page={page} linkBase={rootElement.dataset.linkBase} />
  </StrictMode>
);

if (rootElement.hasChildNodes() && resolveInitialLocale() === "en") {
  hydrateRoot(rootElement, app);
} else {
  rootElement.textContent = "";
  createRoot(rootElement).render(app);
}
