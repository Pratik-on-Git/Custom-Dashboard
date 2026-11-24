'use client'

// React Imports
import { Fragment } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// Third-party Imports
import { LanguagesIcon } from 'lucide-react'

// Component Imports
import LanguageDropdown from '@/components/shared/LanguageDropdown'
import ActivitySheet from '@/components/layout/ActivitySheet'
import ConfigDrawer from '@/components/layout/ConfigDrawer'
import ModeToggle from '@/components/layout/ModeToggle'
import NotificationsMenu from '@/components/layout/NotificationsMenu'
import SearchTrigger from '@/components/layout/SearchTrigger'
import ProfileDropdown from '@/components/shared/ProfileDropdown'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

// Context Imports
import { usePreferences } from '@/contexts/preferences-context'

// Util Imports
import { cn } from '@/lib/utils'
import { pageContainer } from '@/components/global/variants/container'

/**
 * Floating navbar backdrop. The blur must sit on the sticky <header> itself: a backdrop-filter on a child or
 * ::before only samples inside the header's own stacking context (sticky + z-50), so page content wouldn't blur.
 * Two mask layers: (1) solid over the bar (content box + 1px for the Card ring) so the bar stays
 * crisp, (2) the fade — fully blurred at the top, transparent at the bottom — over the rest.
 */
const floatingBackdrop =
  'backdrop-blur-md [mask:linear-gradient(var(--card),var(--card))_-1px_0/calc(100%_+_2px)_calc(100%_+_1px)_no-repeat_content-box_border-box,linear-gradient(var(--card),var(--card)_18%,transparent_100%)]'

/** Shared by both variants so they have the same height and rhythm */
const barLayout = 'flex-row items-center justify-between gap-6 py-2'

/** Theme Settings drawer state is lifted to the layout so the ⌘K menu can open it too */
type HeaderProps = {
  themeSettingsOpen: boolean
  onThemeSettingsOpenChange: (open: boolean) => void
}

/**
 * App navbar. Variants (Theme Settings → Navbar):
 * - `default`: full-width card-coloured bar with a bottom border, breadcrumbs and a search field.
 * - `floating`: the bar is the ui `Card` (same radius / ring / shadow as every card) floating inside the page
 *   container, over a blurred backdrop that fades out downwards.
 */
const Header = ({ themeSettingsOpen, onThemeSettingsOpenChange }: HeaderProps) => {
  const pathname = usePathname()
  const { navbarVariant: variant } = usePreferences()
  const isFloating = variant === 'floating'

  const segments = pathname.split('/').filter(Boolean)

  const start = (
    <div className='flex min-w-0 items-center gap-1.5 sm:gap-4'>
      <SidebarTrigger className='[&_svg]:size-5!' />
      <Separator orientation='vertical' className='hidden h-4! data-vertical:self-center sm:block' />
      {isFloating ? (
        <SearchTrigger variant='inline' />
      ) : (
        <Breadcrumb className='hidden sm:block'>
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1
              const label = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
              const href = '/' + segments.slice(0, index + 1).join('/')

              return (
                <Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? <BreadcrumbPage>{label}</BreadcrumbPage> : <BreadcrumbLink>{label}</BreadcrumbLink>}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  )

  const end = (
    <div className='flex items-center gap-1.5'>
      {isFloating ? (
        <>
          <ActivitySheet />
          <NotificationsMenu />
        </>
      ) : (
        <SearchTrigger />
      )}
      <ModeToggle variant={isFloating ? 'toggle' : 'menu'} size={isFloating ? 'icon' : 'icon-lg'} />
      {!isFloating && (
        <LanguageDropdown
          trigger={
            <Button variant='ghost' size='icon-lg' aria-label='Language'>
              <LanguagesIcon />
            </Button>
          }
        />
      )}
      <ConfigDrawer
        open={themeSettingsOpen}
        onOpenChange={onThemeSettingsOpenChange}
        triggerSize={isFloating ? 'icon' : 'icon-lg'}
      />
      <ProfileDropdown />
    </div>
  )

  if (isFloating) {
    return (
      <header
        data-variant='floating'
        className={cn(
          pageContainer(),

          // pt-2 = the sidebar's own inset (p-2), so in floating / inset sidebar modes the tops line up.
          // pb-px keeps the Card's 1px ring inside the masked box; -mb-px cancels it so page layout doesn't move.
          'sticky top-0 z-50 -mb-px rounded-t-xl pt-2 pb-px',
          floatingBackdrop
        )}
      >
        {/* px uses the Card's spacing token so the bar's inset always matches card content */}
        <Card className={cn(barLayout, 'overflow-visible px-(--card-spacing)')}>
          {start}
          {end}
        </Card>
      </header>
    )
  }

  return (
    <header data-variant='default' className='bg-card sticky top-0 z-50 border-b'>
      <div className={cn(pageContainer(), 'flex', barLayout)}>
        {start}
        {end}
      </div>
    </header>
  )
}

export default Header
