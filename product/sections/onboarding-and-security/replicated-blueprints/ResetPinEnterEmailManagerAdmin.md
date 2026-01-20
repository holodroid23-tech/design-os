# ResetPinEnterEmailManagerAdmin Blueprint

## Logic Tree
- [Screen]
  - [Dismiss control]
    - Action: Close
  - [Primary message]
    - [Status icon] Icon: lock
    - Title: Reset your PIN
    - Description: Enter your manager/administrator email to receive a recovery link.
  - [Form]
    - Field label: Email address
    - Email input (single line)
      - Placeholder: admin@coffeeshop.com
  - [Primary action]
    - Button: Send reset link

## Implementation Blocks (The Roadmap)
- [Block 1] Dismiss: a single close action that exits this screen.
- [Block 2] Primary message: status icon + title + supporting description.
- [Block 3] Email field: label + single email input.
- [Block 4] Primary action: prominent submit button for sending the reset link.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Close action (top-right) | `@/components/ui/button` | `variant="invisible"`, `size="icon"`, `shape="circle"` (child icon: `XIcon` from `lucide-react`) |
| Status icon (lock) | `@/components/ui/icon` | `IconTile` with `icon={Lock}` (from `lucide-react`), `size="large"` |
| Field label ("Email address") | `@/components/ui/label` | `htmlFor="[email-input-id]"` |
| Email input | `@/components/ui/input` | `type="email"`, `variant="default"`, `placeholder="admin@coffeeshop.com"` |
| Primary action ("Send reset link") | `@/components/ui/button` | `variant="default"`, `size="lg"` |
