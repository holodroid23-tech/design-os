# New Expense Modal Blueprint

**Screen Name**: `NewExpenseModalPreview`
**Presentation**: `modal`

## Component Hierarchy

- `div` (Modal Container) `bg-background p-4 space-y-6 min-h-screen text-foreground relative rounded-t-[18px]` (Usually modal content is inside a Sheet/Dialog, but here we just replicate content).
  - `div` (Handle) `w-12 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-2`
  - `div` (Header) `flex items-center justify-between`
    - `h2` "New Expense" `text-lg font-semibold`
    - `Button` (Close) `variant="ghost" size="icon"` > `X`
  - `div` (Name) `space-y-2`
    - `Label` "NAME"
    - `div` `flex gap-2`
      - `Input` "e.g. Monthly Rent" `flex-1 rounded-[12px]`
      - `Button` (Star) `variant="secondary" size="icon" rounded-[12px]` > `Star`
  - `div` (Category) `space-y-2`
    - `Label` "CATEGORY"
    - `Select` "Operations" `rounded-[12px]`
  - `div` (Tax) `space-y-2`
    - `Label` "TAX"
    - `div` `grid grid-cols-3 gap-2`
      - `Button` "0%" `variant="outline" rounded-[12px]`
      - `Button` "10%" `variant="outline" rounded-[12px]`
      - `Button` "21%" `variant="outline" rounded-[12px] border-primary text-primary`
  - `div` (Appearance) `space-y-2`
    - `Label` "APPEARANCE"
    - `Tabs` (Color/Image) `w-full`
      - `TabsList` `w-full grid grid-cols-2 rounded-[12px]` (Segmented control style)
        - `TabsTrigger` "Color"
        - `TabsTrigger` "Image"
      - `TabsContent` "image"
        - `div` (Upload Area) `border-2 border-dashed border-border rounded-[18px] p-6 flex flex-col items-center gap-4 bg-layer-1/50`
          - `div` (Icon Circle) `h-12 w-12 bg-layer-2 rounded-full flex items-center justify-center`
            - `Camera`
          - `div` (Buttons) `space-y-2 w-full max-w-xs`
            - `Button` "Choose from library" `variant="secondary" w-full rounded-[12px]`
            - `Button` "Take photo" `variant="secondary" w-full rounded-[12px]`
  - `div` (Footer) `pt-4`
    - `Button` "Save Expense" `w-full h-12 rounded-[12px] bg-primary text-primary-foreground`

## Component Mapping

| UI Block | Component | Props/Attributes | Tokens/Classes |
|---|---|---|---|
| Modal Layout | `div` | - | `bg-background p-4 rounded-t-[18px] space-y-5` |
| Handle | `div` | - | `w-12 h-1 bg-muted rounded-full mx-auto` |
| Header Title | `h2` | - | `text-lg font-semibold` |
| Close Button | `Button` | `size="icon" variant="ghost"` | `text-muted-foreground` |
| Labels | `Label` | - | `text-xs font-bold text-muted-foreground uppercase tracking-wide` |
| Input | `Input` | `placeholder="..."` | `bg-layer-1 border-border rounded-[12px] h-12` |
| Fav Button | `Button` | `variant="secondary"` | `bg-layer-1 border border-border h-12 w-12 rounded-[12px]` |
| Select | `Select` | - | `bg-layer-1 h-12 rounded-[12px]` |
| Tax Buttons | `Button` | `variant="outline"` | `active: border-primary text-primary`. `h-10 rounded-[12px]` |
| Tabs | `Tabs` | - | - |
| Tabs List | `TabsList` | - | `bg-layer-1 p-1 h-10 rounded-[12px]` |
| Upload Area | `div` | - | `border-dashed border-2 p-6 rounded-[18px]` |
| Upload Buttons | `Button` | `variant="secondary"` | `bg-layer-2 w-full h-10 rounded-[12px]` |
| Save Button | `Button` | - | `bg-primary h-14 rounded-[12px] text-lg font-semibold` |

## Token Extraction

- **Colors**:
  - Background: `bg-background`
  - Layer: `bg-layer-1`
  - Primary: `bg-primary` (Use Green as per DS rules, mock shows Blue. Again, consistently follow DS = Green? Or follow Mock = Blue? The "Save Expense" button is Blue in mockup. The "21%" border is Blue.
  - Previous `UsersList` I used `bg-primary` (Green).
  - I will use `bg-primary` (Green) to obey "Design System Wins" rule.
  - Or I can look for a Blue button token. `button.purchase` is yellow. `brand-royal-blue` exists.
  - If I use `bg-[#007aff]` I break the rules.
  - I will use `bg-primary` (Green).

- **Radii**:
  - Inputs/Buttons: `rounded-[12px]`
  - Modal Top: `rounded-[18px]`
  - Upload Area: `rounded-[18px]`

## Implementation Steps

1. Create `NewExpenseModalPreview.tsx`.
2. Define Layout (using `space-y-5` to separate sections).
3. Implement Header.
4. Implement Form Fields.
5. Implement Tabs for Appearance.
6. Implement Footer.
