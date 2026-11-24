// Type Imports
import type { ReactNode } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'

const listRowVariants = cva('flex min-w-0 flex-col', {
  variants: {
    density: {
      compact: 'gap-2 py-2.5',
      default: 'gap-3.5 py-3.5',
      relaxed: 'gap-4 py-4'
    }
  },
  defaultVariants: {
    density: 'default'
  }
})

const listRowTitleVariants = cva('text-foreground truncate font-medium', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-[15px] leading-snug'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

const listRowDescriptionVariants = cva('text-muted-foreground truncate', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type ListRowProps = VariantProps<typeof listRowVariants> &
  VariantProps<typeof listRowTitleVariants> & {
    title: ReactNode
    description?: ReactNode

    /** Makes the title + description block a link */
    href?: string

    /** Makes the whole row a button (selectable lists: inbox, pickers). Pair with `selected`. */
    onSelect?: () => void

    /** Highlights the row and marks it `aria-current` (with `onSelect`) */
    selected?: boolean

    /** Icon tile, checkbox, avatar… */
    leading?: ReactNode

    /** Avatar, button, value… */
    trailing?: ReactNode

    /** Extra full-width content under the text block (e.g. a stepper) */
    children?: ReactNode

    /** Visually mute the row (e.g. a completed task) */
    muted?: boolean
    className?: string
  }

/**
 * Global: the one row layout every list uses (tasks, activity, orders, people…).
 * Variations: `size` (text scale), `density` (vertical rhythm), and link (`href`) or selectable (`onSelect`) rows.
 * Wrap rows in `<ListRowGroup>` for dividers.
 */
const ListRow = ({
  leading,
  title,
  description,
  href,
  onSelect,
  selected,
  trailing,
  children,
  muted,
  density,
  size,
  className
}: ListRowProps) => {
  const text = (
    <>
      <span
        className={cn(
          listRowTitleVariants({ size }),
          muted && 'line-through',
          href && 'group-hover/row-link:underline'
        )}
      >
        {title}
      </span>
      {description && <span className={listRowDescriptionVariants({ size })}>{description}</span>}
    </>
  )

  const textClassName = cn('flex min-w-0 flex-1 flex-col gap-0.5', muted && 'opacity-60')

  if (onSelect) {
    return (
      <li data-slot='list-row' className={cn('flex min-w-0 flex-col', className)}>
        <button
          type='button'
          onClick={onSelect}
          aria-current={selected || undefined}
          className={cn(
            listRowVariants({ density }),
            'hover:bg-muted/60 focus-visible:ring-ring/50 -mx-2 rounded-lg px-2 text-start outline-none focus-visible:ring-3',
            selected && 'bg-muted hover:bg-muted'
          )}
        >
          <span className='flex min-w-0 items-center gap-3'>
            {leading}
            <span className={textClassName}>{text}</span>
            {trailing && <span className='flex shrink-0 items-center gap-2 self-start'>{trailing}</span>}
          </span>
          {children}
        </button>
      </li>
    )
  }

  return (
    <li data-slot='list-row' className={cn(listRowVariants({ density }), className)}>
      <div className='flex min-w-0 items-center gap-3'>
        {leading}
        {href ? (
          <Link
            href={href}
            className={cn(
              textClassName,
              'group/row-link focus-visible:ring-ring/50 rounded-sm underline-offset-4 outline-none focus-visible:ring-3'
            )}
          >
            {text}
          </Link>
        ) : (
          <div className={textClassName}>{text}</div>
        )}
        {trailing && <div className='flex shrink-0 items-center gap-2'>{trailing}</div>}
      </div>
      {children}
    </li>
  )
}

/** Divided list; first and last rows sit flush with the container's padding. */
const ListRowGroup = ({ className, children }: { className?: string; children: ReactNode }) => (
  <ul
    data-slot='list-row-group'
    className={cn('divide-border flex flex-col divide-y *:first:pt-0 *:last:pb-0', className)}
  >
    {children}
  </ul>
)

export { ListRow, ListRowGroup, listRowVariants, listRowTitleVariants, listRowDescriptionVariants }
export type { ListRowProps }
