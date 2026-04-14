const form = document.querySelector("[data-contact-form]");

function setStatus(element, state, message) {
  if (!element) {
    return;
  }

  element.dataset.state = state;
  element.textContent = message;
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function validateForm(payload) {
  if (!payload.name) {
    return "Please provide your name.";
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please provide a valid email address.";
  }

  if (!payload.message || payload.message.length < 10) {
    return "Please include a message with a bit more detail.";
  }

  return "";
}

if (form instanceof HTMLFormElement) {
  const submitButton = form.querySelector("[data-contact-submit]");
  const status = form.querySelector("[data-contact-status]");
  const defaultLabel = submitButton?.textContent?.trim() || "Send Message";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      page: window.location.href,
    };

    const validationMessage = validateForm(payload);

    if (validationMessage) {
      setStatus(status, "error", validationMessage);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    form.setAttribute("aria-busy", "true");
    setStatus(status, "loading", "Sending your message to Cocoon Lab...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(data?.error || "We could not send your message right now.");
      }

      form.reset();
      setStatus(status, "success", "Thanks. Your message has been routed to Cocoon Lab.");
    } catch (error) {
      const message =
        error instanceof Error && error.name === "AbortError"
          ? "The request took too long. Please try again."
          : error instanceof Error
            ? error.message
            : "We could not send your message right now.";

      setStatus(status, "error", message);
    } finally {
      window.clearTimeout(timeoutId);
      form.removeAttribute("aria-busy");

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = defaultLabel;
      }
    }
  });
}
