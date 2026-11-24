// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'

const messageBubbleVariants = cva('flex max-w-[80%] flex-col gap-1 px-3.5 py-2 text-sm text-pretty wrap-break-word', {
  variants: {
    /** `outgoing` = sent by the viewer (primary, end-aligned); `incoming` = received (muted, start-aligned) */
    variant: {
      outgoing: 'bg-primary text-primary-foreground self-end rounded-2xl rounded-ee-sm',
      incoming: 'bg-muted text-foreground self-start rounded-2xl rounded-es-sm'
    }
  },
  defaultVariants: {
    variant: 'incoming'
  }
})

type MessageBubbleProps = VariantProps<typeof messageBubbleVariants> & {
  children: ReactNode

  /** Small line under the text — usually the time */
  meta?: ReactNode
  className?: string
}

/** Global: one chat / comment message. Place inside a `flex flex-col` thread. */
const MessageBubble = ({ variant, meta, className, children }: MessageBubbleProps) => (
  <div data-slot='message-bubble' className={cn(messageBubbleVariants({ variant }), className)}>
    <p>{children}</p>
    {meta && (
      <span className={cn('text-xs opacity-70', variant === 'outgoing' ? 'self-end' : 'self-start')}>{meta}</span>
    )}
  </div>
)

export { MessageBubble, messageBubbleVariants }
export type { MessageBubbleProps }
