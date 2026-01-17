import * as React from "react"
import { cn } from "../../lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode
    title: string
    description?: string
    action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
    ({ className, icon, title, description, action, ...props }, ref) => {
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
                    <div className="mb-4 text-muted-foreground bg-layer-1 p-4 rounded-xl shadow-sm ring-1 ring-border/50">
                        {icon}
                    </div>
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
