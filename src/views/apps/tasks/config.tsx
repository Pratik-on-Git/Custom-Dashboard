// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleIcon,
  CircleOffIcon,
  TimerIcon
} from 'lucide-react'

// Type Imports
import type { Task, TaskLabel, TaskPriority, TaskStatus } from '@/types/apps/task-types'
import type { FacetOption } from '@/components/global/data-table/faceted-filter'
import type { UrlColumnFilter } from '@/hooks/use-data-table'

// Util Imports
import type { Tone } from '@/components/global/variants/tone'

type Meta = { label: string; icon: ReactNode; tone: Tone }

/**
 * Colour follows the app scheme: hues only where they mean something — in progress (info), done (success),
 * high (warning) and critical (danger). Everything else stays neutral.
 */
export const statusMeta: Record<TaskStatus, Meta> = {
  backlog: { label: 'Backlog', icon: <CircleDashedIcon />, tone: 'neutral' },
  todo: { label: 'Todo', icon: <CircleIcon />, tone: 'neutral' },
  'in-progress': { label: 'In progress', icon: <TimerIcon />, tone: 'info' },
  done: { label: 'Done', icon: <CircleCheckIcon />, tone: 'success' },
  canceled: { label: 'Canceled', icon: <CircleOffIcon />, tone: 'neutral' }
}

export const priorityMeta: Record<TaskPriority, Meta> = {
  low: { label: 'Low', icon: <ArrowDownIcon />, tone: 'neutral' },
  medium: { label: 'Medium', icon: <ArrowRightIcon />, tone: 'neutral' },
  high: { label: 'High', icon: <ArrowUpIcon />, tone: 'warning' },
  critical: { label: 'Critical', icon: <CircleAlertIcon />, tone: 'danger' }
}

export const labelMeta: Record<TaskLabel, { label: string }> = {
  bug: { label: 'Bug' },
  feature: { label: 'Feature' },
  documentation: { label: 'Docs' }
}

const toOptions = <TKey extends string>(meta: Record<TKey, { label: string; icon?: ReactNode }>): FacetOption[] =>
  (Object.keys(meta) as TKey[]).map(value => ({ value, label: meta[value].label, icon: meta[value].icon }))

export const statusOptions = toOptions(statusMeta)
export const priorityOptions = toOptions(priorityMeta)
export const labelOptions = toOptions(labelMeta)

/** Toolbar filters kept in the URL (`?status=todo,done&priority=high`). Module-level so it stays stable. */
export const taskUrlFilters: UrlColumnFilter[] = [
  { columnId: 'status', type: 'array' },
  { columnId: 'priority', type: 'array' }
]

/** Global search: matches the task id or title. */
export const matchesTaskSearch = (task: Task, query: string) => {
  const needle = query.trim().toLowerCase()

  return task.id.toLowerCase().includes(needle) || task.title.toLowerCase().includes(needle)
}
