import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SystemIcon } from "@/components/atoms/icon"
import { Image as ImageIcon } from "lucide-react"

const imageTileVariants = cva(
  "inline-flex shrink-0 overflow-hidden rounded-[12px] bg-tile-default border border-white/10",
  {
    variants: {
      size: {
        small: "size-9", // 36px
        medium: "size-12", // 48px
        large: "size-[60px]", // 60px
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
)

export interface ImageTileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
  VariantProps<typeof imageTileVariants> {
  src?: string
  alt?: string
}

export function ImageTile({ src, alt = "", size, className, ...props }: ImageTileProps) {
  return (
    <div className={cn(imageTileVariants({ size }), className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-onLayer-tertiary">
          <SystemIcon
            icon={ImageIcon}
            size={size === "large" ? "huge" : size === "medium" ? "big" : "regular"}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}

