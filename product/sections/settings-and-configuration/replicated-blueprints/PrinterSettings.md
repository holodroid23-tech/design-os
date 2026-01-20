# PrinterSettings Blueprint

## Logic Tree

- **Header**
  - Back navigation trigger
  - Page title: "Printer"

- **Printer status**
  - Section header: "Printer status"
  - Connected device panel:
    - Leading device icon
    - Device name: "mPOP Printer"
    - Connection state: "Connected"
    - Action buttons:
      - "Test print"
      - "Disconnect"

- **Paper size**
  - Section header: "Paper size"
  - Single selection group:
    - Option: "58mm" (selected)
    - Option: "80mm"

- **Hardware discovery**
  - Section header: "Hardware discovery"
  - Primary action: "Search for printers"
  - Available devices list:
    - Device row:
      - Leading device icon
      - Device name: "mPOP Printer"
      - Trailing action: "Pair"
    - Device row:
      - Leading device icon
      - Device name: "TM-T88VI Printer"
      - Trailing action: "Pair"

## Implementation Blocks (The Roadmap)

- **Block 1: Header** - Back navigation and page title
- **Block 2: Printer status** - Connected device panel with status + two actions
- **Block 3: Paper size** - Two-option single selection group
- **Block 4: Hardware discovery** - Search action + list of discovered devices with per-row "Pair" actions

## Layout Patterns (The Vibe)

- **Page container**: Full-height vertical stack with consistent section spacing
- **Section stack**: Section header followed by a single grouped surface (panel/group)
- **Action row**: Two equal-priority actions presented side-by-side
- **Discovery list**: Grouped rows with a trailing per-row action button

## Component Mapping (The Map)

| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Back navigation trigger | @/components/ui/button | variant="invisible", size="icon" |
| Page title | @/components/ui/section-title | size="page", titleAs="h1" |
| Section headers | @/components/ui/section-title | size="section" |
| Connected device panel container | @/components/ui/card | (default) |
| Leading device icon (panel) | @/components/ui/icon | Component: IconTile, variant="tile", size="medium", tone="success" |
| Device name text | @/components/settings/settings-item | Component: SettingsItemTitle |
| Connection state text | @/components/settings/settings-item | Component: SettingsItemDescription, tone="success", size="tiny" |
| "Test print" action | @/components/ui/button | variant="ghost", size="lg" |
| "Disconnect" action | @/components/ui/button | variant="destructive", size="lg" (Note: DS has no destructive-outline variant) |
| Paper size selection group | @/components/ui/radio-button-group | Component: RadioButtonGroup |
| Paper size option button | @/components/ui/radio-button-group | Component: RadioButtonGroupItem, variant="card", size="lg" |
| Devices list container | @/components/settings/settings-group | (default) |
| Device row | @/components/settings/settings-item | element="div" (allows nested trailing action) |
| Row leading icon | @/components/ui/icon | Component: SystemIcon |
| Row title | @/components/settings/settings-item | Component: SettingsItemTitle |
| Row trailing action | @/components/settings/settings-item + @/components/ui/button | SettingsItemAction + Button variant="ghost", size="sm" |
| "Search for printers" action | @/components/ui/button | variant="ghost", size="lg" |
| Icon (back) | lucide-react#ChevronLeft | (default) |
| Icon (printer) | lucide-react#Printer | (default) |
| Icon (search) | lucide-react#Search | (default) |

