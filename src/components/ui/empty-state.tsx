import * as React from "react"
import { cn } from "../../lib/utils"
import { IconTile, type IconTileProps } from "@/components/atoms/icon"

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: IconComponent
    iconSize?: IconTileProps["size"]
    iconTone?: IconTileProps["tone"]
    title: string
    description?: string
    action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
    ({ className, icon, iconSize = "large", iconTone = "neutral", title, description, action, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center justify-center text-center p-8 rounded-xl border-2 border-dashed border-border/50 bg-layer-2/50",
                    className
                )}
                {...props}
            >
                {icon && (
                    <IconTile icon={icon} size={iconSize} tone={iconTone} className="mb-4" />
                )}
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm text-center leading-relaxed">
                        {description}
                    </p>
                )}
                {action && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                        {action}
                    </div>
                )}
            </div>
        )
    }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
