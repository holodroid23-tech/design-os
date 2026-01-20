# CardPaymentConfirmation Blueprint

## Logic Tree
- [Modal: Confirm card payment record]
  - [Header]
    - Title: "Confirm card payment record"
    - Close button (dismiss modal)
  - [Body]
    - Prompt: "Are you sure you want to process the payment?"
    - Amount: "$24.00"
    - Payment method summary
      - Leading icon (represents card payment)
      - Label: "Method: Card (External terminal)"
      - Supporting note: "Payment is processed by external terminal"
  - [Footer actions]
    - Secondary action button: "Cancel"
    - Primary action button: "Pay"

## Implementation Blocks (The Roadmap)
- [Block 1: Modal container]: Dialog root + overlay + content wrapper for a simple confirmation modal.
- [Block 2: Header]: Title and a dismiss control.
- [Block 3: Confirmation summary]: Prompt, amount, and the payment method summary with supporting note.
- [Block 4: Footer actions]: Two actions: cancel (secondary) and pay (primary).

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Modal root | `@/components/ui/dialog` | `Dialog` + `DialogContent` (use `showCloseButton={false}` to render a custom close control) |
| Modal title | `@/components/ui/section-title` | `SectionTitle` (default `size="section"`, `titleAs="h2"`) |
| Close button | `@/components/ui/button` | `variant="invisible"` + `size="icon-lg"` + `shape="circle"` |
| Close icon | `@/components/atoms/icon` | `SystemIcon` with `icon={XIcon}` |
| Prompt text | Primitive | `p` |
| Amount | `@/components/ui/section-title` | `size="page"` + `titleAs="div"` |
| Method icon | `@/components/atoms/icon` | `SystemIcon` (icon represents card payment) |
| Method label | Primitive | Inline text node (e.g., `span`) with content `Method: Card (External terminal)` |
| Supporting note | Primitive | `p` with content `Payment is processed by external terminal` |
| Cancel button | `@/components/ui/button` | `variant="secondary"` + `size="lg"` |
| Pay button | `@/components/ui/button` | `variant="default"` + `size="lg"` |

