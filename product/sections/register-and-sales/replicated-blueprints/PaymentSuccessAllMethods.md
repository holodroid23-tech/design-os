# PaymentSuccessAllMethods Blueprint

## Logic Tree
- [Screen: Payment successful]
  - [Header]
    - Close button (dismiss screen)
  - [Body]
    - Success status symbol
    - Title: "Payment successful"
    - Context line: "Transaction #8920 • Table 4"
    - Amount: "$24.00"
  - [Footer actions]
    - Secondary action button: "Print receipt"
      - Leading icon: printer
    - Primary action button: "Start new order"
      - Leading icon: plus

## Implementation Blocks (The Roadmap)
- [Block 1: Screen container]: Fullscreen layout wrapper with header (close), centered body content, and bottom action area.
- [Block 2: Header close action]: Top-right dismiss control.
- [Block 3: Status + summary]: Success symbol, title, context line, and amount in a centered stack.
- [Block 4: Footer actions]: Two large actions: secondary print + primary start new order.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Screen container | Primitive | `div` (fullscreen wrapper) |
| Close button | `@/components/ui/button` | `variant="invisible"` + `size="icon-lg"` + `shape="circle"` |
| Close icon | `@/components/atoms/icon` | `SystemIcon` with `icon={X}` |
| Success status symbol | `@/components/atoms/icon` | `IconTile` with `icon={Check}` + `tone="success"` + `size="large"` |
| Print receipt button | `@/components/ui/button` | `variant="ghost"` + `size="lg"` |
| Print receipt leading icon | `@/components/atoms/icon` | `SystemIcon` with `icon={Printer}` |
| Start new order button | `@/components/ui/button` | `variant="default"` + `size="lg"` |
| Start new order leading icon | `@/components/atoms/icon` | `SystemIcon` with `icon={Plus}` |

