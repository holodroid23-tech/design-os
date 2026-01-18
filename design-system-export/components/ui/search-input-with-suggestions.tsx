import * as React from "react"
import { Search, CupSoda, Utensils, Box, Coffee } from "lucide-react"
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
}

interface SearchInputWithSuggestionsProps extends React.ComponentProps<"input"> {
    suggestions?: SearchSuggestion[]
    onSuggestionClick?: (suggestion: SearchSuggestion) => void
}

export function SearchInputWithSuggestions({
    className,
    suggestions = [],
    onSuggestionClick,
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400"
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

            {isOpen && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-md border border-border bg-popover shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col">
                        {filteredSuggestions.map((suggestion) => (
                            <button
                                key={suggestion.id}
                                className="flex items-center gap-4 px-5 py-4 text-left hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors first:pt-5 last:pb-5 group"
                                onClick={() => {
                                    setQuery(suggestion.label)
                                    onSuggestionClick?.(suggestion)
                                    setIsOpen(false)
                                }}
                            >
                                <div className="shrink-0 transition-transform group-hover:scale-110">
                                    {suggestion.leading ? (
                                        suggestion.leading
                                    ) : suggestion.icon ? (
                                        <div
                                            className={cn(
                                                "flex size-9 items-center justify-center rounded-[12px]",
                                                suggestion.iconBg ?? "bg-stone-500/10 text-stone-200",
                                            )}
                                        >
                                            {suggestion.icon}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-1 items-center justify-between">
                                    <span className="text-base font-semibold text-foreground">{suggestion.label}</span>
                                    {suggestion.price && (
                                        <span className="font-mono text-sm text-muted-foreground">{suggestion.price}</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
