import { CreditCard, RotateCw, X, XCircle } from "lucide-react"

import { IconTile, SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"

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
    <div className="h-full min-h-full w-full bg-background">
      <div className="flex h-full min-h-full flex-col">
        {/* Block 1: Header controls */}
        <div className="px-6 pt-6">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="invisible"
              size="icon-lg"
              aria-label="Close"
              onClick={onClose}
            >
              <SystemIcon icon={X} aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Block 2: Status summary */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <IconTile icon={XCircle} size="large" tone="danger" />

            <div className="flex flex-col items-center gap-2">
              <div className="flex justify-center">
                <SectionTitle titleAs="h1">{title}</SectionTitle>
              </div>
              <p>{contextLine}</p>
              <p>{reason}</p>
            </div>

            <div className="flex justify-center">
              <SectionTitle titleAs="div" size="page">
                {amount}
              </SectionTitle>
            </div>
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
              <SystemIcon icon={CreditCard} aria-hidden="true" />
              {changePaymentMethodLabel}
            </Button>

            <Button
              type="button"
              variant="default"
              size="lg"
              className="w-full"
              onClick={onRetryPayment}
            >
              <SystemIcon icon={RotateCw} aria-hidden="true" />
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

