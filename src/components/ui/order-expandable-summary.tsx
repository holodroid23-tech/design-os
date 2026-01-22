"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "@/components/ui/bottom-sliding-modal"
import { OrderLineItemRow } from "@/components/ui/order-line-item-row"
import { SectionTitle } from "@/components/ui/section-title"
import {
  SearchInputWithSuggestions,
  type SearchSuggestion,
} from "@/components/ui/search-input-with-suggestions"
import { ImageTile } from "@/components/ui/image-tile"
import { SettingsGroup } from "@/components/settings/settings-group"
import { cn } from "@/lib/utils"

export interface OrderExpandableSummaryItem {
  id: string
  name: string
  qty: number
  unitPrice: number
  imageSrc?: string
  imageAlt?: string
}

export interface OrderExpandableSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: OrderExpandableSummaryItem[]

  /**
   * Optional: provide a pre-formatted collapsed summary line.
   * If omitted, it will be derived from `items`.
   */
  summaryText?: string

  /**
   * Optional: title shown in the expanded sheet header.
   */
  orderTitle?: string

  /**
   * Optional: provide explicit values. If omitted, `subtotal` and `total`
   * are derived from `items`, and `tax` defaults to 1.50 (demo-friendly).
   */
  subtotal?: number
  tax?: number
  total?: number

  /**
   * Currency formatting function for computed numbers.
   */
  formatMoney?: (value: number) => string

  open?: boolean
  onOpenChange?: (open: boolean) => void

  onIncreaseItem?: (itemId: string) => void
  onDecreaseItem?: (itemId: string) => void

  onPayCash?: () => void
  onPayCard?: () => void

  collapsedAriaLabel?: string
  collapsedClassName?: string
  contentClassName?: string
}

function defaultFormatMoney(value: number) {
  return `$${value.toFixed(2)}`
}

function buildSummaryText(items: OrderExpandableSummaryItem[], maxChars: number) {
  const base = items
    .map((item) => (item.qty > 1 ? `${item.name} (${item.qty})` : item.name))
    .join(", ")
  return base.length > maxChars ? `${base.slice(0, Math.max(0, maxChars - 3))}...` : base
}

/**
 * Expandable order summary (Design System)
 *
 * Persistent bottom bar that expands into a bottom sliding modal containing:
 * - Order title + collapse affordance
 * - Search input with suggestions (derived from items)
 * - Line item list with quantity controls
 * - Totals + payment actions
 */
