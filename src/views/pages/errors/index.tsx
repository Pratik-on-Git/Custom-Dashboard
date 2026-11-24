// Component Imports
import { EmptyState } from '@/components/global/feedback/empty-state'
import ErrorActions from './sections/error-actions'

// Config Imports
import { errorPages, homeHref, type ErrorSlug } from './config'

/** In-app error page (401, 403, 404, 500, 503) — keeps the sidebar and header around it. */
const ErrorView = ({ slug }: { slug: ErrorSlug }) => {
  const page = errorPages[slug]

  return (
    <EmptyState
      size='page'
      code={page.code}
      title={page.title}
      description={page.description}
      actions={<ErrorActions homeHref={homeHref} canRetry={page.canRetry} />}
    />
  )
}

export default ErrorView
