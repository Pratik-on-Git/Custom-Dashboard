// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { ColorDot, type ColorDotProps } from '@/components/global/micro/color-dot'

// Util Imports
import { cn } from '@/lib/utils'
import type { Tone } from '@/components/global/variants/tone'

const legendVariants = cva('flex flex-wrap items-center', {
  variants: {
    /** `sm` for chart chrome (matches axis text), `md` for standalone legends */
    size: {
      sm: 'gap-x-3.5 gap-y-1 text-xs',
      md: 'gap-x-4 gap-y-1.5 text-sm'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type LegendItem = {
  label: ReactNode
  tone: Tone

  /** Optional emphasised value after the label, e.g. "1,098 kg" */
  value?: ReactNode
  shape?: ColorDotProps['shape']
}

type LegendProps = VariantProps<typeof legendVariants> & {
  items: LegendItem[]
  className?: string
}

/** Global: inline series legend — marker + label (+ value). */
const Legend = ({ items, size, className }: LegendProps) => (
  <ul data-slot='legend' className={cn(legendVariants({ size }), className)}>
    {items.map((item, index) => (
      <li key={index} className='text-muted-foreground inline-flex items-center gap-1.5'>
        <ColorDot tone={item.tone} shape={item.shape ?? 'square'} />
        <span>{item.label}</span>
        {item.value && <span className='text-foreground font-medium tabular-nums'>{item.value}</span>}
      </li>
    ))}
  </ul>
)

export { Legend, legendVariants }
export type { LegendProps, LegendItem }
