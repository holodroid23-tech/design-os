# General Settings Blueprint

**Screen Name**: `GeneralSettingsPreview`
**Presentation**: `page` (Full screen settings page)

## Component Hierarchy

- `div` (Page container) `p-4 space-y-6 max-w-2xl mx-auto`
  - `div` (Header) `flex items-center gap-3`
    - `Button` (Back) `variant="ghost" size="icon"`
    - `h1` (Title) `text-lg font-semibold`
  - `div` (Form content) `space-y-6`
    - `div` (Store Name) `space-y-2`
      - `Label`
      - `Input`
    - `div` (Store Street) `space-y-2`
      - `Label`
      - `Input`
    - `div` (Email) `space-y-2`
      - `Label`
      - `Input`
    - `div` (Website) `space-y-2`
      - `Label`
      - `Input`
    - `div` (Currency) `space-y-2`
      - `Label`
      - `Select` > `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`
    - `SettingsGroup`
      - `SettingsItem`
        - `SettingsItemContent` > `SettingsItemTitle` ("Display Always On")
        - `SettingsItemAction` > `Switch`
    - `div` (Time Format) `space-y-2`
      - `Label`
      - `Tabs` `defaultValue="am-pm" w-full`
        - `TabsList` `grid w-full grid-cols-2`
          - `TabsTrigger`
          - `TabsTrigger`
    - `div` (Taxes Section) `space-y-3`
      - `div` (Header) `flex items-center justify-between`
        - `Label` ("Use Taxes")
        - `div` (Right controls) `flex items-center gap-2`
          - `Switch`
          - `Button` (Add) `size="icon" variant="ghost"`
      - `div` (Tax List) `space-y-2`
        - `Card` (Tax Item 1) `border-primary` (selected/default)
          - `CardContent` `flex items-center justify-between p-3`
            - `span` (Tax Name)
            - `Button` (Delete) `size="icon" variant="ghost"`
        - `Card` (Tax Item 2)
          - `CardContent` `flex items-center justify-between p-3`
            - `span` (Tax Name)
            - `Button` (Delete) `size="icon" variant="ghost"`
    - `div` (Pin Lock) `space-y-2`
      - `Label`
      - `div` (Options) `flex flex-wrap gap-2`
        - `Button` (1m) `variant="outline" size="sm"`
        - `Button` (2m) `variant="default" size="sm"` (Selected)
        - `Button` (3m) `variant="outline" size="sm"`
        - ...
    - `div` (Footer Actions) `pt-4`
      - `Button` (Delete Account) `variant="ghost" className="text-destructive hover:text-destructive/90"`

## Component Mapping

| UI Block | Component | Props/Attributes | Tokens/Classes |
|---|---|---|---|
| Page Container | `div` | - | `p-4 space-y-6 bg-background min-h-screen` |
| Header Back | `Button` | `variant="ghost" size="icon"` | `text-muted-foreground` |
| Header Title | `h1` | - | `text-lg font-semibold text-foreground` |
| Input Row | `div` | - | `space-y-2` |
| Label | `Label` | - | `text-sm font-medium text-muted-foreground` (Sentence case) |
| Input | `Input` | `placeholder="..."` | `bg-layer-1 border-border rounded-[6px]` |
| Currency Select | `Select` | - | `rounded-[6px]` |
| Display Switch | `Switch` | `checked={true}` | `data-[state=checked]:bg-primary` |
| Time Tabs | `Tabs` | `defaultValue="am"` | `w-full` |
| Time Triggers | `TabsTrigger` | - | `rounded-[6px]` |
| Type Helper | `span` | - | `text-xs text-muted-foreground` |
| Tax Card | `Card` | - | `border bg-layer-1 p-0 rounded-[6px]` (Active: `border-primary bg-primary/5`) |
| Timer Chips | `Button` | `size="sm"` | Selected: `variant="default"`. Unselected: `variant="outline" bg-transparent border-border`. |
| Delete Button | `Button` | `variant="ghost"` | `text-destructive hover:bg-destructive/10 w-full sm:w-auto justify-start px-0` |

## Token Extraction

- **Colors**:
  - Background: `bg-background` / `bg-layer-0`
  - Input Background: `bg-layer-1`
  - Text: `text-foreground` (primary), `text-muted-foreground` (labels)
  - Primary (Selection): `bg-primary`, `text-primary-foreground`
  - Border: `border-border`
  - Destructive: `text-destructive`

- **Radii**:
  - Inputs/Tabs/Cards: `rounded-[6px]`

- **Typography**:
  - Headings: `text-lg font-semibold`
  - Labels: `text-xs font-medium text-muted-foreground`
  - Body: `text-sm`

## Implementation Steps

1. Create `GeneralSettingsPreview.tsx`.
2. Define `interface GeneralSettingsProps`.
3. Implement layout using `space-y` stack.
4. Implement sections.
5. Use `Lucide` icons.
6. Ensure responsive and interactive states.
