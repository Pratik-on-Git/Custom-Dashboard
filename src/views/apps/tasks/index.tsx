'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { PlusIcon, UploadIcon } from 'lucide-react'
import { toast } from 'sonner'

// Type Imports
import type { Task, TaskFormValues } from '@/types/apps/task-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/global/layout/page-header'
import { ConfirmDialog } from '@/components/global/feedback/confirm-dialog'
import TasksTable from './sections/tasks-table'
import TaskSheet from './dialogs/task-sheet'
import TaskImportDialog from './dialogs/task-import-dialog'

// Hook Imports
import { useDialogState } from '@/hooks/use-dialog-state'

// Util Imports
import { downloadCsv, toCsv } from '@/utils/csv-utils'
import { pluralize } from '@/utils/toast-utils'

type TaskDialog = 'create' | 'edit' | 'delete' | 'import'

const nextTaskId = (tasks: Task[]) =>
  `TASK-${Math.max(999, ...tasks.map(task => Number(task.id.replace('TASK-', '')) || 0)) + 1}`

const newTask = (values: TaskFormValues, id: string): Task => ({
  ...values,
  id,
  assignee: 'John Doe',
  dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10)
})

const TasksApp = ({ initialTasks }: { initialTasks: Task[] }) => {
  const [tasks, setTasks] = useState(initialTasks)
  const dialogs = useDialogState<TaskDialog, Task>()

  const patchTasks = (ids: string[], patch: Partial<Task>) =>
    setTasks(current => current.map(task => (ids.includes(task.id) ? { ...task, ...patch } : task)))

  const handleSave = (values: TaskFormValues) => {
    if (dialogs.item && dialogs.is('edit')) {
      patchTasks([dialogs.item.id], values)
      toast.success(`${dialogs.item.id} updated`)
    } else {
      const id = nextTaskId(tasks)

      setTasks(current => [newTask(values, id), ...current])
      toast.success(`${id} created`)
    }

    dialogs.close()
  }

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='Tasks'
        description="Here's a list of your tasks for this month."
        actions={
          <>
            <Button variant='outline' size='lg' onClick={() => dialogs.open('import')}>
              <UploadIcon data-icon='inline-start' />
              Import
            </Button>
            <Button size='lg' onClick={() => dialogs.open('create')}>
              <PlusIcon data-icon='inline-start' />
              Create task
            </Button>
          </>
        }
      />

      <TasksTable
        tasks={tasks}
        onEdit={task => dialogs.open('edit', task)}
        onDelete={task => dialogs.open('delete', task)}
        onDuplicate={task => {
          const id = nextTaskId(tasks)

          setTasks(current => [{ ...task, id, title: `${task.title} (copy)` }, ...current])
          toast.success(`Copied ${task.id} as ${id}`)
        }}
        onLabelChange={(task, label) => patchTasks([task.id], { label })}
        onBulkUpdate={(ids, patch) => {
          patchTasks(ids, patch)
          toast.success(`Updated ${pluralize(ids.length, 'task')}`)
        }}
        onBulkExport={selected => {
          downloadCsv('tasks.csv', toCsv(selected, ['id', 'title', 'status', 'label', 'priority', 'dueDate']))
          toast.success(`Exported ${pluralize(selected.length, 'task')}`)
        }}
        onBulkDelete={ids => {
          setTasks(current => current.filter(task => !ids.includes(task.id)))
          toast.success(`Deleted ${pluralize(ids.length, 'task')}`)
        }}
      />

      <TaskSheet
        key={dialogs.is('edit') ? dialogs.item?.id : 'new'}
        open={dialogs.is('create') || dialogs.is('edit')}
        onOpenChange={open => !open && dialogs.close()}
        task={dialogs.is('edit') ? dialogs.item : null}
        onSubmit={handleSave}
      />

      <TaskImportDialog
        open={dialogs.is('import')}
        onOpenChange={open => !open && dialogs.close()}
        onImport={(rows, skipped) => {
          let id = Number(nextTaskId(tasks).replace('TASK-', ''))

          setTasks(current => [...rows.map(row => newTask(row, `TASK-${id++}`)), ...current])
          toast.success(`Imported ${pluralize(rows.length, 'task')}`, {
            description: skipped ? `${pluralize(skipped, 'row')} skipped (invalid values).` : undefined
          })
        }}
      />

      <ConfirmDialog
        open={dialogs.is('delete')}
        onOpenChange={open => !open && dialogs.close()}
        variant='destructive'
        title={`Delete ${dialogs.item?.id}?`}
        description={
          <>
            <span className='text-foreground font-medium'>{dialogs.item?.title}</span> will be removed permanently.
          </>
        }
        confirmLabel='Delete'
        onConfirm={() => {
          if (dialogs.item) {
            const { id } = dialogs.item

            setTasks(current => current.filter(task => task.id !== id))
            toast.success(`${id} deleted`)
          }

          dialogs.close()
        }}
      />
    </div>
  )
}

export default TasksApp
