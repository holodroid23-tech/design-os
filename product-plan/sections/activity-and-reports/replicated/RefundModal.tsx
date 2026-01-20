import * as React from "react"

import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SystemIcon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { Textarea } from "@/components/ui/textarea"

export const designOS = {
  presentation: "modal" as const,
}

export default function RefundModal() {
  const [open, setOpen] = React.useState(true)
  const [reason, setReason] = React.useState("")
  const [refundMethod, setRefundMethod] = React.useState<"cash" | "card">("cash")
  const reasonId = React.useId()
  const refundMethodId = React.useId()

  return (
    <div className="min-h-[100dvh] w-full bg-background">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Refund order</DialogTitle>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              type="button"
              variant="invisible"
              size="icon"
              aria-label="Close"
              className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <SystemIcon icon={XIcon} />
            </Button>
          </DialogClose>

          <div className="mt-2 space-y-6">
            {/* Block 2: Refund reason field */}
            <div className="space-y-2">
              <Label htmlFor={reasonId}>Reason for refund</Label>
              <Textarea
                id={reasonId}
                variant="default"
                placeholder="e.g. Customer changed mind, incorrect item prepared, or quality issue..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            {/* Block 3: Refund method field */}
            <div className="space-y-2">
              <Label id={refundMethodId}>Refund method</Label>
              <RadioButtonGroup
                aria-labelledby={refundMethodId}
                value={refundMethod}
                onValueChange={(v) => setRefundMethod(v as "cash" | "card")}
              >
                <RadioButtonGroupItem variant="default" size="default" value="cash">
                  Cash
                </RadioButtonGroupItem>
                <RadioButtonGroupItem variant="default" size="default" value="card">
                  Card
                </RadioButtonGroupItem>
              </RadioButtonGroup>
            </div>

            {/* Block 4: Action row */}
            <DialogFooter className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  void reason
                  void refundMethod
                  setOpen(false)
                }}
              >
                Confirm refund
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

