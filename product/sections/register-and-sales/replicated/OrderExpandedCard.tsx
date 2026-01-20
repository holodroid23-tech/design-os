import * as React from "react"
import { ChevronDown, Minus, Plus } from "lucide-react"

import { BottomSheetScaffold } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { SystemIcon } from "@/components/ui/icon"
import { ImageTile } from "@/components/ui/image-tile"
import { SearchInputWithSuggestions } from "@/components/ui/search-input-with-suggestions"
import { Separator } from "@/components/ui/separator"
import { SectionTitle } from "@/components/ui/section-title"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrderExpandedCardLineItem {
  id: string
  name: string
  unitPrice: string
  quantity: number
  imageSrc?: string
}

export interface OrderExpandedCardProps {
  title?: string
  items?: OrderExpandedCardLineItem[]
  onDecreaseQuantity?: (itemId: string) => void
  onIncreaseQuantity?: (itemId: string) => void
  onToggleExpanded?: () => void
}

export default function OrderExpandedCard({
  title = "Order #402 - Table 4",
  items = [
    { id: "cappuccino", name: "Cappuccino", unitPrice: "$4.50", quantity: 1 },
    { id: "avocado-toast", name: "Avocado Toast", unitPrice: "$12.00", quantity: 1 },
    { id: "iced-matcha", name: "Iced Matcha", unitPrice: "$11.00", quantity: 2 },
  ],
  onDecreaseQuantity,
  onIncreaseQuantity,
  onToggleExpanded,
}: OrderExpandedCardProps) {
  return (
    <div className="min-h-full w-full">
      {/* Block 1: Header */}
      <BottomSheetScaffold
        header={
          <SectionTitle
            titleAs="h2"
            trailing={
              <Button
                type="button"
                variant="invisible"
                size="icon"
                aria-label="Collapse order"
                onClick={onToggleExpanded}
              >
                <SystemIcon icon={ChevronDown} size="regular" aria-hidden="true" />
              </Button>
            }
          >
            {title}
          </SectionTitle>
        }
      >
        <Separator />
        <div className="px-6 pb-6 pt-4">
          {/* Block 2: Search */}
          <SearchInputWithSuggestions placeholder="Search items..." />

          {/* Block 3: Items */}
          <div className="mt-4 flex flex-col gap-3" role="list">
            {items.map((item) => (
              <div key={item.id} role="listitem" className="rounded-xl border p-4">
                <div className="flex items-start gap-4">
                  <ImageTile size="large" src={item.imageSrc} alt={item.name} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className="truncate">{item.name}</p>
                      <p>{item.unitPrice}</p>
                    </div>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-md border p-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Decrease quantity"
                        onClick={() => onDecreaseQuantity?.(item.id)}
                      >
                        <SystemIcon icon={Minus} aria-hidden="true" />
                      </Button>

                      <div className="min-w-[2ch] text-center">{item.quantity}</div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Increase quantity"
                        onClick={() => onIncreaseQuantity?.(item.id)}
                      >
                        <SystemIcon icon={Plus} aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Block 4: Summary */}
          {/* Block 5: Payment actions */}
        </div>
      </BottomSheetScaffold>
    </div>
  )
}

