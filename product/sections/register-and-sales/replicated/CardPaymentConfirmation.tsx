/**
 * CardPaymentConfirmation - Replicated design
 * 
 * This component replicates the card-payment-confirmation mockup using the Compost design system.
 * Shows a confirmation dialog for processing a card payment via external terminal.
 */

import { Button } from '@/components/ui/button'
import { CreditCard } from 'lucide-react'

interface CardPaymentConfirmationProps {
  amount?: number
  isOpen?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

function CardPaymentConfirmationComponent({
  amount = 24.00,
  isOpen: isOpenProp,
  onCancel,
  onConfirm
}: CardPaymentConfirmationProps) {
  const formattedAmount = `$${amount.toFixed(2)}`

  return (
    <div className="bg-layer-level-1 border border-layer-level-2 rounded-[18px] max-w-[428px] w-full p-6 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-onLayer-primary text-xl font-semibold">
          Confirm card payment record
        </h2>
      </div>

      <div className="space-y-6 pt-4">
        {/* Confirmation message */}
        <p className="text-onLayer-secondary text-center text-base">
          Are you sure you want to process the payment?
        </p>

        {/* Amount display */}
        <div className="text-center">
          <div className="text-onLayer-primary text-6xl font-bold tracking-tight">
            {formattedAmount}
          </div>
        </div>

        {/* Payment method info */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-onLayer-secondary">
            <CreditCard className="w-5 h-5" />
            <span className="text-sm">Method: Card (External Terminal)</span>
          </div>
          <p className="text-onLayer-tertiary text-xs text-center">
            Payment is processed by external terminal
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex-1 bg-layer-level-2 hover:bg-layer-level-3 text-onLayer-primary rounded-[12px] h-12"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-button-primary hover:bg-button-primary/90 text-onLayer-inverse rounded-[12px] h-12"
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  )
}

// Preview wrapper with sample data
export default function CardPaymentConfirmation(props: CardPaymentConfirmationProps) {
  return <CardPaymentConfirmationComponent {...props} />
}
