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

import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"
import { useExpenseStore } from "@/stores/useExpenseStore"
import { useSettingsStore } from "@/stores/useSettingsStore"
import CreateExpense from "./CreateExpense"

export const designOS = {
  presentation: "mobile" as const,
}

export interface DailyExpensesFolderDetailProps {
  folderId: string
  onBack?: () => void
}

export default function FolderDetail({
  folderId,
  onBack,
}: DailyExpensesFolderDetailProps) {
  const [open, setOpen] = React.useState(false)
  const [isAddingExpense, setIsAddingExpense] = React.useState(false)
  const [expenseDraft, setExpenseDraft] = React.useState<{ name: string; amount?: number; color?: string; stroke?: string } | null>(null)

  const { products, folders } = useExpenseProductsStore()
  const { expenses } = useExpenseStore()
  const { currency } = useSettingsStore()

  const folder = folders.find(f => f.id === folderId)
  const folderProducts = products.filter(p => p.folderId === folderId)
  // For now we don't filter logged items by folder, usually they are just shown as a list for today
  // but if we wanted to filter we could.
  const loggedItems = expenses

  const formatMoney = (value: number) => `${currency}${value.toFixed(2)}`

  const subtotal = React.useMemo(() => loggedItems.reduce((acc, e) => acc + e.amount, 0), [loggedItems])
  const tax = 0 // Fixed for now
  const total = subtotal + tax

  const summaryText = React.useMemo(() => {
    const base = loggedItems.map((e) => e.name).join(", ")
    return base.length > 30 ? `${base.slice(0, 27)}...` : base
  }, [loggedItems])

  const suggestions: SearchSuggestion[] = React.useMemo(
    () =>
      loggedItems.map((e) => ({
        id: e.id,
        label: e.name,
        leading: (e as any).imageSrc ? (
          <ImageTile size="small" src={(e as any).imageSrc} alt={(e as any).imageAlt ?? e.name} />
        ) : undefined,
        price: formatMoney(e.amount),
      })),
    [loggedItems, currency]
  )

  const handleTileClick = (item: any) => {
    setExpenseDraft({
      name: item.name,
      amount: item.defaultPrice,
      color: item.color,
      stroke: item.strokeStyle
    })
    setIsAddingExpense(true)
  }

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
              {folder?.name || "Folder"}
            </SectionTitle>
          </Button>
        </div>

        {/* Items grid (tiles without prices and without counters) */}
        <div className="px-6 pt-6 pb-10">
          <div className="grid grid-cols-3 gap-3">
            {folderProducts.map((item) => (
              <ProductTile
                key={item.id}
                name={item.name}
                imageSrc={(item as any).imageSrc}
                imageAlt={(item as any).imageAlt}
                tone={(item.color as any) ?? "surface"}
                onPress={() => handleTileClick(item)}
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
                  Today's expenses
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
                      <span className="font-mono">{formatMoney(tax)}</span>
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
                      setIsAddingExpense(true)
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
                  {loggedItems.map((e) => (
                    <ExpenseLineItemRow
                      key={e.id}
                      name={e.name}
                      price={formatMoney(e.amount)}
                      imageSrc={(e as any).imageSrc}
                      imageAlt={(e as any).imageAlt}
                      color={e.color}
                      strokeStyle={e.strokeStyle}
                    />
                  ))}
                </SettingsGroup>
              </div>
            </BottomSlidingModalContent>
          </BottomSlidingModal>
        </div>
      </FloatingBottomBar>

      {isAddingExpense && (
        <CreateExpense
          onClose={() => setIsAddingExpense(false)}
          initialName={expenseDraft?.name}
          initialAmount={expenseDraft?.amount}
          initialColor={expenseDraft?.color}
          initialStroke={expenseDraft?.stroke}
        />
      )}
    </div>
  )
}

