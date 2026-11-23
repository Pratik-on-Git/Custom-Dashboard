// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const sectionCardVariants = cva('relative', {
  variants: {
    /** `accent` draws a toned strip along the top edge (needs `tone`) */
    variant: {
      default: '',
      accent: 'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-(--tone)'
    },
    interactive: {
      true: 'hover:ring-foreground/20 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md',
      false: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    interactive: false
  }
})

type SectionCardProps = VariantProps<typeof sectionCardVariants> & {
  title?: ReactNode
  description?: ReactNode

  /** Rendered before the title (icon tile, index badge, avatar…) */
  leading?: ReactNode

  /** Rendered top-right (button, segmented control, status pill…) */
  action?: ReactNode
  tone?: Tone
  size?: 'default' | 'sm'

  /** id for the heading, so the section can be `aria-labelledby` it */
  headingId?: string
  className?: string
  contentClassName?: string
  children?: ReactNode
}

/**
 * Global: the standard dashboard section — ui Card + header (leading / title / description / action) + body.
 * Every card-shaped section on every page should start from this.
 */
const SectionCard = ({
  title,
  description,
  leading,
  action,
  tone = 'neutral',
  variant,
  interactive,
  size,
  headingId,
  className,
  contentClassName,
  children
}: SectionCardProps) => {
  const hasHeader = Boolean(title || description || leading || action)

  return (
    <Card
      size={size}
      className={cn(sectionCardVariants({ variant, interactive }), className)}
      style={toneStyle(tone)}
      role={headingId ? 'region' : undefined}
      aria-labelledby={headingId}
    >
      {hasHeader && (
        <CardHeader className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-start gap-3'>
            {leading}
            <div className='flex min-w-0 flex-col gap-0.5'>
              {title && (
                <CardTitle id={headingId} className='truncate text-base'>
                  {title}
                </CardTitle>
              )}
              {description && <CardDescription className='flex items-center gap-2'>{description}</CardDescription>}
            </div>
          </div>
          {action && <CardAction className='flex shrink-0 items-center gap-2'>{action}</CardAction>}
        </CardHeader>
      )}
      {children && <CardContent className={cn('flex flex-1 flex-col gap-5', contentClassName)}>{children}</CardContent>}
    </Card>
  )
}

export { SectionCard, sectionCardVariants }
export type { SectionCardProps }
