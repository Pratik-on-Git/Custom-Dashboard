# Custom NextJS ShadCN Dashboard

A custom admin dashboard, a reusable boilerplate for new projects, and a library of custom-built, data-driven
components.

The app runs on Next.js 16 (App Router), React 19, Tailwind CSS v4 and shadcn/ui (`base-vega` style on
**Base UI**). Pages are built from a shared **global component layer** with a single colour vocabulary (`tone`), so a
new screen is mostly typed data plus a few components put together.

> Started from [AdminCN Free](https://shadcnstudio.com/templates/admin-dashboard-free/admincn) by
> shadcn/studio (MIT). See [Credits & License](#credits--license).

---

## Highlights

- **Reusable component system**: `src/components/global/` holds generic, domain-free components (stats, list rows,
  status pills, steppers, phase tracks, meters, charts). Data comes in through props, and visual differences are
  `cva` variants.
- **One colour vocabulary**: every component is coloured through the shared `tone` prop, which maps to design
  tokens in `globals.css`. There are no hard-coded colours, and light and dark themes come for free.
- **Monochrome design system**: data uses `primary` and its opacity steps. Status hues (`success`, `warning`,
  `info`, `danger`) are used only where the colour means something.
- **Modular feature code**: route → view → sections. Mock data lives in `fake-db/`, types in `types/`, and the
  domain-to-UI mapping in each view's `config.tsx`.
- **Ready-made pages**: two dashboards, Mail / Calendar / Users apps, auth flows, forms, data tables, and profile
  and settings pages.
- **Strict tooling**: TypeScript, ESLint (import grouping, stylistic rules) and Prettier with Tailwind class sorting.

## Tech Stack

| Area          | Library                                                               |
| ------------- | --------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Server Actions), React 19                     |
| Styling       | Tailwind CSS v4, `tw-animate-css`, oklch design tokens, `next-themes` |
| UI primitives | shadcn/ui on Base UI (`@base-ui/react`), `class-variance-authority`   |
| Icons         | `lucide-react`                                                        |
| Charts        | `recharts` via the shadcn `ChartContainer`                            |
| Forms         | `react-hook-form`, `zod`, `@hookform/resolvers`, `input-otp`          |
| Tables        | `@tanstack/react-table`                                               |
| State in URL  | `nuqs`                                                                |
| Misc          | `date-fns`, `cmdk`, `sonner`, `react-resizable-panels`                |

## What's Included

| Section        | Route                                                                 | Notes                                                                                     |
| -------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Orders         | `/dashboard/orders`                                                   | Default home page (`/` redirects here). Statistics, sales metrics chart, earnings widgets |
| Users          | `/dashboard/users`                                                    | Operations dashboard built entirely on the global component layer (see below)             |
| Mail           | `/apps/mail`                                                          | Resizable inbox, mail display                                                             |
| Calendar       | `/apps/calendar`                                                      | Event calendar with current-time indicator                                                |
| Users app      | `/apps/users/list`, `/apps/users/view`                                | Paginated list, add/edit user sheet, user detail tabs                                     |
| User Profile   | `/pages/user-profile?view=profile \| connections`                     |                                                                                           |
| User Settings  | `/pages/user-settings?setting=general \| workspace`                   |                                                                                           |
| Authentication | `/pages/auth/*`                                                       | Login, Register, Forgot Password, Verify Email, Reset Password, Two Steps                 |
| Error          | `/pages/misc/error-page`, custom `not-found`                          |                                                                                           |
| Forms          | `/forms/form-layouts/{vertical,horizontal}`, `/forms/form-validation` | `react-hook-form` + `zod`                                                                 |
| Data Table     | `/datatable`                                                          | Basic, filters, and pinnable-columns variants                                             |

### The Users dashboard (reference implementation)

`/dashboard/users` is the reference for how new pages should be built. It shows a greenhouse operations overview:
season progress, today's floor, per-house cards, crop cycles, pest traps, dispatch orders, tasks and activity. Every
section is a thin file under `views/dashboards/users/sections/` that only combines global components. All data comes
from `fake-db/dashboards/users.ts` and is typed in `types/dashboards/users-types.ts`.

## Architecture

```text
src/
  app/(pages)/<route>/page.tsx      → thin: loads data, renders the view
  views/<area>/<feature>/
    index.tsx                       → page composition / grid only
    config.tsx                      → domain → UI mapping (tones, icons, labels, routes)
    sections/*.tsx                  → one file per section, composes global components
  components/
    ui/                             → shadcn primitives (wrap them in global/, don't edit for feature needs)
    global/
      variants/tone.ts              → shared colour vocabulary (Tone, toneStyle, toneFor, createToneScale)
      micro/                        → atoms
      layout/                       → page-level building blocks
      data-display/                 → stats, rows, pills, progress and timeline components
      charts/                       → chart components
      inputs/                       → input controls
  fake-db/<area>/                   → typed mock data
  types/<area>/                     → domain types
  utils/format-utils.ts             → number / unit / currency / percent formatting
```

### Global component inventory

Check this table before writing any UI.

| Need                                   | Component                                     |
| -------------------------------------- | --------------------------------------------- |
| Page title + copy + actions            | `PageHeader`                                  |
| Any card section                       | `SectionCard` (`variant="accent"`, `leading`) |
| Labelled number / KPI / mini stat      | `Stat` (`variant="plain" \| "tile"`, `size`)  |
| Row of KPIs                            | `StatGroup` (`variant="divided" \| "plain"`)  |
| Status / phase chip                    | `StatusPill`                                  |
| Trend %                                | `DeltaBadge`                                  |
| Series key                             | `Legend`                                      |
| Any list (tasks, feed, orders, people) | `ListRowGroup` + `ListRow`                    |
| Multi-step status                      | `Stepper`                                     |
| Proportional timeline with "today"     | `PhaseTrack`                                  |
| Value vs limit                         | `ThresholdBar` / `ThresholdMeter`             |
| Parts of a total                       | `SegmentedBar`                                |
| Value vs target                        | `ProgressMeter`                               |
| Line / area trend, comparison series   | `AreaTrendChart`                              |
| Chart tooltip                          | `ChartTooltipPanel`                           |
| Tiny trend / recent histogram          | `Sparkline` / `MiniBars`                      |
| Single-choice switch                   | `SegmentedControl`                            |
| Icon in a tinted square / icon + text  | `IconTile` / `MetaItem`                       |
| "Go somewhere →" link button           | `ActionLink`                                  |
| Initials avatar / status dots          | `InitialsAvatar` / `ColorDot`, `LiveDot`      |

### Colour and theming

- Tokens live in `src/app/globals.css` (oklch, light and `.dark`).
- Components set `--tone` with `toneStyle(tone)` and style with `bg-(--tone)/12`, `text-(--tone)`,
  `border-(--tone)`.
- **Data / brand** → `primary`, `primary-60`, `primary-30`. Use `createToneScale(keys)` to tell parts of a whole
  apart.
- **Status** → `success` / `warning` / `info` / `danger`, only where the colour carries meaning.
- **Quiet** → `neutral` / `muted`.
- To add a new colour, add a token to `globals.css` and a key to `toneTokens`. Never use raw palette classes such as
  `text-green-600`.

## Building a New Page

1. Add types in `src/types/<area>/` and typed mock data in `src/fake-db/<area>/`. Keep the data plain and
   serialisable: no JSX, no tones.
2. Create `src/views/<area>/<feature>/` with `index.tsx` (grid only), `config.tsx` (icons, tones, labels and routes
   mapped from the domain) and one `sections/*.tsx` file per card.
3. Build sections only from global components. If something is missing, add it to `src/components/global/` as a
   generic, prop-driven component, or add a `cva` variant to an existing one. Never copy a component to change its
   colour or size.
4. Add a thin route in `src/app/(pages)/<route>/page.tsx` and, if needed, a link in `src/configs/navConfig.tsx`.
5. Run the checks: `npx prettier --check`, `npx eslint`, `npx tsc --noEmit`.

The full rule set, including the pre-merge checklist, is in [CLAUDE.md](CLAUDE.md).

## Getting Started

### Prerequisites

- Node.js 20.9 or later (required by Next.js 16)
- npm (the repo ships a `package-lock.json`)

### Install and run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /dashboard/orders
```

### Production

```bash
npm run build
npm run start
```

### Environment variables

Copy `.env.example` to `.env`:

| Variable              | Purpose                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `BASEPATH`            | Optional sub-path to serve the app from (`next.config.ts` → `basePath`)                  |
| `NEXT_PUBLIC_APP_URL` | Public URL used for Open Graph metadata                                                  |
| `EMAIL`               | shadcn/studio account email, only needed to pull `@ss-*` registry items via `shadcn add` |
| `LICENSE_KEY`         | shadcn/studio license key, same as above                                                 |

## Scripts

| Command                      | Action                                          |
| ---------------------------- | ----------------------------------------------- |
| `npm run dev`                | Start the Next.js dev server                    |
| `npm run build`              | Create a production build                       |
| `npm run start`              | Serve the production build                      |
| `npm run lint`               | Run ESLint                                      |
| `npm run lint:fix`           | Run ESLint and auto-fix                         |
| `npm run format`             | Format `src/**/*.{js,jsx,ts,tsx}` with Prettier |
| `npm run check-types`        | Type-check with `tsc --noEmit`                  |
| `npm run clean`              | Remove `.next` and `dist`                       |
| `npm run clean:node_modules` | Remove `.next`, `dist` and `node_modules`       |

## Code Style

- Prettier: no semicolons, single quotes (JSX too), print width 120, no trailing commas, Tailwind class sorting
  (also inside `cn`/`clsx`/`cva`).
- ESLint enforces grouped imports with `// X Imports` comments (React → Next → Third-party → Type → Component →
  Config → Util) and `import type` for types.
