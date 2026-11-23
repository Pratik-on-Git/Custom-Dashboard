// Type Imports
import type { ReactNode } from 'react'

// Component Imports
import { Progress, ProgressLabel } from '@/components/ui/progress'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'
import { toPercent } from '@/utils/format-utils'

type ProgressMeterProps = {
  value: number
  target: number

  /** Headline, e.g. <b>1,098 kg</b> of 1,850 kg */
  label: ReactNode
  tone?: Tone
  className?: string
}

/** Global: value-against-target headline + toned bar. Wraps the ui Progress primitive. */
const ProgressMeter = ({ value, target, label, tone = 'primary', className }: ProgressMeterProps) => (
  <Progress
    value={toPercent(value, target)}
    className={cn('gap-2 **:data-[slot=progress-indicator]:bg-(--tone)', className)}
    style={toneStyle(tone)}
  >
    <ProgressLabel className='text-muted-foreground w-full text-sm font-normal'>{label}</ProgressLabel>
  </Progress>
)

export { ProgressMeter }
export type { ProgressMeterProps }
