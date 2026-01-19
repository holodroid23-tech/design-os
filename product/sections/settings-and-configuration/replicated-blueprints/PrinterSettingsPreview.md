# Printer Settings Blueprint

**Screen Name**: `PrinterSettingsPreview`
**Presentation**: `page`

## Component Hierarchy

- `div` (Page container) `p-4 space-y-4 bg-background min-h-screen text-foreground`
  - `div` (Header) `flex items-center gap-3`
    - `Button` (Back) `variant="ghost" size="icon"`
    - `h1` (Title) `text-xl font-semibold`
  - `div` (Printer Status Card) `space-y-2`
    - `Label` "PRINTER STATUS"
    - `Card` `bg-layer-1 border-border rounded-[18px] p-4` 
      - `div` (Info) `flex items-center gap-3 mb-4`
        - `div` (Icon) `w-10 h-10 bg-[rgba(21,164,62,0.1)] rounded-[12px] flex items-center justify-center`
          - `Printer` (Icon) `text-success`
        - `div`
          - `h3` "mPOP Printer" `font-semibold`
          - `p` "CONNECTED" `text-xs text-success font-bold`
      - `div` (Actions) `grid grid-cols-2 gap-3`
        - `Button` "Test Print" `variant="outline" rounded-[12px]`
        - `Button` "Disconnect" `variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 rounded-[12px]"`
  - `div` (Paper Size) `space-y-2`
    - `Label` "PAPER SIZE"
    - `div` `grid grid-cols-2 gap-3`
      - `Button` "58mm" `variant="outline" className="border-primary text-primary bg-primary/10 h-12 rounded-[18px]"` (Selected)
      - `Button` "80mm" `variant="outline" className="h-12 rounded-[18px]"`
  - `div` (Hardware Discovery) `space-y-2`
    - `Label` "HARDWARE DISCOVERY"
    - `Card` `bg-layer-1 border-border rounded-[18px] overflow-hidden`
      - `div` (Search) `p-4 border-b border-border`
        - `Button` "Search for Printers" `variant="outline" w-full rounded-[12px] h-10`
      - `div` (List)
        - `div` (Item 1) `flex items-center justify-between p-4 border-b border-border`
          - `span` "mPOP Printer" `flex items-center gap-2`
          - `Button` "Pair" `variant="outline" size="sm" rounded-[8px]`
        - `div` (Item 2) `flex items-center justify-between p-4`
          - `span` "TM-T88VI Printer"
          - `Button` "Pair" `variant="outline" size="sm" rounded-[8px]`

## Component Mapping

| UI Block | Component | Props/Attributes | Tokens/Classes |
|---|---|---|---|
| Main Layout | `div` | - | `p-4 space-y-6 max-w-2xl mx-auto` |
| Header | Standard Header | - | - |
| Section Section | `div` | - | `space-y-2` |
| Section Label | `Label` | - | `text-xs font-medium text-muted-foreground uppercase tracking-wide` |
| Status Icon | `div` + `Printer` | - | `bg-success/10 text-success rounded-[12px]` |
| Status Text | `span` | - | `text-success font-bold uppercase` |
| Paper Size Button | `Button` | `variant="outline"` | Active: `border-primary text-primary bg-primary/5`. Inactive: `bg-layer-1`? Mock looks like dark buttons. |
| Discovery Card | `Card` | - | `bg-layer-1 rounded-[18px]` |
| List Item | `div` | - | `p-4 flex justify-between items-center` |

## Token Extraction

- **Colors**:
  - Background: `bg-background`
  - Surface: `bg-layer-1`
  - Success: `text-success` / `bg-success` (for connected status)
  - Destructive: `text-destructive` / `border-destructive` (Disconnect)
  - Primary: `border-primary` / `text-primary` (Selected state)

- **Radii**:
  - Large Containers: `rounded-[18px]`
  - Buttons: `rounded-[12px]` (Discovery search), `rounded-[6px]` (Pair buttons? they look small), no, mock shows rounded-button shape, maybe 8px or 12px. I'll stick to 6/12/18 rules. "Pair" buttons look like `rounded-[6px]`. Large buttons `rounded-[12px]`. Paper size `rounded-[18px]` or `12px`. Mock shows very round. Probably `18px`.

- **Typography**:
  - Headings: `text-xl`
  - Labels: `text-xs font-bold uppercase`
  - Body: `text-sm` or `text-base`

## Implementation Steps

1. Create `PrinterSettingsPreview.tsx`.
2. Define Layout.
3. Implement Printer Status section.
4. Implement Paper Size section using Grid.
5. Implement Hardware Discovery section (Search button + List).
6. State for "Connected" vs "Disconnected" could be simulated or static. I will make it static as per mock.
