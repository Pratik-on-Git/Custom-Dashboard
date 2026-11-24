// Component Imports
import UserListApp from '@/views/apps/users/list'

// Data Imports
import { users } from '@/fake-db/apps/users'

const UsersPage = () => {
  return <UserListApp initialUsers={users} />
}

export default UsersPage
