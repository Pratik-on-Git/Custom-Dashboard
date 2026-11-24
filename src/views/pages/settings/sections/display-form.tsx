'use client'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Type Imports
import type { DisplaySettings, SidebarItemId } from '@/types/pages/settings-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { SectionCard } from '@/components/global/layout/section-card'

// Config Imports
import { sidebarItems } from '../config'

// Util Imports
import { showSubmittedData } from '@/utils/toast-utils'

const displaySchema = z.object({
  sidebarItems: z
    .array(z.enum(['recents', 'home', 'applications', 'desktop', 'downloads', 'documents']))
    .min(1, 'You have to select at least one item.')
})

const DisplayForm = ({ defaults }: { defaults: DisplaySettings }) => {
  const form = useForm<DisplaySettings>({ resolver: zodResolver(displaySchema), defaultValues: defaults })

  return (
    <SectionCard
      title='Display'
      description='Turn items on or off to control what is shown in the app.'
      headingId='display-heading'
    >
      <form onSubmit={form.handleSubmit(values => showSubmittedData(values))}>
        <FieldGroup>
          <Controller
            name='sidebarItems'
            control={form.control}
            render={({ field, fieldState }) => {
              const toggle = (id: SidebarItemId, checked: boolean) =>
                field.onChange(checked ? [...field.value, id] : field.value.filter(value => value !== id))

              return (
                <FieldSet data-invalid={fieldState.invalid} className='gap-3'>
                  <FieldLegend className='mb-0'>Sidebar</FieldLegend>
                  <FieldDescription>Select the items you want to display in the sidebar.</FieldDescription>
                  <div className='flex flex-col gap-2.5' data-slot='checkbox-group'>
                    {sidebarItems.map(item => (
                      <Field key={item.id} orientation='horizontal' className='gap-2'>
                        <Checkbox
                          id={`display-${item.id}`}
                          checked={field.value.includes(item.id)}
                          onCheckedChange={checked => toggle(item.id, checked)}
                        />
                        <FieldLabel htmlFor={`display-${item.id}`} className='font-normal'>
                          {item.label}
                        </FieldLabel>
                      </Field>
                    ))}
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </FieldSet>
              )
            }}
          />

          <Button type='submit' className='self-start'>
            Update display
          </Button>
        </FieldGroup>
      </form>
    </SectionCard>
  )
}

export default DisplayForm
