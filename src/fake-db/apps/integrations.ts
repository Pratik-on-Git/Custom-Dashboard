// Type Imports
import type { Integration } from '@/types/apps/integration-types'

export const integrations: Integration[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'Communication',
    connected: false,
    description: 'Connect with Telegram for real-time communication.'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    connected: true,
    description: 'Effortlessly sync Notion pages for seamless collaboration.'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    connected: true,
    description: 'View and collaborate on Figma designs in one place.'
  },
  {
    id: 'trello',
    name: 'Trello',
    category: 'Productivity',
    connected: false,
    description: 'Sync Trello cards for streamlined project management.'
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    connected: false,
    description: 'Integrate Slack for efficient team communication.'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    category: 'Communication',
    connected: true,
    description: 'Host Zoom meetings directly from the dashboard.'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Finance',
    connected: false,
    description: 'Easily manage Stripe transactions and payments.'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Communication',
    connected: true,
    description: 'Access and manage Gmail messages effortlessly.'
  },
  {
    id: 'medium',
    name: 'Medium',
    category: 'Content',
    connected: false,
    description: 'Explore and share Medium stories on your dashboard.'
  },
  {
    id: 'skype',
    name: 'Skype',
    category: 'Communication',
    connected: false,
    description: 'Connect with Skype contacts seamlessly.'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Developer',
    connected: false,
    description: 'Effortlessly manage Docker containers on your dashboard.'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Developer',
    connected: false,
    description: 'Streamline code management with GitHub integration.'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Developer',
    connected: false,
    description: 'Efficiently manage code projects with GitLab integration.'
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    connected: false,
    description: 'Connect with Discord for seamless team communication.'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Communication',
    connected: false,
    description: 'Easily integrate WhatsApp for direct messaging.'
  }
]
