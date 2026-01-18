/**
 * OrderEditTab - Replicated design
 *
 * This component replicates the `order-edit-tab.png` mockup using the Compost design system.
 */

import { X, RotateCcw, Trash2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export const designOS = { presentation: 'modal' as const }

export interface OrderEditTabProps {
  orderName: string
  onOrderNameChange?: (value: string) => void
  onCancel?: () => void
  onSave?: () => void
  onClearOrder?: () => void
  onDeleteOrderTab?: () => void
  onClose?: () => void
}

export default function OrderEditTab({
  orderName,
  onOrderNameChange,
  onCancel,
  onSave,
  onClearOrder,
  onDeleteOrderTab,
  onClose,
}: OrderEditTabProps) {
  return (
    <div className="w-full max-w-[420px] bg-layer-2 border border-border rounded-[18px] overflow-hidden">
      <div className="px-5 py-4 bg-layer-1 flex items-center justify-between">
        <div className="text-[20px] font-semibold">Edit order</div>
        <button
          type="button"
          onClick={onClose}
          className="h-10 w-10 rounded-[9999px] bg-layer-2 border border-border flex items-center justify-center"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <Separator />

      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Order name</Label>
          <Input
            value={orderName}
            onChange={(e) => onOrderNameChange?.(e.target.value)}
            className="h-12 rounded-[12px] bg-layer-1 border-border"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-12 rounded-[12px] bg-layer-3 border border-border text-foreground hover:bg-layer-3/80"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="button" className="h-12 rounded-[12px]" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>

      <Separator />

      <div className="p-2">
        <button
          type="button"
          onClick={onClearOrder}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-layer-1"
        >
          <div className="h-10 w-10 rounded-[12px] bg-layer-1 border border-border flex items-center justify-center">
            <RotateCcw className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 text-left text-[16px] font-medium">Clear order</div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>

        <button
          type="button"
          onClick={onDeleteOrderTab}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-layer-1"
        >
          <div className="h-10 w-10 rounded-[12px] bg-destructive/15 border border-border flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1 text-left text-[16px] font-medium text-destructive">Delete order tab</div>
        </button>
      </div>
    </div>
  )
}

