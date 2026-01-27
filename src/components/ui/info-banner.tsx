"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface InfoBannerProps {
    message: string
    storageKey: string
    className?: string
    buttonLabel?: string
}

export function InfoBanner({
    message,
    storageKey,
    className,
    buttonLabel = "I understand",
}: InfoBannerProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const dismissed = localStorage.getItem(storageKey)
        if (!dismissed) {
            setIsVisible(true)
        }
    }, [storageKey])

    const handleDismiss = () => {
        localStorage.setItem(storageKey, "true")
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div
            className={cn(
                "relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md",
                className
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm leading-relaxed text-onLayer-secondary">
                    {message}
                </p>
            </div>
            <div className="flex justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-lg px-4 text-xs font-semibold bg-white/5 hover:bg-white/10 border-white/5"
                    onClick={handleDismiss}
                >
                    {buttonLabel}
                </Button>
            </div>
        </div>
    )
}
