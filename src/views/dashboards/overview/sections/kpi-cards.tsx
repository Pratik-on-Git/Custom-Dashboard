// Type Imports
import type { Kpi } from '@/types/dashboards/overview-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { Stat } from '@/components/global/data-display/stat'
import { DeltaBadge } from '@/components/global/micro/delta-badge'
import { IconTile } from '@/components/global/micro/icon-tile'

// Config Imports
import { kpiIcons } from '../config'

const KpiCards = ({ kpis }: { kpis: Kpi[] }) => (
  <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
    {kpis.map(kpi => (
      <SectionCard
        key={kpi.id}
        size='sm'
        title={kpi.label}
        headingId={`kpi-${kpi.id}`}
        action={
          <IconTile tone='primary' size='sm'>
            {kpiIcons[kpi.id]}
          </IconTile>
        }
      >
        <Stat
          value={kpi.value}
          caption={
            <span className='flex items-center gap-2'>
              <DeltaBadge value={kpi.change} invert={kpi.invert} />
              {kpi.period}
            </span>
          }
        />
      </SectionCard>
    ))}
  </div>
)

export default KpiCards
