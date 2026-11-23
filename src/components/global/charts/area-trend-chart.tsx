'use client'

// React Imports
import { useId } from 'react'
import type { ReactNode } from 'react'

// Third-party Imports
import { Area, CartesianGrid, ComposedChart, Line, ReferenceDot, XAxis, YAxis } from 'recharts'
import type { TooltipContentProps } from 'recharts'

// Component Imports
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Legend } from '@/components/global/data-display/legend'
import { DeltaBadge } from '@/components/global/micro/delta-badge'
import { ChartTooltipPanel } from '@/components/global/charts/chart-tooltip-panel'

// Util Imports
import { cn } from '@/lib/utils'
import { toneTokens, type Tone } from '@/components/global/variants/tone'

type AreaTrendSeries = {
  key: string
  label: string
  tone: Tone

  /** `area` = filled gradient + line, `line` = solid line, `dashed` = comparison line */
  variant?: 'area' | 'line' | 'dashed'
}

type AreaTrendChartProps<TData extends object> = {
  data: TData[]

  /** Field holding the category label, e.g. 'week' */
  xKey: Extract<keyof TData, string>
  series: AreaTrendSeries[]

  /** Full value, used in the tooltip — e.g. "12.3 t" */
  valueFormatter?: (value: number) => string

  /** Compact y-axis tick — e.g. "12". Put the unit in `caption` instead of on every tick. */
  axisFormatter?: (value: number) => string

  /** Small label above the plot, left — usually the unit, e.g. "Tonnes per week" */
  caption?: ReactNode

  /** Show the series legend above the plot, right (default true) */
  showLegend?: boolean

  /** Mark the latest point of the main series (default true) */
  highlightLatest?: boolean

  /** Tooltip footer comparing the main series with the dashed one (default true) */
  showComparison?: boolean

  /** Fixed y-axis max; defaults to a rounded auto max */
  yMax?: number
  yTickCount?: number
  ariaLabel?: string

  /** Sizes the plot area — pass a height, e.g. `h-64` */
  className?: string
}

const ANIMATION = { animationDuration: 700, animationEasing: 'ease-out' } as const

const markerShape = (series: AreaTrendSeries) => (series.variant === 'dashed' ? 'dash' : 'square')

/**
 * Global: smooth trend chart for one or more series over a category axis (e.g. this season vs last season).
 * Includes its own header (caption + legend), auto-sized y-axis, evenly spaced x ticks, a "latest" marker and a
 * comparison tooltip. Built on the ui ChartContainer + recharts.
 */
const AreaTrendChart = <TData extends object>({
  data,
  xKey,
  series,
  valueFormatter = value => String(value),
  axisFormatter = valueFormatter,
  caption,
  showLegend = true,
  highlightLatest = true,
  showComparison = true,
  yMax,
  yTickCount = 5,
  ariaLabel,
  className
}: AreaTrendChartProps<TData>) => {
  const gradientId = useId().replace(/:/g, '')

  const config = Object.fromEntries(
    series.map(item => [item.key, { label: item.label, color: toneTokens[item.tone] }])
  ) satisfies ChartConfig

  const main = series.find(item => item.variant !== 'dashed') ?? series[0]
  const comparison = series.find(item => item.variant === 'dashed')
  const latest = data.at(-1) as Record<string, string | number> | undefined

  const renderTooltip = ({ active, payload }: TooltipContentProps) => {
    const datum = payload?.[0]?.payload as Record<string, string | number> | undefined

    if (!active || !datum) return null

    const mainValue = Number(datum[main.key])
    const compareValue = comparison ? Number(datum[comparison.key]) : NaN
    const change = compareValue ? ((mainValue - compareValue) / compareValue) * 100 : null

    return (
      <ChartTooltipPanel
        title={String(datum[xKey])}
        rows={series.map(item => ({
          key: item.key,
          label: item.label,
          value: valueFormatter(Number(datum[item.key])),
          tone: item.tone,
          shape: markerShape(item)
        }))}
        footer={
          showComparison && comparison && change !== null ? (
            <>
              <span className='text-muted-foreground'>vs {comparison.label.toLowerCase()}</span>
              <DeltaBadge value={change} />
            </>
          ) : undefined
        }
      />
    )
  }

  return (
    <div data-slot='area-trend-chart' className='flex min-w-0 flex-col gap-3'>
      {(caption || showLegend) && (
        <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1'>
          <span className='text-muted-foreground text-xs'>{caption}</span>
          {showLegend && (
            <Legend
              size='sm'
              items={series.map(item => ({ label: item.label, tone: item.tone, shape: markerShape(item) }))}
            />
          )}
        </div>
      )}

      <ChartContainer
        config={config}
        className={cn('aspect-auto h-64 w-full', className)}
        role='img'
        aria-label={ariaLabel}
      >
        <ComposedChart data={data} margin={{ top: 12, right: 4, bottom: 0, left: 0 }}>
          <defs>
            {series
              .filter(item => (item.variant ?? 'area') === 'area')
              .map(item => (
                <linearGradient key={item.key} id={`${gradientId}-${item.key}`} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor={`var(--color-${item.key})`} stopOpacity={0.16} />
                  <stop offset='95%' stopColor={`var(--color-${item.key})`} stopOpacity={0} />
                </linearGradient>
              ))}
          </defs>

          <CartesianGrid vertical={false} strokeDasharray='3 3' />
          <XAxis
            dataKey={xKey as string}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            interval='equidistantPreserveStart'
            padding={{ left: 12, right: 12 }}
          />
          <YAxis
            width='auto'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={yTickCount}
            domain={[0, yMax ?? 'auto']}
            tickFormatter={value => axisFormatter(Number(value))}
          />
          <ChartTooltip cursor={{ strokeWidth: 1 }} content={renderTooltip} />

          {series.map(item => {
            const variant = item.variant ?? 'area'
            const stroke = `var(--color-${item.key})`

            if (variant === 'area') {
              return (
                <Area
                  key={item.key}
                  dataKey={item.key}
                  type='monotone'
                  stroke={stroke}
                  strokeWidth={2}
                  fill={`url(#${gradientId}-${item.key})`}
                  activeDot={{ r: 4, fill: stroke, stroke: 'var(--card)', strokeWidth: 2 }}
                  {...ANIMATION}
                />
              )
            }

            return (
              <Line
                key={item.key}
                dataKey={item.key}
                type='monotone'
                stroke={stroke}
                strokeWidth={variant === 'dashed' ? 1.5 : 2}
                strokeDasharray={variant === 'dashed' ? '4 4' : undefined}
                dot={false}
                activeDot={{ r: 3.5, fill: stroke, stroke: 'var(--card)', strokeWidth: 2 }}
                {...ANIMATION}
              />
            )
          })}

          {highlightLatest && latest && (
            <>
              <ReferenceDot
                x={latest[xKey]}
                y={latest[main.key]}
                r={9}
                fill={`var(--color-${main.key})`}
                fillOpacity={0.12}
                stroke='none'
                ifOverflow='visible'
              />
              <ReferenceDot
                x={latest[xKey]}
                y={latest[main.key]}
                r={4}
                fill={`var(--color-${main.key})`}
                stroke='var(--card)'
                strokeWidth={2}
                ifOverflow='visible'
              />
            </>
          )}
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}

export { AreaTrendChart }
export type { AreaTrendChartProps, AreaTrendSeries }
