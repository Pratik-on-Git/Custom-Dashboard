// Type Imports
import type { RankedItem } from '@/types/dashboards/overview-types'

// Component Imports
import { SectionCard } from '@/components/global/layout/section-card'
import { BarList } from '@/components/global/data-display/bar-list'

// Util Imports
import { formatNumber } from '@/utils/format-utils'

type RankedListCardProps = {
  title: string
  description: string
  headingId: string
  items: RankedItem[]

  /** Values are shares of 100 (shows "%" and scales to 100) */
  isPercent?: boolean
  className?: string
}

/** Referrers, devices… — any "top N" breakdown. */
const RankedListCard = ({ title, description, headingId, items, isPercent, className }: RankedListCardProps) => (
  <SectionCard title={title} description={description} headingId={headingId} className={className}>
    <BarList
      items={items}
      max={isPercent ? 100 : undefined}
      valueFormatter={value => (isPercent ? `${value}%` : formatNumber(value))}
    />
  </SectionCard>
)

export default RankedListCard
