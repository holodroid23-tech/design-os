import * as React from "react"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { ProductTile } from "@/components/ui/product-tile"
import { PageHeader } from "@/components/ui/page-header"
import { cn } from "@/lib/utils"

import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"
import { useExpenseStore } from "@/stores/useExpenseStore"
import { useSettingsStore } from "@/stores/useSettingsStore"
import CreateExpense from "./CreateExpense"
import { DailyExpensesSummaryBar } from "./DailyExpensesSummaryBar"

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
  const [isSummaryOpen, setIsSummaryOpen] = React.useState(false)
  const [isAddingExpense, setIsAddingExpense] = React.useState(false)
  const [expenseDraft, setExpenseDraft] = React.useState<{ name: string; amount?: number; color?: string; stroke?: string } | null>(null)

  const { products, folders } = useExpenseProductsStore()
  const { expenses } = useExpenseStore()
  const { currency } = useSettingsStore()

  const folder = folders.find(f => f.id === folderId)
  const folderProducts = products.filter(p => p.folderId === folderId && p.isVisible !== false)
  const loggedItems = expenses

  const handleTileClick = (item: any) => {
    setExpenseDraft({
      name: item.name,
      color: item.color,
      stroke: item.strokeStyle
    })
    setIsAddingExpense(true)
  }

  const handleAddExpense = () => {
    setExpenseDraft({ name: "" })
    setIsAddingExpense(true)
    setIsSummaryOpen(true)
  }

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <PageHeader title={folder?.name || "Folder"} onBack={onBack} />

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

      {/* Floating expandable expense summary bar */}
      <FloatingBottomBar
        insetClassName="px-4 pb-[96px]"
        className={cn(
          "transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
          loggedItems.length > 0
            ? "translate-y-0 opacity-100"
            : "translate-y-[200%] opacity-0 pointer-events-none"
        )}
      >
        <DailyExpensesSummaryBar
          title="Today's expenses"
          items={loggedItems}
          tax={0}
          currency={currency}
          onAddExpense={handleAddExpense}
          isSummaryOpen={isSummaryOpen}
          onSummaryOpenChange={setIsSummaryOpen}
        />
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
