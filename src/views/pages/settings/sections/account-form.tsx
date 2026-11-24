'use client'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Type Imports
import type { AccountSettings } from '@/types/pages/settings-types'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SectionCard } from '@/components/global/layout/section-card'
import { DatePicker } from '@/components/global/inputs/date-picker'

// Config Imports
import { languages } from '../config'

// Util Imports
import { showSubmittedData } from '@/utils/toast-utils'

const accountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(30, 'Name must not be longer than 30 characters.'),
  dateOfBirth: z
    .string()
    .optional()
    .refine(value => Boolean(value), 'Please select your date of birth.'),
  language: z.string().min(1, 'Please select a language.')
})

const AccountForm = ({ defaults }: { defaults: AccountSettings }) => {
  const form = useForm<AccountSettings>({ resolver: zodResolver(accountSchema), defaultValues: defaults })

  return (
    <SectionCard
      title='Account'
      description='Update your account settings. Set your preferred language and date of birth.'
      headingId='account-heading'
    >
      <form onSubmit={form.handleSubmit(values => showSubmittedData(values))}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor='account-name'>Name</FieldLabel>
                <Input {...field} id='account-name' placeholder='Your name' aria-invalid={fieldState.invalid} />
                <FieldDescription>Shown on your profile and in emails.</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='dateOfBirth'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor='account-dob'>Date of birth</FieldLabel>
                <DatePicker
                  id='account-dob'
                  value={field.value ? parseISO(field.value) : undefined}
                  onValueChange={date => field.onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
                  toDate={new Date()}
                  invalid={fieldState.invalid}
                />
                <FieldDescription>Used to calculate your age.</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='language'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor='account-language'>Language</FieldLabel>
                <Combobox
                  items={languages}
                  value={languages.find(language => language.value === field.value) ?? null}
                  onValueChange={language => field.onChange(language?.value ?? '')}
                  itemToStringLabel={language => language.label}
                >
                  <ComboboxInput
                    id='account-language'
                    placeholder='Search language…'
                    className='w-60'
                    aria-invalid={fieldState.invalid}
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No language found.</ComboboxEmpty>
                    <ComboboxList>
                      {(language: (typeof languages)[number]) => (
                        <ComboboxItem key={language.value} value={language}>
                          {language.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <FieldDescription>The language used across the dashboard.</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button type='submit' className='self-start'>
            Update account
          </Button>
        </FieldGroup>
      </form>
    </SectionCard>
  )
}

export default AccountForm
