import * as React from "react"
import { Search, ShoppingBag, Wallet, CupSoda, Utensils, Box, Coffee } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "./input"

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

function SystemIcon({
    icon: Icon,
    className,
    ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children"> & { icon: IconComponent }) {
    return <Icon className={cn("size-[18px]", className)} {...props} />
}

export interface SearchSuggestion {
    id: string
    label: string
    /**
     * Preferred: pass a DS-sized leading visual (36px), e.g. an IconTile/ImageTile
     * from your consuming codebase.
     */
    leading?: React.ReactNode
    /**
     * Legacy (kept for compatibility): render a custom icon node with custom background classes.
     * Prefer `leading` for design-system consistency.
     */
    icon?: React.ReactNode
    iconBg?: string
    price?: string
    imageSrc?: string
    color?: string
}

interface SearchInputWithSuggestionsProps extends React.ComponentProps<"input"> {
    suggestions?: SearchSuggestion[]
    onSuggestionClick?: (suggestion: SearchSuggestion) => void
    /**
     * Visual tone for embedding in dark "onLayer" surfaces (e.g. bottom sheets).
     */
    tone?: "default" | "onLayer"
}

export function SearchInputWithSuggestions({
    className,
    suggestions = [],
    onSuggestionClick,
    tone = "default",
    ...props
}: SearchInputWithSuggestionsProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")

    // Default suggestions from the Design System
    const defaultSuggestions: SearchSuggestion[] = [
        {
            id: "1",
            label: "Macchiato",
            icon: <SystemIcon icon={Coffee} aria-hidden="true" />,
            iconBg: "bg-stone-500/10 text-stone-200",
            price: "$3.75",
        },
        {
            id: "2",
            label: "Cappuccino",
            icon: <SystemIcon icon={Coffee} aria-hidden="true" />,
            iconBg: "bg-stone-500/10 text-stone-200",
            price: "$4.50",
        },
        {
            id: "3",
            label: "Iced Matcha",
            icon: <SystemIcon icon={CupSoda} aria-hidden="true" />,
            iconBg: "bg-stone-500/10 text-stone-200",
            price: "$11.00",
        },
        {
            id: "4",
            label: "Avocado Toast",
            icon: <SystemIcon icon={Utensils} aria-hidden="true" />,
            iconBg: "bg-stone-500/10 text-stone-200",
            price: "$12.00",
        },
        {
            id: "5",
            label: "Sparkling Water",
            icon: <SystemIcon icon={Box} aria-hidden="true" />,
            iconBg: "bg-stone-500/10 text-stone-200",
            price: "$3.00",
        },
    ]

    const baseSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions

    const filteredSuggestions = query.trim() === ""
        ? baseSuggestions
        : baseSuggestions.filter(s => s.label.toLowerCase().includes(query.toLowerCase()))

    return (
        <div className="relative w-full">
            <div className="relative group">
                <SystemIcon
                    icon={Search}
                    className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 size-4",
                        tone === "onLayer" ? "text-stone-400" : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                />
                <Input
                    className={cn(
                        "pl-10 min-h-[48px] sm:min-h-0",
                        className
                    )}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    {...props}
                />
            </div>

            {isOpen && (
                <div
                    className={cn(
                        "absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-md border shadow-2xl animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl",
                        tone === "onLayer"
                            ? "border-white/10 bg-stone-900/80 text-white"
                            : "border-border bg-popover/80 text-popover-foreground"
                    )}
                >
                    <div className="flex flex-col">
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion.id}
                                    className={cn(
                                        "flex items-center gap-4 px-5 py-4 text-left transition-colors first:pt-5 last:pb-5 group",
                                        tone === "onLayer" ? "hover:bg-white/10" : "hover:bg-stone-100 dark:hover:bg-stone-800"
                                    )}
                                    onClick={() => {
                                        onSuggestionClick?.(suggestion)
                                        setQuery("")
                                        setIsOpen(false)
                                    }}
                                >
                                    <div className="shrink-0 transition-transform group-hover:scale-110">
                                        {suggestion.leading ? (
                                            suggestion.leading
                                        ) : (suggestion.imageSrc || suggestion.color || suggestion.icon) ? (
                                            suggestion.imageSrc ? (
                                                <div className="inline-flex size-9 shrink-0 overflow-hidden rounded-[12px] bg-stone-500/10 border border-white/10">
                                                    <img src={suggestion.imageSrc} alt={suggestion.label} className="h-full w-full object-cover" />
                                                </div>
                                            ) : (
                                                <div
                                                    className={cn(
                                                        "flex size-9 items-center justify-center rounded-[12px]",
                                                        // Fallback to DS color mapping or provided iconBg
                                                        suggestion.iconBg ?? (
                                                            suggestion.color === 'blue' ? 'bg-blue-600 text-white' :
                                                                suggestion.color === 'green' ? 'bg-emerald-600 text-white' :
                                                                    suggestion.color === 'red' ? 'bg-red-600 text-white' :
                                                                        suggestion.color === 'orange' ? 'bg-orange-600 text-white' :
                                                                            suggestion.color === 'purple' ? 'bg-purple-600 text-white' :
                                                                                (tone === "onLayer" ? "bg-white/5 text-white" : "bg-stone-500/10 text-stone-200")
                                                        ),
                                                    )}
                                                >
                                                    {suggestion.icon || <ShoppingBag className="size-[18px]" />}
                                                </div>
                                            )
                                        ) : null}
                                    </div>
                                    <div className="flex flex-1 items-center justify-between">
                                        <span className="text-base font-semibold">{suggestion.label}</span>
                                        {suggestion.price && (
                                            <span className={cn(
                                                "font-mono text-sm",
                                                tone === "onLayer" ? "text-stone-400" : "text-muted-foreground"
                                            )}>
                                                {suggestion.price}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className={cn(
                                "px-5 py-8 text-center",
                                tone === "onLayer" ? "text-stone-400" : "text-muted-foreground"
                            )}>
                                <p className="text-sm font-medium">No results found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
