// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

// Type Imports
import type { Task, TaskLabel } from '@/types/apps/task-types'

// Component Imports
import { DataTableColumnHeader } from '@/components/global/data-table/column-header'
import { createSelectColumn } from '@/components/global/data-table/select-column'
import { StatusPill } from '@/components/global/data-display/status-pill'
import { LongText } from '@/components/global/micro/long-text'
import { MetaItem } from '@/components/global/micro/meta-item'
import TaskRowActions from './task-row-actions'

// Config Imports
import { labelMeta, priorityMeta, statusMeta } from '../config'

export type TaskRowHandlers = {
  onEdit: (task: Task) => void
  onDuplicate: (task: Task) => void
  onLabelChange: (task: Task, label: TaskLabel) => void
  onDelete: (task: Task) => void
}

export const getTaskColumns = (handlers: TaskRowHandlers): ColumnDef<Task, any>[] => [
  createSelectColumn<Task>(),
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Task' />,
    cell: ({ row }) => <span className='text-muted-foreground font-mono text-xs'>{row.original.id}</span>,
    meta: { label: 'Task', className: 'w-28' },
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
    cell: ({ row }) => (
      <div className='flex min-w-0 items-center gap-2'>
        <StatusPill variant='outline' size='sm' dot={false}>
          {labelMeta[row.original.label].label}
        </StatusPill>
        <LongText className='font-medium'>{row.original.title}</LongText>
      </div>
    ),
    meta: { label: 'Title', className: 'w-1/2 max-w-0' },
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const meta = statusMeta[row.original.status]

      return (
        <MetaItem icon={meta.icon} tone={meta.tone} emphasis={meta.tone === 'neutral' ? 'default' : 'tone'}>
          {meta.label}
        </MetaItem>
      )
    },
    filterFn: 'arrIncludesSome',
    meta: { label: 'Status' }
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Priority' />,
    cell: ({ row }) => {
      const meta = priorityMeta[row.original.priority]

      return (
        <MetaItem icon={meta.icon} tone={meta.tone} emphasis={meta.tone === 'neutral' ? 'default' : 'tone'}>
          {meta.label}
        </MetaItem>
      )
    },
    filterFn: 'arrIncludesSome',
    meta: { label: 'Priority' }
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Due' />,
    cell: ({ row }) => (
      <span className='text-muted-foreground tabular-nums'>{format(new Date(row.original.dueDate), 'd MMM')}</span>
    ),
    meta: { label: 'Due date' }
  },
  {
    id: 'actions',
    cell: ({ row }) => <TaskRowActions task={row.original} {...handlers} />,
    meta: { className: 'w-12 text-end' }
  }
]
