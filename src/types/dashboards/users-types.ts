export type CropPhase = 'plant' | 'establish' | 'flower' | 'pick'

export interface HouseClimate {
  temperature: number
  humidity: number
  co2: number
  lightsOn: boolean

  /** Last 24 h of temperature readings, oldest first */
  trend: number[]
}

export interface HouseHarvest {
  pickedKg: number
  targetKg: number
  crews: string[]
}

export interface House {
  id: string
  no: number
  name: string
  crop: string
  variety: string
  phase: CropPhase
  climate: HouseClimate

  /** Present while the house is picking */
  harvest?: HouseHarvest

  /** Shown instead of harvest progress, e.g. "First pick in 5 days" */
  nextMilestone?: string
}

export interface SeasonWeek {
  week: string

  /** Tonnes picked this season */
  current: number

  /** Tonnes picked the same week last season */
  previous: number
}

export interface SeasonSummary {
  toDateTonnes: number
  changePercent: number
  thisWeekKg: number
  daysElapsed: number

  /** Growing area, used for the per-m² view */
  areaM2: number
  weeks: SeasonWeek[]
}

export interface FloorToday {
  pickersOnShift: number
  shiftStart: string
  plannedKg: number
  byHouse: { houseId: string; kg: number }[]
  class1Percent: number
  punnets: number

  /** kg per 5-minute interval over the last hour, oldest first */
  lastHourKg: number[]
}

export interface CropCyclePhase {
  phase: CropPhase
  days: number

  /** e.g. "Sat 26 Sept – Fri 1 Jan" */
  range: string
}

export interface CropCycle {
  houseId: string
  phases: CropCyclePhase[]
  elapsedDays: number
  startLabel: string
  endLabel: string
  statusLabel: string
}

export interface TrapCount {
  pest: string
  count: number
  limit: number
}

export interface HouseTraps {
  houseId: string
  counts: TrapCount[]
}

export const ORDER_STAGES = ['New', 'Picking', 'Packed', 'On the road', 'Delivered'] as const

export type OrderStage = (typeof ORDER_STAGES)[number]

export interface DispatchOrder {
  id: string
  customer: string
  trays: number
  value: number
  stage: OrderStage
}

export interface FarmTask {
  id: string
  title: string
  houseId?: string
  due: string
  assignee: { name: string; initials: string }
  done: boolean
}

export type ActivityKind = 'harvest' | 'climate' | 'dispatch' | 'pest' | 'lighting' | 'staff'

export interface FarmActivity {
  id: string
  kind: ActivityKind
  message: string
  time: string
  actor: string
}

export interface FarmOverview {
  greetingName: string
  pickerShortfallInWeeks: number
  season: SeasonSummary
  today: FloorToday
  houses: House[]
  cycles: CropCycle[]
  traps: HouseTraps[]
  orders: DispatchOrder[]
  tasks: FarmTask[]
  activity: FarmActivity[]
}
