# PrinterSettings Blueprint

## Logic Tree
- **Top Navigation Bar**
    - Navigation Go-Back Trigger
    - Page Title: "Printer"
- **Section: Status Overlay**
    - Section Label: "Printer Status"
    - [Status Detail Card]
        - Categorical Printer Icon
        - Device Name Display
        - Connection State Indicator (Success Tone)
    - [Control Action Row]
        - Operational Test Trigger
        - Operational Disconnect Trigger
- **Section: Paper Configuration**
    - Section Label: "Paper Size"
    - [Mutual Exclusive Selection Group]
        - Standard Size Option A
        - Standard Size Option B
- **Section: Network/Hardware Discovery**
    - Section Label: "Hardware Discovery"
    - [Discovery Input Controller]
        - Search/Filter Input with Search Indicator
    - [Discovered Entity List]
        - Found Device Item:
            - Device Type Icon
            - Device Name Display
            - Interaction Trigger (Link/Pair intent)

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Top Navigation Bar | `src/components/ui/section-title.tsx` | `size="section"`, `leading` for back button |
| Section Label | `<label>` | `text-sm font-medium text-muted-foreground` |
| Status Detail Card | `src/components/settings/settings-item.tsx` | composition within `SettingsGroup` |
| Categorical Icon | `src/components/atoms/icon.tsx` | `IconTile`, `tone="success"` |
| Connection State | `src/components/ui/badge.tsx` | `variant="outline"` |
| Operational Triggers | `src/components/ui/button.tsx` | `variant="outline"` (Test) and `variant="destructive"` (Disconnect) |
| Mutual Exclusive Selection | `src/components/ui/radio-button-group.tsx` | `variant="surface"`, `size="lg"` |
| Discovery Input | `src/components/ui/input.tsx` | Standard, `className="h-12 pl-12"` for discovery styling |
| Item Selection Trigger | `src/components/ui/button.tsx` | `variant="outline"`, `size="sm"` |

## Designer's Notes (No Visuals)
- The Selection Group represents the core configuration choice for the hardware.
- The Status Indicator tone must match the logical `connected` state.
- Interactive list items should follow the `SettingsItem` pattern.
