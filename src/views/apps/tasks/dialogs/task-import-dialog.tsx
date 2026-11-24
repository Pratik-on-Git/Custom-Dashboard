'use client'

// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'

// Third-party Imports
import { UploadIcon } from 'lucide-react'

// Type Imports
import type { TaskFormValues } from '@/types/apps/task-types'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

// Config Imports
import { labelMeta, priorityMeta, statusMeta } from '../config'

// Util Imports
import { parseCsv } from '@/utils/csv-utils'

type TaskImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void

  /** Receives the valid rows and how many were skipped */
  onImport: (rows: TaskFormValues[], skipped: number) => void
}

const isKeyOf = <TMeta extends object>(meta: TMeta, value: string): value is Extract<keyof TMeta, string> =>
  value in meta

/** Imports tasks from a CSV with `title,status,label,priority` columns; invalid rows are skipped. */
const TaskImportDialog = ({ open, onOpenChange, onImport }: TaskImportDialogProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const close = (next: boolean) => {
    if (!next) {
      setFile(null)
      setError(null)
    }

    onOpenChange(next)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!file) return setError('Please choose a file.')
    if (!file.name.toLowerCase().endsWith('.csv')) return setError('Please upload a .csv file.')

    const rows = parseCsv(await file.text())

    const valid = rows.flatMap<TaskFormValues>(row =>
      row.title &&
      isKeyOf(statusMeta, row.status) &&
      isKeyOf(labelMeta, row.label) &&
      isKeyOf(priorityMeta, row.priority)
        ? [{ title: row.title, status: row.status, label: row.label, priority: row.priority }]
        : []
    )

    if (!valid.length) return setError('No valid rows found. Expected columns: title, status, label, priority.')
    onImport(valid, rows.length - valid.length)
    close(false)
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Import tasks</DialogTitle>
          <DialogDescription>Add tasks in bulk from a CSV file.</DialogDescription>
        </DialogHeader>
        <form id='task-import-form' onSubmit={handleSubmit}>
          <Field data-invalid={Boolean(error)} className='gap-2'>
            <FieldLabel htmlFor='task-import-file'>CSV file</FieldLabel>
            <Input
              id='task-import-file'
              type='file'
              accept='.csv,text/csv'
              aria-invalid={Boolean(error)}
              onChange={event => {
                setFile(event.target.files?.[0] ?? null)
                setError(null)
              }}
            />
            <FieldDescription>
              Columns: <span className='font-mono text-xs'>title, status, label, priority</span>
            </FieldDescription>
            {error && <FieldError>{error}</FieldError>}
          </Field>
        </form>
        <DialogFooter>
          <DialogClose render={<Button variant='outline' />}>Cancel</DialogClose>
          <Button type='submit' form='task-import-form'>
            <UploadIcon data-icon='inline-start' />
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TaskImportDialog
