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
        "text-foreground flex w-full items-center justify-start gap-4 px-5 py-4 transition-colors duration-75 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
          // Use theme token classes so screens can pass parity-check.
          variant === "destructive" ? "text-destructive" : "text-foreground",
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
interface SettingsItemDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "success" | "warning" | "danger"
}

const SettingsItemDescription = React.forwardRef<
  HTMLSpanElement,
  SettingsItemDescriptionProps
>(({ className, tone = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "text-support-small",
        tone === "default" && "text-secondary",
        // Tokenized semantic tones (defined via @theme variables in `src/index.css`).
        tone === "success" && "text-on-layer-success",
        tone === "warning" && "text-on-layer-warning",
        tone === "danger" && "text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})
SettingsItemDescription.displayName = "SettingsItemDescription"

// Action/Right side element
interface SettingsItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "row" | "stack"
}

const SettingsItemAction = React.forwardRef<
  HTMLDivElement,
  SettingsItemActionProps
>(({ className, layout = "row", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-tertiary shrink-0",
        layout === "stack" ? "flex flex-col items-end gap-2" : "flex items-center gap-2",
        className
      )}
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
