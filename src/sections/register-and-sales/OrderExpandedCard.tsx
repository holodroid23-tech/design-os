/**
 * OrderExpandedCard - Replicated design
 *
 * This component replicates the `order-expanded-card.png` mockup using the Compost design system.
 */

import { ChevronDown, Search, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Order, PaymentMethod } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrderExpandedCardProps {
  order: Order
  itemImageByProductId?: Record<string, string>
  quickAddQuery?: string
  onQuickAddQueryChange?: (value: string) => void
  onUpdateQuantity?: (lineItemId: string, delta: number) => void
  onCheckout?: (orderId: string, method: PaymentMethod) => void
  onCollapse?: () => void
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

export default function OrderExpandedCard({
  order,
  itemImageByProductId,
  quickAddQuery,
  onQuickAddQueryChange,
  onUpdateQuantity,
  onCheckout,
  onCollapse,
}: OrderExpandedCardProps) {
  return (
    <div className="min-h-full bg-layer-level-0 text-foreground">
      <div className="p-4 pt-6 pb-36">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-[22px] font-semibold tracking-tight">
            {order.orderNumber} - {order.name}
          </div>
          <button
            type="button"
            onClick={onCollapse}
            className="h-10 w-10 rounded-[9999px] bg-layer-2 border border-border flex items-center justify-center"
            aria-label="Collapse"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={quickAddQuery ?? ''}
            onChange={(e) => onQuickAddQueryChange?.(e.target.value)}
            placeholder="Search items…"
            className="h-12 pl-12 rounded-[12px] bg-layer-2 border-border"
          />
        </div>

        <div className="space-y-4">
          {order.items.map((item) => {
            const image = itemImageByProductId?.[item.productId]

            return (
              <div key={item.id} className="bg-layer-2 border border-border rounded-[18px] p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'h-14 w-14 rounded-[12px] overflow-hidden bg-layer-3 border border-border flex items-center justify-center'
                    )}
                  >
                    {image ? (
                      <img src={image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-2 w-2 rounded-[9999px] bg-layer-highlight" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-[18px] font-semibold truncate">{item.name}</div>
                      <div className="text-[18px] font-semibold">{formatMoney(item.price)}</div>
                    </div>

                    <div className="mt-3 inline-flex items-center gap-3 bg-layer-3 border border-border rounded-[12px] px-3 h-10">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity?.(item.id, -1)}
                        className="h-8 w-8 rounded-[9999px] bg-layer-2 border border-border flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="w-6 text-center text-[15px] font-semibold">{item.quantity}</div>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity?.(item.id, +1)}
                        className="h-8 w-8 rounded-[9999px] bg-layer-2 border border-border flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom totals + actions */}
      <div className="fixed left-0 right-0 bottom-0 bg-layer-1 border-t border-border px-5 py-5">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-1 text-[14px] text-muted-foreground">
            <div className="flex items-center justify-between gap-12">
              <span>Subtotal</span>
              <span>{formatMoney(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-12">
              <span>Tax</span>
              <span>{formatMoney(order.tax)}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[20px] font-semibold">Total</div>
            <div className="text-[34px] font-semibold leading-none tracking-tight">{formatMoney(order.total)}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-12 rounded-[12px] bg-layer-2 border border-border text-foreground hover:bg-layer-2/80"
            onClick={() => onCheckout?.(order.id, 'CASH')}
          >
            Pay cash
          </Button>
          <Button type="button" className="h-12 rounded-[12px]" onClick={() => onCheckout?.(order.id, 'CARD_TAP')}>
            Pay card
          </Button>
        </div>
      </div>
    </div>
  )
}

