'use client'

// Type Imports
import type { TrafficPoint } from '@/types/dashboards/overview-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { AreaTrendChart } from '@/components/global/charts/area-trend-chart'

// Config Imports
import { formatCount } from '../config'

const TrafficCard = ({ data }: { data: TrafficPoint[] }) => (
  <SectionCard title='Traffic overview' description='Weekly clicks and unique visitors' headingId='traffic-heading'>
    <AreaTrendChart
      data={data}
      xKey='day'
      caption='Visits per day'
      series={[
        { key: 'clicks', label: 'Clicks', tone: 'primary', variant: 'area' },
        { key: 'uniques', label: 'Unique visitors', tone: 'primary-60', variant: 'line' }
      ]}
      valueFormatter={formatCount}
      showComparison={false}
      ariaLabel='Clicks and unique visitors per day this week'
      className='h-72'
    />
  </SectionCard>
)

export default TrafficCard
