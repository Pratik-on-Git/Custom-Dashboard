'use client'

// Type Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Util Imports
import { cn } from '@/lib/utils'

const choiceCardsVariants = cva('grid', {
  variants: {
    columns: {
      2: 'grid-cols-2',
      3: 'grid-cols-3'
    },
    size: {
      sm: 'gap-3',
      md: 'gap-5'
    }
  },
  defaultVariants: {
    columns: 3,
    size: 'sm'
  }
})

type ChoiceCardOption<TValue extends string> = {
  value: TValue
  label: string

  /** Visual of the option (e.g. a `LayoutPreview`) */
  preview: ReactNode
}

type ChoiceCardsProps<TValue extends string> = VariantProps<typeof choiceCardsVariants> & {
  options: ChoiceCardOption<TValue>[]
  value: TValue
  onValueChange: (value: TValue) => void
  ariaLabel: string
  className?: string
}

/**
 * Global: single-choice picker whose options are preview cards (theme, layout, density…). Keyboard and screen-reader
 * behaviour come from the ui RadioGroup; the selected card gets a primary ring.
 */
const ChoiceCards = <TValue extends string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  columns,
  size,
  className
}: ChoiceCardsProps<TValue>) => (
  <RadioGroup
    aria-label={ariaLabel}
    value={value}
    onValueChange={next => onValueChange(next as TValue)}
    className={cn(choiceCardsVariants({ columns, size }), className)}
  >
    {options.map(option => (
      <label key={option.value} className='group/choice flex min-w-0 cursor-pointer flex-col gap-1.5'>
        <span className='ring-border group-has-data-checked/choice:ring-primary group-has-focus-visible/choice:ring-ring/50 relative block overflow-hidden rounded-lg ring-1 transition-shadow group-has-focus-visible/choice:ring-3 group-has-data-checked/choice:ring-2'>
          <RadioGroupItem value={option.value} className='bg-background absolute inset-e-1.5 top-1.5 z-10' />
          {option.preview}
        </span>
        <span
          className={cn(
            'text-muted-foreground group-has-data-checked/choice:text-foreground truncate',
            size === 'md' ? 'text-sm' : 'text-xs'
          )}
        >
          {option.label}
        </span>
      </label>
    ))}
  </RadioGroup>
)

export { ChoiceCards, choiceCardsVariants }
export type { ChoiceCardOption, ChoiceCardsProps }
