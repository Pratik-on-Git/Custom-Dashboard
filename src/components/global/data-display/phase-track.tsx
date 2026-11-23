// Type Imports
import type { ReactNode } from 'react'

// Util Imports
import { cn } from '@/lib/utils'
import { toneStyle, type Tone } from '@/components/global/variants/tone'

type PhaseTrackSegment = {
  key: string
  label: string

  /** Duration of the phase in days (or any unit — only ratios matter) */
  days: number
  tone: Tone
  icon?: ReactNode

  /** Tooltip, e.g. "Picking · Sat 26 Sept – Fri 1 Jan" */
  title?: string
}

type PhaseTrackProps = {
  segments: PhaseTrackSegment[]

  /** How far along the whole track we are, in the same unit as `days` */
  elapsed: number
  startLabel?: ReactNode
  progressLabel?: ReactNode
  endLabel?: ReactNode

  /** Accessible summary of the track */
  ariaLabel?: string
  className?: string
}

/** Segments narrower than this share of the track hide their label. */
const LABEL_MIN_SHARE = 0.07

/**
 * Global: proportional phase timeline with a "today" pin.
 * Each segment fills up to the elapsed point; works for crop cycles, projects, contracts, sprints…
 */
const PhaseTrack = ({
  segments,
  elapsed,
  startLabel,
  progressLabel,
  endLabel,
  ariaLabel,
  className
}: PhaseTrackProps) => {
  const total = segments.reduce((sum, segment) => sum + segment.days, 0)
  const pin = total > 0 ? Math.min(100, Math.max(0, (elapsed / total) * 100)) : 0

  // Where each segment starts on the track
  const starts = segments.map((_, index) => segments.slice(0, index).reduce((sum, segment) => sum + segment.days, 0))

  return (
    <div data-slot='phase-track' className={cn('flex flex-col gap-2', className)}>
      <div className='relative flex h-9 gap-1' role='img' aria-label={ariaLabel}>
        {segments.map((segment, index) => {
          const done = Math.min(1, Math.max(0, (elapsed - starts[index]) / segment.days))
          const showLabel = segment.days / total >= LABEL_MIN_SHARE

          return (
            <div
              key={segment.key}
              title={segment.title ?? segment.label}
              className='relative min-w-1.5 basis-0 overflow-hidden rounded-md bg-(--tone)/10'
              style={toneStyle(segment.tone, { flexGrow: segment.days })}
            >
              <span className='absolute inset-y-0 left-0 bg-(--tone)/30' style={{ width: `${done * 100}%` }} />
              {showLabel && (
                <span className='text-foreground relative flex h-full items-center gap-1.5 truncate px-2.5 text-xs font-medium [&_svg]:size-3.5 [&_svg]:shrink-0'>
                  {segment.icon}
                  <span className='truncate'>{segment.label}</span>
                </span>
              )}
            </div>
          )
        })}

        <span
          aria-hidden='true'
          className='bg-foreground pointer-events-none absolute -top-1.5 -bottom-1 w-0.5 -translate-x-1/2 rounded-full'
          style={{ left: `${pin}%` }}
        >
          <span className='bg-foreground ring-card absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full ring-2' />
        </span>
      </div>

      {(startLabel || progressLabel || endLabel) && (
        <div className='text-muted-foreground grid grid-cols-3 text-xs'>
          <span>{startLabel}</span>
          <span className='text-center'>{progressLabel}</span>
          <span className='text-right'>{endLabel}</span>
        </div>
      )}
    </div>
  )
}

export { PhaseTrack }
export type { PhaseTrackProps, PhaseTrackSegment }
