import * as React from "react"
import { cn } from "../../lib/utils"

export interface SettingsGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional override for the separator border color between items.
   * Useful when rendering the group on an "inverse" surface (e.g., email dark surface).
   */
  separatorClassName?: string
}

const SettingsGroup = React.forwardRef<HTMLDivElement, SettingsGroupProps>(
  ({ className, separatorClassName, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                // Token + allowed radius (avoid named `rounded-*` utilities).
                "overflow-hidden rounded-[18px] border border-border",
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
                        !isLastInfo && "border-b border-border",
                        !isLastInfo && separatorClassName
                    ),
                })
            })}
        </div>
    )
  }
)
SettingsGroup.displayName = "SettingsGroup"

export { SettingsGroup }
