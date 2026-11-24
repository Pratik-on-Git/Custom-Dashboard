// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

type InitialsAvatarProps = {
  initials: string

  /** Full name, used for the accessible label / tooltip */
  name?: string

  /** Photo URL; the initials show while it loads or if it fails */
  src?: string

  /** Omit for the app's standard muted fallback; pass a tone to tint it */
  tone?: Tone
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

/** Micro: initials avatar (optionally with a photo) built on the ui Avatar primitive. */
const InitialsAvatar = ({ initials, name, src, tone, size = 'default', className }: InitialsAvatarProps) => (
  <Avatar size={size} className={cn('after:border-0', className)} title={name} aria-label={name}>
    {src && <AvatarImage src={src} alt={name ?? initials} />}
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
