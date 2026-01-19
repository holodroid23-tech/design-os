# DeviceMode Blueprint

## Logic Tree
- [Header] Device mode
- [Mode Selection Group]
    - [Option] Register
        - [Description] Process sales and refunds
    - [Option] Back office
        - [Description] Manage inventory and settings

## Implementation Blocks (The Roadmap)
- [Header Section]: Contains the main page title.
- [Mode Selection]: A group of selectable cards allowing the user to switch between device modes.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Header | @/components/ui/section-title | variant="default" |
| Mode Selection Group | @/components/ui/radio-button-group | variant="card", size="card" |
