# SetNewPassword Blueprint

## Logic Tree
- [Screen]
  - [Dismiss control]
    - Action: "Close"
  - [Primary message]
    - [Status icon] Icon: lock
    - Title: "Set New Password"
    - Description: "Create a new password for your administrator account."
  - [Form]
    - Field label: "New password"
    - Password input (single line)
      - Placeholder: "••••••••"
      - Optional toggle: show/hide password
  - [Primary action]
    - Button: "Update Password"

## Implementation Blocks (The Roadmap)
- [Block 1] Dismiss: a single close action that exits this screen.
- [Block 2] Primary message: status icon + title + supporting description.
- [Block 3] Password field: label + password input with visibility toggle.
- [Block 4] Primary action: prominent submit button for updating the password.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Close action (top-right) | `@/components/ui/button` | `variant="invisible"`, `size="icon"` (child icon: `XIcon` from `lucide-react`) |
| Status icon (lock) | `@/components/ui/icon` | `IconTile` with `icon={Lock}` (from `lucide-react`), `size="large"`, `tone="info"` |
| Field label ("New password") | `@/components/ui/label` | `htmlFor="[password-input-id]"` |
| Password input | `@/components/ui/input` | `type="password"` and optional visibility toggle |
| Primary action ("Update Password") | `@/components/ui/button` | `variant="default"`, `size="lg"` |

