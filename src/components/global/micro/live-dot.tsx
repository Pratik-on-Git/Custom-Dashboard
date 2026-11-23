// Type Imports
import type { ComponentProps } from 'react'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

type LiveDotProps = ComponentProps<'span'> & { tone?: Tone }

/** Micro: pulsing "live" indicator. */
const LiveDot = ({ tone = 'success', className, style, ...props }: LiveDotProps) => (
  <span
    aria-hidden='true'
    data-slot='live-dot'
    className={cn('relative inline-flex size-2 shrink-0', className)}
    style={toneStyle(tone, style)}
    {...props}
  >
    <span className='absolute inset-0 animate-ping rounded-full bg-(--tone) opacity-60 motion-reduce:animate-none' />
    <span className='relative inline-flex size-2 rounded-full bg-(--tone)' />
  </span>
)

export { LiveDot }
