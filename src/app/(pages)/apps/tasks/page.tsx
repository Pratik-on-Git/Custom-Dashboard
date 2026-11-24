// Component Imports
import TasksApp from '@/views/apps/tasks'

// Data Imports
import { tasks } from '@/fake-db/apps/tasks'

const TasksPage = () => {
  return <TasksApp initialTasks={tasks} />
}

export default TasksPage
