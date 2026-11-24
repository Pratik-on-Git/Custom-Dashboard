'use client'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { MailPlusIcon, SendIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Type Imports
import type { UserRole } from '@/types/apps/user-types'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconTile } from '@/components/global/micro/icon-tile'
import { SelectField } from '@/components/global/inputs/select-field'

const roles: UserRole[] = ['Admin', 'Editor', 'Subscriber', 'Maintainer', 'Guest']

const inviteSchema = z.object({
  email: z.string().min(1, 'Please enter an email to invite.').email('Enter a valid email.'),
  role: z.enum(['Admin', 'Editor', 'Subscriber', 'Maintainer', 'Guest'], {
    errorMap: () => ({ message: 'Role is required.' })
  }),
  note: z.string().max(300, 'Keep the note under 300 characters.').optional()
})

export type InviteValues = z.infer<typeof inviteSchema>

type InviteUserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (values: InviteValues) => void
}

/** Invite someone by email with a role and an optional personal note. */
const InviteUserDialog = ({ open, onOpenChange, onInvite }: InviteUserDialogProps) => {
  const form = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '', role: undefined, note: '' }
  })

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        if (!next) form.reset()
        onOpenChange(next)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='flex-row items-start gap-3'>
          <IconTile tone='primary'>
            <MailPlusIcon />
          </IconTile>
          <div className='flex flex-col gap-1.5'>
            <DialogTitle>Invite user</DialogTitle>
            <DialogDescription>
              Send an email invitation to join your team. The role sets their access level.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          id='invite-user-form'
          onSubmit={form.handleSubmit(values => {
            onInvite(values)
            form.reset()
          })}
        >
          <FieldGroup className='gap-4'>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='invite-email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='invite-email'
                    type='email'
                    placeholder='jane.doe@example.com'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='role'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='invite-role'>Role</FieldLabel>
                  <SelectField
                    id='invite-role'
                    placeholder='Select a role'
                    options={roles.map(role => ({ value: role, label: role }))}
                    value={field.value}
                    onValueChange={field.onChange}
                    invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='note'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='invite-note'>Personal note (optional)</FieldLabel>
                  <Textarea
                    {...field}
                    id='invite-note'
                    className='resize-none'
                    placeholder='Add a personal note to your invitation'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant='outline' />}>Cancel</DialogClose>
          <Button type='submit' form='invite-user-form'>
            Send invite
            <SendIcon data-icon='inline-end' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InviteUserDialog
