// Type Imports
import type { RecentSale } from '@/types/dashboards/overview-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { InitialsAvatar } from '@/components/global/micro/initials-avatar'

// Config Imports
import { formatUsd } from '../config'

// Util Imports
import { formatNumber, toInitials } from '@/utils/format-utils'

type RecentSalesCardProps = {
  sales: RecentSale[]
  monthTotal: number
  className?: string
}

const RecentSalesCard = ({ sales, monthTotal, className }: RecentSalesCardProps) => (
  <SectionCard
    title='Recent sales'
    description={`You made ${formatNumber(monthTotal)} sales this month.`}
    headingId='recent-sales-heading'
    className={className}
  >
    <ListRowGroup>
      {sales.map(sale => (
        <ListRow
          key={sale.id}
          leading={<InitialsAvatar initials={toInitials(sale.name)} name={sale.name} src={sale.avatar} />}
          title={sale.name}
          description={sale.email}
          size='sm'
          trailing={<span className='font-medium tabular-nums'>+{formatUsd(sale.amount)}</span>}
        />
      ))}
    </ListRowGroup>
  </SectionCard>
)

export default RecentSalesCard
