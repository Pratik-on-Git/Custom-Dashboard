// Third-party Imports
import { DownloadIcon } from 'lucide-react'

// Type Imports
import type { OverviewDashboardData } from '@/types/dashboards/overview-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/global/layout/page-header'
import KpiCards from './sections/kpi-cards'
import RevenueCard from './sections/revenue-card'
import RecentSalesCard from './sections/recent-sales-card'
import TrafficCard from './sections/traffic-card'
import RankedListCard from './sections/ranked-list-card'

// Config Imports
import { tabs } from './config'

const OverviewDashboard = ({ data }: { data: OverviewDashboardData }) => (
  <div className='flex flex-col gap-6'>
    <PageHeader
      title='Dashboard'
      description='Revenue, sales and traffic at a glance.'
      actions={
        <Button size='lg'>
          <DownloadIcon data-icon='inline-start' />
          Download
        </Button>
      }
    />

    <Tabs defaultValue='overview' className='gap-6'>
      <div className='-m-1 overflow-x-auto overflow-y-hidden p-1'>
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} disabled={'disabled' in tab}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value='overview' className='flex flex-col gap-6'>
        <KpiCards kpis={data.kpis} />
        <div className='grid gap-6 xl:grid-cols-7'>
          <RevenueCard data={data.revenueByMonth} className='xl:col-span-4' />
          <RecentSalesCard sales={data.recentSales} monthTotal={data.salesThisMonth} className='xl:col-span-3' />
        </div>
      </TabsContent>

      <TabsContent value='analytics' className='flex flex-col gap-6'>
        <TrafficCard data={data.traffic} />
        <KpiCards kpis={data.analyticsKpis} />
        <div className='grid gap-6 xl:grid-cols-7'>
          <RankedListCard
            title='Referrers'
            description='Top sources driving traffic'
            headingId='referrers-heading'
            items={data.referrers}
            className='xl:col-span-4'
          />
          <RankedListCard
            title='Devices'
            description='How people access your app'
            headingId='devices-heading'
            items={data.devices}
            isPercent
            className='xl:col-span-3'
          />
        </div>
      </TabsContent>
    </Tabs>
  </div>
)

export default OverviewDashboard
