// Component Imports
import AccountForm from '@/views/pages/settings/sections/account-form'

// Data Imports
import { settings } from '@/fake-db/pages/settings'

const AccountSettingsPage = () => {
  return <AccountForm defaults={settings.account} />
}

export default AccountSettingsPage
