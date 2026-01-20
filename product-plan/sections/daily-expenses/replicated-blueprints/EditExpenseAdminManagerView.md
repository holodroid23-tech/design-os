# EditExpenseAdminManagerView Blueprint

## Logic Tree
- [Bottom sliding modal] Edit expense
  - [Header]
    - [Title] "Edit expense"
    - [Dismiss action] Close
  - [Form]
    - [Field] Name
      - [Text input] Prefilled value (e.g. "Whole Milk")
    - [Field] Price
      - [Currency display] Prefilled value (e.g. $4.50)
      - [Numpad] Digits 0-9 + decimal + backspace/clear
    - [Field] Tax
      - [Single selection group]
        - [Option] 0%
        - [Option] 10%
        - [Option] 21%
    - [Field] Note
      - [Multiline text input] Placeholder: "Additional details..."
  - [Footer]
    - [Primary action] "Save changes"
    - [Danger action] Delete expense (trash icon)

## Implementation Blocks (The Roadmap)
- [Modal container]: Fullscreen bottom sheet container that can be dismissed.
- [Header row]: Title + close action.
- [Name row]: Label + text input (prefilled).
- [Price block]: Label + currency display with numpad input (prefilled).
- [Tax block]: Label + 3-option single-selection buttons for 0/10/21%.
- [Note row]: Label + multiline input.
- [Footer actions]: Primary submit button ("Save changes") + destructive icon button (trash) for delete.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal container | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal defaultOpen` + `BottomSlidingModalContent` |
| Header title row | `@/components/ui/section-title` | `titleAs="h1"` with `trailing` for the close action |
| Close action | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` + `@/components/ui/icon` | `BottomSlidingModalClose asChild` wrapping `Button variant="invisible" size="icon"` with `SystemIcon icon={XIcon}` |
| Field label ("Name", "Price", "Tax", "Note") | `@/components/ui/label` | `Label` (no variants) |
| Name text input | `@/components/ui/input` | `Input placeholder/value/onChange` |
| Price currency entry | `@/components/ui/numpad` | `Numpad value/onChange isCurrency label=""` |
| Tax selection | `@/components/ui/radio-button-group` | `RadioButtonGroup value/onValueChange` + `RadioButtonGroupItem` (default variant) |
| Note multiline input | `@/components/ui/textarea` | `Textarea placeholder/value/onChange` |
| Primary action ("Save changes") | `@/components/ui/button` | `Button variant="default" size="lg"` |
| Danger action (Delete expense icon) | `@/components/ui/button` | `Button variant="destructive" size="icon-lg" aria-label="Delete expense"` |

