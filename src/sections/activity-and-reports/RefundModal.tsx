/**
 * RefundModal - Replicated design
 *
 * Replicates the "refund-modal" mock using the Compost design system.
 * Modal content only (no backdrop).
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const designOS = { presentation: 'modal' as const }

export interface RefundModalProps {
  initialReason?: string
  initialMethod?: 'cash' | 'card'
  onCancel?: () => void
  onConfirm?: (payload: { reason: string; method: 'cash' | 'card' }) => void
}

export default function RefundModal({
  initialReason = '',
  initialMethod = 'cash',
  onCancel,
  onConfirm,
}: RefundModalProps) {
  const [reason, setReason] = useState(initialReason)
  const [method, setMethod] = useState<'cash' | 'card'>(initialMethod)

  return (
    <div className="w-full max-w-[420px] mx-auto px-4 py-16">
      <div className="rounded-[18px] bg-card border border-border shadow-lg p-6">
        <div className="text-[20px] leading-[28px] font-semibold tracking-tight text-foreground">Refund order</div>

        <div className="mt-5 space-y-2">
          <div className="text-support-small font-bold tracking-[0.12em] text-muted-foreground">Reason for refund</div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Customer changed mind, incorrect item prepared, or quality issue…"
            className="w-full min-h-[96px] rounded-[12px] bg-background/40 border border-border p-3 text-small text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-support-small font-bold tracking-[0.12em] text-muted-foreground">Refund method</div>
          <div className="flex items-center gap-2 bg-background/40 border border-border rounded-[12px] p-1">
            <MethodButton label="Cash" selected={method === 'cash'} onClick={() => setMethod('cash')} />
            <MethodButton label="Card" selected={method === 'card'} onClick={() => setMethod('card')} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary" className="h-12 rounded-[12px]" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            className="h-12 rounded-[12px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onConfirm?.({ reason, method })}
          >
            Confirm refund
          </Button>
        </div>
      </div>
    </div>
  )
}

function MethodButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 h-11 rounded-[12px] text-small font-semibold transition-colors',
        selected ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

