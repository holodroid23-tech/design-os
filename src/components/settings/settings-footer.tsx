import * as React from "react"
import { cn } from "../../lib/utils"

interface SettingsFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    version: string
    build?: string
    onClick?: () => void
}

const SettingsFooter = React.forwardRef<HTMLDivElement, SettingsFooterProps>(
    ({ className, version, build, onClick, ...props }, ref) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                className={cn(
                    // Tokenized styling (avoid hex + all-caps). Keep it subtle.
                    "flex w-full justify-center py-6 text-xs tracking-widest text-muted-foreground cursor-pointer select-none",
                    className
                )}
                {...props}
            >
                {version} {build && <span>(build {build})</span>}
            </div>
        )
    }
)
SettingsFooter.displayName = "SettingsFooter"

export { SettingsFooter }
