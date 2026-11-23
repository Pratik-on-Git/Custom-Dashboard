'use client'

// React Imports
import { useId } from 'react'

// Third-party Imports
import { Area, AreaChart, YAxis } from 'recharts'

// Component Imports
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'

// Util Imports
import { cn } from '@/lib/utils'
import { toneTokens, type Tone } from '@/components/global/variants/tone'

type SparklineProps = {
  values: number[]
  tone?: Tone

  /** Show the soft fill under the line (default true) */
  filled?: boolean
  ariaLabel?: string
  className?: string
}

/** Global: axis-less mini trend line for tiles and table cells. */
const Sparkline = ({ values, tone = 'primary', filled = true, ariaLabel, className }: SparklineProps) => {
  const gradientId = useId().replace(/:/g, '')
  const data = values.map((value, index) => ({ index, value }))
  const config = { value: { label: 'Value', color: toneTokens[tone] } } satisfies ChartConfig

  return (
    <ChartContainer
      config={config}
      className={cn('aspect-auto h-10 w-full', className)}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='var(--color-value)' stopOpacity={filled ? 0.25 : 0} />
            <stop offset='100%' stopColor='var(--color-value)' stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis hide domain={['dataMin', 'dataMax']} />
        <Area
          dataKey='value'
          type='monotone'
          stroke='var(--color-value)'
          strokeWidth={1.75}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export { Sparkline }
export type { SparklineProps }
