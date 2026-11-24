// Third-party Imports
import { cva } from 'class-variance-authority'

// Type Imports
import type { NavbarVariant, SidebarVariant, TextDirection } from '@/types/preferences-types'

// Util Imports
import { cn } from '@/lib/utils'

const sidebarVariants = cva('flex flex-col gap-1 rounded-[3px] p-1', {
  variants: {
    variant: {
      sidebar: 'bg-muted border-border border-e',
      inset: 'bg-transparent',
      floating: 'bg-muted ring-border shadow-xs ring-1'
    },
    mode: {
      expanded: 'w-[28%]',
      icon: 'w-[13%] items-center',
      hidden: 'hidden'
    }
  }
})

type LayoutPreviewProps = {
  sidebar?: SidebarVariant

  /** Colour scheme to draw; `system` splits light / dark. Omit to follow the current theme. */
  scheme?: 'light' | 'dark' | 'system'

  /** How the sidebar is shown: full, icon rail or hidden */
  mode?: 'expanded' | 'icon' | 'hidden'

  /** Draw the top bar attached (`default`) or as a floating card; omit for a plain title line */
  navbar?: NavbarVariant
  direction?: TextDirection
  className?: string
}

type FrameProps = Required<Omit<LayoutPreviewProps, 'scheme' | 'className' | 'navbar'>> &
  Pick<LayoutPreviewProps, 'navbar' | 'className'>

const Frame = ({ sidebar, mode, direction, navbar, className }: FrameProps) => (
  <div
    className={cn(
      'bg-background absolute inset-0 flex gap-1 p-1.5',
      sidebar === 'inset' && 'bg-muted',
      direction === 'rtl' && 'flex-row-reverse',
      className
    )}
  >
    <div className={sidebarVariants({ variant: sidebar, mode })}>
      <span className='bg-primary size-1.5 shrink-0 rounded-full' />
      {[100, 80, 90].map(width => (
        <span
          key={width}
          className='bg-foreground/25 h-0.5 shrink-0 rounded-full'
          style={{ width: mode === 'icon' ? '60%' : `${width}%` }}
        />
      ))}
    </div>
    <div
      className={cn(
        'flex flex-1 flex-col gap-1 rounded-[3px] p-1',
        sidebar === 'inset' && 'bg-background ring-border shadow-xs ring-1'
      )}
    >
      {navbar && (
        <span
          className={cn(
            'bg-card shrink-0',
            navbar === 'default' ? '-mx-1 -mt-1 h-2.5 border-b' : 'ring-border h-2.5 rounded-[2px] shadow-xs ring-1'
          )}
        />
      )}
      <span className={cn('bg-foreground/30 h-1 w-1/3 rounded-full', direction === 'rtl' && 'self-end')} />
      <div className='flex flex-1 gap-1'>
        <span className='bg-primary/70 flex-[2] rounded-[2px]' />
        <span className='bg-muted ring-border flex-1 rounded-[2px] ring-1' />
      </div>
    </div>
  </div>
)

/**
 * Micro: miniature app schematic drawn only with design tokens — used as the preview inside theme / layout pickers.
 * `.light` / `.dark` re-scope the tokens, so a dark preview renders correctly in light mode and vice versa.
 */
const LayoutPreview = ({
  scheme,
  sidebar = 'sidebar',
  mode = 'expanded',
  direction = 'ltr',
  navbar,
  className
}: LayoutPreviewProps) => {
  const frame = { sidebar, mode, direction, navbar }

  return (
    <span
      data-slot='layout-preview'
      aria-hidden='true'
      className={cn('relative block aspect-16/10 w-full overflow-hidden', className)}
    >
      {scheme === 'system' ? (
        <>
          <Frame {...frame} className='light' />
          <Frame {...frame} className='dark [clip-path:inset(0_0_0_50%)]' />
        </>
      ) : (
        <Frame {...frame} className={scheme} />
      )}
    </span>
  )
}

export { LayoutPreview }
export type { LayoutPreviewProps }
