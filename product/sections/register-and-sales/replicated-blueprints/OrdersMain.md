# OrdersMain Blueprint

## Logic Tree
- [Screen: Orders]
  - [Header: Order switcher]
    - [Action button]: Add order
    - [Horizontal selection list: Orders]
      - [Order tab]: "Dine-in #4" (count: "3") (selected)
      - [Order tab]: "Takeout #5"
      - [Order tab]: "Dine-in #6" (partially visible)
  - [Section: Favorites]
    - [Grid: Menu items]
      - [Menu item]: "Latte" — "$4.75" (image)
      - [Menu item]: "Espresso" — "$3.00" (no image)
      - [Menu item]: "Mocha" — "$5.00" (image)
      - [Menu item]: "Cappuccino" — "$4.50" (no image)
      - [Menu item]: "Flat White" — "$4.50" (image)
      - [Menu item]: "Taro Latte" — "$5.50" (no image)
      - [Menu item]: "Americano" — "$3.50" (image)
      - [Menu item]: "Matcha" — "$5.25" (no image)
      - [Menu item]: "Cold Brew" — "$4.50" (image)
  - [Section: Inventory]
    - [Grid: Quick actions / categories]
      - [Tile]: "Custom item"
      - [Tile]: "Iced drinks"
      - [Tile]: "Pastries"
    - [Grid: Menu items (continuation)]
      - [Menu item]: "Macchiato" — "$3.75" (image)
      - [Menu item]: "Drip" — "$3.00" (no image)
      - [Menu item]: "Cortado" — "$4.00" (image)
  - [Bottom bar: Order summary]
    - [Primary total]: "$18.50"
    - [Summary text]: "Cappuccino, Americano, Cold Brew..."
    - [Action icon]: Expand order
    - [Interaction]: Tap expands into a bottom sliding modal with the current order details

## Implementation Blocks (The Roadmap)
- [Order switcher]: Add-order action + horizontally scrollable order tabs with optional count per tab.
- [Favorites grid]: Menu item selection grid (mixed image/no-image tiles), tapping a tile adds that item to the selected order.
- [Inventory tiles]: Quick action/category tiles for common actions and category filtering.
- [Order summary + expansion]: Persistent bottom summary for the selected order; expands into a bottom sliding modal for full order review/edit/checkout.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Add order action button | `@/components/ui/button` | `size="icon"` + `shape="circle"` + `variant="secondary"` |
| Add order icon | `@/components/atoms/icon` (`SystemIcon`) | `icon={Plus}` + `size="regular"` |
| Orders selection container | `@/components/ui/tabs` (`Tabs`, `TabsList`) | Use `Tabs` for selection state; `TabsList` for the tab row container |
| Order tab | `@/components/ui/tabs` (`TabsTrigger`) | `value="<orderId>"` |
| Order tab count | `@/components/ui/badge` (`Badge`) | Use as trailing count inside the trigger (e.g., `variant="secondary"` for neutral count) |
| Section header ("Favorites", "Inventory") | n/a (plain heading) | Use semantic heading (`h2`) and DS text utilities (no new component required by spec) |
| Inventory tile ("Custom item", "Iced drinks", "Pastries") | `@/components/patterns/grid-action-tile` (`GridActionTile`) | `label="…"`; `icon={Plus | Folder}`; `intent="default"` |
| Menu item tile (no image) | n/a (custom composition) | Compose as a `button` using DS typography + spacing; see `src/components/patterns/component-examples/sections/product-expense-examples.tsx` for the established pattern |
| Menu item tile (with image) | n/a (custom composition) | Compose as a `button` with an `img` child and overlay text; no existing DS component supports image + overlay text + price as a single atom |
| Bottom order summary (collapsed) | `@/components/ui/bottom-sliding-modal` (`BottomSlidingModalTrigger`) | Trigger should be the full-width bottom bar button |
| Bottom sliding modal (expanded order) | `@/components/ui/bottom-sliding-modal` (`BottomSlidingModal`, `BottomSlidingModalContent`) | Use `header`/`footer` slots as needed; body hosts the order details UI |
| Expand order icon | `@/components/atoms/icon` (`SystemIcon`) | `icon={ChevronUp | ChevronDown}` + `size="huge"` (direction reflects expanded state) |

