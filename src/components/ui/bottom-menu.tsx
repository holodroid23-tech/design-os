import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Sheet, SheetContent, SheetTitle } from "./sheet"

function BottomMenu({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <Sheet {...props} />
}

function BottomMenuTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="bottom-menu-trigger" {...props} />
}

function BottomMenuClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="bottom-menu-close" {...props} />
}

function BottomMenuContent({
  className,
  children,
  showCloseButton = true,
  showHeader = false,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  showCloseButton?: boolean
  showHeader?: boolean
}) {
  // If header is shown, hide the default close button and show it in header instead
  const shouldShowDefaultClose = showCloseButton && !showHeader
  
  return (
    <SheetContent
      side="bottom"
      showCloseButton={shouldShowDefaultClose}
      className={cn(
        "max-h-[85vh] overflow-y-auto p-0",
        showHeader && "pt-0",
        className
      )}
      {...props}
    >
      {showHeader && (
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
          {showCloseButton && (
            <BottomMenuClose className="rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </BottomMenuClose>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </SheetContent>
  )
}

function BottomMenuItem({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="bottom-menu-item"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground focus:outline-hidden",
        "active:bg-accent/80",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

function BottomMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bottom-menu-separator"
      className={cn("my-2 h-px bg-border", className)}
      {...props}
    />
  )
}

function BottomMenuSection({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
}) {
  return (
    <div
      data-slot="bottom-menu-section"
      className={cn("space-y-1", className)}
      {...props}
    >
      {title && (
        <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export {
  BottomMenu,
  BottomMenuTrigger,
  BottomMenuClose,
  BottomMenuContent,
  BottomMenuItem,
  BottomMenuSeparator,
  BottomMenuSection,
}
