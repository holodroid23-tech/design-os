"use client"

import { cn } from "@/lib/utils"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"

export type StrokeStyleOption = "none" | "common" | "dashed"

export interface StrokeStyleSelectorProps {
  value: StrokeStyleOption
  onValueChange: (value: StrokeStyleOption) => void
  className?: string
}

export function StrokeStyleSelector({ value, onValueChange, className }: StrokeStyleSelectorProps) {
  return (
    <RadioButtonGroup
      value={value}
      onValueChange={(v) => onValueChange(v as StrokeStyleOption)}
      className={cn("grid grid-cols-3 gap-3", className)}
    >
      <RadioButtonGroupItem value="none" variant="default" size="card">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-[12px] bg-muted/50" />
          <div className="text-sm">None</div>
        </div>
      </RadioButtonGroupItem>

      <RadioButtonGroupItem value="common" variant="default" size="card">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-[12px] border-2 border-border bg-background" />
          <div className="text-sm">Common</div>
        </div>
      </RadioButtonGroupItem>

      <RadioButtonGroupItem value="dashed" variant="default" size="card">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-[12px] border-2 border-dashed border-border bg-background" />
          <div className="text-sm">Dashed</div>
        </div>
      </RadioButtonGroupItem>
    </RadioButtonGroup>
  )
}

