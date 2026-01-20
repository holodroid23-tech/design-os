"use client"

import * as React from "react"
import { Delete } from "lucide-react"
import { cn } from "../../lib/utils"

interface PinEntryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    title?: string
    description?: string
    length?: number
    visible?: boolean
    showHandle?: boolean
    showCancelKey?: boolean
    showTitle?: boolean
    showDescription?: boolean
    pinDisplayVariant?: "dots" | "circles"
    onComplete?: (pin: string) => void
    onCancel?: () => void
    value?: string
    onChange?: (value: string) => void
}

const PinEntry = React.forwardRef<HTMLDivElement, PinEntryProps>(
    ({
        title = "Authorization Required",
        description = "Admin authorization is required to modify payment configuration. Please enter your 4-digit PIN.",
        length = 4,
        visible = false,
        showHandle = true,
        showCancelKey = true,
        showTitle = true,
        showDescription = true,
        pinDisplayVariant = "dots",
        onComplete,
        onCancel,
        value,
        onChange,
        className,
        ...props
    }, ref) => {
        const [internalPin, setInternalPin] = React.useState("")

        const pin = value !== undefined ? value : internalPin

        const handlePinChange = (newPin: string) => {
            if (onChange) {
                onChange(newPin)
            } else {
                setInternalPin(newPin)
            }

            if (newPin.length === length) {
                onComplete?.(newPin)
            }
        }

        const handleNumberClick = (num: string) => {
            if (pin.length >= length) return
            handlePinChange(pin + num)
        }

        const handleBackspace = () => {
            if (pin.length > 0) {
                handlePinChange(pin.slice(0, -1))
            }
        }

        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center w-full max-w-[360px] p-6 text-center select-none",
                    className
                )}
                {...props}
            >
                {showHandle && (
                    <div className="w-12 h-1 bg-border/40 rounded-full mb-8 opacity-50" />
                )}

                {showTitle && (
                    <h2 className="text-xl font-semibold mb-3">{title}</h2>
                )}
                {showDescription && (
                    <p className="text-sm text-muted-foreground mb-10 max-w-[280px] leading-relaxed">
                        {description}
                    </p>
                )}

                {/* PIN Display */}
                {pinDisplayVariant === "circles" ? (
                    <div className="flex items-center justify-center gap-5 mb-12">
                        {Array.from({ length }).map((_, i) => {
                            const hasValue = pin.length > i
                            const char = pin[i] ?? ""

                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                                        hasValue ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground/40"
                                    )}
                                >
                                    {hasValue ? (
                                        visible ? (
                                            <span className="text-lg font-semibold tabular-nums">{char}</span>
                                        ) : (
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                        )
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4 mb-12 h-4">
                        {Array.from({ length }).map((_, i) => (
                            visible ? (
                                <div key={i} className="w-8 flex justify-center text-2xl font-bold">
                                    {pin[i] || ""}
                                </div>
                            ) : (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-3.5 h-3.5 rounded-full border border-primary transition-all duration-200",
                                        pin.length > i ? "bg-primary border-primary" : "bg-transparent border-muted-foreground/30"
                                    )}
                                />
                            )
                        ))}
                    </div>
                )}

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-2">
                    {keys.map((key) => (
                        <button
                            key={key}
                            onClick={() => handleNumberClick(key)}
                            className={cn(
                                "flex items-center justify-center w-[72px] h-[72px] rounded-full",
                                "bg-secondary/40 text-[26px] font-medium text-foreground",
                                "hover:bg-secondary/60 active:scale-95 transition-all outline-none",
                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            )}
                        >
                            {key}
                        </button>
                    ))}

                    {showCancelKey ? (
                        <button
                            onClick={onCancel}
                            className="flex items-center justify-center h-[72px] text-xs font-bold tracking-wider text-muted-foreground hover:text-foreground uppercase transition-colors"
                        >
                            Cancel
                        </button>
                    ) : (
                        <div aria-hidden className="h-[72px]" />
                    )}

                    <button
                        onClick={() => handleNumberClick("0")}
                        className={cn(
                            "flex items-center justify-center w-[72px] h-[72px] rounded-full",
                            "bg-secondary/40 text-[26px] font-medium text-foreground",
                            "hover:bg-secondary/60 active:scale-95 transition-all outline-none",
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        )}
                    >
                        0
                    </button>

                    <button
                        onClick={handleBackspace}
                        className="flex items-center justify-center h-[72px] text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                    >
                        <Delete className="w-8 h-8" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        )
    }
)
PinEntry.displayName = "PinEntry"

export { PinEntry }
