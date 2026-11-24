'use client'

// Third-party Imports
import { CheckIcon, LaptopIcon, MoonStarIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const themes = [
  { value: 'light', label: 'Light', icon: <SunIcon /> },
  { value: 'dark', label: 'Dark', icon: <MoonStarIcon /> },
  { value: 'system', label: 'System', icon: <LaptopIcon /> }
] as const

type ModeToggleProps = {
  size?: 'icon' | 'icon-lg'

  /** `menu` = light / dark / system dropdown; `toggle` = one click flips light ↔ dark */
  variant?: 'menu' | 'toggle'
}

const ThemeIcon = () => (
  <>
    <MoonStarIcon className='scale-100 dark:scale-0' />
    <SunIcon className='absolute scale-0 dark:scale-100' />
  </>
)

/** Header theme switch. */
const ModeToggle = ({ variant = 'menu', size = 'icon-lg' }: ModeToggleProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme()

  if (variant === 'toggle') {
    return (
      <Button
        variant='ghost'
        size={size}
        className='relative'
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        aria-label='Toggle theme'
      >
        <ThemeIcon />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='ghost' size={size} className='relative' aria-label='Theme' />}>
        <ThemeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-36'>
        <DropdownMenuGroup>
          {themes.map(option => (
            <DropdownMenuItem key={option.value} onClick={() => setTheme(option.value)}>
              {option.icon}
              {option.label}
              {theme === option.value && <CheckIcon className='ms-auto' />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
