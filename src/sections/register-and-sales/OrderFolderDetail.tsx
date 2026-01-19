/**
 * OrderFolderDetail - Replicated design
 *
 * This component replicates the `order-folder-detail.png` mockup using the Compost design system.
 */

import { ChevronLeft, Plus, Minus, Trash2, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/ui/section-title'
import type { Order, Product } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrderFolderDetailProps {
  folderName?: string
  products?: Product[]
  activeOrder?: Order
  quantityByProductId?: Record<string, number>
  onBack?: () => void
  onAddItem?: (productId: string) => void
  onRemoveOne?: (productId: string) => void
  onRemoveAll?: (productId: string) => void
  onOpenCart?: () => void
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

function getCartSummary(order?: Order) {
  if (!order) return ''
  const parts = order.items.map((i) => (i.quantity > 1 ? `${i.name} (${i.quantity})` : i.name))
  if (parts.length <= 3) return parts.join(', ')
  return `${parts.slice(0, 3).join(', ')}, …`
}

const DEMO_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Latte', price: 4.75, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p2', name: 'Espresso', price: 3.0, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p3', name: 'Mocha', price: 5.0, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p4', name: 'Cappuccino', price: 4.5, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p5', name: 'Flat White', price: 4.5, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p6', name: 'Taro Latte', price: 5.5, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p7', name: 'Americano', price: 3.5, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p8', name: 'Matcha', price: 5.25, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p9', name: 'Cold Brew', price: 4.5, category: 'Hot Coffees', isFavorite: true, taxRate: 0.1 },
  { id: 'p11', name: 'Blueberry Muffin', price: 3.5, category: 'Pastries', taxRate: 0.05 },
  { id: 'p12', name: 'Sparkling Water', price: 2.5, category: 'Drinks', taxRate: 0.21 },
  { id: 'p13', name: 'Iced Matcha', price: 5.5, category: 'Iced Drinks', taxRate: 0.1 },
]

const DEMO_ORDER: Order = {
  id: 'o1',
  orderNumber: '402',
  name: 'Table 4',
  items: [
    { id: 'oi1', productId: 'p10', name: 'Double Espresso', price: 4.5, quantity: 1 },
    { id: 'oi2', productId: 'p5', name: 'Flat White', price: 4.5, quantity: 1 },
    { id: 'oi3', productId: 'p11', name: 'Blueberry Muffin', price: 3.5, quantity: 1 },
  ],
  subtotal: 12.5,
  tax: 1.15,
  total: 13.65,
}

export default function OrderFolderDetail({
  folderName = 'Hot Coffees',
  products,
  activeOrder = DEMO_ORDER,
  quantityByProductId,
  onBack,
  onAddItem,
  onRemoveOne,
  onRemoveAll,
  onOpenCart,
}: OrderFolderDetailProps = {}) {
  const safeProducts = (products && products.length > 0 ? products : DEMO_PRODUCTS) as Product[]
  const qty = quantityByProductId ?? { p1: 1, p5: 2, p11: 1 }

  return (
    <div className="relative min-h-full bg-layer-level-0 text-foreground">
      <div className="p-4 pt-6">
        <div className="flex items-center gap-3 mb-5">
          <Button
            type="button"
            onClick={onBack}
            variant="secondary"
            size="icon-lg"
            className="h-10 w-10 rounded-[9999px] bg-layer-2 border border-border"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <SectionTitle titleAs="h2">{folderName}</SectionTitle>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {safeProducts.slice(0, 12).map((product, index) => {
            const count = qty[product.id] ?? 0
            const isSelected = count > 0
            const hasImage = Boolean(product.image)

            return (
              <Button
                key={product.id}
                type="button"
                onClick={() => onAddItem?.(product.id)}
                variant={isSelected ? 'default' : 'secondary'}
                className={cn(
                  'relative aspect-square rounded-[18px] overflow-hidden border',
                  isSelected ? 'bg-primary border-transparent text-primary-foreground' : 'bg-layer-2 border-border'
                )}
              >
                {hasImage && !isSelected ? (
                  <>
                    <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-overlay-default/40" />
                  </>
                ) : null}

                {/* Badge */}
                {count > 0 ? (
                  <Badge variant="ghost" className="absolute top-2 right-2 h-6 min-w-6 px-2 rounded-[9999px] bg-layer-3 text-foreground text-[12px] font-semibold border-0">
                    {count}
                  </Badge>
                ) : null}

                {/* Content */}
                <div className="relative h-full w-full flex flex-col items-center justify-center px-3">
                  <div className={cn('text-[14px] font-semibold text-center leading-tight', hasImage && !isSelected ? 'text-primary-foreground' : '')}>
                    {product.name}
                  </div>
                  <div className={cn('mt-1 text-[13px] font-mono opacity-90', hasImage && !isSelected ? 'text-primary-foreground' : '')}>
                    {formatMoney(product.price)}
                  </div>
                </div>

                {/* Quantity controls */}
                {isSelected ? (
                  <>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onRemoveOne?.(product.id)
                      }}
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-2 left-2 h-9 w-9 rounded-[9999px] bg-layer-3 border border-border"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onAddItem?.(product.id)
                      }}
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-2 right-2 h-9 w-9 rounded-[9999px] bg-layer-3 border border-border"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </>
                ) : null}

                {/* Delete shortcut (only when quantity exists) */}
                {isSelected && index === 5 ? (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onRemoveAll?.(product.id)
                    }}
                    variant="destructive"
                    size="icon-sm"
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 rounded-[9999px]"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : null}
              </Button>
            )
          })}
        </div>

        <div className="h-28" />
      </div>

      {/* Minimized cart */}
      <Button
        type="button"
        onClick={onOpenCart}
        variant="ghost"
        className="fixed left-0 right-0 bottom-0 bg-layer-1 border-t border-border px-5 py-4 justify-start"
      >
        <div className="flex items-end justify-between gap-4 w-full">
          <div className="min-w-0 text-left">
            <div className="text-[34px] font-semibold leading-none tracking-tight">
              {formatMoney(activeOrder?.total ?? 0)}
            </div>
            <div className="mt-2 text-[14px] text-muted-foreground truncate">{getCartSummary(activeOrder)}</div>
          </div>

          <div className="flex items-center justify-center h-10 w-10 rounded-[9999px] bg-layer-2 border border-border">
            <ChevronUp className="h-5 w-5" />
          </div>
        </div>
      </Button>
    </div>
  )
}

