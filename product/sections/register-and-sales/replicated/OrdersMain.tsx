import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { Folder, Minus, Plus, Trash2 } from "lucide-react"

import { OrderExpandableSummary, type OrderExpandableSummaryItem } from "@/components/ui/order-expandable-summary"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { SectionTitle } from "@/components/ui/section-title"
import { OrderTabs } from "@/components/ui/order-tabs"
import { OrderProductTile } from "@/components/ui/order-product-tile"
import { GridActionTile } from "@/components/patterns/grid-action-tile"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrdersMainOrderTab {
  id: string
  label: string
  count?: number
}

export interface OrdersMainProps {
  tabs?: OrdersMainOrderTab[]
  selectedTabId?: string
  onSelectTab?: (tabId: string) => void
  onAddOrder?: () => void

  orderTitle?: string
  orderTax?: number
  orderItems?: OrderExpandableSummaryItem[]
  onIncreaseOrderItem?: (itemId: string) => void
  onDecreaseOrderItem?: (itemId: string) => void
  onPayCash?: () => void
  onPayCard?: () => void

  favoritesItems?: {
    id: string
    name: string
    price: string
    imageSrc?: string
    imageAlt?: string
    count?: number
  }[]
  onPressFavoriteItem?: (itemId: string) => void
  onPressFavoriteIncrease?: (itemId: string) => void
  onPressFavoriteDecrease?: (itemId: string) => void
  onPressFavoriteRemove?: (itemId: string) => void

  inventoryTiles?: {
    id: string
    label: string
    icon?: LucideIcon
    iconClassName?: string
  }[]
  onPressInventoryTile?: (tileId: string) => void

  inventoryItems?: {
    id: string
    name: string
    price: string
    imageSrc?: string
    imageAlt?: string
    count?: number
  }[]
  onPressInventoryItem?: (itemId: string) => void
  onPressInventoryIncrease?: (itemId: string) => void
  onPressInventoryDecrease?: (itemId: string) => void
  onPressInventoryRemove?: (itemId: string) => void
}

function useControllableState(value: string | undefined, defaultValue: string) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const set = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next)
    },
    [isControlled]
  )

  return [current, set] as const
}

function chunkArray<T>(items: T[], chunkSize: number) {
  if (chunkSize <= 0) return [items]
  const out: T[][] = []
  for (let i = 0; i < items.length; i += chunkSize) out.push(items.slice(i, i + chunkSize))
  return out
}

