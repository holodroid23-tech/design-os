import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "./button"
import { SectionTitle } from "./section-title"
import { cn } from "@/lib/utils"

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode
    onBack?: () => void
    trailing?: React.ReactNode
    sticky?: boolean
}

/**
 * Standardized Page Header Molecule
 * 
 * Consistent size, sticky behavior, and back navigation across the app.
 */
export function PageHeader({
    title,
    onBack,
    trailing,
    sticky = true,
    children,
    className,
    ...props
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                "bg-background w-full flex items-center px-4 pt-4 pb-4 min-h-[64px] gap-0",
                sticky && "sticky top-0 z-50",
                className
            )}
            {...props}
        >
            {onBack && (
                <Button
                    variant="invisible"
                    size="icon"
                    className="-ml-4 shrink-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                    onClick={onBack}
                    aria-label="Back"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            )}

            <div className="flex-1 min-w-0">
                {title ? (
                    <SectionTitle size="section" className="w-full">
                        {title}
                    </SectionTitle>
                ) : (
                    children
                )}
            </div>

            {trailing && <div className="shrink-0">{trailing}</div>}
        </header>
    )
}
