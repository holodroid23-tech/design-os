# PinResetRoleSelection Blueprint

## Logic Tree
- [Screen]
  - [Dismiss control]
    - Button: "Close"
  - [Intro]
    - Icon (decorative): Lock
    - Title: "What is your role?"
    - Supporting text: "Select your role to proceed with PIN recovery."
  - [Role options] (Destination list)
    - [Option] Cashier
      - Leading icon (role)
      - Label: "I am a Cashier"
      - Trailing navigation indicator
      - Interaction: Selecting this option proceeds to the cashier PIN recovery flow
    - [Option] Admin / Manager
      - Leading icon (role)
      - Label: "I am an Admin / Manager"
      - Trailing navigation indicator
      - Interaction: Selecting this option proceeds to the admin/manager PIN recovery flow

## Implementation Blocks (The Roadmap)
- **Top actions**: A single dismiss action ("Close") available immediately.
- **Intro hero**: One icon, a primary title, and a single supporting sentence explaining the next step.
- **Role selection list**: Two destination rows, each acting as a single tap target that advances the flow.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Screen container | native `div` | `min-h-screen` layout wrapper (tokenized surface handled by builder) |
| Dismiss button | `@/components/ui/button` | `variant="invisible"` `size="icon"` `aria-label="Close"` |
| Dismiss icon | `@/components/ui/icon` (`SystemIcon`) | `icon={XIcon}` `size="regular"` |
| Intro icon tile | `@/components/ui/icon` (`IconTile`) | `icon={Lock}` `size="large"` `variant="tile"` `tone="neutral"` |
| Intro title | native `h1` | Text uses sentence case exactly: "What is your role?" |
| Intro supporting text | native `p` | Text uses sentence case exactly: "Select your role to proceed with PIN recovery." |
| Cashier option container | `@/components/settings/settings-group` (`SettingsGroup`) | Single-item group (one destination row) |
| Cashier option row | `@/components/settings/settings-item` (`SettingsItem`) | `element="div"` `interactive` `onPress={...}` |
| Cashier leading icon | `@/components/ui/icon` (`IconTile`) inside `SettingsItemIcon` | `icon={User}` `size="small"` `variant="tile"` `tone="neutral"` |
| Cashier label | `@/components/settings/settings-item` (`SettingsItemTitle`) | Text: "I am a Cashier" |
| Cashier trailing indicator | `@/components/ui/icon` (`SystemIcon`) inside `SettingsItemAction` | `icon={ChevronRight}` `size="regular"` |
| Admin / Manager option container | `@/components/settings/settings-group` (`SettingsGroup`) | Single-item group (one destination row) |
| Admin / Manager option row | `@/components/settings/settings-item` (`SettingsItem`) | `element="div"` `interactive` `onPress={...}` |
| Admin / Manager leading icon | `@/components/ui/icon` (`IconTile`) inside `SettingsItemIcon` | `icon={Shield}` `size="small"` `variant="tile"` `tone="neutral"` |
| Admin / Manager label | `@/components/settings/settings-item` (`SettingsItemTitle`) | Text: "I am an Admin / Manager" |
| Admin / Manager trailing indicator | `@/components/ui/icon` (`SystemIcon`) inside `SettingsItemAction` | `icon={ChevronRight}` `size="regular"` |

