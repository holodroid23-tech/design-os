# RefundModal Blueprint

## Logic Tree
- [Modal] Refund order
  - [Header]
    - [Title] Refund order
  - [Form]
    - [Field] Reason for refund
      - [Multiline text input] Placeholder: "e.g. Customer changed mind, incorrect item prepared, or quality issue..."
    - [Field] Refund method
      - [Single selection group]
        - [Option] Cash
        - [Option] Card
  - [Footer actions]
    - [Button] Cancel (closes modal)
    - [Button] Confirm refund (submits refund)

## Implementation Blocks (The Roadmap)
- Modal scaffold: Dialog root, centered content, title
- Refund reason field: label + multiline input, value binding
- Refund method field: label + single-selection group, value binding
- Action row: cancel/confirm actions wired to callbacks

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Modal root | `@/components/ui/dialog` | `Dialog` with `open` / `onOpenChange` |
| Modal content (centered) | `@/components/ui/dialog` | `DialogContent` (set `showCloseButton={false}`) |
| Modal header/title | `@/components/ui/dialog` | `DialogHeader` + `DialogTitle` |
| Field label | `@/components/ui/label` | `Label` |
| Reason multiline input | `@/components/ui/textarea` | `Textarea` (`variant="default"`, `value`, `onChange`) |
| Refund method selection group | `@/components/ui/radio-button-group` | `RadioButtonGroup` (`value`, `onValueChange`) |
| Refund method option | `@/components/ui/radio-button-group` | `RadioButtonGroupItem` (`variant="default"`, `size="default"`) |
| Footer actions layout | `@/components/ui/dialog` | `DialogFooter` |
| Cancel action | `@/components/ui/button` | `Button` (`variant="secondary"`, `type="button"`) |
| Confirm refund action | `@/components/ui/button` | `Button` (`variant="destructive"`, `type="button"`) |

