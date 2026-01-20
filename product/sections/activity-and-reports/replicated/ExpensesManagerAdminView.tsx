import * as React from "react"

import { Home } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import {
  ExpenseExpandableGroup,
  ExpenseExpandableRow,
  type ExpenseExpandableRowChange,
  type ExpenseExpandableRowLeading,
} from "@/components/ui/expense-expandable-accordion"
import { SelectWithSliding } from "@/components/ui/select-with-sliding"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const designOS = {
  presentation: "mobile" as const,
}

type ExpensesManagerTopTabId = "analytics" | "orders" | "expenses"

export interface ExpensesManagerDayGroup {
  id: string
  dayLabel: string
  expensesCountLabel: string
  total: string
  editsLabel?: string
  defaultOpen?: boolean
  items?: ExpensesManagerExpenseItem[]
}

export interface ExpensesManagerExpenseItem {
  id: string
  name: string
  price: string
  createdBy: string
  time: string
  note: string
  changeLog?: string[]
  deleted?: boolean
  defaultOpen?: boolean
  imageSrc?: string
  imageAlt?: string
  showChangeMarker?: boolean
  leading?: ExpenseExpandableRowLeading
}

export interface ExpensesManagerAdminViewProps {
  selectedTopTabId?: ExpensesManagerTopTabId
  onSelectTopTab?: (tabId: ExpensesManagerTopTabId) => void

  analyticsLabel?: string
  ordersLabel?: string
  expensesLabel?: string

  dateRangeValue?: string | number
  onDateRangeChange?: (value: string | number) => void
  dateRangePlaceholder?: string
  dateRangeOptions?: { value: string | number; label: string }[]

  exportLabel?: string
  onExport?: () => void

  resultsText?: string
  addExpenseLabel?: string
  onAddExpense?: () => void

  dayGroups?: ExpensesManagerDayGroup[]
}

function useControllableState<T>(value: T | undefined, defaultValue: T) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? (value as T) : uncontrolled

  const set = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
    },
    [isControlled]
  )

  return [current, set] as const
}

export default function ExpensesManagerAdminView({
  selectedTopTabId,
  onSelectTopTab,
  analyticsLabel = "Analytics",
  ordersLabel = "Orders",
  expensesLabel = "Expenses",
  dateRangeValue,
  onDateRangeChange,
  dateRangePlaceholder = "This week",
  dateRangeOptions = [
    { value: "this-week", label: "This week" },
    { value: "last-week", label: "Last week" },
    { value: "this-month", label: "This month" },
    { value: "last-month", label: "Last month" },
  ],
  exportLabel = "Export",
  onExport,
  resultsText = "42 expenses found",
  addExpenseLabel = "+ Add expense",
  onAddExpense,
  dayGroups = [
    { id: "today", dayLabel: "Today", expensesCountLabel: "3 expenses", total: "$14.50" },
    {
      id: "yesterday",
      dayLabel: "Yesterday",
      expensesCountLabel: "3 expenses",
      total: "$1,304.50",
      editsLabel: "4 edits",
      defaultOpen: true,
      items: [
        {
          id: "whole-milk",
          name: "Whole Milk",
          price: "$4.50",
          createdBy: "Sarah Jackson",
          time: "Yesterday at 10:42 AM",
          note: "put some text here",
          leading: {
            type: "image",
            src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=256&auto=format&fit=crop",
            alt: "Whole Milk",
          },
          defaultOpen: true,
        },
        {
          id: "rent",
          name: "Rent",
          price: "$1,250.00",
          createdBy: "Freddy Gasper",
          time: "Yesterday at 10:50 AM",
          note: "Monthly Office Rent",
          changeLog: [
            'Freddy Gasper changed name from "Banana" to "Rent" on Yesterday at 10:50 AM',
          ],
          defaultOpen: true,
          showChangeMarker: true,
          leading: { type: "icon", icon: Home, tone: "neutral" },
        },
        {
          id: "coffee-beans",
          name: "Coffee Beans",
          price: "$50.00",
          createdBy: "Sarah Jackson",
          time: "Yesterday at 09:15 AM",
          note: "Dark Roast",
          deleted: true,
          changeLog: [
            "Sarah Jackson changed price from $45.00 to $50.00 at Yesterday at 09:20 AM",
            'Sarah Jackson changed note from "Light Roast" to "Dark Roast" at Yesterday at 09:20 AM',
            "Sarah Jackson deleted expense at Yesterday at 09:25 AM",
          ],
          defaultOpen: true,
          showChangeMarker: true,
          leading: {
            type: "image",
            src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=256&auto=format&fit=crop",
            alt: "Coffee Beans",
          },
        },
      ],
    },
    { id: "thu-oct-24", dayLabel: "Thursday, Oct 24", expensesCountLabel: "2 expenses", total: "$8.50" },
    { id: "wed-oct-23", dayLabel: "Wednesday, Oct 23", expensesCountLabel: "1 expense", total: "$12.00" },
  ],
}: ExpensesManagerAdminViewProps) {
  const [selected, setSelected] = useControllableState<ExpensesManagerTopTabId>(
    selectedTopTabId,
    "expenses"
  )

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Top tabs */}
      <div className="sticky top-0 z-50 bg-background border-b border-border px-4 pt-4 pb-4">
        <Tabs
          value={selected}
          onValueChange={(next) => {
            const tabId = next as ExpensesManagerTopTabId
            setSelected(tabId)
            onSelectTopTab?.(tabId)
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger value="analytics">{analyticsLabel}</TabsTrigger>
            <TabsTrigger value="orders">{ordersLabel}</TabsTrigger>
            <TabsTrigger value="expenses">{expensesLabel}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Block 2: Filters + primary actions */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <SelectWithSliding
                variant="sliding"
                value={dateRangeValue}
                onValueChange={onDateRangeChange}
                options={dateRangeOptions}
                placeholder={dateRangePlaceholder}
                slidingPresentation="list"
                slidingShowHeader={false}
              />
            </div>

            <Button type="button" variant="ghost" onClick={onExport}>
              {exportLabel}
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="min-w-0">{resultsText}</div>
            <Button type="button" variant="link" onClick={onAddExpense}>
              {addExpenseLabel}
            </Button>
          </div>
        </div>

        {/* Block 3: Day-group expandable list */}
        <div className="px-4 pt-5 pb-6 space-y-3">
          {dayGroups.map((group) => {
            const badge = group.editsLabel ? { label: group.editsLabel, variant: "destructive" as const } : undefined

            return (
              <ExpenseExpandableGroup
                key={group.id}
                defaultOpen={group.defaultOpen}
                title={group.dayLabel}
                subtitle={group.expensesCountLabel}
                amount={group.total}
                badge={badge}
              >
                {(group.items ?? []).map((item) => {
                  const changes: ExpenseExpandableRowChange[] = (item.changeLog ?? []).map((text) => ({ text }))

                  return (
                    <ExpenseExpandableRow
                      key={item.id}
                      defaultOpen={item.defaultOpen}
                      title={item.name}
                      amount={item.price}
                      leading={item.leading}
                      deleted={item.deleted}
                      showChangeMarker={item.showChangeMarker}
                      details={{
                        createdBy: item.createdBy,
                        time: item.time,
                        note: item.note,
                      }}
                      changes={changes.length > 0 ? changes : undefined}
                      onEdit={() => {}}
                    />
                  )
                })}
              </ExpenseExpandableGroup>
            )
          })}
        </div>
      </div>
    </div>
  )
}

