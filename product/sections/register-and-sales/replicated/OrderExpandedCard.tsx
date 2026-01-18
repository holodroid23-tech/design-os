/**
 * OrderExpandedCard - Replicated design
 * 
 * This component replicates the order-expanded-card mockup using the Compost design system.
 * Displays an expanded cart view with order details, item list, and payment actions.
 */

import { Button } from '@/components/ui'
import { Search, ChevronDown, Minus, Plus } from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface OrderExpandedCardProps {
  orderNumber?: string
  orderName?: string
  items?: OrderItem[]
  subtotal?: number
  tax?: number
  total?: number
  onSearch?: (query: string) => void
  onQuantityChange?: (itemId: string, newQuantity: number) => void
  onPayCash?: () => void
  onPayCard?: () => void
  onCollapse?: () => void
}

// Default sample items for preview
const defaultItems: OrderItem[] = [
  {
    id: 'item1',
    name: 'Cappuccino',
    price: 4.50,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=200&h=200&fit=crop'
  },
  {
    id: 'item2',
    name: 'Avocado toast',
    price: 12.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=200&h=200&fit=crop'
  },
  {
    id: 'item3',
    name: 'Iced matcha',
    price: 11.00,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1536013564624-67c4e0ba88b1?w=200&h=200&fit=crop'
  }
]

export default function OrderExpandedCard({
  orderNumber = '#402',
  orderName = 'Table 4',
  items = defaultItems,
  subtotal = 27.50,
  tax = 2.40,
  total = 29.90,
  onSearch,
  onQuantityChange,
  onPayCash,
  onPayCard,
  onCollapse
}: OrderExpandedCardProps) {
  return (
    <div className="fixed inset-0 bg-overlay-default flex items-center justify-center z-50">
      <div className="w-full max-w-[428px] h-screen flex flex-col bg-[#111114] text-[#f9f9fa] sm:h-[932px] sm:rounded-[18px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.1)]">
        <h1 className="text-lg font-semibold">
          Order {orderNumber} - {orderName}
        </h1>
        <Button
          variant="invisible"
          size="icon-sm"
          onClick={onCollapse}
          className="text-[#f9f9fa] hover:bg-[rgba(255,255,255,0.05)]"
        >
          <ChevronDown className="size-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#6d6d71]" />
          <input
            type="text"
            placeholder="Search items..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-[#24242b] border border-[rgba(255,255,255,0.1)] rounded-[12px] text-[#f9f9fa] placeholder:text-[#6d6d71] outline-none focus:border-[#9d9da0] focus:ring-2 focus:ring-[rgba(157,157,160,0.2)] transition-all"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-[#24242b] rounded-[12px] border border-[rgba(255,255,255,0.05)]"
          >
            {/* Product Image */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="size-16 rounded-[12px] object-cover flex-shrink-0"
              />
            ) : (
              <div className="size-16 rounded-[12px] bg-[#37373e] flex items-center justify-center flex-shrink-0">
                <span className="text-[#6d6d71] text-xs">No image</span>
              </div>
            )}

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[#f9f9fa] mb-2">{item.name}</h3>
              
              {/* Quantity Stepper */}
              <div className="flex items-center gap-3">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => onQuantityChange?.(item.id, Math.max(0, item.quantity - 1))}
                  className="size-8 bg-[#37373e] border-[rgba(255,255,255,0.1)] hover:bg-[#505057] rounded-[6px]"
                >
                  <Minus className="size-4" />
                </Button>
                <span className="min-w-[2ch] text-center font-medium">
                  {item.quantity}
                </span>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
                  className="size-8 bg-[#37373e] border-[rgba(255,255,255,0.1)] hover:bg-[#505057] rounded-[6px]"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="text-lg font-medium text-[#f9f9fa] flex-shrink-0">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[#6d6d71] text-sm">No items in cart</p>
            <p className="text-[#6d6d71] text-xs mt-1">Search to add items</p>
          </div>
        )}
      </div>

      {/* Footer - Price Breakdown & Actions */}
      <div className="border-t border-[rgba(255,255,255,0.1)] p-4 space-y-4 bg-[#111114]">
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#b5b5b7]">Subtotal</span>
            <span className="text-[#f9f9fa]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#b5b5b7]">Tax</span>
            <span className="text-[#f9f9fa]">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xl font-semibold pt-2 border-t border-[rgba(255,255,255,0.1)]">
            <span className="text-[#f9f9fa]">Total</span>
            <span className="text-[#f9f9fa]">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            variant="ghost"
            onClick={onPayCash}
            className="bg-[#24242b] hover:bg-[#37373e] text-[#f9f9fa] border-[rgba(255,255,255,0.1)] font-medium rounded-[12px]"
          >
            Pay cash
          </Button>
          <Button
            size="lg"
            onClick={onPayCard}
            className="bg-[#2f79ff] hover:bg-[#0c4bff] text-white font-medium rounded-[12px] shadow-sm"
          >
            Pay card
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}
