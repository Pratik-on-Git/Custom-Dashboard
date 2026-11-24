'use client'

// Third-party Imports
import { DownloadIcon, FileJsonIcon, FileTextIcon } from 'lucide-react'

// Type Imports
import type { AppUser, UserStatus } from '@/types/apps/user-types'
import type { UserRowHandlers } from './user-columns'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/global/data-table/data-table'
import { DataTablePagination } from '@/components/global/data-table/pagination'
import { DataTableToolbar } from '@/components/global/data-table/toolbar'
import { EmptyState } from '@/components/global/feedback/empty-state'
import { getUserColumns } from './user-columns'
import UserBulkActions from './user-bulk-actions'

// Config Imports
import { matchesUserSearch, planOptions, roleOptions, statusOptions, userUrlFilters } from '../config'

// Hook Imports
import { useDataTable } from '@/hooks/use-data-table'

type UsersTableProps = UserRowHandlers & {
  users: AppUser[]
  onExport: (users: AppUser[], format: 'csv' | 'json') => void
  onBulkInvite: (users: AppUser[]) => void
  onBulkStatusChange: (ids: string[], status: UserStatus) => void
  onBulkDelete: (ids: string[]) => void
}

const UsersTable = ({
  users,
  onExport,
  onBulkInvite,
  onBulkStatusChange,
  onBulkDelete,
  ...rowHandlers
}: UsersTableProps) => {
  const table = useDataTable({
    data: users,
    columns: getUserColumns(rowHandlers),
    getRowId: user => user.id,
    urlFilters: userUrlFilters,
    globalFilterFn: (row, _columnId, query) => matchesUserSearch(row.original, String(query)),
    enableRowSelection: true,
    initialColumnVisibility: { billing: false }
  })

  const filteredUsers = () => table.getFilteredRowModel().rows.map(row => row.original)

  return (
    <section aria-label='Users' className='flex flex-col gap-4 max-sm:has-[[role=toolbar]]:pb-16'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Search name, email or company…'
        filters={[
          { columnId: 'role', title: 'Role', options: roleOptions },
          { columnId: 'plan', title: 'Plan', options: planOptions },
          { columnId: 'status', title: 'Status', options: statusOptions }
        ]}
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' size='sm' />}>
              <DownloadIcon data-icon='inline-start' />
              Export
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onExport(filteredUsers(), 'csv')}>
                  <FileTextIcon />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport(filteredUsers(), 'json')}>
                  <FileJsonIcon />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      <DataTable
        table={table}
        caption='Users'
        emptyState={<EmptyState size='sm' title='No users found' description='Try a different search or filter.' />}
      />
      <DataTablePagination table={table} />
      <UserBulkActions
        table={table}
        onInvite={onBulkInvite}
        onStatusChange={onBulkStatusChange}
        onDelete={onBulkDelete}
      />
    </section>
  )
}

export default UsersTable
