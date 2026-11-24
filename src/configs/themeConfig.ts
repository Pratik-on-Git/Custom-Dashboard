// Type Imports
import type { Preferences } from '@/types/preferences-types'

const themeConfig = {
  templateName: 'AdminCN',
  homePageUrl: '/dashboard/orders',

  /** Sidebar header: the brand logo, or a workspace switcher (`TeamSwitcher`) */
  sidebarHeader: 'brand' as 'brand' | 'team-switcher',

  /** Defaults for the Theme Settings drawer; each choice is persisted in a cookie so SSR matches. */
  preferences: {
    sidebarVariant: 'sidebar',
    sidebarCollapsible: 'icon',
    navbarVariant: 'default',
    font: 'geist',
    direction: 'ltr'
  } satisfies Preferences
} as const

export default themeConfig
