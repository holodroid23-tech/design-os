# ResetForgottenPinCashierFinal Blueprint

## Logic Tree
- [Overlay screen]
  - [Dismiss]
    - Icon button: Close
  - [Content]
    - [Status indicator]
      - Informational icon (non-interactive)
    - [Heading]
      - Title: Contact your admin
      - Supporting text: To reset your PIN, please reach out to one of the following administrators:
    - [Administrator actions]
      - [Action row button] John Doe
      - [Action row button] Jane Smith
      - [Action row button] Michael Scott

## Implementation Blocks (The Roadmap)
- Header dismiss control: Provide a top-level close action for the overlay screen.
- Message block: Show an informational indicator, title, and supporting instruction text.
- Administrator list: Present a stacked list of administrator action rows; each row triggers a “contact/select this admin” action.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Close icon button | `@/components/ui/button` | `variant="invisible" size="icon"` |
| Informational icon | `@/components/atoms/icon` (`IconTile`) | `tone="info" size="large" variant="tile"` |
| Title text | (primitive) | `h1` (or `div`), sentence case text |
| Supporting text | (primitive) | `p` |
| Administrator list container | `@/components/settings/settings-group` (`SettingsGroup`) | (default) |
| Administrator row (clickable) | `@/components/settings/settings-item` (`SettingsItem`) | Use default `element="button"` and wire `onClick` OR use `element="div" interactive onPress` |
| Row leading icon container | `@/components/settings/settings-item` (`SettingsItemIcon`) | (default) |
| Row leading icon tile | `@/components/atoms/icon` (`IconTile`) | `tone="neutral" size="small" variant="tile"` with a user glyph |
| Row title | `@/components/settings/settings-item` (`SettingsItemTitle`) | (default) |
