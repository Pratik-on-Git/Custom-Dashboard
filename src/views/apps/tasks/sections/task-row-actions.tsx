'use client'

// Third-party Imports
import { CopyIcon, EllipsisIcon, PencilIcon, TagIcon, Trash2Icon } from 'lucide-react'

// Type Imports
import type { Task, TaskLabel } from '@/types/apps/task-types'
import type { TaskRowHandlers } from './task-columns'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// Config Imports
import { labelOptions } from '../config'

type TaskRowActionsProps = TaskRowHandlers & { task: Task }

const TaskRowActions = ({ task, onEdit, onDuplicate, onLabelChange, onDelete }: TaskRowActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={<Button variant='ghost' size='icon-sm' aria-label={`Actions for ${task.id}`} className='-me-2' />}
    >
      <EllipsisIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-44'>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => onEdit(task)}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(task)}>
          <CopyIcon />
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <TagIcon />
            Label
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label} onValueChange={value => onLabelChange(task, value as TaskLabel)}>
              {labelOptions.map(option => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant='destructive' onClick={() => onDelete(task)}>
        <Trash2Icon />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default TaskRowActions
