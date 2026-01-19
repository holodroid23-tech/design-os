# Item Management Blueprint

**Screen Name**: `ItemManagementPreview`
**Presentation**: `page`

## Component Hierarchy

- `div` (Page container) `p-4 space-y-4 bg-background min-h-screen relative pb-24`
  - `div` (Header) `flex items-center gap-3`
    - `Button` (Back) `variant="ghost" size="icon"`
    - `h1` (Title) `text-lg font-semibold`
  - `div` (List) `space-y-2`
    - `SettingsItem` (Folder) x2
      - `SettingsItemIcon` > `IconTile` (Folder icon)
      - `SettingsItemContent`
        - `SettingsItemTitle` (Name)
        - `SettingsItemDescription` (Item count)
      - `SettingsItemAction` > `Switch`
    - `SettingsItem` (Item) x5
      - `SettingsItemIcon` > `Avatar` (Image)
      - `SettingsItemContent`
        - `SettingsItemTitle` (Name)
        - `SettingsItemDescription` (Price)
      - `SettingsItemAction` > `Switch`
  - `div` (Footer Actions) `fixed bottom-4 left-4 right-4 grid grid-cols-2 gap-3`
    - `Button` (Add folder) `variant="outline" rounded-[12px] h-12`
    - `Button` (Add item) `variant="outline" rounded-[12px] h-12`

## Component Mapping

| UI Block | Component | Props/Attributes | Tokens/Classes |
|---|---|---|---|
| Page Container | `div` | - | `p-4 space-y-4 bg-background min-h-screen` |
| Header Back | `Button` | `variant="ghost" size="icon"` | `text-muted-foreground bg-layer-1`? Mock shows simple back arrow, likely typical header. |
| Header Title | `h1` | - | `text-xl font-semibold` |
| List Item (Folder) | `SettingsItem` | - | `bg-layer-1 rounded-[12px] border-border` |
| Folder Icon | `IconTile` | `icon={Folder} variant="tile" tone="brand-ocean"`? | - |
| List Item (Standard) | `SettingsItem` | - | `bg-layer-1 rounded-[12px] border-border` |
| Item Image | `Avatar` | `src="..."` | `rounded-full` |
| Switch | `Switch` | `defaultChecked={true}` | - |
| Bottom Actions | `Button` | `variant="outline"` | `rounded-[12px] h-12 border-border bg-layer-0 text-foreground` |

## Token Extraction

- **Colors**:
  - Background: `bg-background`
  - Card/Item Background: `bg-layer-1`
  - Text: `text-foreground`, `text-muted-foreground`
  - Folder Icon: Blueish, likely `brand-ocean` or `info` tone
  - Switch: Primary `bg-primary`

- **Radii**:
  - Items: `rounded-[12px]` (Medium)
  - Buttons: `rounded-[12px]`
  - Avatar: `rounded-full` (9999px)

- **Typography**:
  - Header: `text-xl font-semibold`
  - Item Title: `text-regular-semibold`
  - Item Subtitle: `text-xs text-muted-foreground`

## Implementation Steps

1. Create `ItemManagementPreview.tsx`.
2. Define `interface ItemManagementProps`.
3. Use `SettingsItem` components for the list.
4. Use `IconTile` for folders and `Avatar` (or `img` with class) for items.
5. Implement fixed bottom footer for actions.
6. Responsive check (max-width for larger screens).
