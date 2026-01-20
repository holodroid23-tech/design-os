import * as React from "react"
import { XIcon } from "lucide-react"

import { BottomSlidingModal, BottomSlidingModalClose, BottomSlidingModalContent } from "@/components/ui/bottom-sliding-modal"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { SystemIcon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { Numpad } from "@/components/ui/numpad"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { SectionTitle } from "@/components/ui/section-title"
import { Textarea } from "@/components/ui/textarea"

export const designOS = {
  presentation: "mobile" as const,
}

export default function CreateExpense() {
  const [date, setDate] = React.useState<Date | undefined>(new Date("2023-10-24"))
  const [name, setName] = React.useState("")
  const [price, setPrice] = React.useState("0")
  const [tax, setTax] = React.useState<"0%" | "10%" | "21%">("0%")
  const [note, setNote] = React.useState("")

  return (
    <BottomSlidingModal defaultOpen>
      <BottomSlidingModalContent
        header={
          <SectionTitle
            titleAs="h1"
            trailing={
              <BottomSlidingModalClose asChild>
                <Button variant="invisible" size="icon" aria-label="Close">
                  <SystemIcon icon={XIcon} />
                </Button>
              </BottomSlidingModalClose>
            }
          >
            Create expense
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full">
            Save expense
          </Button>
        }
      >
        {/* Date */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <DatePicker date={date} onDateChange={setDate} placeholder="Select date" />
          </div>
        </div>

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
            <Label>Price</Label>
            <Numpad className="max-w-none" value={price} onChange={setPrice} isCurrency={true} label="" />
          </div>
        </div>

        {/* Tax */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Tax</Label>
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

