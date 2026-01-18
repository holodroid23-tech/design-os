/**
 * OrderEditTab - Replicated design
 * 
 * This component replicates the order-edit-tab mockup using the Compost design system.
 * Allows renaming, clearing, or deleting an order tab with destructive actions clearly separated.
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RotateCcw, Trash2, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface OrderEditTabProps {
  orderName?: string
  isOpen?: boolean
  onCancel?: () => void
  onSave?: (newName: string) => void
  onClearOrder?: () => void
  onDeleteOrder?: () => void
}

function OrderEditTabComponent({
  orderName = "Order 1",
  isOpen: isOpenProp,
  onCancel,
  onSave,
  onClearOrder,
  onDeleteOrder
}: OrderEditTabProps) {
  const [name, setName] = useState(orderName)

  const handleSave = () => {
    onSave?.(name)
  }

  return (
    <div className="bg-layer-level-1 border border-layer-level-2 rounded-[18px] max-w-[428px] w-full p-6 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-onLayer-primary text-xl font-semibold">
          Edit order
        </h2>
      </div>

      <div className="space-y-4 pt-2">
        {/* Order name input */}
        <div className="space-y-2">
          <Label htmlFor="orderName" className="text-onLayer-secondary text-sm">
            Order name
          </Label>
          <Input
            id="orderName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-layer-level-2 border-border-primary text-onLayer-primary rounded-[12px]"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex-1 bg-layer-level-2 hover:bg-layer-level-3 text-onLayer-primary rounded-[12px] h-12"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-button-primary hover:bg-button-primary/90 text-onLayer-inverse rounded-[12px] h-12"
          >
            Save
          </Button>
        </div>

        <Separator className="bg-border-primary" />

        {/* Clear order action */}
        <button
          onClick={onClearOrder}
          className="w-full flex items-center justify-between px-4 py-3 rounded-[12px] bg-layer-level-2 hover:bg-layer-level-3 transition-colors"
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-onLayer-primary" />
            <span className="text-onLayer-primary text-base">Clear order</span>
          </div>
          <ChevronRight className="w-5 h-5 text-onLayer-tertiary" />
        </button>

        {/* Delete order tab action */}
        <button
          onClick={onDeleteOrder}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] hover:bg-layer-level-2 transition-colors"
        >
          <Trash2 className="w-5 h-5 text-onLayer-danger" />
          <span className="text-onLayer-danger text-base">Delete order tab</span>
        </button>
      </div>
    </div>
  )
}

// Preview wrapper with sample data
export default function OrderEditTab(props: OrderEditTabProps) {
  return <OrderEditTabComponent {...props} />
}
