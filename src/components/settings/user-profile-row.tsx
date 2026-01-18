import * as React from "react"
import { ChevronRight, User } from "lucide-react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserProfileRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string
    email: string
    src?: string
    showBadge?: boolean
    badgeText?: string
    status?: "online" | "offline" | "away"
}

const UserProfileRow = React.forwardRef<HTMLButtonElement, UserProfileRowProps>(
    ({ className, name, email, src, showBadge, badgeText, status, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "hover:bg-layer-hover active:bg-layer-active active:scale-[0.99] text-foreground flex w-full items-center justify-between p-4 transition-all duration-75",
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar size="large" variant="primary" online={status === "online"}>
                            <AvatarImage src={src} alt={name} />
                            <AvatarFallback aria-hidden>
                                <User aria-hidden />
                            </AvatarFallback>
                        </Avatar>
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
                        <span className="text-support-small text-muted-foreground">{email}</span>
                    </div>
                </div>

                <div className="text-tertiary">
                    <ChevronRight size={20} className="text-muted-foreground" />
                </div>
            </button>
        )
    }
)
UserProfileRow.displayName = "UserProfileRow"

export { UserProfileRow }
