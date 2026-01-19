import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { SlidingSelector } from "./sliding-selector"
import { ChevronDown } from "lucide-react"

interface SelectOption {
    value: string | number
    label: string
}

interface SelectWithSlidingProps {
    variant?: "default" | "sliding"
    value?: string | number
    defaultValue?: string | number
    onValueChange?: (value: string | number) => void
    options: SelectOption[]
    placeholder?: string
    disabled?: boolean
}

export function SelectWithSliding({
    variant = "default",
    value,
    defaultValue,
    onValueChange,
    options,
    placeholder,
    disabled,
}: SelectWithSlidingProps) {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<string | number | undefined>(
        value ?? defaultValue
    )

    const selectedLabel = options.find(opt => opt.value === (value ?? internalValue))?.label || placeholder || "Select..."

    const handleValueChange = (newValue: string | number) => {
        if (value === undefined) {
            setInternalValue(newValue)
        }
        onValueChange?.(newValue)
    }

    if (variant === "sliding") {
        return (
            <>
                <button
                    onClick={() => !disabled && setOpen(true)}
                    disabled={disabled}
                    className="flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-2 text-sm whitespace-nowrap shadow-xs h-9 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{selectedLabel}</span>
                    <ChevronDown className="size-4 opacity-50" />
                </button>

                <SlidingSelector
                    open={open}
                    onOpenChange={setOpen}
                    title={placeholder || "Select an option"}
                    options={options}
                    selectedValue={value ?? internalValue ?? ""}
                    onSelect={handleValueChange}
                />
            </>
        )
    }

    // Default variant - classic dropdown
    return (
        <Select
            value={value !== undefined ? String(value) : undefined}
            defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
            onValueChange={(val) => handleValueChange(val)}
            disabled={disabled}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
