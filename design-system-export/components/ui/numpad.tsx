"use client"

import * as React from "react"
import { Delete } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

interface NumpadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: string
    onChange: (value: string) => void
    label?: string
    maxDigits?: number
    isCurrency?: boolean
}

const Numpad = React.forwardRef<HTMLDivElement, NumpadProps>(
    ({ value, onChange, label = "Enter price", maxDigits = 10, isCurrency = true, className, ...props }, ref) => {

        const handleNumberClick = (num: string) => {
            if (num === "." && value.includes(".")) return

            let newValue = value
            if (value === "0" && num !== ".") {
                newValue = num
            } else {
                newValue = value + num
            }

            if (newValue.replace(/[^0-9.]/g, "").length > maxDigits) return
            onChange(newValue)
        }

        const handleClear = () => onChange("0")

        const handleBackspace = () => {
            if (value.length <= 1 || (value.length === 2 && value.startsWith("$"))) {
                onChange("0")
            } else {
                onChange(value.slice(0, -1))
            }
        }

        const formatDisplay = (val: string) => {
            if (!isCurrency) return val
            if (val === "0") return "$0.00"
            if (!val.startsWith("$")) return `$${val}`
            return val
        }

        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "CLR"]

        return (
            <div
                ref={ref}
                className={cn("flex flex-col gap-2 w-full max-w-[320px]", className)}
                {...props}
            >
                {label && (
                    <div className="text-sm font-medium text-stone-700 dark:text-stone-300 px-1 mb-0.5">
                        {label}
                    </div>
                )}

                <div className="relative flex items-center justify-between bg-card/50 border border-border/20 rounded-xl px-5 h-20 mb-1 shadow-inner overflow-hidden">
                    <div className="text-4xl font-bold tracking-tight text-foreground truncate">
                        {formatDisplay(value)}
                    </div>
                    <button
                        onClick={handleBackspace}
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 active:scale-90 shrink-0"
                        aria-label="Backspace"
                    >
                        <Delete className="size-6 stroke-[1.5]" />
                    </button>
                    {/* Subtle gradient background inside display */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-foreground/[0.02] pointer-events-none" />
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                    {keys.map((key) => (
                        <Button
                            key={key}
                            variant="secondary"
                            className={cn(
                                "h-[54px] text-xl font-semibold rounded-xl transition-all active:scale-95",
                                key === "CLR" && "text-sm font-bold opacity-80"
                            )}
                            onClick={() => {
                                if (key === "CLR") handleClear()
                                else handleNumberClick(key)
                            }}
                        >
                            {key}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }
)
Numpad.displayName = "Numpad"

export { Numpad }
