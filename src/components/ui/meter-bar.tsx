import * as React from "react"

import { cn } from "@/lib/utils"

export type MeterBarTone = "accent" | "positive" | "negative" | "neutral"
export type MeterBarSize = "sm" | "md"

export interface MeterBarProps extends React.ComponentProps<"div"> {
  value: number
  max?: number
  tone?: MeterBarTone
  size?: MeterBarSize
  "aria-label"?: string
}

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0
  return Math.min(1, Math.max(0, n))
}

function strokeForTone(tone: MeterBarTone) {
  switch (tone) {
    case "positive":
      return "var(--color-onLayer-interactive)"
    case "negative":
      return "var(--color-onLayer-danger)"
    case "neutral":
      return "var(--color-onLayer-secondary)"
    case "accent":
    default:
      return "var(--color-link-secondary)"
  }
}

export function MeterBar({
  value,
  max = 100,
  tone = "accent",
  size = "md",
  className,
  "aria-label": ariaLabel = "Meter",
  ...props
}: MeterBarProps) {
  const fraction = clamp01(max > 0 ? value / max : 0)
  const trackLength = 96 // viewBox units (x=2 → x=98)
  const filled = Number((trackLength * fraction).toFixed(2))
  const dasharray = `${filled} ${trackLength}`

  const heightClass = size === "sm" ? "h-2" : "h-2.5"

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn("w-full", className)}
      {...props}
    >
      <svg
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
        className={cn("w-full", heightClass)}
      >
        <line
          x1={2}
          y1={3}
          x2={98}
          y2={3}
          stroke="var(--color-border-secondary)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line
          x1={2}
          y1={3}
          x2={98}
          y2={3}
          stroke={strokeForTone(tone)}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={dasharray}
        />
      </svg>
    </div>
  )
}

