'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { MailPlusIcon, UserPlusIcon } from 'lucide-react'
import { toast } from 'sonner'

// Type Imports
import type { AppUser, UserFormData } from '@/types/apps/user-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/global/layout/page-header'
import { ConfirmDialog } from '@/components/global/feedback/confirm-dialog'
import { AddEditUserSheet } from '@/views/apps/users/dialogs/add-edit-user-sheet'
import InviteUserDialog from '@/views/apps/users/dialogs/invite-user-dialog'
import UsersTable from './sections/users-table'

// Config Imports
import { exportColumns } from './config'

// Hook Imports
import { useDialogState } from '@/hooks/use-dialog-state'

// Util Imports
import { downloadCsv, toCsv } from '@/utils/csv-utils'
import { pluralize } from '@/utils/toast-utils'

type UserDialog = 'add' | 'edit' | 'invite' | 'delete'

const UserListApp = ({ initialUsers }: { initialUsers: AppUser[] }) => {
  const [users, setUsers] = useState(initialUsers)
  const dialogs = useDialogState<UserDialog, AppUser>()

  const patchUsers = (ids: string[], patch: Partial<AppUser>) =>
    setUsers(current => current.map(user => (ids.includes(user.id) ? { ...user, ...patch } : user)))

  const handleExport = (rows: AppUser[], format: 'csv' | 'json') => {
    if (format === 'csv') downloadCsv('users.csv', toCsv(rows, [...exportColumns]))
    else {
      const url = URL.createObjectURL(new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' }))

      Object.assign(document.createElement('a'), { href: url, download: 'users.json' }).click()
      URL.revokeObjectURL(url)
    }

    toast.success(`Exported ${pluralize(rows.length, 'user')} as ${format.toUpperCase()}`)
  }

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='Users'
        description='Manage your users, their roles and access.'
        actions={
          <>
            <Button variant='outline' size='lg' onClick={() => dialogs.open('invite')}>
              <MailPlusIcon data-icon='inline-start' />
              Invite user
            </Button>
            <Button size='lg' onClick={() => dialogs.open('add')}>
              <UserPlusIcon data-icon='inline-start' />
              Add user
            </Button>
          </>
        }
      />

      <UsersTable
        users={users}
        onEdit={user => dialogs.open('edit', user)}
        onDelete={user => dialogs.open('delete', user)}
        onStatusChange={(user, status) => {
          patchUsers([user.id], { status })
          toast.success(`${user.name} is now ${status.toLowerCase()}`)
        }}
        onExport={handleExport}
        onBulkInvite={selected => toast.success(`Invitation sent to ${pluralize(selected.length, 'user')}`)}
        onBulkStatusChange={(ids, status) => {
          patchUsers(ids, { status })
          toast.success(`${status === 'Active' ? 'Activated' : 'Deactivated'} ${pluralize(ids.length, 'user')}`)
        }}
        onBulkDelete={ids => {
          setUsers(current => current.filter(user => !ids.includes(user.id)))
          toast.success(`Deleted ${pluralize(ids.length, 'user')}`)
        }}
      />

      <AddEditUserSheet
        mode={dialogs.is('add') ? 'add' : dialogs.is('edit') ? 'edit' : null}
        user={dialogs.is('edit') ? dialogs.item : null}
        onClose={dialogs.close}
        onAdd={(data: UserFormData) => {
          const user: AppUser = {
            ...data,
            id: `user-${Date.now()}`,
            billing: 'Manual',
            joinedDate: new Date().toISOString()
          }

          setUsers(current => [user, ...current])
          toast.success(`${data.name} added`)
          dialogs.close()
        }}
        onEdit={(id, data) => {
          patchUsers([id], data)
          toast.success('User updated')
          dialogs.close()
        }}
      />

      <InviteUserDialog
        open={dialogs.is('invite')}
        onOpenChange={open => !open && dialogs.close()}
        onInvite={values => {
          toast.success(`Invitation sent to ${values.email}`, { description: `Role: ${values.role}` })
          dialogs.close()
        }}
      />

      <ConfirmDialog
        open={dialogs.is('delete')}
        onOpenChange={open => !open && dialogs.close()}
        variant='destructive'
        title='Delete user?'
        description={
          <>
            This permanently removes <span className='text-foreground font-medium'>{dialogs.item?.name}</span> (
            {dialogs.item?.role}) and their access.
          </>
        }
        confirmText={dialogs.item?.email}
        confirmLabel='Delete user'
        onConfirm={() => {
          if (dialogs.item) {
            const { id, name } = dialogs.item

            setUsers(current => current.filter(user => user.id !== id))
            toast.success(`${name} deleted`)
          }

          dialogs.close()
        }}
      />
    </div>
  )
}

export default UserListApp
