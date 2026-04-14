const form = document.querySelector("[data-contact-form]");
const urlParams = new URLSearchParams(window.location.search);
const intentMode = urlParams.get("intent") === "studio-demo" ? "studio-demo" : "contact";

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

function applyIntentMode({
  form,
  submitButton,
  status,
  hiddenIntentField,
  intentNote,
  demoFields,
  messageField,
}) {
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const isStudioDemo = intentMode === "studio-demo";

  if (hiddenIntentField instanceof HTMLInputElement) {
    hiddenIntentField.value = intentMode;
    hiddenIntentField.defaultValue = intentMode;
  }

  if (intentNote instanceof HTMLElement) {
    intentNote.hidden = !isStudioDemo;
    intentNote.textContent = isStudioDemo
      ? "You’re requesting a Cocoon studio demo. Share a bit about the project, the team, and your timing."
      : "Messages are routed directly into Cocoon Lab’s internal intake queue.";
  }

  demoFields.forEach((field) => {
    if (field instanceof HTMLElement) {
      field.hidden = !isStudioDemo;
    }
  });

  if (messageField instanceof HTMLTextAreaElement) {
    messageField.placeholder = isStudioDemo
      ? "Tell us about your team, project, and what you’d like to see in the demo."
      : "How can we help?";
  }

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.textContent = isStudioDemo ? "Request Studio Demo" : "Send Message";
  }

  setStatus(
    status,
    "",
    isStudioDemo
      ? "Studio demo requests are routed directly into Cocoon Lab’s internal intake queue."
      : "Messages are routed directly into Cocoon Lab’s internal intake queue.",
  );
}

if (form instanceof HTMLFormElement) {
  const submitButton = form.querySelector("[data-contact-submit]");
  const status = form.querySelector("[data-contact-status]");
  const hiddenIntentField = form.querySelector("[data-contact-intent]");
  const intentNote = form.querySelector("[data-contact-intent-note]");
  const demoFields = Array.from(form.querySelectorAll("[data-contact-demo-field]"));
  const messageField = form.querySelector('textarea[name="message"]');

  applyIntentMode({
    form,
    submitButton,
    status,
    hiddenIntentField,
    intentNote,
    demoFields,
    messageField,
  });

  const defaultLabel = submitButton?.textContent?.trim() || "Send Message";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      intent: String(formData.get("intent") ?? "").trim(),
      project: String(formData.get("project") ?? "").trim(),
      preferredTiming: String(formData.get("preferredTiming") ?? "").trim(),
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
    setStatus(
      status,
      "loading",
      intentMode === "studio-demo" ? "Routing your demo request to Cocoon Lab..." : "Sending your message to Cocoon Lab...",
    );

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
      applyIntentMode({
        form,
        submitButton,
        status,
        hiddenIntentField,
        intentNote,
        demoFields,
        messageField,
      });
      setStatus(
        status,
        "success",
        intentMode === "studio-demo"
          ? "Thanks. Your studio demo request has been routed to Cocoon Lab."
          : "Thanks. Your message has been routed to Cocoon Lab.",
      );
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
