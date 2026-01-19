/**
 * EditExpenseAdminManagerView - Replicated design
 *
 * Replicates the "edit-expense-admin-manager-view" mock using the Compost design system.
 * Modal content only (no backdrop).
 */

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatMoney } from './types'

export const designOS = { presentation: 'modal' as const }

export interface EditExpenseAdminManagerViewProps {
  initialName?: string
  initialAmount?: string
  initialTax?: '0%' | '10%' | '21%'
  onClose?: () => void
  onSave?: (payload: { name: string; amount: string; tax: '0%' | '10%' | '21%'; note: string }) => void
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'] as const

export default function EditExpenseAdminManagerView({
  initialName = 'Whole milk',
  initialAmount = '4.50',
  initialTax = '21%',
  onClose,
  onSave,
}: EditExpenseAdminManagerViewProps) {
  const [name, setName] = useState(initialName)
  const [amount, setAmount] = useState(initialAmount)
  const [tax, setTax] = useState<'0%' | '10%' | '21%'>(initialTax)
  const [note, setNote] = useState('')

  const formatted = useMemo(() => {
    const cleaned = amount.trim() === '' ? '0.00' : amount
    const numeric = Number(cleaned.replace(/[^0-9.]/g, ''))
    return Number.isFinite(numeric) ? formatMoney(numeric) : '$0.00'
  }, [amount])

  const handleKey = (key: (typeof KEYS)[number]) => {
    if (key === '⌫') {
      setAmount((prev) => {
        const next = prev.length <= 1 ? '0' : prev.slice(0, -1)
        return next === '' ? '0' : next
      })
      return
    }
    setAmount((prev) => {
      const base = prev === '0' && key !== '.' ? '' : prev
      if (key === '.' && base.includes('.')) return base
      const next = `${base}${key}`
      return next.length > 10 ? base : next
    })
  }

  const handleSave = () => onSave?.({ name, amount, tax, note })

  return (
    <div className="w-full max-w-[420px] mx-auto px-4 py-10">
      <div className="rounded-[18px] bg-card border border-border shadow-lg overflow-hidden">
        {/* Drag handle */}
        <div className="pt-3 flex justify-center">
          <div className="h-1.5 w-12 rounded-[9999px] bg-muted" />
        </div>

        <div className="px-5 pt-4 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="text-[22px] leading-[30px] font-semibold tracking-tight">Edit expense</div>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-[9999px]"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-6 space-y-5">
            <Field label="Name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-[12px] bg-background/40 border-border text-foreground placeholder:text-muted-foreground"
              />
            </Field>

            <Field label="Price">
              <div className="h-14 rounded-[12px] bg-background/40 border border-border flex items-center px-4">
                <span className="text-[28px] leading-none font-bold font-mono text-primary">$</span>
                <span className="ml-2 text-[28px] leading-none font-bold font-mono text-foreground">
                  {formatted.replace('$', '')}
                </span>
              </div>
            </Field>

            <div className="grid grid-cols-3 gap-2">
              {KEYS.map((k) => (
                <Button
                  key={k}
                  type="button"
                  variant="secondary"
                  onClick={() => handleKey(k)}
                  className="h-[56px] rounded-[12px] text-[18px] font-semibold"
                >
                  {k}
                </Button>
              ))}
            </div>

            <Field label="Tax">
              <div className="grid grid-cols-3 gap-2">
                <TaxButton value="0%" label="Exempt" selected={tax === '0%'} onSelect={() => setTax('0%')} />
                <TaxButton value="10%" label="Reduced" selected={tax === '10%'} onSelect={() => setTax('10%')} />
                <TaxButton value="21%" label="Standard" selected={tax === '21%'} onSelect={() => setTax('21%')} />
              </div>
            </Field>

            <Field label="Note">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Additional details…"
                className="w-full min-h-[84px] rounded-[12px] bg-background/40 border border-border p-3 text-small text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>

            <Button type="button" onClick={handleSave} className="w-full h-14 rounded-[12px] text-regular-semibold">
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-support-small font-bold tracking-[0.12em] text-muted-foreground">{label}</div>
      {children}
    </div>
  )
}

function TaxButton({
  value,
  label,
  selected,
  onSelect,
}: {
  value: string
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'h-14 rounded-[12px] border bg-background/40 flex flex-col items-center justify-center leading-tight transition-colors',
        selected ? 'border-primary ring-1 ring-ring' : 'border-border hover:border-border/60'
      )}
    >
      <div className="text-small font-semibold text-foreground">{value}</div>
      <div className={cn('text-support-small', selected ? 'text-muted-foreground' : 'text-muted-foreground/80')}>{label}</div>
    </button>
  )
}

