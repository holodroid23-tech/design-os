# DeviceModeSwitchRegister Blueprint modal

## Logic Tree
- [Dialog Container]
    - [Alert Content]
        - [Status Icon] (Context: Register Mode)
        - [Title] Switch to Register?
        - [Description] Switching to Register mode will activate this device as the primary POS to process orders and payments.
    - [Action Footer]
        - [Action] Cancel (Secondary)
        - [Action] Switch Mode (Primary)

## Implementation Blocks (The Roadmap)
- [Alert Content]: Centered vertical stack containing the status icon and text content.
- [Action Footer]: Container for the primary and secondary actions, typically aligned to the end or split.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Dialog Container | @/components/ui/dialog | Component: DialogContent |
| Status Icon | @/components/ui/icon | Component: IconTile, tone="neutral", size="large" |
| Title | @/components/ui/dialog | Component: DialogTitle |
| Description | @/components/ui/dialog | Component: DialogDescription |
| Action (Cancel) | @/components/ui/button | variant="secondary" |
| Action (Switch Mode) | @/components/ui/button | variant="default" |
