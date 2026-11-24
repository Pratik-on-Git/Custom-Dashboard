// Component Imports
import DisplayForm from '@/views/pages/settings/sections/display-form'

// Data Imports
import { settings } from '@/fake-db/pages/settings'

const DisplaySettingsPage = () => {
  return <DisplayForm defaults={settings.display} />
}

export default DisplaySettingsPage
