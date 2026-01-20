# CreateNewPin Blueprint

## Logic Tree
- [Screen] Create new PIN
  - [Top action]
    - [Icon button] Exit
  - [Header]
    - [Status icon] Lock
    - [Title] Create your PIN
    - [Description] Enter a 4-digit code to secure your account profile.
  - [PIN entry]
    - [PIN display] 4-digit PIN (digits visible)
    - [Numeric keypad] Digits 0–9
    - [Edit control] Delete last digit
  - [Primary action]
    - [Button] Confirm PIN (enabled when 4 digits entered)

## Implementation Blocks (The Roadmap)
- [Block 1: Top actions]: Single exit action for leaving the PIN creation flow.
- [Block 2: Header]: Status icon, title, and supporting description.
- [Block 3: PIN entry]: PIN display + numeric keypad + delete/backspace.
- [Block 4: Primary CTA]: Confirm PIN action.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Exit action (icon button) | `@/components/ui/button` | `variant="invisible"` `size="icon"` |
| Lock status icon | `@/components/atoms/icon` | `SystemIcon` with `icon={Lock}` (lucide) |
| PIN / Authorization keypad | `@/components/ui/pin-entry` | `title="Create your PIN"` `description="Enter a 4-digit code to secure your account profile."` `length={4}` `visible` `onCancel` `onComplete` `value?` `onChange?` |
| Confirm PIN | `@/components/ui/button` | `variant="default"` `size="lg"` |

### Notes / Constraints (verified against source props)
- `PinEntry` supports `title`, `description`, `length`, `visible`, `onComplete`, `onCancel`, `value`, and `onChange` as implemented in `src/components/ui/pin-entry.tsx`.
- `PinEntry` currently renders a built-in "Cancel" action inside the keypad. If the intended cancel/exit affordance must be icon-only and positioned elsewhere, `PinEntry` would need an API extension (e.g., `cancelLabel`, `hideCancel`) or a small internal layout change.

