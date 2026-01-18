/**
 * CardPaymentConfirmation - Replicated design
 *
 * This component replicates the `card-payment-confirmation.png` mockup using the Compost design system.
 */

import { X, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const designOS = { presentation: 'modal' as const }

export interface CardPaymentConfirmationProps {
  amount: number
  onCancel?: () => void
  onPay?: () => void
  onClose?: () => void
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

export default function CardPaymentConfirmation({ amount, onCancel, onPay, onClose }: CardPaymentConfirmationProps) {
  return (
    <div className="w-full max-w-[460px] bg-layer-2 border border-border rounded-[18px] overflow-hidden">
      <div className="px-5 py-4 bg-layer-1 flex items-center justify-between">
        <div className="text-[18px] font-semibold">Confirm card payment record</div>
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

      <div className="p-6 text-center space-y-5">
        <div className="text-[18px] text-muted-foreground leading-snug">
          Are you sure you want to process the payment?
        </div>

        <div className="text-[52px] font-semibold tracking-tight">{formatMoney(amount)}</div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CreditCard className="h-5 w-5" />
            <span>Method: Card (External Terminal)</span>
          </div>
          <div className="text-[13px] text-muted-foreground">Payment is processed by external terminal</div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="h-12 rounded-[12px] bg-layer-3 border border-border text-foreground hover:bg-layer-3/80"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="button" className="h-12 rounded-[12px]" onClick={onPay}>
            Pay
          </Button>
        </div>
      </div>
    </div>
  )
}

