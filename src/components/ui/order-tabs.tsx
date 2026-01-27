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
  onTabClick?: (id: string) => void
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
  onTabClick,
  addTabAriaLabel = "Add order",
  showAddButton = true,
  className,
  ...props
}: OrderTabsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)

  // Track container width for precise space calculation
  React.useLayoutEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Calculate if tabs fit in a single row based on estimated width
  // Heuristic: Add button (40px) + Gap (8px) + Label chars (approx 7.2px each) + Padding (32px)
  const isTwoRows = React.useMemo(() => {
    if (containerWidth === 0) return false

    let totalWidth = showAddButton ? 48 : 0
    for (const tab of tabs) {
      const hasCount = Boolean(tab.count && tab.count > 0)
      const estimatedTabWidth =
        (tab.label.length * 7.2) +
        (hasCount ? 28 : 0) + // Space for the green count badge
        32 + // Horizontal padding (px-4)
        8    // Gap (gap-2)
      totalWidth += estimatedTabWidth
    }

    // Break only if we actually exceed the 100% width
    return totalWidth > containerWidth
  }, [tabs, containerWidth, showAddButton])

  // Sequential splitting (1, 2, 3... then 4, 5, 6...)
  const midIndex = isTwoRows ? Math.floor(tabs.length / 2) + 1 : tabs.length
  const topRow = tabs.slice(0, midIndex)
  const bottomRow = isTwoRows ? tabs.slice(midIndex) : []

  const renderTab = (tab: OrderTabsTab) => {
    const isSelected = value === tab.id
    const hasItems = Boolean(tab.count && tab.count > 0)

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => {
          if (isSelected && onTabClick) {
            onTabClick(tab.id)
          } else {
            onValueChange?.(tab.id)
          }
        }}
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
              isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary text-primary-foreground"
            )}
          >
            {tab.count}
          </span>
        ) : null}
      </button>
    )
  }

  return (
    <div ref={containerRef} className={cn("w-full overflow-x-auto no-scrollbar", className)} {...props}>
      <div className="flex flex-col gap-2 py-1 min-w-max">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          {showAddButton ? (
            <button
              type="button"
              onClick={onAddTab}
              className={cn(
                "flex-shrink-0 h-10 w-10 rounded-full",
                "bg-layer-3 hover:bg-layer-3/80 border border-border",
                "flex items-center justify-center transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "mr-0" // Rely on gap-2
              )}
              aria-label={addTabAriaLabel}
            >
              <SystemIcon icon={Plus} size="regular" className="text-foreground" aria-hidden="true" />
            </button>
          ) : null}
          {topRow.map(renderTab)}
        </div>

        {/* Row 2 */}
        {bottomRow.length > 0 && (
          <div className="flex items-center gap-2">
            {bottomRow.map(renderTab)}
          </div>
        )}
      </div>
    </div>
  )
}

