import * as React from "react"
import { ChevronDown } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { setMonth, setYear } from "date-fns"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"
import { SlidingSelector } from "./sliding-selector"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonthState] = React.useState<Date>(
    props.month || props.defaultMonth || new Date()
  )

  // Sync month state when selected date changes
  React.useEffect(() => {
    // @ts-expect-error - react-day-picker types vary by version
    if (props.selected && typeof props.selected === 'object' && 'getMonth' in props.selected) {
      const selectedDate = props.selected as Date
      if (selectedDate.getMonth() !== month.getMonth() || selectedDate.getFullYear() !== month.getFullYear()) {
        setMonthState(selectedDate)
      }
    }
  }, [props.selected, month])

  // Generate years (100 years range: 50 years before and after current year)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    const years: number[] = []
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i)
    }
    return years
  }, [])

  const handleMonthChange = (newMonth: number) => {
    const newDate = setMonth(month, newMonth)
    setMonthState(newDate)
  }

  const handleYearChange = (newYear: number) => {
    const newDate = setYear(month, newYear)
    setMonthState(newDate)
  }

  // Custom Caption component with sliding selectors
  const CustomCaption = ({ calendarMonth }: { calendarMonth: { date: Date; displayIndex: number } }) => {
    const displayMonth = calendarMonth.date
    const displayYear = displayMonth.getFullYear()
    const displayMonthIndex = displayMonth.getMonth()
    const [monthSelectorOpen, setMonthSelectorOpen] = React.useState(false)
    const [yearSelectorOpen, setYearSelectorOpen] = React.useState(false)

    const monthOptions = MONTHS.map((monthName, index) => ({
      value: index,
      label: monthName,
    }))

    const yearOptions = years.map((year) => ({
      value: year,
      label: year.toString(),
    }))

    return (
      <div className="flex items-center justify-center gap-2 py-2 mb-3 w-full">
        <button
          type="button"
          onClick={() => setMonthSelectorOpen(true)}
          className={cn(
            "bg-background dark:bg-input/30 border-input h-8 rounded-md border px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none font-medium flex items-center gap-2",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          )}
        >
          <span>{MONTHS[displayMonthIndex]}</span>
          <ChevronDown className="h-[18px] w-[18px] opacity-50" />
        </button>

        <SlidingSelector
          open={monthSelectorOpen}
          onOpenChange={setMonthSelectorOpen}
          title="Select Month"
          options={monthOptions}
          selectedValue={displayMonthIndex}
          onSelect={(value) => handleMonthChange(value as number)}
        />

        <button
          type="button"
          onClick={() => setYearSelectorOpen(true)}
          className={cn(
            "bg-background dark:bg-input/30 border-input h-8 rounded-md border px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none font-medium flex items-center gap-2",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          )}
        >
          <span>{displayYear}</span>
          <ChevronDown className="h-[18px] w-[18px] opacity-50" />
        </button>

        <SlidingSelector
          open={yearSelectorOpen}
          onOpenChange={setYearSelectorOpen}
          title="Select Year"
          options={yearOptions}
          selectedValue={displayYear}
          onSelect={(value) => handleYearChange(value as number)}
        />
      </div>
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={month}
      onMonthChange={setMonthState}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "hidden",
        nav: "hidden",
        table: "w-full",
        head_row: "",
        head_cell:
          "text-muted-foreground w-11 h-11 font-normal text-[0.8rem] text-center align-middle p-0",
        row: "",
        cell: "w-11 h-11 text-center text-sm p-0 align-middle relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-11 w-11 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        // @ts-expect-error - react-day-picker types vary by version
        MonthCaption: CustomCaption,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
