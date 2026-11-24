'use client'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { Stat } from '@/components/global/data-display/stat'
import { StatGroup } from '@/components/global/data-display/stat-group'
import { Sparkline } from '@/components/global/charts/sparkline'
import { DeltaBadge } from '@/components/global/micro/delta-badge'

const revenueTrend = [32, 38, 35, 44, 41, 52, 49, 58, 61, 57, 66, 72]

/** Decorative glimpse of the dashboard for the sign-in split screen, built from the real components. */
const ProductPreview = () => (
  <div aria-hidden='true' className='flex w-full max-w-md flex-col gap-6'>
    <SectionCard title='Revenue' description='Last 12 months' action={<DeltaBadge value={20.1} />}>
      <Stat value='$45,231.89' size='lg' caption='+$7,580 since last quarter' />
      <Sparkline values={revenueTrend} className='h-24' />
    </SectionCard>
    <SectionCard size='sm'>
      <StatGroup>
        <Stat label='Subscriptions' value='+2,350' size='sm' />
        <Stat label='Sales' value='+12,234' size='sm' />
        <Stat label='Active now' value='573' size='sm' />
      </StatGroup>
    </SectionCard>
  </div>
)

export default ProductPreview
