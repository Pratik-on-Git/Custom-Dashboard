// Type Imports
import type { ReactNode } from 'react'

// Component Imports
import { PageHeader } from '@/components/global/layout/page-header'
import { SubNav } from '@/components/global/navigation/sub-nav'

// Config Imports
import { settingsNav } from './config'

/** Settings shell: page header, section navigation and the active settings panel. */
const SettingsLayout = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col gap-6'>
    <PageHeader title='Settings' description='Manage your account settings and set e-mail preferences.' />
    <div className='grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]'>
      <aside className='lg:sticky lg:top-24 lg:self-start'>
        <SubNav items={settingsNav} ariaLabel='Settings sections' />
      </aside>
      <div className='min-w-0 lg:max-w-2xl'>{children}</div>
    </div>
  </div>
)

export default SettingsLayout
