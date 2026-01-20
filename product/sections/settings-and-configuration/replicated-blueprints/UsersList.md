# UsersList Blueprint

## Logic Tree
- [Screen] User management
  - [Header row]
    - [Back action] Navigate back
    - [Title] "User management"
  - [Primary action]
    - [Button] "Add new user" (starts the add user flow)
  - [User list]
    - [Destination row] Sarah Jenkins
      - [Leading avatar] Initials "SJ"
      - [Primary text] "Sarah Jenkins"
      - [Secondary text with role icon] "Administrator"
      - [Trailing] Navigation indicator
    - [Destination row] Mike Ross
      - [Leading avatar] Initials "MR"
      - [Primary text] "Mike Ross"
      - [Secondary text with role icon] "Manager"
      - [Trailing] Navigation indicator
    - [Destination row] Anna Lee
      - [Leading avatar] Initials "AL"
      - [Primary text] "Anna Lee"
      - [Secondary text with role icon] "Cashier"
      - [Trailing] Navigation indicator
    - [Destination row] John Doe
      - [Leading avatar] Initials "JD"
      - [Primary text] "John Doe"
      - [Secondary text with role icon] "Cashier"
      - [Trailing] Navigation indicator
    - [Invitation row] David Smith
      - [Leading avatar] Initials "DS"
      - [Primary text] "David Smith"
      - [Secondary text with role icon] "Cashier"
      - [Status] "Pending"
      - [Inline action] "Resend" (re-sends invitation)

## Implementation Blocks (The Roadmap)
- [Block 1: Header]: Back button + page title.
- [Block 2: Primary action]: Full-width "Add new user" button.
- [Block 3: User rows]: Vertical list of destination rows (tap row → user detail).
- [Block 4: Pending invitation row]: Same row structure, plus a status badge and a nested "Resend" action.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Page title | `@/components/ui/section-title` | `size="page"` |
| Back action | `@/components/ui/button` | `variant="ghost" size="icon"` + `ChevronLeft` icon |
| Primary action button | `@/components/ui/button` | `variant="default" size="lg"` + leading `Plus` icon, `className="w-full"` |
| User row container (card per row) | `@/components/settings/settings-group` | Wrap each row in its own `SettingsGroup` |
| Row root (destination rows) | `@/components/settings/settings-item` | `element="button"` (default), `onPress` for navigation |
| Row root (invitation row with nested action) | `@/components/settings/settings-item` | `element="div" interactive={false}` to allow nested `Button` (avoid button-in-button) |
| Leading avatar | `@/components/ui/avatar` | `size="large"`; `AvatarFallback` shows initials (optional `variant` provided by data) |
| Row title text | `@/components/settings/settings-item` (`SettingsItemTitle`) | Default |
| Row secondary text | `@/components/settings/settings-item` (`SettingsItemDescription`) | Default (`size="small"`) |
| Role icon (next to role label) | `@/components/ui/icon` (`SystemIcon`) | `size="small"` + role-specific `lucide-react` icon |
| Trailing navigation indicator | `@/components/ui/icon` (`SystemIcon`) | `size="regular"` + `ChevronRight` icon (inside `SettingsItemAction`) |
| Pending status | `@/components/ui/badge` | `variant="warning"` with text "Pending" |
| Resend action | `@/components/ui/button` | `variant="ghost" size="sm"` with text "Resend" (inside `SettingsItemAction`) |

