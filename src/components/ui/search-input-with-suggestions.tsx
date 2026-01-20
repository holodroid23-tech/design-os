import * as React from "react"
import { Search, CupSoda, Utensils, Box, Coffee } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "./input"
import { IconTile, SystemIcon } from "../atoms/icon"

export interface SearchSuggestion {
    id: string
    label: string
    /**
     * Preferred: pass a DS-sized leading visual, e.g. `<IconTile size="small" ... />`
     * or `<ImageTile size="small" ... />` (36px).
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
    /**
     * Visual tone for embedding in dark "onLayer" surfaces (e.g. bottom sheets).
     */
    tone?: "default" | "onLayer"
    /**
     * Optional convenience callback for controlled usage.
     * When provided, it will be called on typing and when a suggestion is picked.
     */
    onValueChange?: (value: string) => void
}

export function SearchInputWithSuggestions({
    className,
    suggestions = [],
    onSuggestionClick,
    tone = "default",
    onValueChange,
    ...props
}: SearchInputWithSuggestionsProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [uncontrolledQuery, setUncontrolledQuery] = React.useState("")

    const isControlled = props.value !== undefined
    const query = (isControlled ? String(props.value ?? "") : uncontrolledQuery)

    // Default suggestions from the Design System
    const defaultSuggestions: SearchSuggestion[] = [
        {
            id: "1",
            label: "Macchiato",
            leading: <IconTile icon={Coffee} size="small" tone="info" />,
            price: "$3.75",
        },
        {
            id: "2",
            label: "Cappuccino",
            leading: <IconTile icon={Coffee} size="small" tone="recent" />,
            price: "$4.50",
        },
        {
            id: "3",
            label: "Iced Matcha",
            leading: <IconTile icon={CupSoda} size="small" tone="success" />,
            price: "$11.00",
        },
        {
            id: "4",
            label: "Avocado Toast",
            leading: <IconTile icon={Utensils} size="small" tone="success" />,
            price: "$12.00",
        },
        {
            id: "5",
            label: "Sparkling Water",
            leading: <IconTile icon={Box} size="small" tone="neutral" />,
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
                    size="regular"
                    className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 size-4",
                        tone === "onLayer" ? "text-onLayer-secondary" : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                />
                <Input
                    className={cn(
                        // Default DS input sizing (avoid forcing oversized height).
                        "pl-10",
                        className
                    )}
                    value={query}
                    onChange={(e) => {
                        if (!isControlled) setUncontrolledQuery(e.target.value)
                        onValueChange?.(e.target.value)
                        props.onChange?.(e)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    {...props}
                />
            </div>

            {isOpen && filteredSuggestions.length > 0 && (
                <div
                    className={cn(
                        "absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-md border shadow-xs animate-in fade-in zoom-in-95 duration-200",
                        tone === "onLayer"
                            ? "border-border-inverse bg-layer-1 text-onLayer-primary"
                            : "border-input bg-popover text-popover-foreground"
                    )}
                >
                    <div className="flex flex-col">
                        {filteredSuggestions.map((suggestion) => (
                            <button
                                key={suggestion.id}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 text-left transition-colors first:pt-5 last:pb-5 group",
                                    tone === "onLayer" ? "hover:bg-layer-2" : "hover:bg-accent"
                                )}
                                onClick={() => {
                                    if (!isControlled) setUncontrolledQuery(suggestion.label)
                                    onValueChange?.(suggestion.label)
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
                                                suggestion.iconBg ?? "bg-layer-level-2 text-onLayer-primary",
                                            )}
                                        >
                                            {suggestion.icon}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-1 items-center justify-between">
                                    <span
                                        className={cn(
                                            "text-base font-semibold",
                                            tone === "onLayer" ? "text-onLayer-primary" : "text-foreground"
                                        )}
                                    >
                                        {suggestion.label}
                                    </span>
                                    {suggestion.price && (
                                        <span
                                            className={cn(
                                                "font-mono text-sm",
                                                tone === "onLayer" ? "text-onLayer-secondary" : "text-muted-foreground"
                                            )}
                                        >
                                            {suggestion.price}
                                        </span>
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
