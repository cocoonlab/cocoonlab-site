import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { resolveInitialLocale } from "./locale.ts";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootElement.hasChildNodes() && resolveInitialLocale() === "en") {
  hydrateRoot(rootElement, app);
} else {
  rootElement.textContent = "";
  createRoot(rootElement).render(app);
}
