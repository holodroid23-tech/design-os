# RegisterGridPreview blueprint

## Presentation
- presentation: mobile

## One-line intent
Main point-of-sale grid for selecting items, showing an empty state message when no items are selected.

## Hierarchy tree
- Root (full screen, dark)
  - Layout Header
    - "Add" Button (Icon only)
    - "Order 1" Button (Pill, Active)
  - Grid Content (Scrollable)
    - Custom Item Tile
    - Product Tile (Solid Color) x5
    - Product Tile (Image) x3
  - Empty State Footer
    - Icon Bubble (Hand wave)
    - Title "Welcome to your new shop!"
    - Subtitle "Tap any item... manage your inventory."

## Component mapping

| UI block | Component/pattern | Props/data | Tokens/classes |
|---|---|---|---|
| Root | `div` | - | `min-h-screen bg-layer-level-0 text-foreground flex flex-col font-sans` |
| Top Bar | `div` (flex) | - | `flex items-center gap-3 px-4 py-3 bg-layer-level-0` |
| Add Button | `Button` | `size="icon"` | `rounded-full w-10 h-10 bg-layer-level-2 text-foreground hover:bg-layer-level-3 border-none` |
| Order Button | `Button` | - | `h-10 rounded-full bg-brand-royal-blue text-white hover:bg-brand-royal-blue/90 font-medium px-6 border-none` |
| Grid | `div` (grid) | - | `grid grid-cols-3 gap-3 p-4` |
| Custom Item Tile | `Button` | - | `aspect-square h-auto w-full p-0 rounded-[18px] bg-layer-level-2 border-0 flex flex-col items-center justify-center gap-2 text-center hover:bg-layer-level-3` |
| Custom Item Icon | `Plus` (Icon) | - | `w-6 h-6 text-brand-ocean` |
| Custom Item Label | `span` | - | `text-[13px] font-medium leading-tight text-white` |
| Product Tile (Color) | `Button` | `title`, `price`, `color` | `aspect-square h-auto w-full p-0 rounded-[18px] flex flex-col items-center justify-center gap-0.5 text-white border-none shadow-sm hover:opacity-90` |
| Product Tile (Image) | `Button` | `title`, `price`, `image` | `aspect-square h-auto w-full p-0 rounded-[18px] relative overflow-hidden flex flex-col items-center justify-center text-white border-none group` |
| Tile Image | `img` | `src` | `absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105` |
| Tile Overlay | `div` | - | `absolute inset-0 bg-black/40` |
| Tile Content | `div` | - | `relative z-10 flex flex-col items-center gap-0.5` |
| Tile Text | `span` | - | `font-semibold text-[15px] text-center drop-shadow-md` |
| Tile Price | `span` | - | `text-[13px] opacity-90 font-medium drop-shadow-md` |
| Empty State | `div` (flex col) | - | `mt-12 flex flex-col items-center justify-center text-center px-6 pb-10` |
| Welcome Icon Bubble | `div` | - | `w-14 h-14 rounded-full bg-layer-level-2 flex items-center justify-center mb-5` |
| Welcome Icon | `Hand` (Icon) | - | `w-6 h-6 text-brand-ocean` |
| Welcome Title | `h2` | - | `text-[22px] font-bold tracking-tight mb-3 text-white` |
| Welcome Text | `p` | - | `text-onLayer-secondary text-[15px] leading-relaxed max-w-[280px]` |
| Welcome Link | `span` | - | `text-brand-ocean font-medium cursor-pointer hover:underline` |

## Data requirements
- `currentOrder: { id: string, label: string }`
- `products: Array<{ id: string, name: string, price: string, type: 'solid' | 'image', color?: string, image?: string }>`
   - Sample colors:
     - Cappuccino: `bg-brand-royal-blue`
     - Espresso: `bg-brand-coral`
     - Taro Latte: `bg-brand-plum`
     - Flat White: `bg-brand-coral`
     - Iced Latte: `bg-brand-ocean`
- `onAddItem(id: string)`
- `onManageInventory()`

## Interaction requirements
- Tap item -> Add to order details (visual feedback)
- Tap "Custom item" -> Trigger custom entry
- Tap "Order 1" -> Show order details/list
- Scroll grid if many items (overflow handled by page)

## Notes / compromises
- Used `bg-brand-*` colors (Royal Blue, Coral, Plum, Ocean) to match the vivid mockup colors, as standard `primary` (Green) does not match.
- Used `Button` for all tiles to ensure accessibility and interactivity.
- Text sizes adjusted to match visual hierarchy (Title ~22px, Tile text ~15px).
- "Welcome" icon approximated as `Hand` icon in a bubble.
