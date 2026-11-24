export type ProfileSettings = {
  username: string
  email: string
  bio: string
  urls: { value: string }[]
}

export type AccountSettings = {
  name: string

  /** ISO date */
  dateOfBirth?: string
  language: string
}

export type NotificationScope = 'all' | 'mentions' | 'none'

export type EmailNotificationId = 'communication' | 'marketing' | 'social' | 'security'

export type NotificationSettings = {
  scope: NotificationScope
  emails: Record<EmailNotificationId, boolean>
  separateMobileSettings: boolean
}

export type SidebarItemId = 'recents' | 'home' | 'applications' | 'desktop' | 'downloads' | 'documents'

export type DisplaySettings = {
  sidebarItems: SidebarItemId[]
}

export type SettingsData = {
  profile: ProfileSettings

  /** Verified addresses the profile email can be chosen from */
  verifiedEmails: string[]
  account: AccountSettings
  notifications: NotificationSettings
  display: DisplaySettings
}
