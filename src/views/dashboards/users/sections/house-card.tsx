// Third-party Imports
import { ClockIcon, DropletIcon, SunIcon, WindIcon } from 'lucide-react'

// Type Imports
import type { House } from '@/types/dashboards/users-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { StatusPill } from '@/components/global/data-display/status-pill'
import { Stat } from '@/components/global/data-display/stat'
import { ProgressMeter } from '@/components/global/data-display/progress-meter'
import { Sparkline } from '@/components/global/charts/sparkline'
import { IconTile } from '@/components/global/micro/icon-tile'
import { MetaItem } from '@/components/global/micro/meta-item'

// Config Imports
import { phaseMeta } from '@/views/dashboards/users/config'

// Util Imports
import { formatNumber, formatUnit } from '@/utils/format-utils'

const HouseCard = ({ house }: { house: House }) => {
  const phase = phaseMeta[house.phase]
  const { climate, harvest } = house

  return (
    <SectionCard
      leading={
        <IconTile tone='primary' size='sm' className='text-sm font-semibold'>
          {house.no}
        </IconTile>
      }
      title={house.name}
      description={<span className='truncate'>{`${house.crop} · ${house.variety}`}</span>}
      action={<StatusPill tone={phase.tone}>{phase.label}</StatusPill>}
      contentClassName='gap-4'
    >
      <div className='flex flex-wrap items-end justify-between gap-x-4 gap-y-2'>
        <Stat value={`${formatNumber(climate.temperature, 1)}°`} size='lg' />
        <div className='flex flex-wrap items-center gap-x-3 gap-y-1 pb-1'>
          <MetaItem icon={<DropletIcon />}>{`${climate.humidity}%`}</MetaItem>
          <MetaItem icon={<WindIcon />}>{`${climate.co2} ppm`}</MetaItem>
          {climate.lightsOn && (
            <MetaItem icon={<SunIcon />} emphasis='tone' tone='warning'>
              LED
            </MetaItem>
          )}
        </div>
      </div>

      <Sparkline values={climate.trend} className='h-9' />

      <div className='mt-auto border-t pt-4'>
        {harvest ? (
          <div className='flex flex-col gap-3'>
            <ProgressMeter
              value={harvest.pickedKg}
              target={harvest.targetKg}
              label={
                <>
                  <span className='text-foreground text-lg font-medium tabular-nums'>
                    {formatUnit(harvest.pickedKg, 'kg')}
                  </span>{' '}
                  of {formatUnit(harvest.targetKg, 'kg')}
                </>
              }
            />
            <span className='text-muted-foreground text-xs'>{harvest.crews.join(' · ')}</span>
          </div>
        ) : (
          <MetaItem icon={<ClockIcon />}>{house.nextMilestone}</MetaItem>
        )}
      </div>
    </SectionCard>
  )
}

export default HouseCard
