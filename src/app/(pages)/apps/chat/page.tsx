// Component Imports
import ChatApp from '@/views/apps/chat'

// Data Imports
import { conversations } from '@/fake-db/apps/chat'

const ChatPage = () => {
  return <ChatApp initialConversations={conversations} />
}

export default ChatPage
