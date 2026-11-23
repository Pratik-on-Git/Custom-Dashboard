// Type Imports
import type { ReactNode } from 'react'

// Util Imports
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode

  /** Buttons / menus aligned to the right (wrap under the text on small screens) */
  actions?: ReactNode
  className?: string
}

/** Global: page title block — h1, supporting copy, actions. Use once at the top of every page. */
const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => (
  <header
    data-slot='page-header'
    className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}
  >
    <div className='flex max-w-2xl min-w-0 flex-col gap-2'>
      <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{title}</h1>
      {description && <p className='text-muted-foreground text-sm text-pretty sm:text-base'>{description}</p>}
    </div>
    {actions && <div className='flex shrink-0 flex-wrap items-center gap-2'>{actions}</div>}
  </header>
)

export { PageHeader }
export type { PageHeaderProps }
