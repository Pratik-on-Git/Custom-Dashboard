// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { ColorDot } from '@/components/global/micro/color-dot'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const statusPillVariants = cva('font-medium', {
  variants: {
    variant: {
      soft: 'text-foreground bg-(--tone)/12',
      outline: 'text-foreground border-(--tone)/40 bg-transparent',
      solid: 'text-background bg-(--tone)'
    },
    size: {
      sm: 'h-5 px-2 text-xs',
      md: 'h-6 px-2.5 text-xs'
    }
  },
  defaultVariants: {
    variant: 'soft',
    size: 'md'
  }
})

type StatusPillProps = VariantProps<typeof statusPillVariants> & {
  tone?: Tone

  /** Show the leading coloured dot (default true) */
  dot?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
}

/** Global: status / phase pill — "Pick", "Act", "Clear", "3 over". Built on the ui Badge. */
const StatusPill = ({ tone = 'neutral', variant, size, dot = true, icon, className, children }: StatusPillProps) => (
  <Badge variant='secondary' className={cn(statusPillVariants({ variant, size }), className)} style={toneStyle(tone)}>
    {icon ?? (dot && variant !== 'solid' ? <ColorDot tone={tone} size='xs' /> : null)}
    {children}
  </Badge>
)

export { StatusPill, statusPillVariants }
export type { StatusPillProps }
