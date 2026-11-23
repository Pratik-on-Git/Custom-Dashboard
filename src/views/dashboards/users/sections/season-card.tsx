'use client'

// React Imports
import { useMemo, useState } from 'react'

// Type Imports
import type { SeasonSummary } from '@/types/dashboards/users-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { SegmentedControl } from '@/components/global/inputs/segmented-control'
import { Stat } from '@/components/global/data-display/stat'
import { StatGroup } from '@/components/global/data-display/stat-group'
import { DeltaBadge } from '@/components/global/micro/delta-badge'
import { AreaTrendChart, type AreaTrendSeries } from '@/components/global/charts/area-trend-chart'

// Util Imports
import { formatNumber, formatUnit } from '@/utils/format-utils'

type Unit = 'tonnes' | 'perM2'

const unitOptions: { value: Unit; label: string }[] = [
  { value: 'tonnes', label: 'Tonnes' },
  { value: 'perM2', label: 'Per m²' }
]

/** Everything that changes with the unit switch: caption, axis ticks and tooltip values. */
const unitDisplay: Record<
  Unit,
  { caption: string; axis: (value: number) => string; value: (value: number) => string }
> = {
  tonnes: {
    caption: 'Tonnes per week',
    axis: value => formatNumber(value),
    value: value => formatUnit(value, 't', 1)
  },
  perM2: {
    caption: 'Kilograms per m², per week',
    axis: value => formatNumber(value, 2),
    value: value => formatUnit(value, 'kg/m²', 2)
  }
}

const series: AreaTrendSeries[] = [
  { key: 'current', label: 'This season', tone: 'primary', variant: 'area' },
  { key: 'previous', label: 'Last season', tone: 'neutral', variant: 'dashed' }
]

const SeasonCard = ({ season, className }: { season: SeasonSummary; className?: string }) => {
  const [unit, setUnit] = useState<Unit>('tonnes')

  const bestWeek = season.weeks.reduce((best, week) => (week.current > best.current ? week : best))
  const display = unitDisplay[unit]

  // Only the chart switches unit — headline figures stay in tonnes
  const chartData = useMemo(() => {
    if (unit === 'tonnes') return season.weeks

    const toKgPerM2 = (tonnes: number) => (tonnes * 1000) / season.areaM2

    return season.weeks.map(week => ({
      ...week,
      current: toKgPerM2(week.current),
      previous: toKgPerM2(week.previous)
    }))
  }, [unit, season])

  const peak = Math.max(...chartData.map(week => week.current))

  return (
    <SectionCard
      title='Picked this season'
      description='Every week since the first of August, against the same week last year'
      headingId='season-heading'
      action={
        <SegmentedControl ariaLabel='Unit' options={unitOptions} value={unit} onValueChange={setUnit} size='sm' />
      }
      className={className}
      contentClassName='gap-6'
    >
      <StatGroup>
        <Stat
          label='Season to date'
          value={formatUnit(season.toDateTonnes, 't', 1)}
          size='lg'
          suffix={<DeltaBadge value={season.changePercent} />}
        />
        <Stat label='Best week' value={formatUnit(bestWeek.current, 't', 1)} size='lg' suffix={bestWeek.week} />
        <Stat
          label='This week so far'
          value={formatUnit(season.thisWeekKg, 'kg')}
          size='lg'
          suffix={`${season.daysElapsed} of 7 days`}
        />
      </StatGroup>

      <AreaTrendChart
        data={chartData}
        xKey='week'
        series={series}
        caption={display.caption}
        axisFormatter={display.axis}
        valueFormatter={display.value}
        ariaLabel={`This season from ${season.weeks[0].week} to ${season.weeks.at(-1)?.week}, peaking at ${display.value(peak)}`}
        className='h-64'
      />
    </SectionCard>
  )
}

export default SeasonCard
