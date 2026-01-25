import { Check, Plus, Printer, X } from "lucide-react"

import { IconTile, SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"

export const designOS = {
  presentation: "mobile" as const,
}

export interface PaymentSuccessAllMethodsProps {
  title?: string
  contextLine?: string
  amount?: string
  printReceiptLabel?: string
  startNewOrderLabel?: string

  onClose?: () => void
  onPrintReceipt?: () => void
  onStartNewOrder?: () => void
}

export default function PaymentSuccessAllMethods({
  title = "Payment successful",
  contextLine = "Transaction #8920 • Table 4",
  amount = "24.00 Kč",
  printReceiptLabel = "Print receipt",
  startNewOrderLabel = "Start new order",
  onClose,
  onPrintReceipt,
  onStartNewOrder,
}: PaymentSuccessAllMethodsProps) {
  return (
    // Block 1: Screen container
    <div className="h-full min-h-full w-full bg-background">
      <div className="flex h-full min-h-full flex-col">
        <div className="px-6 pt-6 min-h-[100px]">
          {/* Block 2: Header close action */}
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

        <div className="flex flex-1 items-center justify-center px-6">
          {/* Block 3: Status + summary */}
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <IconTile icon={Check} tone="success" size="large" />

            <div className="flex flex-col items-center gap-2">
              <div className="flex justify-center">
                <SectionTitle titleAs="h1">{title}</SectionTitle>
              </div>
              <p>{contextLine}</p>
            </div>

            <div className="flex justify-center">
              <SectionTitle titleAs="div" size="page">
                {amount}
              </SectionTitle>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Block 4: Footer actions */}
          <div className="flex flex-col gap-3">
            <Button type="button" variant="ghost" size="lg" className="w-full" onClick={onPrintReceipt}>
              <SystemIcon icon={Printer} aria-hidden="true" />
              {printReceiptLabel}
            </Button>

            <Button type="button" variant="default" size="lg" className="w-full" onClick={onStartNewOrder}>
              <SystemIcon icon={Plus} aria-hidden="true" />
              {startNewOrderLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

