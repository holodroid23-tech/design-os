import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const gridActionTileVariants = cva(
    "relative aspect-square rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-3 shadow-sm transition-all cursor-pointer active:scale-95 hover:-translate-y-0.5 hover:shadow-md",
    {
        variants: {
            intent: {
                default: "bg-layer-2 border-border text-foreground hover:bg-layer-3",
                primary: "bg-primary border-primary text-primary-foreground hover:bg-primary/90",
            },
        },
        defaultVariants: {
            intent: "default",
        },
    }
)

export interface GridActionTileProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gridActionTileVariants> {
    icon?: LucideIcon
    label: string
    iconClassName?: string
}

export const GridActionTile = React.forwardRef<HTMLButtonElement, GridActionTileProps>(
    ({ className, intent, icon: Icon, label, iconClassName, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(gridActionTileVariants({ intent }), className)}
                type="button"
                {...props}
            >
                {Icon && (
                    <Icon
                        className={cn("h-8 w-8 mb-2", iconClassName)}
                        aria-hidden="true"
                    />
                )}
                <span className="font-sans font-semibold text-base tracking-tight text-center leading-tight">
                    {label}
                </span>
            </button>
        )
    }
)
GridActionTile.displayName = "GridActionTile"
