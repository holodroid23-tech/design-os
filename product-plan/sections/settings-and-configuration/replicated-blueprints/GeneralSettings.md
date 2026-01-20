# GeneralSettings Blueprint

## Logic Tree

- **Header Section**
  - Back navigation trigger
  - Page title: "General"

- **Store Information Block**
  - Field group:
    - Label: "Store name"
    - Text input with value: "The Brew Corner"
  - Field group:
    - Label: "Store street"
    - Text input with value: "42 Artisan Way"
  - Field group:
    - Label: "Email"
    - Text input with value: "contact@brewcorner.com"
  - Field group:
    - Label: "Website"
    - Text input with value: "www.thebrewcorner.com"

- **Preferences Block**
  - Field group:
    - Label: "Currency"
    - Dropdown selector with value: "USD ($)"
  - Field group:
    - Label: "Display always on"
    - Toggle switch (enabled state)

- **Time Format Block**
  - Label: "Time format"
  - Binary selection group:
    - Option: "AM/PM" (selected)
    - Option: "24h"

- **Tax Configuration Block**
  - Field group with toggle:
    - Label: "Use taxes"
    - Toggle switch (enabled state)
  - Tax items list:
    - Tax item 1:
      - Toggle switch (enabled state)
      - Label: "VAT Standard 21% (defaultly use)"
      - Trailing action: Edit icon
      - Trailing action: Delete icon
    - Tax item 2:
      - Label: "Service Charge 10%"
      - Trailing action: Delete icon
  - Add action trigger (icon button)

- **Security Block**
  - Label: "Pin lock timer"
  - Multi-option selection group:
    - Options: "5m", "1m" (selected), "20s", "5m", "10m", "Never"

- **Danger Zone Block**
  - Destructive action trigger:
    - Icon: Delete/Trash
    - Label: "Delete account"

## Implementation Blocks (The Roadmap)

- **Block 1: Header** - Page navigation and title
- **Block 2: Store Fields** - Four text input fields with labels (store name, street, email, website)
- **Block 3: Preferences** - Currency dropdown and display toggle
- **Block 4: Time Format** - Binary selector for time format preference
- **Block 5: Tax Management** - Toggle with tax item list and add functionality
- **Block 6: Security** - Pin lock timer multi-option selector
- **Block 7: Account Actions** - Destructive delete account button

## Layout Patterns (The Vibe)

- **Page Container**: Full height layout with vertical stack
- **Header Bar**: Fixed top header with back navigation
- **Content Stack**: Vertical flow with consistent section spacing
- **Field Group Pattern**: Label-above-input with consistent vertical gap
- **Inset Group**: Rounded container with border for related items (tax items)
- **Section Spacing**: Consistent gap between logical blocks

## Component Mapping (The Map)

| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Back navigation trigger | @/components/ui/button | variant="ghost", size="icon" |
| Page title | @/components/ui/section-title | size="page" |
| Field labels | @/components/ui/label | (default) |
| Text inputs | @/components/ui/input | variant="ghost" |
| Currency dropdown | @/components/ui/select + @/components/ui/select-trigger | variant="ghost" |
| Toggle switches | @/components/ui/switch | (default) |
| Time format selector | @/components/ui/radio-button-group + @/components/ui/radio-button-group-item | variant="fused", size="fused" |
| Tax item container | @/components/settings/settings-group | (default) |
| Tax item row | @/components/settings/settings-item | (default) |
| Add tax button | @/components/ui/button | variant="ghost", size="icon" |
| Pin timer selector | @/components/ui/radio-button-group + @/components/ui/radio-button-group-item | variant="surface" |
| Delete account button | @/components/settings/settings-item | (default) |
| Icon (edit) | lucide-react#Pencil | (default) |
| Icon (delete) | lucide-react#Trash2 | (default) |
| Icon (add) | lucide-react#Plus | (default) |
| Icon (back) | lucide-react#ChevronLeft | (default) |
