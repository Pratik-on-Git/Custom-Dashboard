// Third-party Imports
import { format, isToday, isYesterday } from 'date-fns'

// Type Imports
import type { ChatMessage, Conversation } from '@/types/apps/chat-types'

/** Short timestamp for the inbox: time today, "Yesterday", else the date. */
export const formatListTime = (iso: string) => {
  const date = new Date(iso)

  if (isToday(date)) return format(date, 'HH:mm')
  if (isYesterday(date)) return 'Yesterday'

  return format(date, 'd MMM')
}

/** Divider label between days in a thread. */
export const formatDayLabel = (iso: string) => {
  const date = new Date(iso)

  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'

  return format(date, 'EEEE, d MMMM')
}

export const formatMessageTime = (iso: string) => format(new Date(iso), 'HH:mm')

export const lastMessage = (conversation: Conversation) => conversation.messages.at(-1)

/** Preview line for the inbox, prefixed with "You:" for outgoing messages. */
export const previewText = (message: ChatMessage | undefined) =>
  message ? `${message.fromMe ? 'You: ' : ''}${message.text}` : 'No messages yet'

/** Groups a thread into consecutive days, keeping message order. */
export const groupByDay = (messages: ChatMessage[]) =>
  messages.reduce<{ day: string; messages: ChatMessage[] }[]>((groups, message) => {
    const day = message.sentAt.slice(0, 10)
    const current = groups.at(-1)

    if (current?.day === day) current.messages.push(message)
    else groups.push({ day, messages: [message] })

    return groups
  }, [])
