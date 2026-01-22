import * as React from "react"
import { ChevronDown, Folder, Plus } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { GridActionTile } from "@/components/patterns/grid-action-tile"
import { FloatingBottomBar, FloatingBottomBarSpacer } from "@/components/ui/floating-bottom-bar"
import { ProductTile } from "@/components/ui/product-tile"
import { SectionTitle } from "@/components/ui/section-title"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "@/components/ui/bottom-sliding-modal"
import {
  SearchInputWithSuggestions,
  type SearchSuggestion,
} from "@/components/ui/search-input-with-suggestions"
import { ImageTile } from "@/components/ui/image-tile"
import { SettingsGroup } from "@/components/settings/settings-group"
import { ExpenseLineItemRow } from "@/components/ui/expense-line-item-row"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CreateExpense from "./CreateExpense"
import ExpenseManagementNewItem from "../../settings-and-configuration/replicated/ExpenseManagementNewItem"
import { useExpenseProductsStore, type ExpenseProduct } from "@/stores/useExpenseProductsStore"

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

function formatMoney(value: number, currency: string) {
  return `${currency}${value.toFixed(2)}`
}

function buildSummaryText(items: ExpenseItem[], maxChars: number) {
  const base = items.map((item) => item.name).join(", ")
  return base.length > maxChars ? `${base.slice(0, Math.max(0, maxChars - 3))}...` : base
}

function TodaysExpensesBottomSummary({
  title,
  items,
  tax,
  currency,
  onEditItem,
  onAddExpense,
}: {
  title: string
  items: ExpenseItem[]
  tax: number
  currency: string
  onEditItem?: (itemId: string) => void
  onAddExpense?: () => void
}) {
  const subtotal = React.useMemo(() => items.reduce((acc, item) => acc + item.amount, 0), [items])
  const total = subtotal + tax

  const suggestions: SearchSuggestion[] = React.useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        label: item.name,
        leading: item.imageSrc ? (
          <ImageTile size="small" src={item.imageSrc} alt={item.imageAlt ?? item.name} />
        ) : undefined,
        price: formatMoney(item.amount, currency),
      })),
    [items, currency]
  )

  const collapsedSummary = React.useMemo(() => buildSummaryText(items, 30), [items])

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="w-full">
      <BottomSlidingModal open={isOpen} onOpenChange={setIsOpen}>
        <BottomSlidingModalTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full h-[72px] p-0 cursor-pointer active:scale-[0.99] transition-all relative group flex flex-col items-stretch justify-center text-left px-5",
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
              "glass-floating-bar"
            )}
            aria-label="Expand expenses summary"
          >
            <div className="flex items-center justify-between w-full">
              {/* Left Side: Summary Text */}
              <div className="flex flex-col min-w-0 pr-4">
                <div className="text-[14px] leading-tight font-medium text-onLayer-secondary truncate">
                  {items.length === 0 ? "No expenses" : collapsedSummary}
                </div>
                <div className="text-[12px] leading-tight text-onLayer-tertiary">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </div>
              </div>

              {/* Right Side: Total Price & Chevron */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-[24px] leading-none font-bold tracking-tight font-mono whitespace-nowrap">
                  {formatMoney(total, currency)}
                </div>

                <Button
                  asChild
                  variant="invisible"
                  size="icon"
                  className="text-onLayer-secondary group-hover:text-onLayer-primary hover:bg-transparent dark:hover:bg-transparent -mr-2"
                >
                  <span aria-hidden="true">
                    <SystemIcon icon={ChevronDown} size="big" className="rotate-180" aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>
          </button>
        </BottomSlidingModalTrigger>

        <BottomSlidingModalContent
          fullHeight
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
              {title}
            </SectionTitle>
          }
          footer={
            <div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatMoney(subtotal, currency)}</span>
                </div>

                {/* Only show tax if relevant, for expenses usually it is inclusive but let's keep it 0 for now */}
                <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                  <span>Tax</span>
                  <span className="font-mono">{formatMoney(tax, currency)}</span>
                </div>

                <div className="flex justify-between items-end pt-4 mt-2">
                  <span className="text-regular-semibold text-onLayer-secondary mb-1.5">Total</span>
                  <div className="text-[22px] leading-[30px] font-semibold tracking-tight font-mono text-onLayer-primary">
                    {formatMoney(total, currency)}
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="default"
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
            // Expanded surface: Full screen feel, no shadow, transparent blur background
            className: "glass-modal-full",
            headerClassName: "px-6 pt-7 pb-4",
            bodyClassName: "min-h-0",
            footerClassName: "bg-transparent border-t border-border-inverse p-6 pt-5",
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
              {items.length === 0 ? (
                <div className="px-4 py-6 text-sm text-onLayer-secondary">Start logging today’s expenses.</div>
              ) : (
                items.map((item) => (
                  <ExpenseLineItemRow
                    key={item.id}
                    name={item.name}
                    price={formatMoney(item.amount, currency)}
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    color={item.color}
                    strokeStyle={item.strokeStyle}
                    onEdit={onEditItem ? () => onEditItem(item.id) : undefined}
                  />
                ))
              )}
            </SettingsGroup>
          </div>
        </BottomSlidingModalContent>
      </BottomSlidingModal>
    </div>
  )
}

