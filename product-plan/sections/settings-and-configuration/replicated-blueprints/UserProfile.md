# UserProfile Blueprint

## Logic Tree
- [Page] User profile
  - [Header]
    - Back action
    - Title: "User profile"
  - [Content]
    - [Identity fields]
      - [Field] Full name
        - Label: "Full name"
        - Role tag: "Admin"
        - Value (read-only): "Ghhh"
      - [Field] Email address
        - Label: "Email address"
        - Value (read-only): "holodroid23@gmail.com"
    - [Security]
      - Section label: "Security"
      - [Settings section navigation]
        - Row: "Change PIN" → destination screen
        - Row: "Change password" → destination screen

## Implementation Blocks (The Roadmap)
- [Header bar]: Back action + page title.
- [Identity section]: Two labeled read-only fields (full name with role tag, email address).
- [Security navigation]: SettingsGroup containing two destination rows.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Page title row | `@/components/ui/section-title` | `size="page"`, `titleAs="h1"`, `leading={...}` |
| Back action | `@/components/ui/button` | `variant="invisible"`, `size="icon"`, `onClick={onBack}` |
| Role tag | `@/components/ui/badge` | `variant="ghost"`; content `"Admin"` |
| Field label | `@/components/ui/label` | `htmlFor="fullName"`, `htmlFor="emailAddress"` |
| Full name value | `@/components/ui/input` | `id="fullName"`, `type="text"`, `variant="default"`, `readOnly`, `value="Ghhh"` |
| Email address value | `@/components/ui/input` | `id="emailAddress"`, `type="email"`, `variant="default"`, `readOnly`, `value="holodroid23@gmail.com"` |
| Security container | `@/components/settings/settings-group` | Default |
| Navigation row (destination) | `@/components/settings/settings-item` | Default (`element="button"`), `onPress={...}` |
| Row leading icon slot | `@/components/settings/settings-item` | `SettingsItemIcon` |
| Row leading icon | `@/components/atoms/icon` | `IconTile` with `size="small"`, `variant="tile"`, `tone="neutral"` |
| Row title | `@/components/settings/settings-item` | `SettingsItemTitle` with `"Change PIN"` / `"Change password"` |
| Row trailing indicator | `@/components/settings/settings-item` | `SettingsItemAction` containing a `lucide-react` chevron icon |
