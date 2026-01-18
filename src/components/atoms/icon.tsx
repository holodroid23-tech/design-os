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
    bg: "bg-layer-level-2",
    icon: "text-onLayer-primary",
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
   */
  tone?: IconTone
}

export function IconTile({
  icon,
  size = "small",
  variant = "tile",
  tone = "neutral",
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

  return (
    <div
      className={cn(
        iconTileContainer({ size, variant }),
        variant === "tile" ? styles.bg : undefined,
        className,
      )}
      {...props}
    >
      <SystemIcon
        icon={icon}
        size={resolvedIconSize}
        className={cn(styles.icon)}
        aria-hidden="true"
      />
    </div>
  )
}

