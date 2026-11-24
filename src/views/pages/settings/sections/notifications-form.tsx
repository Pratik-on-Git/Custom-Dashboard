'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'

// Type Imports
import type { NotificationSettings } from '@/types/pages/settings-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { SectionCard } from '@/components/global/layout/section-card'

// Config Imports
import { emailNotifications, notificationScopes } from '../config'

// Util Imports
import { showSubmittedData } from '@/utils/toast-utils'

const NotificationsForm = ({ defaults }: { defaults: NotificationSettings }) => {
  const form = useForm<NotificationSettings>({ defaultValues: defaults })

  return (
    <SectionCard
      title='Notifications'
      description='Configure how you receive notifications.'
      headingId='notifications-heading'
    >
      <form onSubmit={form.handleSubmit(values => showSubmittedData(values))}>
        <FieldGroup>
          <Controller
            name='scope'
            control={form.control}
            render={({ field }) => (
              <FieldSet className='gap-3'>
                <FieldLegend variant='label' className='mb-0'>
                  Notify me about…
                </FieldLegend>
                <RadioGroup value={field.value} onValueChange={field.onChange} className='gap-2.5'>
                  {notificationScopes.map(scope => (
                    <Field key={scope.value} orientation='horizontal' className='gap-2'>
                      <RadioGroupItem value={scope.value} id={`scope-${scope.value}`} />
                      <FieldLabel htmlFor={`scope-${scope.value}`} className='font-normal'>
                        {scope.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
            )}
          />

          <FieldSet className='gap-3'>
            <FieldLegend>Email notifications</FieldLegend>
            {emailNotifications.map(item => (
              <Controller
                key={item.id}
                name={`emails.${item.id}`}
                control={form.control}
                render={({ field }) => (
                  <FieldLabel htmlFor={`email-${item.id}`}>
                    <Field orientation='horizontal' data-disabled={item.locked || undefined}>
                      <FieldContent>
                        <FieldTitle>{item.title}</FieldTitle>
                        <FieldDescription>{item.description}</FieldDescription>
                      </FieldContent>
                      <Switch
                        id={`email-${item.id}`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={item.locked}
                      />
                    </Field>
                  </FieldLabel>
                )}
              />
            ))}
          </FieldSet>

          <Controller
            name='separateMobileSettings'
            control={form.control}
            render={({ field }) => (
              <Field orientation='horizontal'>
                <Checkbox id='mobile-settings' checked={field.value} onCheckedChange={field.onChange} />
                <FieldContent>
                  <FieldLabel htmlFor='mobile-settings'>Use different settings for my mobile devices</FieldLabel>
                  <FieldDescription>
                    Manage mobile notifications on the <Link href='/pages/settings/display'>display settings</Link>{' '}
                    page.
                  </FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <Button type='submit' className='self-start'>
            Update notifications
          </Button>
        </FieldGroup>
      </form>
    </SectionCard>
  )
}

export default NotificationsForm
