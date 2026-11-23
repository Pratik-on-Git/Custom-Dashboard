// Type Imports
import type { House, HouseTraps } from '@/types/dashboards/users-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { StatusPill } from '@/components/global/data-display/status-pill'
import { ThresholdMeter } from '@/components/global/data-display/threshold-bar'

// Config Imports
import { TRAP_SCALE } from '@/views/dashboards/users/config'

type PestTrapsCardProps = {
  traps: HouseTraps[]
  houses: House[]
  className?: string
}

const PestTrapsCard = ({ traps, houses, className }: PestTrapsCardProps) => {
  const overCount = traps.flatMap(group => group.counts).filter(item => item.count > item.limit).length

  return (
    <SectionCard
      title='Sticky traps'
      description="This week's counts per trap; the tick is the limit"
      headingId='pest-traps-heading'
      action={
        <StatusPill tone={overCount ? 'warning' : 'success'}>
          {overCount ? `${overCount} over` : 'All clear'}
        </StatusPill>
      }
      className={className}
      contentClassName='gap-0 divide-y'
    >
      {traps.map(group => {
        const house = houses.find(entry => entry.id === group.houseId)!
        const needsAction = group.counts.some(item => item.count > item.limit)

        return (
          <div key={group.houseId} className='flex flex-col gap-2.5 py-4 first:pt-0 last:pb-0'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>{house.name}</span>
              <StatusPill tone={needsAction ? 'warning' : 'success'} size='sm'>
                {needsAction ? 'Act' : 'Clear'}
              </StatusPill>
            </div>
            {group.counts.map(item => (
              <ThresholdMeter
                key={item.pest}
                label={item.pest}
                value={item.count}
                limit={item.limit}
                max={item.limit * TRAP_SCALE}
              />
            ))}
          </div>
        )
      })}
    </SectionCard>
  )
}

export default PestTrapsCard
