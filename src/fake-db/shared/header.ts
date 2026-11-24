// Type Imports
import type { ActivityEvent, AppNotification } from '@/types/shared/header-types'

/** Header bell menu. */
export const notifications: AppNotification[] = [
  {
    id: 'ntf-1',
    kind: 'mention',
    title: 'Olivia Martin mentioned you',
    description: '“@John can you review the pricing copy before Friday?”',
    createdAt: '2026-11-24T09:42:00',
    unread: true
  },
  {
    id: 'ntf-2',
    kind: 'invite',
    title: 'Jackson Lee joined Acme Inc',
    description: 'Accepted your invitation as Editor.',
    createdAt: '2026-11-24T08:15:00',
    unread: true
  },
  {
    id: 'ntf-3',
    kind: 'task',
    title: 'TASK-4721 is due tomorrow',
    description: 'Fix pagination reset when filters change.',
    createdAt: '2026-11-23T17:30:00',
    unread: true
  },
  {
    id: 'ntf-4',
    kind: 'billing',
    title: 'Invoice #1043 paid',
    description: '$249.00 charged to Visa •••• 4242.',
    createdAt: '2026-11-22T11:05:00',
    unread: false
  },
  {
    id: 'ntf-5',
    kind: 'security',
    title: 'New sign-in from Chrome on Windows',
    description: 'London, UK — if this wasn’t you, reset your password.',
    createdAt: '2026-11-21T20:48:00',
    unread: false
  }
]

/** Header activity sheet: what happened across the workspace recently. */
export const activity: ActivityEvent[] = [
  {
    id: 'act-1',
    kind: 'deploy',
    title: 'Production deploy succeeded',
    description: 'v2.4.1 · 3 commits by Matt Green',
    createdAt: '2026-11-24T10:05:00'
  },
  {
    id: 'act-2',
    kind: 'comment',
    title: 'Sofia Davis commented on “Q4 roadmap”',
    description: 'Let’s move the export work into week 2.',
    createdAt: '2026-11-24T09:12:00'
  },
  {
    id: 'act-3',
    kind: 'task',
    title: 'Isabella Nguyen completed 4 tasks',
    description: 'Including TASK-3760 and TASK-9971.',
    createdAt: '2026-11-24T08:40:00'
  },
  {
    id: 'act-4',
    kind: 'integration',
    title: 'Figma connected',
    description: 'Designs now sync to the Projects board.',
    createdAt: '2026-11-23T16:22:00'
  },
  {
    id: 'act-5',
    kind: 'user',
    title: '2 users invited',
    description: 'William Kim invited jane@acme.com and leo@acme.com.',
    createdAt: '2026-11-23T14:03:00'
  }
]
