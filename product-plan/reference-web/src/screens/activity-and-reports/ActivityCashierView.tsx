import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { OrderExpandableCard, type OrderExpandableCardDetail, type OrderExpandableCardLineItem } from "../../components/ui/order-expandable-card"
import { SectionTitle } from "../../components/ui/section-title"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"

export const designOS = {
  presentation: "mobile" as const,
}

type ActivityCashierTopTabId = "analytics" | "orders"

export interface ActivityCashierOrderRow {
  id: string
  title: string
  time: string
  amount: string
  isRefunded?: boolean
  defaultOpen?: boolean
  items?: OrderExpandableCardLineItem[]
  details?: OrderExpandableCardDetail[]
}

export interface ActivityCashierMetricCard {
  label: string
  value: string
  supporting?: string
  tone?: "default" | "positive" | "negative"
}

export interface ActivityCashierViewProps {
  selectedTopTabId?: ActivityCashierTopTabId
  onSelectTopTab?: (tabId: ActivityCashierTopTabId) => void

  analyticsLabel?: string
  ordersLabel?: string

  todaysAnalyticsTitle?: string
  todaysOrdersTitleBase?: string
  ordersCount?: number

  // Analytics (value widgets only)
  totalIncomeLabel?: string
  totalIncomeValue?: string
  totalIncomeTrend?: string
  kpiCards?: ActivityCashierMetricCard[]

  // Orders
  orders?: ActivityCashierOrderRow[]
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

function toneTextClass(tone: ActivityCashierMetricCard["tone"]) {
  if (tone === "positive") return "text-onLayer-interactive"
  if (tone === "negative") return "text-onLayer-danger"
  return "text-foreground"
}

const defaultOrders: ActivityCashierOrderRow[] = [
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

export default function ActivityCashierView({
  selectedTopTabId,
  onSelectTopTab,
  analyticsLabel = "Analytics",
  ordersLabel = "Orders",
  todaysAnalyticsTitle = "Today's analytics",
  todaysOrdersTitleBase = "Today's orders",
  ordersCount,
  totalIncomeLabel = "Total income",
  totalIncomeValue = "$1,248.50",
  totalIncomeTrend = "+15% vs yst",
  kpiCards = [
    { label: "Net profit", value: "$842.10", supporting: "+12% vs yst", tone: "positive" },
    { label: "Expenses", value: "$406.40", supporting: "4 transactions" },
    { label: "Refunds", value: "-$24.50", tone: "negative" },
    { label: "Refunds count", value: "2" },
    { label: "In drawer", value: "$460.00" },
    { label: "Total orders", value: "142" },
  ],
  orders = defaultOrders,
}: ActivityCashierViewProps) {
  const [selectedTab, setSelectedTab] = useControllableState<ActivityCashierTopTabId>(
    selectedTopTabId,
    "analytics"
  )

  const resolvedOrdersCount = ordersCount ?? orders.length
  const todaysOrdersTitle = `${todaysOrdersTitleBase} (${resolvedOrdersCount})`

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border px-4 pt-4 pb-4">
        <Tabs
          value={selectedTab}
          onValueChange={(next) => {
            const tabId = next as ActivityCashierTopTabId
            setSelectedTab(tabId)
            onSelectTopTab?.(tabId)
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger value="analytics">{analyticsLabel}</TabsTrigger>
            <TabsTrigger value="orders">{ordersLabel}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {selectedTab === "analytics" ? (
          <div className="px-4 pt-4 pb-10">
            <SectionTitle titleAs="h2">{todaysAnalyticsTitle}</SectionTitle>

            <Card className="mt-4 bg-transparent">
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-base">{totalIncomeLabel}</CardTitle>
                    <div className="mt-2 text-3xl font-semibold tracking-tight">{totalIncomeValue}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{totalIncomeTrend}</div>
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
                    {c.supporting ? (
                      <div className="mt-1 text-xs text-muted-foreground">{c.supporting}</div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 pt-4 pb-6">
            <SectionTitle titleAs="h2">{todaysOrdersTitle}</SectionTitle>

            <div className="mt-4 space-y-3">
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
          </div>
        )}
      </div>
    </div>
  )
}

