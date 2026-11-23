// Type Imports
import type { ReactNode } from 'react'

// Component Imports
import { ColorDot, type ColorDotProps } from '@/components/global/micro/color-dot'

// Util Imports
import { cn } from '@/lib/utils'
import type { Tone } from '@/components/global/variants/tone'

type ChartTooltipRow = {
  key: string
  label: ReactNode
  value: ReactNode
  tone: Tone
  shape?: ColorDotProps['shape']
}

type ChartTooltipPanelProps = {
  rows: ChartTooltipRow[]

  /** Category being hovered, e.g. "W38" */
  title: ReactNode

  /** Summary under a divider, e.g. a comparison delta */
  footer?: ReactNode
  className?: string
}

/**
 * Global: the tooltip body for every chart. Same shell as the ui `ChartTooltipContent`, but each row keeps its
 * series marker (solid / dashed) and value formatting, with an optional footer.
 */
const ChartTooltipPanel = ({ title, rows, footer, className }: ChartTooltipPanelProps) => (
  <div
    data-slot='chart-tooltip-panel'
    className={cn(
      'border-border/50 bg-background grid min-w-44 gap-2 rounded-lg border px-3 py-2.5 text-xs shadow-xl',
      className
    )}
  >
    <span className='text-foreground font-medium'>{title}</span>
    <ul className='grid gap-1.5'>
      {rows.map(row => (
        <li key={row.key} className='flex items-center gap-2'>
          <ColorDot tone={row.tone} shape={row.shape ?? 'square'} />
          <span className='text-muted-foreground flex-1'>{row.label}</span>
          <span className='text-foreground font-medium tabular-nums'>{row.value}</span>
        </li>
      ))}
    </ul>
    {footer && <div className='flex items-center justify-between gap-3 border-t pt-2'>{footer}</div>}
  </div>
)

export { ChartTooltipPanel }
export type { ChartTooltipPanelProps, ChartTooltipRow }
