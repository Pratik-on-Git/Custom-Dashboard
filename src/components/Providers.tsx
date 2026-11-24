// React Imports
import type { ReactNode } from 'react'

// Type Imports
import type { Preferences } from '@/types/preferences-types'

// Component Imports
import { ThemeProvider } from './ThemeProvider'
import { SidebarProvider } from './ui/sidebar'
import { TooltipProvider } from './ui/tooltip'
import { PreferencesProvider } from '@/contexts/preferences-context'
import { SearchProvider } from '@/contexts/search-context'

type Props = {
  children: ReactNode
  sidebarDefaultOpen?: boolean
  preferences: Preferences
}

const Providers = ({ children, sidebarDefaultOpen, preferences }: Props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true}>
      <PreferencesProvider initial={preferences}>
        <SearchProvider>
          <TooltipProvider>
            <SidebarProvider defaultOpen={sidebarDefaultOpen}>{children}</SidebarProvider>
          </TooltipProvider>
        </SearchProvider>
      </PreferencesProvider>
    </ThemeProvider>
  )
}

export default Providers
