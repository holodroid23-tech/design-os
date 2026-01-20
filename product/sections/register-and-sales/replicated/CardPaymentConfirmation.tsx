import { CreditCard, X } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { SectionTitle } from "@/components/ui/section-title"

export const designOS = {
  presentation: "mobile" as const,
}

export interface CardPaymentConfirmationProps {
  title?: string
  prompt?: string
  amount?: string
  methodLabel?: string
  supportingNote?: string
  cancelLabel?: string
  payLabel?: string

  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  onCancel?: () => void
  onPay?: () => void
}

export default function CardPaymentConfirmation({
  title = "Confirm card payment record",
  prompt = "Are you sure you want to process the payment?",
  amount = "$24.00",
  methodLabel = "Method: Card (External terminal)",
  supportingNote = "Payment is processed by external terminal",
  cancelLabel = "Cancel",
  payLabel = "Pay",
  open,
  defaultOpen = true,
  onOpenChange,
  onClose,
  onCancel,
  onPay,
}: CardPaymentConfirmationProps) {
  return (
    <Dialog
      {...(open === undefined ? { defaultOpen } : { open })}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen)
        if (!nextOpen) onClose?.()
      }}
    >
      <DialogContent showCloseButton={false}>
        <div className="flex flex-col gap-6">
          <SectionTitle
            titleAs="h2"
            trailing={
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="invisible"
                  size="icon-lg"
                  aria-label="Close"
                >
                  <SystemIcon icon={X} aria-hidden="true" />
                </Button>
              </DialogClose>
            }
          >
            {title}
          </SectionTitle>

          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <p>{prompt}</p>

            <div className="flex justify-center">
              <SectionTitle titleAs="div" size="page">
                {amount}
              </SectionTitle>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <SystemIcon icon={CreditCard} aria-hidden="true" />
                <span>{methodLabel}</span>
              </div>
              <DialogDescription>{supportingNote}</DialogDescription>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                size="lg"
                className="w-full"
                onClick={onPay}
              >
                {payLabel}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
