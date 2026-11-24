// Next Imports
import Link from 'next/link'

// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

// Type Imports
import type { AppUser } from '@/types/apps/user-types'

// Component Imports
import { DataTableColumnHeader } from '@/components/global/data-table/column-header'
import { createSelectColumn } from '@/components/global/data-table/select-column'
import { StatusPill } from '@/components/global/data-display/status-pill'
import { Identity } from '@/components/global/micro/identity'
import { MetaItem } from '@/components/global/micro/meta-item'
import UserRowActions from './user-row-actions'

// Config Imports
import { billingLabel, roleMeta, routes, statusTone } from '../config'

// Util Imports
import { toInitials } from '@/utils/format-utils'

export type UserRowHandlers = {
  onEdit: (user: AppUser) => void
  onStatusChange: (user: AppUser, status: AppUser['status']) => void
  onDelete: (user: AppUser) => void
}

export const getUserColumns = (handlers: UserRowHandlers): ColumnDef<AppUser, any>[] => [
  createSelectColumn<AppUser>(),
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='User' />,
    cell: ({ row }) => (
      <Link
        href={routes.view}
        className='focus-visible:ring-ring/50 block rounded-md outline-none hover:underline focus-visible:ring-3'
      >
        <Identity
          name={row.original.name}
          initials={toInitials(row.original.name)}
          imageUrl={row.original.avatar}
          description={row.original.email}
        />
      </Link>
    ),
    meta: { label: 'User', className: 'min-w-64' },
    enableHiding: false
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
    cell: ({ row }) => (
      <MetaItem icon={roleMeta[row.original.role].icon} emphasis='default'>
        {row.original.role}
      </MetaItem>
    ),
    filterFn: 'arrIncludesSome',
    meta: { label: 'Role' }
  },
  {
    accessorKey: 'plan',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Plan' />,
    cell: ({ row }) => <span className='text-muted-foreground'>{row.original.plan}</span>,
    filterFn: 'arrIncludesSome',
    meta: { label: 'Plan' }
  },
  {
    accessorKey: 'billing',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Billing' />,
    cell: ({ row }) => <span className='text-muted-foreground'>{billingLabel[row.original.billing]}</span>,
    meta: { label: 'Billing' }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => <StatusPill tone={statusTone[row.original.status]}>{row.original.status}</StatusPill>,
    filterFn: 'arrIncludesSome',
    meta: { label: 'Status' }
  },
  {
    accessorKey: 'joinedDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Joined' />,
    cell: ({ row }) => (
      <span className='text-muted-foreground tabular-nums'>
        {format(new Date(row.original.joinedDate), 'd MMM yyyy')}
      </span>
    ),
    meta: { label: 'Joined' }
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserRowActions user={row.original} {...handlers} />,
    meta: { className: 'w-12 text-end' }
  }
]
