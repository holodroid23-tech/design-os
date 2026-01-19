/**
 * AnalyticsCashierView - Replicated design
 *
 * Replicates the "analytics-cashier-view" mock using the Compost design system.
 */

import { useMemo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatMoney, getDefaultActivityReportsData, type ActivityReportsData, type SummaryWidget } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface AnalyticsCashierViewProps {
  data?: Pick<ActivityReportsData, 'summary' | 'cashBreakdown'>
  activeTab?: 'analytics' | 'orders'
  onTabChange?: (tab: 'analytics' | 'orders') => void
}

function findWidget(summary: SummaryWidget[], label: string) {
  return summary.find((w) => w.label.toLowerCase() === label.toLowerCase())
}

export default function AnalyticsCashierView({
  data,
  activeTab = 'analytics',
  onTabChange,
}: AnalyticsCashierViewProps) {
  const defaults = useMemo(() => getDefaultActivityReportsData(), [])
  const summary = data?.summary ?? defaults.summary
  const breakdown = data?.cashBreakdown ?? defaults.cashBreakdown ?? { cash: 0, card: 0 }

  const totalIncome = findWidget(summary, 'Total income')
  const netProfit = findWidget(summary, 'Net profit')
  const expenses = findWidget(summary, 'Expenses')
  const refunds = findWidget(summary, 'Refunds')
  const refundsCount = findWidget(summary, 'Refunds count')
  const inDrawer = findWidget(summary, 'In drawer')
  const totalOrders = findWidget(summary, 'Total orders')

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[860px] bg-background text-foreground px-4 pt-4 pb-10">
      {/* Top tabs */}
      <div className="flex items-center gap-2 bg-card border border-border rounded-[18px] p-1">
        <button
          type="button"
          onClick={() => onTabChange?.('analytics')}
          className={cn(
            'flex-1 h-10 rounded-[12px] text-small font-semibold transition-colors',
            activeTab === 'analytics' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Analytics
        </button>
        <button
          type="button"
          onClick={() => onTabChange?.('orders')}
          className={cn(
            'flex-1 h-10 rounded-[12px] text-small font-semibold transition-colors',
            activeTab === 'orders' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Orders
        </button>
      </div>

      <div className="mt-8">
        <div className="text-support-small font-bold tracking-[0.18em] text-muted-foreground">Today analytics</div>
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

      {/* Bottom safe area spacing for mobile preview */}
      <div className="mt-10 flex justify-center">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View more
        </Button>
      </div>
    </div>
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

