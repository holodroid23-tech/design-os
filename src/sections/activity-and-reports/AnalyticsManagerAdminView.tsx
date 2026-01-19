/**
 * AnalyticsManagerAdminView - Replicated design
 *
 * Replicates the "analytics-manager-admin-view" mock using the Compost design system.
 */

import { useMemo } from 'react'
import { ArrowUpRight, Calendar, ChevronDown, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  formatMoney,
  getDefaultActivityReportsData,
  type ActivityReportsData,
  type HourlyIncomePoint,
  type PerformanceItem,
  type SummaryWidget,
} from './types'

export const designOS = { presentation: 'mobile' as const }

const BAR_WIDTHS = [
  'w-[0%]',
  'w-[5%]',
  'w-[10%]',
  'w-[15%]',
  'w-[20%]',
  'w-[25%]',
  'w-[30%]',
  'w-[35%]',
  'w-[40%]',
  'w-[45%]',
  'w-[50%]',
  'w-[55%]',
  'w-[60%]',
  'w-[65%]',
  'w-[70%]',
  'w-[75%]',
  'w-[80%]',
  'w-[85%]',
  'w-[90%]',
  'w-[95%]',
  'w-[100%]',
] as const

export interface AnalyticsManagerAdminViewProps {
  data?: Pick<ActivityReportsData, 'summary' | 'cashBreakdown' | 'hourlyIncome' | 'topRevenue' | 'topQuantity'>
  activeTab?: 'analytics' | 'orders' | 'expenses'
  dateRangeLabel?: string
  onTabChange?: (tab: 'analytics' | 'orders' | 'expenses') => void
  onDateRangeChange?: () => void
  onExport?: () => void
}

function findWidget(summary: SummaryWidget[], label: string) {
  return summary.find((w) => w.label.toLowerCase() === label.toLowerCase())
}

