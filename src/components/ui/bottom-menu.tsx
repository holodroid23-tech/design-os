import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "./bottom-sliding-modal"
import { Button } from "./button"
import { SystemIcon } from "./icon"
import { SectionTitle } from "./section-title"

function BottomMenu({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <BottomSlidingModal {...props} />
}

function BottomMenuTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <BottomSlidingModalTrigger data-slot="bottom-menu-trigger" {...props} />
}

function BottomMenuClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <BottomSlidingModalClose data-slot="bottom-menu-close" {...props} />
}

function BottomMenuContent({
  className,
  children,
  showCloseButton = true,
  showHeader = true,
  noPadding = false,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
  showHeader?: boolean
  noPadding?: boolean
}) {
  // Standardize: Bottom menus always use the canonical bottom sliding modal + scaffold header.
  return (
    <BottomSlidingModalContent
      scaffoldProps={{ headerClassName: "px-4 py-3 border-b", bodyClassName: "overflow-y-auto" }}
      className={cn("p-0", className)}
      header={
        showHeader ? (
          <SectionTitle
            titleAs="h2"
            trailing={
              showCloseButton ? (
                <BottomMenuClose asChild>
                  <Button variant="invisible" size="icon" aria-label="Close">
                    <SystemIcon icon={XIcon} />
                  </Button>
                </BottomMenuClose>
              ) : null
            }
          >
            Menu
          </SectionTitle>
        ) : null
      }
      {...props}
    >
      {noPadding ? children : <div className="p-4">{children}</div>}
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
