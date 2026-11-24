'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { ChevronsUpDownIcon } from 'lucide-react'

// Component Imports
import SignOutDialog from '@/components/layout/SignOutDialog'
import UserMenuItems from '@/components/layout/UserMenuItems'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

// Data Imports
import { currentUser } from '@/fake-db/shared/session'

/** Sidebar footer: signed-in user with the account menu (collapses to the avatar in icon mode). */
const NavUser = () => {
  const { isMobile } = useSidebar()
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger render={<SidebarMenuButton size='lg' className='aria-expanded:bg-sidebar-accent' />}>
              <Avatar className='size-8 rounded-lg'>
                <AvatarImage src={currentUser.imageUrl} alt={currentUser.fullName} />
                <AvatarFallback className='rounded-lg'>{currentUser.initials}</AvatarFallback>
              </Avatar>
              <span className='grid flex-1 text-start text-sm leading-tight'>
                <span className='truncate font-semibold'>{currentUser.fullName}</span>
                <span className='text-muted-foreground truncate text-xs'>{currentUser.email}</span>
              </span>
              <ChevronsUpDownIcon className='ms-auto size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='end' sideOffset={4} className='w-60'>
              <UserMenuItems user={currentUser} onSignOut={() => setIsSignOutOpen(true)} />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SignOutDialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
    </>
  )
}

export default NavUser
