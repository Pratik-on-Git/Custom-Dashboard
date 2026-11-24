// Third-party Imports
import { TelescopeIcon } from 'lucide-react'

// Component Imports
import { EmptyState } from '@/components/global/feedback/empty-state'
import { ActionLink } from '@/components/global/micro/action-link'

// Config Imports
import themeConfig from '@/configs/themeConfig'

/** Placeholder until the help center exists — the reusable "coming soon" page. */
const HelpCenter = () => (
  <EmptyState
    size='page'
    icon={<TelescopeIcon />}
    title='Coming soon'
    description="This page hasn't been built yet. Stay tuned!"
    actions={
      <ActionLink href={themeConfig.homePageUrl} variant='outline' size='lg'>
        Back to dashboard
      </ActionLink>
    }
  />
)

export default HelpCenter
