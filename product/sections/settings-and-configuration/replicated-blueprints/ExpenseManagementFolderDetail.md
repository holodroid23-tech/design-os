# ExpenseManagementFolderDetail Blueprint

## Logic Tree

- **Header Section**
  - Back navigation trigger
  - Page title: "Monthly utilities"

- **Expense Category Toggle List**
  - Toggle row 1:
    - Leading media thumbnail
    - Label: "Electricity bill"
    - Toggle switch (enabled state)
  - Toggle row 2:
    - Leading media thumbnail
    - Label: "Water supply"
    - Toggle switch (enabled state)
  - Toggle row 3:
    - Leading media thumbnail
    - Label: "Store rent"
    - Toggle switch (enabled state)
  - Toggle row 4:
    - Leading media thumbnail
    - Label: "Internet services"
    - Toggle switch (enabled state)
  - Toggle row 5:
    - Leading media thumbnail
    - Label: "Equipment maintenance"
    - Toggle switch (enabled state)
  - Toggle alignment: Split (switch is the far-right action for each row)

- **Primary Action**
  - Primary action trigger: "Add expense"

## Implementation Blocks (The Roadmap)

- **Block 1: Header** - Back navigation trigger and page title
- **Block 2: Toggle List** - Vertical list of expense category rows, each with thumbnail, label, and a switch
- **Block 3: Primary Action** - Single primary action at the bottom: "Add expense"

## Component Mapping (The Map)

| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Header container + page title | @/components/ui/section-title | size="page", leading={...} |
| Back navigation trigger | @/components/ui/button | variant="invisible", size="icon" |
| Back icon | lucide-react#ChevronLeft | (default) |
| Toggle list container | @/components/settings/settings-group | (default) |
| Toggle row container | @/components/settings/settings-item | (default) |
| Leading media thumbnail | @/components/ui/avatar + @/components/ui/avatar-image + @/components/ui/avatar-fallback | size="medium" |
| Row label | @/components/settings/settings-item#SettingsItemTitle | variant="default" |
| Row trailing toggle | @/components/ui/switch | (default) |
| Trailing action wrapper | @/components/settings/settings-item#SettingsItemAction | layout="row" |
| Primary action trigger | @/components/ui/button | variant="secondary", size="lg" |

