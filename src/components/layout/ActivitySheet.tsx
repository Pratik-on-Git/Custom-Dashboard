'use client'

// Third-party Imports
import { ActivityIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { IconTile } from '@/components/global/micro/icon-tile'

// Config Imports
import { activityMeta, timeAgo } from '@/configs/headerConfig'

// Data Imports
import { activity } from '@/fake-db/shared/header'

/** Header button + side sheet listing recent workspace activity (deploys, comments, tasks, members…). */
const ActivitySheet = () => (
  <Sheet>
    <SheetTrigger
      render={<Button variant='ghost' size='icon' className='max-md:hidden' aria-label='Recent activity' />}
    >
      <ActivityIcon />
    </SheetTrigger>
    <SheetContent className='w-full sm:max-w-md'>
      <SheetHeader>
        <SheetTitle>Activity</SheetTitle>
        <SheetDescription>What’s happened across your workspace recently.</SheetDescription>
      </SheetHeader>
      <div className='flex-1 overflow-y-auto px-4 pb-4'>
        <ListRowGroup>
          {activity.map(event => {
            const meta = activityMeta[event.kind]

            return (
              <ListRow
                key={event.id}
                size='sm'
                leading={
                  <IconTile tone={meta.tone} variant={meta.variant} size='sm' className='self-start'>
                    {meta.icon}
                  </IconTile>
                }
                title={event.title}
                description={event.description}
                trailing={
                  <span className='text-muted-foreground self-start text-xs whitespace-nowrap'>
                    {timeAgo(event.createdAt)}
                  </span>
                }
              />
            )
          })}
        </ListRowGroup>
      </div>
    </SheetContent>
  </Sheet>
)

export default ActivitySheet
