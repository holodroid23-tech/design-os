# UsersCreateRoleBreakdown Blueprint

## Logic Tree
- [Modal: Bottom sheet]
  - [Header]
    - Title: "User roles"
    - Action: Close
  - [Body: Scrollable]
    - [Role summary: Administrator]
      - Leading: Role icon tile
      - Title: "Administrator"
      - Description: "God mode. Full system access."
    - [Role summary: Manager]
      - Leading: Role icon tile
      - Title: "Manager"
      - Description: "Daily operations focus."
      - [Capability breakdown: Status list]
        - Allowed: "Update inventory levels & stock alerts"
        - Allowed: "View operational performance dashboards"
        - Allowed: "Full access to back office"
        - Allowed: "Refund yesterday and older orders"
        - Allowed: "Edit and delete yesterday and older expenses"
        - Allowed: "Access settings"
        - Restricted: "Restricted from payment, user settings, and account deletion"
    - [Role summary: Cashier]
      - Leading: Role icon tile
      - Title: "Cashier"
      - Description: "Register focus. Strictly for processing sales."
      - [Capability breakdown: Status list]
        - Allowed: "Refund and edit today's expenses"
        - Restricted: "No access to back office"
        - Restricted: "Cannot edit or delete yesterday and older expenses"
        - Restricted: "Cannot refund yesterday and older orders"

## Implementation Blocks (The Roadmap)
- [Block 1: Modal container]: Bottom sliding modal with overlay and pinned header.
- [Block 2: Header row]: Title ("User roles") with close action.
- [Block 3: Role summaries]: Three non-interactive role rows separated by dividers.
- [Block 4: Capability breakdown cards]: Read-only status lists for Manager and Cashier.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal wrapper | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal defaultOpen` + `BottomSlidingModalContent` |
| Header title row | `@/components/ui/section-title` | `SectionTitle size="section" titleAs="h2" trailing={...}` |
| Close action | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` + `@/components/ui/icon` | `BottomSlidingModalClose asChild` wrapping `Button variant="invisible" size="icon"` with `SystemIcon icon={XIcon}` |
| Role summary row (read-only row layout) | `@/components/settings/settings-item` | `SettingsItem element="div"` |
| Role icon tile | `@/components/atoms/icon` | `IconTile size="medium" variant="tile" tone="recent" | "info" | "success"` |
| Role title | `@/components/settings/settings-item` | `SettingsItemTitle` |
| Role description | `@/components/settings/settings-item` | `SettingsItemDescription size="small" tone="default"` |
| Row separators between roles | `@/components/ui/separator` | `Separator` |
| Capability breakdown container | `@/components/ui/card` | `Card` + `CardContent` |
| Capability status icon | `@/components/ui/icon` | `SystemIcon icon={...} size="regular"` |
| Capability row text | (native) | `<span>` or `<p>` (plain text node) |

