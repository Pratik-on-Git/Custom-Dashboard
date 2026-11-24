// Type Imports
import type { ReactNode } from 'react'

// Type Imports
import type { IntegrationFilter, IntegrationId, IntegrationSort } from '@/types/apps/integration-types'

// Asset Imports
import {
  IconDiscord,
  IconDocker,
  IconFigma,
  IconGithub,
  IconGitlab,
  IconGmail,
  IconMedium,
  IconNotion,
  IconSkype,
  IconSlack,
  IconStripe,
  IconTelegram,
  IconTrello,
  IconWhatsapp,
  IconZoom
} from '@/assets/svg/brand-icons'

/** Brand marks are monochrome (`currentColor`) so cards stay in the app's single-hue scheme. */
export const integrationLogos: Record<IntegrationId, ReactNode> = {
  telegram: <IconTelegram />,
  notion: <IconNotion />,
  figma: <IconFigma />,
  trello: <IconTrello />,
  slack: <IconSlack />,
  zoom: <IconZoom />,
  stripe: <IconStripe />,
  gmail: <IconGmail />,
  medium: <IconMedium />,
  skype: <IconSkype />,
  docker: <IconDocker />,
  github: <IconGithub />,
  gitlab: <IconGitlab />,
  discord: <IconDiscord />,
  whatsapp: <IconWhatsapp />
}

export const filterOptions: { value: IntegrationFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'connected', label: 'Connected' },
  { value: 'not-connected', label: 'Not connected' }
]

export const sortOptions: { value: IntegrationSort; label: string }[] = [
  { value: 'asc', label: 'Name A–Z' },
  { value: 'desc', label: 'Name Z–A' }
]
