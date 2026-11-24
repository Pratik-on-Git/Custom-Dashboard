// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { formatDistanceToNowStrict } from 'date-fns'
import {
  AtSignIcon,
  CircleCheckIcon,
  CreditCardIcon,
  MessageSquareIcon,
  PlugIcon,
  RocketIcon,
  ShieldAlertIcon,
  UserPlusIcon
} from 'lucide-react'

// Type Imports
import type { ActivityKind, NotificationKind } from '@/types/shared/header-types'
import type { Tone } from '@/components/global/variants/tone'

type KindMeta = { icon: ReactNode; tone: Tone; variant: 'soft' | 'muted' }

/** Hue only where it means something: security = warning, finished work = success; the rest stay quiet. */
export const notificationMeta: Record<NotificationKind, KindMeta> = {
  mention: { icon: <AtSignIcon />, tone: 'primary', variant: 'soft' },
  invite: { icon: <UserPlusIcon />, tone: 'neutral', variant: 'muted' },
  task: { icon: <CircleCheckIcon />, tone: 'primary', variant: 'soft' },
  billing: { icon: <CreditCardIcon />, tone: 'neutral', variant: 'muted' },
  security: { icon: <ShieldAlertIcon />, tone: 'warning', variant: 'soft' }
}

export const activityMeta: Record<ActivityKind, KindMeta> = {
  deploy: { icon: <RocketIcon />, tone: 'success', variant: 'soft' },
  comment: { icon: <MessageSquareIcon />, tone: 'neutral', variant: 'muted' },
  task: { icon: <CircleCheckIcon />, tone: 'primary', variant: 'soft' },
  integration: { icon: <PlugIcon />, tone: 'neutral', variant: 'muted' },
  user: { icon: <UserPlusIcon />, tone: 'neutral', variant: 'muted' }
}

/** "5 min ago" — only call on the client (menus / sheets render after interaction). */
export const timeAgo = (iso: string) => `${formatDistanceToNowStrict(new Date(iso))} ago`
