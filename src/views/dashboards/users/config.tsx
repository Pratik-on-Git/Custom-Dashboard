// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import {
  BoxIcon,
  BugIcon,
  Flower2Icon,
  LeafIcon,
  ShoppingBasketIcon,
  SproutIcon,
  SunIcon,
  UsersIcon,
  WindIcon
} from 'lucide-react'

// Type Imports
import type { ActivityKind, CropPhase, OrderStage } from '@/types/dashboards/users-types'

// Util Imports
import type { Tone } from '@/components/global/variants/tone'

/** Feature config: maps domain values to UI (tone, icon, copy). Data stays UI-free in fake-db. */

export const routes = {
  plan: '/apps/calendar',
  orders: '/dashboard/orders',
  tasks: '/apps/calendar'
} as const

/** Link for a single order — point this at the order detail route once it exists. */
export const orderHref = (orderId: string) => `${routes.orders}?order=${encodeURIComponent(orderId)}`

/**
 * Colour follows the app scheme: status hues only where they carry meaning
 * (picking = producing → success, flowering = about to produce → info); growing phases stay neutral.
 */
export const phaseMeta: Record<CropPhase, { label: string; longLabel: string; tone: Tone; icon: ReactNode }> = {
  plant: { label: 'Plant', longLabel: 'Planting', tone: 'neutral', icon: <SproutIcon /> },
  establish: { label: 'Establish', longLabel: 'Establishing', tone: 'neutral', icon: <LeafIcon /> },
  flower: { label: 'Flower', longLabel: 'Flowering & fruit set', tone: 'info', icon: <Flower2Icon /> },
  pick: { label: 'Pick', longLabel: 'Picking', tone: 'success', icon: <ShoppingBasketIcon /> }
}

export const activityMeta: Record<ActivityKind, { tone: Tone; variant: 'soft' | 'muted'; icon: ReactNode }> = {
  harvest: { tone: 'success', variant: 'soft', icon: <ShoppingBasketIcon /> },
  climate: { tone: 'neutral', variant: 'muted', icon: <WindIcon /> },
  dispatch: { tone: 'primary', variant: 'soft', icon: <BoxIcon /> },
  pest: { tone: 'warning', variant: 'soft', icon: <BugIcon /> },
  lighting: { tone: 'neutral', variant: 'muted', icon: <SunIcon /> },
  staff: { tone: 'neutral', variant: 'muted', icon: <UsersIcon /> }
}

/** Button label that moves an order to its next stage; `null` when finished. */
export const orderNextAction: Record<OrderStage, string | null> = {
  New: 'Start',
  Picking: 'Packed',
  Packed: 'Dispatch',
  'On the road': 'Delivered',
  Delivered: null
}

/** Trap bars are scaled so the limit tick always sits at the same spot. */
export const TRAP_SCALE = 1.6
