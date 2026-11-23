'use client'

// React Imports
import { useState } from 'react'

// Type Imports
import { ORDER_STAGES, type DispatchOrder } from '@/types/dashboards/users-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { SectionCard } from '@/components/global/layout/section-card'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { Stepper } from '@/components/global/data-display/stepper'
import { ActionLink } from '@/components/global/micro/action-link'

// Config Imports
import { orderHref, orderNextAction, routes } from '@/views/dashboards/users/config'

// Util Imports
import { formatCurrency, formatNumber } from '@/utils/format-utils'

const DispatchOrdersCard = ({ orders: initialOrders, className }: { orders: DispatchOrder[]; className?: string }) => {
  const [orders, setOrders] = useState(initialOrders)

  const totalValue = orders.reduce((sum, order) => sum + order.value, 0)

  const advance = (id: string) =>
    setOrders(current =>
      current.map(order => {
        if (order.id !== id) return order

        const next = ORDER_STAGES[ORDER_STAGES.indexOf(order.stage) + 1]

        return next ? { ...order, stage: next } : order
      })
    )

  return (
    <SectionCard
      title='Going out today'
      description={`${orders.length} orders · ${formatCurrency(totalValue)}`}
      headingId='dispatch-heading'
      action={<ActionLink href={routes.orders}>All orders</ActionLink>}
      className={className}
    >
      <ListRowGroup>
        {orders.map(order => {
          const action = orderNextAction[order.stage]

          // A delivered order has every step done
          const stageIndex = order.stage === 'Delivered' ? ORDER_STAGES.length : ORDER_STAGES.indexOf(order.stage)

          return (
            <ListRow
              key={order.id}
              density='relaxed'
              href={orderHref(order.id)}
              title={order.customer}
              description={`${order.id} · ${formatNumber(order.trays)} trays · ${formatCurrency(order.value)}`}
              trailing={
                <Button variant='outline' disabled={!action} onClick={() => advance(order.id)}>
                  {action ?? 'Done'}
                </Button>
              }
            >
              <Stepper steps={[...ORDER_STAGES]} current={stageIndex} size='lg' />
            </ListRow>
          )
        })}
      </ListRowGroup>
    </SectionCard>
  )
}

export default DispatchOrdersCard
