'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { PlugZapIcon } from 'lucide-react'
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { toast } from 'sonner'

// Type Imports
import type { Integration } from '@/types/apps/integration-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/global/layout/page-header'
import { EmptyState } from '@/components/global/feedback/empty-state'
import { SearchInput } from '@/components/global/inputs/search-input'
import { SegmentedControl } from '@/components/global/inputs/segmented-control'
import { SelectField } from '@/components/global/inputs/select-field'
import IntegrationCard from './sections/integration-card'

// Config Imports
import { filterOptions, sortOptions } from './config'

/** Search, filter and sort live in the URL so a filtered view can be shared. */
const queryParsers = {
  q: parseAsString.withDefault(''),
  type: parseAsStringLiteral(['all', 'connected', 'not-connected'] as const).withDefault('all'),
  sort: parseAsStringLiteral(['asc', 'desc'] as const).withDefault('asc')
}

const IntegrationsApp = ({ initialIntegrations }: { initialIntegrations: Integration[] }) => {
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [{ q, type, sort }, setQuery] = useQueryStates(queryParsers, { history: 'replace' })

  const visible = integrations
    .filter(app => (type === 'connected' ? app.connected : type === 'not-connected' ? !app.connected : true))
    .filter(app => app.name.toLowerCase().includes(q.trim().toLowerCase()))
    .toSorted((a, b) => (sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))

  const connectedCount = integrations.filter(app => app.connected).length

  const toggle = (target: Integration) => {
    setIntegrations(current => current.map(app => (app.id === target.id ? { ...app, connected: !app.connected } : app)))
    toast.success(`${target.name} ${target.connected ? 'disconnected' : 'connected'}`)
  }

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='Integrations'
        description={`Connect the tools your team already uses. ${connectedCount} of ${integrations.length} connected.`}
      />

      <div className='flex flex-wrap items-center gap-3'>
        <SearchInput
          value={q}
          onValueChange={value => setQuery({ q: value || null })}
          placeholder='Filter apps…'
          className='w-full sm:w-64'
        />
        <SegmentedControl
          ariaLabel='Connection status'
          options={filterOptions}
          value={type}
          onValueChange={value => setQuery({ type: value })}
        />
        <SelectField
          className='ms-auto w-36'
          options={sortOptions}
          value={sort}
          onValueChange={value => setQuery({ sort: value })}
        />
      </div>

      {visible.length ? (
        <ul className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {visible.map(app => (
            <li key={app.id} className='grid'>
              <IntegrationCard integration={app} onToggle={toggle} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<PlugZapIcon />}
          title='No apps match'
          description='Try another name, or show all apps.'
          actions={
            <Button variant='outline' onClick={() => setQuery({ q: null, type: null })}>
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  )
}

export default IntegrationsApp
