"use client"

import * as React from "react"
import { Wallet } from "lucide-react"

import { IconTile } from "@/components/atoms/icon"
import { ImageTile } from "@/components/ui/image-tile"
import { cn } from "@/lib/utils"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"

export interface ExpenseLineItemRowProps extends Omit<React.ComponentProps<typeof SettingsItem>, "children"> {
  name: string
  price: string

  imageSrc?: string
  imageAlt?: string
  color?: string
  strokeStyle?: string
  onEdit?: () => void
}

/**
 * Expense line item row (Design System)
 *
 * Atomic list-row variant for expenses:
 * - Leading thumbnail (ImageTile placeholder if missing)
 * - Title
 * - Trailing edit (pencil) + value
 *
 * Intended to be wrapped in `SettingsGroup` for the canonical “atomic items” container.
 */
export function ExpenseLineItemRow({
  className,
  name,
  price,
  imageSrc,
  imageAlt,
  color,
  strokeStyle,
  onEdit,
  ...props
}: ExpenseLineItemRowProps) {
  // Helper to map stroke style to tailwind classes
  const getStrokeClass = (style?: string) => {
    switch (style) {
      case 'none': return 'border-none'
      case 'dashed': return 'border-dashed'
      case 'dotted': return 'border-dotted'
      case 'double': return 'border-double border-4'
      case 'solid': return 'border-solid'
      default: return 'border-solid' // common
    }
  }

  // Helper to map color to tailwind border color classes
  const getColorClass = (col?: string) => {
    switch (col) {
      case 'blue': return 'border-blue-500'
      case 'green': return 'border-green-500'
      case 'red': return 'border-red-500'
      case 'amber': return 'border-amber-500'
      case 'purple': return 'border-purple-500'
      case 'orange': return 'border-orange-500'
      case 'sky': return 'border-sky-500'
      case 'pink': return 'border-pink-500'
      case 'indigo': return 'border-indigo-500'
      case 'lime': return 'border-lime-500'
      case 'teal': return 'border-teal-500'
      case 'slate': return 'border-slate-500'
      default: return 'border-border'
    }
  }

  return (
    <SettingsItem
      element="button"
      onPress={onEdit}
      className={cn(
        // Match DS "atomic item row" density while staying compatible with SettingsGroup dividers.
        "px-4 py-3 gap-3",
        className
      )}
      {...props}
    >
      <SettingsItemIcon>
        {imageSrc ? (
          <ImageTile
            size="small"
            src={imageSrc}
            alt={imageAlt ?? name}
            className={cn(
              // Keep stroke legacy support if explicitly provided with an image
              strokeStyle !== 'none' && getColorClass(color),
              getStrokeClass(strokeStyle),
              color && strokeStyle !== 'none' ? "border-2" : ""
            )}
          />
        ) : (
          <IconTile
            icon={Wallet}
            size="small"
            color={color}
            className="rounded-[12px]"
          />
        )}
      </SettingsItemIcon>

      <SettingsItemContent>
        <SettingsItemTitle>{name}</SettingsItemTitle>
      </SettingsItemContent>

      <SettingsItemAction className="flex items-center gap-4 text-foreground">
        <span className="text-sm font-mono font-bold text-foreground">{price}</span>
      </SettingsItemAction>
    </SettingsItem>
  )
}

