# User Profile Blueprint

**Screen Name**: `UserProfilePreview`
**Presentation**: `page`

## Component Hierarchy

- `div` (Page container) `p-4 space-y-6 max-w-2xl mx-auto bg-background min-h-screen text-foreground`
  - `div` (Header) `flex items-center gap-3`
    - `Button` (Back) `variant="ghost" size="icon"`
    - `h1` (Title) `text-xl font-semibold`
  - `div` (Full Name) `space-y-2`
    - `div` (Label Row) `flex justify-between items-center`
      - `Label` "FULL NAME"
      - `Badge` "ADMIN" `variant="default" rounded-[6px]` (looks like small badge)
    - `Input` "Ghhh" `readOnly`
  - `div` (Email) `space-y-2`
    - `Label` "EMAIL ADDRESS"
    - `Input` "holodroid23@gmail.com" `readOnly`
  - `div` (Security) `space-y-2`
    - `Label` "SECURITY"
    - `SettingsGroup`
      - `SettingsItem` (Change PIN)
        - `SettingsItemIcon` > `Lock` or `Grid`? Mock shows Lock.
        - `SettingsItemContent` > `SettingsItemTitle` "Change PIN"
        - `SettingsItemAction` > `ChevronRight`
      - `SettingsItem` (Change Password)
        - `SettingsItemIcon` > `Key`
        - `SettingsItemContent` > `SettingsItemTitle` "Change Password"
        - `SettingsItemAction` > `ChevronRight`

## Component Mapping

| UI Block | Component | Props/Attributes | Tokens/Classes |
|---|---|---|---|
| Page Container | `div` | - | `p-4 space-y-6 bg-background max-w-2xl mx-auto` |
| Header Back | `Button` | `variant="ghost" size="icon"` | `text-muted-foreground w-10 h-10 rounded-[12px]` |
| Header Title | `h1` | - | `text-xl font-semibold` |
| Label | `Label` | - | `text-xs font-bold text-muted-foreground uppercase tracking-wide` |
| Badge | `Badge` | - | `bg-primary/20 text-primary hover:bg-primary/20 rounded-[6px] text-[10px] px-2 h-5` |
| Input | `Input` | `readOnly` | `bg-layer-1 border-border rounded-[12px] h-12` |
| Security List | `SettingsGroup` | - | `space-y-2`? No, Mock shows separate items with rounded corners. |
| Security Item | `SettingsItem` | - | `bg-layer-1 border border-border rounded-[18px] p-4 flex items-center gap-4` |
| Icons | `Lock`, `Key` | - | `text-muted-foreground` |
| Chevron | `ChevronRight` | - | `text-muted-foreground h-5 w-5` |

## Token Extraction

- **Colors**:
  - Background: `bg-background`
  - Layer: `bg-layer-1`
  - Text: `text-foreground`
  - Label: `text-muted-foreground`
  - Admin Badge: Blue? Mock looks blue-ish or default primary button color? "ADMIN" tag usually primary or brand color. I will use `bg-primary/20 text-primary`.

- **Radii**:
  - Inputs: `rounded-[12px]`
  - List Items: `rounded-[18px]` (Security items look very rounded)
  - Badge: `rounded-[6px]` (Small)

- **Typography**:
  - Headings: `text-xl`
  - Labels: `text-xs font-bold uppercase`
  - Body: `text-base`

## Implementation Steps

1. Create `UserProfilePreview.tsx`.
2. Define layout.
3. Implement Form fields (Name, Email).
4. Implement Security section using `SettingsItem` but styled as large buttons/cards (`rounded-[18px]`).
5. Add icons.
