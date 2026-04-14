const MAX_BODY_BYTES = 32_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_COMPANY_LENGTH = 160;
const MAX_PROJECT_LENGTH = 200;
const MAX_TIMING_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 4_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_GITHUB_API_URL = "https://api.github.com";

function getRequestUrl(req) {
  const host = String(req.headers.host || "cocoonlab.ai");
  return new URL(req.url || "/", `https://${host}`);
}

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

function getGitHubConfig() {
  const repo = normalizeText(process.env.CONTACT_GITHUB_REPO);
  const token = normalizeText(process.env.CONTACT_GITHUB_TOKEN);
  const apiUrl = normalizeText(process.env.CONTACT_GITHUB_API_URL) || DEFAULT_GITHUB_API_URL;

  if (!repo || !token) {
    const error = new Error("Missing contact intake configuration.");
    error.code = "CONTACT_INTAKE_NOT_CONFIGURED";
    throw error;
  }

  const match = repo.match(/^([^/\s]+)\/([^/\s]+)$/);

  if (!match) {
    const error = new Error("Invalid CONTACT_GITHUB_REPO format.");
    error.code = "CONTACT_INTAKE_INVALID_REPO";
    throw error;
  }

  return {
    apiUrl: apiUrl.replace(/\/+$/, ""),
    owner: match[1],
    repo: match[2],
    token,
  };
}

function getGitHubConfigStatus() {
  const repo = normalizeText(process.env.CONTACT_GITHUB_REPO);
  const token = normalizeText(process.env.CONTACT_GITHUB_TOKEN);
  const missing = [];

  if (!repo) {
    missing.push("CONTACT_GITHUB_REPO");
  }

  if (!token) {
    missing.push("CONTACT_GITHUB_TOKEN");
  }

  const repoFormatValid = !repo || /^([^/\s]+)\/([^/\s]+)$/.test(repo);

  return {
    configured: missing.length === 0 && repoFormatValid,
    missing,
    repoFormatValid,
    repo,
    labelsConfigured: getLabels().length > 0,
    assigneesConfigured: getAssignees().length > 0,
  };
}

async function requestGitHubJson(url, token, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "cocoonlab-contact-intake",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(payload),
  });

  const contentType = String(response.headers.get("content-type") ?? "");
  const data = contentType.includes("application/json") ? await response.json() : await response.text();

  return { response, data };
}

function normalizeIntent(value) {
  return value === "studio-demo" ? "studio-demo" : "contact";
}

function issueTitle({ intent, name, company }) {
  const prefix = intent === "studio-demo" ? "[Studio Demo]" : "[Contact]";
  const suffix = company ? `${name} - ${company}` : name;
  return truncate(`${prefix} ${suffix}`, 240);
}

function issueBody({ intent, name, email, company, project, preferredTiming, message, page, submittedAt, sourceIp, userAgent }) {
  return [
    "New contact submission from cocoonlab.ai.",
    "",
    "## Intake",
    `- Type: ${intent === "studio-demo" ? "Studio demo request" : "General contact message"}`,
    "",
    "## Contact",
    `- Name: ${escapeInline(name)}`,
    `- Email: ${escapeInline(email)}`,
    company ? `- Company: ${escapeInline(company)}` : "",
    project ? `- Project: ${escapeInline(project)}` : "",
    preferredTiming ? `- Preferred timing: ${escapeInline(preferredTiming)}` : "",
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
  const project = truncate(normalizeText(payload.project), MAX_PROJECT_LENGTH);
  const preferredTiming = truncate(normalizeText(payload.preferredTiming), MAX_TIMING_LENGTH);
  const intent = normalizeIntent(normalizeText(payload.intent));
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
      intent,
      project,
      preferredTiming,
      message,
      page,
    },
  };
}

async function createGitHubIssue(payload) {
  const { apiUrl, owner, repo, token } = getGitHubConfig();

  const labels = getLabels();
  const assignees = getAssignees();
  const issueUrl = `${apiUrl}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`;
  const baseIssuePayload = {
    title: issueTitle(payload),
    body: issueBody(payload),
  };

  const { response, data } = await requestGitHubJson(issueUrl, token, baseIssuePayload);

  if (!response.ok) {
    const error = new Error(
      `GitHub issue creation failed: ${response.status} ${
        typeof data === "string" ? data : JSON.stringify(data)
      }`,
    );

    if (response.status === 401 || response.status === 403) {
      error.code = "CONTACT_INTAKE_GITHUB_AUTH";
    } else if (response.status === 404) {
      error.code = "CONTACT_INTAKE_GITHUB_NOT_FOUND";
    } else {
      error.code = "CONTACT_INTAKE_GITHUB_ERROR";
    }

    throw error;
  }

  const createdIssue = data;

  if (labels.length) {
    const labelUrl = `${apiUrl}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${createdIssue.number}/labels`;
    const labelResult = await requestGitHubJson(labelUrl, token, { labels });

    if (!labelResult.response.ok) {
      console.warn("[contact-api] Could not apply labels to contact issue.", {
        status: labelResult.response.status,
        labels,
      });
    }
  }

  if (assignees.length) {
    const assigneeUrl = `${apiUrl}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${createdIssue.number}/assignees`;
    const assigneeResult = await requestGitHubJson(assigneeUrl, token, { assignees });

    if (!assigneeResult.response.ok) {
      console.warn("[contact-api] Could not assign contact issue.", {
        status: assigneeResult.response.status,
        assignees,
      });
    }
  }

  return createdIssue;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const requestUrl = getRequestUrl(req);

    if (requestUrl.searchParams.get("health") !== "1") {
      return sendJson(
        res,
        405,
        { error: "Method not allowed." },
        {
          Allow: "POST, GET",
        },
      );
    }

    const status = getGitHubConfigStatus();

    return sendJson(res, status.configured ? 200 : 503, {
      ok: status.configured,
      configured: status.configured,
      repo: status.repo || null,
      repoFormatValid: status.repoFormatValid,
      missing: status.missing,
      labelsConfigured: status.labelsConfigured,
      assigneesConfigured: status.assigneesConfigured,
    });
  }

  if (req.method !== "POST") {
    return sendJson(
      res,
      405,
      { error: "Method not allowed." },
      {
        Allow: "POST, GET",
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

    const code = error && typeof error === "object" && "code" in error ? error.code : "";
    const status =
      code === "CONTACT_INTAKE_NOT_CONFIGURED" || code === "CONTACT_INTAKE_INVALID_REPO" ? 503 : 502;

    let message = "We could not send your message right now. Please try again shortly.";

    if (status === 503) {
      message = "The contact form is temporarily unavailable. Please email rashid@cocoonlab.ai directly while we restore it.";
    } else if (code === "CONTACT_INTAKE_GITHUB_AUTH") {
      message = "The contact form is connected, but GitHub rejected the request. Please check the token and repository permissions.";
    } else if (code === "CONTACT_INTAKE_GITHUB_NOT_FOUND") {
      message = "The contact form is connected, but the configured GitHub repository could not be found.";
    }

    return sendJson(res, status, {
      error: message,
      code: code || "CONTACT_INTAKE_UNKNOWN",
    });
  }
}
