# FirstLaunchOnboardingOrders Blueprint

## Logic Tree
- [Screen: First launch onboarding (Orders)]
  - [Header: Order tabs]
    - [Action button] Add order (plus)
    - [Selected tab] "Order 1"
  - [Grid: Starter items] (3 columns)
    - [Tile] Custom item (plus icon)
    - [Tile] Cappuccino — "$4.50" (solid tone)
    - [Tile] Latte — "$4.75" (image)
    - [Tile] Espresso — "$3.00" (solid tone)
    - [Tile] Taro Latte — "$5.50" (solid tone)
    - [Tile] Americano — "$3.50" (image)
    - [Tile] Mocha — "$5.00" (image)
    - [Tile] Flat White — "$4.25" (solid tone)
    - [Tile] Iced Latte — "$4.75" (solid tone)
  - [Onboarding hint]
    - [Icon] Hand (in circular container)
    - [Title] Welcome to your new shop!
    - [Description] Tap any item to start your first order or go to Settings to manage your inventory.
      - "manage your inventory" styled as a link/action

## Implementation Blocks (The Roadmap)
- [Block 1: Order tab header]: Use the canonical `OrderTabs` pattern.
- [Block 2: Starter grid]: 3×3 tile grid using DS tiles (`GridActionTile` + `ProductTile`).
- [Block 3: Onboarding hint]: Centered icon + title + helper text with a link-style action.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Order header (add + tabs row) | `@/components/ui/order-tabs` (`OrderTabs`) | `tabs=[{ id, label }]` + `value` + `onValueChange` + `onAddTab` |
| Custom item tile | `@/components/patterns/grid-action-tile` (`GridActionTile`) | `icon={Plus}` + `label="Custom item"` |
| Item tiles | `@/components/ui/product-tile` (`ProductTile`) | `name` + `price` + `tone` OR `imageSrc` (with scrim) |
| Onboarding icon | `@/components/atoms/icon` (`SystemIcon`) | `icon={Hand}` + `size="big"` |

