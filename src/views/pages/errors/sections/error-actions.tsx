'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { ArrowLeftIcon, HouseIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { ActionLink } from '@/components/global/micro/action-link'

type ErrorActionsProps = {
  homeHref: string

  /** Show "Go back" + "Back to home"; otherwise only a status link (maintenance) */
  canRetry: boolean
}

const ErrorActions = ({ homeHref, canRetry }: ErrorActionsProps) => {
  const router = useRouter()

  if (!canRetry) {
    return (
      <ActionLink href='https://status.example.com' variant='outline' size='lg'>
        Check status
      </ActionLink>
    )
  }

  return (
    <>
      <Button variant='outline' size='lg' onClick={() => router.back()}>
        <ArrowLeftIcon data-icon='inline-start' className='rtl:rotate-180' />
        Go back
      </Button>
      <ActionLink href={homeHref} variant='default' size='lg' icon={<HouseIcon data-icon='inline-end' />}>
        Back to home
      </ActionLink>
    </>
  )
}

export default ErrorActions
