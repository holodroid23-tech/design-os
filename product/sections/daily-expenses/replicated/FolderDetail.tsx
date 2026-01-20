import * as React from "react"
import { ChevronDown, ChevronLeft } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "@/components/ui/bottom-sliding-modal"
import { Button } from "@/components/ui/button"
import { ExpenseLineItemRow } from "@/components/ui/expense-line-item-row"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { ImageTile } from "@/components/ui/image-tile"
import {
  SearchInputWithSuggestions,
  type SearchSuggestion,
} from "@/components/ui/search-input-with-suggestions"
import { SectionTitle } from "@/components/ui/section-title"
import { ProductTile } from "@/components/ui/product-tile"
import { SettingsGroup } from "@/components/settings/settings-group"
import { cn } from "@/lib/utils"

export const designOS = {
  presentation: "mobile" as const,
}

export interface DailyExpensesFolderDetailProps {
  title?: string
  onBack?: () => void

  items?: {
    id: string
    name: string
    imageSrc?: string
    imageAlt?: string
    tone?: React.ComponentProps<typeof ProductTile>["tone"]
  }[]
  onPressItem?: (itemId: string) => void

  /**
   * Bottom expandable summary (expense version; uses pencil edit affordance).
   */
  expensesTitle?: string
  expenses?: {
    id: string
    name: string
    amount: number
    imageSrc?: string
    imageAlt?: string
  }[]
  tax?: number
  formatMoney?: (value: number) => string
  onEditExpense?: (expenseId: string) => void
  onAddExpense?: () => void
}

