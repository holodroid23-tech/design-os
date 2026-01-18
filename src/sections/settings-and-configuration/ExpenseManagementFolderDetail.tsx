/**
 * ExpenseManagementFolderDetail - Replicated design
 *
 * This component replicates the `expense-management-folder-detail.png` mockup using the Compost design system.
 */

import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import type { ManagedItem } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface ExpenseManagementFolderDetailProps {
  folderName?: string
  expenses?: Array<ManagedItem>
  onBack?: () => void
  onToggleExpense?: (expenseId: string, enabled: boolean) => void
  onAddExpense?: () => void
}

const sampleExpenses: Array<ManagedItem> = [
  { id: 'e1', name: 'Electricity bill', enabled: true },
  { id: 'e2', name: 'Water supply', enabled: true },
  { id: 'e3', name: 'Store rent', enabled: true },
  { id: 'e4', name: 'Internet services', enabled: true },
  { id: 'e5', name: 'Equipment maintenance', enabled: true },
]

export default function ExpenseManagementFolderDetail({
  folderName = 'Monthly utilities',
  expenses = sampleExpenses,
  onBack,
  onToggleExpense,
  onAddExpense,
}: ExpenseManagementFolderDetailProps) {
  return (
    <div className="min-h-full bg-layer-level-0 text-onLayer-primary flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-border-secondary">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-10 w-10 rounded-[9999px] hover:bg-layer-hover active:bg-layer-active flex items-center justify-center"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-[22px] leading-[30px] font-semibold tracking-tight">{folderName}</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-3 flex-1">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="rounded-[18px] border border-border-secondary bg-layer-level-1 px-5 py-4 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-[9999px] bg-layer-level-2 border border-border-secondary overflow-hidden shrink-0">
              {expense.imageSrc ? (
                <img
                  src={expense.imageSrc}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-onLayer-tertiary text-small">
                  {expense.name.slice(0, 1)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-regular-semibold truncate">{expense.name}</div>
            </div>

            <div className={cn('shrink-0', !expense.enabled && 'opacity-90')}>
              <Switch
                checked={expense.enabled}
                onCheckedChange={(v) => onToggleExpense?.(expense.id, v)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom action */}
      <div className="px-4 pb-8 pt-3">
        <button
          type="button"
          onClick={onAddExpense}
          className="w-full h-12 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active"
        >
          Add expense
        </button>
      </div>
    </div>
  )
}

