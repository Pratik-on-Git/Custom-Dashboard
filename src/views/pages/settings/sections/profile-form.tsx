'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, XIcon } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

// Type Imports
import type { ProfileSettings } from '@/types/pages/settings-types'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SectionCard } from '@/components/global/layout/section-card'
import { SelectField } from '@/components/global/inputs/select-field'

// Util Imports
import { showSubmittedData } from '@/utils/toast-utils'

const profileSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .max(30, 'Username must not be longer than 30 characters.'),
  email: z.string().min(1, 'Please select an email to display.').email(),
  bio: z.string().min(4, 'Bio must be at least 4 characters.').max(160, 'Keep your bio under 160 characters.'),
  urls: z.array(z.object({ value: z.string().url('Please enter a valid URL.') }))
})

type ProfileFormProps = {
  defaults: ProfileSettings
  verifiedEmails: string[]
}

const ProfileForm = ({ defaults, verifiedEmails }: ProfileFormProps) => {
  const form = useForm<ProfileSettings>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaults,
    mode: 'onChange'
  })

  const urls = useFieldArray({ control: form.control, name: 'urls' })

  return (
    <SectionCard title='Profile' description='This is how others will see you on the site.' headingId='profile-heading'>
      <form onSubmit={form.handleSubmit(values => showSubmittedData(values))}>
        <FieldGroup>
          <Controller
            name='username'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor='profile-username'>Username</FieldLabel>
                <Input {...field} id='profile-username' aria-invalid={fieldState.invalid} />
                <FieldDescription>
                  Your public display name. You can only change this once every 30 days.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor='profile-email'>Email</FieldLabel>
                <SelectField
                  id='profile-email'
                  placeholder='Select a verified email to display'
                  options={verifiedEmails.map(email => ({ value: email, label: email }))}
                  value={field.value}
                  onValueChange={field.onChange}
                  invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Manage verified addresses in your <Link href='/pages/settings/account'>account settings</Link>.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='bio'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor='profile-bio'>Bio</FieldLabel>
                <Textarea
                  {...field}
                  id='profile-bio'
                  className='resize-none'
                  placeholder='Tell us a little bit about yourself'
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>You can @mention other users and organisations.</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <FieldSet className='gap-3'>
            <FieldLegend variant='label' className='mb-0'>
              URLs
            </FieldLegend>
            <FieldDescription>Add links to your website, blog or social media profiles.</FieldDescription>
            {urls.fields.map((item, index) => (
              <Controller
                key={item.id}
                name={`urls.${index}.value`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className='gap-2'>
                    <div className='flex gap-2'>
                      <Input
                        {...field}
                        aria-label={`URL ${index + 1}`}
                        placeholder='https://'
                        aria-invalid={fieldState.invalid}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => urls.remove(index)}
                        aria-label={`Remove URL ${index + 1}`}
                      >
                        <XIcon />
                      </Button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            ))}
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='self-start'
              onClick={() => urls.append({ value: '' })}
            >
              <PlusIcon data-icon='inline-start' />
              Add URL
            </Button>
          </FieldSet>

          <Button type='submit' className='self-start'>
            Update profile
          </Button>
        </FieldGroup>
      </form>
    </SectionCard>
  )
}

export default ProfileForm
