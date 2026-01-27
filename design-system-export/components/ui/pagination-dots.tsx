import { cn } from "../../lib/utils"

export interface PaginationDotsProps {
    count: number
    activeIndex: number
    className?: string
}

export function PaginationDots({ count, activeIndex, className }: PaginationDotsProps) {
    if (count <= 1) return null

    return (
        <div
            className={cn("flex gap-1.5 items-center", className)}
            data-slot="pagination-dots"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all duration-300",
                        i === activeIndex
                            ? "bg-[#1c9c42]"
                            : "bg-stone-300 dark:bg-stone-800"
                    )}
                />
            ))}
        </div>
    )
}
