import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

const systemIconVariants = cva("", {
  variants: {
    size: {
      small: "size-3", // 12px
      regular: "size-[18px]", // 18px
      big: "size-6", // 24px
      huge: "size-[30px]", // 30px
    },
  },
  defaultVariants: {
    size: "regular",
  },
})

export interface SystemIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children">,
  VariantProps<typeof systemIconVariants> {
  icon: IconComponent
}

export function SystemIcon({ icon: Icon, size, className, ...props }: SystemIconProps) {
  return <Icon className={cn(systemIconVariants({ size }), className)} {...props} />
}

type IconTone = "neutral" | "info" | "success" | "warning" | "danger" | "recent"

const iconTileContainer = cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      small: "size-9", // 36px (6px grid)
      medium: "size-12", // 48px (6px grid)
      large: "size-[60px]", // 60px (6px grid) — matches Avatar large
    },
    variant: {
      plain: "bg-transparent",
      tile: "rounded-[12px]",
    },
  },
  defaultVariants: {
    size: "small",
    variant: "tile",
  },
})

const iconToneToStyles: Record<IconTone, { bg: string; icon: string }> = {
  neutral: {
    bg: "bg-muted",
    icon: "text-foreground",
  },
  info: {
    bg: "bg-layer-info",
    icon: "text-border-info-emphasis",
  },
  success: {
    bg: "bg-layer-success",
    icon: "text-onLayer-success",
  },
  warning: {
    bg: "bg-layer-warning",
    icon: "text-onLayer-warning",
  },
  danger: {
    bg: "bg-layer-danger",
    icon: "text-onLayer-danger",
  },
  recent: {
    bg: "bg-layer-recent",
    icon: "text-onLayer-recent",
  },
}

export interface IconTileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
  VariantProps<typeof iconTileContainer> {
  icon: IconComponent
  /**
   * `neutral` is the default. Other tones use DS semantic layer colors.
   * If `color` is provided, it takes precedence over `tone`.
   */
  tone?: IconTone
  /**
   * Standard color or gradient name (e.g. 'blue', 'gradient-purple').
   * Maps to the standardized tile system.
   */
  color?: string
}

export function IconTile({
  icon,
  size = "small",
  variant = "tile",
  tone = "neutral",
  color,
  className,
  ...props
}: IconTileProps) {
  const styles = iconToneToStyles[tone]
  // Locked mapping (design decision):
  // - 36px tile -> 18px glyph
  // - 48px tile -> 24px glyph
  // - 60px tile -> 30px glyph
  // Small (12px) glyphs should not be placed inside a bg tile.
  const resolvedIconSize = size === "large" ? "huge" : size === "medium" ? "big" : "regular"

  const colorMap: Record<string, string> = {
    surface: "bg-tile-default",
    blue: "bg-tile-blue",
    green: "bg-tile-green",
    red: "bg-tile-red",
    amber: "bg-tile-amber",
    purple: "bg-tile-purple",
    orange: "bg-tile-orange",
    sky: "bg-tile-sky",
    pink: "bg-tile-pink",
    indigo: "bg-tile-indigo",
    lime: "bg-tile-lime",
    teal: "bg-tile-teal",
    "gradient-blue": "bg-gradient-tile-blue",
    "gradient-green": "bg-gradient-tile-green",
    "gradient-red": "bg-gradient-tile-red",
    "gradient-amber": "bg-gradient-tile-amber",
    "gradient-purple": "bg-gradient-tile-purple",
    "gradient-orange": "bg-gradient-tile-orange",
    "gradient-teal": "bg-gradient-tile-teal",
    "gradient-pink": "bg-gradient-tile-pink",
    "gradient-indigo": "bg-gradient-tile-indigo",
    "gradient-lime": "bg-gradient-tile-lime",
    "gradient-sky": "bg-gradient-tile-sky",
  }

  const bgClass = color ? colorMap[color] || "bg-tile-default" : styles.bg
  const iconClass = color ? "text-white" : styles.icon

  return (
    <div
      className={cn(
        iconTileContainer({ size, variant }),
        variant === "tile" ? bgClass : undefined,
        className,
      )}
      {...props}
    >
      <SystemIcon
        icon={icon}
        size={resolvedIconSize}
        className={cn(iconClass)}
        aria-hidden="true"
      />
    </div>
  )
}

