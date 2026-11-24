export type NotificationKind = 'mention' | 'invite' | 'billing' | 'security' | 'task'

export type AppNotification = {
  id: string
  kind: NotificationKind
  title: string
  description: string

  /** ISO date-time */
  createdAt: string
  unread: boolean
}

export type ActivityKind = 'deploy' | 'comment' | 'task' | 'user' | 'integration'

export type ActivityEvent = {
  id: string
  kind: ActivityKind
  title: string
  description: string

  /** ISO date-time */
  createdAt: string
}
