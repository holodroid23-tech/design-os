import * as React from "react"
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react"

import { OrderExpandableSummary, type OrderExpandableSummaryItem } from "@/components/ui/order-expandable-summary"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { SectionTitle } from "@/components/ui/section-title"
import { OrderProductTile } from "@/components/ui/order-product-tile"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useOrderStore } from "@/stores/useOrderStore"
import { useInventoryStore } from "@/stores/useInventoryStore"
import { useSettingsStore } from "@/stores/useSettingsStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrderFolderDetailProps {
  categoryId: string
  onBack?: () => void
}

export default function OrderFolderDetail({
  categoryId,
  onBack,
}: OrderFolderDetailProps) {
  const { items: inventoryItems, categories } = useInventoryStore()
  const {
    activeTabId,
    tabs,
    addItemToOrder,
    increaseItemQty,
    decreaseItemQty,
    removeItemFromOrder,
  } = useOrderStore()
  const { onPayCash, onPayCard } = useOrderStore() as any // Workaround if they exist or just pass them
  const { taxRate, areTaxesEnabled, currency } = useSettingsStore()

  const category = categories.find(c => c.id === categoryId)
  const categoryItems = inventoryItems.filter(i => i.categoryId === categoryId)
  const activeTab = tabs.find(t => t.id === activeTabId)

  // Format inventory items for the list
  const formattedItems = React.useMemo(() => {
    return categoryItems.map(item => ({
      ...item,
      count: activeTab?.items.find(i => i.productId === item.id)?.qty || 0
    }))
  }, [categoryItems, activeTab])

  // Format order items for summary
  const orderSummaryItems: OrderExpandableSummaryItem[] = React.useMemo(() => {
    if (!activeTab) return []
    return activeTab.items.map(item => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
      unitPrice: item.unitPrice,
      imageSrc: item.imageSrc,
      imageAlt: item.imageAlt
    }))
  }, [activeTab])

  // Calculated tax amount
  const orderSubtotal = orderSummaryItems.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0)
  const orderTaxAmount = areTaxesEnabled ? orderSubtotal * taxRate : 0

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
  }

  const handlePayCash = () => {
    if (activeTab) onPayCash?.(activeTab)
  }

  const handlePayCard = () => {
    if (activeTab) onPayCard?.(activeTab)
  }
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Header: back + title (replaces order tabs) */}
        <div className="sticky top-0 z-40 border-b bg-background px-6 py-4">
          <Button
            type="button"
            variant="invisible"
            className="group w-full h-auto p-0 justify-start text-left"
            aria-label="Back"
            onClick={onBack}
          >
            <SectionTitle
              interactive
              leading={
                <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
              }
            >
              {category?.name || "Folder"}
            </SectionTitle>
          </Button>
        </div>

        {/* Items grid (no favorites, no inventory title, no custom item/folders tiles) */}
        <div className="px-6 pt-6 pb-10">
          <div className="grid grid-cols-3 gap-3">
            {formattedItems.map((item) => {
              const count = item.count
              const leftIcon = count <= 1 ? Trash2 : Minus
              const leftLabel = count <= 1 ? "Remove" : "Decrease"
              const inOrder = count > 0

              return (
                <OrderProductTile
                  key={item.id}
                  name={item.name}
                  price={formatPrice(item.price)}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  tone={(item.color as any) || "surface"}
                  count={inOrder ? count : undefined}
                  onPress={() => activeTabId && addItemToOrder(activeTabId, item)}
                  leftAction={
                    inOrder
                      ? {
                        icon: leftIcon,
                        label: leftLabel,
                        onPress: () => {
                          if (activeTabId) {
                            if (count <= 1) removeItemFromOrder(activeTabId, item.id)
                            else decreaseItemQty(activeTabId, item.id)
                          }
                        },
                      }
                      : undefined
                  }
                  rightAction={
                    inOrder
                      ? {
                        icon: Plus,
                        label: "Increase",
                        onPress: () => activeTabId && increaseItemQty(activeTabId, item.id),
                      }
                      : undefined
                  }
                />
              )
            })}
          </div>
        </div>

        {/* Reserve space for the floating order summary bar */}
        <FloatingBottomBarSpacer />
      </div>

      {/* Floating order summary bar (overlays content) */}
      <FloatingBottomBar
        insetClassName="px-4 pb-[96px]"
        className={cn(
          "transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
          orderSummaryItems.length > 0
            ? "translate-y-0 opacity-100"
            : "translate-y-[200%] opacity-0 pointer-events-none"
        )}
      >
        <OrderExpandableSummary
          items={orderSummaryItems}
          orderTitle={activeTab?.label || "Order"}
          tax={orderTaxAmount}
          onIncreaseItem={(itemId) => activeTabId && increaseItemQty(activeTabId, itemId)}
          onDecreaseItem={(itemId) => activeTabId && decreaseItemQty(activeTabId, itemId)}
          onPayCash={handlePayCash}
          onPayCard={handlePayCard}
          formatMoney={formatPrice}
        />
      </FloatingBottomBar>
    </div>
  )
}

