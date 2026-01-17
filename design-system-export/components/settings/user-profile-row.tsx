import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserProfileRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string
    email: string
    initials: string
    src?: string
    showBadge?: boolean
    badgeText?: string
    status?: "online" | "offline" | "away"
}

const UserProfileRow = React.forwardRef<HTMLButtonElement, UserProfileRowProps>(
    ({ className, name, email, initials, src, showBadge, badgeText, status, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "bg-layer-1 hover:bg-layer-hover active:bg-layer-active active:scale-[0.99] border-border-1 text-primary flex w-full items-center justify-between rounded-xl border p-4 transition-all duration-75",
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar size="large" variant="primary">
                            <AvatarImage src={src} alt={name} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        {status === "online" && (
                            <span className="bg-green-500 absolute bottom-0 right-0 size-4 rounded-full border-2 border-white ring-1 ring-white dark:border-black dark:ring-black" />
                        )}
                    </div>

                    <div className="flex flex-col items-start text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-regular-semibold text-foreground">{name}</span>
                            {showBadge && (
                                <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold leading-none uppercase">
                                    {badgeText}
                                </span>
                            )}
                        </div>
                        <span className="text-small text-muted-foreground">{email}</span>
                    </div>
                </div>

                <div className="text-tertiary">
                    <ChevronRight size={20} className="text-white opacity-40" />
                </div>
            </button>
        )
    }
)
UserProfileRow.displayName = "UserProfileRow"

export { UserProfileRow }
