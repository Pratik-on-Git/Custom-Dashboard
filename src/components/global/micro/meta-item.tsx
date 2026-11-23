// Type Imports
import type { ComponentProps, ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const metaItemVariants = cva('inline-flex items-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0', {
  variants: {
    size: {
      xs: 'text-xs [&_svg]:size-3',
      sm: 'text-sm [&_svg]:size-3.5'
    },
    emphasis: {
      muted: 'text-muted-foreground',
      default: 'text-foreground',
      tone: 'text-(--tone)'
    }
  },
  defaultVariants: {
    size: 'sm',
    emphasis: 'muted'
  }
})

type MetaItemProps = Omit<ComponentProps<'span'>, 'children'> &
  VariantProps<typeof metaItemVariants> & {
    icon?: ReactNode
    tone?: Tone
    children: ReactNode
  }

/** Micro: icon + short text, e.g. "💧 77%", "🕒 First pick in 5 days". */
const MetaItem = ({ icon, tone = 'neutral', size, emphasis, className, style, children, ...props }: MetaItemProps) => (
  <span
    data-slot='meta-item'
    className={cn(metaItemVariants({ size, emphasis }), className)}
    style={toneStyle(tone, style)}
    {...props}
  >
    {icon}
    <span className='tabular-nums'>{children}</span>
  </span>
)

export { MetaItem, metaItemVariants }
export type { MetaItemProps }
