# CashPaymentConfirmation Blueprint

## Logic Tree
- [Modal: Confirm cash payment]
  - [Header]
    - Title: "Confirm cash payment"
    - Close button (dismiss modal)
  - [Body]
    - Prompt: "Are you sure you want to process the payment?"
    - Amount: "$24.00"
    - Payment method row
      - Leading icon (represents cash payment)
      - Label: "Method: Cash"
  - [Footer actions]
    - Secondary action button: "Cancel"
    - Primary action button: "Pay"

## Implementation Blocks (The Roadmap)
- [Block 1: Modal container]: Dialog root + overlay + content wrapper for a simple confirmation modal.
- [Block 2: Header]: Title and a dismiss control.
- [Block 3: Confirmation summary]: Prompt text, amount, and a single method row showing the payment method.
- [Block 4: Footer actions]: Two actions: cancel (secondary) and pay (primary).

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Modal root | `@/components/ui/dialog` | `Dialog` + `DialogContent` (use `showCloseButton={false}` to render a custom close control) |
| Modal title | `@/components/ui/section-title` | `SectionTitle` (default `size="section"`, `titleAs="h2"`) |
| Header separator (optional boundary) | `@/components/ui/separator` | `Separator` (default horizontal) |
| Close button | `@/components/ui/button` | `variant="invisible"` + `size="icon-lg"` + `shape="circle"` |
| Close icon | `@/components/atoms/icon` | `SystemIcon` with `icon={X}` |
| Prompt text | Primitive | `p` |
| Amount | `@/components/ui/section-title` | `size="page"` + `titleAs="div"` |
| Method icon | `@/components/atoms/icon` | `SystemIcon` (icon represents cash payment) |
| Method label | Primitive | Inline text node (e.g., `span`) with content `Method: Cash` |
| Cancel action | `@/components/ui/button` | `variant="secondary"` + `size="lg"` |
| Pay action | `@/components/ui/button` | `variant="default"` + `size="lg"` |
