// Next Imports
import Link from 'next/link'

// Third-party Imports
import { CalendarIcon, ShoppingBasketIcon } from 'lucide-react'

// Type Imports
import type { FarmOverview } from '@/types/dashboards/users-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/global/layout/page-header'
import SeasonCard from './sections/season-card'
import FloorTodayCard from './sections/floor-today-card'
import HouseCard from './sections/house-card'
import CropCyclesCard from './sections/crop-cycles-card'
import PestTrapsCard from './sections/pest-traps-card'
import DispatchOrdersCard from './sections/dispatch-orders-card'
import TasksCard from './sections/tasks-card'
import ActivityCard from './sections/activity-card'

// Config Imports
import { routes } from './config'

// Util Imports
import { formatUnit } from '@/utils/format-utils'

/** Builds the one-line briefing under the greeting from live data. */
const buildBriefing = ({ houses, pickerShortfallInWeeks }: FarmOverview) => {
  const lead = houses.find(house => house.harvest)
  const nextUp = houses.find(house => house.phase === 'flower')
  const leadPct = lead?.harvest ? Math.round((lead.harvest.pickedKg / lead.harvest.targetKg) * 100) : null

  return (
    <>
      {lead?.harvest &&
        `${lead.name} is ${leadPct}% of the way to today's ${formatUnit(lead.harvest.targetKg, 'kg')}; `}
      {nextUp?.nextMilestone && `${nextUp.name}: ${nextUp.nextMilestone.toLowerCase()}. `}
      The plan is short of pickers in{' '}
      <Link href={routes.plan} className='text-foreground font-medium underline underline-offset-4'>
        {pickerShortfallInWeeks} weeks
      </Link>
      .
    </>
  )
}

const UsersDashboard = ({ data }: { data: FarmOverview }) => (
  <div className='flex flex-col gap-6'>
    <PageHeader
      title={`Good morning, ${data.greetingName}`}
      description={buildBriefing(data)}
      actions={
        <>
          <Button variant='outline' size='lg' render={<Link href={routes.plan} />} nativeButton={false}>
            <CalendarIcon data-icon='inline-start' />
            Season plan
          </Button>
          <Button size='lg'>
            <ShoppingBasketIcon data-icon='inline-start' />
            Log a pick
          </Button>
        </>
      }
    />

    <div className='grid gap-6 xl:grid-cols-3'>
      <SeasonCard season={data.season} className='xl:col-span-2' />
      <FloorTodayCard today={data.today} houses={data.houses} />
    </div>

    <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
      {data.houses.map(house => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>

    <div className='grid gap-6 xl:grid-cols-3'>
      <CropCyclesCard cycles={data.cycles} houses={data.houses} className='xl:col-span-2' />
      <PestTrapsCard traps={data.traps} houses={data.houses} />
    </div>

    <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
      <DispatchOrdersCard orders={data.orders} />
      <TasksCard tasks={data.tasks} houses={data.houses} />
      <ActivityCard activity={data.activity} className='lg:col-span-2 xl:col-span-1' />
    </div>
  </div>
)

export default UsersDashboard
