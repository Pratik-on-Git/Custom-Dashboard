// Type Imports
import type { FloorToday, House } from '@/types/dashboards/users-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { Stat } from '@/components/global/data-display/stat'
import { Legend } from '@/components/global/data-display/legend'
import { SegmentedBar } from '@/components/global/data-display/segmented-bar'
import { MiniBars } from '@/components/global/charts/mini-bars'
import { LiveDot } from '@/components/global/micro/live-dot'

// Util Imports
import { createToneScale } from '@/components/global/variants/tone'
import { formatNumber, formatPercent, formatUnit } from '@/utils/format-utils'

type FloorTodayCardProps = {
  today: FloorToday
  houses: House[]
  className?: string
}

const FloorTodayCard = ({ today, houses, className }: FloorTodayCardProps) => {
  const pickedKg = today.byHouse.reduce((sum, item) => sum + item.kg, 0)
  const lastHourTotal = today.lastHourKg.reduce((sum, value) => sum + value, 0)

  // Brand-colour shades, one per house on the floor (primary, primary-60, …)
  const houseShade = createToneScale(today.byHouse.map(item => item.houseId))

  const parts = today.byHouse.map(item => {
    const house = houses.find(entry => entry.id === item.houseId)!

    return { label: house.name, value: item.kg, tone: houseShade(item.houseId) }
  })

  return (
    <SectionCard
      title='On the floor today'
      description={
        <>
          <LiveDot />
          {today.pickersOnShift} pickers on shift · since {today.shiftStart}
        </>
      }
      headingId='floor-today-heading'
      className={className}
      contentClassName='justify-between'
    >
      <Stat value={formatUnit(pickedKg, 'kg')} size='xl' suffix={`of ${formatUnit(today.plannedKg, 'kg')} planned`} />

      <div className='flex flex-col gap-3'>
        <SegmentedBar segments={parts} total={today.plannedKg} ariaLabel="Today's kilos by house" />
        <Legend
          items={parts.map(part => ({ label: part.label, tone: part.tone, value: formatUnit(part.value, 'kg') }))}
        />
      </div>

      <div className='grid grid-cols-3 gap-3'>
        <Stat variant='tile' size='sm' label='Class 1' value={formatPercent(today.class1Percent, 0)} />
        <Stat variant='tile' size='sm' label='Punnets' value={formatNumber(today.punnets)} />
        <Stat
          variant='tile'
          size='sm'
          label='Per picker'
          value={formatUnit(Math.round(pickedKg / today.pickersOnShift), 'kg')}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <span className='text-muted-foreground text-sm'>The last hour, five minutes a bar</span>
        <MiniBars
          values={today.lastHourKg}
          max={40}
          valueFormatter={value => formatUnit(value, 'kg', 1)}
          ariaLabel={`${formatUnit(lastHourTotal, 'kg')} in the last hour`}
        />
      </div>
    </SectionCard>
  )
}

export default FloorTodayCard
