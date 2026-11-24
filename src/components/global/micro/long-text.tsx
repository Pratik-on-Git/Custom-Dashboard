'use client'

// React Imports
import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'

// Component Imports
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Util Imports
import { cn } from '@/lib/utils'

type LongTextProps = {
  children: ReactNode

  /** Width limit for the truncated text, e.g. `max-w-36` */
  className?: string
}

/** Micro: single-line truncated text that reveals the full value in a tooltip — only when it actually overflows. */
const LongText = ({ children, className }: LongTextProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false)

  const measure = useCallback((node: HTMLSpanElement | null) => {
    if (node) setIsOverflowing(node.scrollWidth > node.clientWidth)
  }, [])

  return (
    <Tooltip disabled={!isOverflowing}>
      <TooltipTrigger render={<span ref={measure} data-slot='long-text' className={cn('block truncate', className)} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent className='max-w-xs'>{children}</TooltipContent>
    </Tooltip>
  )
}

export { LongText }
export type { LongTextProps }
