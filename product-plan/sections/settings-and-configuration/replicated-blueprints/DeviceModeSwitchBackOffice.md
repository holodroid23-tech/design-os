# DeviceModeSwitchBackOffice Blueprint modal
## Logic Tree
- [Dialog Container]
    - [Alert Content]
        - [Status Icon] (Context: Mode Switch)
        - [Title] Switch to Back Office
        - [Description] You are currently in Device Mode. Switching to Back Office will log out the current session and return to the main configuration screen.
    - [Action Footer]
        - [Action] Cancel (Secondary)
        - [Action] Switch to Back Office (Primary)

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
| Action (Switch) | @/components/ui/button | variant="default" |
