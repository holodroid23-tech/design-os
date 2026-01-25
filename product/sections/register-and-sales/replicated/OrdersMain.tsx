import * as React from "react"
import { Folder, Minus, Plus, Trash2 } from "lucide-react"

import { OrderExpandableSummary, type OrderExpandableSummaryItem } from "@/components/ui/order-expandable-summary"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { SectionTitle } from "@/components/ui/section-title"
import { OrderTabs } from "@/components/ui/order-tabs"
import { OrderProductTile } from "@/components/ui/order-product-tile"
import { GridActionTile } from "@/components/patterns/grid-action-tile"
import { cn } from "@/lib/utils"
import ItemManagementNewItem from "../../settings-and-configuration/replicated/ItemManagementNewItem"
import OrderEditTab from "./OrderEditTab"

// Store imports
import { useOrderStore } from "@/stores/useOrderStore"
import { useInventoryStore } from "@/stores/useInventoryStore"
import { useSettingsStore } from "@/stores/useSettingsStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrdersMainProps {
  onPayCash?: (order: any) => void
  onPayCard?: (order: any) => void
  onAddOrder?: () => void // Kept for API compatibility if used by parent, but mostly handled internally now
}

function chunkArray<T>(items: T[], chunkSize: number) {
  if (chunkSize <= 0) return [items]
  const out: T[][] = []
  for (let i = 0; i < items.length; i += chunkSize) out.push(items.slice(i, i + chunkSize))
  return out
}

export default function OrdersMain({
  onPayCash,
  onPayCard,
  onAddOrder: onAddOrderProp,
}: OrdersMainProps) {
  // Global State
  const {
    tabs,
    activeTabId,
    setActiveTab,
    addTab,
    addItemToOrder,
    increaseItemQty,
    decreaseItemQty,
    removeItemFromOrder,
    clearOrder,
    updateTabLabel,
    removeTab
  } = useOrderStore()

  const { items: inventoryItems } = useInventoryStore()
  const { taxRate, areTaxesEnabled, currency } = useSettingsStore()

  // Local State
  const [isAddingItem, setIsAddingItem] = React.useState(false)
  const [editingTabId, setEditingTabId] = React.useState<string | null>(null)

  // Computed State
  const activeTab = tabs.find(t => t.id === activeTabId)

  // Format inventory items for the list
  const formattedInventoryItems = React.useMemo(() => {
    return inventoryItems.map(item => ({
      ...item,
      // Calculate if in current order
      count: activeTab?.items.find(i => i.productId === item.id)?.qty || 0
    }))
  }, [inventoryItems, activeTab])

  const favoritesItems = React.useMemo(() => {
    return formattedInventoryItems.filter(i => i.isFavorite)
  }, [formattedInventoryItems])

  const favoritePages = React.useMemo(() => chunkArray(favoritesItems, 9), [favoritesItems])

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

  // Handlers
  const handleAddTab = () => {
    addTab()
    onAddOrderProp?.()
  }

  const handlePayCash = () => {
    if (activeTabId && activeTab) {
      onPayCash?.(activeTab)
    }
  }

  const handlePayCard = () => {
    if (activeTabId && activeTab) {
      onPayCard?.(activeTab)
    }
  }

  const handleEditTab = (tabId: string) => {
    setEditingTabId(tabId)
  }

  const handleSaveTabName = ({ orderName }: { orderName: string }) => {
    if (editingTabId) {
      updateTabLabel(editingTabId, orderName)
      setEditingTabId(null)
    }
  }

  const handleClearTab = () => {
    if (editingTabId) {
      clearOrder(editingTabId)
      setEditingTabId(null)
    }
  }

  const handleDeleteTab = () => {
    if (editingTabId) {
      removeTab(editingTabId)
      setEditingTabId(null)
    }
  }

  // Inventory tiles (static for now, could be dynamic categories later)
  const inventoryTiles = [
    { id: "custom-item", label: "Custom item", icon: Plus, iconClassName: "text-primary" },
    { id: "iced-drinks", label: "Iced drinks", icon: Folder, iconClassName: "text-layer-info" },
    { id: "pastries", label: "Pastries", icon: Folder, iconClassName: "text-layer-info" },
  ]

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
  }

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Block 1: Order switcher */}
        <div className="sticky top-0 z-50 isolate bg-background border-b border-border px-4 pt-4 pb-4 min-h-[100px]">
          <OrderTabs
            tabs={tabs.map(t => ({
              id: t.id,
              label: t.label,
              count: t.items.reduce((acc, i) => acc + i.qty, 0) || undefined
            }))}
            value={activeTabId}
            onValueChange={setActiveTab}
            onAddTab={handleAddTab}
            onTabClick={handleEditTab}
            addTabAriaLabel="Add order"
          />
        </div>

        {/* Block 2: Favorites grid */}
        <div className="px-4 pt-6">
          <SectionTitle titleAs="h2">Favorites</SectionTitle>

          <div className="mt-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {favoritePages.length === 0 ? (
              <div className="text-sm text-muted-foreground italic">No favorites yet. Mark items as favorite in inventory to see them here.</div>
            ) : (
              <div className="flex gap-3">
                {favoritePages.map((page, pageIdx) => (
                  <div key={pageIdx} className="min-w-full shrink-0 snap-start">
                    <div className="grid grid-cols-3 gap-3">
                      {page.map((item) => {
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
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Block 3: Inventory */}
        <div className="px-4 pt-8 pb-10">
          <div className="flex items-center justify-between gap-4">
            <SectionTitle titleAs="h2">Inventory</SectionTitle>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {inventoryTiles.map((tile) => (
              <GridActionTile
                key={tile.id}
                icon={tile.icon}
                label={tile.label}
                iconClassName={tile.iconClassName}
                onClick={() => {
                  if (tile.id === "custom-item") setIsAddingItem(true)
                }}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {formattedInventoryItems.map((item) => {
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

      {isAddingItem && (
        <ItemManagementNewItem onClose={() => setIsAddingItem(false)} />
      )}

      {editingTabId && (
        <OrderEditTab
          open={!!editingTabId}
          onClose={() => setEditingTabId(null)}
          onCancel={() => setEditingTabId(null)}
          onSave={handleSaveTabName}
          onClearOrder={handleClearTab}
          onDeleteOrderTab={handleDeleteTab}
          orderName={tabs.find(t => t.id === editingTabId)?.label}
          defaultOrderName={tabs.find(t => t.id === editingTabId)?.label}
        />
      )}
    </div>
  )
}

