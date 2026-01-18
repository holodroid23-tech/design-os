import * as React from "react"
import { cn } from "../../lib/utils"

// Root settings item wrapper
const SettingsItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-layer-1 text-foreground hover:bg-layer-hover active:bg-layer-active active:scale-[0.99] flex w-full items-center justify-start gap-4 px-5 py-4 transition-all duration-75",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
SettingsItem.displayName = "SettingsItem"

// Icon component
const SettingsItemIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("shrink-0", className)} {...props}>
      {children}
    </div>
  )
})
SettingsItemIcon.displayName = "SettingsItemIcon"

// Content wrapper
const SettingsItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-start text-left flex-1", className)}
      {...props}
    >
      {children}
    </div>
  )
})
SettingsItemContent.displayName = "SettingsItemContent"

// Title
interface SettingsItemTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "destructive"
}

const SettingsItemTitle = React.forwardRef<HTMLSpanElement, SettingsItemTitleProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-regular-semibold",
          variant === "destructive" ? "text-red-500" : "text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
SettingsItemTitle.displayName = "SettingsItemTitle"

// Description
const SettingsItemDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-support-small text-secondary", className)}
      {...props}
    >
      {children}
    </span>
  )
})
SettingsItemDescription.displayName = "SettingsItemDescription"

// Action/Right side element
const SettingsItemAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-tertiary flex items-center gap-2 shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  )
})
SettingsItemAction.displayName = "SettingsItemAction"

export {
  SettingsItem,
  SettingsItemIcon,
  SettingsItemContent,
  SettingsItemTitle,
  SettingsItemDescription,
  SettingsItemAction,
}
