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
  color?: string
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
  return `${value.toFixed(2)} Kč`
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
              "w-full cursor-pointer active:scale-[0.99] transition-all relative group h-[72px] flex flex-col justify-center text-left px-5",
              // Hide when maximized `to avoid "double card" look.
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
              // Darker, more “elevated” surface for the floating summary bar.
              "glass-floating-bar",
              collapsedClassName
            )}
            aria-label={collapsedAriaLabel}
          >
            <div className="flex items-center justify-between w-full">
              {/* Left Side: Summary Text */}
              <div className="flex flex-col min-w-0 pr-4">
                <div className="text-[14px] leading-tight font-medium text-onLayer-secondary truncate">
                  {collapsedSummary || "No items"}
                </div>
                <div className="text-[12px] leading-tight text-onLayer-tertiary">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </div>
              </div>

              {/* Right Side: Total Price & Chevron */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-[24px] leading-none font-bold tracking-tight font-mono whitespace-nowrap">
                  {formatMoney(computedTotal)}
                </div>

                <Button
                  asChild
                  variant="invisible"
                  size="icon"
                  className="text-onLayer-secondary group-hover:text-onLayer-primary hover:bg-transparent dark:hover:bg-transparent -mr-2"
                >
                  <span aria-hidden="true">
                    <SystemIcon icon={ChevronDown} size="big" className="rotate-180" aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>
          </button>
        </BottomSlidingModalTrigger>

        <BottomSlidingModalContent
          fullHeight
          className={cn(contentClassName, "glass-modal-full bg-stone-900/40")}
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
                  variant="secondary"
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
                  variant="secondary"
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
            // Expanded surface: Full screen feel, no shadow, transparent blur background
            className: "bg-transparent",
            headerClassName: "px-6 pt-7 pb-4 bg-transparent",
            bodyClassName: "min-h-0 bg-transparent",
            footerClassName: "bg-transparent border-t border-border-inverse p-6 pt-5",
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
                  color={item.color}
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

