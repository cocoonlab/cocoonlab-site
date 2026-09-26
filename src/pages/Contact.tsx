import { useEffect, useState, type FormEvent } from "react";
import { Glyph } from "../Glyph.tsx";
import { glyphs } from "../pixel/glyphs.ts";
import { useSite } from "../site/Site.tsx";
import { PageIntro } from "../site/ui.tsx";
import { textLink, wrap } from "../site/styles.ts";

const EMAIL = "rashid@cocoonlab.ai";

const copy = {
  en: {
    title: "Contact",
    lead: "Book a demo, ask a question, or bring a real project for us to test.",
    detailsLabel: "Contact details",
    email: "Email",
    location: "Location",
    place: ["Montréal, Québec", "Canada"],
    focus: "Focus",
    focusText: "Demos, partnerships, and product questions about Cocoon Triage and Cocoon Code.",
    formLabel: "Send a message",
    name: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    company: "Company",
    companyPlaceholder: "Your company",
    project: "Project",
    projectPlaceholder: "Project or site context",
    timing: "Preferred timing",
    timingPlaceholder: "When would you like the demo?",
    message: "Message",
    required: "required",
    contactPlaceholder: "How can we help?",
    demoPlaceholder: "Tell us about your team, project, and what you’d like to see in the demo.",
    demoNote: (product: string) =>
      product ? `You’re booking a demo of ${product}. Share the project, team, and timing.` : "You’re booking a demo. Share the project, team, and timing.",
    contactSubmit: "Send message",
    demoSubmit: "Book a demo",
    sending: "Sending…",
    intakeNote: "Messages go straight to Cocoon Lab.",
    demoStatus: "Demo requests go straight to Cocoon Lab.",
    sendingContact: "Sending your message to Cocoon Lab…",
    sendingDemo: "Sending your demo request to Cocoon Lab…",
    sentContact: "Thanks. Your message has been sent to Cocoon Lab.",
    sentDemo: "Thanks. Your demo request has been sent to Cocoon Lab.",
    nameRequired: "Please provide your name.",
    emailInvalid: "Please provide a valid email address.",
    messageTooShort: "Please include a message with a bit more detail.",
    sendFallback: "We could not send your message right now.",
    timeout: "The request took too long. Please try again.",
  },
  fr: {
    title: "Contact",
    lead: "Réservez une démo, posez une question ou apportez un vrai projet à tester avec nous.",
    detailsLabel: "Coordonnées",
    email: "Courriel",
    location: "Lieu",
    place: ["Montréal, Québec", "Canada"],
    focus: "Priorités",
    focusText: "Démos, partenariats et questions sur Cocoon Triage et Cocoon Code.",
    formLabel: "Envoyer un message",
    name: "Nom",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "vous@organisation.com",
    company: "Organisation",
    companyPlaceholder: "Votre organisation",
    project: "Projet",
    projectPlaceholder: "Contexte du projet ou du site",
    timing: "Moment souhaité",
    timingPlaceholder: "Quel moment vous conviendrait pour la démo ?",
    message: "Message",
    required: "obligatoire",
    contactPlaceholder: "Comment pouvons-nous aider ?",
    demoPlaceholder: "Parlez-nous de votre équipe, de votre projet et de ce que vous souhaitez voir dans la démo.",
    demoNote: (product: string) =>
      product ? `Vous réservez une démo de ${product}. Partagez le projet, l’équipe et le calendrier.` : "Vous réservez une démo. Partagez le projet, l’équipe et le calendrier.",
    contactSubmit: "Envoyer le message",
    demoSubmit: "Réserver une démo",
    sending: "Envoi…",
    intakeNote: "Les messages vont directement à Cocoon Lab.",
    demoStatus: "Les demandes de démo vont directement à Cocoon Lab.",
    sendingContact: "Envoi de votre message à Cocoon Lab…",
    sendingDemo: "Envoi de votre demande de démo à Cocoon Lab…",
    sentContact: "Merci. Votre message a été transmis à Cocoon Lab.",
    sentDemo: "Merci. Votre demande de démo a été envoyée à Cocoon Lab.",
    nameRequired: "Veuillez indiquer votre nom.",
    emailInvalid: "Veuillez fournir une adresse courriel valide.",
    messageTooShort: "Ajoutez un message avec un peu plus de contexte.",
    sendFallback: "Nous n’avons pas pu envoyer votre message pour le moment.",
    timeout: "La demande a pris trop de temps. Veuillez réessayer.",
  },
} as const;

type Intent = "contact" | "studio-demo";

const productNames: Record<string, string> = { triage: "Cocoon Triage", code: "Cocoon Code" };
type Status = { state: "" | "loading" | "success" | "error"; message: string };

const fieldClass =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 pb-3 pt-1 font-body text-[1.0625rem] text-ink placeholder:text-muted/60 transition-colors duration-200 hover:border-ink/50 focus:border-civic focus:shadow-[0_1px_0_var(--color-civic)] focus:outline-hidden";

