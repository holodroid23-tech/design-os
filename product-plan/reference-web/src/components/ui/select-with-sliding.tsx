import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { SlidingSelector } from "./sliding-selector"
import { Button } from "./button"
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
    /**
     * Only applies when `variant="sliding"`.
     * - "picker": iOS-style centered picker (taller)
     * - "list": compact list (hugs content for short lists)
     */
    slidingPresentation?: "picker" | "list"
    /**
     * Only applies when `variant="sliding"`.
     * When false, removes the modal header (title/close).
     */
    slidingShowHeader?: boolean
}

export function SelectWithSliding({
    variant = "default",
    value,
    defaultValue,
    onValueChange,
    options,
    placeholder,
    disabled,
    slidingPresentation,
    slidingShowHeader,
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
                <Button
                    type="button"
                    variant="select"
                    disabled={disabled}
                    className="w-full justify-between"
                    onClick={() => !disabled && setOpen(true)}
                >
                    <span className="truncate">{selectedLabel}</span>
                    <ChevronDown className="size-4 opacity-50" />
                </Button>

                <SlidingSelector
                    open={open}
                    onOpenChange={setOpen}
                    title={placeholder || "Select an option"}
                    options={options}
                    selectedValue={value ?? internalValue ?? ""}
                    onSelect={handleValueChange}
                    presentation={slidingPresentation}
                    showHeader={slidingShowHeader}
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
