'use client'

// React Imports
import { useEffect, useRef } from 'react'

// Third-party Imports
import { ArrowLeftIcon, EllipsisVerticalIcon, PhoneIcon, VideoIcon } from 'lucide-react'

// Type Imports
import type { Conversation } from '@/types/apps/chat-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SectionCard } from '@/components/global/layout/section-card'
import { MessageBubble } from '@/components/global/data-display/message-bubble'
import { InitialsAvatar } from '@/components/global/micro/initials-avatar'
import MessageComposer from './message-composer'

// Config Imports
import { formatDayLabel, formatMessageTime, groupByDay } from '../config'

// Util Imports
import { cn } from '@/lib/utils'
import { toInitials } from '@/utils/format-utils'

type ConversationThreadProps = {
  conversation: Conversation
  onBack: () => void
  onSend: (text: string) => void
  className?: string
}

const ConversationThread = ({ conversation, onBack, onSend, className }: ConversationThreadProps) => {
  const endRef = useRef<HTMLDivElement>(null)
  const { contact, messages } = conversation

  // Keep the newest message in view when switching threads or sending
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [conversation.id, messages.length])

  return (
    <SectionCard
      headingId='thread-heading'
      leading={
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='icon-sm'
            className='-ms-2 md:hidden'
            onClick={onBack}
            aria-label='Back to inbox'
          >
            <ArrowLeftIcon className='rtl:rotate-180' />
          </Button>
          <InitialsAvatar initials={toInitials(contact.fullName)} name={contact.fullName} src={contact.avatar} />
        </div>
      }
      title={contact.fullName}
      description={contact.title}
      action={
        <>
          <Button variant='ghost' size='icon-sm' aria-label='Start video call' className='max-sm:hidden'>
            <VideoIcon />
          </Button>
          <Button variant='ghost' size='icon-sm' aria-label='Start voice call' className='max-sm:hidden'>
            <PhoneIcon />
          </Button>
          <Button variant='ghost' size='icon-sm' aria-label='More options'>
            <EllipsisVerticalIcon />
          </Button>
        </>
      }
      className={cn('min-h-0', className)}
      contentClassName='min-h-0 gap-4'
    >
      <div
        role='log'
        aria-label={`Conversation with ${contact.fullName}`}
        className='-mx-2 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-2 py-1'
      >
        {groupByDay(messages).map(group => (
          <div key={group.day} className='flex flex-col gap-2'>
            <div className='text-muted-foreground flex items-center gap-3 py-2 text-xs'>
              <Separator className='flex-1' />
              {formatDayLabel(group.messages[0].sentAt)}
              <Separator className='flex-1' />
            </div>
            {group.messages.map(message => (
              <MessageBubble
                key={message.id}
                variant={message.fromMe ? 'outgoing' : 'incoming'}
                meta={formatMessageTime(message.sentAt)}
              >
                {message.text}
              </MessageBubble>
            ))}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <MessageComposer recipient={contact.fullName.split(' ')[0]} onSend={onSend} />
    </SectionCard>
  )
}

export default ConversationThread
