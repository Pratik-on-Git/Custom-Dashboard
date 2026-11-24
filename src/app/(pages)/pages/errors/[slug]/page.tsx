// Next Imports
import { notFound } from 'next/navigation'

// Component Imports
import ErrorView from '@/views/pages/errors'

// Config Imports
import { errorSlugs, type ErrorSlug } from '@/views/pages/errors/config'

export const generateStaticParams = () => errorSlugs.map(slug => ({ slug }))

const ErrorPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  if (!errorSlugs.includes(slug as ErrorSlug)) notFound()

  return <ErrorView slug={slug as ErrorSlug} />
}

export default ErrorPage
