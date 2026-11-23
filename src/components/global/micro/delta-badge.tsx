// Third-party Imports
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle } from '@/components/global/variants/tone'
import { formatPercent } from '@/utils/format-utils'

type DeltaBadgeProps = {
  fractionDigits?: number
  className?: string

  /** Signed change in percent, e.g. 1.9 or -4.2 */
  value: number

  /** Set when a decrease is the good outcome (e.g. cost, pests) */
  invert?: boolean
}

/** Micro: trend badge — arrow + percent, coloured by whether the change is good. */
const DeltaBadge = ({ value, invert = false, fractionDigits = 1, className }: DeltaBadgeProps) => {
  const isUp = value >= 0
  const isGood = invert ? !isUp : isUp
  const Icon = isUp ? ArrowUpIcon : ArrowDownIcon

  return (
    <Badge
      variant='secondary'
      className={cn('bg-(--tone)/12 text-(--tone) tabular-nums', className)}
      style={toneStyle(isGood ? 'success' : 'danger')}
      aria-label={`${isUp ? 'Up' : 'Down'} ${formatPercent(Math.abs(value), fractionDigits)}`}
    >
      <Icon data-icon='inline-start' />
      {formatPercent(Math.abs(value), fractionDigits)}
    </Badge>
  )
}

export { DeltaBadge }
export type { DeltaBadgeProps }
