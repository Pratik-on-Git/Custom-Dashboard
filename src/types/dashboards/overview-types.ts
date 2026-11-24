export type KpiId =
  | 'revenue'
  | 'subscriptions'
  | 'sales'
  | 'active-now'
  | 'clicks'
  | 'visitors'
  | 'bounce-rate'
  | 'session'

export type Kpi = {
  id: KpiId
  label: string

  /** Pre-formatted headline value, e.g. "$45,231.89" */
  value: string

  /** Signed change in percent vs the comparison period */
  change: number

  /** Comparison period, e.g. "from last month" */
  period: string

  /** A decrease is the good outcome (e.g. bounce rate) */
  invert?: boolean
}

export type MonthlyRevenue = {
  month: string
  revenue: number
  lastYear: number
}

export type RecentSale = {
  id: string
  name: string
  email: string
  amount: number
  avatar?: string
}

export type TrafficPoint = {
  day: string
  clicks: number
  uniques: number
}

export type RankedItem = {
  label: string
  value: number
}

export type OverviewDashboardData = {
  kpis: Kpi[]
  revenueByMonth: MonthlyRevenue[]
  salesThisMonth: number
  recentSales: RecentSale[]
  analyticsKpis: Kpi[]
  traffic: TrafficPoint[]
  referrers: RankedItem[]
  devices: RankedItem[]
}
