// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import {
  ActivityIcon,
  ArrowDownUpIcon,
  ClockIcon,
  CreditCardIcon,
  DollarSignIcon,
  MousePointerClickIcon,
  UserRoundIcon,
  UsersIcon
} from 'lucide-react'

// Type Imports
import type { KpiId } from '@/types/dashboards/overview-types'

// Util Imports
import { formatCurrency, formatNumber } from '@/utils/format-utils'

export const kpiIcons: Record<KpiId, ReactNode> = {
  revenue: <DollarSignIcon />,
  subscriptions: <UsersIcon />,
  sales: <CreditCardIcon />,
  'active-now': <ActivityIcon />,
  clicks: <MousePointerClickIcon />,
  visitors: <UserRoundIcon />,
  'bounce-rate': <ArrowDownUpIcon />,
  session: <ClockIcon />
}

export const formatUsd = (value: number) => formatCurrency(value, 'USD', 'en-US')

/** Compact y-axis tick for revenue: 4200 → "$4.2k" */
export const formatUsdAxis = (value: number) => (value >= 1000 ? `$${formatNumber(value / 1000, 1)}k` : `$${value}`)

export const formatCount = (value: number) => formatNumber(value)

export const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports', disabled: true },
  { value: 'notifications', label: 'Notifications', disabled: true }
] as const
