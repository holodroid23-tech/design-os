import * as React from "react"
import type { LucideIcon } from "lucide-react"
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

export const designOS = {
  presentation: "mobile" as const,
}

export interface TodaysExpensesLoggedItem {
  id: string
  name: string
  amount: number
  imageSrc?: string
  imageAlt?: string
}

export interface TodaysExpensesProps {
  title?: string

  favoritesItems?: {
    id: string
    name: string
    imageSrc?: string
    imageAlt?: string
  }[]
  onPressFavoriteItem?: (itemId: string) => void

  expenseTiles?: {
    id: string
    name: string
    imageSrc?: string
    imageAlt?: string
  }[]
  onPressExpenseTile?: (itemId: string) => void

  expenseCategoryTiles?: {
    id: string
    label: string
    icon?: LucideIcon
    iconClassName?: string
  }[]
  onPressExpenseCategoryTile?: (tileId: string) => void

  loggedItems?: TodaysExpensesLoggedItem[]
  tax?: number

  onEditLoggedItem?: (itemId: string) => void
  onAddExpense?: () => void
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`
}

function buildSummaryText(items: TodaysExpensesLoggedItem[], maxChars: number) {
  const base = items.map((item) => item.name).join(", ")
  return base.length > maxChars ? `${base.slice(0, Math.max(0, maxChars - 3))}...` : base
}

function TodaysExpensesBottomSummary({
  title,
  items,
  tax,
  onEditItem,
  onAddExpense,
}: {
  title: string
  items: TodaysExpensesLoggedItem[]
  tax: number
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
        price: formatMoney(item.amount),
      })),
    [items]
  )

  const collapsedSummary = React.useMemo(() => buildSummaryText(items, 30), [items])

  return (
    <div className="w-full">
      <BottomSlidingModal>
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
            aria-label="Expand expenses summary"
          >
            <div className="flex items-center justify-between mt-1 px-4">
              <div className="flex flex-col min-w-0">
                <div className="text-[30px] leading-none font-bold tracking-tight font-mono">
                  {formatMoney(total)}
                </div>
                <div className="text-[12px] leading-[16px] text-onLayer-secondary mt-1 truncate max-w-[240px]">
                  {items.length === 0 ? "No expenses yet" : collapsedSummary}
                </div>
              </div>

              <span
                className="inline-flex h-10 w-10 items-center justify-center text-onLayer-secondary group-hover:text-onLayer-primary transition-colors"
                aria-hidden="true"
              >
                <SystemIcon icon={ChevronDown} size="huge" className="rotate-180" aria-hidden="true" />
              </span>
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
              {title}
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
              {items.length === 0 ? (
                <div className="px-4 py-6 text-sm text-onLayer-secondary">Start logging today’s expenses.</div>
              ) : (
                items.map((item) => (
                  <ExpenseLineItemRow
                    key={item.id}
                    name={item.name}
                    price={formatMoney(item.amount)}
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
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
  favoritesItems = [
    {
      id: "milk",
      name: "Milk",
      imageSrc: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Milk",
    },
    { id: "sugar", name: "Sugar" },
    {
      id: "paper-cups",
      name: "Paper cups",
      imageSrc: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Paper cups",
    },
    { id: "napkins", name: "Napkins" },
    {
      id: "coffee-beans",
      name: "Coffee beans",
      imageSrc: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Coffee beans",
    },
    { id: "tea-bags", name: "Tea bags" },
    { id: "filters", name: "Filters" },
    { id: "stirrers", name: "Stirrers" },
    { id: "ice-bags", name: "Ice bags" },
  ],
  onPressFavoriteItem,
  expenseCategoryTiles = [
    { id: "custom-expense", label: "Custom expense", icon: Plus, iconClassName: "text-primary" },
    { id: "produce", label: "Produce", icon: Folder, iconClassName: "text-layer-info" },
    { id: "packaging", label: "Packaging", icon: Folder, iconClassName: "text-layer-info" },
  ],
  onPressExpenseCategoryTile,
  expenseTiles = [
    { id: "oat-milk", name: "Oat milk" },
    { id: "cleaning", name: "Cleaning supplies" },
    { id: "pastry-trays", name: "Pastry trays" },
    { id: "straws", name: "Straws" },
    { id: "cups-lids", name: "Cup lids" },
    { id: "syrup", name: "Syrup" },
    { id: "produce-bananas", name: "Bananas" },
    { id: "produce-berries", name: "Berries" },
    { id: "packaging-bags", name: "To-go bags" },
  ],
  onPressExpenseTile,
  loggedItems = [
    {
      id: "logged-milk",
      name: "Milk",
      amount: 3.0,
      imageSrc: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=256&auto=format&fit=crop",
      imageAlt: "Milk",
    },
    { id: "logged-paper-cups", name: "Paper cups", amount: 8.5 },
    { id: "logged-cleaning", name: "Cleaning supplies", amount: 7.0 },
  ],
  tax = 0,
  onEditLoggedItem,
  onAddExpense,
}: TodaysExpensesProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Header: title (no tabs) */}
        <div className="sticky top-0 z-50 isolate bg-background border-b border-border px-4 pt-4 pb-4">
          <SectionTitle titleAs="h1" size="page">
            {title}
          </SectionTitle>
        </div>

        {/* Block 1: Favorites grid (tiles without prices and without counters) */}
        <div className="px-4 pt-6">
          <SectionTitle titleAs="h2">Favorites</SectionTitle>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {favoritesItems.map((item) => (
              <ProductTile
                key={item.id}
                name={item.name}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                tone="surface"
                // No price, no count, no actions
                onPress={() => onPressFavoriteItem?.(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Block 2: Expenses browser */}
        <div className="px-4 pt-8 pb-10">
          <SectionTitle titleAs="h2">Expenses</SectionTitle>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {expenseCategoryTiles.map((tile) => (
              <GridActionTile
                key={tile.id}
                icon={tile.icon}
                label={tile.label}
                iconClassName={tile.iconClassName}
                onClick={() => onPressExpenseCategoryTile?.(tile.id)}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {expenseTiles.map((item) => (
              <ProductTile
                key={item.id}
                name={item.name}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                tone="surface"
                // No price, no count, no actions
                onPress={() => onPressExpenseTile?.(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Reserve space for the floating summary bar */}
        <FloatingBottomBarSpacer />
      </div>

      {/* Floating bottom summary bar (overlays content) */}
      <FloatingBottomBar>
        <TodaysExpensesBottomSummary
          title={title}
          items={loggedItems}
          tax={tax}
          onEditItem={onEditLoggedItem}
          onAddExpense={onAddExpense}
        />
      </FloatingBottomBar>
    </div>
  )
}

