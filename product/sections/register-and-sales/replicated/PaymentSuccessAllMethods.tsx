/**
 * PaymentSuccessAllMethods - Replicated design
 * 
 * This component replicates the payment-success-all-methods mockup using the Compost design system.
 * Shows a payment success screen with transaction details and next action options.
 */

import { Button } from '@/components/ui/button'
import { X, Printer, Plus, Check } from 'lucide-react'
import { useState } from 'react'

interface PaymentSuccessAllMethodsProps {
  transactionId?: string
  orderName?: string
  amount?: number
  onClose?: () => void
  onPrintReceipt?: () => void
  onStartNewOrder?: () => void
}

function PaymentSuccessAllMethodsComponent({
  transactionId = "8920",
  orderName = "Table 4",
  amount = 24.00,
  onClose,
  onPrintReceipt,
  onStartNewOrder
}: PaymentSuccessAllMethodsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const formattedAmount = `$${amount.toFixed(2)}`

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-overlay-default flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="w-full max-w-[428px] h-screen bg-layer-level-0 flex flex-col justify-between p-6 sm:h-[932px] sm:rounded-[18px]">
        {/* Close button */}
        <div className="w-full flex justify-end">
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-[12px] hover:bg-layer-level-2 flex items-center justify-center transition-colors"
        >
          <X className="w-6 h-6 text-onLayer-primary" />
        </button>
        </div>

        {/* Success state content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-8">
        {/* Success icon */}
        <div className="relative">
          <div className="w-32 h-32 rounded-[9999px] bg-layer-level-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-[9999px] bg-button-primary flex items-center justify-center">
              <Check className="w-12 h-12 text-onLayer-inverse" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Status heading */}
        <h1 className="text-onLayer-primary text-3xl font-bold text-center">
          Payment successful
        </h1>

        {/* Transaction details */}
        <p className="text-onLayer-secondary text-base text-center">
          Transaction #{transactionId} • {orderName}
        </p>

        {/* Amount */}
        <div className="text-onLayer-primary text-5xl font-bold">
          {formattedAmount}
        </div>
        </div>

        {/* Action buttons */}
        <div className="w-full space-y-3">
        <Button
          variant="outline"
          onClick={onPrintReceipt}
          className="w-full h-14 rounded-[12px] border-border-primary bg-transparent hover:bg-layer-level-2 text-onLayer-primary"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print receipt
        </Button>
        <Button
          onClick={onStartNewOrder}
          className="w-full h-14 rounded-[12px] bg-button-primary hover:bg-button-primary/90 text-onLayer-inverse"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start new order
        </Button>
        </div>
      </div>
    </div>
  )
}

// Preview wrapper with sample data
export default function PaymentSuccessAllMethods(props: PaymentSuccessAllMethodsProps) {
  return <PaymentSuccessAllMethodsComponent {...props} />
}
