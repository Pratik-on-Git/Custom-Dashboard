# Fragio — rules for every change

Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn (`base-vega` style on **Base UI**) · recharts · lucide.

## ⚠️ Rule check — run this before writing ANY UI

Every new section, page or change follows this order. No exceptions.

1. **Global component** — Does a component in `src/components/global/` already do this? **Use it.**
   If not, create it there first — generic, domain-free, data passed in as props.
2. **Variations** — Differences in look go into `cva` variants (`variant`, `size`, `density`…) and the shared
   `tone` prop. Never fork a component or copy-paste it to change a colour or size.
3. **Micro components** — Repeated small pieces (dots, badges, icon tiles, meta items, links-as-buttons) live
   in `src/components/global/micro/` and are composed into larger components.
4. **Modular feature code** — A page is `app/` route → `views/` composition → `sections/` that only
   _compose_ global components. Data in `fake-db/`, types in `types/`, UI mapping in the view's `config.tsx`.

Before finishing, confirm:

- [ ] No section hand-rolls markup a global component already provides (cards, rows, stats, pills, bars…).
- [ ] No hard-coded colours/hex/oklch in components — only design tokens via `tone` or Tailwind token classes.
- [ ] Colour follows the app scheme: data = `primary` shades, status hues only for meaning, no decorative `chart-*` hues.
- [ ] New visual differences are `cva` variants, not new near-duplicate components.
- [ ] Data is plain and serialisable (no JSX, no tones) — icons/tones/copy are mapped in `config.tsx`.
- [ ] `npx prettier --check`, `npx eslint`, `npx tsc --noEmit` all pass.

When a reference design or another codebase is provided: take its **structure and content**, never its
markup, class names or CSS. Rebuild it with our tokens, primitives and global components.

## Layers

```text
src/
  app/(pages)/<route>/page.tsx      → thin: loads data, renders the view
  views/<area>/<feature>/
    index.tsx                       → page composition / grid only
    config.tsx                      → domain → UI mapping (tones, icons, labels, routes)
    sections/*.tsx                  → one file per section, composes global components
  components/
    ui/                             → shadcn primitives. Don't edit for feature needs; wrap them in global/.
    global/
      variants/tone.ts              → shared colour vocabulary (Tone, toneStyle, toneFor)
      micro/                        → atoms: color-dot, live-dot, delta-badge, icon-tile, meta-item,
                                      initials-avatar, action-link
      layout/                       → page-header, section-card
      data-display/                 → stat, stat-group, status-pill, legend, list-row, stepper, phase-track,
                                      threshold-bar, segmented-bar, progress-meter
      charts/                       → area-trend-chart, chart-tooltip-panel, sparkline, mini-bars
      inputs/                       → segmented-control
  fake-db/<area>/                   → mock data (typed)
  types/<area>/                     → domain types
  utils/format-utils.ts             → number / unit / currency / percent formatting
```

## Global component inventory (use these first)

| Need                                        | Component                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Page title + copy + actions                 | `PageHeader`                                                                                                                    |
| Any card section (title/description/action) | `SectionCard` (`variant="accent"`, `leading`)                                                                                   |
| A labelled number / KPI / boxed mini stat   | `Stat` (`variant="plain" \| "tile"`, `size`)                                                                                    |
| A row of KPIs (aligned labels, dividers)    | `StatGroup` (`variant="divided" \| "plain"`) wrapping `Stat`s                                                                   |
| Status / phase chip                         | `StatusPill` (`tone`, `variant`, `size`)                                                                                        |
| Trend %                                     | `DeltaBadge`                                                                                                                    |
| Series key                                  | `Legend` (`size` sm for chart chrome, md standalone)                                                                            |
| Any list (tasks, feed, orders, people)      | `ListRowGroup` + `ListRow` (`size`, `density`, `href`, leading/trailing/children)                                               |
| Multi-step status                           | `Stepper` (`size` sm/md/lg, `align` spread/center, `tone`)                                                                      |
| Proportional timeline with "today"          | `PhaseTrack`                                                                                                                    |
| Value vs limit                              | `ThresholdBar` / `ThresholdMeter`                                                                                               |
| Parts of a total                            | `SegmentedBar`                                                                                                                  |
| Value vs target with bar                    | `ProgressMeter`                                                                                                                 |
| Line/area trend, comparison series          | `AreaTrendChart` (built-in caption + legend, compact `axisFormatter`, full `valueFormatter`, latest marker, comparison tooltip) |
| Any chart tooltip                           | `ChartTooltipPanel` (not `ChartTooltipContent` with `formatter` — that drops the series label)                                  |
| Tiny trend                                  | `Sparkline`                                                                                                                     |
| Recent-interval histogram                   | `MiniBars`                                                                                                                      |
| Single-choice switch                        | `SegmentedControl`                                                                                                              |
| Icon in a tinted square                     | `IconTile`                                                                                                                      |
| Icon + short text                           | `MetaItem`                                                                                                                      |
| "Go somewhere →" button                     | `ActionLink`                                                                                                                    |
| Initials avatar                             | `InitialsAvatar`                                                                                                                |

