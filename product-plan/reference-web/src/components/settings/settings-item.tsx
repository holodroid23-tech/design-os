import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

type SettingsItemElement = "button" | "div"

type SettingsItemProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * Render the item as a different underlying element.
   * - `button` is best when the whole row is clickable and there are no nested interactive controls.
   * - `div` is best when the row contains nested controls (switches/buttons) but you may still want the row to be clickable.
   */
  element?: SettingsItemElement
  /**
   * Button type when `element="button"`.
   * Kept as a prop because some screens pass it explicitly.
   */
  type?: "button" | "submit" | "reset"
  /**
   * When true (or when `onPress` is provided), the row becomes keyboard-focusable and activates on Enter/Space.
   * This enables "whole row clickable" behavior without needing per-screen role/tabIndex handlers.
   */
  interactive?: boolean
  /**
   * Press handler that works for both `button` and `div` render modes.
   */
  onPress?: () => void
  /**
   * Disable row interaction (applies to both `button` and `div`).
   */
  disabled?: boolean
  asChild?: boolean
}

// Root settings item wrapper
const SettingsItem = React.forwardRef<
  HTMLElement,
  SettingsItemProps
>(
  (
    {
      className,
      children,
      asChild = false,
      element = "button",
      type,
      interactive,
      onPress,
      disabled,
      onClick,
      onKeyDown,
      tabIndex,
      role,
      ...props
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp: any = asChild ? Slot : (element === "div" ? "div" : "button")
    const isInteractive = Boolean(interactive ?? onPress ?? onClick)

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return
      onClick?.(e)
      onPress?.()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(e)
      if (disabled) return

      // Only emulate button behavior when rendering as a div + interactive.
      if (element !== "div" || !isInteractive) return

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onPress?.()
        // If the consumer provided onClick instead of onPress, let Enter/Space trigger it as well.
        if (!onPress && onClick) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick(e as any)
        }
      }
    }

    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          "text-foreground flex w-full items-center justify-start gap-4 px-5 py-4 transition-colors duration-75 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          disabled ? "opacity-50 pointer-events-none" : undefined,
          className
        )}
        // Button safety: default to type="button" to avoid accidental form submits.
        {...(element === "button" && !asChild ? { type: type ?? "button" } : null)}
        // For div mode, provide proper semantics when interactive.
        {...(element === "div" && !asChild && isInteractive
          ? { role: role ?? "button", tabIndex: tabIndex ?? 0, "aria-disabled": disabled ? true : undefined }
          : null)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={handleClick as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onKeyDown={handleKeyDown as any}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
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
  size?: "small" | "tiny"
  tone?: "default" | "success" | "warning" | "danger"
}

const SettingsItemDescription = React.forwardRef<
  HTMLSpanElement,
  SettingsItemDescriptionProps
>(({ className, size = "small", tone = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        size === "tiny" ? "text-support-tiny" : "text-support-small",
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
  tone?: "default" | "muted"
}

const SettingsItemAction = React.forwardRef<
  HTMLDivElement,
  SettingsItemActionProps
>(({ className, layout = "row", tone = "muted", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        tone === "muted" ? "text-tertiary" : "text-foreground",
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
