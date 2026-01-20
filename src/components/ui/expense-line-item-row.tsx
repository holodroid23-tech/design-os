"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { Pencil } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
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

  editIcon?: LucideIcon
  editAriaLabel?: string
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
  editIcon: EditIcon = Pencil,
  editAriaLabel = "Edit price",
  onEdit,
  ...props
}: ExpenseLineItemRowProps) {
  return (
    <SettingsItem
      element="div"
      className={cn(
        // Match DS "atomic item row" density while staying compatible with SettingsGroup dividers.
        "px-4 py-3 gap-3",
        className
      )}
      {...props}
    >
      <SettingsItemIcon>
        <ImageTile size="small" src={imageSrc} alt={imageAlt ?? name} />
      </SettingsItemIcon>

      <SettingsItemContent>
        <SettingsItemTitle>{name}</SettingsItemTitle>
      </SettingsItemContent>

      <SettingsItemAction className="flex items-center gap-4 text-foreground">
        <Button
          type="button"
          variant="invisible"
          size="icon-sm"
          className="h-8 w-8 text-foreground"
          aria-label={editAriaLabel}
          disabled={!onEdit}
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.()
          }}
        >
          <SystemIcon icon={EditIcon} size="regular" aria-hidden="true" />
        </Button>
        <span className="text-sm font-mono font-bold text-foreground">{price}</span>
      </SettingsItemAction>
    </SettingsItem>
  )
}

