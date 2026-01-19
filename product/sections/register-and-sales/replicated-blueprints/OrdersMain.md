# OrdersMain blueprint

## Presentation
- presentation: mobile

## One-line intent
Select or create an order, then quickly add items from favorites or inventory; show a persistent minimized cart summary.

## Hierarchy tree
- Root (full-screen page)
  - Order header row
    - Create order button (icon only)
    - Order chip scroller (horizontal)
      - Order chip (name + optional item count badge)
  - Favorites section
    - Section title (star icon + “Favorites”)
    - Favorites grid (3 columns)
      - Product tile (image or solid accent)
  - Inventory section
    - Section title (folder icon + “Inventory”)
    - Inventory grid (3 columns)
      - Action tile (“Custom item”)
      - Folder tiles (e.g., “Iced drinks”, “Pastries”)
      - (Optional continuation) Product tiles for the currently-open folder/category
  - Bottom cart bar (fixed)
    - Total amount
    - Line-item summary preview (truncated)
    - Expand affordance (chevron)

## Component mapping

| UI block | Component/pattern | Props/data | Tokens/classes |
|---|---|---|---|
| Page root | Plain layout wrapper (`div`) | none | `min-h-full bg-layer-level-0 text-foreground relative` |
| Create order (top-left) | `Button` (icon button) + `lucide-react` icon | `onCreateOrder()` | `variant="secondary" size="icon-lg" rounded-[9999px] bg-layer-3 border border-border` |
| Order chip scroller | Horizontal scroll container + `Button` pills | `orders[]`, `activeOrderId`, `onSelectOrder(orderId)` | container: `overflow-x-auto no-scrollbar`; chips: `h-10 px-4 rounded-[9999px] border` |
| Active/inactive order chip styling | `Button` variants + conditional classes | `isActive`, `order.name` | active: `bg-primary text-primary-foreground border-transparent`; inactive: `bg-layer-2 text-muted-foreground border-border` |
| Order item-count badge | `Badge` | `count` (sum of quantities) | `rounded-[9999px] text-[12px] font-semibold border-0`; active: `bg-primary-foreground/20 text-primary-foreground`; inactive: `bg-layer-3 text-foreground` |
| Section headers | `SectionTitle` | `leading` icon, title text | leading icon uses semantic text (`text-primary` for favorites; `text-muted-foreground` for inventory) |
| Favorites grid | CSS grid of clickable tiles | `favorites[]`, `onAddItem(productId)` | `grid grid-cols-3 gap-3` |
| Product tile (image) | `Button` tile + `img` + overlay | `product.name`, `product.price`, `product.image?` | `aspect-square rounded-[18px] overflow-hidden border border-border bg-layer-2`; overlay: `bg-overlay-default/40` |
| Product tile (no image) | `Button` tile with accent background | `product.name`, `product.price` | `aspect-square rounded-[18px] border border-border` plus a rotating accent like `bg-layer-info / bg-layer-warning / bg-layer-recent / bg-layer-success / bg-layer-highlight` |
| Inventory “Custom item” | `Button` tile (action) + `Plus` icon | `onCreateCustomItem()` (or reuse `onAddItem` with a sentinel) | `aspect-square rounded-[18px] bg-layer-2 border border-border flex flex-col items-center justify-center gap-2` |
| Inventory folder tile | `Button` tile + inner icon container + `Folder` icon | `productFolders[]`, `onOpenFolder(folderId)` | outer: `aspect-square rounded-[18px] bg-layer-2 border border-border`; inner: `rounded-[12px] bg-layer-3 border border-border` |
| Bottom cart bar | `Button` as fixed bar | `activeOrder.total`, `activeOrder.items[]`, `onOpenCart()` | `fixed left-0 right-0 bottom-0 bg-layer-1 border-t border-border px-5 py-4 justify-start` |
| Cart amount + summary | Typography blocks inside bar | `formatMoney(total)`, `summaryText` | amount: `text-[34px] font-semibold leading-none tracking-tight`; summary: `text-[14px] text-muted-foreground truncate` |
| Cart expand affordance | Circle container + `ChevronUp` icon | none | `h-10 w-10 rounded-[9999px] bg-layer-2 border border-border` |

## Data requirements
- `orders: Array<{ id: string; name: string; items: Array<{ quantity: number; name: string }>; total: number }>`
- `activeOrderId?: string` (defaults to first order if missing)
- `products: Array<{ id: string; name: string; price: number; isFavorite?: boolean; image?: string }>`
- `productFolders: Array<{ id: string; name: string; icon?: string }>`
- Derived:
  - `favorites = products.filter(p => p.isFavorite)`
  - `itemCount(order) = sum(order.items[].quantity)`
  - `summaryText(order) = first 3 item names joined, with trailing ellipsis when more`
  - `formatMoney(amount)` (safe default currency formatting)

## Interaction requirements
- `onCreateOrder(): void` — creates a new order and makes it active
- `onSelectOrder(orderId: string): void` — switches active order
- `onAddItem(productId: string): void` — adds an item to the active order
- `onOpenFolder(folderId: string): void` — navigates to folder detail / filters inventory items
- `onCreateCustomItem(): void` (or equivalent) — launches a custom-item flow
- `onOpenCart(): void` — opens the expanded cart (sheet/page)

## Notes / compromises
- The mockup uses “pill” order chips; implement with `Button` + `Badge` rather than custom chip components.
- Tile colors are treated as semantic accents (rotate through allowed `bg-layer-*` accents) instead of matching exact hues.
- Inventory area can be implemented in two stages: (1) folder tiles row, (2) optionally render product tiles below for the active folder/category.
- Use `no-scrollbar` for the horizontal chip scroller to match the clean mockup while retaining scroll behavior.
- Reserve bottom padding/spacer so the fixed cart bar doesn’t overlap scrollable content.
