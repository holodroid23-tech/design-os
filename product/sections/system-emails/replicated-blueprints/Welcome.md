# Welcome Blueprint

## Logic Tree
- [Header]
  - Title: Welcome to comPOSt
  - Body copy: Thanks for choosing our POS system to power your daily grind. We're excited to help you serve the best coffee in town. Here is everything you need to get your shop running efficiently.
- [Next steps]
  - Section heading: Your next steps
  - Step list (Destination rows)
    - Step: Set Admin PIN
      - Supporting text: Secure your access
      - Action: Navigate to PIN setup
    - Step: Add Inventory
      - Supporting text: Create your first product
      - Action: Navigate to inventory setup
- [Primary action]
  - Button: Launch App
  - Action: Open app (deep link), with web fallback
- [Footer]
  - Disclaimer: You received this email because you signed up for comPOSt POS.

## Implementation Blocks (The Roadmap)
- Welcome copy: Title + supporting body copy.
- Next steps: Section heading + two destination rows (PIN setup, inventory setup).
- Primary action: Single primary CTA button that deep-links into the app.
- Footer: Small disclaimer line.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Email template shell | `@/components/ui/email-template` | `dark` surface wrapper + slots via props/children |
| Title: “Welcome to comPOSt” | `@/components/ui/section-title` | `size="page"`, `titleAs="h1"` |
| Body copy paragraph | Native `p` | (token classes applied by builder) |
| Section heading: “Your next steps” | `@/components/ui/section-title` | `size="section"`, `titleAs="h2"` |
| Next steps list container | Native `div` | Render as list of items |
| Step row container | `@/components/settings/settings-group` | Wrap a single row per step (card-style destination) |
| Step row | `@/components/settings/settings-item` | `interactive`, `onPress` (destination behavior) |
| Step icon slot | `@/components/settings/settings-item` | `SettingsItemIcon` |
| Step icon tile | `@/components/atoms/icon` | `IconTile` with `size="small"`, `variant="tile"`, `tone` (e.g., `info`, `success`) |
| Step text stack | `@/components/settings/settings-item` | `SettingsItemContent` |
| Step title text | `@/components/settings/settings-item` | `SettingsItemTitle` |
| Step supporting text | `@/components/settings/settings-item` | `SettingsItemDescription` |
| Step trailing action | `@/components/settings/settings-item` | `SettingsItemAction` with a chevron icon (`lucide-react`) |
| Primary CTA button | `@/components/ui/button` | `variant="default"`, `size="lg"` |
| CTA trailing icon | `lucide-react` | `ExternalLink` (as child of `Button`) |
| Footer disclaimer text | Native `p` | (token classes applied by builder) |
