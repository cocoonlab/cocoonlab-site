import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

const searchLocale = new URLSearchParams(window.location.search).get("lang");
const storedLocale = window.localStorage.getItem("cocoon_language");
const initialLocale =
  searchLocale === "fr" || searchLocale === "en"
    ? searchLocale
    : storedLocale === "fr" || storedLocale === "en"
      ? storedLocale
      : window.navigator.language.toLowerCase().startsWith("fr")
        ? "fr"
        : "en";

if (rootElement.hasChildNodes() && initialLocale === "en") {
  hydrateRoot(rootElement, app);
} else {
  rootElement.textContent = "";
  createRoot(rootElement).render(app);
}
