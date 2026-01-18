/**
 * PrinterSettings - Replicated design
 *
 * This component replicates the `printer-settings.png` mockup using the Compost design system.
 */

import { ChevronLeft, Printer as PrinterIcon, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Printer } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface PrinterSettingsProps {
  connectedPrinter?: Printer
  paperSize?: Printer['paperSize']
  discoveredPrinters?: Array<Pick<Printer, 'id' | 'name'>>
  onBack?: () => void
  onTestPrint?: () => void
  onDisconnect?: () => void
  onSelectPaperSize?: (size: Printer['paperSize']) => void
  onSearch?: () => void
  onPair?: (printerId: string) => void
}

const sampleDiscoveredPrinters: Array<Pick<Printer, 'id' | 'name'>> = [
  { id: 'p1', name: 'mPOP Printer' },
  { id: 'p2', name: 'TM-T88VI Printer' },
]

export default function PrinterSettings({
  connectedPrinter,
  paperSize = '58mm',
  discoveredPrinters = sampleDiscoveredPrinters,
  onBack,
  onTestPrint,
  onDisconnect,
  onSelectPaperSize,
  onSearch,
  onPair,
}: PrinterSettingsProps) {
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
          <h1 className="text-[22px] leading-[30px] font-semibold tracking-tight">Printer</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Printer status */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Printer status
          </div>

          <div className="rounded-[18px] border border-border-secondary bg-layer-level-1 px-5 py-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-[9999px] bg-layer-level-2 border border-border-secondary flex items-center justify-center shrink-0">
                <PrinterIcon className="h-6 w-6 text-onLayer-success" />
              </div>

              <div className="min-w-0">
                <div className="text-regular-semibold truncate">
                  {connectedPrinter?.name ?? 'No printer connected'}
                </div>
                <div className="text-support-small font-semibold text-onLayer-success">
                  {connectedPrinter?.status === 'CONNECTED' ? 'Connected' : connectedPrinter ? 'Disconnected' : ''}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                type="button"
                onClick={onTestPrint}
                className="h-12 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active"
              >
                Test print
              </button>
              <button
                type="button"
                onClick={onDisconnect}
                className="h-12 rounded-[12px] border border-border-danger-emphasis bg-layer-level-0 text-regular-semibold text-onLayer-danger hover:bg-layer-hover active:bg-layer-active"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>

        {/* Paper size */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Paper size
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(['58mm', '80mm'] as const).map((size) => {
              const selected = paperSize === size
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSelectPaperSize?.(size)}
                  className={cn(
                    'h-12 rounded-[18px] border bg-layer-level-1 text-regular-semibold',
                    selected
                      ? 'border-border-info text-border-info'
                      : 'border-border-secondary text-onLayer-secondary',
                  )}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        {/* Hardware discovery */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Hardware discovery
          </div>

          <div className="rounded-[18px] border border-border-secondary bg-layer-level-1 overflow-hidden">
            <div className="p-4">
              <button
                type="button"
                onClick={onSearch}
                className="w-full h-12 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4 text-onLayer-tertiary" />
                Search for printers
              </button>
            </div>

            <div className="border-t border-border-secondary">
              {discoveredPrinters.map((p, idx) => {
                const isLast = idx === discoveredPrinters.length - 1
                return (
                  <div
                    key={p.id}
                    className={cn(
                      'px-5 py-4 flex items-center justify-between gap-4',
                      !isLast && 'border-b border-border-secondary',
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <PrinterIcon className="h-5 w-5 text-onLayer-tertiary shrink-0" />
                      <span className="text-regular-semibold truncate">{p.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onPair?.(p.id)}
                      className="h-10 px-4 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active shrink-0"
                    >
                      Pair
                    </button>
                  </div>
                )
              })}

              {discoveredPrinters.length === 0 && (
                <div className="px-5 py-6 text-small text-onLayer-secondary">
                  No printers found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

