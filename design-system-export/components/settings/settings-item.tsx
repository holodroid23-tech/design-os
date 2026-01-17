import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface SettingsItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: LucideIcon
    label: string
    description?: string
    variant?: "default" | "destructive"
    rightElement?: React.ReactNode
}

const SettingsItem = React.forwardRef<HTMLButtonElement, SettingsItemProps>(
    ({ className, icon: Icon, label, description, variant = "default", rightElement, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "bg-layer-1 text-foreground hover:bg-layer-hover active:bg-layer-active active:scale-[0.99] flex w-full items-start justify-between px-5 py-4 transition-all duration-75",
                    className
                )}
                {...props}
            >
                <div className="flex items-start gap-4">
                    {Icon && (
                        <Icon
                            size={24}
                            className={cn(
                                "shrink-0",
                                variant === "destructive" ? "text-red-500" : "text-muted-foreground"
                            )}
                        />
                    )}
                    <div className="flex flex-col items-start text-left">
                        <span
                            className={cn(
                                "text-regular-semibold",
                                variant === "destructive" ? "text-red-500" : "text-foreground"
                            )}
                        >
                            {label}
                        </span>
                        {description && (
                            <span className="text-support-small text-secondary">{description}</span>
                        )}
                    </div>
                </div>

                <div className="text-tertiary flex items-start gap-2 h-full">
                    {rightElement}
                    <ChevronRight size={20} className="shrink-0 text-white" />
                </div>
            </button>
        )
    }
)
SettingsItem.displayName = "SettingsItem"

export { SettingsItem }
