/**
 * GeneralSettings - Replicated design
 *
 * This component replicates the `general-settings.png` mockup using the Compost design system.
 */

import { ChevronDown, ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import type { StoreInfo, TaxRule } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface GeneralSettingsProps {
  storeInfo?: Pick<StoreInfo, 'name' | 'address' | 'email' | 'website' | 'currency' | 'timeFormat' | 'pinLockTimer'>
  displayAlwaysOn?: boolean
  useTaxes?: boolean
  taxes?: TaxRule[]
  onBack?: () => void
  onUpdateStoreInfo?: (updates: Partial<StoreInfo>) => void
  onToggleDisplayAlwaysOn?: (enabled: boolean) => void
  onToggleUseTaxes?: (enabled: boolean) => void
  onSelectTimeFormat?: (format: StoreInfo['timeFormat']) => void
  onSelectPinLockTimer?: (timer: StoreInfo['pinLockTimer']) => void
  onAddTax?: () => void
  onSetDefaultTax?: (taxId: string) => void
  onDeleteTax?: (taxId: string) => void
  onDeleteAccount?: () => void
  canDeleteAccount?: boolean
}

function percentLabel(rate: number) {
  return `${Math.round(rate * 100)}%`
}

function currencyLabel(currency: string) {
  if (currency === 'USD') return 'USD ($)'
  if (currency === 'EUR') return 'EUR (€)'
  return currency
}

const sampleStoreInfo: Pick<
  StoreInfo,
  'name' | 'address' | 'email' | 'website' | 'currency' | 'timeFormat' | 'pinLockTimer'
> = {
  name: 'The Brew Corner',
  address: '42 Artisan Way',
  email: 'contact@brewcorner.com',
  website: 'www.thebrewcorner.com',
  currency: 'USD',
  timeFormat: '12h',
  pinLockTimer: '2m',
}

const sampleTaxes: TaxRule[] = [
  { id: 't1', label: 'VAT Standard', rate: 0.21, isDefault: true },
  { id: 't2', label: 'Service charge', rate: 0.1 },
]

export default function GeneralSettings({
  storeInfo = sampleStoreInfo,
  displayAlwaysOn = true,
  useTaxes = true,
  taxes = sampleTaxes,
  onBack,
  onUpdateStoreInfo,
  onToggleDisplayAlwaysOn,
  onToggleUseTaxes,
  onSelectTimeFormat,
  onSelectPinLockTimer,
  onAddTax,
  onSetDefaultTax,
  onDeleteTax,
  onDeleteAccount,
  canDeleteAccount = true,
}: GeneralSettingsProps) {
  const pinOptions: StoreInfo['pinLockTimer'][] = ['1m', '2m', '3m', '5m', '10m', 'Never']

  return (
    <div className="min-h-full bg-layer-level-0 text-onLayer-primary">
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
          <h1 className="text-[22px] leading-[30px] font-semibold tracking-tight">General</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-5">
        {/* Store identity */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Store name
          </div>
          <Input
            value={storeInfo.name}
            onChange={(e) => onUpdateStoreInfo?.({ name: e.target.value })}
            className="h-12 rounded-[12px] bg-layer-level-1 border-border-secondary text-onLayer-primary placeholder:text-onLayer-tertiary"
          />
        </div>

        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Store street
          </div>
          <Input
            value={storeInfo.address}
            onChange={(e) => onUpdateStoreInfo?.({ address: e.target.value })}
            className="h-12 rounded-[12px] bg-layer-level-1 border-border-secondary text-onLayer-primary placeholder:text-onLayer-tertiary"
          />
        </div>

        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Email
          </div>
          <Input
            value={storeInfo.email}
            onChange={(e) => onUpdateStoreInfo?.({ email: e.target.value })}
            className="h-12 rounded-[12px] bg-layer-level-1 border-border-secondary text-onLayer-primary placeholder:text-onLayer-tertiary"
          />
        </div>

        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Website
          </div>
          <Input
            value={storeInfo.website}
            onChange={(e) => onUpdateStoreInfo?.({ website: e.target.value })}
            className="h-12 rounded-[12px] bg-layer-level-1 border-border-secondary text-onLayer-primary placeholder:text-onLayer-tertiary"
          />
        </div>

        {/* Currency */}
        <div className="space-y-3 pt-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Currency
          </div>
          <button
            type="button"
            className="h-12 w-full rounded-[12px] bg-layer-level-1 border border-border-secondary px-4 flex items-center justify-between"
          >
            <span className="text-regular">{currencyLabel(storeInfo.currency)}</span>
            <ChevronDown className="h-5 w-5 text-onLayer-tertiary" />
          </button>
        </div>

        {/* Display always on */}
        <div className="rounded-[18px] bg-layer-level-1 border border-border-secondary px-5 py-4 flex items-center justify-between">
          <span className="text-regular-semibold">Display always on</span>
          <Switch checked={displayAlwaysOn} onCheckedChange={(v) => onToggleDisplayAlwaysOn?.(v)} />
        </div>

        {/* Time format */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Time format
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(['12h', '24h'] as const).map((v) => {
              const selected = storeInfo.timeFormat === v
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => onSelectTimeFormat?.(v)}
                  className={cn(
                    'h-12 rounded-[12px] border px-4 text-regular-semibold',
                    selected
                      ? 'border-border-info bg-layer-level-1 text-onLayer-primary'
                      : 'border-border-secondary bg-layer-level-1 text-onLayer-secondary',
                  )}
                >
                  {v === '12h' ? 'AM/PM' : '24h'}
                </button>
              )
            })}
          </div>
        </div>

        {/* Taxes */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
              Use taxes
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={useTaxes} onCheckedChange={(v) => onToggleUseTaxes?.(v)} />
              <button
                type="button"
                onClick={onAddTax}
                className="h-8 w-8 rounded-[9999px] bg-border-info text-onLayer-inverse flex items-center justify-center"
                aria-label="Add tax"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {taxes.map((tax) => {
              const selected = !!tax.isDefault
              return (
                <div
                  key={tax.id}
                  onClick={() => onSetDefaultTax?.(tax.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSetDefaultTax?.(tax.id)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    'w-full rounded-[12px] bg-layer-level-1 border px-4 py-3 flex items-center justify-between gap-3 text-left',
                    selected ? 'border-border-info' : 'border-border-secondary',
                  )}
                >
                  <div className="min-w-0">
                    <div className="text-regular-semibold truncate">
                      {tax.label} {percentLabel(tax.rate)}
                      {selected ? ' (defaultly use)' : ''}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteTax?.(tax.id)
                    }}
                    className="h-9 w-9 rounded-[12px] hover:bg-layer-hover active:bg-layer-active flex items-center justify-center text-onLayer-tertiary shrink-0"
                    aria-label="Delete tax"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pin lock timer */}
        <div className="space-y-3 pt-2">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Pin lock timer
          </div>
          <div className="flex flex-wrap gap-2">
            {pinOptions.map((opt) => {
              const selected = storeInfo.pinLockTimer === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onSelectPinLockTimer?.(opt)}
                  className={cn(
                    'h-10 px-4 rounded-[9999px] bg-layer-level-1 border text-small',
                    selected
                      ? 'border-border-info text-onLayer-primary'
                      : 'border-border-secondary text-onLayer-secondary',
                  )}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Delete account */}
        {canDeleteAccount && (
          <div className="pt-6">
            <button
              type="button"
              onClick={onDeleteAccount}
              className="flex items-center gap-3 text-onLayer-danger hover:bg-layer-hover active:bg-layer-active px-2 py-3 rounded-[12px]"
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-regular-semibold">Delete account</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

