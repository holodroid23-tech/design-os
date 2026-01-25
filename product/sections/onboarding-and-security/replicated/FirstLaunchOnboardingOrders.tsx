import * as React from "react"
import { Hand, Plus } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import { OrderTabs, type OrderTabsTab } from "@/components/ui/order-tabs"
import { GridActionTile } from "@/components/patterns/grid-action-tile"
import { ProductTile, type ProductTileProps } from "@/components/ui/product-tile"

export const designOS = {
  presentation: "mobile" as const,
}

export type FirstLaunchOnboardingOrdersItem = {
  id: string
  name: string
  price?: string
  /**
   * Uses DS semantic tile tones (avoid hard-coded colors).
   */
  tone?: ProductTileProps["tone"]
  imageSrc?: string
  imageAlt?: string
}

export interface FirstLaunchOnboardingOrdersProps {
  tabs?: OrderTabsTab[]
  selectedTabId?: string
  onSelectTab?: (tabId: string) => void
  onAddOrder?: () => void

  items?: FirstLaunchOnboardingOrdersItem[]
  onPressItem?: (itemId: string) => void
  onPressCustomItem?: () => void

  title?: string
  descriptionPrefix?: string
  descriptionLinkText?: string
  descriptionSuffix?: string
  onPressManageInventory?: () => void
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

export default function FirstLaunchOnboardingOrders({
  tabs = [{ id: "order-1", label: "Order 1" }],
  selectedTabId,
  onSelectTab,
  onAddOrder,
  items = [
    { id: "cappuccino", name: "Cappuccino", price: "$4.50", tone: "primary" },
    {
      id: "latte",
      name: "Latte",
      price: "$4.75",
      tone: "surface",
      imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Latte",
    },
    { id: "espresso", name: "Espresso", price: "$3.00", tone: "amber" },
    { id: "taro-latte", name: "Taro Latte", price: "$5.50", tone: "purple" },
    {
      id: "americano",
      name: "Americano",
      price: "$3.50",
      tone: "surface",
      imageSrc: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Americano",
    },
    {
      id: "mocha",
      name: "Mocha",
      price: "$5.00",
      tone: "surface",
      imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=640&auto=format&fit=crop",
      imageAlt: "Mocha",
    },
    { id: "flat-white", name: "Flat White", price: "$4.25", tone: "secondary" },
    { id: "iced-latte", name: "Iced Latte", price: "$4.75", tone: "sky" },
  ],
  onPressItem,
  onPressCustomItem,
  title = "Welcome to your new shop!",
  descriptionPrefix = "Tap any item to start your first order or go to Settings to ",
  descriptionLinkText = "manage your inventory",
  descriptionSuffix = ".",
  onPressManageInventory,
}: FirstLaunchOnboardingOrdersProps) {
  const fallbackSelected = tabs[0]?.id ?? "order-1"
  const [selected, setSelected] = useControllableState(selectedTabId, fallbackSelected)

  React.useEffect(() => {
    if (tabs.length === 0) return
    const exists = tabs.some((t) => t.id === selected)
    if (!exists) setSelected(tabs[0]?.id ?? fallbackSelected)
  }, [fallbackSelected, selected, setSelected, tabs])

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-gradient-to-b from-background via-background to-layer-1">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Header: order tab */}
        <div className="px-6 pt-6">
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

        {/* Starter grid */}
        <div className="px-6 pt-6">
          <div className="grid grid-cols-3 gap-3">
            <GridActionTile
              icon={Plus}
              label="Custom item"
              iconClassName="text-primary"
              onClick={() => onPressCustomItem?.()}
            />

            {items.slice(0, 8).map((item) => (
              <ProductTile
                key={item.id}
                name={item.name}
                price={item.price}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                tone={item.tone ?? "surface"}
                showImageScrim
                onPress={() => onPressItem?.(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Welcome / onboarding hint */}
        <div className="flex flex-col items-center text-center px-8 pt-10 pb-10">
          <div className="size-16 rounded-full bg-layer-2 flex items-center justify-center">
            <SystemIcon icon={Hand} size="big" className="text-primary" aria-hidden="true" />
          </div>

          <div className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {descriptionPrefix}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-primary"
              onClick={() => onPressManageInventory?.()}
            >
              {descriptionLinkText}
            </Button>
            {descriptionSuffix}
          </p>
        </div>
      </div>
    </div>
  )
}

