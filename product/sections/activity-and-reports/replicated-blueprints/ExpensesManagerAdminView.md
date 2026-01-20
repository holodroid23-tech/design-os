# ExpensesManagerAdminView Blueprint

## Logic Tree
- [Tabs]
  - Analytics
  - Orders
  - Expenses (selected)
- [Toolbar]
  - [Date range select] This week
  - [Action button] Export
- [Meta row]
  - 42 expenses found
  - [Action link] + Add expense
- [Expense day groups] (Expandable list)
  - [Day group] Today
    - 3 expenses
    - Total: $14.50
    - (Collapsed by default)
  - [Day group] Yesterday
    - 3 expenses
    - Total: $1,304.50
    - 4 edits
    - (Expanded)
    - [Expense items] (Expandable list, multiple items can be expanded at once)
      - [Expense item] Whole Milk
        - Price: $4.50
        - Created by: Sarah Jackson
        - Time: Yesterday at 10:42 AM
        - Note: put some text here
        - [Edit action] (icon-only)
      - [Expense item] Rent
        - Price: $1,250.00
        - Created by: Freddy Gasper
        - Time: Yesterday at 10:50 AM
        - Note: Monthly Office Rent
        - [Change log]
          - Freddy Gasper changed name from "Banana" to "Rent" on Yesterday at 10:50 AM
        - [Edit action] (icon-only)
      - [Expense item] Coffee Beans (deleted)
        - Price: $50.00
        - Created by: Sarah Jackson
        - Time: Yesterday at 09:15 AM
        - Note: Dark Roast
        - [Change log]
          - Sarah Jackson changed price from $45.00 to $50.00 at Yesterday at 09:20 AM
          - Sarah Jackson changed note from "Light Roast" to "Dark Roast" at Yesterday at 09:20 AM
          - Sarah Jackson deleted expense at Yesterday at 09:25 AM
  - [Day group] Thursday, Oct 24
    - 2 expenses
    - Total: $8.50
    - (Collapsed)
  - [Day group] Wednesday, Oct 23
    - 1 expense
    - Total: $12.00
    - (Collapsed)

## Implementation Blocks (The Roadmap)
- [Block 1: Top tabs]
  - Tabs for Analytics / Orders / Expenses with a selected state.
- [Block 2: Filters + primary actions]
  - Date range select ("This week") and Export action button.
  - Meta row showing result count and "+ Add expense" action.
- [Block 3: Day-group expandable list]
  - A list of day groups where each group can expand/collapse to reveal the day’s items.
- [Block 4: Expense-item expandable rows]
  - Inside an expanded day group, each expense item can expand/collapse to reveal details and optional change log.
- [Block 5: Expense detail + change log content]
  - Detail fields: Created by / Time / Note.
  - Change log entries (0..n).
  - Edit action (icon-only button).

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Tabs container | @/components/ui/tabs | Use `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| Date range select | @/components/ui/select-with-sliding | `variant="sliding"` |
| Export button | @/components/ui/button | `variant="ghost"` or `variant="secondary"` (pick one and keep consistent) |
| Add expense action | @/components/ui/button | `variant="link"` |
| Day group (expand/collapse) | @/components/ui/collapsible | Use `Collapsible`, `CollapsibleTrigger asChild`, `CollapsibleContent` |
| Day group header row layout | @/components/settings/settings-item | Use `SettingsItem` + `SettingsItemContent` + `SettingsItemAction` |
| “4 edits” indicator | @/components/ui/badge | `variant="destructive"` |
| Expense item (expand/collapse) | @/components/ui/collapsible | Nested `Collapsible` per item (supports multiple expanded items) |
| Expense item header row layout | @/components/settings/settings-item | Use `SettingsItem` + `SettingsItemContent` + `SettingsItemAction` |
| Optional leading thumbnail | @/components/ui/image-tile | `size="small"` |
| Optional leading icon tile | @/components/atoms/icon | `IconTile` (tone by category) |
| Chevron affordance | @/components/atoms/icon | `SystemIcon` with `ChevronDown` (rotate on open) |
| Edit action | @/components/ui/button | `variant="secondary"` + `size="icon"` (icon-only) |
| Section title (optional, if the screen includes a header) | @/components/ui/section-title | Use `SectionTitle` |

### Notes (for Builder)
- The “complex accordions” pattern already exists in the Design Library as `AccordionsExamplesCard` and uses `Collapsible` + `SettingsItem` for both day groups and expense rows. Reuse that composition pattern instead of building a new accordion system.

