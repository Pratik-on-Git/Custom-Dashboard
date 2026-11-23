// Type Imports
import type { ComponentProps } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const iconTileVariants = cva('inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0', {
  variants: {
    variant: {
      soft: 'bg-(--tone)/12 text-(--tone)',
      solid: 'text-background bg-(--tone)',
      outline: 'border-border border text-(--tone)',
      muted: 'bg-muted text-foreground/75'
    },
    size: {
      xs: 'size-5 rounded-[5px] text-[11px] [&_svg]:size-3',
      sm: 'size-7 rounded-md [&_svg]:size-3.5',
      md: 'size-10 rounded-lg [&_svg]:size-4.5',
      lg: 'size-11 rounded-xl [&_svg]:size-5'
    }
  },
  defaultVariants: {
    variant: 'soft',
    size: 'md'
  }
})

type IconTileProps = ComponentProps<'span'> & VariantProps<typeof iconTileVariants> & { tone?: Tone }

/** Micro: rounded square holding an icon (or short text such as an index number). */
const IconTile = ({ tone = 'neutral', variant, size, className, style, ...props }: IconTileProps) => (
  <span
    data-slot='icon-tile'
    className={cn(iconTileVariants({ variant, size }), className)}
    style={toneStyle(tone, style)}
    {...props}
  />
)

export { IconTile, iconTileVariants }
export type { IconTileProps }
