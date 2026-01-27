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

import { useExpenseStore } from "@/stores/useExpenseStore"
import { useSettingsStore } from "@/stores/useSettingsStore"
import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface CreateExpenseProps {
  onClose?: () => void
  initialName?: string
  initialAmount?: number
  initialColor?: string
  initialStroke?: string
  initialTax?: string
  editId?: string
  productId?: string
}

export default function CreateExpense({ onClose, initialName = "", initialAmount = 0, initialColor, initialStroke, initialTax = "0%", editId, productId }: CreateExpenseProps) {
  const [name, setName] = React.useState(initialName)
  const [price, setPrice] = React.useState(initialAmount > 0 ? initialAmount.toFixed(2) : "0")
  const [tax, setTax] = React.useState(initialTax as "0%" | "10%" | "21%")

  const { addExpense, updateExpense } = useExpenseStore()
  const { currency } = useSettingsStore()
  const { products, updateProductPrices } = useExpenseProductsStore()

  const product = products.find(p => p.id === productId)
  const lastPrices = product?.lastPrices || []

  const handleSave = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    const amount = parseFloat(price)
    if (isNaN(amount)) return
    if (!name.trim()) return

    if (productId) {
      updateProductPrices(productId, amount)
    }

    if (editId) {
      updateExpense(editId, {
        name,
        amount,
        color: initialColor,
        strokeStyle: initialStroke,
        tax,
        category: "manual",
        productId
      })
    } else {
      addExpense({
        name,
        amount,
        date: new Date().toISOString(),
        category: "manual",
        color: initialColor,
        strokeStyle: initialStroke,
        tax,
        productId
      })
    }
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
            New expense
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full" onClick={handleSave}>
            Save expense
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
            <div className="flex items-center justify-between">
              <Label>Price {currency && `(${currency})`}</Label>
              {productId && lastPrices.length > 0 && (
                <div className="flex gap-2">
                  {lastPrices.map((lp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrice(lp.toFixed(2))}
                      className="inline-flex h-6 items-center justify-center rounded-full bg-stone-800 px-2.5 text-[11px] font-semibold text-stone-300 border border-stone-700 transition-all hover:bg-stone-700 active:scale-95 whitespace-nowrap"
                    >
                      {currency === '£' ? '£' : currency === '$' ? '$' : ''}{lp.toFixed(2)}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

