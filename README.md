# Cocoon Lab marketing site (Next.js)

This is a dark, Cocoon-branded marketing site rebuilt on **Next.js 14 (App Router) with TypeScript and Tailwind CSS**.

## Prerequisites
- Node.js 18+
- pnpm (preferred) or npm/yarn

## Getting started

```bash
pnpm install    # install dependencies
pnpm dev        # start the dev server at http://localhost:3000
```

## Environment variables

Create a `.env.local` file with the values you need:

```bash
NEXT_PUBLIC_SITE_URL=https://cocoonlab.ai
NEXT_PUBLIC_VERCEL_ENV=development   # or preview / production

NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible   # or umami
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=cocoonlab.ai  # if using Plausible

# If using Umami instead:
# NEXT_PUBLIC_ANALYTICS_PROVIDER=umami
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxx
# NEXT_PUBLIC_UMAMI_SRC=https://analytics.yourdomain.com/script.js
```

## Routes

- `/` – main marketing page (hero, product, how it works, use cases, customers, pricing, resources, newsletter)
- `/pricing` – dedicated pricing page
- `/resources` – resources grid
- `/changelog` – reads from `data/changelog.json`
- `/contact` – contact form, also links to `mailto:rashid@cocoonlab.ai`
- `/waitlist` – early-access waitlist with enriched social proof
- `/app` – placeholder shell for the actual Cocoon product
- `/api/newsletter` – validates and accepts newsletter signups
- `/api/waitlist` – validates and stores waitlist entries in-memory + fires placeholder confirmation email
- `/api/contact` – accepts basic contact messages for future CRM integration

## Development notes

- **Analytics**: switch between Plausible and Umami in `lib/analytics.tsx` + `lib/config.ts` using `NEXT_PUBLIC_ANALYTICS_PROVIDER` and related env vars.
- **Images**: use `<Image />` from `next/image` for assets in `public/images` to get responsive sizing and built-in optimisation (WebP, AVIF, lazy loading).
- **Hero visual**: drop your `website-main-vis.png` into `public/images/` to replace the placeholder graphic shown in the hero (keep the filename exactly the same).
- **CTAs**: the primary “Get early access” / “Start designing” links are centralised in `components/PrimaryCtaLink.tsx` and depend on `useAuthUser` from `lib/auth.tsx` (see “Marketing → product flows”).
- **Deployment**: optimised for Vercel; App Router enables static optimisation where possible. Configure additional cache headers in `next.config.mjs` or via middleware if needed. Use separate Vercel projects/environments for preview vs production and set `NEXT_PUBLIC_VERCEL_ENV` accordingly.

## Running checks

```bash
pnpm lint
pnpm test   # if you add tests
```

## Forms

- Newsletter form (`components/NewsletterForm`) posts to `/api/newsletter` with inline validation + success / error states.
- Waitlist form (`components/waitlist/WaitlistForm`) posts to `/api/waitlist`; entries are kept in an in-memory store (`lib/waitlistStore.ts`) and a placeholder email is logged via `lib/email.ts`.
- Contact form posts to `/api/contact`, which is ready to be wired to your CRM or email tool.

Before production, replace placeholder privacy / terms copy and hook `lib/email.ts` into your transactional email provider.

## Marketing → product flows

- The primary “Get early access” / “Start designing” CTAs are centralised in `components/PrimaryCtaLink.tsx`.
- `PrimaryCtaLink` calls `useAuthUser` from `lib/auth.tsx`:
  - If a user object is present, CTAs link to `/app`.
  - Otherwise they link to `/waitlist`.
- Today `useAuthUser` reads from `window.__COCOON_USER` as a lightweight placeholder so you can simulate auth in development.
  - In production, replace the implementation of `useAuthUser` with your real auth provider (NextAuth, Clerk, custom JWT, etc.) and keep the returned `{ user, isLoading }` shape stable.
- The `/app` route is a placeholder shell for the authenticated Cocoon product; swap this out or mount your actual app shell when ready.
