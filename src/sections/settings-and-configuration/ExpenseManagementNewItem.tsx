/**
 * ExpenseManagementNewItem - Replicated design
 *
 * This component replicates the `expense-management-new-item.png` mockup using the Compost design system.
 */

import { ChevronDown, Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import type { StrokeStyle } from './types'

export const designOS = { presentation: 'modal' as const }

export type AppearanceMode = 'color' | 'image'

export interface ExpenseManagementNewItemProps {
  name?: string
  category?: string
  categories?: string[]
  isFavorite?: boolean
  appearanceMode?: AppearanceMode
  selectedSwatchId?: string
  swatches?: Array<{ id: string; className: string }>
  strokeStyle?: StrokeStyle
  onClose?: () => void
  onChangeName?: (name: string) => void
  onToggleFavorite?: (favorite: boolean) => void
  onSelectCategory?: (category: string) => void
  onSelectAppearanceMode?: (mode: AppearanceMode) => void
  onSelectSwatch?: (swatchId: string) => void
  onSelectStrokeStyle?: (style: StrokeStyle) => void
  onSave?: () => void
}

const fallbackSwatches: Array<{ id: string; className: string }> = [
  { id: 'info-strong', className: 'bg-border-info' },
  { id: 'success-strong', className: 'bg-onLayer-success' },
  { id: 'danger-strong', className: 'bg-onLayer-danger' },
  { id: 'warning-strong', className: 'bg-onLayer-warning' },
  { id: 'recent-strong', className: 'bg-onLayer-recent' },
  { id: 'highlight', className: 'bg-layer-highlight' },
  { id: 'info-soft', className: 'bg-layer-info' },
  { id: 'success-soft', className: 'bg-layer-success' },
  { id: 'danger-soft', className: 'bg-layer-danger' },
  { id: 'warning-soft', className: 'bg-layer-warning' },
  { id: 'recent-soft', className: 'bg-layer-recent' },
  { id: 'neutral', className: 'bg-layer-level-3' },
]

const strokeStyles: StrokeStyle[] = ['None', 'Common', 'Dashed', 'Gradient', 'Holo', 'Glow']

export default function ExpenseManagementNewItem({
  name = '',
  category = 'Operations',
  categories = ['Operations', 'Supplies', 'Utilities'],
  isFavorite = false,
  appearanceMode = 'color',
  selectedSwatchId = 'info-strong',
  swatches,
  strokeStyle = 'Common',
  onClose,
  onChangeName,
  onToggleFavorite,
  onSelectCategory,
  onSelectAppearanceMode,
  onSelectSwatch,
  onSelectStrokeStyle,
  onSave,
}: ExpenseManagementNewItemProps) {
  const palette = swatches?.length ? swatches : fallbackSwatches

  return (
    <div className="w-full rounded-[18px] border border-border-secondary bg-layer-level-0 text-onLayer-primary overflow-hidden">
      {/* Handle + header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-center pb-3">
          <div className="h-1 w-14 rounded-[9999px] bg-border-secondary" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[22px] leading-[30px] font-semibold tracking-tight">New expense</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-[9999px] hover:bg-layer-hover active:bg-layer-active flex items-center justify-center shrink-0"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-onLayer-tertiary" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-5 space-y-6">
        {/* Name + favorite */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">Name</div>
          <div className="flex items-center gap-3">
            <Input
              value={name}
              placeholder="e.g. Rent payment"
              onChange={(e) => onChangeName?.(e.target.value)}
              className="h-12 rounded-[12px] bg-layer-level-1 border-border-secondary text-onLayer-primary placeholder:text-onLayer-tertiary flex-1"
            />
            <button
              type="button"
              onClick={() => onToggleFavorite?.(!isFavorite)}
              className={cn(
                'h-12 w-12 rounded-[12px] border border-border-secondary bg-layer-level-1 flex items-center justify-center',
                isFavorite && 'border-border-warning bg-layer-warning',
              )}
              aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              <Star className={cn('h-5 w-5', isFavorite ? 'text-onLayer-warning' : 'text-onLayer-tertiary')} />
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">Category</div>
          <button
            type="button"
            onClick={() => onSelectCategory?.(category)}
            className="h-12 w-full rounded-[12px] bg-layer-level-1 border border-border-secondary px-4 flex items-center justify-between"
          >
            <span className="text-regular">{category}</span>
            <ChevronDown className="h-5 w-5 text-onLayer-tertiary" />
          </button>
          {categories.length === 0 && (
            <div className="text-small text-onLayer-secondary">No categories configured.</div>
          )}
        </div>

        {/* Appearance */}
        <div className="space-y-4">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">Appearance</div>
          <div className="rounded-[12px] border border-border-secondary bg-layer-level-1 p-1 flex">
            {(['color', 'image'] as const).map((mode) => {
              const selected = appearanceMode === mode
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onSelectAppearanceMode?.(mode)}
                  className={cn(
                    'flex-1 h-10 rounded-[12px] text-small font-semibold',
                    selected ? 'bg-layer-level-2 text-onLayer-primary' : 'text-onLayer-secondary',
                  )}
                >
                  {mode === 'color' ? 'Color' : 'Image'}
                </button>
              )
            })}
          </div>

          {/* Color grid */}
          {appearanceMode === 'color' && (
            <div className="grid grid-cols-6 gap-3">
              {palette.map((swatch) => {
                const selected = selectedSwatchId === swatch.id
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => onSelectSwatch?.(swatch.id)}
                    className={cn(
                      'h-11 w-11 rounded-[9999px] border border-border-secondary',
                      swatch.className,
                      selected && 'ring-2 ring-onLayer-primary ring-offset-2 ring-offset-layer-level-0',
                    )}
                    aria-label="Select color"
                  />
                )
              })}
            </div>
          )}
        </div>

        {/* Stroke style */}
        <div className="space-y-4">
          <div className="text-support-small font-semibold tracking-widest text-onLayer-tertiary">
            Stroke style
          </div>
          <div className="grid grid-cols-3 gap-3">
            {strokeStyles.map((style) => {
              const selected = strokeStyle === style
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => onSelectStrokeStyle?.(style)}
                  className={cn(
                    'rounded-[12px] border px-3 py-3 bg-layer-level-1 text-left',
                    selected ? 'border-border-info' : 'border-border-secondary',
                  )}
                >
                  <div className="flex items-center justify-center pb-2">
                    <div
                      className={cn(
                        'h-10 w-10 rounded-[12px] border border-border-secondary bg-layer-level-0',
                        selected && 'border-border-info',
                      )}
                    />
                  </div>
                  <div className={cn('text-small font-semibold text-center', selected ? 'text-onLayer-primary' : 'text-onLayer-secondary')}>
                    {style}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={onSave}
          className="w-full h-12 rounded-[12px] bg-border-info text-onLayer-inverse text-regular-semibold hover:opacity-95 active:opacity-90"
        >
          Save expense
        </button>
      </div>
    </div>
  )
}

