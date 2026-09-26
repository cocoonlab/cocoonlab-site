# Cocoon Lab site

Marketing site for `cocoonlab.ai`.

Built with Vite, React, Tailwind CSS v4, and a small Vercel serverless endpoint for contact intake.

## What is in the repo

- Every page is React: [`src/pages/`](./src/pages/) holds one component per route, registered with its path, output file and EN/FR title in [`src/pages/index.tsx`](./src/pages/index.tsx). The shared header, river and footer live in [`src/site/`](./src/site/), and [`src/App.tsx`](./src/App.tsx) wraps a page in them and keeps the language (`?lang`, then the stored choice, then the browser) in sync.
- Routes: `/`, `/team/`, `/partners/`, `/contact/`, `/blog/`, `/blog/indescanada/`, `/blog/mila-partnership/`, `/monograph/`, `/studio/`, `/press-kit/`, `/privacy/`, `/terms/`, and `/404.html`
- Animated pixel scenes of Montréal in [`src/pixel/`](./src/pixel/): each scene is drawn once into an indexed raster (`raster.ts`), and [`src/PixelScene.tsx`](./src/PixelScene.tsx) paints it to a canvas at a whole-number pixel scale (set by the `--u` custom property), animates it at 12 fps while it is on screen, and holds a still frame when reduced motion is requested
- Static files in `public/`: images, the press kit, cookie consent, feed and sitemap
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

`npm run build` runs the Vite production build and then prerenders every page: the homepage into `dist/index.html`, and each inner page into its own `dist/<route>/index.html` with the head from [`scripts/heads.ts`](./scripts/heads.ts). In development, `npm run dev` serves any route from `index.html` and picks the page from the URL.

## Contact form

The contact page submits to `/api/contact`. Each successful submission creates a GitHub issue.

Required environment variables:

- `CONTACT_GITHUB_REPO=owner/repo`
- `CONTACT_GITHUB_TOKEN=github_token_with_issue_write_access`
