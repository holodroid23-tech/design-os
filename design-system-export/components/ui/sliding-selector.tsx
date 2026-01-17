import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { Button } from "./button"
import { cn } from "../../lib/utils"

import { Checkbox } from "./checkbox"

interface SlidingSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  options: Array<{ value: string | number; label: string }>
  selectedValue: string | number | (string | number)[]
  onSelect: (value: any) => void
  multiple?: boolean
}

export function SlidingSelector({
  open,
  onOpenChange,
  title,
  options,
  selectedValue,
  onSelect,
  multiple = false,
}: SlidingSelectorProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const selectedItemRef = React.useRef<HTMLButtonElement>(null)

  // Scroll to selected item when opened (only for single select)
  React.useEffect(() => {
    if (open && !multiple && selectedItemRef.current && scrollContainerRef.current) {
      const timeoutId = setTimeout(() => {
        const container = scrollContainerRef.current
        const selectedItem = selectedItemRef.current

        if (container && selectedItem) {
          const containerHeight = container.clientHeight
          const itemHeight = selectedItem.offsetHeight
          const scrollPosition = selectedItem.offsetTop - (containerHeight / 2) + (itemHeight / 2)

          container.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth',
          })
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [open, selectedValue, multiple])

  const handleSelect = (value: string | number) => {
    if (multiple) {
      const currentSelected = Array.isArray(selectedValue) ? selectedValue : []
      const isSelected = currentSelected.includes(value)

      let newSelected
      if (isSelected) {
        newSelected = currentSelected.filter(v => v !== value)
      } else {
        newSelected = [...currentSelected, value]
      }
      onSelect(newSelected)
    } else {
      onSelect(value)
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0 flex flex-col max-h-[60vh]">
        <SheetHeader className="px-4 py-3 border-b border-stone-200 dark:border-stone-700 flex-shrink-0">
          <SheetTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {title}
          </SheetTitle>
        </SheetHeader>

        <div className="relative flex-1 flex flex-col min-h-0">
          {/* Scrollable options list */}
          <div
            ref={scrollContainerRef}
            className={cn(
              "flex-1 overflow-y-auto scroll-smooth",
              !multiple && "snap-y snap-mandatory"
            )}
            style={!multiple ? { scrollSnapType: 'y mandatory' } : undefined}
          >
            <div className={cn("py-2", !multiple && "py-[calc(30vh/2-22px)]")}>
              {options.map((option) => {
                const isSelected = multiple
                  ? (Array.isArray(selectedValue) && selectedValue.includes(option.value))
                  : option.value === selectedValue

                return (
                  <button
                    key={option.value}
                    ref={(!multiple && isSelected) ? selectedItemRef : null}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full flex items-center transition-colors",
                      multiple
                        ? "px-4 py-3 border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/50"
                        : "h-11 justify-center snap-center hover:bg-stone-100 dark:hover:bg-stone-800"
                    )}
                    style={!multiple ? { scrollSnapAlign: 'center' } : undefined}
                  >
                    {multiple && (
                      <Checkbox
                        checked={isSelected}
                        className="mr-3"
                        onCheckedChange={() => handleSelect(option.value)}
                      />
                    )}
                    <span className={cn(
                      "text-base font-normal truncate",
                      isSelected
                        ? "text-stone-900 dark:text-stone-50 font-medium"
                        : "text-stone-600 dark:text-stone-400"
                    )}>
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Done button - Only for multiple selection */}
        {multiple && (
          <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Done
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
