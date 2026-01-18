/**
 * OrdersMain - Replicated design
 *
 * This component replicates the `orders-main.png` mockup using the Compost design system.
 */

import { Plus, Star, Folder, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Order, Product, ProductFolder } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrdersMainProps {
  products: Product[]
  productFolders: ProductFolder[]
  orders: Order[]
  activeOrderId: string
  onSelectOrder?: (orderId: string) => void
  onCreateOrder?: () => void
  onAddItem?: (productId: string) => void
  onOpenFolder?: (folderId: string) => void
  onOpenCart?: () => void
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

function getActiveOrder(orders: Order[], activeOrderId: string) {
  return orders.find((o) => o.id === activeOrderId) ?? orders[0]
}

function getLineItemCount(order?: Order) {
  if (!order) return 0
  return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

function getCartSummary(order?: Order) {
  if (!order) return ''
  const names = order.items.map((i) => i.name)
  if (names.length <= 3) return names.join(', ')
  return `${names.slice(0, 3).join(', ')}, …`
}

function accentForIndex(index: number) {
  const accents = ['bg-layer-info', 'bg-layer-warning', 'bg-layer-recent', 'bg-layer-success', 'bg-layer-highlight']
  return accents[index % accents.length]
}

export default function OrdersMain({
  products,
  productFolders,
  orders,
  activeOrderId,
  onSelectOrder,
  onCreateOrder,
  onAddItem,
  onOpenFolder,
  onOpenCart,
}: OrdersMainProps) {
  const favorites = products.filter((p) => p.isFavorite)
  const activeOrder = getActiveOrder(orders, activeOrderId)

  return (
    <div className="relative min-h-full bg-layer-level-0 text-foreground">
      <div className="p-4 pt-6 space-y-5">
        {/* Order tabs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCreateOrder}
            className="h-10 w-10 rounded-[9999px] bg-layer-3 border border-border flex items-center justify-center"
            aria-label="Create order"
          >
            <Plus className="h-[18px] w-[18px]" />
          </button>

          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {orders.map((order) => {
                const isActive = order.id === activeOrderId
                const count = getLineItemCount(order)

                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => onSelectOrder?.(order.id)}
                    className={cn(
                      'h-10 px-4 rounded-[9999px] text-sm font-medium flex items-center gap-3 border',
                      isActive
                        ? 'bg-primary text-primary-foreground border-transparent'
                        : 'bg-layer-2 text-muted-foreground border-border'
                    )}
                  >
                    <span className="truncate max-w-[120px]">{order.name}</span>
                    {count > 0 ? (
                      <span
                        className={cn(
                          'h-6 min-w-6 px-2 rounded-[9999px] text-[12px] font-semibold flex items-center justify-center',
                          isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-layer-3 text-foreground'
                        )}
                      >
                        {count}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Favorites */}
        <div className="flex items-center gap-2 pt-2">
          <Star className="h-5 w-5 text-primary" />
          <h2 className="text-[22px] font-semibold tracking-tight">Favorites</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {favorites.slice(0, 9).map((product, idx) => {
            const hasImage = Boolean(product.image)
            const accent = accentForIndex(idx)
            const textClass = hasImage ? 'text-primary-foreground' : 'text-background'

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onAddItem?.(product.id)}
                className={cn(
                  'relative aspect-square rounded-[18px] overflow-hidden border border-border',
                  hasImage ? 'bg-layer-2' : accent
                )}
              >
                {hasImage ? (
                  <>
                    <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-overlay-default/40" />
                  </>
                ) : null}

                <div className={cn('relative h-full w-full flex flex-col items-center justify-center p-3', textClass)}>
                  <div className="text-[15px] font-semibold leading-tight text-center">{product.name}</div>
                  <div className={cn('mt-1 text-[14px] font-medium opacity-90', hasImage ? 'font-mono' : 'font-mono')}>
                    {formatMoney(product.price)}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Inventory */}
        <div className="flex items-center gap-2 pt-4">
          <Folder className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-[22px] font-semibold tracking-tight">Inventory</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {productFolders.slice(0, 3).map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => onOpenFolder?.(folder.id)}
              className="aspect-square rounded-[18px] bg-layer-2 border border-border flex flex-col items-center justify-center gap-2"
            >
              <div className="h-11 w-11 rounded-[12px] bg-layer-3 border border-border flex items-center justify-center">
                <Folder className="h-6 w-6 text-primary" />
              </div>
              <div className="text-[13px] font-semibold text-center px-2">{folder.name}</div>
            </button>
          ))}
        </div>

        {/* Spacer so bottom bar doesn't overlap content */}
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

