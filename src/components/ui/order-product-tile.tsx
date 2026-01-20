import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { ProductTile, type ProductTileProps } from "@/components/ui/product-tile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SystemIcon } from "@/components/atoms/icon"
import { cn } from "@/lib/utils"

type OrderTileAction = {
  icon: LucideIcon
  label: string
  onPress?: () => void
  disabled?: boolean
}

export interface OrderProductTileProps
  extends Omit<ProductTileProps, "element" | "topRight" | "bottomLeft" | "bottomRight"> {
  count?: number
  leftAction?: OrderTileAction
  rightAction?: OrderTileAction
}

function TileCornerAction({ action }: { action: OrderTileAction }) {
  const Icon = action.icon

  return (
    <div className={cn("rounded-lg bg-overlay-default/20 hover:bg-overlay-default/30 transition-colors")}>
      <Button
        type="button"
        variant="invisible"
        size="icon-sm"
        aria-label={action.label}
        disabled={action.disabled}
        onClick={(e) => {
          e.stopPropagation()
          action.onPress?.()
        }}
      >
        <SystemIcon icon={Icon} size="regular" aria-hidden="true" />
      </Button>
    </div>
  )
}

/**
 * Order product tile (Design System)
 *
 * Specialized `ProductTile` variant that supports:
 * - Top-right count badge
 * - Bottom-left and bottom-right action buttons (e.g. minus/plus/trash)
 *
 * Expense tiles should use `ProductTile` directly (no controls by default).
 */
export function OrderProductTile({ count, leftAction, rightAction, onPress, interactive, ...props }: OrderProductTileProps) {
  return (
    <ProductTile
      {...props}
      element="div"
      interactive={interactive}
      onPress={onPress}
      topRight={
        typeof count === "number" ? (
          <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-foreground text-background font-mono text-[10px] font-bold border-none shadow-sm">
            {count}
          </Badge>
        ) : undefined
      }
      bottomLeft={
        leftAction ? <TileCornerAction action={leftAction} /> : undefined
      }
      bottomRight={
        rightAction ? <TileCornerAction action={rightAction} /> : undefined
      }
    />
  )
}

