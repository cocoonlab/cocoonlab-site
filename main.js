// main.js – navigation, tabs, scroll, reveal

(function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMain = document.querySelector(".nav-main");

  if (header && navToggle && navMain) {
    navToggle.addEventListener("click", () => {
      const isOpen = !header.classList.contains("is-open");
      header.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMain.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.tagName === "A") {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scroll for in-page links on same page
  const links = Array.from(document.querySelectorAll('a[href*="#"]'));

  links.forEach((link) => {
    const url = new URL(link.href, window.location.href);
    if (!url.hash) return;

    link.addEventListener("click", (event) => {
      const current = new URL(window.location.href);
      const normalize = (p) => (p === "/" || p === "" ? "/index.html" : p);

      if (normalize(url.pathname) !== normalize(current.pathname)) {
        // Different page, allow normal navigation
        return;
      }

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Scroll indicator → Product
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const product = document.querySelector("#product");
      if (product) {
        product.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // IntersectionObserver for reveal animations
  const animated = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window && animated.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("is-visible"));
  }

  // Hero preview tabs
  const tabs = document.querySelectorAll(".preview-tab");
  const panels = document.querySelectorAll(".preview-panel");

  function setActiveTab(id) {
    tabs.forEach((tab) => {
      const tabId = tab.getAttribute("data-preview-tab");
      const isActive = tabId === id;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const panelId = panel.getAttribute("data-preview-panel");
      const isActive = panelId === id;
      panel.classList.toggle("is-hidden", !isActive);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.getAttribute("data-preview-tab");
      if (id) setActiveTab(id);
    });
  });

  // Footer year
  const yearSpans = document.querySelectorAll("#year");
  const year = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = String(year);
  });
})();
