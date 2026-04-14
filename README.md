# Cocoon Lab site

Marketing site for `cocoonlab.ai`.

Built with Vite, React, Tailwind CSS v4, and a small Vercel serverless endpoint for contact intake.

## What is in the repo

- React homepage in [`src/App.tsx`](./src/App.tsx)
- Shared public page styling in [`public/site-pages.css`](./public/site-pages.css)
- Static routes in `public/`:
  - `/privacy/`
  - `/terms/`
  - `/studio/`
  - `/contact/`
  - `/partners/`
  - `/team/`
  - `/blog/`
  - `/monograph/`
- Contact intake endpoint in [`api/contact.js`](./api/contact.js)
- Build-time prerender step in [`scripts/prerender.tsx`](./scripts/prerender.tsx)

## Local development

Requirements:

- Node.js `20+`
- npm

Commands:

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deploy

The project is configured for Vercel in [`vercel.json`](./vercel.json).

- install: `npm install`
- build: `npm run build`
- output: `dist`

`npm run build` runs the Vite production build and then prerenders the homepage HTML into `dist/index.html`.

## Contact form

The contact page submits to `/api/contact`. Each successful submission creates a GitHub issue.

Required environment variables:

- `CONTACT_GITHUB_REPO=owner/repo`
- `CONTACT_GITHUB_TOKEN=github_token_with_issue_write_access`

Optional:

- `CONTACT_GITHUB_LABELS=contact,website`
- `CONTACT_GITHUB_ASSIGNEES=username1,username2`
- `CONTACT_GITHUB_API_URL=https://api.github.com`

Use [`.env.example`](./.env.example) as the local reference.

### Verify contact intake

After setting the environment variables and redeploying, open:

- `https://cocoonlab.ai/api/contact?health=1`

Expected configured response:

```json
{
  "ok": true,
  "configured": true,
  "repo": "owner/repo",
  "repoFormatValid": true,
  "missing": [],
  "labelsConfigured": false,
  "assigneesConfigured": false
}
```

If `configured` is `false`, the `missing` field will tell you what still needs to be set.

## GitHub token setup

Use a fine-grained personal access token scoped to the single repo that should receive contact issues.

Required repository permission:

- `Issues: Read and write`

If the repo belongs to an organization, the token may need org approval before it works.
