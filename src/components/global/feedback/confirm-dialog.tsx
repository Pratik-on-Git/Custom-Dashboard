'use client'

// React Imports
import { useId, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

// Third-party Imports
import { TriangleAlertIcon } from 'lucide-react'

// Component Imports
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  onConfirm: () => void

  /** `destructive` adds a warning media + red confirm button (deletes, sign out…) */
  variant?: 'default' | 'destructive'
  confirmLabel?: ReactNode
  cancelLabel?: ReactNode

  /** Require typing this exact text before the confirm button unlocks (e.g. a username or "DELETE") */
  confirmText?: string

  /** Show the "can't be undone" warning box (defaults to on when `confirmText` is set) */
  showWarning?: boolean
  isLoading?: boolean

  /** Extra content between the description and the buttons */
  children?: ReactNode
}

/**
 * Global: confirmation modal built on the ui AlertDialog. Variations: `variant` (default | destructive) and the
 * optional type-to-confirm guard (`confirmText`) for irreversible actions.
 */
const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  variant = 'default',
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
  confirmText,
  showWarning = Boolean(confirmText),
  isLoading = false,
  children
}: ConfirmDialogProps) => {
  const inputId = useId()
  const [typed, setTyped] = useState('')
  const isDestructive = variant === 'destructive'
  const isLocked = Boolean(confirmText) && typed.trim() !== confirmText

  const handleOpenChange = (next: boolean) => {
    if (!next) setTyped('')
    onOpenChange(next)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (isLocked || isLoading) return
    onConfirm()
    setTyped('')
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className='grid gap-6'>
          <AlertDialogHeader>
            {isDestructive && (
              <AlertDialogMedia className='bg-destructive/10 text-destructive'>
                <TriangleAlertIcon />
              </AlertDialogMedia>
            )}
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && <AlertDialogDescription render={<div />}>{description}</AlertDialogDescription>}
          </AlertDialogHeader>

          {(confirmText || showWarning || children) && (
            <div className='flex flex-col gap-4'>
              {children}
              {confirmText && (
                <Field className='gap-2'>
                  <FieldLabel htmlFor={inputId}>
                    Type <span className='font-mono font-semibold'>{confirmText}</span> to confirm
                  </FieldLabel>
                  <Input
                    id={inputId}
                    value={typed}
                    onChange={event => setTyped(event.target.value)}
                    autoComplete='off'
                    autoFocus
                  />
                </Field>
              )}
              {showWarning && (
                <Alert variant='destructive'>
                  <TriangleAlertIcon />
                  <AlertTitle>This can&apos;t be undone</AlertTitle>
                  <AlertDescription>Please be careful — this operation can&apos;t be rolled back.</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>{cancelLabel}</AlertDialogCancel>
            <Button type='submit' variant={isDestructive ? 'destructive' : 'default'} disabled={isLocked || isLoading}>
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
export type { ConfirmDialogProps }
