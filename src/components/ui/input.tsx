import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-[#9d9da0] focus-visible:ring-[#9d9da0]/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "border-input bg-background dark:bg-input/30 border",
      },
      fieldSize: {
        default: "h-9",
        lg: "h-11",
        sm: "h-8",
      }
    },
    defaultVariants: {
      variant: "default",
      fieldSize: "default"
    },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
  VariantProps<typeof inputVariants> { }

function Input({ className, variant, fieldSize, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, fieldSize, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
