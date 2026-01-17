import * as React from "react"
import { cn } from "../../lib/utils"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
    variant?: "default" | "success" | "destructive" | "warning" | "primary"
    showLabel?: boolean
    labelSuffix?: string
    mode?: "segmented" | "continuous"
}

export function Stepper({
    value,
    max = 4,
    variant = "primary",
    showLabel = true,
    labelSuffix = "steps completed",
    mode = "segmented",
    className,
    ...props
}: StepperProps) {
    const variantStyles = {
        default: {
            active: "bg-foreground",
            text: "text-foreground",
        },
        success: {
            active: "bg-emerald-500",
            text: "text-emerald-500",
        },
        destructive: {
            active: "bg-red-500",
            text: "text-red-500",
        },
        warning: {
            active: "bg-amber-500",
            text: "text-amber-500",
        },
        primary: {
            active: "bg-primary",
            text: "text-primary",
        },
    }

    const styles = variantStyles[variant] || variantStyles.default
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
        <div className={cn("w-full space-y-2", className)} {...props}>
            {showLabel && (
                <div className={cn("text-xs font-bold", styles.text)}>
                    {value}/{max} {labelSuffix}
                </div>
            )}
            {mode === "segmented" ? (
                <div className="flex w-full gap-2">
                    {Array.from({ length: max }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                                i < value ? styles.active : "bg-secondary"
                            )}
                        />
                    ))}
                </div>
            ) : (
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-300 ease-in-out", styles.active)}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            )}
        </div>
    )
}
