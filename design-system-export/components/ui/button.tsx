import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-[#1c9c42] to-primary text-primary-foreground border border-[#0d5e24] shadow-btn hover:from-[#1da846] hover:to-[#127a2f] active:shadow-inner active:from-[#0d5e24] active:to-[#0d5e24]",
        destructive:
          "bg-linear-to-b from-[#ed4646] to-destructive text-white border border-[#991b1b] shadow-btn-destructive hover:from-[#f05a5a] hover:to-[#b91c1c] active:shadow-inner active:from-[#991b1b] active:to-[#991b1b]",
        ghost:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-border dark:hover:bg-input/50",
        secondary:
          "bg-linear-to-b from-[#f9f9fa] to-secondary text-secondary-foreground border border-[#d1d1d4] shadow-sm hover:from-[#ffffff] hover:to-[#e1e1e4] dark:from-[#42424a] dark:to-secondary dark:border-[#2d2d34] dark:shadow-btn-dark",
        invisible:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary dark:text-foreground underline-offset-4 underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
