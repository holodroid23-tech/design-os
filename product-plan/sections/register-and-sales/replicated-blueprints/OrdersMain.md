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
| Order switcher (add + order tabs row) | `@/components/ui/order-tabs` (`OrderTabs`) | `tabs=[{ id, label, count? }]` + `value="<orderId>"` + `onValueChange` + `onAddTab` |
| Section header ("Favorites", "Inventory") | `@/components/ui/section-title` (`SectionTitle`) | `titleAs="h2"` |
| Inventory tile ("Custom item", "Iced drinks", "Pastries") | `@/components/patterns/grid-action-tile` (`GridActionTile`) | `label="…"`; `icon={Plus | Folder}`; `intent="default"` |
| Menu item tile (no image) | `@/components/ui/order-product-tile` (`OrderProductTile`) | `name` + `price` + `tone="surface"`; if `count` is present, show `leftAction`/`rightAction` |
| Menu item tile (with image) | `@/components/ui/order-product-tile` (`OrderProductTile`) | `name` + `price` + `imageSrc` + `imageAlt?` + `tone="surface"`; if `count` is present, show `leftAction`/`rightAction` |
| Order summary + expansion | `@/components/ui/order-expandable-summary` (`OrderExpandableSummary`) | `items=[{ id, name, qty, unitPrice, imageSrc? }]` + `orderTitle="…"` + `tax?` + callbacks (`onIncreaseItem`, `onDecreaseItem`, `onPayCash`, `onPayCard`) |

