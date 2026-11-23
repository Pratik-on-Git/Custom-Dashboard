'use client'

// React Imports
import { useState } from 'react'

// Type Imports
import type { FarmTask, House } from '@/types/dashboards/users-types'

// Component Imports
import { Checkbox } from '@/components/ui/checkbox'
import { SectionCard } from '@/components/global/layout/section-card'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { ActionLink } from '@/components/global/micro/action-link'
import { InitialsAvatar } from '@/components/global/micro/initials-avatar'

// Config Imports
import { routes } from '@/views/dashboards/users/config'

type TasksCardProps = {
  tasks: FarmTask[]
  houses: House[]
  className?: string
}

const TasksCard = ({ tasks: initialTasks, houses, className }: TasksCardProps) => {
  const [tasks, setTasks] = useState(initialTasks)

  const openCount = tasks.filter(task => !task.done).length

  const toggle = (id: string, done: boolean) =>
    setTasks(current => current.map(task => (task.id === id ? { ...task, done } : task)))

  return (
    <SectionCard
      title="Today's jobs"
      description={openCount ? `${openCount} still open` : 'All done for today'}
      headingId='tasks-heading'
      action={<ActionLink href={routes.tasks}>Board</ActionLink>}
      className={className}
    >
      <ListRowGroup>
        {tasks.map(task => {
          const house = houses.find(entry => entry.id === task.houseId)

          return (
            <ListRow
              key={task.id}
              muted={task.done}
              leading={
                <Checkbox
                  checked={task.done}
                  onCheckedChange={checked => toggle(task.id, checked)}
                  aria-label={`Done: ${task.title}`}
                  className='size-5.5 rounded-md border-2 [&_svg]:size-3.5'
                />
              }
              title={task.title}
              description={[house?.name, `by ${task.due}`].filter(Boolean).join(' · ')}
              trailing={<InitialsAvatar initials={task.assignee.initials} name={task.assignee.name} />}
            />
          )
        })}
      </ListRowGroup>
    </SectionCard>
  )
}

export default TasksCard
