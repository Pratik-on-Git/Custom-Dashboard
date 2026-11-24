// Third-party Imports
import { BellIcon, MonitorIcon, PaletteIcon, UserCogIcon, WrenchIcon } from 'lucide-react'

// Type Imports
import type { EmailNotificationId, NotificationScope, SidebarItemId } from '@/types/pages/settings-types'
import type { SubNavItem } from '@/components/global/navigation/sub-nav'

export const settingsNav: SubNavItem[] = [
  { href: '/pages/settings/profile', label: 'Profile', icon: <UserCogIcon data-icon='inline-start' /> },
  { href: '/pages/settings/account', label: 'Account', icon: <WrenchIcon data-icon='inline-start' /> },
  { href: '/pages/settings/appearance', label: 'Appearance', icon: <PaletteIcon data-icon='inline-start' /> },
  { href: '/pages/settings/notifications', label: 'Notifications', icon: <BellIcon data-icon='inline-start' /> },
  { href: '/pages/settings/display', label: 'Display', icon: <MonitorIcon data-icon='inline-start' /> }
]

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese' }
]

export const notificationScopes: { value: NotificationScope; label: string }[] = [
  { value: 'all', label: 'All new messages' },
  { value: 'mentions', label: 'Direct messages and mentions' },
  { value: 'none', label: 'Nothing' }
]

export const emailNotifications: { id: EmailNotificationId; title: string; description: string; locked?: boolean }[] = [
  { id: 'communication', title: 'Communication emails', description: 'Receive emails about your account activity.' },
  { id: 'marketing', title: 'Marketing emails', description: 'Receive emails about new products, features and more.' },
  { id: 'social', title: 'Social emails', description: 'Receive emails for friend requests, follows and more.' },
  {
    id: 'security',
    title: 'Security emails',
    description: 'Receive emails about your account activity and security.',
    locked: true
  }
]

export const sidebarItems: { id: SidebarItemId; label: string }[] = [
  { id: 'recents', label: 'Recents' },
  { id: 'home', label: 'Home' },
  { id: 'applications', label: 'Applications' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'documents', label: 'Documents' }
]
