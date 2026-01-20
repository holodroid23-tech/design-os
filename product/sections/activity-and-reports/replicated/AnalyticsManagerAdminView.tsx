import * as React from "react"
import { Download } from "lucide-react"

import { AnalyticsLineChart, type AnalyticsLineChartDatum } from "@/components/ui/analytics-line-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MeterBar } from "@/components/ui/meter-bar"
import { SelectWithSliding } from "@/components/ui/select-with-sliding"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const designOS = {
  presentation: "mobile" as const,
}

export interface AnalyticsManagerAdminTopTab {
  id: string
  label: string
}

export interface AnalyticsManagerAdminMetricCard {
  label: string
  value: string
  supporting?: string
  tone?: "default" | "positive" | "negative"
}

export interface AnalyticsManagerAdminRankRow {
  name: string
  value: number
  valueLabel: string
}

export interface AnalyticsManagerAdminViewProps {
  topTabs?: AnalyticsManagerAdminTopTab[]
  selectedTopTabId?: string
  onSelectTopTab?: (tabId: string) => void

  dateRangeOptions?: { value: string | number; label: string }[]
  dateRangeValue?: string | number
  onDateRangeChange?: (value: string | number) => void

  onExport?: () => void

  totalIncomeLabel?: string
  totalIncomeValue?: string
  totalIncomeTrend?: string
  totalIncomeBreakdown?: string[]

  kpiCards?: AnalyticsManagerAdminMetricCard[]

  hourlyIncomeTitle?: string
  hourlyIncomeAvgLabel?: string
  hourlyIncome?: AnalyticsLineChartDatum[]
  hourlyIncomeYTicks?: number[]

  topByRevenueTitle?: string
  topByRevenue?: AnalyticsManagerAdminRankRow[]

  topByQuantityTitle?: string
  topByQuantity?: AnalyticsManagerAdminRankRow[]
}

function toneTextClass(tone: AnalyticsManagerAdminMetricCard["tone"]) {
  if (tone === "positive") return "text-onLayer-interactive"
  if (tone === "negative") return "text-onLayer-danger"
  return "text-foreground"
}

export default function AnalyticsManagerAdminView({
  topTabs = [
    { id: "analytics", label: "Analytics" },
    { id: "orders", label: "Orders" },
    { id: "expenses", label: "Expenses" },
  ],
  selectedTopTabId = "analytics",
  onSelectTopTab,

  dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "this-week", label: "This week" },
    { value: "last-30-days", label: "Last 30 days" },
  ],
  dateRangeValue = "today",
  onDateRangeChange,

  onExport,

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
}: AnalyticsManagerAdminViewProps) {
  const maxRevenue = React.useMemo(
    () => Math.max(1, ...topByRevenue.map((r) => r.value)),
    [topByRevenue]
  )
  const maxQuantity = React.useMemo(
    () => Math.max(1, ...topByQuantity.map((r) => r.value)),
    [topByQuantity]
  )

  return (
    <div className="flex h-full min-h-full w-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 pt-4">
        {/* Block 1: Top navigation */}
        <Tabs
          value={selectedTopTabId}
          onValueChange={(v) => onSelectTopTab?.(v)}
          className="w-full"
        >
          <TabsList className="w-full">
            {topTabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="flex-1">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Block 2: Toolbar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1">
            <SelectWithSliding
              variant="sliding"
              value={dateRangeValue}
              onValueChange={(v) => onDateRangeChange?.(v)}
              options={dateRangeOptions}
              placeholder="Date range"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            className="shrink-0"
            onClick={() => onExport?.()}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Block 3: Primary summary */}
        <Card className="mt-4 bg-transparent">
          <CardHeader className="gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-base">{totalIncomeLabel}</CardTitle>
                <div className="mt-2 text-3xl font-semibold tracking-tight">
                  {totalIncomeValue}
                </div>
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

        {/* Block 4: KPI grid */}
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

        {/* Block 5: Hourly income chart */}
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

        {/* Block 6: Rankings (top items by revenue) */}
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

        {/* Block 6: Rankings (top items by quantity) */}
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
    </div>
  )
}

