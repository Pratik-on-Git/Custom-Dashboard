'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { MessagesSquareIcon } from 'lucide-react'

// Type Imports
import type { ChatContact, Conversation } from '@/types/apps/chat-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/global/feedback/empty-state'
import ConversationList from './sections/conversation-list'
import ConversationThread from './sections/conversation-thread'
import NewChatDialog from './dialogs/new-chat-dialog'

// Config Imports
import { lastMessage } from './config'

// Util Imports
import { cn } from '@/lib/utils'

const byLatest = (a: Conversation, b: Conversation) =>
  (lastMessage(b)?.sentAt ?? '').localeCompare(lastMessage(a)?.sentAt ?? '')

const ChatApp = ({ initialConversations }: { initialConversations: Conversation[] }) => {
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)

  const selected = conversations.find(conversation => conversation.id === selectedId) ?? null

  const visible = conversations
    .filter(conversation => conversation.contact.fullName.toLowerCase().includes(search.trim().toLowerCase()))
    .toSorted(byLatest)

  const select = (id: string) => {
    setSelectedId(id)
    setConversations(current => current.map(item => (item.id === id ? { ...item, unread: 0 } : item)))
  }

  const send = (text: string) => {
    if (!selected) return
    setConversations(current =>
      current.map(item =>
        item.id === selected.id
          ? {
              ...item,
              messages: [
                ...item.messages,
                { id: `${item.id}-${Date.now()}`, fromMe: true, text, sentAt: new Date().toISOString() }
              ]
            }
          : item
      )
    )
  }

  const startChat = ([first]: ChatContact[]) => {
    const existing = conversations.find(conversation => conversation.contact.id === first?.id)

    if (existing) return select(existing.id)
    if (!first) return

    const id = `conv-${first.id}-${Date.now()}`

    setConversations(current => [{ id, contact: first, unread: 0, messages: [] }, ...current])
    setSelectedId(id)
  }

  return (
    <div className='grid h-[calc(100svh-11rem)] min-h-[32rem] gap-6 md:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[22rem_minmax(0,1fr)]'>
      <ConversationList
        conversations={visible}
        selectedId={selectedId}
        search={search}
        onSearchChange={setSearch}
        onSelect={select}
        onNewChat={() => setIsNewChatOpen(true)}
        className={cn(selected && 'max-md:hidden')}
      />

      {selected ? (
        <ConversationThread conversation={selected} onBack={() => setSelectedId(null)} onSend={send} />
      ) : (
        <Card className='justify-center max-md:hidden'>
          <EmptyState
            icon={<MessagesSquareIcon />}
            title='Your messages'
            description='Pick a conversation, or send a message to start a new one.'
            actions={<Button onClick={() => setIsNewChatOpen(true)}>Send message</Button>}
          />
        </Card>
      )}

      <NewChatDialog
        open={isNewChatOpen}
        onOpenChange={setIsNewChatOpen}
        contacts={initialConversations.map(conversation => conversation.contact)}
        onStart={startChat}
      />
    </div>
  )
}

export default ChatApp
