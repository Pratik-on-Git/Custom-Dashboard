// Component Imports
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

type InitialsAvatarProps = {
  initials: string

  /** Full name, used for the accessible label / tooltip */
  name?: string

  /** Omit for the app's standard muted fallback; pass a tone to tint it */
  tone?: Tone
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

/** Micro: initials avatar built on the ui Avatar primitive. */
const InitialsAvatar = ({ initials, name, tone, size = 'default', className }: InitialsAvatarProps) => (
  <Avatar size={size} className={cn('after:border-0', className)} title={name} aria-label={name}>
    <AvatarFallback
      className={cn(
        'text-xs font-medium group-data-[size=lg]/avatar:text-sm',
        tone && 'text-foreground bg-(--tone)/15 font-semibold'
      )}
      style={tone ? toneStyle(tone) : undefined}
    >
      {initials}
    </AvatarFallback>
  </Avatar>
)

export { InitialsAvatar }
export type { InitialsAvatarProps }
