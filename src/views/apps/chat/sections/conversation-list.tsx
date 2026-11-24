// Third-party Imports
import { SquarePenIcon } from 'lucide-react'

// Type Imports
import type { Conversation } from '@/types/apps/chat-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionCard } from '@/components/global/layout/section-card'
import { ListRow, ListRowGroup } from '@/components/global/data-display/list-row'
import { StatusPill } from '@/components/global/data-display/status-pill'
import { EmptyState } from '@/components/global/feedback/empty-state'
import { SearchInput } from '@/components/global/inputs/search-input'
import { InitialsAvatar } from '@/components/global/micro/initials-avatar'

// Config Imports
import { formatListTime, lastMessage, previewText } from '../config'

// Util Imports
import { cn } from '@/lib/utils'
import { toInitials } from '@/utils/format-utils'

type ConversationListProps = {
  conversations: Conversation[]
  selectedId: string | null
  search: string
  onSearchChange: (value: string) => void
  onSelect: (id: string) => void
  onNewChat: () => void
  className?: string
}

const ConversationList = ({
  conversations,
  selectedId,
  search,
  onSearchChange,
  onSelect,
  onNewChat,
  className
}: ConversationListProps) => (
  <SectionCard
    title='Inbox'
    description={`${conversations.length} conversations`}
    headingId='inbox-heading'
    action={
      <Button variant='ghost' size='icon-sm' onClick={onNewChat} aria-label='New message'>
        <SquarePenIcon />
      </Button>
    }
    className={cn('min-h-0', className)}
    contentClassName='min-h-0 gap-3'
  >
    <SearchInput value={search} onValueChange={onSearchChange} placeholder='Search chats…' />
    <ScrollArea className='-mx-2 min-h-0 flex-1 px-2'>
      {conversations.length ? (
        <ListRowGroup className='divide-y-0'>
          {conversations.map(conversation => {
            const latest = lastMessage(conversation)

            return (
              <ListRow
                key={conversation.id}
                density='compact'
                size='sm'
                selected={conversation.id === selectedId}
                onSelect={() => onSelect(conversation.id)}
                leading={
                  <InitialsAvatar
                    initials={toInitials(conversation.contact.fullName)}
                    name={conversation.contact.fullName}
                    src={conversation.contact.avatar}
                  />
                }
                title={conversation.contact.fullName}
                description={previewText(latest)}
                trailing={
                  <span className='flex flex-col items-end gap-1'>
                    {latest && (
                      <span className='text-muted-foreground text-xs tabular-nums'>
                        {formatListTime(latest.sentAt)}
                      </span>
                    )}
                    {conversation.unread > 0 && (
                      <StatusPill tone='primary' variant='solid' size='sm' className='min-w-5 justify-center px-1.5'>
                        {conversation.unread}
                      </StatusPill>
                    )}
                  </span>
                }
              />
            )
          })}
        </ListRowGroup>
      ) : (
        <EmptyState size='sm' title='No chats found' description='Try another name.' />
      )}
    </ScrollArea>
  </SectionCard>
)

export default ConversationList
