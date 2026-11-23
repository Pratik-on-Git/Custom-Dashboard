'use client'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Util Imports
import { cn } from '@/lib/utils'

const segmentedControlVariants = cva('bg-muted gap-0.5 rounded-lg p-0.5', {
  variants: {
    size: {
      sm: '*:h-7 *:px-2.5 *:text-xs',
      md: '*:h-8 *:px-3 *:text-sm'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type SegmentedOption<TValue extends string> = {
  value: TValue
  label: string
}

type SegmentedControlProps<TValue extends string> = VariantProps<typeof segmentedControlVariants> & {
  options: SegmentedOption<TValue>[]
  value: TValue
  onValueChange: (value: TValue) => void
  ariaLabel: string
  className?: string
}

/** Global: single-choice pill switch (units, ranges, views). Wraps the ui ToggleGroup. */
const SegmentedControl = <TValue extends string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  size,
  className
}: SegmentedControlProps<TValue>) => (
  <ToggleGroup
    aria-label={ariaLabel}
    spacing={0}
    value={[value]}
    onValueChange={next => {
      // Keep one option always selected
      if (next.length) onValueChange(next[next.length - 1] as TValue)
    }}
    className={cn(segmentedControlVariants({ size }), className)}
  >
    {options.map(option => (
      <ToggleGroupItem
        key={option.value}
        value={option.value}
        className='text-muted-foreground aria-pressed:bg-background aria-pressed:text-foreground rounded-md! hover:bg-transparent aria-pressed:shadow-xs'
      >
        {option.label}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
)

export { SegmentedControl, segmentedControlVariants }
export type { SegmentedControlProps, SegmentedOption }
