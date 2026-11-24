// React Imports
import type { ReactNode } from 'react'

// Component Imports
import SettingsLayout from '@/views/pages/settings'

const Layout = ({ children }: { children: ReactNode }) => {
  return <SettingsLayout>{children}</SettingsLayout>
}

export default Layout
