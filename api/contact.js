const MAX_BODY_BYTES = 32_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_COMPANY_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 4_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendJson(res, status, payload, extraHeaders = {}) {
  Object.entries({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders,
  }).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  res.statusCode = status;
  res.end(JSON.stringify(payload));
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;

      if (raw.length > MAX_BODY_BYTES) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });

    req.on("end", () => resolve(raw));
    req.on("error", reject);
  });
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const raw = await readRawBody(req);

  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function escapeInline(value) {
  return String(value ?? "")
    .replace(/[`*_{}[\]()#+\-!.|>]/g, "\\$&")
    .replace(/\s+/g, " ")
    .trim();
}

function toBlockquote(value) {
  return normalizeText(value)
    .split("\n")
    .map((line) => `> ${line || " "}`)
    .join("\n");
}

function truncate(value, maxLength) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function getLabels() {
  return String(process.env.CONTACT_GITHUB_LABELS ?? "")
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
}

function getAssignees() {
  return String(process.env.CONTACT_GITHUB_ASSIGNEES ?? "")
    .split(",")
    .map((assignee) => assignee.trim())
    .filter(Boolean);
}

function issueTitle({ name, company }) {
  const suffix = company ? `${name} - ${company}` : name;
  return truncate(`[Contact] ${suffix}`, 240);
}

function issueBody({ name, email, company, message, page, submittedAt, sourceIp, userAgent }) {
  return [
    "New contact submission from cocoonlab.ai.",
    "",
    "## Contact",
    `- Name: ${escapeInline(name)}`,
    `- Email: ${escapeInline(email)}`,
    company ? `- Company: ${escapeInline(company)}` : "",
    `- Submitted at: ${escapeInline(submittedAt)}`,
    page ? `- Page: ${escapeInline(page)}` : "",
    sourceIp ? `- Source IP: ${escapeInline(sourceIp)}` : "",
    userAgent ? `- User agent: ${escapeInline(userAgent)}` : "",
    "",
    "## Message",
    toBlockquote(message),
  ]
    .filter(Boolean)
    .join("\n");
}

function validatePayload(payload) {
  const name = truncate(normalizeText(payload.name), MAX_NAME_LENGTH);
  const email = truncate(normalizeText(payload.email).toLowerCase(), MAX_EMAIL_LENGTH);
  const company = truncate(normalizeText(payload.company), MAX_COMPANY_LENGTH);
  const message = truncate(normalizeText(payload.message), MAX_MESSAGE_LENGTH);
  const website = normalizeText(payload.website);
  const page = normalizeText(payload.page);

  if (website) {
    return { honeypotTriggered: true };
  }

  if (!name) {
    return { error: "Please provide your name." };
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  if (!message || message.length < 10) {
    return { error: "Please include a message with a bit more detail." };
  }

  return {
    data: {
      name,
      email,
      company,
      message,
      page,
    },
  };
}

async function createGitHubIssue(payload) {
  const repo = process.env.CONTACT_GITHUB_REPO;
  const token = process.env.CONTACT_GITHUB_TOKEN;

  if (!repo || !token) {
    throw new Error("Contact intake is not configured.");
  }

  const labels = getLabels();
  const assignees = getAssignees();
  const issuePayload = {
    title: issueTitle(payload),
    body: issueBody(payload),
    ...(labels.length ? { labels } : {}),
    ...(assignees.length ? { assignees } : {}),
  };

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "cocoonlab-contact-intake",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(issuePayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub issue creation failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(
      res,
      405,
      { error: "Method not allowed." },
      {
        Allow: "POST",
      },
    );
  }

  const contentType = String(req.headers["content-type"] ?? "");

  if (!contentType.includes("application/json")) {
    return sendJson(res, 415, { error: "Unsupported content type." });
  }

  try {
    const payload = await parseJsonBody(req);
    const validation = validatePayload(payload);

    if (validation.honeypotTriggered) {
      return sendJson(res, 202, { ok: true });
    }

    if (validation.error) {
      return sendJson(res, 400, { error: validation.error });
    }

    const forwardedFor = String(req.headers["x-forwarded-for"] ?? "")
      .split(",")[0]
      .trim();
    const userAgent = String(req.headers["user-agent"] ?? "").trim();
    const submittedAt = new Date().toISOString();

    const issue = await createGitHubIssue({
      ...validation.data,
      submittedAt,
      sourceIp: forwardedFor,
      userAgent,
      page: validation.data.page || "https://cocoonlab.ai/contact/",
    });

    return sendJson(res, 201, {
      ok: true,
      issueNumber: issue.number,
      issueUrl: issue.html_url,
    });
  } catch (error) {
    console.error("[contact-api]", error);

    const message = error instanceof Error ? error.message : "Unexpected error.";
    const status = message === "Contact intake is not configured." ? 503 : 502;

    return sendJson(res, status, {
      error:
        status === 503
          ? "Contact intake is not configured yet."
          : "We could not send your message right now. Please try again shortly.",
    });
  }
}
