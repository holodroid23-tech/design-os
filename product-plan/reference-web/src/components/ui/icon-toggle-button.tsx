"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface IconToggleButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "type" | "onClick" | "children"> {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
  icon: LucideIcon
  label: string
  /**
   * Special-case behavior for favorites:
   * - Icon becomes filled when pressed.
   * - Icon can be tinted via `pressedIconClassName` (e.g. yellow).
   */
  fillIconWhenPressed?: boolean
  pressedIconClassName?: string
  unpressedIconClassName?: string
}

export function IconToggleButton({
  pressed,
  onPressedChange,
  icon: Icon,
  label,
  fillIconWhenPressed = false,
  pressedIconClassName,
  unpressedIconClassName,
  className,
  disabled,
  variant = "invisible",
  size = "icon",
  ...props
}: IconToggleButtonProps) {
  const pressedClasses =
    variant === "ghost"
      ? "bg-secondary/50 text-secondary-foreground border-transparent shadow-sm hover:bg-secondary/60"
      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={label}
      aria-pressed={pressed}
      disabled={disabled}
      className={cn(
        "shrink-0",
        pressed ? pressedClasses : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        disabled && "opacity-50",
        className
      )}
      onClick={() => onPressedChange(!pressed)}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-5",
          fillIconWhenPressed && pressed && "fill-current",
          pressed ? pressedIconClassName : unpressedIconClassName
        )}
      />
    </Button>
  )
}

