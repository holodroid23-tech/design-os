# AnalyticsManagerAdminView Blueprint

## Logic Tree
- [Screen]
  - [Top navigation]
    - [Tab group] Tabs: "Analytics", "Orders", "Expenses" (single selection)
  - [Toolbar]
    - [Date range selector] Selected value: "Today" (dropdown)
    - [Export action] Button: "Export"
  - [Content]
    - [Primary summary card]
      - Label: "Total income"
      - Trend: "+15% vs yst" (trend indicator)
      - Value: "$1,248.50"
      - Breakdown chips: "Cash: $310", "Card: $938.50"
    - [KPI grid]
      - Card: "Net profit" → "$842.10" + "+12% vs yst"
      - Card: "Expenses" → "$406.40" + "4 transactions"
      - Card: "Refunds" → "-$24.50"
      - Card: "Refunds count" → "2"
      - Card: "In drawer" → "$460.00"
      - Card: "Total orders" → "142"
    - [Chart card]
      - Title: "Hourly income"
      - Summary chip: "Avg $120/h"
      - Line chart (x-axis time, y-axis value)
        - X labels: "8AM", "10AM", "12PM", "2PM", "4PM"
        - Y labels: "$0", "$100", "$200", "$300", "$400"
    - [Top items card: Revenue]
      - Title: "Top 10 items by revenue"
      - Rows (name + meter + value)
        - "Cappuccino" → "$420"
        - "Avocado Toast" → "$315"
        - "Iced Matcha" → "$280"
        - "Cold Brew" → "$240"
        - "Flat White" → "$210"
    - [Top items card: Quantity]
      - Title: "Top 10 items by quantity"
      - Rows (name + meter + value)
        - "Latte" → "84"
        - "Cappuccino" → "76"
        - "Croissant" → "62"

## Implementation Blocks (The Roadmap)
- [Block 1] Top navigation: single-selection tab group across the three activity views.
- [Block 2] Toolbar: date range dropdown + export action button.
- [Block 3] Primary summary: total income card with trend and breakdown chips.
- [Block 4] KPI grid: six compact metric cards in a two-column grid.
- [Block 5] Chart: hourly income line chart with an average summary chip.
- [Block 6] Rankings: two cards for top items, each with rows containing a meter and a value.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Tab group ("Analytics", "Orders", "Expenses") | `@/components/ui/tabs` | `Tabs` + `TabsList` + `TabsTrigger` (Radix values) |
| Date range selector ("Today") | `@/components/ui/select-with-sliding` | `variant="sliding"` |
| Export action ("Export") | `@/components/ui/button` | `variant="secondary"` (icon optional) |
| Summary/KPI cards | `@/components/ui/card` | `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription` as needed |
| Breakdown chips ("Cash: $310", "Card: $938.50") | `@/components/ui/badge` | `variant="ghost"` |
| Chart | `@/components/ui/analytics-line-chart` | `data=[{label,value}]`, `yTicks=[...]`, `stroke=...` |
| Top item meter bars | `@/components/ui/meter-bar` | `tone="accent"`, `value`, `max` |
| "Avg $120/h" summary chip | `@/components/ui/badge` | `variant="ghost"` |

