export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done' | 'canceled'

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type TaskLabel = 'bug' | 'feature' | 'documentation'

/** `id` is the human id, e.g. "TASK-8782" */
export type Task = {
  id: string
  title: string
  status: TaskStatus
  label: TaskLabel
  priority: TaskPriority
  assignee: string

  /** ISO date */
  dueDate: string
}

export type TaskFormValues = Pick<Task, 'title' | 'status' | 'label' | 'priority'>
