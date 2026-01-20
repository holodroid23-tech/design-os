# CreateExpense Blueprint

## Logic Tree
- [Bottom sliding modal] Create expense
  - [Header]
    - [Title] "Create expense"
    - [Dismiss action] Close
  - [Form]
    - [Field] Date
      - [Date picker trigger] Shows selected date (default shown in mock)
      - [Date picker modal] Choose a date, then returns to form
    - [Field] Name
      - [Text input] Placeholder: "e.g. Milk, Repair"
    - [Field] Price
      - [Currency display] $0.00 style
      - [Numpad] Digits 0-9 + decimal + backspace/clear
    - [Field] Tax
      - [Single selection group]
        - [Option] 0%
        - [Option] 10%
        - [Option] 21%
    - [Field] Note
      - [Multiline text input] Placeholder: "Additional details..."
  - [Footer]
    - [Primary action] "Save expense"

## Implementation Blocks (The Roadmap)
- [Modal container]: Fullscreen bottom sheet container that can be dismissed.
- [Header row]: Title + close action.
- [Date row]: Label + date picker trigger that opens a date selection bottom sheet.
- [Name row]: Label + text input for expense name.
- [Price block]: Label + currency display with numpad input.
- [Tax block]: Label + 3-option single-selection buttons for 0/10/21%.
- [Note row]: Label + multiline input.
- [Footer action]: Primary submit button ("Save expense").

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal container | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal defaultOpen` + `BottomSlidingModalContent` |
| Header title row | `@/components/ui/section-title` | `titleAs="h1"` with `trailing` for the close action |
| Close action | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` + `@/components/ui/icon` | `BottomSlidingModalClose asChild` wrapping `Button variant="invisible" size="icon"` with `SystemIcon icon={XIcon}` |
| Field label ("Date", "Name", "Price", "Tax", "Note") | `@/components/ui/label` | `Label` (no variants) |
| Date picker | `@/components/ui/date-picker` | `DatePicker date/onDateChange` (opens its own bottom sheet calendar) |
| Name text input | `@/components/ui/input` | `Input placeholder/value/onChange` |
| Price currency entry | `@/components/ui/numpad` | `Numpad value/onChange isCurrency label=""` |
| Tax selection | `@/components/ui/radio-button-group` | `RadioButtonGroup value/onValueChange` + `RadioButtonGroupItem` (default variant) |
| Note multiline input | `@/components/ui/textarea` | `Textarea placeholder/value/onChange` |
| Primary action ("Save expense") | `@/components/ui/button` | `Button variant="default" size="lg" className="w-full"` |

