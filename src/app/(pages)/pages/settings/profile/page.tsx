// Component Imports
import ProfileForm from '@/views/pages/settings/sections/profile-form'

// Data Imports
import { settings } from '@/fake-db/pages/settings'

const ProfileSettingsPage = () => {
  return <ProfileForm defaults={settings.profile} verifiedEmails={settings.verifiedEmails} />
}

export default ProfileSettingsPage
