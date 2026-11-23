// Type Imports
import type { CSSProperties } from 'react'

/** Same recipe the app's charts use for lighter steps of the brand colour. */
const primaryShade = (percent: number) => `color-mix(in oklab, var(--primary) ${percent}%, transparent)`

/**
 * Shared colour vocabulary for every global component.
 *
 * A tone resolves to a design-system token and is exposed to Tailwind as the `--tone` CSS variable,
 * so components style themselves with `bg-(--tone)/15`, `text-(--tone)`, `border-(--tone)` etc.
 * Never hard-code colours in components — add a token in globals.css and a tone here instead.
 *
 * App colour scheme:
 * - Data / brand → `primary` and its shades (`primary-60`, `primary-30`). This is the default for charts,
 *   bars, steppers and entity colouring — the app is monochrome.
 * - Status → `success` / `warning` / `info` / `danger` (green / amber / sky / destructive), only for meaning.
 * - Quiet → `neutral`.
 * - `chart-1…5` exist for multi-series charts that genuinely need hue; don't use them for decoration.
 */
export const toneTokens = {
  neutral: 'var(--muted-foreground)',
  primary: 'var(--primary)',
  'primary-60': primaryShade(60),
  'primary-30': primaryShade(30),
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--destructive)',
  info: 'var(--info)',
  'chart-1': 'var(--chart-1)',
  'chart-2': 'var(--chart-2)',
  'chart-3': 'var(--chart-3)',
  'chart-4': 'var(--chart-4)',
  'chart-5': 'var(--chart-5)'
} as const

export type Tone = keyof typeof toneTokens

export type ToneStyle = CSSProperties & { '--tone'?: string }

/** Inline style that sets `--tone` for a component subtree. */
export const toneStyle = (tone: Tone = 'neutral', style?: CSSProperties): ToneStyle => ({
  ...style,
  '--tone': toneTokens[tone]
})

/** Default entity scale — steps of the brand colour, matching the rest of the app. */
export const primaryTones: Tone[] = ['primary', 'primary-60', 'primary-30']

/** Hue-based scale — only for multi-series charts that need it. */
export const categoricalTones: Tone[] = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']

/** Stable tone for a single string key when the full set isn't known. */
export const toneFor = (key: string, palette: Tone[] = primaryTones): Tone => {
  const hash = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0)

  return palette[hash % palette.length]
}

/**
 * Distinct tones for a known set of keys (houses in a bar, series in a chart): the first unique key gets
 * palette[0], the next palette[1]… Prefer this over `toneFor` whenever the whole set is available.
 */
export const createToneScale = (keys: string[], palette: Tone[] = primaryTones) => {
  const unique = [...new Set(keys)]

  return (key: string): Tone => {
    const index = unique.indexOf(key)

    return index === -1 ? toneFor(key, palette) : palette[index % palette.length]
  }
}
