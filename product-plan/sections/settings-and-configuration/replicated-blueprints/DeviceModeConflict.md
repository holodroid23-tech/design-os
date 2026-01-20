# DeviceModeConflict Modal Blueprint

## Logic Tree
- [Dialog Container]
    - [Alert Content]
        - [Status Icon] (Context: Critical Alert)
        - [Title] Active session detected
        - [Description] Only one device can operate as the primary POS. If you proceed, the currently active device will be logged out and you will take over processing orders and payments.
    - [Action Footer]
        - [Action] Cancel (Secondary)
        - [Action] Switch anyway (Destructive)

## Implementation Blocks (The Roadmap)
- [Alert Content]: Centered vertical stack containing the status icon and text content.
- [Action Footer]: Container for the primary and secondary actions, typically aligned to the end or split.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Dialog Container | @/components/ui/dialog | Component: DialogContent |
| Status Icon | @/components/ui/icon | Component: IconTile, tone="danger", size="large" |
| Title | @/components/ui/dialog | Component: DialogTitle |
| Description | @/components/ui/dialog | Component: DialogDescription |
| Action (Cancel) | @/components/ui/button | variant="secondary" |
| Action (Switch) | @/components/ui/button | variant="destructive" |
