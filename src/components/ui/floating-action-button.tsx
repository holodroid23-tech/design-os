import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface FABAction {
    label: string
    icon: React.ReactNode
    onClick: () => void
}

export interface FloatingActionButtonProps {
    actions: FABAction[]
    className?: string
    icon?: React.ReactNode
}

export function FloatingActionButton({ actions, className, icon = <Plus /> }: FloatingActionButtonProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Close when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    if (actions.length === 0) return null

    const handleMainClick = () => {
        if (actions.length === 1) {
            actions[0].onClick()
        } else {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div
            ref={containerRef}
            className={cn("fixed bottom-24 right-4 z-[50] flex flex-col items-end gap-3", className)}
        >
            {/* Action Buttons (Roll up) */}
            <div className={cn(
                "flex flex-col items-end gap-3 transition-all duration-300 origin-bottom",
                isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-90 pointer-events-none"
            )}>
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        variant="secondary"
                        className="shadow-lg"
                        onClick={() => {
                            action.onClick()
                            setIsOpen(false)
                        }}
                    >
                        {action.icon}
                        {action.label}
                    </Button>
                ))}
            </div>

            {/* Main Trigger Button */}
            <button
                onClick={handleMainClick}
                className={cn(
                    "size-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl transition-all duration-300 active:scale-95",
                    isOpen ? "rotate-45" : "hover:scale-105"
                )}
            >
                <div className="size-6 transition-transform duration-300">
                    {icon}
                </div>
            </button>

            {/* Backdrop for closing - optional, maybe remove if strictly not needed, but good for UX. User didn't ask to remove it. */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[-1] bg-background/20 backdrop-blur-[2px]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}
