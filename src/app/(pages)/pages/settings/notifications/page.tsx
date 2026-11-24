// Component Imports
import NotificationsForm from '@/views/pages/settings/sections/notifications-form'

// Data Imports
import { settings } from '@/fake-db/pages/settings'

const NotificationSettingsPage = () => {
  return <NotificationsForm defaults={settings.notifications} />
}

export default NotificationSettingsPage
