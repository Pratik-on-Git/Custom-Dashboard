export type IntegrationId =
  | 'telegram'
  | 'notion'
  | 'figma'
  | 'trello'
  | 'slack'
  | 'zoom'
  | 'stripe'
  | 'gmail'
  | 'medium'
  | 'skype'
  | 'docker'
  | 'github'
  | 'gitlab'
  | 'discord'
  | 'whatsapp'

export type IntegrationCategory = 'Communication' | 'Productivity' | 'Design' | 'Developer' | 'Finance' | 'Content'

export type Integration = {
  id: IntegrationId
  name: string
  description: string
  category: IntegrationCategory
  connected: boolean
}

export type IntegrationFilter = 'all' | 'connected' | 'not-connected'

export type IntegrationSort = 'asc' | 'desc'
