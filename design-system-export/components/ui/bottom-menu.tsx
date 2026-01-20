import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "./bottom-sliding-modal"
import { Button } from "./button"

function BottomMenu({ ...props }: React.ComponentProps<typeof BottomSlidingModal>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BottomSlidingModal {...(props as any)} />
}

function BottomMenuTrigger({
  ...props
}: React.ComponentProps<typeof BottomSlidingModalTrigger>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BottomSlidingModalTrigger data-slot="bottom-menu-trigger" {...(props as any)} />
}

function BottomMenuClose({
  ...props
}: React.ComponentProps<typeof BottomSlidingModalClose>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BottomSlidingModalClose data-slot="bottom-menu-close" {...(props as any)} />
}

function BottomMenuContent({
  className,
  children,
  showCloseButton = true,
  showHeader = true,
  ...props
}: React.ComponentProps<typeof BottomSlidingModalContent> & {
  showCloseButton?: boolean
  showHeader?: boolean
}) {
  return (
    <BottomSlidingModalContent
      className={cn("p-0", className)}
      header={
        showHeader ? (
          <div className="flex items-center justify-between gap-3">
            <div className="text-foreground font-semibold leading-tight text-lg">Menu</div>
            {showCloseButton ? (
              <BottomMenuClose asChild>
                <Button variant="invisible" size="icon" aria-label="Close">
                  <XIcon className="size-4" />
                </Button>
              </BottomMenuClose>
            ) : null}
          </div>
        ) : null
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      <div className="p-4">{children}</div>
    </BottomSlidingModalContent>
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
