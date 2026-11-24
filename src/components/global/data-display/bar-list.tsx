// Component Imports
import { ProgressMeter } from '@/components/global/data-display/progress-meter'

// Util Imports
import { cn } from '@/lib/utils'
import type { Tone } from '@/components/global/variants/tone'

type BarListItem = {
  label: string
  value: number
}

type BarListProps = {
  items: BarListItem[]

  /** Shown on the right of each row, e.g. `n => \`${n}%\`` */
  valueFormatter?: (value: number) => string
  tone?: Tone

  /** Bars are scaled against this; defaults to the largest value so the top item fills the track */
  max?: number
  className?: string
}

/** Global: ranked list of labelled bars (top referrers, devices, channels…). Each row is a `ProgressMeter`. */
const BarList = ({ items, valueFormatter = String, tone = 'primary', max, className }: BarListProps) => {
  const scale = max ?? Math.max(...items.map(item => item.value), 1)

  return (
    <ul data-slot='bar-list' className={cn('flex flex-col gap-4', className)}>
      {items.map(item => (
        <li key={item.label}>
          <ProgressMeter
            value={item.value}
            target={scale}
            tone={tone}
            label={
              <span className='flex w-full items-baseline justify-between gap-3'>
                <span className='truncate'>{item.label}</span>
                <span className='text-foreground font-medium tabular-nums'>{valueFormatter(item.value)}</span>
              </span>
            }
          />
        </li>
      ))}
    </ul>
  )
}

export { BarList }
export type { BarListProps, BarListItem }
