// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'
import { toPercent } from '@/utils/format-utils'

type MiniBarsProps = {
  values: number[]
  tone?: Tone

  /** Emphasise the last bar (e.g. the current interval) */
  highlightLast?: boolean

  /** Fixed scale; defaults to the largest value */
  max?: number
  valueFormatter?: (value: number) => string
  ariaLabel?: string
  className?: string
}

/** Minimum visible height (in %) so empty intervals still read as a bar. */
const MIN_BAR = 4

/** Global: compact column histogram — recent intervals, distributions, activity. */
const MiniBars = ({
  values,
  tone = 'primary',
  highlightLast = true,
  max,
  valueFormatter = value => String(value),
  ariaLabel,
  className
}: MiniBarsProps) => {
  const scale = max ?? Math.max(...values, 1)

  return (
    <div
      data-slot='mini-bars'
      role='img'
      aria-label={ariaLabel}
      className={cn('flex h-24 items-end gap-1', className)}
      style={toneStyle(tone)}
    >
      {values.map((value, index) => {
        const isLast = highlightLast && index === values.length - 1

        return (
          <span
            key={index}
            title={valueFormatter(value)}
            className={cn(
              'min-w-0 flex-1 rounded-t-sm transition-[height] duration-500',
              isLast ? 'bg-(--tone)' : 'bg-(--tone)/35 hover:bg-(--tone)/55'
            )}
            style={{ height: `${Math.max(MIN_BAR, toPercent(value, scale))}%` }}
          />
        )
      })}
    </div>
  )
}

export { MiniBars }
export type { MiniBarsProps }
