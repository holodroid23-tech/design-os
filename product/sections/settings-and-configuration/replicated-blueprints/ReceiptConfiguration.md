# ReceiptConfiguration Blueprint

## Logic Tree

- **Header section**
  - Back navigation trigger
  - Page title: "Receipt"

- **View mode**
  - Binary tabs:
    - "Design" (selected)
    - "Preview"

- **Included details**
  - Settings group (atomic controls)
    - Toggle row: "Date" (enabled)
    - Toggle row: "Time" (enabled)
    - Toggle row: "Order ID" (enabled)
    - Toggle row: "Cashier name" (enabled)

- **Paper size**
  - Single selection group:
    - Option: "58mm" (selected)
    - Option: "80mm"

- **Logo**
  - Action button: "Upload logo"

- **Typography family**
  - Single selection group:
    - Option: "Monospace" (selected)
    - Option: "Sans serif"

- **Font size**
  - Single selection group:
    - Option: "Small"
    - Option: "Medium" (selected)
    - Option: "Large"

- **Separator style**
  - Single selection group:
    - Option: "Dashed" (selected)
    - Option: "Dotted"
    - Option: "Solid"

- **Footer details**
  - Form container
    - Field group:
      - Label: "Footer message"
      - Text input with value/placeholder: "Thank you for visiting!"
    - Field group:
      - Label: "Website URL"
      - Text input with value/placeholder: "www.yourstore.com"
    - Toggle row:
      - Label: "Show QR code"
      - Toggle switch (disabled state: off)

## Implementation Blocks (The Roadmap)

- **Block 1: Header** — Back navigation and page title
- **Block 2: View mode** — Tabs for "Design" and "Preview"
- **Block 3: Included details** — Settings-group list of toggle rows
- **Block 4: Paper size + upload** — Paper size selection and "Upload logo" action
- **Block 5: Typography controls** — Typography family and font size selectors
- **Block 6: Separator style** — Separator style selection group
- **Block 7: Footer details** — Footer message + website URL fields and QR toggle

## Component Mapping (The Map)

| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Header title | @/components/ui/section-title | `interactive`, `leading` |
| Back icon | lucide-react#ChevronLeft | (default) |
| View mode tabs | @/components/ui/tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| Section headings | @/components/ui/label | `className="text-muted-foreground"` |
| Settings group container | @/components/settings/settings-group | (default) |
| Settings row | @/components/settings/settings-item | (default) |
| Settings row title | @/components/settings/settings-item#SettingsItemTitle | (default) |
| Settings row leading icon | @/components/settings/settings-item#SettingsItemIcon | (default) |
| Settings row trailing control | @/components/settings/settings-item#SettingsItemAction | (default) |
| Toggle switch | @/components/ui/switch | (default) |
| Paper size selector | @/components/ui/radio-button-group + @/components/ui/radio-button-group#RadioButtonGroupItem | `RadioButtonGroupItem variant="default" size="default"` |
| Upload logo action | @/components/ui/button | `variant="default"` |
| Typography family selector | @/components/ui/radio-button-group + @/components/ui/radio-button-group#RadioButtonGroupItem | `RadioButtonGroupItem variant="default" size="default"` |
| Font size selector | @/components/ui/radio-button-group + @/components/ui/radio-button-group#RadioButtonGroupItem | `RadioButtonGroupItem variant="default" size="default"` |
| Separator style selector | @/components/ui/radio-button-group + @/components/ui/radio-button-group#RadioButtonGroupItem | `RadioButtonGroupItem variant="card" size="card"` |
| Field label | @/components/ui/label | (default) |
| Text input | @/components/ui/input | `variant="default"` |

