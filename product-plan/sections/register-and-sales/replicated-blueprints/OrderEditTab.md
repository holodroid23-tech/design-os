# OrderEditTab Blueprint

## Logic Tree
- [Bottom sliding modal]: Edit an order tab
  - [Header]
    - Title: "Edit order"
    - Trailing: Close button
  - [Body]
    - [Form]
      - Field: "Order name"
        - Text input (value: current order name)
      - Actions
        - Button: "Cancel" (dismiss without saving)
        - Button: "Save" (persist changes, then dismiss)
    - [Actions list]
      - Action row: "Clear order"
        - Activates a clear-order flow (confirmation or immediate clear, decided by caller)
      - Destructive action row: "Delete order tab"
        - Activates a delete-tab flow (confirmation required by caller)

## Implementation Blocks (The Roadmap)
- Header: Title and close affordance.
- Edit form: Labeled text input for the order name.
- Form actions: Cancel + Save actions.
- Order actions list: Two action rows (one standard, one destructive).

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal root | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal open onOpenChange` |
| Bottom sliding modal content | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModalContent header scaffoldProps` |
| Header title row | `@/components/ui/section-title` | `SectionTitle trailing` |
| Close action | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` | `BottomSlidingModalClose asChild` wrapping `Button variant="invisible" size="icon"` |
| Close icon | `@/components/atoms/icon` | `SystemIcon icon={...} size="regular"` |
| Field label | `@/components/ui/label` | `Label htmlFor` |
| Text input | `@/components/ui/input` | `Input variant="default"` |
| Cancel button | `@/components/ui/button` | `Button variant="secondary"` |
| Save button | `@/components/ui/button` | `Button variant="default"` |
| Section separator (between form and action list) | `@/components/ui/separator` | `Separator` |
| Actions list container | `@/components/settings/settings-group` | `SettingsGroup` |
| Action row container | `@/components/settings/settings-item` | `SettingsItem interactive onPress` |
| Row leading icon tile | `@/components/settings/settings-item` + `@/components/atoms/icon` | `SettingsItemIcon` + `IconTile icon={...} tone="neutral"` |
| Row title | `@/components/settings/settings-item` | `SettingsItemTitle` |
| Row trailing indicator (when applicable) | `@/components/settings/settings-item` + `@/components/atoms/icon` | `SettingsItemAction` + `SystemIcon icon={...} size="regular"` |
| Destructive action row title | `@/components/settings/settings-item` | `SettingsItemTitle variant="destructive"` |
| Destructive row leading icon tile | `@/components/atoms/icon` | `IconTile tone="danger"` |

