/**
 * ItemManagement - Replicated design
 *
 * This component replicates the `item-management.png` mockup using the Compost design system.
 */

import { ChevronLeft, Folder } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import type { ManagedItem, ManagementFolder } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface ItemManagementProps {
  title?: string
  currency?: string
  folders?: ManagementFolder[]
  items?: ManagedItem[]
  onBack?: () => void
  onToggleFolder?: (folderId: string, enabled: boolean) => void
  onToggleItem?: (itemId: string, enabled: boolean) => void
  onAddFolder?: () => void
  onAddItem?: () => void
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

const sampleFolders: ManagementFolder[] = [
  { id: 'f1', name: 'Monthly utilities', itemCount: 12, enabled: true },
  { id: 'f2', name: 'Suppliers', itemCount: 8, enabled: true },
]

const sampleItems: ManagedItem[] = [
  { id: 'i1', name: 'Electricity bill', amount: 120, enabled: true },
  { id: 'i2', name: 'Water supply', amount: 45, enabled: true },
  { id: 'i3', name: 'Store rent', amount: 2400, enabled: true },
  { id: 'i4', name: 'Internet services', amount: 89, enabled: true },
  { id: 'i5', name: 'Equipment maintenance', amount: 150, enabled: true },
]

export default function ItemManagement({
  title = 'Item management',
  currency = 'USD',
  folders = sampleFolders,
  items = sampleItems,
  onBack,
  onToggleFolder,
  onToggleItem,
  onAddFolder,
  onAddItem,
}: ItemManagementProps) {
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
          <h1 className="text-[22px] leading-[30px] font-semibold tracking-tight">{title}</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-3 flex-1">
        {/* Folders */}
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="rounded-[18px] border border-border-secondary bg-layer-level-1 px-5 py-4 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-[9999px] bg-layer-level-2 border border-border-secondary flex items-center justify-center shrink-0">
              <Folder className="h-6 w-6 text-border-info" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-regular-semibold truncate">{folder.name}</div>
              <div className="text-small text-onLayer-secondary">{folder.itemCount} items</div>
            </div>

            <div className={cn('shrink-0', !folder.enabled && 'opacity-90')}>
              <Switch
                checked={folder.enabled}
                onCheckedChange={(v) => onToggleFolder?.(folder.id, v)}
              />
            </div>
          </div>
        ))}

        {/* Items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[18px] border border-border-secondary bg-layer-level-1 px-5 py-4 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-[9999px] bg-layer-level-2 border border-border-secondary overflow-hidden shrink-0">
              {item.imageSrc ? (
                <img src={item.imageSrc} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-onLayer-tertiary text-small">
                  {item.name.slice(0, 1)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-regular-semibold truncate">{item.name}</div>
              {typeof item.amount === 'number' && (
                <div className="text-small text-onLayer-secondary">
                  {formatMoney(item.amount, currency)}
                </div>
              )}
            </div>

            <div className={cn('shrink-0', !item.enabled && 'opacity-90')}>
              <Switch checked={item.enabled} onCheckedChange={(v) => onToggleItem?.(item.id, v)} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="px-4 pb-8 pt-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onAddFolder}
            className="h-12 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active"
          >
            Add folder
          </button>
          <button
            type="button"
            onClick={onAddItem}
            className="h-12 rounded-[12px] border border-border-secondary bg-layer-level-0 text-regular-semibold hover:bg-layer-hover active:bg-layer-active"
          >
            Add item
          </button>
        </div>
      </div>
    </div>
  )
}

