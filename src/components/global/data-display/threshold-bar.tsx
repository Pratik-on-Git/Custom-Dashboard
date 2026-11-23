// Third-party Imports
import { TriangleAlertIcon } from 'lucide-react'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'
import { toPercent } from '@/utils/format-utils'

type ThresholdBarProps = {
  value: number

  /** Value at which the bar is full */
  max: number

  /** Where the limit tick sits */
  limit: number
  tone?: Tone
  overTone?: Tone
  className?: string
}

/** Global: horizontal bar with a limit tick; switches tone once the value passes the limit. */
const ThresholdBar = ({ value, max, limit, tone = 'primary', overTone = 'warning', className }: ThresholdBarProps) => {
  const isOver = value > limit

  return (
    <span
      data-slot='threshold-bar'
      className={cn('bg-muted relative block h-1.5 w-full rounded-full', className)}
      style={toneStyle(isOver ? overTone : tone)}
    >
      <span
        className='absolute inset-y-0 left-0 rounded-full bg-(--tone) transition-[width] duration-500'
        style={{ width: `${toPercent(value, max)}%` }}
      />
      <span
        title={`Limit ${limit}`}
        className='bg-foreground absolute -top-1 h-3.5 w-0.5 -translate-x-1/2 rounded-full'
        style={{ left: `${toPercent(limit, max)}%` }}
      />
    </span>
  )
}

type ThresholdMeterProps = ThresholdBarProps & {
  label: string
}

/** Global variation: labelled ThresholdBar row — "Thrips ▬▬▬|▬ 14 ⚠". */
const ThresholdMeter = ({ label, value, limit, className, overTone = 'warning', ...barProps }: ThresholdMeterProps) => {
  const isOver = value > limit

  return (
    <div
      data-slot='threshold-meter'
      className={cn('grid grid-cols-[6.5rem_1fr_2.75rem] items-center gap-3 text-sm', className)}
      style={toneStyle(overTone)}
    >
      <span className={cn('truncate', isOver ? 'font-medium text-(--tone)' : 'text-muted-foreground')}>{label}</span>
      <ThresholdBar value={value} limit={limit} overTone={overTone} {...barProps} />
      <span
        className={cn('inline-flex items-center justify-end gap-1 tabular-nums', isOver && 'font-medium text-(--tone)')}
      >
        {value}
        {isOver && <TriangleAlertIcon className='size-3.5' aria-label='Over limit' />}
      </span>
    </div>
  )
}

export { ThresholdBar, ThresholdMeter }
export type { ThresholdBarProps, ThresholdMeterProps }
