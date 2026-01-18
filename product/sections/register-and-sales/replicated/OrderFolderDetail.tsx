/**
 * OrderFolderDetail - Replicated design
 * 
 * This component replicates the order-folder-detail mockup using the Compost design system.
 * Shows a grid of products within a category folder with quantity management.
 */

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronUp, Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  image?: string
  backgroundClass?: string
  quantityInCart?: number
}

interface OrderFolderDetailProps {
  categoryName?: string
  products?: Product[]
  cartTotal?: number
  cartSummary?: string
  onBack?: () => void
  onProductAdd?: (productId: string) => void
  onProductRemove?: (productId: string) => void
  onProductDelete?: (productId: string) => void
  onExpandCart?: () => void
}

// Sample data
const defaultProducts: Product[] = [
  { id: '1', name: 'Latte', price: 4.75, quantityInCart: 0 },
  { id: '2', name: 'Cappuccino', price: 4.50, quantityInCart: 2 },
  { id: '3', name: 'Americano', price: 3.50, quantityInCart: 0 },
  { id: '4', name: 'Espresso', price: 3.00, quantityInCart: 0 },
  { id: '5', name: 'Flat White', price: 4.50, quantityInCart: 0 },
  { id: '6', name: 'Macchiato', price: 3.75, quantityInCart: 1 },
  { id: '7', name: 'Cortado', price: 4.00, quantityInCart: 0 },
  { id: '8', name: 'Mocha', price: 5.00, quantityInCart: 0 },
  { id: '9', name: 'Drip', price: 3.00, quantityInCart: 0 },
  { id: '10', name: 'Red Eye', price: 3.75, quantityInCart: 0 },
  { id: '11', name: 'Cold Brew', price: 4.50, quantityInCart: 0 },
  { id: '12', name: 'Chai Latte', price: 4.50, quantityInCart: 0 },
]

function OrderFolderDetailComponent({
  categoryName = "Hot Coffees",
  products = defaultProducts,
  cartTotal = 18.50,
  cartSummary = "Cappuccino (2), Macchiato, Americano...",
  onBack,
  onProductAdd,
  onProductRemove,
  onProductDelete,
  onExpandCart
}: OrderFolderDetailProps) {
  const [isOpen, setIsOpen] = useState(true)
  const formattedTotal = `$${cartTotal.toFixed(2)}`

  const handleClose = () => {
    setIsOpen(false)
    onBack?.()
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
        {/* Header */}
        <div className="sticky top-0 bg-layer-level-0 border-b border-border-primary px-4 py-4">
          <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="p-2 hover:bg-layer-level-2 rounded-[12px] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-onLayer-primary" />
          </button>
            <h1 className="text-2xl font-semibold text-onLayer-primary">{categoryName}</h1>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 p-4 pb-20 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`relative aspect-square rounded-[18px] border-2 overflow-hidden ${
                product.quantityInCart && product.quantityInCart > 0
                  ? 'border-border-info'
                  : 'border-transparent'
              } ${product.backgroundClass || 'bg-layer-level-2'}`}
            >
              {/* Quantity badge */}
              {product.quantityInCart && product.quantityInCart > 0 && (
                <Badge className="absolute top-2 right-2 bg-button-primary text-onLayer-inverse rounded-[9999px] min-w-[24px] h-6 flex items-center justify-center">
                  {product.quantityInCart}
                </Badge>
              )}

              {/* Product info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-onLayer-inverse font-semibold text-base">
                  {product.name}
                </div>
                <div className="text-onLayer-inverse/80 text-sm">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity controls (shown when item is in cart) */}
              {product.quantityInCart && product.quantityInCart > 0 && (
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => onProductRemove?.(product.id)}
                    className="w-8 h-8 rounded-[9999px] bg-button-light backdrop-blur-sm flex items-center justify-center hover:bg-button-light/80 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-onLayer-inverse" />
                  </button>
                  <button
                    onClick={() => onProductAdd?.(product.id)}
                    className="w-8 h-8 rounded-[9999px] bg-button-primary flex items-center justify-center hover:bg-button-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-onLayer-inverse" />
                  </button>
                </div>
              )}

              {/* Delete button (alternative action) */}
              {product.quantityInCart && product.quantityInCart > 0 && (
                <button
                  onClick={() => onProductDelete?.(product.id)}
                  className="absolute bottom-12 right-3 w-8 h-8 rounded-[9999px] bg-button-danger flex items-center justify-center hover:bg-button-danger/90 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-onLayer-inverse" />
                </button>
              )}
            </Card>
          ))}
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
export default function OrderFolderDetail(props: OrderFolderDetailProps) {
  return <OrderFolderDetailComponent {...props} />
}
