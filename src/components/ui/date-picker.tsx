import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, XIcon } from "lucide-react"
import { Calendar } from "./calendar"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "./bottom-sliding-modal"
import { Button } from "./button"
import { SystemIcon } from "./icon"
import { SectionTitle } from "./section-title"
import { cn } from "../../lib/utils"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (newDate: Date | undefined) => {
    onDateChange?.(newDate)
    setOpen(false)
  }

  return (
    <BottomSlidingModal open={open} onOpenChange={setOpen}>
      <BottomSlidingModalTrigger asChild>
        <button
          className={cn(
            "bg-background dark:bg-input/30 border-input h-9 w-full rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "flex items-center justify-between text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? format(date, "MMM d, yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="h-[18px] w-[18px]" />
        </button>
      </BottomSlidingModalTrigger>

      <BottomSlidingModalContent
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
            Select date
          </SectionTitle>
        }
        scaffoldProps={{ bodyClassName: "overflow-y-auto" }}
      >
        <div className="flex items-center justify-center px-4 py-4">
          <div className="w-full max-w-sm">
            <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}
