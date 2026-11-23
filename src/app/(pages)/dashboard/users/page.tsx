// Component Imports
import UsersDashboard from '@/views/dashboards/users'

// Data Imports
import { farmOverview } from '@/fake-db/dashboards/users'

const UsersDashboardPage = () => {
  return <UsersDashboard data={farmOverview} />
}

export default UsersDashboardPage
