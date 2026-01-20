"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface BottomSheetScaffoldProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  footer?: React.ReactNode
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

/**
 * Canonical bottom-sheet layout scaffold:
 * - Hugs content until it reaches max height, then scrolls the body
 * - Supports pinned footer
 * - Pure layout (pair with `BottomSlidingModal` for the canonical bottom sliding modal)
 */
export function BottomSheetScaffold({
  header,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  children,
  ...props
}: BottomSheetScaffoldProps) {
  return (
    <div
      className={cn(
        // Height capping lives on `BottomSlidingModalContent` so it can respect preview containers.
        "bg-background border border-border rounded-t-[18px] w-full min-h-0 flex flex-col overflow-hidden",
        className,
      )}
      {...props}
    >
      {header ? <div className={cn("px-6 py-5", headerClassName)}>{header}</div> : null}

      <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", bodyClassName)}>
        {children}
      </div>

      {footer ? (
        <div className={cn("border-t bg-background p-6", footerClassName)}>{footer}</div>
      ) : null}
    </div>
  )
}

