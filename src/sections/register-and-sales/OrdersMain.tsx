/**
 * OrdersMain - Replicated design
 *
 * This component replicates the `orders-main.png` mockup using the Compost design system.
 */

import { Plus, Star, Folder, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/ui/section-title'
import type { Order, Product, ProductFolder } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface OrdersMainProps {
  products?: Product[]
  productFolders?: ProductFolder[]
  orders?: Order[]
  activeOrderId?: string
  onSelectOrder?: (orderId: string) => void
  onCreateOrder?: () => void
  onAddItem?: (productId: string) => void
  onOpenFolder?: (folderId: string) => void
  onCreateCustomItem?: () => void
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
  // Only use accents that have known matching `text-on-layer-*` tokens.
  const accents = ['bg-layer-info', 'bg-layer-warning', 'bg-layer-recent', 'bg-layer-success']
  return accents[index % accents.length]
}

function textForAccent(accent: string) {
  switch (accent) {
    case 'bg-layer-info':
      return 'text-on-layer-info'
    case 'bg-layer-warning':
      return 'text-on-layer-warning'
    case 'bg-layer-success':
      return 'text-on-layer-success'
    case 'bg-layer-recent':
      return 'text-onLayer-recent'
    default:
      return 'text-foreground'
  }
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
]

const DEMO_FOLDERS: ProductFolder[] = [
  { id: 'f1', name: 'Hot Coffees', icon: 'coffee' },
  { id: 'f2', name: 'Iced Drinks', icon: 'ice-cream' },
  { id: 'f3', name: 'Pastries', icon: 'croissant' },
]

const DEMO_ORDERS: Order[] = [
  {
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
  },
  {
    id: 'o2',
    orderNumber: '403',
    name: 'Window bar',
    items: [{ id: 'oi4', productId: 'p1', name: 'Latte', price: 4.75, quantity: 2 }],
    subtotal: 9.5,
    tax: 0.95,
    total: 10.45,
  },
  { id: 'o3', orderNumber: '404', name: 'Takeaway', items: [], subtotal: 0, tax: 0, total: 0 },
]

export default function OrdersMain({
  products,
  productFolders,
  orders,
  activeOrderId,
  onSelectOrder,
  onCreateOrder,
  onAddItem,
  onOpenFolder,
  onCreateCustomItem,
  onOpenCart,
}: OrdersMainProps = {}) {
  const safeProducts = (products && products.length > 0 ? products : DEMO_PRODUCTS) as Product[]
  const safeFolders = (productFolders && productFolders.length > 0 ? productFolders : DEMO_FOLDERS) as ProductFolder[]
  const safeOrders = (orders && orders.length > 0 ? orders : DEMO_ORDERS) as Order[]
  const safeActiveOrderId = activeOrderId ?? safeOrders[0]?.id ?? ''

  const favorites = safeProducts.filter((p) => p.isFavorite)
  const activeOrder = getActiveOrder(safeOrders, safeActiveOrderId)

  return (
    <div className="relative min-h-full bg-layer-level-0 text-foreground">
      <div className="p-4 pt-6 pb-36 space-y-5">
        {/* Order tabs */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onCreateOrder}
            variant="invisible"
            size="icon-lg"
            className="h-10 w-10 rounded-[9999px] bg-layer-3 hover:bg-layer-3/80 border border-border transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Create order"
          >
            <Plus className="h-[18px] w-[18px]" />
          </Button>

          <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-right">
            <div className="flex items-center gap-2">
              {safeOrders.map((order) => {
                const isActive = order.id === safeActiveOrderId
                const count = getLineItemCount(order)

                return (
                  <Button
                    key={order.id}
                    type="button"
                    onClick={() => onSelectOrder?.(order.id)}
                    variant="invisible"
                    className={cn(
                      'relative group flex items-center gap-2 px-4 h-10 rounded-[9999px] text-sm font-medium transition-all whitespace-nowrap select-none shrink-0',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                        : 'bg-layer-1 hover:bg-layer-1/80 text-muted-foreground hover:text-foreground border border-transparent hover:border-border'
                    )}
                  >
                    <span className="truncate max-w-[120px]">{order.name}</span>
                    {count > 0 && (
                      <span
                        className={cn(
                          'flex items-center justify-center h-5 min-w-[20px] px-1 rounded-[6px] text-[10px] font-bold leading-none',
                          isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Favorites */}
        <SectionTitle leading={<Star className="h-5 w-5 text-primary" />} titleAs="h3">
          Favorites
        </SectionTitle>

        <div className="grid grid-cols-3 gap-3">
          {favorites.slice(0, 9).map((product, idx) => {
            const hasImage = Boolean(product.image)
            const accent = accentForIndex(idx)
            const textClass = hasImage ? 'text-primary-foreground' : textForAccent(accent)

            return (
              <Button
                key={product.id}
                type="button"
                onClick={() => onAddItem?.(product.id)}
                variant="invisible"
                className="h-auto w-full p-0"
              >
                <div
                  className={cn(
                    'relative aspect-square w-full rounded-[18px] overflow-hidden border border-border',
                    hasImage ? 'bg-layer-2' : accent
                  )}
                >
                  {hasImage ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-overlay-default/40" />
                    </>
                  ) : null}

                  <div className={cn('relative h-full w-full flex flex-col items-center justify-center p-3', textClass)}>
                    <div className="text-[15px] font-semibold leading-tight text-center">{product.name}</div>
                    <div className="mt-1 text-[14px] font-medium opacity-90 font-mono">
                      {formatMoney(product.price)}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Inventory */}
        <SectionTitle leading={<Folder className="h-5 w-5 text-muted-foreground" />} titleAs="h3">
          Inventory
        </SectionTitle>

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            onClick={onCreateCustomItem}
            variant="invisible"
            className="h-auto w-full p-0"
          >
            <div className="aspect-square w-full rounded-[18px] bg-layer-2 border border-border flex flex-col items-center justify-center gap-2">
              <div className="h-11 w-11 rounded-[12px] bg-layer-3 border border-border flex items-center justify-center">
                <Plus className="h-6 w-6 text-foreground" />
              </div>
              <div className="text-[13px] font-semibold text-center px-2">Custom item</div>
            </div>
          </Button>

          {safeFolders.slice(0, 5).map((folder) => (
            <Button
              key={folder.id}
              type="button"
              onClick={() => onOpenFolder?.(folder.id)}
              variant="invisible"
              className="h-auto w-full p-0"
            >
              <div className="aspect-square w-full rounded-[18px] bg-layer-2 border border-border flex flex-col items-center justify-center gap-2">
                <div className="h-11 w-11 rounded-[12px] bg-layer-3 border border-border flex items-center justify-center">
                  <Folder className="h-6 w-6 text-primary" />
                </div>
                <div className="text-[13px] font-semibold text-center px-2">{folder.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Minimized cart */}
      <div className="fixed left-0 right-0 bottom-0 px-4 pb-4">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="relative overflow-hidden rounded-[18px] border border-border bg-layer-1 shadow-md">
            <Button
              type="button"
              onClick={onOpenCart}
              variant="invisible"
              className="w-full p-4 active:scale-[0.99] transition-all relative group h-[96px] flex flex-col justify-center text-left"
              aria-label="Expand order"
            >
              {/* Drag handle */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-muted-foreground/30 rounded-[9999px]" />

              <div className="flex items-center justify-between mt-1 w-full gap-4">
                <div className="flex flex-col min-w-0">
                  <div className="text-[30px] leading-none font-bold tracking-tight font-mono">
                    {formatMoney(activeOrder?.total ?? 0)}
                  </div>
                  <div className="text-[12px] leading-[16px] text-muted-foreground mt-1 truncate max-w-[240px]">
                    {getCartSummary(activeOrder)}
                  </div>
                </div>
                <div className="h-10 w-10 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                  <ChevronUp className="h-6 w-6" />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

