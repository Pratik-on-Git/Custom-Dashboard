'use client'

// React Imports
import { useState } from 'react'

// Component Imports
import SignOutDialog from '@/components/layout/SignOutDialog'
import UserMenuItems from '@/components/layout/UserMenuItems'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ColorDot } from '@/components/global/micro/color-dot'

// Data Imports
import { currentUser } from '@/fake-db/shared/session'

const ProfileDropdown = () => {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant='ghost'
              size='icon'
              className='relative rounded-full hover:bg-transparent'
              aria-label='Account menu'
            />
          }
        >
          <Avatar>
            <AvatarImage src={currentUser.imageUrl} alt={currentUser.fullName} />
            <AvatarFallback>{currentUser.initials}</AvatarFallback>
          </Avatar>
          <ColorDot tone='success' className='ring-card absolute inset-e-0 bottom-0 ring-2' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-60'>
          <UserMenuItems user={currentUser} onSignOut={() => setIsSignOutOpen(true)} />
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
    </>
  )
}

export default ProfileDropdown
