// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { IconTile } from '@/components/global/micro/icon-tile'

// Util Imports
import { cn } from '@/lib/utils'

const emptyStateVariants = cva('flex flex-col items-center justify-center text-center', {
  variants: {
    /** `sm` inside a card or list, `md` inside a panel, `page` fills the content area (errors, coming soon) */
    size: {
      sm: 'gap-3 py-8',
      md: 'gap-4 py-12',
      page: 'min-h-[60svh] gap-5 py-16'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

const emptyStateTitleVariants = cva('text-foreground font-semibold tracking-tight text-balance', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      page: 'text-2xl sm:text-3xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type EmptyStateProps = VariantProps<typeof emptyStateVariants> & {
  title: ReactNode
  description?: ReactNode

  /** Icon shown in a muted tile above the title */
  icon?: ReactNode

  /** Large status code shown instead of the icon, e.g. "404" */
  code?: string

  /** Buttons / links under the copy */
  actions?: ReactNode
  className?: string
}

/**
 * Global: centred message for "nothing here" moments — empty lists, no search results, coming-soon pages and
 * error pages (`code`). Variations via `size`.
 */
const EmptyState = ({ title, description, icon, code, actions, size, className }: EmptyStateProps) => (
  <div data-slot='empty-state' className={cn(emptyStateVariants({ size }), className)}>
    {code ? (
      <span className='text-foreground text-7xl leading-none font-bold tracking-tighter tabular-nums sm:text-8xl'>
        {code}
      </span>
    ) : (
      icon && (
        <IconTile variant='muted' size={size === 'sm' ? 'md' : 'lg'} className='size-12 rounded-full'>
          {icon}
        </IconTile>
      )
    )}
    <div className='flex max-w-md flex-col gap-1.5'>
      <h2 className={emptyStateTitleVariants({ size })}>{title}</h2>
      {description && <p className='text-muted-foreground text-sm text-pretty sm:text-base'>{description}</p>}
    </div>
    {actions && <div className='flex flex-wrap items-center justify-center gap-2'>{actions}</div>}
  </div>
)

export { EmptyState, emptyStateVariants }
export type { EmptyStateProps }
