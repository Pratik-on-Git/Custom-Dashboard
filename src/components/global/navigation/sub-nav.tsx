'use client'

// Type Imports
import type { ReactNode } from 'react'

// Next Imports
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// Component Imports
import { Button } from '@/components/ui/button'
import { SelectField } from '@/components/global/inputs/select-field'

// Util Imports
import { cn } from '@/lib/utils'

type SubNavItem = {
  href: string
  label: string
  icon?: ReactNode
}

type SubNavProps = {
  items: SubNavItem[]
  ariaLabel: string
  className?: string
}

/**
 * Global: secondary navigation for a section with several pages (settings, docs…).
 * Vertical list on large screens, a scrollable row on tablets and a select on phones.
 */
const SubNav = ({ items, ariaLabel, className }: SubNavProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const active = items.find(item => pathname === item.href)?.href ?? items[0]?.href

  return (
    <div data-slot='sub-nav' className={className}>
      <SelectField
        className='md:hidden'
        options={items.map(item => ({ value: item.href, label: item.label }))}
        value={active}
        onValueChange={href => router.push(href)}
      />

      <nav aria-label={ariaLabel} className='-mx-1 hidden overflow-x-auto px-1 pb-1 md:block lg:overflow-visible'>
        <ul className='flex gap-1 lg:flex-col'>
          {items.map(item => {
            const isActive = item.href === active

            return (
              <li key={item.href} className='shrink-0'>
                <Button
                  variant='ghost'
                  className={cn(
                    'text-muted-foreground w-full justify-start',
                    isActive && 'bg-muted text-foreground hover:bg-muted'
                  )}
                  render={<Link href={item.href} aria-current={isActive ? 'page' : undefined} />}
                  nativeButton={false}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export { SubNav }
export type { SubNavItem, SubNavProps }