export function OrderExpandableSummary({
  items,
  orderTitle = "Order #402 - Table 4",
  summaryText,
  subtotal,
  tax,
  total,
  formatMoney = defaultFormatMoney,
  open,
  onOpenChange,
  onIncreaseItem,
  onDecreaseItem,
  onPayCash,
  onPayCard,
  collapsedAriaLabel = "Expand order",
  className,
  collapsedClassName,
  contentClassName,
  ...props
}: OrderExpandableSummaryProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? (open as boolean) : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const computedSubtotal = React.useMemo(
    () => subtotal ?? items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0),
    [items, subtotal]
  )

  const computedTax = tax ?? 1.5
  const computedTotal = total ?? computedSubtotal + computedTax

  const collapsedSummary = React.useMemo(
    () => summaryText ?? buildSummaryText(items, 30),
    [items, summaryText]
  )

  const suggestions: SearchSuggestion[] = React.useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        label: item.name,
        leading: item.imageSrc ? <ImageTile size="small" src={item.imageSrc} alt={item.imageAlt ?? item.name} /> : undefined,
        price: formatMoney(item.unitPrice),
      })),
    [formatMoney, items]
  )

  return (
    <div className={cn("w-full", className)} {...props}>
      <BottomSlidingModal open={isOpen} onOpenChange={handleOpenChange}>
        <BottomSlidingModalTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full cursor-pointer active:scale-[0.99] transition-all relative group h-[96px] flex flex-col justify-center text-left",
              // Hide when maximized to avoid "double card" look.
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
              // Darker, more “elevated” surface for the floating summary bar.
              "overflow-hidden rounded-[18px] border border-white/10 shadow-layered",
              "bg-stone-900 text-foreground",
              "supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:bg-stone-900/90",
              collapsedClassName
            )}
            aria-label={collapsedAriaLabel}
          >
            <div className="flex items-center justify-between mt-1 px-4">
              <div className="flex flex-col min-w-0">
                <div className="text-[30px] leading-none font-bold tracking-tight font-mono">
                  {formatMoney(computedTotal)}
                </div>
                <div className="text-[12px] leading-[16px] text-onLayer-secondary mt-1 truncate max-w-[240px]">
                  {collapsedSummary}
                </div>
              </div>

              <Button
                asChild
                variant="invisible"
                size="icon"
                // Match the standard invisible icon-button pattern, but remove the circular hover “blob”
                // since this control sits on a floating bar already.
                className="text-onLayer-secondary hover:text-onLayer-primary hover:bg-transparent dark:hover:bg-transparent"
              >
                <span aria-hidden="true">
                  <SystemIcon icon={ChevronDown} size="huge" className="rotate-180" aria-hidden="true" />
                </span>
              </Button>
            </div>
          </button>
        </BottomSlidingModalTrigger>

        <BottomSlidingModalContent
          fullHeight
          className={contentClassName}
          header={
            <SectionTitle
              titleAs="h2"
              className="[&_*]:text-onLayer-primary"
              trailing={
                <BottomSlidingModalClose asChild>
                  <Button
                    variant="invisible"
                    size="icon"
                    aria-label="Collapse order"
                    className="text-onLayer-secondary hover:text-onLayer-primary hover:bg-layer-2"
                  >
                    <SystemIcon icon={ChevronDown} size="big" aria-hidden="true" />
                  </Button>
                </BottomSlidingModalClose>
              }
            >
              {orderTitle}
            </SectionTitle>
          }
          footer={
            <div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatMoney(computedSubtotal)}</span>
                </div>

                <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                  <span>Tax</span>
                  <span className="font-mono">{formatMoney(computedTax)}</span>
                </div>

                <div className="flex justify-between items-end pt-4 mt-2">
                  <span className="text-regular-semibold text-onLayer-secondary mb-1.5">Total</span>
                  <div className="text-[22px] leading-[30px] font-semibold tracking-tight font-mono text-onLayer-primary">
                    {formatMoney(computedTotal)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="default"
                  className="h-12 rounded-[12px]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPayCash?.()
                  }}
                >
                  Pay cash
                </Button>
                <Button
                  type="button"
                  variant="default"
                  className="h-12 rounded-[12px]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPayCard?.()
                  }}
                >
                  Pay card
                </Button>
              </div>
            </div>
          }
          scaffoldProps={{
            // Darker expanded surface to match the collapsed bar.
            className: "bg-black text-foreground border-border-inverse",
            headerClassName: "px-6 pt-7 pb-4",
            bodyClassName: "min-h-0",
            footerClassName: "bg-black border-t border-border-inverse p-6 pt-5",
          }}
        >
          <div className="px-6 pb-4">
            <SearchInputWithSuggestions
              placeholder="Search items..."
              suggestions={suggestions}
              tone="onLayer"
              className="h-10 rounded-[12px] bg-layer-2 border-border-inverse text-onLayer-primary placeholder:text-onLayer-tertiary"
            />
          </div>

          <div className="px-6 pb-6">
            <SettingsGroup className="border-border-inverse">
              {items.map((item) => (
                <OrderLineItemRow
                  key={item.id}
                  name={item.name}
                  quantity={item.qty}
                  price={formatMoney(item.unitPrice)}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  onDecrease={onDecreaseItem ? () => onDecreaseItem(item.id) : undefined}
                  onIncrease={onIncreaseItem ? () => onIncreaseItem(item.id) : undefined}
                />
              ))}
            </SettingsGroup>
          </div>
        </BottomSlidingModalContent>
      </BottomSlidingModal>
    </div>
  )
}

