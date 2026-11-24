'use client'

// React Imports
import { useState } from 'react'
import type { ReactNode } from 'react'

// Third-party Imports
import { AudioWaveformIcon, ChevronsUpDownIcon, CommandIcon, GalleryVerticalEndIcon, PlusIcon } from 'lucide-react'

// Type Imports
import type { TeamLogo } from '@/types/shared/session-types'

// Component Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { IconTile } from '@/components/global/micro/icon-tile'

// Data Imports
import { teams } from '@/fake-db/shared/session'

const teamLogos: Record<TeamLogo, ReactNode> = {
  command: <CommandIcon />,
  gallery: <GalleryVerticalEndIcon />,
  waveform: <AudioWaveformIcon />
}

/** Sidebar header alternative to the brand logo: switch between workspaces. Enable via `themeConfig.sidebarHeader`. */
const TeamSwitcher = () => {
  const { isMobile } = useSidebar()
  const [activeId, setActiveId] = useState(teams[0].id)
  const active = teams.find(team => team.id === activeId) ?? teams[0]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size='lg' className='aria-expanded:bg-sidebar-accent' />}>
            <IconTile tone='primary' variant='solid' size='sm' className='size-8 rounded-lg'>
              {teamLogos[active.logo]}
            </IconTile>
            <span className='grid flex-1 text-start text-sm leading-tight'>
              <span className='truncate font-semibold'>{active.name}</span>
              <span className='text-muted-foreground truncate text-xs'>{active.plan}</span>
            </span>
            <ChevronsUpDownIcon className='ms-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='start' sideOffset={4} className='w-60'>
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-muted-foreground text-xs'>Teams</DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem key={team.id} onClick={() => setActiveId(team.id)} className='gap-2 p-2'>
                  <IconTile variant='outline' size='xs' className='size-6'>
                    {teamLogos[team.logo]}
                  </IconTile>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <IconTile variant='outline' size='xs' className='size-6'>
                <PlusIcon />
              </IconTile>
              <span className='text-muted-foreground font-medium'>Add team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default TeamSwitcher
