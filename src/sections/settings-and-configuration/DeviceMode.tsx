/**
 * DeviceMode - Replicated design
 *
 * This component replicates the `device-mode.png` mockup using the Compost design system.
 */

import { BarChart3, ChevronLeft, ShoppingCart, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const designOS = { presentation: 'mobile' as const }

export type DeviceModeValue = 'POS' | 'BACK_OFFICE'

export interface DeviceModeProps {
  selectedMode?: DeviceModeValue
  onBack?: () => void
  onClose?: () => void
  onSelectMode?: (mode: DeviceModeValue) => void
}

export default function DeviceMode({
  selectedMode = 'POS',
  onBack,
  onClose,
  onSelectMode,
}: DeviceModeProps) {
  return (
    <div className="min-h-full bg-layer-level-0 text-onLayer-primary">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-border-secondary">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-10 w-10 rounded-[9999px] hover:bg-layer-hover active:bg-layer-active flex items-center justify-center"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h1 className="text-[22px] leading-[30px] font-semibold tracking-tight">
            Select device mode
          </h1>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-[9999px] hover:bg-layer-hover active:bg-layer-active flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Register (POS) */}
        <button
          type="button"
          onClick={() => onSelectMode?.('POS')}
          className={cn(
            'w-full rounded-[18px] border bg-layer-level-1 px-5 py-4 flex items-start gap-4 text-left',
            selectedMode === 'POS' ? 'border-border-info' : 'border-border-secondary',
          )}
        >
          <div
            className={cn(
              'h-12 w-12 rounded-[12px] border border-border-secondary flex items-center justify-center shrink-0',
              selectedMode === 'POS' ? 'bg-layer-info' : 'bg-layer-level-2',
            )}
          >
            <ShoppingCart className={cn('h-6 w-6', selectedMode === 'POS' ? 'text-border-info' : 'text-onLayer-tertiary')} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="text-regular-semibold">Register (POS)</div>
              {selectedMode === 'POS' && (
                <span className="ml-auto rounded-[9999px] bg-border-info px-2 py-0.5 text-[10px] font-semibold text-onLayer-inverse">
                  Selected
                </span>
              )}
            </div>
            <div className="text-small text-onLayer-secondary">
              Process orders and payments on the go.
            </div>
          </div>
        </button>

        {/* Back Office */}
        <div
          className={cn(
            'w-full rounded-[18px] border bg-layer-level-1 px-5 py-4 flex items-start gap-4',
            selectedMode === 'BACK_OFFICE' ? 'border-border-info' : 'border-border-secondary',
          )}
        >
          <div className="h-12 w-12 rounded-[12px] border border-border-secondary bg-layer-level-2 flex items-center justify-center shrink-0">
            <BarChart3 className="h-6 w-6 text-onLayer-tertiary" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-regular-semibold">Back office</div>
            <div className="text-small text-onLayer-secondary">
              Advanced analytics and inventory management.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectMode?.('BACK_OFFICE')}
            className="h-11 px-5 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active"
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  )
}