export default function TodaysExpenses({
  title = "Today's expenses",
  onEditLoggedItem,
  onAddExpense: onAddExpenseProp,
}: TodaysExpensesProps) {
  const [isAddingExpense, setIsAddingExpense] = React.useState(false)
  const [isCreatingItem, setIsCreatingItem] = React.useState(false)

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
    onAddExpenseProp?.()
  }

  const handleCreateItem = () => {
    setIsCreatingItem(true)
  }

  const handleTileClick = (item: ExpenseProduct) => {
    setExpenseDraft({
      name: item.name,
      amount: item.defaultPrice,
      color: item.color,
      stroke: item.strokeStyle
    })
    setIsAddingExpense(true)
  }

  const favoritesItems = products.filter(p => p.isFavorite)

  // Helper to map stroke style to tailwind classes
  const getStrokeClass = (style?: string) => {
    switch (style) {
      case 'none': return 'border-none'
      case 'dashed': return 'border-dashed'
      case 'dotted': return 'border-dotted'
      case 'double': return 'border-double border-4'
      case 'solid': return 'border-solid'
      default: return 'border-solid' // common
    }
  }

  // Helper to map color to tailwind border color classes
  const getColorClass = (color?: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500'
      case 'green': return 'border-green-500'
      case 'red': return 'border-red-500'
      case 'amber': return 'border-amber-500'
      case 'purple': return 'border-purple-500'
      case 'orange': return 'border-orange-500'
      case 'sky': return 'border-sky-500'
      case 'pink': return 'border-pink-500'
      case 'indigo': return 'border-indigo-500'
      case 'lime': return 'border-lime-500'
      case 'teal': return 'border-teal-500'
      case 'slate': return 'border-slate-500'
      default: return 'border-border'
    }
  }

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Header: title (no tabs) */}
        <div className="sticky top-0 z-50 isolate bg-background border-b border-border px-4 pt-4 pb-4">
          <SectionTitle
            titleAs="h1"
            size="page"
          >
            {title}
          </SectionTitle>
        </div>

        {/* Block 1: Favorites grid */}
        {favoritesItems.length > 0 && (
          <div className="px-4 pt-6">
            <SectionTitle titleAs="h2">Favorites</SectionTitle>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {favoritesItems.map((item) => (
                <ProductTile
                  key={item.id}
                  name={item.name}
                  tone="surface"
                  className={cn(
                    getColorClass(item.color),
                    getStrokeClass(item.strokeStyle),
                    item.color !== 'slate' && item.color ? "border-2" : "" // Make color more visible
                  )}
                  price={item.defaultPrice ? formatMoney(item.defaultPrice, currency) : undefined}
                  onPress={() => handleTileClick(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Block 2: Expenses browser */}
        <div className="px-4 pt-8 pb-10">
          <SectionTitle titleAs="h2">Expenses</SectionTitle>

          {/* Action / Folders Grid */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {/* New Expense (Log) */}
            <GridActionTile
              icon={Plus}
              label="Custom expense"
              iconClassName="text-primary"
              onClick={handleAddExpense}
            />
            {/* New Item (Create) */}
            <GridActionTile
              icon={Plus}
              label="New item"
              iconClassName="text-layer-success" // Green plus for new item
              onClick={handleCreateItem}
            />

            {folders.map((folder) => (
              <GridActionTile
                key={folder.id}
                icon={Folder}
                label={folder.name}
                iconClassName="text-layer-info"
                onClick={() => {
                  // For now we don't have navigation, maybe filter?
                  console.log("Folder clicked", folder.id)
                }}
              />
            ))}
          </div>

          {/* Products Grid (All non-favorites or all?) */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {products.map((item) => (
              <ProductTile
                key={item.id}
                name={item.name}
                tone="surface"
                className={cn(
                  getColorClass(item.color),
                  getStrokeClass(item.strokeStyle),
                  item.color && "border-2"
                )}
                price={item.defaultPrice ? formatMoney(item.defaultPrice, currency) : undefined}
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
        <TodaysExpensesBottomSummary
          title={title}
          items={loggedItems}
          tax={0}
          currency={currency}
          onEditItem={onEditLoggedItem}
          onAddExpense={handleAddExpense}
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

      {isCreatingItem && (
        <ExpenseManagementNewItem
          onClose={() => setIsCreatingItem(false)}
        />
      )}
    </div>
  )
}
