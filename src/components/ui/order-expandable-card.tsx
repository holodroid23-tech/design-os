"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ImageTile } from "@/components/ui/image-tile"
import { cn } from "@/lib/utils"

export interface OrderExpandableCardLineItem {
  id: string
  name: string
  qty: number
  price: string
  imageSrc?: string
  imageAlt?: string
}

export interface OrderExpandableCardDetail {
  label: string
  value: React.ReactNode
}

export interface OrderExpandableCardStatusBadge {
  label: string
  variant?: React.ComponentProps<typeof Badge>["variant"]
}

export interface OrderExpandableCardProps
  extends Omit<React.ComponentProps<typeof Collapsible>, "children"> {
  title: string
  time: string
  amount: string
  statusBadge?: OrderExpandableCardStatusBadge
  items?: OrderExpandableCardLineItem[]
  details?: OrderExpandableCardDetail[]

  containerClassName?: string
  triggerClassName?: string
  contentClassName?: string
}

/**
 * Order expandable card (Design System)
 *
 * Rich accordion row pattern used in Admin/Manager orders lists:
 * - Header: order title + time + amount + optional status badge
 * - Expanded: line items + key/value detail list
 *
 * Intended usage: render multiple cards in a vertical list.
 */
export function OrderExpandableCard({
  title,
  time,
  amount,
  statusBadge,
  items = [],
  details = [],
  className,
  containerClassName,
  triggerClassName,
  contentClassName,
  ...props
}: OrderExpandableCardProps) {
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
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>

          <div className="text-right flex flex-col items-end gap-2 shrink-0 pl-6">
            <div className="font-mono font-medium text-sm">{amount}</div>
            {statusBadge ? (
              <Badge variant={statusBadge.variant ?? "destructive"}>{statusBadge.label}</Badge>
            ) : null}
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className={cn("border-t border-border/60 px-5 pb-5 pt-4 space-y-4", contentClassName)}>
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className={cn("space-y-3", idx !== items.length - 1 ? "pb-3 border-b border-dashed border-border/60" : undefined)}>
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 min-w-0">
                      <ImageTile size="small" src={item.imageSrc} alt={item.imageAlt ?? item.name} />
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-semibold tracking-tight truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">Qty: {item.qty}</div>
                      </div>
                    </div>
                    <div className="font-mono text-sm shrink-0">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {details.length > 0 ? (
            <div className={cn("space-y-1 text-xs", items.length > 0 ? "pt-1" : undefined)}>
              {details.map((row, idx) => (
                <div
                  key={`${row.label}-${idx}`}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
                >
                  <span className="text-muted-foreground">{row.label}:</span>
                  <span className="text-foreground font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

