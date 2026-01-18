/**
 * PaymentFailedTapToPay - Replicated design
 * 
 * This component replicates the payment-failed-tap-to-pay mockup using the Compost design system.
 * Shows a payment failure screen with transaction details and retry options.
 */

import { Button } from '@/components/ui/button'
import { X, CreditCard, RotateCw } from 'lucide-react'
import { useState } from 'react'

interface PaymentFailedTapToPayProps {
  transactionId?: string
  orderName?: string
  failureReason?: string
  amount?: number
  onClose?: () => void
  onChangePaymentMethod?: () => void
  onRetry?: () => void
}

function PaymentFailedTapToPayComponent({
  transactionId = "8920",
  orderName = "Table 4",
  failureReason = "Card Declined by Bank",
  amount = 24.00,
  onClose,
  onChangePaymentMethod,
  onRetry
}: PaymentFailedTapToPayProps) {
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

        {/* Error state content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-8">
        {/* Error icon */}
        <div className="relative">
          <div className="w-32 h-32 rounded-[9999px] bg-layer-level-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-[9999px] bg-button-danger flex items-center justify-center">
              <X className="w-12 h-12 text-onLayer-inverse" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Status heading */}
        <h1 className="text-onLayer-primary text-3xl font-bold text-center">
          Payment failed
        </h1>

        {/* Transaction details */}
        <div className="text-center space-y-2">
          <p className="text-onLayer-secondary text-base">
            Transaction #{transactionId} • {orderName}
          </p>
          <p className="text-onLayer-danger text-base font-medium">
            {failureReason}
          </p>
        </div>

        {/* Amount */}
        <div className="text-onLayer-primary text-5xl font-bold">
          {formattedAmount}
        </div>
        </div>

        {/* Action buttons */}
        <div className="w-full space-y-3">
        <Button
          variant="outline"
          onClick={onChangePaymentMethod}
          className="w-full h-14 rounded-[12px] border-border-primary bg-transparent hover:bg-layer-level-2 text-onLayer-primary"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Change payment method
        </Button>
        <Button
          onClick={onRetry}
          className="w-full h-14 rounded-[12px] bg-button-primary hover:bg-button-primary/90 text-onLayer-inverse"
        >
          <RotateCw className="w-5 h-5 mr-2" />
          Retry payment
        </Button>
        </div>
      </div>
    </div>
  )
}

// Preview wrapper with sample data
export default function PaymentFailedTapToPay(props: PaymentFailedTapToPayProps) {
  return <PaymentFailedTapToPayComponent {...props} />
}
