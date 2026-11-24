'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import type { Table } from '@tanstack/react-table'
import { MailIcon, Trash2Icon, UserCheckIcon, UserXIcon } from 'lucide-react'

// Type Imports
import type { AppUser, UserStatus } from '@/types/apps/user-types'

// Component Imports
import { BulkActionButton, DataTableBulkActions } from '@/components/global/data-table/bulk-actions'
import { ConfirmDialog } from '@/components/global/feedback/confirm-dialog'

// Util Imports
import { pluralize } from '@/utils/toast-utils'

type UserBulkActionsProps = {
  table: Table<AppUser>
  onInvite: (users: AppUser[]) => void
  onStatusChange: (ids: string[], status: UserStatus) => void
  onDelete: (ids: string[]) => void
}

const UserBulkActions = ({ table, onInvite, onStatusChange, onDelete }: UserBulkActionsProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const selected = table.getFilteredSelectedRowModel().rows.map(row => row.original)
  const ids = selected.map(user => user.id)

  return (
    <>
      <DataTableBulkActions table={table} entityName='user'>
        <BulkActionButton label='Send invite' icon={<MailIcon />} onClick={() => onInvite(selected)} />
        <BulkActionButton label='Activate' icon={<UserCheckIcon />} onClick={() => onStatusChange(ids, 'Active')} />
        <BulkActionButton label='Deactivate' icon={<UserXIcon />} onClick={() => onStatusChange(ids, 'Inactive')} />
        <BulkActionButton
          label='Delete selected'
          icon={<Trash2Icon />}
          variant='destructive'
          onClick={() => setIsDeleteOpen(true)}
        />
      </DataTableBulkActions>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        variant='destructive'
        title={`Delete ${pluralize(ids.length, 'user')}?`}
        description='Their accounts and access will be removed permanently.'
        confirmText='DELETE'
        confirmLabel='Delete'
        onConfirm={() => {
          onDelete(ids)
          setIsDeleteOpen(false)
        }}
      />
    </>
  )
}

export default UserBulkActions
