"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface FloatingBottomBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding applied to the fixed bar container (matches common mobile inset).
   */
  insetClassName?: string
}

/**
 * Floating bottom bar (Design System)
 *
 * Standard wrapper for a fixed, floating control at the bottom of the screen
 * (e.g. order summary bar). This prevents per-screen “layout hacks” and keeps
 * the pattern consistent.
 */
export function FloatingBottomBar({
  className,
  insetClassName = "px-4 pb-4",
  children,
  ...props
}: FloatingBottomBarProps) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-x-0 bottom-0 z-50", insetClassName, className)}
      {...props}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  )
}

export interface FloatingBottomBarSpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The reserved height so scrollable content doesn't hide under the bar.
   * Defaults to a comfortable value for a ~96px bar + insets.
   */
  heightClassName?: string
}

/**
 * Spacer to reserve room for a FloatingBottomBar in scrollable content.
 */
export function FloatingBottomBarSpacer({
  className,
  heightClassName = "h-32",
  ...props
}: FloatingBottomBarSpacerProps) {
  return <div aria-hidden="true" className={cn(heightClassName, className)} {...props} />
}

