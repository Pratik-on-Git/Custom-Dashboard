'use client'

// Type Imports
import type { Task } from '@/types/apps/task-types'
import type { TaskRowHandlers } from './task-columns'

// Component Imports
import { DataTable } from '@/components/global/data-table/data-table'
import { DataTablePagination } from '@/components/global/data-table/pagination'
import { DataTableToolbar } from '@/components/global/data-table/toolbar'
import { EmptyState } from '@/components/global/feedback/empty-state'
import TaskBulkActions from './task-bulk-actions'

// Config Imports
import { getTaskColumns } from './task-columns'
import { matchesTaskSearch, priorityOptions, statusOptions, taskUrlFilters } from '../config'

// Hook Imports
import { useDataTable } from '@/hooks/use-data-table'

type TasksTableProps = TaskRowHandlers & {
  tasks: Task[]
  onBulkUpdate: (ids: string[], patch: Partial<Pick<Task, 'status' | 'priority'>>) => void
  onBulkExport: (tasks: Task[]) => void
  onBulkDelete: (ids: string[]) => void
}

const TasksTable = ({ tasks, onBulkUpdate, onBulkExport, onBulkDelete, ...rowHandlers }: TasksTableProps) => {
  // Rebuilt each render so row actions always see the latest handlers (cheap for client-side tables)
  const columns = getTaskColumns(rowHandlers)

  const table = useDataTable({
    data: tasks,
    columns,
    getRowId: task => task.id,
    urlFilters: taskUrlFilters,
    globalFilterFn: (row, _columnId, query) => matchesTaskSearch(row.original, String(query)),
    enableRowSelection: true
  })

  return (
    <section aria-label='Tasks' className='flex flex-col gap-4 max-sm:has-[[role=toolbar]]:pb-16'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter by title or ID…'
        filters={[
          { columnId: 'status', title: 'Status', options: statusOptions },
          { columnId: 'priority', title: 'Priority', options: priorityOptions }
        ]}
      />
      <DataTable
        table={table}
        caption='Tasks'
        emptyState={<EmptyState size='sm' title='No tasks found' description='Try a different search or filter.' />}
      />
      <DataTablePagination table={table} />
      <TaskBulkActions table={table} onUpdate={onBulkUpdate} onExport={onBulkExport} onDelete={onBulkDelete} />
    </section>
  )
}

export default TasksTable
