"use client"

import * as React from "react"
import { Battery, Wifi, Signal, MessageCircle, Mail, AlarmClock, Bluetooth } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatusBar({ className }: { className?: string }) {
    const [time, setTime] = React.useState("")

    React.useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            )
        }

        updateTime()
        const interval = setInterval(1000, updateTime)
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className={cn(
                "flex h-10 w-full items-center justify-between px-6 text-white select-none",
                className
            )}
        >
            {/* Left: Time & Notifications */}
            <div className="flex items-center gap-3">
                <span className="text-[15px] font-semibold tracking-wide">{time}</span>

                {/* Mock Notifications */}
                <div className="flex items-center gap-1.5 opacity-90">
                    <MessageCircle className="size-4 fill-green-500 text-green-500" />
                    <Mail className="size-4" />
                </div>
            </div>

            {/* Right: System Icons */}
            <div className="flex items-center gap-2.5">
                <AlarmClock className="size-4 opacity-80" />
                <Bluetooth className="size-4 opacity-80" />
                <Signal className="size-4 fill-white stroke-none" />
                <Wifi className="size-4" strokeWidth={3} />
                {/* Battery with internal percentage look */}
                <div className="relative flex items-center justify-center">
                    <Battery className="size-[20px] text-white" strokeWidth={2.5} />
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold p-0.5 pr-1">
                        92
                    </span>
                </div>
            </div>
        </div>
    )
}
