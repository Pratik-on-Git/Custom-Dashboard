'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { BellIcon, LogOutIcon, SettingsIcon, SparklesIcon, UserIcon } from 'lucide-react'

// Type Imports
import type { SessionUser } from '@/types/shared/session-types'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'

type UserMenuItemsProps = {
  user: SessionUser
  onSignOut: () => void
}

/** Shared body of the account menus (header avatar menu and sidebar footer): identity, links, sign out. */
const UserMenuItems = ({ user, onSignOut }: UserMenuItemsProps) => (
  <>
    <DropdownMenuGroup>
      <DropdownMenuLabel className='flex items-center gap-3 px-2 py-2 font-normal'>
        <Avatar className='size-9'>
          <AvatarImage src={user.imageUrl} alt={user.fullName} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <span className='flex min-w-0 flex-col'>
          <span className='text-foreground truncate text-sm font-semibold'>{user.fullName}</span>
          <span className='text-muted-foreground truncate text-xs'>{user.email}</span>
        </span>
      </DropdownMenuLabel>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem render={<Link href='/pages/user-settings?setting=general' />}>
        <SparklesIcon />
        Upgrade to Pro
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem render={<Link href='/pages/user-profile?view=profile' />}>
        <UserIcon />
        My account
      </DropdownMenuItem>
      <DropdownMenuItem render={<Link href='/pages/settings/profile' />}>
        <SettingsIcon />
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem render={<Link href='/pages/settings/notifications' />}>
        <BellIcon />
        Notifications
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem variant='destructive' onClick={onSignOut}>
        <LogOutIcon />
        Sign out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </>
)

export default UserMenuItems
