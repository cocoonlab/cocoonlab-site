# Cocoon Lab site

Marketing site for `cocoonlab.ai`.

Built with Vite, React, Tailwind CSS v4, and a small Vercel serverless endpoint for contact intake.

## What is in the repo

- React homepage in [`src/App.tsx`](./src/App.tsx)
- Animated pixel scenes of Montréal in [`src/pixel/`](./src/pixel/): each scene is drawn once into an indexed raster (`raster.ts`), and [`src/PixelScene.tsx`](./src/PixelScene.tsx) paints it to a canvas at a whole-number pixel scale (set by the `--u` custom property), animates it at 12 fps while it is on screen, and holds a still frame when reduced motion is requested
- Shared public page styling in [`public/site-pages.css`](./public/site-pages.css)
- Static routes in `public/`:
  - `/privacy/`
  - `/terms/`
  - `/studio/`
  - `/contact/`
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
