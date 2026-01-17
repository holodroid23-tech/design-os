import * as React from "react"
import { cn } from "../../lib/utils"

const SettingsGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "bg-layer-1 border-border-1 overflow-hidden rounded-xl border",
                className
            )}
            {...props}
        >
            {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child

                // Add separator to all but the last item
                const isLastInfo = index === React.Children.count(children) - 1

                return React.cloneElement(child as React.ReactElement<any>, {
                    className: cn(
                        // @ts-ignore
                        child.props.className,
                        !isLastInfo && "border-b border-border-1"
                    ),
                })
            })}
        </div>
    )
})
SettingsGroup.displayName = "SettingsGroup"

export { SettingsGroup }
