// Type Imports
import type { ComponentProps } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'

const kbdVariants = cva(
  'bg-muted text-muted-foreground pointer-events-none inline-flex items-center gap-0.5 rounded border font-mono font-medium select-none',
  {
    variants: {
      size: {
        sm: 'h-5 px-1.5 text-[10px]',
        md: 'h-6 px-2 text-xs'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
)

type KbdProps = ComponentProps<'kbd'> & VariantProps<typeof kbdVariants>

/** Micro: keyboard shortcut hint, e.g. ⌘K. */
const Kbd = ({ size, className, ...props }: KbdProps) => (
  <kbd data-slot='kbd' className={cn(kbdVariants({ size }), className)} {...props} />
)

export { Kbd, kbdVariants }
export type { KbdProps }
