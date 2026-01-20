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
    - [Button] Confirm PIN (always available; shows error until 4 digits entered)

## Implementation Blocks (The Roadmap)
- [Block 1: Top actions]: Single exit action for leaving the PIN creation flow.
- [Block 2: Header]: Status icon, title, and supporting description.
- [Block 3: PIN entry]: PIN display + numeric keypad + delete/backspace.
- [Block 4: Primary CTA]: Confirm PIN action.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| PIN creation screen scaffold (canonical) | `@/components/ui/pin-entry-screen` | `icon={Lock}` `title="Create your PIN"` `description="Enter a 4-digit code to secure your account profile."` `length={4}` `visible` `onClose` `primaryLabel="Confirm PIN"` `onPrimary` `value` `onChange` |

### Notes / Constraints (verified against source props)
- Canonical composition is centralized in `PinEntryScreen` (`src/components/ui/pin-entry-screen.tsx`) to ensure a single shared layout for all PIN flows.
- `PinEntryScreen` composes `PinEntry` with `showHandle={false}`, `showTitle={false}`, `showDescription={false}`, `showCancelKey={false}`, `pinDisplayVariant="circles"`, to keep the header + actions consistent across screens.

