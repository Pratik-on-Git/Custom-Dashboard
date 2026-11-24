'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { EllipsisIcon, EyeIcon, PencilIcon, Trash2Icon, UserCheckIcon, UserXIcon } from 'lucide-react'

// Type Imports
import type { AppUser } from '@/types/apps/user-types'
import type { UserRowHandlers } from './user-columns'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// Config Imports
import { routes } from '../config'

type UserRowActionsProps = UserRowHandlers & { user: AppUser }

const UserRowActions = ({ user, onEdit, onStatusChange, onDelete }: UserRowActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={<Button variant='ghost' size='icon-sm' aria-label={`Actions for ${user.name}`} className='-me-2' />}
    >
      <EllipsisIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-44'>
      <DropdownMenuGroup>
        <DropdownMenuItem render={<Link href={routes.view} />}>
          <EyeIcon />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        {user.status === 'Active' ? (
          <DropdownMenuItem onClick={() => onStatusChange(user, 'Suspended')}>
            <UserXIcon />
            Suspend
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onStatusChange(user, 'Active')}>
            <UserCheckIcon />
            Activate
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant='destructive' onClick={() => onDelete(user)}>
        <Trash2Icon />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default UserRowActions
