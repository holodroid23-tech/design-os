import * as React from "react"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { cn } from "../../lib/utils"

interface ColorPickerProps {
  color?: string
  onColorChange?: (color: string) => void
  className?: string
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
  "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#3b82f6",
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#64748b", "#78716c", "#000000", "#ffffff",
]

export function ColorPicker({
  color = "#3b82f6",
  onColorChange,
  className,
}: ColorPickerProps) {
  const [localColor, setLocalColor] = React.useState(color)

  React.useEffect(() => {
    setLocalColor(color)
  }, [color])

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor)
    onColorChange?.(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn("w-full justify-start gap-2", className)}
        >
          <div
            className="h-4 w-4 rounded border"
            style={{ backgroundColor: localColor }}
          />
          <span className="font-mono text-xs">{localColor}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium mb-2 block">
              Custom Color
            </label>
            <input
              type="color"
              value={localColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 rounded border cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-2 block">
              Preset Colors
            </label>
            <div className="grid grid-cols-10 gap-1.5">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => handleColorChange(presetColor)}
                  className={cn(
                    "h-8 w-8 rounded border-2 transition-all",
                    localColor === presetColor
                      ? "border-foreground scale-110"
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: presetColor }}
                  aria-label={`Select color ${presetColor}`}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

