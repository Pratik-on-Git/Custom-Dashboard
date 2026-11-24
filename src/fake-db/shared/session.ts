// Type Imports
import type { SessionUser, Team } from '@/types/shared/session-types'

/** The signed-in user shown in the header profile menu and the sidebar footer. */
export const currentUser: SessionUser = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  imageUrl: '/images/avatars/avatar-1.webp',
  initials: 'JD'
}

/** Workspaces offered by the sidebar team switcher. */
export const teams: Team[] = [
  { id: 'team-1', name: 'AdminCN', plan: 'Next.js + shadcn', logo: 'command' },
  { id: 'team-2', name: 'Acme Inc', plan: 'Enterprise', logo: 'gallery' },
  { id: 'team-3', name: 'Acme Corp.', plan: 'Startup', logo: 'waveform' }
]
