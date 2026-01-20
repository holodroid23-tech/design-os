"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { Minus, Plus } from "lucide-react"

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

export interface OrderLineItemRowProps extends Omit<React.ComponentProps<typeof SettingsItem>, "children"> {
  name: string
  quantity: number
  price: string

  imageSrc?: string
  imageAlt?: string

  onIncrease?: () => void
  onDecrease?: () => void
  increaseIcon?: LucideIcon
  decreaseIcon?: LucideIcon
  increaseAriaLabel?: string
  decreaseAriaLabel?: string
}

/**
 * Order line item row (Design System)
 *
 * Domain row for order editing: image + name + quantity controls + price.
 * Uses `SettingsItem` primitives so it matches the DS item row language.
 */
export function OrderLineItemRow({
  className,
  name,
  quantity,
  price,
  imageSrc,
  imageAlt,
  onIncrease,
  onDecrease,
  increaseIcon: IncreaseIcon = Plus,
  decreaseIcon: DecreaseIcon = Minus,
  increaseAriaLabel = "Increase",
  decreaseAriaLabel = "Decrease",
  ...props
}: OrderLineItemRowProps) {
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

      <SettingsItemAction className="flex items-center gap-6 text-foreground">
        <div className="flex items-center gap-1 bg-layer-2 border border-border rounded-lg p-0.5">
          <Button
            type="button"
            variant="invisible"
            size="icon-sm"
            className="h-7 w-7 rounded-md text-foreground"
            aria-label={decreaseAriaLabel}
            disabled={!onDecrease}
            onClick={(e) => {
              e.stopPropagation()
              onDecrease?.()
            }}
          >
            <SystemIcon icon={DecreaseIcon} size="regular" aria-hidden="true" />
          </Button>

          <span className="font-bold px-2 text-sm text-foreground">{quantity}</span>

          <Button
            type="button"
            variant="invisible"
            size="icon-sm"
            className="h-7 w-7 rounded-md text-foreground"
            aria-label={increaseAriaLabel}
            disabled={!onIncrease}
            onClick={(e) => {
              e.stopPropagation()
              onIncrease?.()
            }}
          >
            <SystemIcon icon={IncreaseIcon} size="regular" aria-hidden="true" />
          </Button>
        </div>

        <span className="text-sm font-mono font-bold text-foreground">{price}</span>
      </SettingsItemAction>
    </SettingsItem>
  )
}

