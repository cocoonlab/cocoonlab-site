# Cocoon Lab marketing site (Next.js)

This is a dark, Cocoon-branded marketing site rebuilt on **Next.js 14 (App Router) with TypeScript and Tailwind CSS**.

## Getting started

```bash
pnpm install    # or npm / yarn
pnpm dev        # runs on http://localhost:3000
```

## Environment variables

Create a `.env.local` file:

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

## Deployment notes

- Optimised for deployment on **Vercel**.
- App Router automatically enables static optimisation where possible.
- Images under `public/images` should be wired through `<Image />` from `next/image` for responsive sizing and built-in optimisation (WebP, AVIF, lazy loading).
- For DALL·E / marketing assets, export at 2x resolution and keep under ~300–400 KB each. Next will generate multiple sizes.
- You can configure cache headers for additional assets (fonts, etc.) via `next.config.mjs` or a custom `middleware.ts` if needed.
- Use separate projects or environments in Vercel for `preview` vs `production` and set `NEXT_PUBLIC_VERCEL_ENV` accordingly to toggle analytics domains, feature flags, etc.

## Swappable analytics

Analytics are wired via `lib/analytics.tsx` and configured in `lib/config.ts`. The provider can be switched between **Plausible** and **Umami** by changing `NEXT_PUBLIC_ANALYTICS_PROVIDER` and related env vars.

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
