import * as React from "react"

import { SectionTitle } from "@/components/ui/section-title"
import { OrderTabs } from "@/components/ui/order-tabs"
import { ProductTile } from "@/components/ui/product-tile"

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

  favoritesItems?: {
    id: string
    name: string
    price: string
    imageSrc?: string
    imageAlt?: string
  }[]
  onPressFavoriteItem?: (itemId: string) => void
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

export default function OrdersMain({
  tabs = [
    { id: "dine-in-4", label: "Dine-in #4", count: 3 },
    { id: "takeout-5", label: "Takeout #5" },
    { id: "dine-in-6", label: "Dine-in #6", count: 12 },
  ],
  selectedTabId,
  onSelectTab,
  onAddOrder,
  favoritesItems = [
    {
      id: "latte",
      name: "Latte",
      price: "$4.75",
      imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Latte",
    },
    { id: "espresso", name: "Espresso", price: "$3.00" },
    {
      id: "mocha",
      name: "Mocha",
      price: "$5.00",
      imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Mocha",
    },
    { id: "cappuccino", name: "Cappuccino", price: "$4.50" },
    {
      id: "flat-white",
      name: "Flat White",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Flat White",
    },
    { id: "taro-latte", name: "Taro Latte", price: "$5.50" },
    {
      id: "americano",
      name: "Americano",
      price: "$3.50",
      imageSrc: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Americano",
    },
    { id: "matcha", name: "Matcha", price: "$5.25" },
    {
      id: "cold-brew",
      name: "Cold Brew",
      price: "$4.50",
      imageSrc: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Cold brew",
    },
  ],
  onPressFavoriteItem,
}: OrdersMainProps) {
  const fallbackSelected = tabs[0]?.id ?? "default"
  const [selected, setSelected] = useControllableState(selectedTabId, fallbackSelected)

  React.useEffect(() => {
    if (tabs.length === 0) return
    const exists = tabs.some((t) => t.id === selected)
    if (!exists) setSelected(tabs[0]?.id ?? fallbackSelected)
  }, [fallbackSelected, selected, setSelected, tabs])

  return (
    <div className="min-h-full w-full bg-background">
      {/* Block 1: Order switcher */}
      <div className="px-4 pt-4">
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

        <div className="mt-3 grid grid-cols-3 gap-3">
          {favoritesItems.map((item) => (
            <ProductTile
              key={item.id}
              name={item.name}
              price={item.price}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              onPress={() => onPressFavoriteItem?.(item.id)}
              tone="surface"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

