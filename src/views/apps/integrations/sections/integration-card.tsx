// Third-party Imports
import { PlugIcon, UnplugIcon } from 'lucide-react'

// Type Imports
import type { Integration } from '@/types/apps/integration-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { SectionCard } from '@/components/global/layout/section-card'
import { IconTile } from '@/components/global/micro/icon-tile'
import { StatusPill } from '@/components/global/data-display/status-pill'

// Config Imports
import { integrationLogos } from '../config'

type IntegrationCardProps = {
  integration: Integration
  onToggle: (integration: Integration) => void
}

const IntegrationCard = ({ integration, onToggle }: IntegrationCardProps) => (
  <SectionCard
    interactive
    headingId={`integration-${integration.id}`}
    leading={
      <IconTile variant='muted' size='lg'>
        {integrationLogos[integration.id]}
      </IconTile>
    }
    title={integration.name}
    description={integration.category}
    action={
      integration.connected ? (
        <StatusPill tone='success' size='sm'>
          Connected
        </StatusPill>
      ) : null
    }
    contentClassName='justify-between'
  >
    <p className='text-muted-foreground line-clamp-2 text-sm'>{integration.description}</p>
    <Button
      variant={integration.connected ? 'outline' : 'default'}
      className='self-start'
      onClick={() => onToggle(integration)}
      aria-label={`${integration.connected ? 'Disconnect' : 'Connect'} ${integration.name}`}
    >
      {integration.connected ? <UnplugIcon data-icon='inline-start' /> : <PlugIcon data-icon='inline-start' />}
      {integration.connected ? 'Disconnect' : 'Connect'}
    </Button>
  </SectionCard>
)

export default IntegrationCard
