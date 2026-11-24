'use client'

// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { PaletteIcon, RotateCcwIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

// Type Imports
import type {
  AppFont,
  NavbarVariant,
  SidebarCollapsible,
  SidebarVariant,
  TextDirection
} from '@/types/preferences-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { FieldLegend, FieldSet } from '@/components/ui/field'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useSidebar } from '@/components/ui/sidebar'
import { ChoiceCards } from '@/components/global/inputs/choice-cards'
import { SegmentedControl } from '@/components/global/inputs/segmented-control'
import { LayoutPreview } from '@/components/global/micro/layout-preview'

// Context Imports
import { usePreferences } from '@/contexts/preferences-context'

type ThemeValue = 'system' | 'light' | 'dark'
type LayoutValue = 'default' | SidebarCollapsible

const themeOptions = (['system', 'light', 'dark'] as const).map(value => ({
  value,
  label: value[0].toUpperCase() + value.slice(1),
  preview: <LayoutPreview scheme={value} />
}))

const sidebarOptions: { value: SidebarVariant; label: string; preview: ReactNode }[] = [
  { value: 'sidebar', label: 'Sidebar', preview: <LayoutPreview sidebar='sidebar' /> },
  { value: 'inset', label: 'Inset', preview: <LayoutPreview sidebar='inset' /> },
  { value: 'floating', label: 'Floating', preview: <LayoutPreview sidebar='floating' /> }
]

const layoutOptions: { value: LayoutValue; label: string; preview: ReactNode }[] = [
  { value: 'default', label: 'Default', preview: <LayoutPreview mode='expanded' /> },
  { value: 'icon', label: 'Compact', preview: <LayoutPreview mode='icon' /> },
  { value: 'offcanvas', label: 'Full', preview: <LayoutPreview mode='hidden' /> }
]

const navbarOptions: { value: NavbarVariant; label: string; preview: ReactNode }[] = [
  { value: 'default', label: 'Attached', preview: <LayoutPreview navbar='default' /> },
  { value: 'floating', label: 'Floating', preview: <LayoutPreview navbar='floating' /> }
]

const directionOptions: { value: TextDirection; label: string; preview: ReactNode }[] = [
  { value: 'ltr', label: 'Left to right', preview: <LayoutPreview direction='ltr' /> },
  { value: 'rtl', label: 'Right to left', preview: <LayoutPreview direction='rtl' /> }
]

const fontOptions: { value: AppFont; label: string }[] = [
  { value: 'geist', label: 'Geist' },
  { value: 'inter', label: 'Inter' },
  { value: 'manrope', label: 'Manrope' }
]

type SectionProps = {
  title: string
  canReset: boolean
  onReset: () => void
  className?: string
  children: ReactNode
}

const Section = ({ title, canReset, onReset, className, children }: SectionProps) => (
  <FieldSet className={className}>
    <FieldLegend variant='label' className='text-muted-foreground mb-2 flex items-center gap-2'>
      {title}
      {canReset && (
        <Button
          variant='secondary'
          size='icon-xs'
          className='size-5 rounded-full'
          onClick={onReset}
          aria-label={`Reset ${title.toLowerCase()}`}
        >
          <RotateCcwIcon className='size-3' />
        </Button>
      )}
    </FieldLegend>
    {children}
  </FieldSet>
)

type ConfigDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerSize?: 'icon' | 'icon-lg'
}

/** Theme Settings sheet: colour scheme, sidebar style, collapse layout, font and text direction. */
const ConfigDrawer = ({ open, onOpenChange, triggerSize = 'icon-lg' }: ConfigDrawerProps) => {
  const { theme = 'system', setTheme } = useTheme()
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar()

  const {
    sidebarVariant,
    sidebarCollapsible,
    navbarVariant,
    font,
    direction,
    defaults,
    setPreference,
    resetPreferences
  } = usePreferences()

  const layout: LayoutValue = sidebarOpen ? 'default' : sidebarCollapsible

  const setLayout = (value: LayoutValue) => {
    if (value === 'default') return setSidebarOpen(true)
    setPreference('sidebarCollapsible', value)
    setSidebarOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger render={<Button variant='ghost' size={triggerSize} aria-label='Open theme settings' />}>
        <PaletteIcon />
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-sm'>
        <SheetHeader>
          <SheetTitle>Theme settings</SheetTitle>
          <SheetDescription>Adjust the appearance and layout to suit your preferences.</SheetDescription>
        </SheetHeader>

        <div className='flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-2'>
          <Section title='Theme' canReset={theme !== 'system'} onReset={() => setTheme('system')}>
            <ChoiceCards<ThemeValue>
              ariaLabel='Colour theme'
              options={themeOptions}
              value={theme as ThemeValue}
              onValueChange={setTheme}
            />
          </Section>

          <Section
            title='Sidebar'
            className='max-md:hidden'
            canReset={sidebarVariant !== defaults.sidebarVariant}
            onReset={() => setPreference('sidebarVariant', defaults.sidebarVariant)}
          >
            <ChoiceCards
              ariaLabel='Sidebar style'
              options={sidebarOptions}
              value={sidebarVariant}
              onValueChange={value => setPreference('sidebarVariant', value)}
            />
          </Section>

          <Section
            title='Layout'
            className='max-md:hidden'
            canReset={layout !== 'default'}
            onReset={() => setLayout('default')}
          >
            <ChoiceCards ariaLabel='Sidebar layout' options={layoutOptions} value={layout} onValueChange={setLayout} />
          </Section>

          <Section
            title='Navbar'
            canReset={navbarVariant !== defaults.navbarVariant}
            onReset={() => setPreference('navbarVariant', defaults.navbarVariant)}
          >
            <ChoiceCards
              ariaLabel='Navbar style'
              columns={2}
              options={navbarOptions}
              value={navbarVariant}
              onValueChange={value => setPreference('navbarVariant', value)}
            />
          </Section>

          <Section title='Font' canReset={font !== defaults.font} onReset={() => setPreference('font', defaults.font)}>
            <SegmentedControl
              ariaLabel='Interface font'
              options={fontOptions}
              value={font}
              onValueChange={value => setPreference('font', value)}
              className='w-full *:flex-1'
            />
          </Section>

          <Section
            title='Direction'
            canReset={direction !== defaults.direction}
            onReset={() => setPreference('direction', defaults.direction)}
          >
            <ChoiceCards
              ariaLabel='Text direction'
              columns={2}
              options={directionOptions}
              value={direction}
              onValueChange={value => setPreference('direction', value)}
            />
          </Section>
        </div>

        <SheetFooter>
          <Button
            variant='destructive'
            onClick={() => {
              resetPreferences()
              setTheme('system')
              setSidebarOpen(true)
            }}
          >
            Reset all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ConfigDrawer
