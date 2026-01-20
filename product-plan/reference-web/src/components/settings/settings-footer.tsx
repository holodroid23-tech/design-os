import * as React from "react"
import { cn } from "../../lib/utils"

interface SettingsFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    version: string
    build?: string
}

const SettingsFooter = React.forwardRef<HTMLDivElement, SettingsFooterProps>(
    ({ className, version, build, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    // Tokenized styling (avoid hex + all-caps). Keep it subtle.
                    "flex w-full justify-center py-6 text-xs tracking-widest text-muted-foreground",
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
