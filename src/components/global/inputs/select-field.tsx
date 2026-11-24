'use client'

// Third-party Imports
import { LoaderCircleIcon } from 'lucide-react'

// Component Imports
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Util Imports
import { cn } from '@/lib/utils'

type SelectFieldOption<TValue extends string = string> = {
  label: string
  value: TValue
}

type SelectFieldProps<TValue extends string = string> = {
  options: SelectFieldOption<TValue>[]
  value: TValue | '' | null | undefined
  onValueChange: (value: TValue) => void
  placeholder?: string

  /** Show a spinner instead of the options (options still loading) */
  isLoading?: boolean
  disabled?: boolean
  invalid?: boolean
  id?: string
  size?: 'sm' | 'default'
  className?: string
}

/**
 * Global: a ready-made single select from an `options` array — placeholder, loading and invalid states included.
 * Wraps the ui Select; spread react-hook-form `field.value` / `field.onChange` into `value` / `onValueChange`.
 */
const SelectField = <TValue extends string = string>({
  options,
  value,
  onValueChange,
  placeholder = 'Select',
  isLoading = false,
  disabled,
  invalid,
  id,
  size,
  className
}: SelectFieldProps<TValue>) => (
  <Select
    items={options}
    value={value || null}
    onValueChange={next => {
      if (next) onValueChange(next as TValue)
    }}
    disabled={disabled}
  >
    <SelectTrigger id={id} size={size} aria-invalid={invalid || undefined} className={cn('w-full', className)}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {isLoading ? (
        <div className='text-muted-foreground flex items-center justify-center gap-2 py-4 text-sm'>
          <LoaderCircleIcon className='size-4 animate-spin motion-reduce:animate-none' />
          Loading…
        </div>
      ) : (
        <SelectGroup>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      )}
    </SelectContent>
  </Select>
)

export { SelectField }
export type { SelectFieldOption, SelectFieldProps }
