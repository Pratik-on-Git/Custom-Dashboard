// Type Imports
import type { ComponentProps } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const colorDotVariants = cva('inline-block shrink-0 bg-(--tone)', {
  variants: {
    size: {
      xs: 'size-1.5',
      sm: 'size-2',
      md: 'size-2.5',
      lg: 'size-3'
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-[3px]',
      dash: 'h-0.5 w-3 rounded-full border-t-2 border-dashed border-(--tone) bg-transparent'
    }
  },
  defaultVariants: {
    size: 'sm',
    shape: 'circle'
  }
})

type ColorDotProps = ComponentProps<'span'> & VariantProps<typeof colorDotVariants> & { tone?: Tone }

/** Micro: a small coloured marker used in legends, pills and list headers. */
const ColorDot = ({ tone = 'neutral', size, shape, className, style, ...props }: ColorDotProps) => (
  <span
    aria-hidden='true'
    data-slot='color-dot'
    className={cn(colorDotVariants({ size, shape }), className)}
    style={toneStyle(tone, style)}
    {...props}
  />
)

export { ColorDot, colorDotVariants }
export type { ColorDotProps }