function Field({
  name,
  label,
  required,
  requiredLabel,
  multiline,
  ...input
}: {
  name: string;
  label: string;
  required?: boolean;
  requiredLabel: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  defaultValue?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-body text-[0.8125rem] font-medium text-muted">
        {label}
        {required ? <span className="sr-only"> ({requiredLabel})</span> : null}
      </label>
      {multiline ? (
        <textarea id={id} name={name} rows={5} required={required} className={`${fieldClass} resize-y`} {...input} />
      ) : (
        <input id={id} name={name} type={input.type ?? "text"} required={required} className={fieldClass} {...input} />
      )}
    </div>
  );
}

function ContactForm() {
  const { locale } = useSite();
  const text = copy[locale];
  // The intent and product come from the URL, so they are read after hydration to keep the markup identical.
  const [intent, setIntent] = useState<Intent>("contact");
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState<Status>({ state: "", message: "" });
  const [sending, setSending] = useState(false);
  const demo = intent === "studio-demo";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("intent") === "studio-demo") setIntent("studio-demo");
    setProduct(productNames[params.get("product") ?? ""] ?? "");
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const payload = {
      name: field("name"),
      email: field("email"),
      company: field("company"),
      intent,
      project: field("project"),
      preferredTiming: field("preferredTiming"),
      message: field("message"),
      website: field("website"),
      page: window.location.href,
    };

    const invalid = !payload.name
      ? text.nameRequired
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
        ? text.emailInvalid
        : payload.message.length < 10
          ? text.messageTooShort
          : "";
    if (invalid) {
      setStatus({ state: "error", message: invalid });
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    setSending(true);
    setStatus({ state: "loading", message: demo ? text.sendingDemo : text.sendingContact });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(body?.error || text.sendFallback);
      form.reset();
      setStatus({ state: "success", message: demo ? text.sentDemo : text.sentContact });
    } catch (error) {
      const message =
        error instanceof Error && error.name === "AbortError" ? text.timeout : error instanceof Error ? error.message : text.sendFallback;
      setStatus({ state: "error", message });
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  };

  const statusColor = status.state === "error" ? "text-[#8e3b2f]" : status.state === "success" ? "text-civic" : "text-muted";

  return (
    <form id="contact-form" noValidate aria-label={text.formLabel} aria-busy={sending || undefined} onSubmit={submit} className="grid gap-8">
      <input type="hidden" name="intent" value={intent} />
      {demo ? <p className="font-body text-[1.0625rem] leading-[1.55] text-ink">{text.demoNote(product)}</p> : null}
      <Field name="name" label={text.name} placeholder={text.namePlaceholder} autoComplete="name" maxLength={120} required requiredLabel={text.required} />
      <Field
        name="email"
        type="email"
        label={text.email}
        placeholder={text.emailPlaceholder}
        autoComplete="email"
        maxLength={160}
        required
        requiredLabel={text.required}
      />
      <Field
        name="company"
        label={text.company}
        placeholder={text.companyPlaceholder}
        autoComplete="organization"
        maxLength={160}
        requiredLabel={text.required}
      />
      {demo ? (
        <>
          <Field
            key={product}
            name="project"
            label={text.project}
            placeholder={text.projectPlaceholder}
            defaultValue={product}
            maxLength={200}
            requiredLabel={text.required}
          />
          <Field name="preferredTiming" label={text.timing} placeholder={text.timingPlaceholder} maxLength={160} requiredLabel={text.required} />
        </>
      ) : null}
      <Field
        name="message"
        label={text.message}
        placeholder={demo ? text.demoPlaceholder : text.contactPlaceholder}
        maxLength={4000}
        required
        multiline
        requiredLabel={text.required}
      />
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-12 items-center gap-4 bg-ink pl-5 pr-[1.125rem] font-body text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-civic disabled:cursor-progress disabled:opacity-70"
        >
          {sending ? text.sending : demo ? text.demoSubmit : text.contactSubmit}
          <Glyph glyph={glyphs.arrowRight} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
        <p aria-live="polite" className={`font-body text-[0.875rem] ${statusColor}`}>
          {status.message || (demo ? text.demoStatus : text.intakeNote)}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  const { locale } = useSite();
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.title} lead={text.lead} />

      <div className={`${wrap} mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-12 gap-x-6 gap-y-16`}>
        <dl aria-label={text.detailsLabel} className="col-span-12 self-start border-t border-line lg:col-span-4">
          <div className="grid gap-1.5 border-b border-line py-5">
            <dt className="font-body text-[0.8125rem] font-medium text-muted">{text.email}</dt>
            <dd className="font-display text-[1.375rem] font-medium tracking-[-0.015em]">
              <a href={`mailto:${EMAIL}`} className={textLink}>
                {EMAIL}
              </a>
            </dd>
          </div>
          <div className="grid gap-1.5 border-b border-line py-5">
            <dt className="font-body text-[0.8125rem] font-medium text-muted">{text.location}</dt>
            <dd className="font-body text-[1.0625rem] leading-[1.5]">
              {text.place[0]}
              <br />
              {text.place[1]}
            </dd>
          </div>
          <div className="grid gap-1.5 border-b border-line py-5">
            <dt className="font-body text-[0.8125rem] font-medium text-muted">{text.focus}</dt>
            <dd className="max-w-[22rem] font-body text-[1.0625rem] leading-[1.5]">{text.focusText}</dd>
          </div>
        </dl>
        <div className="relative col-span-12 lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
