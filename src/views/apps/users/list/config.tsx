// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { BrushIcon, CrownIcon, PencilLineIcon, PencilRulerIcon, ShieldIcon } from 'lucide-react'

// Type Imports
import type { AppUser, UserBilling, UserPlan, UserRole, UserStatus } from '@/types/apps/user-types'
import type { FacetOption } from '@/components/global/data-table/faceted-filter'
import type { UrlColumnFilter } from '@/hooks/use-data-table'

// Util Imports
import type { Tone } from '@/components/global/variants/tone'

export const routes = {
  view: '/apps/users/view'
} as const

/** Roles are told apart by icon + label, not colour (app scheme: no per-entity hues). */
export const roleMeta: Record<UserRole, { icon: ReactNode }> = {
  Admin: { icon: <ShieldIcon /> },
  Editor: { icon: <BrushIcon /> },
  Subscriber: { icon: <CrownIcon /> },
  Maintainer: { icon: <PencilRulerIcon /> },
  Guest: { icon: <PencilLineIcon /> }
}

/** Status hues carry meaning: active = good, pending = needs attention, suspended = problem. */
export const statusTone: Record<UserStatus, Tone> = {
  Active: 'success',
  Pending: 'warning',
  Suspended: 'danger',
  Inactive: 'neutral'
}

export const billingLabel: Record<UserBilling, string> = {
  'Auto Debit': 'Auto debit',
  'Credit Card': 'Credit card',
  Manual: 'Manual · PayPal'
}

const roles = Object.keys(roleMeta) as UserRole[]
const plans: UserPlan[] = ['Basic', 'Team', 'Enterprise']
const statuses = Object.keys(statusTone) as UserStatus[]

export const roleOptions: FacetOption[] = roles.map(role => ({ value: role, label: role, icon: roleMeta[role].icon }))
export const planOptions: FacetOption[] = plans.map(plan => ({ value: plan, label: plan }))
export const statusOptions: FacetOption[] = statuses.map(status => ({ value: status, label: status }))

/** Toolbar filters kept in the URL. Module-level so it stays stable. */
export const userUrlFilters: UrlColumnFilter[] = [
  { columnId: 'role', type: 'array' },
  { columnId: 'plan', type: 'array' },
  { columnId: 'status', type: 'array' }
]

/** Global search: name, email or company. */
export const matchesUserSearch = (user: AppUser, query: string) => {
  const needle = query.trim().toLowerCase()

  return [user.name, user.email, user.company ?? ''].some(value => value.toLowerCase().includes(needle))
}

export const exportColumns = ['id', 'name', 'email', 'role', 'plan', 'status', 'billing', 'joinedDate'] as const
