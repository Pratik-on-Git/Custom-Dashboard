// Type Imports
import type { FarmActivity } from '@/types/dashboards/users-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { IconTile } from '@/components/global/micro/icon-tile'

// Config Imports
import { activityMeta } from '@/views/dashboards/users/config'

const ActivityCard = ({ activity, className }: { activity: FarmActivity[]; className?: string }) => (
  <SectionCard
    title='Activity'
    description='The farm, as it happens'
    headingId='activity-heading'
    className={className}
  >
    <ListRowGroup>
      {activity.map(item => {
        const meta = activityMeta[item.kind]

        return (
          <ListRow
            key={item.id}
            leading={
              <IconTile tone={meta.tone} variant={meta.variant}>
                {meta.icon}
              </IconTile>
            }
            title={item.message}
            description={`${item.time} · ${item.actor}`}
          />
        )
      })}
    </ListRowGroup>
  </SectionCard>
)

export default ActivityCard
