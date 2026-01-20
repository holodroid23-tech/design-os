import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

export interface AnalyticsLineChartDatum {
  label: string
  value: number
}

export interface AnalyticsLineChartProps extends React.ComponentProps<"div"> {
  data: AnalyticsLineChartDatum[]
  height?: number
  stroke?: string
  yTicks?: number[]
  valueFormatter?: (value: number) => string
  labelFormatter?: (label: string) => string
}

function AxisTick({
  x,
  y,
  payload,
}: {
  x?: number
  y?: number
  payload?: { value?: unknown }
}) {
  const value = String(payload?.value ?? "")
  return (
    <text
      x={x}
      y={y}
      dy={14}
      textAnchor="middle"
      fill="currentColor"
      className="text-[10px] text-muted-foreground"
    >
      {value}
    </text>
  )
}

function YAxisTick({
  x,
  y,
  payload,
}: {
  x?: number
  y?: number
  payload?: { value?: unknown }
}) {
  const value = String(payload?.value ?? "")
  return (
    <text
      x={x}
      y={y}
      dx={-8}
      dy={4}
      textAnchor="end"
      fill="currentColor"
      className="text-[10px] text-muted-foreground"
    >
      {value}
    </text>
  )
}

type AnalyticsTooltipProps = {
  active?: boolean
  // Recharts typing has changed across major versions; keep this minimal and resilient.
  payload?: Array<{ value?: unknown }>
  label?: unknown
  valueFormatter?: (value: number) => string
  labelFormatter?: (label: string) => string
}

function AnalyticsTooltip(props: AnalyticsTooltipProps) {
  const { active, payload, label, valueFormatter, labelFormatter } = props
  if (!active) return null
  const first = payload?.[0]
  const raw = typeof first?.value === "number" ? first.value : Number(first?.value ?? 0)
  const value = valueFormatter ? valueFormatter(raw) : String(raw)
  const displayLabel = labelFormatter ? labelFormatter(String(label ?? "")) : String(label ?? "")

  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
      <div className="text-muted-foreground">{displayLabel}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  )
}

export function AnalyticsLineChart({
  data,
  height = 180,
  stroke = "var(--color-link-secondary)",
  yTicks,
  valueFormatter,
  labelFormatter,
  className,
  ...props
}: AnalyticsLineChartProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[320px]">
          <ResponsiveContainer width="100%" height={height} minHeight={140}>
            <LineChart data={data} margin={{ top: 8, right: 10, left: 8, bottom: 6 }}>
              <CartesianGrid
                stroke="var(--color-border-secondary)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={<AxisTick />}
              />
              <YAxis
                ticks={yTicks}
                tickLine={false}
                axisLine={false}
                tick={<YAxisTick />}
                width={44}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-border-secondary)", strokeWidth: 1 }}
                content={
                  <AnalyticsTooltip
                    valueFormatter={valueFormatter}
                    labelFormatter={labelFormatter}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={stroke}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: stroke, stroke: "var(--color-layer-level-1)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

