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
                    "flex w-full justify-center py-6 text-xs uppercase tracking-widest text-[#4A4B50] dark:text-[#4A4B50]",
                    className
                )}
                {...props}
            >
                {version} {build && <span>(BUILD {build})</span>}
            </div>
        )
    }
)
SettingsFooter.displayName = "SettingsFooter"

export { SettingsFooter }
