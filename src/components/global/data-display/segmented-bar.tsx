// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

const segmentedBarVariants = cva('flex w-full gap-1', {
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type SegmentedBarSegment = {
  label: string
  value: number
  tone: Tone
}

type SegmentedBarProps = VariantProps<typeof segmentedBarVariants> & {
  segments: SegmentedBarSegment[]

  /** Whole bar. Anything not covered by segments renders as a hatched "remaining" part. */
  total: number
  ariaLabel?: string
  className?: string
}

/** Global: stacked share bar — parts of a target plus the hatched remainder. */
const SegmentedBar = ({ segments, total, size, ariaLabel, className }: SegmentedBarProps) => {
  const used = segments.reduce((sum, segment) => sum + segment.value, 0)
  const remaining = Math.max(0, total - used)

  return (
    <div
      data-slot='segmented-bar'
      role='img'
      aria-label={ariaLabel}
      className={cn(segmentedBarVariants({ size }), className)}
    >
      {segments.map(segment => (
        <span
          key={segment.label}
          title={`${segment.label} · ${segment.value}`}
          className='min-w-1 basis-0 rounded-full bg-(--tone)'
          style={toneStyle(segment.tone, { flexGrow: segment.value })}
        />
      ))}
      {remaining > 0 && (
        <span
          title={`Remaining · ${remaining}`}
          className='border-border basis-0 rounded-full border bg-[repeating-linear-gradient(-45deg,var(--muted)_0_4px,transparent_4px_8px)]'
          style={{ flexGrow: remaining }}
        />
      )}
    </div>
  )
}

export { SegmentedBar, segmentedBarVariants }
export type { SegmentedBarProps, SegmentedBarSegment }
