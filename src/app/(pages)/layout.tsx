'use client'

// React Imports
import { Suspense, useState } from 'react'
import type { ReactNode } from 'react'

// Component Imports
import CommandMenu from '@/components/layout/CommandMenu'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

// Util Imports
import { cn } from '@/lib/utils'
import { pageContainer } from '@/components/global/variants/container'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [themeSettingsOpen, setThemeSettingsOpen] = useState(false)

  return (
    <div className='flex h-full w-full min-w-0'>
      <Suspense>
        <Sidebar />
      </Suspense>
      <SidebarInset className='flex min-w-0 flex-1 flex-col'>
        <Header themeSettingsOpen={themeSettingsOpen} onThemeSettingsOpenChange={setThemeSettingsOpen} />
        <main id='content' tabIndex={-1} className={cn(pageContainer(), 'flex-1 py-6 outline-none')}>
          {children}
        </main>
        <Toaster />
        <Footer />
      </SidebarInset>
      <CommandMenu onOpenThemeSettings={() => setThemeSettingsOpen(true)} />
    </div>
  )
}

export default PagesLayout
