import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { Calendar } from "./calendar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./sheet"
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
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
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="h-[18px] w-[18px]" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-0 flex flex-col max-h-[80vh]" showCloseButton={false}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Select Date</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-accent rounded-sm transition-colors"
          >
            <X className="h-[18px] w-[18px] text-muted-foreground" />
          </button>
        </div>

        {/* Calendar */}
        <div className="flex items-center justify-center py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
