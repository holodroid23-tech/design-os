# OrderExpandedCard Blueprint

## Logic Tree
- [Order details panel]
  - [Header]
    - Title: "Order #402 - Table 4"
    - Action: Collapse/expand panel
  - [Search]
    - Search input (placeholder): "Search items..."
  - [Order items list]
    - [Line item row]
      - Item image
      - Item name: "Cappuccino"
      - Unit price: "$4.50"
      - Quantity control
        - Button: Decrease quantity
        - Quantity value: "1"
        - Button: Increase quantity
    - [Line item row]
      - Item image
      - Item name: "Avocado Toast"
      - Unit price: "$12.00"
      - Quantity control
        - Button: Decrease quantity
        - Quantity value: "1"
        - Button: Increase quantity
    - [Line item row]
      - Item image
      - Item name: "Iced Matcha"
      - Unit price: "$11.00"
      - Quantity control
        - Button: Decrease quantity
        - Quantity value: "2"
        - Button: Increase quantity
  - [Order summary]
    - Row: "Subtotal" → "$27.50"
    - Row: "Tax" → "$2.40"
    - Row: "Total" → "$29.90"
  - [Primary actions]
    - Button: "Pay cash"
    - Button: "Pay card"

## Implementation Blocks (The Roadmap)
- Header block: Order identifier and a single collapse/expand action.
- Search block: Search input for filtering/adding items.
- Items block: Scrollable list of line items with quantity controls.
- Summary block: Subtotal, tax, and total.
- Payment actions block: Two actions aligned side-by-side.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Order details panel container (header/body/footer scaffold) | `@/components/ui/bottom-sheet` (`BottomSheetScaffold`) | `header`, `footer` slots |
| Header title | `@/components/ui/section-title` (`SectionTitle`) | `size="section"` (default), `titleAs="h2"`, `trailing={...}` |
| Header collapse/expand action | `@/components/ui/button` (`Button`) | `variant="invisible"`, `size="icon"`, `aria-label="Collapse order"` |
| Header collapse/expand icon | `@/components/ui/icon` (`SystemIcon`) | `size="regular"` |
| Search input | `@/components/ui/input` (`Input`) | `placeholder="Search items..."` |
| Search leading icon | `@/components/ui/icon` (`SystemIcon`) | `size="regular"`, `aria-hidden="true"` |
| Order items list container | Layout primitives | `role="list"` (optional), scroll handled by `BottomSheetScaffold` body |
| Line item image | `@/components/ui/image-tile` (`ImageTile`) | `size="large"`, `src`, `alt` |
| Quantity decrease button | `@/components/ui/button` (`Button`) | `variant="ghost"`, `size="icon-sm"`, `aria-label="Decrease quantity"` |
| Quantity increase button | `@/components/ui/button` (`Button`) | `variant="ghost"`, `size="icon-sm"`, `aria-label="Increase quantity"` |
| Summary/action separator | `@/components/ui/separator` (`Separator`) | `orientation="horizontal"` |
| Payment action: "Pay cash" | `@/components/ui/button` (`Button`) | `variant="secondary"` |
| Payment action: "Pay card" | `@/components/ui/button` (`Button`) | `variant="default"` |

