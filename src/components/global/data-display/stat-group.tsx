// React Imports
import { Children } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'

const statGroupVariants = cva('grid gap-5 sm:grid-cols-(--stat-cols) sm:gap-0', {
  variants: {
    /** `divided` separates columns with a rule (KPI strip); `plain` only spaces them */
    variant: {
      divided: 'sm:divide-x sm:*:px-6 sm:*:first:pl-0 sm:*:last:pr-0',
      plain: 'sm:gap-x-8'
    }
  },
  defaultVariants: {
    variant: 'divided'
  }
})

type StatGroupProps = VariantProps<typeof statGroupVariants> & {
  className?: string

  /** `Stat` elements */
  children: ReactNode
}

/**
 * Global: a row of `Stat`s in equal columns, so labels share a line and values share a baseline.
 * Stacks on small screens.
 */
const StatGroup = ({ children, variant, className }: StatGroupProps) => {
  const count = Children.count(children)

  return (
    <div
      data-slot='stat-group'
      className={cn(statGroupVariants({ variant }), className)}
      style={{ '--stat-cols': `repeat(${count}, minmax(0, 1fr))` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export { StatGroup, statGroupVariants }
export type { StatGroupProps }
