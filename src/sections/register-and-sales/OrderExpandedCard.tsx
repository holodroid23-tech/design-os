/**
 * OrderExpandedCard - Replicated design
 *
 * This component replicates the `order-expanded-card.png` mockup using the Compost design system.
 */

import { ChevronDown, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ImageTile } from '@/components/ui/image-tile'
import { SearchInputWithSuggestions, type SearchSuggestion } from '@/components/ui/search-input-with-suggestions'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
import type { Order, PaymentMethod } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrderExpandedCardProps {
  order?: Order
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

export default function OrderExpandedCard({
  order = DEMO_ORDER,
  itemImageByProductId,
  quickAddQuery,
  onQuickAddQueryChange,
  onUpdateQuantity,
  onCheckout,
  onCollapse,
}: OrderExpandedCardProps = {}) {
  const suggestions: SearchSuggestion[] = order.items.map((item) => {
    const src = itemImageByProductId?.[item.productId]
    return {
      id: item.id,
      label: item.name,
      leading: <ImageTile size="small" src={src} alt={item.name} />,
      price: formatMoney(item.price),
    }
  })

  return (
    <div className="min-h-full bg-layer-level-0 text-foreground">
      <div className="p-4 pt-6 pb-36">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-[22px] font-semibold tracking-tight">
            {order.orderNumber} - {order.name}
          </div>
          <Button
            type="button"
            onClick={onCollapse}
            variant="ghost"
            size="icon-lg"
            className="h-10 w-10 rounded-[9999px] bg-layer-2 border border-border"
            aria-label="Collapse"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchInputWithSuggestions
            value={quickAddQuery ?? ''}
            onValueChange={(value) => onQuickAddQueryChange?.(value)}
            placeholder="Search items…"
            suggestions={suggestions}
            className="h-12 rounded-[12px] bg-layer-2 border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-3">
          {order.items.map((item) => {
            const image = itemImageByProductId?.[item.productId]

            return (
              <SettingsItem key={item.id} className="bg-layer-2 border border-border rounded-[18px] p-3 h-auto min-h-0 items-center">
                <SettingsItemIcon>
                  <ImageTile size="medium" src={image} alt={item.name} className={cn(!image ? 'bg-layer-3 border border-border' : '')} />
                </SettingsItemIcon>

                <SettingsItemContent>
                  <SettingsItemTitle className="text-[18px] font-semibold">{item.name}</SettingsItemTitle>
                </SettingsItemContent>

                <SettingsItemAction className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-layer-3 border border-border rounded-[12px] p-1">
                    <Button
                      type="button"
                      variant="invisible"
                      size="icon-sm"
                      className="h-8 w-8 rounded-[9999px] bg-layer-2 border border-border"
                      onClick={() => onUpdateQuantity?.(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-6 text-center text-[15px] font-semibold">{item.quantity}</div>
                    <Button
                      type="button"
                      variant="invisible"
                      size="icon-sm"
                      className="h-8 w-8 rounded-[9999px] bg-layer-2 border border-border"
                      onClick={() => onUpdateQuantity?.(item.id, +1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-[15px] font-mono font-semibold">{formatMoney(item.price)}</div>
                </SettingsItemAction>
              </SettingsItem>
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

