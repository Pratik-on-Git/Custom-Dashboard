'use client'

// Third-party Imports
import { useTheme } from 'next-themes'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

// Type Imports
import type { AppFont } from '@/types/preferences-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { SectionCard } from '@/components/global/layout/section-card'
import { ChoiceCards } from '@/components/global/inputs/choice-cards'
import { SelectField } from '@/components/global/inputs/select-field'
import { LayoutPreview } from '@/components/global/micro/layout-preview'

// Context Imports
import { usePreferences } from '@/contexts/preferences-context'

type ThemeValue = 'light' | 'dark' | 'system'

type AppearanceValues = {
  font: AppFont
  theme: ThemeValue
}

const fontOptions: { value: AppFont; label: string }[] = [
  { value: 'geist', label: 'Geist' },
  { value: 'inter', label: 'Inter' },
  { value: 'manrope', label: 'Manrope' }
]

const themeOptions = (['light', 'dark', 'system'] as const).map(value => ({
  value,
  label: value[0].toUpperCase() + value.slice(1),
  preview: <LayoutPreview scheme={value} />
}))

const AppearanceForm = () => {
  const { theme, setTheme } = useTheme()
  const { font, setPreference } = usePreferences()

  // `values` keeps the form in sync once next-themes has read the stored theme on the client
  const form = useForm<AppearanceValues>({
    values: { font, theme: (theme as ThemeValue | undefined) ?? 'system' },
    resetOptions: { keepDirtyValues: true }
  })

  const onSubmit = (values: AppearanceValues) => {
    setPreference('font', values.font)
    setTheme(values.theme)
    toast.success('Appearance updated')
  }

  return (
    <SectionCard
      title='Appearance'
      description='Customise the look of the app. Switch between light and dark themes.'
      headingId='appearance-heading'
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='font'
            control={form.control}
            render={({ field }) => (
              <Field className='gap-2'>
                <FieldLabel htmlFor='appearance-font'>Font</FieldLabel>
                <SelectField
                  id='appearance-font'
                  className='w-60'
                  options={fontOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <FieldDescription>The typeface used across the dashboard.</FieldDescription>
              </Field>
            )}
          />

          <Controller
            name='theme'
            control={form.control}
            render={({ field }) => (
              <FieldSet className='gap-3'>
                <FieldLegend variant='label' className='mb-0'>
                  Theme
                </FieldLegend>
                <FieldDescription>Select the theme for the dashboard.</FieldDescription>
                <ChoiceCards
                  ariaLabel='Theme'
                  size='md'
                  className='max-w-lg'
                  options={themeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FieldSet>
            )}
          />

          <Button type='submit' className='self-start'>
            Update preferences
          </Button>
        </FieldGroup>
      </form>
    </SectionCard>
  )
}

export default AppearanceForm
