export type ChatContact = {
  id: string
  username: string
  fullName: string

  /** Job title shown under the name */
  title: string
  avatar?: string
}

export type ChatMessage = {
  id: string

  /** Sent by the signed-in user */
  fromMe: boolean
  text: string

  /** ISO date-time */
  sentAt: string
}

export type Conversation = {
  id: string
  contact: ChatContact
  unread: number

  /** Oldest first */
  messages: ChatMessage[]
}