export default function OrdersMain({
  tabs = [
    { id: "dine-in-4", label: "Dine-in #4", count: 3 },
    { id: "takeout-5", label: "Takeout #5" },
    { id: "dine-in-6", label: "Dine-in #6", count: 12 },
  ],
  selectedTabId,
  onSelectTab,
  onAddOrder,
  orderTitle = "Order #402 - Table 4",
  orderTax = 1.5,
  orderItems = [
    {
      id: "cappuccino",
      name: "Cappuccino",
      qty: 2,
      unitPrice: 4.5,
      imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Cappuccino",
    },
    {
      id: "macchiato",
      name: "Macchiato",
      qty: 1,
      unitPrice: 3.25,
      imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Macchiato",
    },
    {
      id: "americano",
      name: "Americano",
      qty: 1,
      unitPrice: 4.75,
      imageSrc: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Americano",
    },
    { id: "latte", name: "Latte", qty: 1, unitPrice: 4.75, imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=256&auto=format&fit=crop", imageAlt: "Latte" },
    { id: "flat-white", name: "Flat White", qty: 2, unitPrice: 4.5, imageSrc: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=256&auto=format&fit=crop", imageAlt: "Flat White" },
    { id: "mocha", name: "Mocha", qty: 1, unitPrice: 5.0, imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop", imageAlt: "Mocha" },
    { id: "espresso", name: "Espresso", qty: 3, unitPrice: 3.0, imageAlt: "Espresso" },
    { id: "cold-brew", name: "Cold Brew", qty: 1, unitPrice: 4.5, imageSrc: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=256&auto=format&fit=crop", imageAlt: "Cold Brew" },
    { id: "matcha", name: "Matcha", qty: 2, unitPrice: 5.25, imageAlt: "Matcha" },
    { id: "cortado", name: "Cortado", qty: 1, unitPrice: 4.0, imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop", imageAlt: "Cortado" },
    { id: "drip", name: "Drip", qty: 2, unitPrice: 3.0, imageAlt: "Drip" },
    { id: "hot-chocolate", name: "Hot Chocolate", qty: 1, unitPrice: 4.25, imageAlt: "Hot Chocolate" },
    { id: "tea", name: "Tea", qty: 2, unitPrice: 2.75, imageAlt: "Tea" },
    { id: "taro-latte", name: "Taro Latte", qty: 1, unitPrice: 5.5, imageAlt: "Taro Latte" },
    { id: "iced-matcha", name: "Iced Matcha", qty: 1, unitPrice: 5.25, imageAlt: "Iced Matcha" },
  ],
  onIncreaseOrderItem,
  onDecreaseOrderItem,
  onPayCash,
  onPayCard,
  favoritesItems = [
    {
      id: "latte",
      name: "Latte",
      price: "$4.75",
      imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Latte",
      count: 1,
    },
    { id: "espresso", name: "Espresso", price: "$3.00", count: 0 },
    {
      id: "mocha",
      name: "Mocha",
      price: "$5.00",
      imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Mocha",
      count: 2,
    },
    { id: "cappuccino", name: "Cappuccino", price: "$4.50", count: 0 },
    {
      id: "flat-white",
      name: "Flat White",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Flat White",
      count: 0,
    },
    { id: "taro-latte", name: "Taro Latte", price: "$5.50", count: 0 },
    {
      id: "americano",
      name: "Americano",
      price: "$3.50",
      imageSrc: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Americano",
      count: 0,
    },
    { id: "matcha", name: "Matcha", price: "$5.25", count: 0 },
    {
      id: "cold-brew",
      name: "Cold Brew",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Cold brew",
      count: 0,
    },
  ],
  onPressFavoriteItem,
  onPressFavoriteIncrease,
  onPressFavoriteDecrease,
  onPressFavoriteRemove,
  inventoryTiles = [
    { id: "custom-item", label: "Custom item", icon: Plus, iconClassName: "text-primary" },
    { id: "iced-drinks", label: "Iced drinks", icon: Folder, iconClassName: "text-layer-info" },
    { id: "pastries", label: "Pastries", icon: Folder, iconClassName: "text-layer-info" },
  ],
  onPressInventoryTile,
  inventoryItems = [
    {
      id: "macchiato",
      name: "Macchiato",
      price: "$3.75",
      imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Macchiato",
      count: 1,
    },
    { id: "drip", name: "Drip", price: "$3.00", count: 0 },
    {
      id: "cortado",
      name: "Cortado",
      price: "$4.00",
      imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Cortado",
      count: 0,
    },
    { id: "iced-matcha", name: "Iced Matcha", price: "$5.25", count: 0 },
    {
      id: "cappuccino",
      name: "Cappuccino",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Cappuccino",
      count: 0,
    },
    { id: "espresso", name: "Espresso", price: "$3.00", count: 0 },
    {
      id: "flat-white",
      name: "Flat White",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Flat White",
      count: 0,
    },
    { id: "taro-latte", name: "Taro Latte", price: "$5.50", count: 0 },
    {
      id: "americano",
      name: "Americano",
      price: "$3.50",
      imageSrc: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Americano",
      count: 0,
    },
    { id: "matcha", name: "Matcha", price: "$5.25", count: 0 },
    {
      id: "cold-brew",
      name: "Cold Brew",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Cold Brew",
      count: 0,
    },
    { id: "mocha", name: "Mocha", price: "$5.00", count: 0 },
    { id: "tea", name: "Tea", price: "$2.75", count: 0 },
    { id: "hot-chocolate", name: "Hot Chocolate", price: "$4.25", count: 0 },
    { id: "croissant", name: "Croissant", price: "$3.25", count: 0 },
    { id: "muffin", name: "Muffin", price: "$2.95", count: 0 },
    { id: "bagel", name: "Bagel", price: "$2.50", count: 0 },
  ],
  onPressInventoryItem,
  onPressInventoryIncrease,
  onPressInventoryDecrease,
  onPressInventoryRemove,
}: OrdersMainProps) {
  const fallbackSelected = tabs[0]?.id ?? "default"
  const [selected, setSelected] = useControllableState(selectedTabId, fallbackSelected)

  React.useEffect(() => {
    if (tabs.length === 0) return
    const exists = tabs.some((t) => t.id === selected)
    if (!exists) setSelected(tabs[0]?.id ?? fallbackSelected)
  }, [fallbackSelected, selected, setSelected, tabs])

  const favoritePages = React.useMemo(() => chunkArray(favoritesItems, 9), [favoritesItems])

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Block 1: Order switcher */}
        <div className="sticky top-0 z-50 isolate bg-background border-b border-border px-4 pt-4 pb-4">
          <OrderTabs
            tabs={tabs}
            value={selected}
            onValueChange={(next) => {
              setSelected(next)
              onSelectTab?.(next)
            }}
            onAddTab={onAddOrder}
            addTabAriaLabel="Add order"
          />
        </div>

        {/* Block 2: Favorites grid */}
        <div className="px-4 pt-6">
          <SectionTitle titleAs="h2">Favorites</SectionTitle>

          <div className="mt-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            <div className="flex gap-3">
              {favoritePages.map((page, pageIdx) => (
                <div key={pageIdx} className="min-w-full shrink-0 snap-start">
                  <div className="grid grid-cols-3 gap-3">
                    {page.map((item) => {
                      const count = item.count ?? 0
                      const leftIcon = count <= 1 ? Trash2 : Minus
                      const leftLabel = count <= 1 ? "Remove" : "Decrease"
                      const inOrder = count > 0

                      return (
                        <OrderProductTile
                          key={item.id}
                          name={item.name}
                          price={item.price}
                          imageSrc={item.imageSrc}
                          imageAlt={item.imageAlt}
                          tone="surface"
                          count={inOrder ? count : undefined}
                          onPress={() => onPressFavoriteItem?.(item.id)}
                          leftAction={
                            inOrder
                              ? {
                                icon: leftIcon,
                                label: leftLabel,
                                onPress: () => {
                                  if (count <= 1) onPressFavoriteRemove?.(item.id)
                                  else onPressFavoriteDecrease?.(item.id)
                                },
                              }
                              : undefined
                          }
                          rightAction={
                            inOrder
                              ? {
                                icon: Plus,
                                label: "Increase",
                                onPress: () => onPressFavoriteIncrease?.(item.id),
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
          </div>
        </div>

        {/* Block 3: Inventory */}
        <div className="px-4 pt-8 pb-10">
          <SectionTitle titleAs="h2">Inventory</SectionTitle>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {inventoryTiles.map((tile) => (
              <GridActionTile
                key={tile.id}
                icon={tile.icon}
                label={tile.label}
                iconClassName={tile.iconClassName}
                onClick={() => onPressInventoryTile?.(tile.id)}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {inventoryItems.map((item) => {
              const count = item.count ?? 0
              const leftIcon = count <= 1 ? Trash2 : Minus
              const leftLabel = count <= 1 ? "Remove" : "Decrease"
              const inOrder = count > 0

              return (
                <OrderProductTile
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  tone="surface"
                  count={inOrder ? count : undefined}
                  onPress={() => onPressInventoryItem?.(item.id)}
                  leftAction={
                    inOrder
                      ? {
                        icon: leftIcon,
                        label: leftLabel,
                        onPress: () => {
                          if (count <= 1) onPressInventoryRemove?.(item.id)
                          else onPressInventoryDecrease?.(item.id)
                        },
                      }
                      : undefined
                  }
                  rightAction={
                    inOrder
                      ? {
                        icon: Plus,
                        label: "Increase",
                        onPress: () => onPressInventoryIncrease?.(item.id),
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
      <FloatingBottomBar insetClassName="px-4 pb-[96px]">
        <OrderExpandableSummary
          items={orderItems}
          orderTitle={orderTitle}
          tax={orderTax}
          onIncreaseItem={onIncreaseOrderItem}
          onDecreaseItem={onDecreaseOrderItem}
          onPayCash={onPayCash}
          onPayCard={onPayCard}
        />
      </FloatingBottomBar>
    </div>
  )
}

