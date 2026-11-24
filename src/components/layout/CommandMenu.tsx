'use client'

// React Imports
import { Fragment } from 'react'
import type { ComponentType } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import * as Icon from 'lucide-react'
import { ChevronRightIcon, LaptopIcon, MoonIcon, Settings2Icon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

// Component Imports
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'

// Config Imports
import { searchEntries } from '@/configs/searchConfig'

// Context Imports
import { useSearch } from '@/contexts/search-context'

const groups = [...new Set(searchEntries.map(entry => entry.group))]

/** Global ⌘K palette: jump to any page in the sidebar, or switch theme. Open state lives in `SearchProvider`. */
const CommandMenu = ({ onOpenThemeSettings }: { onOpenThemeSettings?: () => void }) => {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const run = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title='Search' description='Search pages and commands'>
      <CommandInput placeholder='Type a command or search…' />
      <CommandList className='max-h-96'>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map(group => (
          <CommandGroup key={group} heading={group}>
            {searchEntries
              .filter(entry => entry.group === group)
              .map(entry => {
                const EntryIcon = Icon[entry.icon] as ComponentType<{ className?: string }>

                return (
                  <CommandItem
                    key={entry.href}
                    value={`${entry.path.join(' ')} ${entry.href}`}
                    onSelect={() => run(() => router.push(entry.href))}
                  >
                    <EntryIcon className='text-muted-foreground' />
                    {entry.path.map((part, index) => (
                      <Fragment key={part}>
                        {index > 0 && <ChevronRightIcon className='text-muted-foreground size-3!' />}
                        <span>{part}</span>
                      </Fragment>
                    ))}
                  </CommandItem>
                )
              })}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading='Theme'>
          <CommandItem onSelect={() => run(() => setTheme('light'))}>
            <SunIcon />
            Light
          </CommandItem>
          <CommandItem onSelect={() => run(() => setTheme('dark'))}>
            <MoonIcon />
            Dark
          </CommandItem>
          <CommandItem onSelect={() => run(() => setTheme('system'))}>
            <LaptopIcon />
            System
          </CommandItem>
          {onOpenThemeSettings && (
            <CommandItem onSelect={() => run(onOpenThemeSettings)}>
              <Settings2Icon />
              Theme settings…
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default CommandMenu
