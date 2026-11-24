// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { InitialsAvatar } from '@/components/global/micro/initials-avatar'

// Util Imports
import { cn } from '@/lib/utils'

const identityVariants = cva('flex min-w-0 items-center', {
  variants: {
    size: {
      sm: 'gap-2 *:data-[slot=identity-text]:text-xs',
      md: 'gap-3'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type IdentityProps = VariantProps<typeof identityVariants> & {
  name: string
  initials: string

  /** Second line: email, username, job title, last message… */
  description?: ReactNode
  imageUrl?: string
  className?: string
}

/** Micro: avatar + name + secondary line — people in tables, lists, menus and pickers. */
const Identity = ({ name, initials, description, imageUrl, size, className }: IdentityProps) => (
  <span data-slot='identity' className={cn(identityVariants({ size }), className)}>
    <InitialsAvatar initials={initials} name={name} src={imageUrl} size={size === 'sm' ? 'sm' : 'default'} />
    <span data-slot='identity-text' className='flex min-w-0 flex-col text-sm leading-tight'>
      <span className='text-foreground truncate font-medium'>{name}</span>
      {description && <span className='text-muted-foreground truncate'>{description}</span>}
    </span>
  </span>
)

export { Identity, identityVariants }
export type { IdentityProps }