export default function FolderDetail({
  title = "Monthly utilities",
  onBack,
  items = [
    { id: "electricity", name: "Electricity bill", tone: "surface" },
    { id: "water", name: "Water supply", tone: "surface" },
    { id: "rent", name: "Store rent", tone: "surface" },
    { id: "internet", name: "Internet services", tone: "surface" },
    { id: "maintenance", name: "Equipment maintenance", tone: "surface" },
    { id: "packaging", name: "Packaging", tone: "surface" },
    { id: "produce", name: "Produce", tone: "surface" },
    { id: "cleaning", name: "Cleaning supplies", tone: "surface" },
    { id: "coffee", name: "Coffee beans", tone: "surface" },
  ],
  onPressItem,
  expensesTitle = "Today's expenses",
  expenses = [
    {
      id: "milk",
      name: "Milk",
      amount: 3.0,
      imageSrc: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Milk",
    },
    {
      id: "paper-cups",
      name: "Paper cups",
      amount: 8.5,
      imageAlt: "Paper cups",
    },
    {
      id: "cleaning",
      name: "Cleaning supplies",
      amount: 7.0,
      imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Cleaning supplies",
    },
  ],
  tax = 0,
  formatMoney = (value) => `$${value.toFixed(2)}`,
  onEditExpense,
  onAddExpense,
}: DailyExpensesFolderDetailProps) {
  const [open, setOpen] = React.useState(false)

  const subtotal = React.useMemo(() => expenses.reduce((acc, e) => acc + e.amount, 0), [expenses])
  const total = subtotal + (tax ?? 0)

  const summaryText = React.useMemo(() => {
    const base = expenses.map((e) => e.name).join(", ")
    return base.length > 30 ? `${base.slice(0, 27)}...` : base
  }, [expenses])

  const suggestions: SearchSuggestion[] = React.useMemo(
    () =>
      expenses.map((e) => ({
        id: e.id,
        label: e.name,
        leading: e.imageSrc ? (
          <ImageTile size="small" src={e.imageSrc} alt={e.imageAlt ?? e.name} />
        ) : undefined,
        price: formatMoney(e.amount),
      })),
    [expenses, formatMoney]
  )

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Header: back + title */}
        <div className="sticky top-0 z-10 border-b bg-background px-6 py-4">
          <Button
            type="button"
            variant="invisible"
            className="group w-full h-auto p-0 justify-start text-left"
            aria-label="Back"
            onClick={onBack}
          >
            <SectionTitle
              interactive
              leading={
                <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
              }
            >
              {title}
            </SectionTitle>
          </Button>
        </div>

        {/* Items grid (tiles without prices and without counters) */}
        <div className="px-6 pt-6 pb-10">
          <div className="grid grid-cols-3 gap-3">
            {items.map((item) => (
              <ProductTile
                key={item.id}
                name={item.name}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                tone={item.tone ?? "surface"}
                // No price, no count, no actions
                onPress={() => onPressItem?.(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Reserve space for the floating expense summary bar */}
        <FloatingBottomBarSpacer />
      </div>

      {/* Floating expandable expense summary bar (uses pencil edit rows) */}
      <FloatingBottomBar>
        <div className="w-full">
          <BottomSlidingModal open={open} onOpenChange={setOpen}>
            <BottomSlidingModalTrigger asChild>
              <Button
                type="button"
                variant="invisible"
                className={cn(
                  "w-full h-[96px] p-0 cursor-pointer active:scale-[0.99] transition-all relative group flex flex-col items-stretch justify-center text-left",
                  "overflow-hidden rounded-[18px] border shadow-lg",
                  "bg-layer-1 border-border-inverse text-onLayer-primary",
                  "supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:bg-layer-1/90"
                )}
                aria-label="Expand expenses"
              >
                <div className="flex items-center justify-between mt-1 px-4">
                  <div className="flex flex-col min-w-0">
                    <div className="text-[30px] leading-none font-bold tracking-tight font-mono">
                      {formatMoney(total)}
                    </div>
                    <div className="text-[12px] leading-[16px] text-onLayer-secondary mt-1 truncate max-w-[240px]">
                      {summaryText || "No expenses yet"}
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="invisible"
                    size="icon"
                    className="text-onLayer-secondary hover:text-onLayer-primary hover:bg-transparent dark:hover:bg-transparent"
                  >
                    <span aria-hidden="true">
                      <SystemIcon icon={ChevronDown} size="huge" className="rotate-180" aria-hidden="true" />
                    </span>
                  </Button>
                </div>
              </Button>
            </BottomSlidingModalTrigger>

            <BottomSlidingModalContent
              header={
                <SectionTitle
                  titleAs="h2"
                  className="[&_*]:text-onLayer-primary"
                  trailing={
                    <BottomSlidingModalClose asChild>
                      <Button
                        variant="invisible"
                        size="icon"
                        aria-label="Collapse expenses"
                        className="text-onLayer-secondary hover:text-onLayer-primary hover:bg-layer-2"
                      >
                        <SystemIcon icon={ChevronDown} size="big" aria-hidden="true" />
                      </Button>
                    </BottomSlidingModalClose>
                  }
                >
                  {expensesTitle}
                </SectionTitle>
              }
              footer={
                <div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatMoney(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                      <span>Tax</span>
                      <span className="font-mono">{formatMoney(tax ?? 0)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 mt-2">
                      <span className="text-regular-semibold text-onLayer-secondary mb-1.5">Total</span>
                      <div className="text-[22px] leading-[30px] font-semibold tracking-tight font-mono text-onLayer-primary">
                        {formatMoney(total)}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    className="h-12 w-full rounded-[12px]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddExpense?.()
                    }}
                  >
                    Add expense
                  </Button>
                </div>
              }
              scaffoldProps={{
                className: "bg-layer-1 border-border-inverse text-onLayer-primary",
                headerClassName: "px-6 pt-7 pb-4",
                bodyClassName: "min-h-0",
                footerClassName: "bg-layer-1 border-t border-border-inverse p-6 pt-5",
              }}
            >
              <div className="px-6 pb-4">
                <SearchInputWithSuggestions
                  placeholder="Search expenses..."
                  suggestions={suggestions}
                  tone="onLayer"
                  className="h-10 rounded-[12px] bg-layer-2 border-border-inverse text-onLayer-primary placeholder:text-onLayer-tertiary"
                />
              </div>

              <div className="px-6 pb-6">
                <SettingsGroup className="border-border-inverse">
                  {expenses.map((e) => (
                    <ExpenseLineItemRow
                      key={e.id}
                      name={e.name}
                      price={formatMoney(e.amount)}
                      imageSrc={e.imageSrc}
                      imageAlt={e.imageAlt}
                      onEdit={onEditExpense ? () => onEditExpense(e.id) : undefined}
                    />
                  ))}
                </SettingsGroup>
              </div>
            </BottomSlidingModalContent>
          </BottomSlidingModal>
        </div>
      </FloatingBottomBar>
    </div>
  )
}

