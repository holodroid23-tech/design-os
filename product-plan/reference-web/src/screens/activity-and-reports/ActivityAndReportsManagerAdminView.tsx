import * as React from "react"
import { Home } from "lucide-react"

import { AnalyticsLineChart, type AnalyticsLineChartDatum } from "../../components/ui/analytics-line-chart"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import {
  ExpenseExpandableGroup,
  ExpenseExpandableRow,
  type ExpenseExpandableRowChange,
  type ExpenseExpandableRowLeading,
} from "../../components/ui/expense-expandable-accordion"
import { DatePicker } from "../../components/ui/date-picker"
import { Label } from "../../components/ui/label"
import { MeterBar } from "../../components/ui/meter-bar"
import { OrderExpandableCard, type OrderExpandableCardDetail, type OrderExpandableCardLineItem } from "../../components/ui/order-expandable-card"
import { SelectWithSliding } from "../../components/ui/select-with-sliding"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"

export const designOS = {
  presentation: "mobile" as const,
}

type ActivityAndReportsTopTabId = "analytics" | "orders" | "expenses"

export interface ActivityAndReportsExpenseDayGroup {
  id: string
  dayLabel: string
  expensesCountLabel: string
  total: string
  editsLabel?: string
  defaultOpen?: boolean
  items?: ActivityAndReportsExpenseItem[]
}

export interface ActivityAndReportsExpenseItem {
  id: string
  name: string
  price: string
  createdBy: string
  time: string
  note: string
  changeLog?: string[]
  deleted?: boolean
  defaultOpen?: boolean
  showChangeMarker?: boolean
  imageSrc?: string
  imageAlt?: string
  leading?: ExpenseExpandableRowLeading
}

export interface ActivityAndReportsOrderRow {
  id: string
  title: string
  time: string
  amount: string
  isRefunded?: boolean
  defaultOpen?: boolean
  items?: OrderExpandableCardLineItem[]
  details?: OrderExpandableCardDetail[]
}

export interface ActivityAndReportsMetricCard {
  label: string
  value: string
  supporting?: string
  tone?: "default" | "positive" | "negative"
}

export interface ActivityAndReportsRankRow {
  name: string
  value: number
  valueLabel: string
}

export interface ActivityAndReportsManagerAdminViewProps {
  selectedTopTabId?: ActivityAndReportsTopTabId
  onSelectTopTab?: (tabId: ActivityAndReportsTopTabId) => void

  analyticsLabel?: string
  ordersLabel?: string
  expensesLabel?: string

  dateRangeValue?: string | number
  onDateRangeChange?: (value: string | number) => void
  dateRangePlaceholder?: string
  dateRangeOptions?: { value: string | number; label: string }[]

  customRangeFrom?: Date
  customRangeTo?: Date
  onCustomRangeFromChange?: (date: Date | undefined) => void
  onCustomRangeToChange?: (date: Date | undefined) => void

  // Analytics content
  totalIncomeLabel?: string
  totalIncomeValue?: string
  totalIncomeTrend?: string
  totalIncomeBreakdown?: string[]
  kpiCards?: ActivityAndReportsMetricCard[]
  hourlyIncomeTitle?: string
  hourlyIncomeAvgLabel?: string
  hourlyIncome?: AnalyticsLineChartDatum[]
  hourlyIncomeYTicks?: number[]
  topByRevenueTitle?: string
  topByRevenue?: ActivityAndReportsRankRow[]
  topByQuantityTitle?: string
  topByQuantity?: ActivityAndReportsRankRow[]

  // Orders content
  ordersResultsText?: string
  orders?: ActivityAndReportsOrderRow[]

