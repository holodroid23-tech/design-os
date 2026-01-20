# PaymentFailedTapToPay Blueprint

## Logic Tree
- [Screen] Payment attempt result (failure)
  - [Dismiss control] Close
  - [Status summary]
    - [Status icon] Failure indicator
    - [Title] Payment failed
    - [Context line] Transaction #8920 • Table 4
    - [Reason] Card declined by bank
    - [Amount] $24.00
  - [Actions]
    - [Secondary action] Change payment method
    - [Primary action] Retry payment

## Implementation Blocks (The Roadmap)
- [Header controls]: Dismiss control that exits the failure view.
- [Status summary]: Failure indicator, title, transaction context, decline reason, and amount.
- [Footer actions]: Two explicit actions; change the payment method or retry the payment.
- [Accessibility & focus]: Dismiss control has an accessible name; actions are keyboard reachable in a predictable order.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Dismiss control | @/components/ui/button | variant="invisible" size="icon-lg" shape="circle" aria-label="Close" |
| Dismiss icon | @/components/ui/icon | SystemIcon icon={XIcon} size="big" aria-hidden="true" |
| Status icon tile | @/components/ui/icon | IconTile icon={XCircle} size="large" tone="danger" |
| Title | (native) | h1 |
| Context line | (native) | p |
| Reason | (native) | p |
| Amount | (native) | output (or div) with text "$24.00" |
| Secondary action button | @/components/ui/button | variant="ghost" size="lg" |
| Secondary action icon | @/components/ui/icon | SystemIcon icon={CreditCard} size="regular" aria-hidden="true" |
| Primary action button | @/components/ui/button | variant="default" size="lg" |
| Primary action icon | @/components/ui/icon | SystemIcon icon={RotateCw} size="regular" aria-hidden="true" |

