"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "../../lib/utils"

const ColorSelector = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid grid-cols-6 gap-3 w-fit", className)}
            {...props}
            ref={ref}
        />
    )
})
ColorSelector.displayName = RadioGroupPrimitive.Root.displayName

const ColorSelectorItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { color?: string; gradient?: string }
>(({ className, color, gradient, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "relative aspect-square size-8 rounded-full border border-border/50 bg-layer-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                "data-[state=checked]:ring-2 data-[state=checked]:ring-white data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-background",
                gradient,
                className
            )}
            style={{ backgroundColor: gradient ? undefined : color }}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
                {/* We can add a check icon here if needed, but the image only shows the ring */}
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
ColorSelectorItem.displayName = RadioGroupPrimitive.Item.displayName

export { ColorSelector, ColorSelectorItem }
