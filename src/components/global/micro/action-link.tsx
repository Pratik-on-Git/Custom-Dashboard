// Type Imports
import type { ComponentProps, ReactNode } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'

type ActionLinkProps = {
  href: string
  children: ReactNode
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']

  /** Trailing icon; defaults to an arrow */
  icon?: ReactNode
  className?: string
}

/** Micro: navigational button ("Open the plan →") — ui Button rendered as a Next Link. */
const ActionLink = ({ href, children, variant = 'ghost', size = 'sm', icon, className }: ActionLinkProps) => (
  <Button variant={variant} size={size} className={className} render={<Link href={href} />} nativeButton={false}>
    {children}
    {icon ?? <ArrowRightIcon data-icon='inline-end' />}
  </Button>
)

export { ActionLink }
export type { ActionLinkProps }
