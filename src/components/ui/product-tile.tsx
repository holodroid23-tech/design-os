import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type ProductTileElement = "button" | "div"

const productTileVariants = cva(
  "relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-sm transition-all",
  {
    variants: {
      tone: {
        surface: "bg-tile-default text-onLayer-primary",
        default: "bg-tile-default text-onLayer-primary",
        // Standard Colors (Solid)
        blue: "bg-tile-blue text-white",
        green: "bg-tile-green text-white",
        red: "bg-tile-red text-white",
        amber: "bg-tile-amber text-white",
        purple: "bg-tile-purple text-white",
        orange: "bg-tile-orange text-white",
        sky: "bg-tile-sky text-white",
        pink: "bg-tile-pink text-white",
        indigo: "bg-tile-indigo text-white",
        lime: "bg-tile-lime text-white",
        teal: "bg-tile-teal text-white",
        slate: "bg-tile-slate text-white",
        // Standard Gradients
        "gradient-blue": "bg-gradient-tile-blue text-white",
        "gradient-green": "bg-gradient-tile-green text-white",
        "gradient-red": "bg-gradient-tile-red text-white",
        "gradient-amber": "bg-gradient-tile-amber text-white",
        "gradient-purple": "bg-gradient-tile-purple text-white",
        "gradient-orange": "bg-gradient-tile-orange text-white",
        // Legacy/Back-compat
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
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
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      ) : null}

      {topRight ? <div className="absolute top-1.5 right-1.5 z-20">{topRight}</div> : null}
      {bottomLeft ? <div className="absolute bottom-1.5 left-1.5 z-20">{bottomLeft}</div> : null}
      {bottomRight ? <div className="absolute bottom-1.5 right-1.5 z-20">{bottomRight}</div> : null}

      <div
        className={cn(
          "absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-3",
          imageSrc ? "text-white" : undefined
        )}
      >
        <div className="font-sans text-base font-semibold tracking-tight leading-tight">{name}</div>
        {price ? <div className="font-mono text-sm font-medium opacity-90">{price}</div> : null}
      </div>
    </Comp>
  )
}

