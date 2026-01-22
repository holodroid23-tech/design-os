"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const RadioButtonGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn(
                "flex flex-wrap gap-2",
                className
            )}
            {...props}
            ref={ref}
        />
    )
})
RadioButtonGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioButtonGroupItemVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted/50 data-[state=checked]:shadow-none",
    {
        variants: {
            variant: {
                default: "rounded-xl border border-input bg-transparent data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary hover:border-accent-foreground/30",
                surface: "rounded-xl border border-input bg-transparent data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary",
                card: "rounded-[18px] border border-input bg-transparent hover:bg-muted/30 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary/20 whitespace-normal shadow-sm",
            },
            size: {
                sm: "h-8 px-3 min-w-12 text-sm line-clamp-1",
                default: "h-11 px-6 min-w-16 text-sm line-clamp-1",
                lg: "h-10 px-6 min-w-20 text-sm line-clamp-1",
                card: "h-auto p-5 min-w-24 text-sm",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

interface RadioButtonGroupItemProps
    extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioButtonGroupItemVariants> { }

const RadioButtonGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioButtonGroupItemProps
>(({ className, size, variant, children, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(radioButtonGroupItemVariants({ size, variant, className }))}
            {...props}
        >
            {children}
        </RadioGroupPrimitive.Item>
    )
})
RadioButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioButtonGroup, RadioButtonGroupItem }
