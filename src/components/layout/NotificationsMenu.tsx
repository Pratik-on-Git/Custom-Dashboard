'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { BellIcon, BellOffIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { EmptyState } from '@/components/global/feedback/empty-state'
import { ColorDot } from '@/components/global/micro/color-dot'
import { IconTile } from '@/components/global/micro/icon-tile'

// Config Imports
import { notificationMeta, timeAgo } from '@/configs/headerConfig'

// Data Imports
import { notifications as seedNotifications } from '@/fake-db/shared/header'

/** Header bell: recent notifications, a dot while any are unread, and "mark all as read". */
const NotificationsMenu = () => {
  const [items, setItems] = useState(seedNotifications)
  const unreadCount = items.filter(item => item.unread).length

  const markRead = (id?: string) =>
    setItems(current => current.map(item => (id === undefined || item.id === id ? { ...item, unread: false } : item)))

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='relative'
            aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
          />
        }
      >
        <BellIcon />
        {unreadCount > 0 && <ColorDot tone='danger' className='ring-card absolute inset-e-2.5 top-2 ring-2' />}
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80'>
        <PopoverHeader className='flex-row items-start justify-between gap-3'>
          <div className='flex flex-col gap-1'>
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>{unreadCount ? `${unreadCount} unread` : 'You’re all caught up'}</PopoverDescription>
          </div>
          <Button variant='ghost' size='xs' onClick={() => markRead()} disabled={!unreadCount}>
            Mark all as read
          </Button>
        </PopoverHeader>

        {items.length ? (
          <ScrollArea className='-mx-2 max-h-96 px-2'>
            <ListRowGroup>
              {items.map(item => {
                const meta = notificationMeta[item.kind]

                return (
                  <ListRow
                    key={item.id}
                    size='sm'
                    density='compact'
                    onSelect={() => markRead(item.id)}
                    leading={
                      <IconTile tone={meta.tone} variant={meta.variant} size='sm' className='self-start'>
                        {meta.icon}
                      </IconTile>
                    }
                    title={item.title}
                    description={
                      <>
                        <span className='block truncate'>{item.description}</span>
                        <span className='text-muted-foreground/80'>{timeAgo(item.createdAt)}</span>
                      </>
                    }
                    trailing={
                      item.unread ? (
                        <>
                          <ColorDot tone='primary' />
                          <span className='sr-only'>Unread</span>
                        </>
                      ) : null
                    }
                  />
                )
              })}
            </ListRowGroup>
          </ScrollArea>
        ) : (
          <EmptyState size='sm' icon={<BellOffIcon />} title='No notifications' />
        )}
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsMenu
