import * as React from "react"
import { cn } from "../../lib/utils"

const SettingsItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("group flex items-center gap-3 w-full p-3 min-h-[64px] has-[[data-state=checked]]:bg-layer-2/50", className)}
            {...props}
        >
            {children}
        </div>
    )
})
SettingsItem.displayName = "SettingsItem"

const SettingsItemIcon = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex-shrink-0 flex items-center justify-center", className)}
            {...props}
        >
            {children}
        </div>
    )
})
SettingsItemIcon.displayName = "SettingsItemIcon"

const SettingsItemContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex-1 min-w-0 flex flex-col gap-1.5", className)}
            {...props}
        >
            {children}
        </div>
    )
})
SettingsItemContent.displayName = "SettingsItemContent"

const SettingsItemTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("text-sm font-medium text-foreground leading-none", className)}
            {...props}
        >
            {children}
        </div>
    )
})
SettingsItemTitle.displayName = "SettingsItemTitle"

const SettingsItemDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("text-xs text-muted-foreground leading-none opacity-80", className)}
            {...props}
        >
            {children}
        </div>
    )
})
SettingsItemDescription.displayName = "SettingsItemDescription"

const SettingsItemAction = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex-shrink-0 flex items-center gap-2 ml-auto", className)}
            {...props}
        >
            {children}
        </div>
    )
})
SettingsItemAction.displayName = "SettingsItemAction"

export {
    SettingsItem,
    SettingsItemIcon,
    SettingsItemContent,
    SettingsItemTitle,
    SettingsItemDescription,
    SettingsItemAction,
}
