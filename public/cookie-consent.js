(function () {
  const COOKIE_NAME = "cocoon_cookie_consent";
  const COOKIE_VERSION = "2026-04-essential-v1";
  const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
  const bannerId = "cocoon-cookie-consent";
  const modalId = "cocoon-cookie-preferences";
  const copy = {
    en: {
      preferencesEyebrow: "Cookie preferences",
      essentialOnly: "Essential only.",
      preferencesCopy:
        "Cocoon Lab currently uses only essential cookies required to operate this website and remember your cookie choice. We do not set advertising, retargeting, or analytics cookies.",
      categoryTitle: "Essential cookies",
      alwaysOn: "Always on",
      categoryCopy:
        "These support basic site reliability, security, and the record of this preference. They cannot be switched off from this panel.",
      listLabel: "Essential cookie details",
      remembers: `${COOKIE_NAME} remembers that you selected essential-only cookies.`,
      duration: "Duration: 180 days, then we ask again.",
      scope: "Scope: cocoonlab.ai, first-party, SameSite=Lax.",
      save: "Save essential only",
      back: "Back",
      privacy: "Privacy Policy",
      bannerEyebrow: "Essential cookies",
      bannerTitle: "Your consent, clearly handled.",
      bannerCopy:
        "Cocoon Lab uses only essential cookies to run the site, protect basic functionality, and remember this choice. No advertising or analytics cookies are set.",
      accept: "Accept essential only",
      manage: "Manage",
      readPrivacyPrefix: "Read the",
    },
    fr: {
      preferencesEyebrow: "Préférences de témoins",
      essentialOnly: "Essentiels seulement.",
      preferencesCopy:
        "Cocoon Lab utilise seulement les témoins essentiels nécessaires au fonctionnement de ce site et à la mémorisation de votre choix. Aucun témoin publicitaire, de reciblage ou d’analytique n’est défini.",
      categoryTitle: "Témoins essentiels",
      alwaysOn: "Toujours actifs",
      categoryCopy:
        "Ils soutiennent la fiabilité de base du site, la sécurité et l’enregistrement de cette préférence. Ils ne peuvent pas être désactivés depuis ce panneau.",
      listLabel: "Détails des témoins essentiels",
      remembers: `${COOKIE_NAME} mémorise votre choix de témoins essentiels seulement.`,
      duration: "Durée : 180 jours, puis nous redemandons votre choix.",
      scope: "Portée : cocoonlab.ai, première partie, SameSite=Lax.",
      save: "Enregistrer les essentiels",
      back: "Retour",
      privacy: "Politique de confidentialité",
      bannerEyebrow: "Témoins essentiels",
      bannerTitle: "Votre consentement, traité clairement.",
      bannerCopy:
        "Cocoon Lab utilise seulement des témoins essentiels pour faire fonctionner le site, protéger les fonctions de base et mémoriser ce choix. Aucun témoin publicitaire ou analytique n’est défini.",
      accept: "Accepter les essentiels",
      manage: "Gérer",
      readPrivacyPrefix: "Lire la",
    },
  };

  function getLocale() {
    try {
      const storedLocale = window.localStorage.getItem("cocoon_language");
      if (storedLocale === "fr" || storedLocale === "en") {
        return storedLocale;
      }
    } catch {
      /* Ignore storage failures. */
    }

    if (document.documentElement.lang.toLowerCase().startsWith("fr")) {
      return "fr";
    }

    return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
  }

  function getCopy() {
    return copy[getLocale()];
  }

  function getCookie(name) {
    const prefix = `${name}=`;
    return document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(prefix))
      ?.slice(prefix.length);
  }

  function readConsent() {
    const rawConsent = getCookie(COOKIE_NAME);

    if (!rawConsent) {
      return null;
    }

    try {
      const parsedConsent = JSON.parse(decodeURIComponent(rawConsent));
      if (parsedConsent?.status === "essential" && parsedConsent.version === COOKIE_VERSION) {
        return parsedConsent;
      }
    } catch {
      return null;
    }

    return null;
  }

  function writeConsent() {
    const consent = {
      status: "essential",
      version: COOKIE_VERSION,
      updatedAt: new Date().toISOString(),
    };
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent("cocoon:cookie-consent", { detail: consent }));
    return consent;
  }

  function removeNode(id) {
    document.getElementById(id)?.remove();
  }

  function focusFirstControl(container) {
    const target = container.querySelector("button, a[href], [tabindex]:not([tabindex='-1'])");
    if (target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
    }
  }

  function closePreferences() {
    const modal = document.getElementById(modalId);
    const openerId = modal?.dataset.opener;
    removeNode(modalId);

    if (openerId) {
      const opener = document.getElementById(openerId);
      if (opener instanceof HTMLElement) {
        opener.focus({ preventScroll: true });
      }
    }
  }

  function acceptEssential() {
    const consent = writeConsent();
    removeNode(bannerId);
    closePreferences();
    return consent;
  }

  function trapModalFocus(event) {
    if (event.key !== "Tab") {
      return;
    }

    const modal = document.getElementById(modalId);
    if (!modal) {
      return;
    }

    const controls = Array.from(modal.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])")).filter(
      (control) => control instanceof HTMLElement && !control.hasAttribute("disabled"),
    );

    if (controls.length === 0) {
      return;
    }

    const firstControl = controls[0];
    const lastControl = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === firstControl) {
      event.preventDefault();
      lastControl.focus();
    } else if (!event.shiftKey && document.activeElement === lastControl) {
      event.preventDefault();
      firstControl.focus();
    }
  }

  function openPreferences(opener) {
    removeNode(modalId);
    const text = getCopy();

    const modal = document.createElement("section");
    modal.id = modalId;
    modal.className = "cocoon-cookie-preferences";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "cocoon-cookie-preferences-title");

    if (opener instanceof HTMLElement) {
      if (!opener.id) {
        opener.id = "cocoon-cookie-preferences-opener";
      }
      modal.dataset.opener = opener.id;
    }

    modal.innerHTML = `
      <div class="cocoon-cookie-preferences__panel">
        <span class="cocoon-cookie-preferences__eyebrow">${text.preferencesEyebrow}</span>
        <h2 class="cocoon-cookie-preferences__title" id="cocoon-cookie-preferences-title">${text.essentialOnly}</h2>
        <p class="cocoon-cookie-preferences__copy">
          ${text.preferencesCopy}
        </p>

        <div class="cocoon-cookie-preferences__category">
          <div class="cocoon-cookie-preferences__category-header">
            <h3>${text.categoryTitle}</h3>
            <span class="cocoon-cookie-preferences__required">${text.alwaysOn}</span>
          </div>
          <p>
            ${text.categoryCopy}
          </p>
          <ul class="cocoon-cookie-preferences__list" aria-label="${text.listLabel}">
            <li>${text.remembers}</li>
            <li>${text.duration}</li>
            <li>${text.scope}</li>
          </ul>
        </div>

        <div class="cocoon-cookie-preferences__actions">
          <button class="cocoon-cookie-preferences__button cocoon-cookie-preferences__button--primary" type="button" data-cookie-accept>
            ${text.save}
          </button>
          <button class="cocoon-cookie-preferences__button cocoon-cookie-preferences__button--secondary" type="button" data-cookie-close>
            ${text.back}
          </button>
          <a class="cocoon-cookie-preferences__button cocoon-cookie-preferences__button--secondary" href="/privacy/">
            ${text.privacy}
          </a>
        </div>
      </div>
    `;

    modal.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;

      if (target === modal || target?.closest("[data-cookie-close]")) {
        closePreferences();
      }

      if (target?.closest("[data-cookie-accept]")) {
        acceptEssential();
      }
    });

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closePreferences();
      }

      trapModalFocus(event);
    });

    document.body.append(modal);
    focusFirstControl(modal);
  }

  function showBanner() {
    if (document.getElementById(bannerId) || readConsent()) {
      return;
    }

    const text = getCopy();
    const banner = document.createElement("section");
    banner.id = bannerId;
    banner.className = "cocoon-cookie-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-labelledby", "cocoon-cookie-consent-title");
    banner.innerHTML = `
      <span class="cocoon-cookie-consent__eyebrow">${text.bannerEyebrow}</span>
      <h2 class="cocoon-cookie-consent__title" id="cocoon-cookie-consent-title">${text.bannerTitle}</h2>
      <p class="cocoon-cookie-consent__copy">
        ${text.bannerCopy}
      </p>
      <div class="cocoon-cookie-consent__actions">
        <button class="cocoon-cookie-consent__button cocoon-cookie-consent__button--primary" type="button" data-cookie-accept>
          ${text.accept}
        </button>
        <button class="cocoon-cookie-consent__button cocoon-cookie-consent__button--secondary" type="button" data-cookie-manage>
          ${text.manage}
        </button>
      </div>
      <p class="cocoon-cookie-consent__fine">
        ${text.readPrivacyPrefix} <a class="cocoon-cookie-consent__link" href="/privacy/">${text.privacy}</a>.
      </p>
    `;

    banner.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;

      if (target?.closest("[data-cookie-accept]")) {
        acceptEssential();
      }

      if (target?.closest("[data-cookie-manage]")) {
        openPreferences(target.closest("[data-cookie-manage]"));
      }
    });

    document.body.append(banner);
  }

  window.CocoonCookieConsent = {
    acceptEssential,
    getConsent: readConsent,
    hasConsent: () => Boolean(readConsent()),
    openPreferences,
    reset: () => {
      document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
      showBanner();
    },
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const preferencesLink = target?.closest("[data-cookie-preferences-link]");

    if (!preferencesLink) {
      return;
    }

    event.preventDefault();
    openPreferences(preferencesLink);
  });

  window.addEventListener("cocoon:language-change", () => {
    const banner = document.getElementById(bannerId);
    const modal = document.getElementById(modalId);
    if (banner) {
      removeNode(bannerId);
      showBanner();
    }
    if (modal) {
      openPreferences();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner, { once: true });
  } else {
    showBanner();
  }
})();
