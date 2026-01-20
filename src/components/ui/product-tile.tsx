import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type ProductTileElement = "button" | "div"

const productTileVariants = cva(
  "relative aspect-square rounded-2xl overflow-hidden border border-border shadow-sm transition-all",
  {
    variants: {
      tone: {
        surface: "bg-layer-1 text-foreground",
        primary: "bg-gradient-to-br from-primary/70 to-primary text-primary-foreground",
        secondary: "bg-gradient-to-br from-secondary/70 to-secondary text-secondary-foreground",
        info: "bg-gradient-to-br from-layer-info/70 to-layer-info text-primary-foreground",
        success: "bg-gradient-to-br from-layer-success/70 to-layer-success text-primary-foreground",
        warning: "bg-gradient-to-br from-layer-warning/70 to-layer-warning text-primary-foreground",
        danger: "bg-gradient-to-br from-layer-danger/70 to-layer-danger text-primary-foreground",
        muted: "bg-gradient-to-br from-muted/70 to-muted text-primary-foreground",
        accent: "bg-gradient-to-br from-accent/70 to-accent text-primary-foreground",
        card: "bg-gradient-to-br from-card/70 to-card text-primary-foreground",
      },
      interactive: {
        true: "cursor-pointer active:scale-95 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        false: "",
      },
    },
    defaultVariants: {
      tone: "surface",
      interactive: true,
    },
  }
)

export interface ProductTileProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onClick">,
    VariantProps<typeof productTileVariants> {
  element?: ProductTileElement
  /**
   * Main item name displayed in the center.
   */
  name: string
  /**
   * Optional price/subtitle displayed under the name.
   */
  price?: string
  /**
   * Optional image background.
   */
  imageSrc?: string
  imageAlt?: string
  /**
   * When `imageSrc` is used, an overlay improves text contrast.
   */
  showImageScrim?: boolean
  /**
   * Optional top-right overlay (e.g. count badge).
   */
  topRight?: React.ReactNode
  /**
   * Optional bottom-left overlay (e.g. action button).
   */
  bottomLeft?: React.ReactNode
  /**
   * Optional bottom-right overlay (e.g. action button).
   */
  bottomRight?: React.ReactNode
  /**
   * Press handler that works for both `button` and `div` modes.
   */
  onPress?: () => void
  disabled?: boolean
}

export function ProductTile({
  element = "button",
  name,
  price,
  imageSrc,
  imageAlt,
  showImageScrim = true,
  topRight,
  bottomLeft,
  bottomRight,
  tone,
  interactive,
  className,
  onPress,
  disabled,
  onKeyDown,
  tabIndex,
  role,
  ...props
}: ProductTileProps) {
  const isInteractive = Boolean((interactive ?? true) && (onPress || element === "button"))
  const Comp = element === "div" ? "div" : "button"

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e)
    if (disabled) return
    if (element !== "div" || !isInteractive) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onPress?.()
    }
  }

  return (
    <Comp
      className={cn(
        productTileVariants({ tone, interactive: isInteractive ? true : false }),
        disabled ? "opacity-50 pointer-events-none" : undefined,
        className
      )}
      {...(element === "button" ? { type: "button" as const } : null)}
      {...(element === "div" && isInteractive ? { role: role ?? "button", tabIndex: tabIndex ?? 0 } : null)}
      onClick={() => {
        if (disabled) return
        onPress?.()
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onKeyDown={handleKeyDown as any}
      {...props}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt ?? name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : null}

      {imageSrc && showImageScrim ? (
        <div className="absolute inset-0 bg-overlay-default/35" aria-hidden="true" />
      ) : null}

      {topRight ? <div className="absolute top-1.5 right-1.5 z-20">{topRight}</div> : null}
      {bottomLeft ? <div className="absolute bottom-1.5 left-1.5 z-20">{bottomLeft}</div> : null}
      {bottomRight ? <div className="absolute bottom-1.5 right-1.5 z-20">{bottomRight}</div> : null}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-3">
        <div className="font-sans text-base font-semibold tracking-tight leading-tight">{name}</div>
        {price ? <div className="font-mono text-sm font-medium opacity-90">{price}</div> : null}
      </div>
    </Comp>
  )
}

