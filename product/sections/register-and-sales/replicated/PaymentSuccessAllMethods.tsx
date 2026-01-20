import * as React from "react"
import { Check, Plus, Printer, X } from "lucide-react"

import { IconTile, SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"

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
  amount = "$24.00",
  printReceiptLabel = "Print receipt",
  startNewOrderLabel = "Start new order",
  onClose,
  onPrintReceipt,
  onStartNewOrder,
}: PaymentSuccessAllMethodsProps) {
  return (
    // Block 1: Screen container
    <div className="min-h-dvh w-full bg-background">
      <div className="flex min-h-dvh flex-col">
        <div className="px-6 pt-6">
          {/* Block 2: Header close action */}
        </div>

        <div className="flex-1 px-6">
          {/* Block 3: Status + summary */}
        </div>

        <div className="px-6 pb-6">
          {/* Block 4: Footer actions */}
        </div>
      </div>
    </div>
  )
}

