const numberFormatters = new Map<string, Intl.NumberFormat>()

const getFormatter = (locale: string, options: Intl.NumberFormatOptions) => {
  const key = `${locale}:${JSON.stringify(options)}`

  if (!numberFormatters.has(key)) numberFormatters.set(key, new Intl.NumberFormat(locale, options))

  return numberFormatters.get(key)!
}

/** 1320 → "1,320" ; (5.8912, 2) → "5.89" */
export const formatNumber = (value: number, fractionDigits = 0, locale = 'en-GB') =>
  getFormatter(locale, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(value)

/** (5379.2, 'GBP') → "£5,379.20" */
export const formatCurrency = (value: number, currency = 'GBP', locale = 'en-GB') =>
  getFormatter(locale, { style: 'currency', currency }).format(value)

/** (1.9) → "1.9%" ; (59, 0) → "59%" */
export const formatPercent = (value: number, fractionDigits = 1) => `${formatNumber(value, fractionDigits)}%`

/** Value + unit with a thin space, e.g. "106.0 t", "1,320 kg" */
export const formatUnit = (value: number, unit: string, fractionDigits = 0) =>
  `${formatNumber(value, fractionDigits)} ${unit}`

/** Clamp a ratio to 0–100 for bar widths. */
export const toPercent = (value: number, max: number) =>
  max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

/** "Ada Lovelace" → "AL" (first letters of the first two words) */
export const toInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