  // Expenses content
  expensesResultsText?: string
  addExpenseLabel?: string
  onAddExpense?: () => void
  expenseDayGroups?: ActivityAndReportsExpenseDayGroup[]
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

function toneTextClass(tone: ActivityAndReportsMetricCard["tone"]) {
  if (tone === "positive") return "text-onLayer-interactive"
  if (tone === "negative") return "text-onLayer-danger"
  return "text-foreground"
}

const defaultOrders: ActivityAndReportsOrderRow[] = [
  { id: "o403", title: "Order #403", time: "10:45 AM", amount: "$14.50" },
  {
    id: "o402",
    title: "Order #402",
    time: "10:42 AM",
    amount: "$29.90",
    isRefunded: true,
    defaultOpen: true,
    items: [
      {
        id: "cappuccino",
        name: "Cappuccino",
        qty: 1,
        price: "$4.50",
        imageSrc: "https://picsum.photos/seed/cappuccino/88",
        imageAlt: "Cappuccino",
      },
      {
        id: "avocado-toast",
        name: "Avocado Toast",
        qty: 1,
        price: "$12.00",
        imageSrc: "https://picsum.photos/seed/avocado-toast/88",
        imageAlt: "Avocado Toast",
      },
      {
        id: "iced-matcha",
        name: "Iced Matcha",
        qty: 1,
        price: "$11.00",
        imageSrc: "https://picsum.photos/seed/iced-matcha/88",
        imageAlt: "Iced Matcha",
      },
    ],
    details: [
      { label: "Custom name", value: "Table 1" },
      { label: "Payment method", value: "Visa •••• 4242" },
      { label: "Created by", value: "Sarah Jackson" },
      { label: "Processed by", value: "Karel Martinek" },
      { label: "Refunded by", value: "Mike Ross" },
      { label: "Reason", value: "Damaged item" },
    ],
  },
  { id: "o401", title: "Order #401", time: "10:38 AM", amount: "$8.50", isRefunded: true },
  { id: "o400", title: "Order #400", time: "10:35 AM", amount: "$12.00" },
]

const defaultExpenseDayGroups: ActivityAndReportsExpenseDayGroup[] = [
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
        changeLog: ['Freddy Gasper changed name from "Banana" to "Rent" on Yesterday at 10:50 AM'],
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
  {
    id: "thu-oct-24",
    dayLabel: "Thursday, Oct 24",
    expensesCountLabel: "2 expenses",
    total: "$8.50",
  },
  { id: "wed-oct-23", dayLabel: "Wednesday, Oct 23", expensesCountLabel: "1 expense", total: "$12.00" },
]

export default function ActivityAndReportsManagerAdminView({
  selectedTopTabId,
  onSelectTopTab,
  analyticsLabel = "Analytics",
  ordersLabel = "Orders",
  expensesLabel = "Expenses",

  dateRangeValue,
  onDateRangeChange,
  dateRangePlaceholder = "This week",
  dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "this-week", label: "This week" },
    { value: "last-week", label: "Last week" },
    { value: "this-month", label: "This month" },
    { value: "last-month", label: "Last month" },
    { value: "custom-range", label: "Custom range" },
  ],

  customRangeFrom,
  customRangeTo,
  onCustomRangeFromChange,
  onCustomRangeToChange,

  totalIncomeLabel = "Total income",
  totalIncomeValue = "$1,248.50",
  totalIncomeTrend = "+15% vs yst",
  totalIncomeBreakdown = ["Cash: $310", "Card: $938.50"],
  kpiCards = [
    { label: "Net profit", value: "$842.10", supporting: "+12% vs yst", tone: "positive" },
    { label: "Expenses", value: "$406.40", supporting: "4 transactions" },
    { label: "Refunds", value: "-$24.50", tone: "negative" },
    { label: "Refunds count", value: "2" },
    { label: "In drawer", value: "$460.00" },
    { label: "Total orders", value: "142" },
  ],
  hourlyIncomeTitle = "Hourly income",
  hourlyIncomeAvgLabel = "Avg $120/h",
  hourlyIncome = [
    { label: "8AM", value: 60 },
    { label: "10AM", value: 120 },
    { label: "12PM", value: 260 },
    { label: "2PM", value: 220 },
    { label: "4PM", value: 340 },
  ],
  hourlyIncomeYTicks = [0, 100, 200, 300, 400],
  topByRevenueTitle = "Top 10 items by revenue",
  topByRevenue = [
    { name: "Cappuccino", value: 420, valueLabel: "$420" },
    { name: "Avocado Toast", value: 315, valueLabel: "$315" },
    { name: "Iced Matcha", value: 280, valueLabel: "$280" },
    { name: "Cold Brew", value: 240, valueLabel: "$240" },
    { name: "Flat White", value: 210, valueLabel: "$210" },
  ],
  topByQuantityTitle = "Top 10 items by quantity",
  topByQuantity = [
    { name: "Latte", value: 84, valueLabel: "84" },
    { name: "Cappuccino", value: 76, valueLabel: "76" },
    { name: "Croissant", value: 62, valueLabel: "62" },
  ],

  ordersResultsText = "42 orders found",
  orders = defaultOrders,

