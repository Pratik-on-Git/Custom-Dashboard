'use client'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Type Imports
import type { Task, TaskFormValues } from '@/types/apps/task-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { SelectField } from '@/components/global/inputs/select-field'

// Config Imports
import { labelOptions, priorityOptions, statusOptions } from '../config'

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  status: z.enum(['backlog', 'todo', 'in-progress', 'done', 'canceled'], {
    errorMap: () => ({ message: 'Please select a status.' })
  }),
  label: z.enum(['bug', 'feature', 'documentation'], { errorMap: () => ({ message: 'Please select a label.' }) }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    errorMap: () => ({ message: 'Please choose a priority.' })
  })
})

type TaskSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void

  /** Task to edit; omit to create */
  task?: Task | null
  onSubmit: (values: TaskFormValues) => void
}

const emptyTask = { title: '', status: undefined, label: undefined, priority: undefined }

/** Create / update a task in a side sheet. Re-mount with a new `key` to load another task. */
const TaskSheet = ({ open, onOpenChange, task, onSubmit }: TaskSheetProps) => {
  const isEdit = Boolean(task)

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: task ?? (emptyTask as unknown as TaskFormValues)
  })

  return (
    <Sheet
      open={open}
      onOpenChange={next => {
        if (!next) form.reset()
        onOpenChange(next)
      }}
    >
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{isEdit ? `Edit ${task?.id}` : 'Create task'}</SheetTitle>
          <SheetDescription>
            {isEdit ? 'Update the task details.' : 'Add a new task to the backlog.'} Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <form
          id='task-form'
          onSubmit={form.handleSubmit(values => onSubmit(values))}
          className='flex-1 overflow-y-auto px-4'
        >
          <FieldGroup className='gap-6'>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='task-title'>Title</FieldLabel>
                  <Input {...field} id='task-title' placeholder='Enter a title' aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='status'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='task-status'>Status</FieldLabel>
                  <SelectField
                    id='task-status'
                    placeholder='Select a status'
                    options={statusOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {(['label', 'priority'] as const).map(name => (
              <Controller
                key={name}
                name={name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet data-invalid={fieldState.invalid} className='gap-3'>
                    <FieldLegend variant='label' className='mb-0 capitalize'>
                      {name}
                    </FieldLegend>
                    <RadioGroup value={field.value ?? ''} onValueChange={field.onChange} className='gap-2.5'>
                      {(name === 'label' ? labelOptions : priorityOptions).map(option => (
                        <Field key={option.value} orientation='horizontal' className='gap-2'>
                          <RadioGroupItem value={option.value} id={`task-${name}-${option.value}`} />
                          <FieldLabel htmlFor={`task-${name}-${option.value}`} className='font-normal'>
                            {option.label}
                          </FieldLabel>
                        </Field>
                      ))}
                    </RadioGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
                )}
              />
            ))}
          </FieldGroup>
        </form>

        <SheetFooter className='flex-row justify-end'>
          <SheetClose render={<Button variant='outline' />}>Cancel</SheetClose>
          <Button type='submit' form='task-form'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default TaskSheet
