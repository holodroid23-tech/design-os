import * as React from "react"
import { XIcon } from "lucide-react"

import { BottomSlidingModal, BottomSlidingModalClose, BottomSlidingModalContent } from "@/components/ui/bottom-sliding-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SystemIcon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { Numpad } from "@/components/ui/numpad"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { SectionTitle } from "@/components/ui/section-title"
import { Textarea } from "@/components/ui/textarea"

import { useExpenseStore } from "@/stores/useExpenseStore"
import { useSettingsStore } from "@/stores/useSettingsStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface CreateExpenseProps {
  onClose?: () => void
  initialName?: string
  initialAmount?: number
  initialColor?: string
  initialStroke?: string
}

export default function CreateExpense({ onClose, initialName = "", initialAmount = 0, initialColor, initialStroke }: CreateExpenseProps) {
  const [name, setName] = React.useState(initialName)
  const [price, setPrice] = React.useState(initialAmount > 0 ? initialAmount.toString() : "0")
  const [tax, setTax] = React.useState<"0%" | "10%" | "21%">("0%")
  const [note, setNote] = React.useState("")

  const { addExpense } = useExpenseStore()
  const { currency } = useSettingsStore()

  const handleSave = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    const amount = parseFloat(price)
    if (isNaN(amount) || amount <= 0) return // Basic validation
    if (!name.trim()) return

    addExpense({
      name,
      amount,
      date: new Date().toISOString(),
      category: "manual", // Could be enhanced
      color: initialColor,
      strokeStyle: initialStroke
    })
    onClose?.()
  }

  return (
    <BottomSlidingModal
      defaultOpen
      onOpenChange={(open) => {
        if (!open) onClose?.()
      }}
    >
      <BottomSlidingModalContent
        className="bg-black"
        scaffoldProps={{ className: "bg-black" }}
        header={
          <SectionTitle
            titleAs="h1"
            trailing={
              <BottomSlidingModalClose asChild>
                <Button variant="invisible" size="icon" aria-label="Close" onClick={(e) => e.stopPropagation()}>
                  <SystemIcon icon={XIcon} />
                </Button>
              </BottomSlidingModalClose>
            }
          >
            Create expense
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full" onClick={handleSave}>
            Add expense
          </Button>
        }
      >

        {/* Name */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="create-expense-name">Name</Label>
            <Input
              id="create-expense-name"
              placeholder="e.g. Milk, Repair"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Price */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Price {currency && `(${currency})`}</Label>
            <Numpad className="max-w-none" value={price} onChange={setPrice} isCurrency={true} label="" />
          </div>
        </div>

        {/* Tax */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Tax (included)</Label>
            <RadioButtonGroup
              value={tax}
              onValueChange={(v) => setTax(v as any)}
              className="flex-nowrap gap-3"
            >
              <RadioButtonGroupItem value="0%" className="flex-1">
                0%
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="10%" className="flex-1">
                10%
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="21%" className="flex-1">
                21%
              </RadioButtonGroupItem>
            </RadioButtonGroup>
          </div>
        </div>

        {/* Note */}
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="create-expense-note">Note</Label>
            <Textarea
              id="create-expense-note"
              placeholder="Additional details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[72px]"
            />
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

