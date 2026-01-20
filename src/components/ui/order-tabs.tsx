import * as React from "react"
import { Plus } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { cn } from "@/lib/utils"

export interface OrderTabsTab {
  id: string
  label: string
  count?: number
}

export interface OrderTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  tabs: OrderTabsTab[]
  value: string
  onValueChange?: (next: string) => void
  onAddTab?: () => void
  addTabAriaLabel?: string
  showAddButton?: boolean
}

/**
 * Order tabs (Design System)
 *
 * Domain pattern for switching between active orders.
 * Canonical source: `src/components/patterns/component-examples/sections/order-examples.tsx`
 */
export function OrderTabs({
  tabs,
  value,
  onValueChange,
  onAddTab,
  addTabAriaLabel = "Add order",
  showAddButton = true,
  className,
  ...props
}: OrderTabsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {showAddButton ? (
        <button
          type="button"
          onClick={onAddTab}
          className={cn(
            "flex-shrink-0 h-10 w-10 rounded-full",
            "bg-layer-3 hover:bg-layer-3/80 border border-border",
            "flex items-center justify-center transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label={addTabAriaLabel}
        >
          <SystemIcon icon={Plus} size="regular" className="text-foreground" aria-hidden="true" />
        </button>
      ) : null}

      <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-right">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const isSelected = value === tab.id
            const hasItems = Boolean(tab.count && tab.count > 0)

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onValueChange?.(tab.id)}
                className={cn(
                  "relative group flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-all whitespace-nowrap select-none shrink-0",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-layer-1 hover:bg-layer-1/80 text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                )}
                aria-current={isSelected ? "true" : undefined}
              >
                <span>{tab.label}</span>
                {hasItems ? (
                  <span
                    className={cn(
                      "flex items-center justify-center h-5 min-w-[20px] px-1 rounded text-[10px] font-bold leading-none",
                      isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

