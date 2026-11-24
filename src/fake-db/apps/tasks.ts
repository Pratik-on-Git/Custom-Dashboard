// Type Imports
import type { Task, TaskLabel, TaskPriority, TaskStatus } from '@/types/apps/task-types'

/** Small seeded PRNG so the mock list is identical on server and client renders. */
const createRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)

  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t

  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const random = createRandom(12345)
const pick = <T>(items: readonly T[]) => items[Math.floor(random() * items.length)]

const actions = ['Fix', 'Add', 'Refactor', 'Document', 'Improve', 'Investigate', 'Remove', 'Update', 'Test', 'Design']

const subjects = [
  'pagination reset when filters change',
  'dark-mode contrast on status badges',
  'CSV export for the orders table',
  'keyboard navigation in the command menu',
  'sidebar collapse state persistence',
  'date picker month dropdown',
  'empty state on the integrations page',
  'password strength rules on sign up',
  'chart tooltip rounding',
  'bulk delete confirmation',
  'RTL spacing in the settings form',
  'user invite email template',
  'search debounce on the users list',
  'webhook retry policy',
  'two-factor setup flow',
  'avatar fallback initials',
  'API rate-limit error toast',
  'column visibility menu labels',
  'timezone handling for due dates',
  'notification preferences sync'
] as const

const statuses: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'done', 'canceled']
const labels: TaskLabel[] = ['bug', 'feature', 'documentation']
const priorities: TaskPriority[] = ['low', 'medium', 'high', 'critical']
const people = ['Olivia Martin', 'Jackson Lee', 'Isabella Nguyen', 'William Kim', 'Sofia Davis', 'Liam Patel']

const usedIds = new Set<string>()

const nextId = () => {
  let id = ''

  do id = `TASK-${1000 + Math.floor(random() * 9000)}`
  while (usedIds.has(id))
  usedIds.add(id)

  return id
}

export const tasks: Task[] = Array.from({ length: 100 }, (_, index) => {
  const due = new Date(Date.UTC(2026, 10, 1 + Math.floor(random() * 60)))

  return {
    id: nextId(),
    title: `${pick(actions)} ${subjects[index % subjects.length]}`,
    status: pick(statuses),
    label: pick(labels),
    priority: pick(priorities),
    assignee: pick(people),
    dueDate: due.toISOString().slice(0, 10)
  }
})
