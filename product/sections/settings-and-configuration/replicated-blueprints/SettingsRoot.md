# SettingsRoot Blueprint

## Logic Tree
- [Page title]
  - Settings
- [Primary profile destination]
  - User profile row (destination)
    - Name: Ghhh
    - Badge: Admin
    - Email: holodroid23@gmail.com
    - Status: Online
- [Settings destinations]
  - Group: Business areas
    - Row: Inventory (destination)
    - Row: Expenses (destination)
  - Group: Configuration
    - Row: General (destination)
    - Row: Users (destination)
    - Row: Payment (destination)
    - Row: Printer (destination)
    - Row: Receipt (destination)
    - Row: Device mode (destination)
  - Group: Feedback
    - Row: Suggest feature (destination)
    - Row: Report bug (destination)
- [Session action]
  - Row: Log out (action)
- [Footer meta]
  - Version 2.4.1 (build 89)

## Implementation Blocks (The Roadmap)
- [Block 1: Header]: Render the page title "Settings".
- [Block 2: Profile destination]: Render a single destination row showing current user identity and role.
- [Block 3: Settings destinations]: Render three destination groups (business areas, configuration, feedback) where each row navigates to another screen.
- [Block 4: Session action]: Render a single destructive action row for logging out.
- [Block 5: Footer meta]: Render the app version/build string.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Page title: Settings | @/components/ui/section-title | size="page" |
| Profile destination row | @/components/settings/user-profile-row | name="Ghhh" email="holodroid23@gmail.com" showBadge={true} badgeText="Admin" status="online" |
| Group container (all destination groups) | @/components/settings/settings-group | (children receive separators automatically) |
| Destination row wrapper | @/components/settings/settings-item | (button) |
| Destination row leading icon | @/components/atoms/icon | `IconTile` (tone="neutral", size="small", variant="tile") + `icon={...}` |
| Destination row text | @/components/settings/settings-item | `SettingsItemContent` + `SettingsItemTitle` |
| Destination row trailing indicator | @/components/settings/settings-item | `SettingsItemAction` + `ChevronRight` (lucide-react) |
| Log out row (action) | @/components/settings/settings-item | `SettingsItemTitle` variant="destructive" |
| Log out leading icon | @/components/atoms/icon | `IconTile` tone="danger" size="small" variant="tile" + `icon={...}` |
| Footer meta | (native) | `<div>` / `<span>` with content "Version 2.4.1 (build 89)" |

