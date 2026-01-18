/**
 * OrderFolderDetail - Replicated design
 *
 * This component replicates the `order-folder-detail.png` mockup using the Compost design system.
 */

import { ChevronLeft, Plus, Minus, Trash2, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Order, Product } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrderFolderDetailProps {
  folderName: string
  products: Product[]
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

export default function OrderFolderDetail({
  folderName,
  products,
  activeOrder,
  quantityByProductId,
  onBack,
  onAddItem,
  onRemoveOne,
  onRemoveAll,
  onOpenCart,
}: OrderFolderDetailProps) {
  const qty = quantityByProductId ?? {}

  return (
    <div className="relative min-h-full bg-layer-level-0 text-foreground">
      <div className="p-4 pt-6">
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={onBack}
            className="h-10 w-10 rounded-[9999px] bg-layer-2 border border-border flex items-center justify-center"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-[26px] font-semibold tracking-tight">{folderName}</h1>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {products.slice(0, 12).map((product, index) => {
            const count = qty[product.id] ?? 0
            const isSelected = count > 0
            const hasImage = Boolean(product.image)

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onAddItem?.(product.id)}
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
                  <div className="absolute top-2 right-2 h-6 min-w-6 px-2 rounded-[9999px] bg-layer-3 text-foreground text-[12px] font-semibold flex items-center justify-center">
                    {count}
                  </div>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onRemoveOne?.(product.id)
                      }}
                      className="absolute bottom-2 left-2 h-9 w-9 rounded-[9999px] bg-layer-3 border border-border flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onAddItem?.(product.id)
                      }}
                      className="absolute bottom-2 right-2 h-9 w-9 rounded-[9999px] bg-layer-3 border border-border flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </>
                ) : null}

                {/* Delete shortcut (only when quantity exists) */}
                {isSelected && index === 5 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onRemoveAll?.(product.id)
                    }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 rounded-[9999px] bg-destructive text-primary-foreground flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="h-28" />
      </div>

      {/* Minimized cart */}
      <button
        type="button"
        onClick={onOpenCart}
        className="fixed left-0 right-0 bottom-0 bg-layer-1 border-t border-border px-5 py-4"
      >
        <div className="flex items-end justify-between gap-4">
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
      </button>
    </div>
  )
}

