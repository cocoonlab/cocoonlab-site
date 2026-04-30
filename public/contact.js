const form = document.querySelector("[data-contact-form]");
const urlParams = new URLSearchParams(window.location.search);
const intentMode = urlParams.get("intent") === "studio-demo" ? "studio-demo" : "contact";
const contactLocale = window.localStorage.getItem("cocoon_language") === "fr" ? "fr" : "en";

const contactText = {
  en: {
    nameRequired: "Please provide your name.",
    emailInvalid: "Please provide a valid email address.",
    messageTooShort: "Please include a message with a bit more detail.",
    demoNote: "You’re requesting a Cocoon studio demo. Share a bit about the project, the team, and your timing.",
    intakeNote: "Messages are routed directly into Cocoon Lab’s internal intake queue.",
    demoPlaceholder: "Tell us about your team, project, and what you’d like to see in the demo.",
    contactPlaceholder: "How can we help?",
    demoSubmit: "Book a Studio Demo",
    contactSubmit: "Send Message",
    demoStatus: "Studio demo requests are routed directly into Cocoon Lab’s internal intake queue.",
    sendingDemo: "Routing your demo request to Cocoon Lab...",
    sendingContact: "Sending your message to Cocoon Lab...",
    sendFallback: "We could not send your message right now.",
    sentDemo: "Thanks. Your studio demo request has been routed to Cocoon Lab.",
    sentContact: "Thanks. Your message has been routed to Cocoon Lab.",
    timeout: "The request took too long. Please try again.",
    sending: "Sending...",
  },
  fr: {
    nameRequired: "Veuillez indiquer votre nom.",
    emailInvalid: "Veuillez fournir une adresse courriel valide.",
    messageTooShort: "Ajoutez un message avec un peu plus de contexte.",
    demoNote: "Vous demandez une démo Studio de Cocoon. Partagez quelques détails sur le projet, l’équipe et votre calendrier.",
    intakeNote: "Les messages sont transmis directement à la file d’entrée interne de Cocoon Lab.",
    demoPlaceholder: "Parlez-nous de votre équipe, de votre projet et de ce que vous souhaitez voir dans la démo.",
    contactPlaceholder: "Comment pouvons-nous aider ?",
    demoSubmit: "Réserver une démo Studio",
    contactSubmit: "Envoyer le message",
    demoStatus: "Les demandes de démo Studio sont transmises directement à la file d’entrée interne de Cocoon Lab.",
    sendingDemo: "Transmission de votre demande de démo à Cocoon Lab...",
    sendingContact: "Envoi de votre message à Cocoon Lab...",
    sendFallback: "Nous n’avons pas pu envoyer votre message pour le moment.",
    sentDemo: "Merci. Votre demande de démo Studio a été transmise à Cocoon Lab.",
    sentContact: "Merci. Votre message a été transmis à Cocoon Lab.",
    timeout: "La demande a pris trop de temps. Veuillez réessayer.",
    sending: "Envoi...",
  },
};

const text = contactText[contactLocale];

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
    return text.nameRequired;
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return text.emailInvalid;
  }

  if (!payload.message || payload.message.length < 10) {
    return text.messageTooShort;
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
    intentNote.textContent = isStudioDemo ? text.demoNote : text.intakeNote;
  }

  demoFields.forEach((field) => {
    if (field instanceof HTMLElement) {
      field.hidden = !isStudioDemo;
    }
  });

  if (messageField instanceof HTMLTextAreaElement) {
    messageField.placeholder = isStudioDemo ? text.demoPlaceholder : text.contactPlaceholder;
  }

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.textContent = isStudioDemo ? text.demoSubmit : text.contactSubmit;
  }

  setStatus(
    status,
    "",
    isStudioDemo ? text.demoStatus : text.intakeNote,
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
      submitButton.textContent = text.sending;
    }

    form.setAttribute("aria-busy", "true");
    setStatus(
      status,
      "loading",
      intentMode === "studio-demo" ? text.sendingDemo : text.sendingContact,
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
        throw new Error(data?.error || text.sendFallback);
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
        intentMode === "studio-demo" ? text.sentDemo : text.sentContact,
      );
    } catch (error) {
      const message =
        error instanceof Error && error.name === "AbortError"
          ? text.timeout
          : error instanceof Error
            ? error.message
            : text.sendFallback;

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
