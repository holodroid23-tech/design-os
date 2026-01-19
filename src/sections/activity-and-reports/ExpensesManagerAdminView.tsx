/**
 * ExpensesManagerAdminView - Replicated design
 *
 * Replicates the "expenses-manager-admin-view" mock using the Compost design system.
 */

import { useMemo } from 'react'
import { ChevronDown, ChevronUp, Pencil, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatMoney, getDefaultActivityReportsData, type ActivityReportsData, type ExpenseDayGroup, type ExpenseItem } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface ExpensesManagerAdminViewProps {
  data?: Pick<ActivityReportsData, 'expenses'>
  activeTab?: 'analytics' | 'orders' | 'expenses'
  dateRangeLabel?: string
  foundCount?: number
  onTabChange?: (tab: 'analytics' | 'orders' | 'expenses') => void
  onDateRangeChange?: () => void
  onExport?: () => void
  onAddExpense?: () => void
  onEditExpense?: (expenseId: string) => void
}

export default function ExpensesManagerAdminView({
  data,
  activeTab = 'expenses',
  dateRangeLabel = 'This week',
  foundCount = 42,
  onTabChange,
  onDateRangeChange,
  onExport,
  onAddExpense,
  onEditExpense,
}: ExpensesManagerAdminViewProps) {
  const defaults = useMemo(() => getDefaultActivityReportsData(), [])
  const groups = data?.expenses ?? defaults.expenses ?? []

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
          <span className="text-small font-semibold">{dateRangeLabel}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </Button>

        <Button type="button" variant="secondary" onClick={onExport} className="h-11 px-4 rounded-[12px]">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Export
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="text-support-small font-semibold text-muted-foreground">{foundCount} expenses found</div>
        <button type="button" onClick={onAddExpense} className="text-small font-semibold text-primary hover:underline">
          + Add expense
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {groups.map((group) => (
          <DayGroupCard key={group.id} group={group} onEditExpense={onEditExpense} />
        ))}
      </div>
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

function DayGroupCard({ group, onEditExpense }: { group: ExpenseDayGroup; onEditExpense?: (expenseId: string) => void }) {
  const expanded = Boolean(group.isExpanded)

  return (
    <div className="rounded-[18px] bg-card border border-border shadow-sm overflow-hidden">
      <button type="button" className="w-full px-4 py-4 flex items-center justify-between gap-4 text-left">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-regular-semibold text-foreground">{group.label}</div>
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            )}
          </div>
          <div className="text-support-small text-muted-foreground">{group.count} expenses</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-regular-semibold font-mono text-foreground">{formatMoney(group.total)}</div>
          {typeof group.editsCount === 'number' && group.editsCount > 0 && (
            <div className="h-6 px-2 rounded-[9999px] bg-destructive/20 text-destructive text-support-small font-semibold flex items-center">
              {group.editsCount} edits
            </div>
          )}
        </div>
      </button>

      {expanded && group.items?.length ? (
        <div className="px-4 pb-4 space-y-3">
          {group.items.map((item) => (
            <ExpenseRow key={item.id} item={item} onEdit={() => onEditExpense?.(item.id)} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ExpenseRow({ item, onEdit }: { item: ExpenseItem; onEdit?: () => void }) {
  return (
    <div className="rounded-[12px] bg-background/35 border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex items-center gap-2">
          <div className="h-5 w-1 rounded-[9999px] bg-destructive/80" aria-hidden="true" />
          <div className="min-w-0">
            <div className={cn('text-small font-semibold text-foreground', item.isDeleted && 'line-through opacity-70')}>
              {item.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={cn('text-small font-mono font-semibold text-foreground', item.isDeleted && 'line-through opacity-70')}>
            {formatMoney(item.amount)}
          </div>
          <Button type="button" variant="secondary" size="icon" onClick={onEdit} className="h-9 w-9 rounded-[12px]" aria-label="Edit">
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-support-small text-muted-foreground">
        <div>
          Created by: <span className="text-foreground/90">{item.createdBy}</span>
        </div>
        <div>
          Time: <span className="text-foreground/90">{item.timeLabel}</span>
        </div>
        {item.note ? (
          <div>
            Note: <span className="text-foreground/90">{item.note}</span>
          </div>
        ) : null}
      </div>

      {item.auditEvents?.length ? (
        <div className="mt-3 space-y-2">
          {item.auditEvents.map((e) => (
            <div key={e.id} className="flex items-start gap-2 text-support-small text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 rounded-[9999px] bg-destructive" aria-hidden="true" />
              <span>{e.description}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

