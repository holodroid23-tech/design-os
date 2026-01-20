import * as React from "react"
import { XIcon } from "lucide-react"

import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "./bottom-sliding-modal"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { SystemIcon } from "./icon"
import { SectionTitle } from "./section-title"
import { cn } from "@/lib/utils"

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
    <BottomSlidingModal open={open} onOpenChange={onOpenChange}>
      <BottomSlidingModalContent
        scaffoldProps={{ bodyClassName: "overflow-hidden" }}
        header={
          <SectionTitle
            titleAs="h2"
            trailing={
              <BottomSlidingModalClose asChild>
                <Button variant="invisible" size="icon" aria-label="Close">
                  <SystemIcon icon={XIcon} />
                </Button>
              </BottomSlidingModalClose>
            }
          >
            {title}
          </SectionTitle>
        }
        footer={
          multiple ? (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Done
            </Button>
          ) : undefined
        }
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1">
            <div
              ref={scrollContainerRef}
              className={cn(
                "min-h-0 h-full overflow-y-auto scroll-smooth",
                !multiple && "snap-y snap-mandatory"
              )}
            >
              <div className={cn("py-2", !multiple && "py-[calc(30vh/2-22px)]")}>
                {options.map((option) => {
                  const isSelected = multiple
                    ? (Array.isArray(selectedValue) && selectedValue.includes(option.value))
                    : option.value === selectedValue

                  return (
                    <button
                      key={option.value}
                      ref={!multiple && isSelected ? selectedItemRef : null}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full flex items-center transition-colors",
                        multiple
                          ? "px-6 py-3 border-b border-border/40 last:border-0 hover:bg-accent/50"
                          : "h-11 justify-center snap-center hover:bg-accent/50"
                      )}
                    >
                      {multiple && (
                        <Checkbox
                          checked={isSelected}
                          className="mr-3"
                          onCheckedChange={() => handleSelect(option.value)}
                        />
                      )}
                      <span
                        className={cn(
                          "text-base font-normal truncate",
                          isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Edge masks: ensure list items fully tuck away while scrolling */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-background to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-background to-transparent"
            />
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}
