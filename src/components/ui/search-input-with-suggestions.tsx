import * as React from "react"
import { Search, CupSoda, Utensils, Box, Coffee } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "./input"

export interface SearchSuggestion {
    id: string
    label: string
    icon: React.ReactNode
    iconBg: string
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
            icon: <Coffee className="h-[18px] w-[18px]" />,
            iconBg: "bg-blue-500/10 text-blue-600",
            price: "$3.75",
        },
        {
            id: "2",
            label: "Cappuccino",
            icon: <Coffee className="h-[18px] w-[18px]" />,
            iconBg: "bg-purple-500/10 text-purple-600",
            price: "$4.50",
        },
        {
            id: "3",
            label: "Iced Matcha",
            icon: <CupSoda className="h-[18px] w-[18px]" />,
            iconBg: "bg-emerald-500/10 text-emerald-600",
            price: "$11.00",
        },
        {
            id: "4",
            label: "Avocado Toast",
            icon: <Utensils className="h-[18px] w-[18px]" />,
            iconBg: "bg-green-500/10 text-green-600",
            price: "$12.00",
        },
        {
            id: "5",
            label: "Sparkling Water",
            icon: <Box className="h-[18px] w-[18px]" />,
            iconBg: "bg-blue-500/10 text-blue-400",
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                                className="flex items-center gap-4 px-5 py-4 text-left hover:bg-accent transition-colors first:pt-5 last:pb-5 group"
                                onClick={() => {
                                    setQuery(suggestion.label)
                                    onSuggestionClick?.(suggestion)
                                    setIsOpen(false)
                                }}
                            >
                                <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110", suggestion.iconBg)}>
                                    {suggestion.icon}
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
