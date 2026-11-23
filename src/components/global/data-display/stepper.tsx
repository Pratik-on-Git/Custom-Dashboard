// Type Imports
import type { CSSProperties } from 'react'

// Third-party Imports
import { CheckIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const stepperDotVariants = cva(
  'relative flex size-(--dot) shrink-0 items-center justify-center rounded-full border-2 transition-colors after:rounded-full after:bg-(--tone)',
  {
    variants: {
      state: {
        done: 'text-background border-(--tone) bg-(--tone)',
        current: 'bg-card border-(--tone)',
        upcoming: 'bg-card border-border'
      },
      size: {
        sm: 'after:size-1.5 [&_svg]:size-3',
        md: 'after:size-2 [&_svg]:size-3',
        lg: 'after:size-2.5 [&_svg]:size-3.5'
      }
    },
    compoundVariants: [
      // Only the current step shows the inner dot
      { state: ['done', 'upcoming'], className: 'after:hidden' }
    ],
    defaultVariants: {
      state: 'upcoming',
      size: 'md'
    }
  }
)

const stepperLabelVariants = cva('leading-tight whitespace-nowrap', {
  variants: {
    state: {
      done: 'text-foreground font-medium',
      current: 'text-foreground font-medium',
      upcoming: 'text-muted-foreground'
    },
    size: {
      sm: 'text-[11px]',
      md: 'text-xs',
      lg: 'text-[13px]'
    }
  },
  defaultVariants: {
    state: 'upcoming',
    size: 'md'
  }
})

/** Dot diameter per size — drives the dot, the connector offset and the label offset. */
const DOT_SIZE = { sm: '1.25rem', md: '1.5rem', lg: '1.75rem' } as const

type StepperSize = NonNullable<VariantProps<typeof stepperDotVariants>['size']>

/**
 * Layout variation.
 * `spread` — first dot flush left, last dot flush right, equal gaps; edge labels align to the edges (default).
 * `center` — equal columns, every dot and label centred in its column.
 */
type StepperAlign = 'spread' | 'center'

type StepperProps = {
  steps: string[]

  /** Index of the step in progress; everything before it is done. Use `steps.length` when all are done. */
  current: number
  size?: StepperSize
  align?: StepperAlign
  tone?: Tone
  className?: string
}

const stateOf = (index: number, current: number) =>
  index < current ? 'done' : index === current ? 'current' : ('upcoming' as const)

const connectorClass = (index: number, current: number) =>
  cn('h-0.5 transition-colors', index < current ? 'bg-(--tone)' : 'bg-border')

/**
 * Global: horizontal stepper. Done = filled + check, current = ring + inner dot, upcoming = neutral ring.
 * Variations: `size` (sm/md/lg) and `align` (spread/center).
 */
const Stepper = ({ steps, current, tone = 'primary', size = 'md', align = 'spread', className }: StepperProps) => {
  const lastIndex = steps.length - 1
  const rootStyle = { '--dot': DOT_SIZE[size] } as CSSProperties
  const ariaLabel = `Step ${Math.min(current + 1, steps.length)} of ${steps.length}: ${steps[current] ?? 'Complete'}`

  if (align === 'center') {
    return (
      <ol
        data-slot='stepper'
        className={cn('grid w-full', className)}
        style={toneStyle(tone, { ...rootStyle, gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` })}
        aria-label={ariaLabel}
      >
        {steps.map((step, index) => {
          const state = stateOf(index, current)

          return (
            <li
              key={step}
              className='relative flex min-w-0 flex-col items-center gap-2'
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {index < lastIndex && (
                <span
                  aria-hidden='true'
                  className={cn(
                    connectorClass(index, current),
                    'absolute top-[calc(var(--dot)/2-1px)] left-[calc(50%+var(--dot)/2)] w-[calc(100%-var(--dot))]'
                  )}
                />
              )}
              <span className={stepperDotVariants({ state, size })}>
                {state === 'done' && <CheckIcon strokeWidth={3} />}
              </span>
              <span className={cn(stepperLabelVariants({ state, size }), 'w-full truncate text-center')}>{step}</span>
            </li>
          )
        })}
      </ol>
    )
  }

  // Spread: each step but the last is [dot ── connector] and grows equally, so gaps are identical and the
  // last dot lands on the right edge. Labels hang under their dot without affecting the track.
  return (
    <ol
      data-slot='stepper'
      className={cn('flex w-full items-start pb-[calc(0.5rem+1.25em)]', className)}
      style={toneStyle(tone, rootStyle)}
      aria-label={ariaLabel}
    >
      {steps.map((step, index) => {
        const state = stateOf(index, current)
        const isFirst = index === 0
        const isLast = index === lastIndex

        return (
          <li
            key={step}
            className={cn('relative flex items-center', isLast ? 'flex-none' : 'min-w-0 flex-1')}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className={stepperDotVariants({ state, size })}>
              {state === 'done' && <CheckIcon strokeWidth={3} />}
            </span>
            {!isLast && <span aria-hidden='true' className={cn(connectorClass(index, current), 'flex-1')} />}
            <span
              className={cn(
                stepperLabelVariants({ state, size }),
                'absolute top-[calc(var(--dot)+0.5rem)]',
                isFirst && 'left-0',
                isLast && 'right-0',
                !isFirst && !isLast && 'left-[calc(var(--dot)/2)] -translate-x-1/2'
              )}
            >
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper, stepperDotVariants, stepperLabelVariants }
export type { StepperProps }
