import * as React from "react"
import { Folder, Plus } from "lucide-react"
import { GridActionTile } from "@/components/patterns/grid-action-tile"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { ProductTile } from "@/components/ui/product-tile"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { cn } from "@/lib/utils"
import { useExpenseProductsStore, type ExpenseProduct } from "@/stores/useExpenseProductsStore"
import { DailyExpensesSummaryBar } from "./DailyExpensesSummaryBar"

// Section Components
import CreateExpense from "./CreateExpense"
import FolderDetail from "./FolderDetail"

// Store imports
import { useExpenseStore, type ExpenseItem } from "@/stores/useExpenseStore"
import { useSettingsStore } from "@/stores/useSettingsStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface TodaysExpensesProps {
  title?: string
  onEditLoggedItem?: (itemId: string) => void
  onAddExpense?: () => void
}

function chunkArray<T>(items: T[], chunkSize: number) {
  if (chunkSize <= 0) return [items]
  const out: T[][] = []
  for (let i = 0; i < items.length; i += chunkSize) out.push(items.slice(i, i + chunkSize))
  return out
}

export default function TodaysExpenses({
  title = "Today's expenses",
  onEditLoggedItem,
  onAddExpense: onAddExpenseProp,
}: TodaysExpensesProps) {
  const [isSummaryOpen, setIsSummaryOpen] = React.useState(false)
  const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null)
  const [isAddingExpense, setIsAddingExpense] = React.useState(false)

  // New state to hold prepopulated data for the modal
  const [expenseDraft, setExpenseDraft] = React.useState<{ name: string; amount?: number; color?: string; stroke?: string } | null>(null)

  // Global State
  const { expenses } = useExpenseStore()
  const { currency } = useSettingsStore()
  const { products, folders } = useExpenseProductsStore()

  // In a real app we might rely on a selector or effect to keep 'today's' expenses in sync
  const loggedItems = expenses // For now show all, or filter by today in store if preferred

  const handleAddExpense = () => {
    setExpenseDraft({ name: "" })
    setIsAddingExpense(true)
    setIsSummaryOpen(true) // Ensure it stays open
    onAddExpenseProp?.()
  }


  const handleTileClick = (item: ExpenseProduct) => {
    setExpenseDraft({
      name: item.name,
      color: item.color,
      stroke: item.strokeStyle
    })
    setIsAddingExpense(true)
  }

  if (selectedFolderId) {
    return <FolderDetail folderId={selectedFolderId} onBack={() => setSelectedFolderId(null)} />
  }

  const favoritesItems = products.filter(p => p.isFavorite && p.isVisible !== false)

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <PageHeader title={title} />

        {/* Block 1: Favorites grid */}
        {favoritesItems.length > 0 && (
          <div className="px-4 pt-6">
            <SectionTitle titleAs="h2" size="group">Favorites</SectionTitle>
            <div className="mt-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
              <div className="flex gap-3">
                {chunkArray(favoritesItems, 9).map((page, pageIdx) => (
                  <div key={pageIdx} className="min-w-full shrink-0 snap-start">
                    <div className="grid grid-cols-3 gap-3">
                      {page.map((item) => (
                        <ProductTile
                          key={item.id}
                          name={item.name}
                          tone={(item.color as any) || "surface"}
                          onPress={() => handleTileClick(item)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Block 2: Expenses browser */}
        <div className="px-4 pt-8 pb-10">
          <SectionTitle titleAs="h2" size="group">Expenses</SectionTitle>

          {/* Action / Folders Grid */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {/* New Expense (Log) */}
            <GridActionTile
              icon={Plus}
              label="New expense"
              iconClassName="text-primary"
              onClick={handleAddExpense}
            />

            {folders
              .filter(f => f.isVisible !== false)
              .map((folder) => (
                <GridActionTile
                  key={folder.id}
                  icon={Folder}
                  label={folder.name}
                  tone={folder.color as any || "blue"}
                  onClick={() => setSelectedFolderId(folder.id)}
                />
              ))}
          </div>

          {/* Products Grid (All non-favorites or all?) */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {products
              .filter(item => item.isVisible !== false)
              .map((item) => (
                <ProductTile
                  key={item.id}
                  name={item.name}
                  tone={(item.color as any) || "surface"}
                  onPress={() => handleTileClick(item)}
                />
              ))}
          </div>
        </div>

        {/* Reserve space for the floating summary bar */}
        <FloatingBottomBarSpacer />
      </div>

      {/* Floating bottom summary bar (overlays content) */}
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
          title={title}
          items={loggedItems}
          tax={0}
          currency={currency}
          onEditItem={onEditLoggedItem}
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
