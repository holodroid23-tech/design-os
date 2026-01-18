/**
 * OrdersMain - Replicated design
 * 
 * This component replicates the orders-main mockup using the Compost design system.
 * Main register screen with order tabs, favorites grid, inventory folders, and cart summary.
 */

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Star, Package, Plus, Folder, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface OrderTab {
  id: string
  name: string
  itemCount: number
  isActive: boolean
}

interface FavoriteItem {
  id: string
  name: string
  price: number
  backgroundClass?: string
}

interface InventoryItem {
  id: string
  name: string
  price?: number
  type: 'folder' | 'product' | 'custom'
  backgroundClass?: string
  icon?: string
}

interface OrdersMainProps {
  tabs?: OrderTab[]
  favorites?: FavoriteItem[]
  inventoryItems?: InventoryItem[]
  cartTotal?: number
  cartSummary?: string
  onAddTab?: () => void
  onSwitchTab?: (tabId: string) => void
  onFavoriteClick?: (itemId: string) => void
  onInventoryClick?: (itemId: string) => void
  onExpandCart?: () => void
}

// Sample data
const defaultTabs: OrderTab[] = [
  { id: '1', name: 'Dine-in #4', itemCount: 3, isActive: true },
  { id: '2', name: 'Takeout #5', itemCount: 0, isActive: false },
  { id: '3', name: 'Dine-in #6', itemCount: 2, isActive: false },
]

const defaultFavorites: FavoriteItem[] = [
  { id: 'f1', name: 'Latte', price: 4.75 },
  { id: 'f2', name: 'Espresso', price: 3.00 },
  { id: 'f3', name: 'Mocha', price: 5.00 },
  { id: 'f4', name: 'Cappuccino', price: 4.50 },
  { id: 'f5', name: 'Flat White', price: 4.50 },
  { id: 'f6', name: 'Taro Latte', price: 5.50 },
  { id: 'f7', name: 'Americano', price: 3.50 },
  { id: 'f8', name: 'Matcha', price: 5.25 },
  { id: 'f9', name: 'Cold Brew', price: 4.50 },
]

const defaultInventoryItems: InventoryItem[] = [
  { id: 'i1', name: 'Custom Item', type: 'custom' },
  { id: 'i2', name: 'Iced Drinks', type: 'folder' },
  { id: 'i3', name: 'Pastries', type: 'folder' },
  { id: 'i4', name: 'Macchiato', price: 3.75, type: 'product' },
  { id: 'i5', name: 'Drip', price: 3.00, type: 'product' },
  { id: 'i6', name: 'Cortado', price: 4.00, type: 'product' },
]

function OrdersMainComponent({
  tabs = defaultTabs,
  favorites = defaultFavorites,
  inventoryItems = defaultInventoryItems,
  cartTotal = 18.50,
  cartSummary = "Cappuccino, Americano, Cold Brew...",
  onAddTab,
  onSwitchTab,
  onFavoriteClick,
  onInventoryClick,
  onExpandCart
}: OrdersMainProps) {
  const [isOpen, setIsOpen] = useState(true)
  const formattedTotal = `$${cartTotal.toFixed(2)}`

  const handleClose = () => {
    setIsOpen(false)
    onExpandCart?.()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-overlay-default flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="w-full max-w-[428px] h-screen bg-layer-level-0 flex flex-col overflow-hidden sm:h-[932px] sm:rounded-[18px]">
        {/* Tab bar */}
        <div className="sticky top-0 bg-layer-level-0 border-b border-border-primary px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {/* Add tab button */}
          <button
            onClick={onAddTab}
            className="flex-shrink-0 w-10 h-10 rounded-[9999px] bg-layer-level-2 hover:bg-layer-level-3 flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5 text-onLayer-primary" />
          </button>

          {/* Order tabs */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSwitchTab?.(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 h-10 rounded-[9999px] transition-colors ${
                tab.isActive
                  ? 'bg-button-primary text-onLayer-inverse'
                  : 'bg-layer-level-2 text-onLayer-secondary hover:bg-layer-level-3'
              }`}
            >
              <span className="text-sm font-medium">{tab.name}</span>
              {tab.itemCount > 0 && (
                <Badge
                  className={`rounded-[9999px] min-w-[20px] h-5 text-xs ${
                    tab.isActive
                      ? 'bg-onLayer-inverse/20 text-onLayer-inverse'
                      : 'bg-layer-level-0 text-onLayer-secondary'
                  }`}
                >
                  {tab.itemCount}
                </Badge>
              )}
            </button>
          ))}
        </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 pb-20 overflow-y-auto space-y-6">
        {/* Favorites section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-button-primary" fill="currentColor" />
            <h2 className="text-xl font-semibold text-onLayer-primary">Favorites</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {favorites.map((item) => (
              <Card
                key={item.id}
                onClick={() => onFavoriteClick?.(item.id)}
                className={`aspect-square rounded-[18px] border-transparent overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
                  item.backgroundClass || 'bg-layer-level-2'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-onLayer-inverse font-semibold text-base text-center">
                    {item.name}
                  </div>
                  <div className="text-onLayer-inverse/80 text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Inventory section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-onLayer-secondary" />
            <h2 className="text-xl font-semibold text-onLayer-primary">Inventory</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {inventoryItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => onInventoryClick?.(item.id)}
                className={`aspect-square rounded-[18px] border-transparent overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
                  item.backgroundClass || 'bg-layer-level-2'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center p-3 gap-2">
                  {item.type === 'custom' && (
                    <Plus className="w-8 h-8 text-button-primary" />
                  )}
                  {item.type === 'folder' && (
                    <Folder className="w-8 h-8 text-button-primary" />
                  )}
                  <div className="text-onLayer-primary font-medium text-sm text-center">
                    {item.name}
                  </div>
                  {item.price && (
                    <div className="text-onLayer-secondary text-xs">
                      ${item.price.toFixed(2)}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
        </div>

        {/* Cart summary bar */}
        <div className="border-t border-border-primary px-4 py-4 bg-layer-level-1">
        <button
          onClick={onExpandCart}
          className="w-full flex items-center justify-between"
        >
          <div className="text-left">
            <div className="text-onLayer-primary text-3xl font-bold">
              {formattedTotal}
            </div>
            <div className="text-onLayer-secondary text-sm truncate">
              {cartSummary}
            </div>
          </div>
          <ChevronUp className="w-6 h-6 text-onLayer-tertiary flex-shrink-0" />
        </button>
        </div>
      </div>
    </div>
  )
}

// Preview wrapper with sample data
export default function OrdersMain(props: OrdersMainProps) {
  return <OrdersMainComponent {...props} />
}
