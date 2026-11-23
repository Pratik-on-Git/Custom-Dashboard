// Type Imports
import type { CropCycle, House } from '@/types/dashboards/users-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { PhaseTrack } from '@/components/global/data-display/phase-track'
import { ActionLink } from '@/components/global/micro/action-link'
import { IconTile } from '@/components/global/micro/icon-tile'

// Config Imports
import { phaseMeta, routes } from '@/views/dashboards/users/config'

type CropCyclesCardProps = {
  cycles: CropCycle[]
  houses: House[]
  className?: string
}

const CropCyclesCard = ({ cycles, houses, className }: CropCyclesCardProps) => (
  <SectionCard
    title='Where every crop is'
    description='From planting to the last pick, today pinned on each'
    headingId='crop-cycles-heading'
    action={<ActionLink href={routes.plan}>Open the plan</ActionLink>}
    className={className}
    contentClassName='gap-7'
  >
    {cycles.map(cycle => {
      const house = houses.find(entry => entry.id === cycle.houseId)!
      const totalDays = cycle.phases.reduce((sum, phase) => sum + phase.days, 0)

      return (
        <div key={cycle.houseId} className='flex flex-col gap-3'>
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
            <IconTile tone='primary' size='xs' className='font-semibold'>
              {house.no}
            </IconTile>
            <span className='font-medium'>{house.name}</span>
            <span className='text-muted-foreground text-sm'>{house.variety}</span>
            <span className='ml-auto text-sm'>{cycle.statusLabel}</span>
          </div>
          <PhaseTrack
            elapsed={cycle.elapsedDays}
            segments={cycle.phases.map(phase => ({
              key: phase.phase,
              label: phaseMeta[phase.phase].label,
              days: phase.days,
              tone: 'primary',
              icon: phaseMeta[phase.phase].icon,
              title: `${phaseMeta[phase.phase].longLabel} · ${phase.range}`
            }))}
            startLabel={cycle.startLabel}
            progressLabel={`Day ${cycle.elapsedDays} of ${totalDays}`}
            endLabel={cycle.endLabel}
            ariaLabel={`${house.name}: ${cycle.phases
              .map(phase => `${phaseMeta[phase.phase].label} ${phase.range}`)
              .join(', ')}`}
          />
        </div>
      )
    })}
  </SectionCard>
)

export default CropCyclesCard
