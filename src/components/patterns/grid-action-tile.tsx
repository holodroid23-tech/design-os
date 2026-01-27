import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const gridActionTileVariants = cva(
    "relative aspect-square rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-3 shadow-sm transition-all cursor-pointer active:scale-95 hover:-translate-y-0.5 hover:shadow-md",
    {
        variants: {
            intent: {
                default: "bg-tile-default !border-white/10 text-onLayer-primary hover:brightness-110",
                primary: "bg-primary border-primary text-primary-foreground hover:brightness-110",
            },
            tone: {
                surface: "bg-tile-default text-onLayer-primary",
                // Standard Colors (Solid)
                blue: "bg-tile-blue text-white",
                green: "bg-tile-green text-white",
                red: "bg-tile-red text-white",
                amber: "bg-tile-amber text-white",
                purple: "bg-tile-purple text-white",
                orange: "bg-tile-orange text-white",
                sky: "bg-tile-sky text-white",
                pink: "bg-tile-pink text-white",
                indigo: "bg-tile-indigo text-white",
                lime: "bg-tile-lime text-white",
                teal: "bg-tile-teal text-white",
                // Standard Gradients
                "gradient-blue": "bg-gradient-tile-blue text-white",
                "gradient-green": "bg-gradient-tile-green text-white",
                "gradient-red": "bg-gradient-tile-red text-white",
                "gradient-amber": "bg-gradient-tile-amber text-white",
                "gradient-purple": "bg-gradient-tile-purple text-white",
                "gradient-orange": "bg-gradient-tile-orange text-white",
                "gradient-teal": "bg-gradient-tile-teal text-white",
                "gradient-pink": "bg-gradient-tile-pink text-white",
                "gradient-indigo": "bg-gradient-tile-indigo text-white",
                "gradient-lime": "bg-gradient-tile-lime text-white",
                "gradient-sky": "bg-gradient-tile-sky text-white",
            }
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
    ({ className, intent, tone, icon: Icon, label, iconClassName, ...props }, ref) => {
        const hasTone = tone && tone !== 'surface'
        return (
            <button
                ref={ref}
                className={cn(gridActionTileVariants({ intent, tone }), className)}
                type="button"
                {...props}
            >
                {Icon && (
                    <Icon
                        className={cn("h-8 w-8 mb-2", hasTone ? "text-white" : iconClassName)}
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
