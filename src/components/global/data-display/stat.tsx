// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'

const statVariants = cva('flex min-w-0 flex-col', {
  variants: {
    variant: {
      plain: 'gap-1',
      tile: 'bg-muted/40 gap-1 rounded-lg border p-3'
    }
  },
  defaultVariants: {
    variant: 'plain'
  }
})

const statValueVariants = cva('text-foreground font-medium tracking-tight tabular-nums', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-3xl',
      xl: 'text-4xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type StatProps = VariantProps<typeof statVariants> &
  VariantProps<typeof statValueVariants> & {
    label?: ReactNode
    value: ReactNode

    /** Inline after the value: a DeltaBadge, "of 2,250 kg planned", "W44"… */
    suffix?: ReactNode

    /** Line below the value */
    caption?: ReactNode
    className?: string
  }

/**
 * Global: a labelled figure.
 * Variations: `variant="plain"` (headline KPIs) | `variant="tile"` (boxed mini-stat), and value `size` sm–xl.
 */
const Stat = ({ label, value, suffix, caption, variant, size, className }: StatProps) => (
  <div data-slot='stat' className={cn(statVariants({ variant }), className)}>
    {label && <span className='text-muted-foreground text-sm'>{label}</span>}
    <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
      <span className={statValueVariants({ size })}>{value}</span>
      {suffix && <span className='text-muted-foreground inline-flex items-center gap-2 text-sm'>{suffix}</span>}
    </div>
    {caption && <span className='text-muted-foreground text-xs'>{caption}</span>}
  </div>
)

export { Stat, statVariants, statValueVariants }
export type { StatProps }
