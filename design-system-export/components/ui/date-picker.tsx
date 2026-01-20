import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, XIcon } from "lucide-react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
} from "./bottom-sliding-modal"
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
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-between text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="h-[18px] w-[18px]" />
        </Button>
      </BottomSlidingModalTrigger>

      <BottomSlidingModalContent
        header={
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-foreground font-semibold leading-tight text-lg">Select date</h2>
            <BottomSlidingModalClose asChild>
              <Button variant="invisible" size="icon" aria-label="Close">
                <XIcon className="size-4" />
              </Button>
            </BottomSlidingModalClose>
          </div>
        }
      >
        <div className="flex items-center justify-center py-4">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}
