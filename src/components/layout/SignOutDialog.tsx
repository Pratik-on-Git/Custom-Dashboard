'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// Component Imports
import { ConfirmDialog } from '@/components/global/feedback/confirm-dialog'

type SignOutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Confirms sign-out, then sends the user to the login page. Hook your auth `signOut()` into `onConfirm`. */
const SignOutDialog = ({ open, onOpenChange }: SignOutDialogProps) => {
  const router = useRouter()

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      variant='destructive'
      title='Sign out?'
      description='You will need to sign in again to access your account.'
      confirmLabel='Sign out'
      onConfirm={() => {
        onOpenChange(false)
        router.push('/pages/auth/login')
      }}
    />
  )
}

export default SignOutDialog
