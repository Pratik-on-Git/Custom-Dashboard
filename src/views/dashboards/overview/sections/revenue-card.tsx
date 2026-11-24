'use client'

// Type Imports
import type { MonthlyRevenue } from '@/types/dashboards/overview-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { AreaTrendChart } from '@/components/global/charts/area-trend-chart'

// Config Imports
import { formatUsd, formatUsdAxis } from '../config'

const RevenueCard = ({ data, className }: { data: MonthlyRevenue[]; className?: string }) => (
  <SectionCard
    title='Revenue'
    description='Monthly revenue this year, against last year'
    headingId='revenue-heading'
    className={className}
  >
    <AreaTrendChart
      data={data}
      xKey='month'
      caption='US dollars per month'
      series={[
        { key: 'revenue', label: 'This year', tone: 'primary', variant: 'bar' },
        { key: 'lastYear', label: 'Last year', tone: 'primary-60', variant: 'dashed' }
      ]}
      valueFormatter={formatUsd}
      axisFormatter={formatUsdAxis}
      highlightLatest={false}
      ariaLabel='Monthly revenue this year compared with last year'
      className='h-80'
    />
  </SectionCard>
)

export default RevenueCard
