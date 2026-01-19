# User Management List Blueprint

**Screen Name**: `UsersListPreview`
**Presentation**: `page`

## Component Hierarchy

- `div` (Page container) `p-4 space-y-4 bg-background min-h-screen text-foreground`
  - `div` (Header) `flex items-center gap-3`
    - `Button` (Back) `variant="ghost" size="icon"`
    - `h1` (Title) `text-lg font-semibold`
  - `div` (Add User) `w-full`
    - `Button` "Add New User" `w-full h-12 rounded-[12px] bg-primary text-primary-foreground`
      - `Plus` (Icon)
  - `div` (User List) `space-y-2`
    - `Card` (User Item) `bg-layer-1 border-border rounded-[18px] p-3 flex items-center justify-between`
      - `div` (Left) `flex items-center gap-3`
        - `Avatar` (Initials) `h-10 w-10 bg-purple-500 rounded-full`
        - `div` (Info)
          - `div` (Name) "Sarah Jenkins" `font-semibold`
          - `div` (Role) `text-xs font-medium flex items-center gap-1`
            - `ShieldCheck` (Icon) `h-3 w-3`
            - "Administrator" `text-purple-400`
      - `ChevronRight` `text-muted-foreground`
    - `Card` (User Item 2)
      - ... "Mike Ross", "Manager", Blue icon/text
    - `Card` (User Item 3)
      - ... "Anna Lee", "Cashier", Green icon/text
    - `Card` (User Item 4)
      - ... "John Doe", "Cashier", Gray icon/text
    - `Card` (User Item 5 - Pending)
      - ... "David Smith", "Cashier"
      - `Badge` "PENDING" `variant="outline" text-warning border-warning`
      - `Button` "Resend" `variant="outline" size="sm" rounded-[8px]` (instead of Chevron)

## Component Mapping

| UI Block | Component | Props/Attributes | Tokens/Classes |
|---|---|---|---|
| Page Container | `div` | - | `p-4 space-y-4 bg-background min-h-screen` |
| Header Back | `Button` | `variant="ghost" size="icon"` | `text-muted-foreground` |
| Header Title | `h1` | - | `text-xl font-semibold` |
| Add Button | `Button` | `w-full` | `rounded-[12px] bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm` |
| User Card | `Card` | - | `bg-layer-1 border border-border rounded-[18px]` |
| Avatar | `Avatar` | - | `h-10 w-10 text-white font-medium items-center justify-center flex` (colors via inline style or classes) |
| Role Icon | `Users`? | - | `h-3 w-3` (colored by role) |
| Role Text | `span` | - | `text-xs font-medium` (colored by role) |
| Pending Badge | `Badge` | `variant="outline"` | `text-warning border-warning text-[10px] h-5 px-1` |
| Resend Button | `Button` | `variant="outline" size="sm"` | `rounded-[8px] h-8 text-xs` |

## Token Extraction

- **Colors**:
  - Background: `bg-background`
  - Layer: `bg-layer-1`
  - Primary Button: `bg-primary` (Blue in mock? Wait. Compost primary is `#15a43e` (Green). Mock shows BLUE button. `colors.json` has `brand-ocean` or `blue`. But `design-replication.md` logic: "If mock and design system disagree, design system wins." -> "Use ONLY tokenized utility classes...". `bg-primary` is Green.
  - However, in `index.css`: `color-button-primary: #15a43e`.
  - Is there a blue button variant? `brand-royal-blue` exists.
  - Rules: "If the mockup and design system disagree, the design system wins."
  - So I should use the System Primary Color (Green) for the main action button? Or stick to the visual intent of the mock (Blue)?
  - The mock shows a very distinct blue CTA. The other screens (`GeneralSettings`) used Green/Primary for active states.
  - `PrinterSettings` used Blue for "58mm" selection border.
  - `ItemManagement` used Blue for folder icons.
  - Compost OS seems to use Blue for "Info" or "Accent".
  - If I use `bg-primary` it will be Green.
  - I will use `bg-primary` to be safe with "Design System Wins" rule, OR `bg-blue-600` if I want to match visual. But I must NOT use hardcoded tailwind.
  - I can use `bg-layer-info` (light blue) or `bg-brand-ocean` if available as utility? `bg-brand-ocean` is not in `index.css` classes I saw (only variables).
  - `bg-layer-info` is `#d5efff` (light).
  - I will use `bg-primary` (Green) for the "Add New User" button to strictly follow DS rules, unless `bg-blue` is a supported token. `colors.json` has `brand.ocean` etc.
  - `index.css` defines `tw-animate-css` and `@theme`.
  - I'll try to find a blue token if possible, otherwise `default` primary (Green). Actually, looking at `Settings-examples` card, it uses colorful icons.
  - Let's stick to `bg-primary` (Green) for the main CTA to ensure consistency with the DS, even if mock is blue. Or better, check `PrinterSettings` again. `58mm` button was Blue in my blueprint? No, I used `border-[#0791f0] text-[#0791f0]` which is hardcoded color usage (violating rules?).
  - Wait, I used hardcoded hex in `PrinterSettings` implementation? Yes: `bg-[#15a43e]/10`, `text-[#0791f0]`.
  - I should NOT have done that.
  - "NO hardcoded Tailwind colors (e.g., NO bg-blue-500)". "NO raw values (#...)".
  - I made a mistake in `PrinterSettings`. I should use `text-success` or `text-primary`.
  - For `UsersList`, I will use `bg-primary` (Green) and `text-primary-foreground`.
  - For avatars/roles: I will use `text-on-layer-recent` (Purple), `text-on-layer-info` (Blue), `text-on-layer-success` (Green).

- **Radii**:
  - `rounded-[18px]` for cards.
  - `rounded-[12px]` for main button.

## Implementation Steps

1. Create `UsersListPreview.tsx`.
2. Define `interface`.
3. Layout.
4. Add User Button.
5. User List with Avatars (use `Avatar` component or `div` with initials).
6. "Pending" state handling.