  expensesResultsText = "42 expenses found",
  addExpenseLabel = "+ Add expense",
  onAddExpense,
  expenseDayGroups = defaultExpenseDayGroups,
}: ActivityAndReportsManagerAdminViewProps) {
  const [selectedTab, setSelectedTab] = useControllableState<ActivityAndReportsTopTabId>(
    selectedTopTabId,
    "analytics"
  )

  const [resolvedDateRange, setResolvedDateRange] = useControllableState<string | number>(
    dateRangeValue,
    "this-week"
  )

  const [fromDate, setFromDate] = useControllableState<Date | undefined>(customRangeFrom, undefined)
  const [toDate, setToDate] = useControllableState<Date | undefined>(customRangeTo, undefined)

  const maxRevenue = React.useMemo(
    () => Math.max(1, ...topByRevenue.map((r) => r.value)),
    [topByRevenue]
  )
  const maxQuantity = React.useMemo(
    () => Math.max(1, ...topByQuantity.map((r) => r.value)),
    [topByQuantity]
  )

  const showCustomRange = resolvedDateRange === "custom-range"

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Header: Top tabs (Expenses header style) */}
      <div className="sticky top-0 z-50 bg-background border-b border-border px-4 pt-4 pb-4">
        <Tabs
          value={selectedTab}
          onValueChange={(next) => {
            const tabId = next as ActivityAndReportsTopTabId
            setSelectedTab(tabId)
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
        {/* Toolbar: Date range */}
        <div className="px-4 pt-4">
          <SelectWithSliding
            variant="sliding"
            value={resolvedDateRange}
            onValueChange={(v) => {
              setResolvedDateRange(v)
              onDateRangeChange?.(v)
            }}
            options={dateRangeOptions}
            placeholder={dateRangePlaceholder}
            slidingPresentation="list"
            slidingShowHeader={false}
          />

          {showCustomRange ? (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <Label className="text-muted-foreground">From</Label>
                <div className="mt-2">
                  <DatePicker
                    date={fromDate}
                    onDateChange={(d) => {
                      setFromDate(d)
                      onCustomRangeFromChange?.(d)
                    }}
                    placeholder="Select start"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <Label className="text-muted-foreground">To</Label>
                <div className="mt-2">
                  <DatePicker
                    date={toDate}
                    onDateChange={(d) => {
                      setToDate(d)
                      onCustomRangeToChange?.(d)
                    }}
                    placeholder="Select end"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {selectedTab === "expenses" ? (
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="min-w-0">{expensesResultsText}</div>
              <Button type="button" variant="link" onClick={onAddExpense}>
                {addExpenseLabel}
              </Button>
            </div>
          ) : selectedTab === "orders" ? (
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="min-w-0">{ordersResultsText}</div>
              <div />
            </div>
          ) : null}
        </div>

        {/* Content */}
        {selectedTab === "analytics" ? (
          <div className="px-4 pt-4 pb-10">
            <Card className="bg-transparent">
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-base">{totalIncomeLabel}</CardTitle>
                    <div className="mt-2 text-3xl font-semibold tracking-tight">{totalIncomeValue}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{totalIncomeTrend}</div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {totalIncomeBreakdown.map((chip) => (
                    <Badge key={chip} variant="ghost" className="text-xs">
                      {chip}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {kpiCards.map((c) => (
                <Card key={c.label} className="bg-transparent gap-3 py-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{c.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={["text-xl font-semibold", toneTextClass(c.tone)].join(" ")}>
                      {c.value}
                    </div>
                    {c.supporting ? <div className="mt-1 text-xs text-muted-foreground">{c.supporting}</div> : null}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-4 bg-transparent">
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle className="text-base">{hourlyIncomeTitle}</CardTitle>
                <Badge variant="ghost" className="text-xs">
                  {hourlyIncomeAvgLabel}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <AnalyticsLineChart
                  data={hourlyIncome}
                  yTicks={hourlyIncomeYTicks}
                  valueFormatter={(v) => `$${v}`}
                />
              </CardContent>
            </Card>

            <Card className="mt-4 bg-transparent">
              <CardHeader>
                <CardTitle className="text-base">{topByRevenueTitle}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {topByRevenue.map((row) => (
                    <div key={row.name} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
                      <div className="truncate text-sm">{row.name}</div>
                      <MeterBar value={row.value} max={maxRevenue} aria-label={`${row.name} revenue`} />
                      <div className="text-sm tabular-nums">{row.valueLabel}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 bg-transparent">
              <CardHeader>
                <CardTitle className="text-base">{topByQuantityTitle}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {topByQuantity.map((row) => (
                    <div key={row.name} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
                      <div className="truncate text-sm">{row.name}</div>
                      <MeterBar value={row.value} max={maxQuantity} aria-label={`${row.name} quantity`} />
                      <div className="text-sm tabular-nums">{row.valueLabel}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : selectedTab === "orders" ? (
          <div className="px-4 pt-5 pb-6 space-y-3">
            {orders.map((order) => (
              <OrderExpandableCard
                key={order.id}
                defaultOpen={order.defaultOpen}
                title={order.title}
                time={order.time}
                amount={order.amount}
                statusBadge={order.isRefunded ? { label: "Refunded", variant: "destructive" } : undefined}
                items={order.items}
                details={order.details}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 pt-5 pb-6 space-y-3">
            {expenseDayGroups.map((group) => {
              const badge = group.editsLabel
                ? { label: group.editsLabel, variant: "destructive" as const }
                : undefined

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
        )}
      </div>
    </div>
  )
}

