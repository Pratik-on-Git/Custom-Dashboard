// Component Imports
import OverviewDashboard from '@/views/dashboards/overview'

// Data Imports
import { overviewDashboard } from '@/fake-db/dashboards/overview'

const OverviewDashboardPage = () => {
  return <OverviewDashboard data={overviewDashboard} />
}

export default OverviewDashboardPage
