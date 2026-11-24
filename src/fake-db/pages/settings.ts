// Type Imports
import type { SettingsData } from '@/types/pages/settings-types'

export const settings: SettingsData = {
  profile: {
    username: 'johndoe',
    email: 'john.doe@example.com',
    bio: 'Product designer building calm, data-dense dashboards.',
    urls: [{ value: 'https://example.com' }, { value: 'https://x.com/johndoe' }]
  },
  verifiedEmails: ['john.doe@example.com', 'john@company.com', 'support@company.com'],
  account: {
    name: 'John Doe',
    dateOfBirth: '1992-04-18',
    language: 'en'
  },
  notifications: {
    scope: 'mentions',
    emails: { communication: false, marketing: false, social: true, security: true },
    separateMobileSettings: false
  },
  display: {
    sidebarItems: ['recents', 'home']
  }
}
