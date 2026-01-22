"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { ChevronDown, Pencil } from "lucide-react"

import { IconTile, SystemIcon } from "@/components/atoms/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ImageTile } from "@/components/ui/image-tile"
import { cn } from "@/lib/utils"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemTitle,
} from "@/components/settings/settings-item"

export interface ExpenseExpandableGroupBadge {
  label: string
  variant?: React.ComponentProps<typeof Badge>["variant"]
}

export interface ExpenseExpandableGroupProps
  extends Omit<React.ComponentProps<typeof Collapsible>, "children"> {
  title: string
  subtitle?: string
  amount: string
  badge?: ExpenseExpandableGroupBadge
  children?: React.ReactNode

  containerClassName?: string
  triggerClassName?: string
  contentClassName?: string
}

/**
 * Expense expandable group (Design System)
 *
 * Day bucket accordion used in Expenses lists:
 * - Header: day label + count + total + optional badge
 * - Content: list of expandable expense rows (children)
 */
export function ExpenseExpandableGroup({
  title,
  subtitle,
  amount,
  badge,
  children,
  className,
  containerClassName,
  triggerClassName,
  contentClassName,
  ...props
}: ExpenseExpandableGroupProps) {
  return (
    <Collapsible
      className={cn(
        // Intentionally background-agnostic: let the parent surface show through.
        "glass-card",
        containerClassName,
        className
      )}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className={cn(
            "group w-full flex items-center justify-between p-5 text-left transition-colors",
            // Background-agnostic interaction: avoid enforcing a surface color.
            "hover:opacity-95 active:opacity-90",
            triggerClassName
          )}
        >
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg font-semibold tracking-tight truncate">{title}</span>
              <SystemIcon
                icon={ChevronDown}
                size="small"
                className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform shrink-0"
                aria-hidden="true"
              />
            </div>
            {subtitle ? <span className="text-xs text-muted-foreground">{subtitle}</span> : null}
          </div>

          <div className="text-right flex flex-col items-end gap-2 shrink-0 pl-6">
            <div className="font-mono font-medium text-sm">{amount}</div>
            {badge ? <Badge variant={badge.variant ?? "destructive"}>{badge.label}</Badge> : null}
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className={cn("border-t border-border/60", contentClassName)}>
          <div className="divide-y divide-border/50">{children}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export type ExpenseExpandableRowLeading =
  | { type: "image"; src?: string; alt?: string }
  | { type: "icon"; icon: LucideIcon; tone?: React.ComponentProps<typeof IconTile>["tone"] }
  | { type: "custom"; node: React.ReactNode }

export interface ExpenseExpandableRowChange {
  text: string
}

export interface ExpenseExpandableRowDetails {
  createdBy?: string
  time?: string
  note?: string
}

export interface ExpenseExpandableRowProps
  extends Omit<React.ComponentProps<typeof Collapsible>, "children"> {
  title: string
  amount: string
  leading?: ExpenseExpandableRowLeading

  /**
   * When true, renders a left change marker bar (as shown in the DS example).
   */
  showChangeMarker?: boolean

  /**
   * When true, applies a strikethrough style to title and amount (deleted example).
   */
  deleted?: boolean

  details?: ExpenseExpandableRowDetails
  changes?: ExpenseExpandableRowChange[]

  onEdit?: () => void
  editIcon?: LucideIcon
  editAriaLabel?: string

  rowClassName?: string
  contentClassName?: string
}

/**
 * Expense expandable row (Design System)
 *
 * Expandable expense item used inside `ExpenseExpandableGroup`.
 */
export function ExpenseExpandableRow({
  title,
  amount,
  leading,
  showChangeMarker,
  deleted,
  details,
  changes = [],
  onEdit,
  editIcon: EditIcon = Pencil,
  editAriaLabel = "Edit expense",
  className,
  rowClassName,
  contentClassName,
  ...props
}: ExpenseExpandableRowProps) {
  const LeadingNode =
    leading?.type === "custom" ? (
      leading.node
    ) : leading?.type === "icon" ? (
      <IconTile icon={leading.icon} size="small" variant="tile" tone={leading.tone ?? "neutral"} />
    ) : (
      <ImageTile size="small" src={leading?.type === "image" ? leading.src : undefined} alt={leading?.type === "image" ? leading.alt : title} />
    )

  return (
    <Collapsible className={cn(showChangeMarker ? "relative" : undefined, className)} {...props}>
      {showChangeMarker ? (
        <div className="pointer-events-none absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-destructive" />
      ) : null}

      <CollapsibleTrigger asChild>
        <SettingsItem className={cn("group rounded-none h-auto min-h-0 py-4 pl-6 pr-5", rowClassName)}>
          <SettingsItemContent className="flex-row items-center gap-4">
            <div className="shrink-0">{LeadingNode}</div>
            <div className="flex flex-col items-start text-left min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <SettingsItemTitle
                  className={cn(
                    "text-sm font-semibold tracking-tight truncate",
                    deleted ? "line-through decoration-muted-foreground/60" : undefined
                  )}
                >
                  {title}
                </SettingsItemTitle>
                <SystemIcon
                  icon={ChevronDown}
                  size="small"
                  className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>
          </SettingsItemContent>

          <SettingsItemAction className="text-foreground">
            <span
              className={cn(
                "font-mono text-sm",
                deleted ? "line-through decoration-muted-foreground/60" : undefined
              )}
            >
              {amount}
            </span>
          </SettingsItemAction>
        </SettingsItem>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div
          className={cn(
            "px-5 pb-5 pt-4 space-y-4 text-xs border-t border-border/50",
            contentClassName
          )}
        >
          {details ? (
            <div className="space-y-1">
              {details.createdBy ? (
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-muted-foreground">Created by:</span>
                  <span className="text-foreground font-medium">{details.createdBy}</span>
                </div>
              ) : null}
              {details.time ? (
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-foreground font-medium">{details.time}</span>
                </div>
              ) : null}
              {details.note !== undefined ? (
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-muted-foreground">Note:</span>
                  <span className="text-foreground font-medium">{details.note || "—"}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          {changes.length > 0 ? (
            <div className="space-y-2 pt-2">
              {changes.map((change, idx) => (
                <div key={`${idx}-${change.text.slice(0, 16)}`} className="flex gap-2 text-[11px] text-muted-foreground items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
                  <p>{change.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {onEdit ? (
            <div className="flex justify-end pt-1">
              <Button variant="secondary" size="icon" className="rounded-[12px]" aria-label={editAriaLabel} onClick={onEdit}>
                <SystemIcon icon={EditIcon} size="regular" aria-hidden="true" />
              </Button>
            </div>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

