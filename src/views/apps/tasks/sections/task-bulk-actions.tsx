'use client'

// React Imports
import { useState } from 'react'
import type { ReactNode } from 'react'

// Third-party Imports
import type { Table } from '@tanstack/react-table'
import { ArrowUpDownIcon, CircleArrowUpIcon, DownloadIcon, Trash2Icon } from 'lucide-react'

// Type Imports
import type { Task, TaskPriority, TaskStatus } from '@/types/apps/task-types'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { BulkActionButton, DataTableBulkActions } from '@/components/global/data-table/bulk-actions'
import { ConfirmDialog } from '@/components/global/feedback/confirm-dialog'

// Config Imports
import { priorityOptions, statusOptions } from '../config'

// Util Imports
import { pluralize } from '@/utils/toast-utils'

type TaskBulkActionsProps = {
  table: Table<Task>
  onUpdate: (ids: string[], patch: Partial<Pick<Task, 'status' | 'priority'>>) => void
  onExport: (tasks: Task[]) => void
  onDelete: (ids: string[]) => void
}

type MenuActionProps = {
  label: string
  icon: ReactNode
  options: { value: string; label: string; icon?: ReactNode }[]
  onSelect: (value: string) => void
}

/** Bulk-toolbar button that opens a menu of values (status / priority). */
const MenuAction = ({ label, icon, options, onSelect }: MenuActionProps) => (
  <DropdownMenu>
    <Tooltip>
      <TooltipTrigger
        render={<DropdownMenuTrigger render={<Button variant='outline' size='icon-sm' aria-label={label} />} />}
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
    <DropdownMenuContent side='top' sideOffset={12}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.map(option => (
          <DropdownMenuItem key={option.value} onClick={() => onSelect(option.value)}>
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
)

const TaskBulkActions = ({ table, onUpdate, onExport, onDelete }: TaskBulkActionsProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const selected = table.getFilteredSelectedRowModel().rows.map(row => row.original)
  const ids = selected.map(task => task.id)

  return (
    <>
      <DataTableBulkActions table={table} entityName='task'>
        <MenuAction
          label='Update status'
          icon={<CircleArrowUpIcon />}
          options={statusOptions}
          onSelect={status => onUpdate(ids, { status: status as TaskStatus })}
        />
        <MenuAction
          label='Update priority'
          icon={<ArrowUpDownIcon />}
          options={priorityOptions}
          onSelect={priority => onUpdate(ids, { priority: priority as TaskPriority })}
        />
        <BulkActionButton label='Export to CSV' icon={<DownloadIcon />} onClick={() => onExport(selected)} />
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
        title={`Delete ${pluralize(ids.length, 'task')}?`}
        description='The selected tasks will be removed permanently.'
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

export default TaskBulkActions