export default function AnalyticsManagerAdminView({
  data,
  activeTab = 'analytics',
  dateRangeLabel = 'Today',
  onTabChange,
  onDateRangeChange,
  onExport,
}: AnalyticsManagerAdminViewProps) {
  const defaults = useMemo(() => getDefaultActivityReportsData(), [])
  const summary = data?.summary ?? defaults.summary
  const breakdown = data?.cashBreakdown ?? defaults.cashBreakdown ?? { cash: 0, card: 0 }
  const hourlyIncome = data?.hourlyIncome ?? defaults.hourlyIncome ?? []
  const topRevenue = data?.topRevenue ?? defaults.topRevenue ?? []
  const topQuantity = data?.topQuantity ?? defaults.topQuantity ?? []

  const totalIncome = findWidget(summary, 'Total income')
  const netProfit = findWidget(summary, 'Net profit')
  const expenses = findWidget(summary, 'Expenses')
  const refunds = findWidget(summary, 'Refunds')
  const refundsCount = findWidget(summary, 'Refunds count')
  const inDrawer = findWidget(summary, 'In drawer')
  const totalOrders = findWidget(summary, 'Total orders')

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[980px] bg-background text-foreground px-4 pt-4 pb-10">
      {/* Top tabs */}
      <div className="flex items-center gap-2 bg-card border border-border rounded-[18px] p-1">
        <TopTab label="Analytics" active={activeTab === 'analytics'} onClick={() => onTabChange?.('analytics')} />
        <TopTab label="Orders" active={activeTab === 'orders'} onClick={() => onTabChange?.('orders')} />
        <TopTab label="Expenses" active={activeTab === 'expenses'} onClick={() => onTabChange?.('expenses')} />
      </div>

      {/* Filters row */}
      <div className="mt-3 flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onDateRangeChange}
          className="flex-1 h-11 justify-between rounded-[12px]"
        >
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span className="text-small font-semibold">{dateRangeLabel}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </Button>

        <Button type="button" variant="secondary" onClick={onExport} className="h-11 px-4 rounded-[12px]">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Export
        </Button>
      </div>

      {/* Total income card */}
      <div className="mt-4 rounded-[18px] bg-card border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="text-support-small font-bold tracking-[0.12em] text-muted-foreground">Total income</div>
          {totalIncome?.trend && (
            <div className="flex items-center gap-2 text-support-small font-semibold text-primary">
              <span>{totalIncome.trend}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="mt-3 text-[34px] leading-[40px] font-semibold tracking-tight font-mono">
          {formatMoney(Math.abs(totalIncome?.value ?? 1248.5))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-7 px-3 rounded-[9999px] bg-muted text-support-small text-muted-foreground flex items-center">
            Cash: <span className="ml-1 font-mono">{formatMoney(breakdown.cash)}</span>
          </div>
          <div className="h-7 px-3 rounded-[9999px] bg-muted text-support-small text-muted-foreground flex items-center">
            Card: <span className="ml-1 font-mono">{formatMoney(breakdown.card)}</span>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard
          title="Net profit"
          value={formatMoney(Math.abs(netProfit?.value ?? 842.1))}
          valueClassName="text-primary"
          footnote={netProfit?.trend ?? '+12% vs yesterday'}
        />
        <KpiCard
          title="Expenses"
          value={formatMoney(Math.abs(expenses?.value ?? 406.4))}
          footnote={typeof expenses?.count === 'number' ? `${expenses.count} transactions` : '4 transactions'}
        />
        <KpiCard
          title="Refunds"
          value={`-${formatMoney(Math.abs(refunds?.value ?? -24.5))}`}
          valueClassName="text-destructive"
        />
        <KpiCard title="Refunds count" value={`${Math.max(0, Math.round(refundsCount?.value ?? 2))}`} />
        <KpiCard title="In drawer" value={formatMoney(Math.abs(inDrawer?.value ?? 460))} />
        <KpiCard title="Total orders" value={`${Math.max(0, Math.round(totalOrders?.value ?? 142))}`} />
      </div>

      {/* Hourly income chart */}
      <div className="mt-4 rounded-[18px] bg-card border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="text-small font-semibold text-foreground">Hourly income</div>
          <div className="h-7 px-3 rounded-[9999px] bg-muted text-support-small text-muted-foreground flex items-center">
            {`Avg ${formatMoney(getAverage(hourlyIncome))}/h`}
          </div>
        </div>

        <div className="mt-3">
          <LineChart points={hourlyIncome} />
        </div>
      </div>

      {/* Top revenue */}
      <TopListCard title="Top 10 items by revenue" items={topRevenue} valueKey="revenue" />

      {/* Top quantity */}
      <TopListCard title="Top 10 items by quantity" items={topQuantity} valueKey="quantity" />
    </div>
  )
}

function TopTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 h-10 rounded-[12px] text-small font-semibold transition-colors',
        active ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

function KpiCard({
  title,
  value,
  footnote,
  valueClassName,
}: {
  title: string
  value: string
  footnote?: string
  valueClassName?: string
}) {
  return (
    <div className="rounded-[18px] bg-card border border-border p-4 shadow-sm min-h-[112px] flex flex-col justify-between">
      <div className="text-support-small font-bold tracking-[0.12em] text-muted-foreground">{title}</div>
      <div className={cn('text-[22px] leading-[28px] font-semibold tracking-tight font-mono text-foreground', valueClassName)}>
        {value}
      </div>
      {footnote ? <div className="text-support-small text-muted-foreground">{footnote}</div> : <div />}
    </div>
  )
}

function getAverage(points: HourlyIncomePoint[]) {
  if (!points.length) return 0
  const sum = points.reduce((acc, p) => acc + p.value, 0)
  return Math.round(sum / points.length)
}

function LineChart({ points }: { points: HourlyIncomePoint[] }) {
  const width = 320
  const height = 140
  const padding = 14

  const safePoints = points.length ? points : [{ time: '8am', value: 0 }]
  const max = Math.max(...safePoints.map((p) => p.value), 1)
  const min = Math.min(...safePoints.map((p) => p.value), 0)
  const range = Math.max(1, max - min)

  const stepX = safePoints.length > 1 ? (width - padding * 2) / (safePoints.length - 1) : 0
  const toX = (i: number) => padding + i * stepX
  const toY = (v: number) => padding + (height - padding * 2) * (1 - (v - min) / range)

  const path = safePoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(2)} ${toY(p.value).toFixed(2)}`)
    .join(' ')

  return (
    <div className="rounded-[12px] bg-background/40 border border-border/60 overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Hourly income chart">
        <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="px-3 pb-3 -mt-1 flex justify-between text-[11px] text-muted-foreground">
        {safePoints.slice(0, 5).map((p) => (
          <span key={p.time}>{p.time}</span>
        ))}
      </div>
    </div>
  )
}

function TopListCard({
  title,
  items,
  valueKey,
}: {
  title: string
  items: PerformanceItem[]
  valueKey: 'revenue' | 'quantity'
}) {
  const safeItems = items.length ? items : [{ name: 'Cappuccino', revenue: 420, quantity: 76 }]
  const max = Math.max(...safeItems.map((i) => i[valueKey]), 1)

  return (
    <div className="mt-4 rounded-[18px] bg-card border border-border p-5 shadow-sm">
      <div className="text-small font-semibold text-foreground">{title}</div>
      <div className="mt-4 space-y-3">
        {safeItems.slice(0, 10).map((item) => {
          const v = item[valueKey]
          const pct = Math.max(0, Math.min(100, Math.round((v / max) * 100)))
          const bucket = Math.max(0, Math.min(20, Math.round(pct / 5)))
          const widthClass = BAR_WIDTHS[bucket] ?? 'w-[100%]'
          return (
            <div key={`${title}-${item.name}`} className="grid grid-cols-[1fr_160px_auto] items-center gap-3">
              <div className="text-support-small text-foreground truncate">{item.name}</div>
              <div className="h-2 rounded-[9999px] bg-muted overflow-hidden">
                <div className={cn('h-full bg-primary rounded-[9999px]', widthClass)} />
              </div>
              <div className="text-support-small font-mono text-muted-foreground">
                {valueKey === 'revenue' ? formatMoney(v) : v}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