- Use `'use client'` only for components with state, effects or recharts. Sections stay server components otherwise.
- Pages, views and sections use default exports. Global components use named exports (plus their `…Variants` and
  `…Props`).
- Base UI, not Radix: links rendered as buttons use `render={<Link href='…' />} nativeButton={false}`.

## Folder Structure

```text
|-- public/images/                 # Avatars, brands, flags, widget and datatable images, OG image
|-- src/
|   |-- app/
|   |   |-- (pages)/               # Routes inside the admin shell (sidebar + header)
|   |   |   |-- dashboard/         # orders, users
|   |   |   |-- apps/              # mail, calendar, users (list, view)
|   |   |   |-- pages/             # user-profile, user-settings
|   |   |   |-- datatable/
|   |   |   |-- forms/             # form-layouts (vertical, horizontal), form-validation
|   |   |-- (blank)/pages/         # Routes without the shell: auth/*, misc/error-page
|   |   |-- api/nav-apps/          # Route handler for the sidebar "apps" list
|   |   |-- server/actions.ts      # Server Actions reading from fake-db (swap for real queries)
|   |   |-- globals.css            # Tailwind v4 + design tokens
|   |   |-- layout.tsx             # Fonts, metadata, providers
|   |   |-- not-found.tsx
|   |-- assets/                    # Option data and SVGs
|   |-- components/
|   |   |-- global/                # Reusable component system (see Architecture)
|   |   |-- layout/                # Sidebar, Header, Footer, BlankLayout, ModeToggle, ScrollToTop
|   |   |-- shared/                # Logo, ProfileDropdown, LanguageDropdown
|   |   |-- ui/                    # shadcn/ui primitives
|   |   |-- Providers.tsx, ThemeProvider.tsx
|   |-- configs/                   # navConfig, themeConfig, mailConfig
|   |-- fake-db/                   # Typed mock data: apps, dashboards, pages
|   |-- hooks/                     # use-mail-app, use-user-app, use-pagination, use-mobile, calendar hooks
|   |-- lib/                       # cn() utility, nav-apps helper
|   |-- types/                     # Domain types: apps, dashboards, pages
|   |-- utils/                     # format-utils, calendar-utils
|   |-- views/                     # Page compositions: apps, dashboards, datatables, forms, pages
|-- CLAUDE.md                      # Contributor and AI-assistant rules for this codebase
|-- components.json                # shadcn aliases + shadcn/studio registries
|-- next.config.ts                 # basePath, redirects
|-- vercel.json                    # Git auto-deploys disabled
```

## Template Leftovers

These pieces come from the original template. Remove them when they are not needed:

- Sidebar entries marked **Pro** in `src/configs/navConfig.tsx`, which link to external AdminCN Pro demos.
- `src/components/layout/UpgradePro.tsx`, the "Upgrade to Pro" button rendered from `layout.tsx`.
- `src/app/api/nav-apps/route.ts` and `src/lib/nav-apps.ts`, which fetch the sidebar apps list from the shadcn/studio
  CDN.
- Metadata in `src/app/layout.tsx` and `themeConfig.templateName`, which still use the AdminCN name.

## Credits & License

- Based on [AdminCN Free](https://shadcnstudio.com/templates/admin-dashboard-free/admincn) by
  [shadcn/studio](https://shadcnstudio.com/), released under the MIT license. The attribution is kept as its license
  asks: `<a href="https://shadcnstudio.com/">ShadcnStudio</a>`.
- Built on [shadcn/ui](https://ui.shadcn.com/) and [Base UI](https://base-ui.com/).
