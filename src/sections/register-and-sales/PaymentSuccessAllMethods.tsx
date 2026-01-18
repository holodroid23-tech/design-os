/**
 * PaymentSuccessAllMethods - Replicated design
 *
 * This component replicates the `payment-success-all-methods.png` mockup using the Compost design system.
 */

import { X, Check, Printer, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const designOS = { presentation: 'mobile' as const }

export interface PaymentSuccessAllMethodsProps {
  amount: number
  transactionId: string
  orderName: string
  onClose?: () => void
  onPrintReceipt?: () => void
  onStartNewOrder?: () => void
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

export default function PaymentSuccessAllMethods({
  amount,
  transactionId,
  orderName,
  onClose,
  onPrintReceipt,
  onStartNewOrder,
}: PaymentSuccessAllMethodsProps) {
  return (
    <div className="min-h-full bg-layer-level-0 text-foreground relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 h-10 w-10 rounded-[9999px] bg-layer-2 border border-border flex items-center justify-center"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="px-6 pt-24 flex flex-col items-center text-center">
        <div className="relative mb-10">
          <div className="h-28 w-28 rounded-[9999px] bg-primary/15 flex items-center justify-center">
            <div className="h-16 w-16 rounded-[9999px] bg-primary flex items-center justify-center">
              <Check className="h-9 w-9 text-primary-foreground" />
            </div>
          </div>
        </div>

        <h1 className="text-[34px] font-semibold tracking-tight">Payment successful</h1>
        <div className="mt-2 text-[16px] text-muted-foreground">
          Transaction {transactionId} • {orderName}
        </div>

        <div className="mt-10 text-[54px] font-semibold tracking-tight">{formatMoney(amount)}</div>
      </div>

      <div className="fixed left-0 right-0 bottom-0 px-5 pb-6 pt-4 space-y-3 bg-layer-level-0">
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full rounded-[12px] bg-layer-2 border-border text-foreground hover:bg-layer-2/80"
          onClick={onPrintReceipt}
        >
          <Printer className="h-5 w-5" />
          Print receipt
        </Button>
        <Button type="button" className="h-12 w-full rounded-[12px]" onClick={onStartNewOrder}>
          <Plus className="h-5 w-5" />
          Start new order
        </Button>
      </div>
    </div>
  )
}

