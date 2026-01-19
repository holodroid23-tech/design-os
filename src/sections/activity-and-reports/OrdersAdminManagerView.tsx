/**
 * OrdersAdminManagerView - Replicated design
 *
 * Replicates the "orders-admin-manager-view" mock using the Compost design system.
 */

import { useMemo } from 'react'
import { ChevronDown, ChevronUp, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ImageTile } from '@/components/ui/image-tile'
import { formatMoney, getDefaultActivityReportsData, type ActivityReportsData, type OrderItem, type OrderRecord } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrdersAdminManagerViewProps {
  data?: Pick<ActivityReportsData, 'orders'>
  activeTab?: 'analytics' | 'orders' | 'expenses'
  dateRangeLabel?: string
  foundCount?: number
  expandedOrderId?: string
  onTabChange?: (tab: 'analytics' | 'orders' | 'expenses') => void
  onDateRangeChange?: () => void
  onExport?: () => void
}

export default function OrdersAdminManagerView({
  data,
  activeTab = 'orders',
  dateRangeLabel = 'Today',
  foundCount = 42,
  expandedOrderId,
  onTabChange,
  onDateRangeChange,
  onExport,
}: OrdersAdminManagerViewProps) {
  const defaults = useMemo(() => getDefaultActivityReportsData(), [])
  const orders = data?.orders ?? defaults.orders ?? []
  const expanded = expandedOrderId ?? orders.find((o) => o.items?.length)?.id ?? orders[1]?.id ?? orders[0]?.id ?? ''

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[980px] bg-background text-foreground px-4 pt-4 pb-10">
      {/* Top tabs */}
      <div className="flex items-center gap-2 bg-card border border-border rounded-[18px] p-1">
        <TopTab label="Analytics" active={activeTab === 'analytics'} onClick={() => onTabChange?.('analytics')} />
        <TopTab label="Orders" active={activeTab === 'orders'} onClick={() => onTabChange?.('orders')} />
        <TopTab label="Expenses" active={activeTab === 'expenses'} onClick={() => onTabChange?.('expenses')} />
      </div>

      {/* Filters row */}
      <div className="mt-3 flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onDateRangeChange}
          className="flex-1 h-11 justify-between rounded-[12px]"
        >
          <span className="text-small font-semibold">{dateRangeLabel}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </Button>

        <Button type="button" variant="secondary" onClick={onExport} className="h-11 px-4 rounded-[12px]">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Export
        </Button>
      </div>

      <div className="mt-4 text-support-small font-semibold text-muted-foreground">{foundCount} orders found</div>

      <div className="mt-4 space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} expanded={order.id === expanded} />
        ))}
      </div>
    </div>
  )
}

function TopTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 h-10 rounded-[12px] text-small font-semibold transition-colors',
        active ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

function OrderCard({ order, expanded }: { order: OrderRecord; expanded: boolean }) {
  return (
    <div className={cn('rounded-[18px] bg-card border border-border shadow-sm overflow-hidden', expanded && 'bg-card')}>
      <div className="px-4 py-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-regular-semibold text-foreground">{order.orderNumber}</div>
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            )}
          </div>
          <div className="text-support-small text-muted-foreground">{order.timeLabel}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-regular-semibold font-mono text-foreground">{formatMoney(order.total)}</div>
          {order.isRefunded ? (
            <div className="h-6 px-2 rounded-[9999px] bg-destructive/20 text-destructive text-support-small font-semibold flex items-center">
              Refunded
            </div>
          ) : null}
        </div>
      </div>

      {expanded ? (
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {(order.items ?? getFallbackItems()).map((item) => (
              <OrderItemRow key={`${order.id}-${item.name}`} item={item} />
            ))}
          </div>

          <div className="my-4 border-t border-dashed border-border/60" />

          <div className="space-y-2 text-support-small text-muted-foreground">
            <MetaRow label="Custom name" value={order.customName ?? 'Table 1'} />
            <MetaRow label="Payment method" value={order.paymentMethod ?? 'Visa •••• 2422'} />
            <MetaRow label="Created by" value={order.createdBy ?? 'Sarah Jackson'} />
            <MetaRow label="Processed by" value={order.processedBy ?? 'Karel Martinek'} />
            {order.isRefunded ? (
              <>
                <MetaRow label="Refunded by" value={order.refundedBy ?? 'Mike Ross'} />
                <MetaRow label="Reason" value={order.refundReason ?? 'Damaged item'} />
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <ImageTile size="small" src={item.imageUrl ?? 'https://picsum.photos/seed/item/88'} alt={item.name} />
        <div className="min-w-0">
          <div className="text-small font-semibold text-foreground truncate">{item.name}</div>
          <div className="text-support-small text-muted-foreground">Qty: {item.qty}</div>
        </div>
      </div>
      <div className="text-small font-mono text-foreground">{formatMoney(item.price)}</div>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-muted-foreground">{label}:</div>
      <div className="text-foreground/90 font-semibold">{value}</div>
    </div>
  )
}

function getFallbackItems(): OrderItem[] {
  return [
    { name: 'Cappuccino', qty: 1, price: 4.5, imageUrl: 'https://picsum.photos/seed/cappuccino/88' },
    { name: 'Avocado toast', qty: 1, price: 12, imageUrl: 'https://picsum.photos/seed/avocado-toast/88' },
    { name: 'Iced matcha', qty: 1, price: 11, imageUrl: 'https://picsum.photos/seed/iced-matcha/88' },
  ]
}

