// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { CircleHelpIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type HelpPopoverProps = {
  children: ReactNode

  /** Accessible name for the trigger (default "Learn more") */
  label?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

/** Micro: small "?" button that opens a short explanation — for inline help next to labels and headings. */
const HelpPopover = ({ children, label = 'Learn more', side = 'top', className }: HelpPopoverProps) => (
  <Popover>
    <PopoverTrigger
      render={
        <Button variant='ghost' size='icon-xs' className='text-muted-foreground rounded-full' aria-label={label} />
      }
    >
      <CircleHelpIcon />
    </PopoverTrigger>
    <PopoverContent side={side} align='start' className={className}>
      <div className='text-muted-foreground text-sm'>{children}</div>
    </PopoverContent>
  </Popover>
)

export { HelpPopover }
export type { HelpPopoverProps }
