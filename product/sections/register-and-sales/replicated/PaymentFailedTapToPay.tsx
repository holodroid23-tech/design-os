import * as React from "react"
import { CreditCard, RotateCw, XCircle, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon } from "@/components/ui/icon"

export const designOS = {
  presentation: "mobile" as const,
}

export interface PaymentFailedTapToPayProps {
  title?: string
  contextLine?: string
  reason?: string
  amount?: string
  changePaymentMethodLabel?: string
  retryPaymentLabel?: string

  onClose?: () => void
  onChangePaymentMethod?: () => void
  onRetryPayment?: () => void
}

export default function PaymentFailedTapToPay({
  title = "Payment failed",
  contextLine = "Transaction #8920 • Table 4",
  reason = "Card declined by bank",
  amount = "$24.00",
  changePaymentMethodLabel = "Change payment method",
  retryPaymentLabel = "Retry payment",
  onClose,
  onChangePaymentMethod,
  onRetryPayment,
}: PaymentFailedTapToPayProps) {
  return (
    <div className="min-h-dvh w-full bg-background text-foreground">
      <div className="flex min-h-dvh flex-col">
        {/* Block 1: Header controls */}
        <div className="px-6 pt-6 flex justify-end">
          <Button
            type="button"
            variant="invisible"
            size="icon-lg"
            shape="circle"
            aria-label="Close"
            onClick={onClose}
          >
            <SystemIcon icon={XIcon} size="big" aria-hidden="true" />
          </Button>
        </div>

        {/* Block 2: Status summary */}
        <div className="flex-1 px-6 flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center text-center gap-5">
            <IconTile icon={XCircle} size="large" tone="danger" />

            <div className="flex flex-col items-center gap-2">
              <h1>{title}</h1>
              <p>{contextLine}</p>
              <p>{reason}</p>
            </div>

            <output>{amount}</output>
          </div>
        </div>

        {/* Block 3: Footer actions */}
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={onChangePaymentMethod}
            >
              <SystemIcon icon={CreditCard} size="regular" aria-hidden="true" />
              {changePaymentMethodLabel}
            </Button>

            <Button
              type="button"
              variant="default"
              size="lg"
              className="w-full"
              onClick={onRetryPayment}
            >
              <SystemIcon icon={RotateCw} size="regular" aria-hidden="true" />
              {retryPaymentLabel}
            </Button>
          </div>
        </div>

        {/* Block 4: Accessibility & focus */}
        {/* Focus order is DOM order: Close → Change payment method → Retry payment */}
      </div>
    </div>
  )
}

