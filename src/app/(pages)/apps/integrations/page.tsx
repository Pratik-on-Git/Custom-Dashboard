// Component Imports
import IntegrationsApp from '@/views/apps/integrations'

// Data Imports
import { integrations } from '@/fake-db/apps/integrations'

const IntegrationsPage = () => {
  return <IntegrationsApp initialIntegrations={integrations} />
}

export default IntegrationsPage