Extend an existing component with a variant before adding a new one. If you add one, add it to this table.

## Design system

- Tokens live in `src/app/globals.css` (oklch, light + `.dark`). Use `bg-card`, `text-muted-foreground`,
  `border`, `ring-foreground/10`, etc.
- **Colour scheme — the app is monochrome. Every page must match it:**
  - **Data / brand → `primary`** (near-black in light, near-white in dark) and its opacity steps
    `primary-60` / `primary-30` (`color-mix(in oklab, var(--primary) N%, transparent)`, same recipe as the
    app's charts). Charts, bars, progress, steppers, phase tracks, sparklines all default to `primary`.
    Icon chips are `bg-primary/10 text-primary` (`IconTile tone='primary'`).
  - **Status → `success` / `warning` / `info` / `danger`**, only where the colour _means_ something (good,
    attention, informational, error). These tokens equal the app's Tailwind pairs: green / amber / sky
    `-600` in light, `-400` in dark.
  - **Quiet → `neutral`** / `muted` (meta text, muted icon tiles, avatar fallbacks).
  - **Don't** use `chart-1…5` hues for decoration or entity identity (no coloured card strips, no per-item
    hues). Reserve them for a multi-series chart that genuinely can't work in shades of primary.
  - Identify entities by label / number chip, not colour. When parts of a whole must be told apart, use
    `createToneScale(keys)` — it hands out `primary`, `primary-60`, `primary-30` in order.
- **Colour goes through `tone`** (`src/components/global/variants/tone.ts`): components set `--tone` via
  `toneStyle(tone)` and style with `bg-(--tone)/12`, `text-(--tone)`, `border-(--tone)`. New colour → add a
  token in `globals.css` + a key in `toneTokens`. Never use raw palette classes (`text-green-600`) in new code.
- Primitives: `Button` (`variant`: default/outline/secondary/ghost/destructive/link; `size`: xs/sm/default/lg/icon\*),
  `Card` (`rounded-xl`, `ring-1 ring-foreground/10`, `shadow-xs`), `Badge`, `Progress`, `Checkbox`, `Avatar`,
  `ToggleGroup`, `ChartContainer`. Base UI, not Radix: links-as-buttons use
  `render={<Link href='…' />} nativeButton={false}`.
- Icons: `lucide-react` (`*Icon` names). Inside buttons mark them `data-icon='inline-start' | 'inline-end'`.
- Charts: always via `ChartContainer` (`@/components/ui/chart`) so colours follow theme tokens.
- Spacing rhythm: page sections `gap-6`; card content `gap-5`; grids `gap-6`. Main is `max-w-360`.
- Accessibility: charts/bars get `role='img'` + `aria-label`; sections get `headingId`; interactive controls
  get labels; respect `motion-reduce`.

## Code style

- Prettier: no semicolons, single quotes (JSX too), width 120, no trailing commas.
- ESLint enforces import grouping with `// X Imports` comments (React → Next → Third-party → Type → Component
  → Config → Util), blank lines around comments and multi-line consts, `import type` for types.
- `'use client'` only on components with state/effects/recharts; keep sections server components otherwise.
- Default-export pages/views/sections; named exports for global components (+ their `…Variants` and `…Props`).

## Commands

```bash
npm run dev            # next dev
npx tsc --noEmit       # types
npm run lint           # eslint
npm run format         # prettier --write
```
