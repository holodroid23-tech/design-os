import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionTitleVariants = cva("flex items-center justify-between gap-3", {
  variants: {
    size: {
      section: "",
      page: "",
    },
    interactive: {
      true: "cursor-pointer select-none",
      false: "",
    },
  },
  defaultVariants: {
    size: "section",
    interactive: false,
  },
})

const sectionTitleTextVariants = cva("text-foreground font-semibold leading-tight", {
  variants: {
    size: {
      section: "text-lg",
      page: "text-3xl tracking-tight",
    },
  },
  defaultVariants: {
    size: "section",
  },
})

export interface SectionTitleProps
  extends React.ComponentPropsWithoutRef<"div">,
  VariantProps<typeof sectionTitleVariants> {
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
  titleClassName?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export function SectionTitle({
  className,
  interactive,
  leading,
  size,
  titleAs: TitleComp = "h2",
  titleClassName,
  trailing,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <div
      data-slot="section-title"
      data-size={size ?? undefined}
      data-interactive={interactive ?? undefined}
      className={cn(sectionTitleVariants({ size, interactive }), className)}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3">
        {leading}
        <TitleComp className={cn(sectionTitleTextVariants({ size }), titleClassName)}>
          {children}
        </TitleComp>
      </div>
      {trailing}
    </div>
  )
}

