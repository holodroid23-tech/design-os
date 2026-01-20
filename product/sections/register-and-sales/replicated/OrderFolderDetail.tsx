import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react"

import { OrderExpandableSummary, type OrderExpandableSummaryItem } from "@/components/ui/order-expandable-summary"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { SectionTitle } from "@/components/ui/section-title"
import { OrderProductTile } from "@/components/ui/order-product-tile"
import { Button } from "@/components/ui/button"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrderFolderDetailProps {
  title?: string
  onBack?: () => void

  orderTitle?: string
  orderTax?: number
  orderItems?: OrderExpandableSummaryItem[]
  onIncreaseOrderItem?: (itemId: string) => void
  onDecreaseOrderItem?: (itemId: string) => void
  onPayCash?: () => void
  onPayCard?: () => void

  items?: {
    id: string
    name: string
    price: string
    imageSrc?: string
    imageAlt?: string
    count?: number
  }[]
  onPressItem?: (itemId: string) => void
  onPressIncrease?: (itemId: string) => void
  onPressDecrease?: (itemId: string) => void
  onPressRemove?: (itemId: string) => void
}

export default function OrderFolderDetail({
  title = "Iced drinks",
  onBack,
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
  items = [
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
  onPressItem,
  onPressIncrease,
  onPressDecrease,
  onPressRemove,
}: OrderFolderDetailProps) {
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
              {title}
            </SectionTitle>
          </Button>
        </div>

        {/* Items grid (no favorites, no inventory title, no custom item/folders tiles) */}
        <div className="px-6 pt-6 pb-10">
          <div className="grid grid-cols-3 gap-3">
            {items.map((item) => {
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
                  onPress={() => onPressItem?.(item.id)}
                  leftAction={
                    inOrder
                      ? {
                          icon: leftIcon,
                          label: leftLabel,
                          onPress: () => {
                            if (count <= 1) onPressRemove?.(item.id)
                            else onPressDecrease?.(item.id)
                          },
                        }
                      : undefined
                  }
                  rightAction={
                    inOrder
                      ? {
                          icon: Plus,
                          label: "Increase",
                          onPress: () => onPressIncrease?.(item.id),
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
      <FloatingBottomBar>
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

