# Design System Export

This package contains a complete design system including all design tokens, component examples, and component implementations.

## What's Included

**Design Tokens:**
- `design-system/colors.json` — All color tokens (semantic, primitives, gradients)
- `design-system/typography.json` — Typography styles, sizes, examples
- `design-system/spacing.json` — Spacing scale (6px grid), component sizes
- `design-system/radius.json` — Border radius values
- `design-system/elevations.json` — Elevation/shadow values
- `design-system/README.md` — Design system documentation

**Implementation Guide:**
- `implementation-guide.md` — Design system rules, component examples, and enforcement guidelines

**Component Examples:**
- `components/ComponentExamples.tsx` — Complete showcase of all UI components
- `components/ChartExamples.tsx` — Chart visualization examples

**Component Implementations:**
- `components/ui/` — All UI component implementations (34 components)
- `components/settings/` — Settings-specific components (4 components)
- `components/previews/` — Preview components referenced in examples

**Utility Functions:**
- `lib/utils.ts` — cn() and other utilities

---

## How to Use This Package

### Option A: Import Into Design OS Project

To use this design system in another Design OS project:

1. Copy design system files from `design-system-export/design-system/` to `product/design-system/` in your Design OS project
2. Copy `implementation-guide.md` to `product/implementation-guide.md`
3. Copy component examples to `src/components/`:
   - `ComponentExamples.tsx`
   - `ChartExamples.tsx`
4. Copy UI components to `src/components/ui/`
5. Copy settings components to `src/components/settings/`
6. Copy preview components to `src/components/previews/`
7. Copy utility files to `src/lib/utils.ts`

Files will be automatically detected and used by Design OS.

### Option B: Use in Other Projects

#### Design Tokens Only

Use the JSON files to configure your styling system:

**For Tailwind CSS:**
1. Read `design-system/colors.json` to configure your Tailwind theme
2. Read `design-system/spacing.json` for spacing scale values
3. Read `design-system/radius.json` for border radius values
4. Read `design-system/typography.json` for font sizes and weights

**For CSS Variables:**
1. Convert JSON files to CSS custom properties
2. Use the semantic color names in your stylesheets

**For React Native:**
1. Import JSON files directly
2. Use with StyleSheet.create() or your styling solution

**For Native Apps (iOS/Android):**
1. Convert JSON values to platform-specific formats
2. Use semantic color names in your design system

#### Component Examples

Reference `ComponentExamples.tsx` and `ChartExamples.tsx` for:
- UI patterns and layouts
- Component usage examples
- Design system application
- Accessibility patterns

#### Component Implementations

Copy and adapt components from `components/ui/` and `components/settings/`:

1. Components use Tailwind CSS utility classes
2. All import paths are relative (no `@/...` aliases)
3. Components depend on `lib/utils.ts` for the `cn()` function
4. Components are built with Radix UI primitives (for web)

**To use in your project:**
1. Copy the components you need to your project
2. Copy `lib/utils.ts` to your project
3. Install dependencies (see below)
4. Adjust import paths if needed for your project structure

---

## Dependencies

The component implementations require these dependencies:

```json
{
  "@radix-ui/react-accordion": "^1.2.2",
  "@radix-ui/react-avatar": "^1.1.2",
  "@radix-ui/react-checkbox": "^1.1.3",
  "@radix-ui/react-collapsible": "^1.1.2",
  "@radix-ui/react-dialog": "^1.1.4",
  "@radix-ui/react-dropdown-menu": "^2.1.4",
  "@radix-ui/react-label": "^2.1.1",
  "@radix-ui/react-popover": "^1.1.4",
  "@radix-ui/react-radio-group": "^1.2.2",
  "@radix-ui/react-separator": "^1.1.1",
  "@radix-ui/react-slider": "^1.2.1",
  "@radix-ui/react-switch": "^1.1.2",
  "@radix-ui/react-tabs": "^1.1.2",
  "clsx": "^2.1.1",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.469.0",
  "react-day-picker": "^9.4.4",
  "recharts": "^2.15.0",
  "sonner": "^1.7.1",
  "tailwind-merge": "^2.6.0"
}
```

---

## Component Examples Included

The export includes examples for all these components:

- Buttons (Primary, Secondary, Ghost, Destructive, etc.)
- Steppers
- Sliders
- Icons with Background
- Product/Expense Cards
- Bottom Sliding Menu
- Sliding Selector
- Snackbars (Toast notifications)
- Modals (Dialogs)
- Sheets (Side Panels)
- Radio Buttons
- Numpad
- Checkboxes
- Dropdown Menus
- Inputs
- Switches
- Date Picker
- Color Picker
- Color Selector
- Badges
- Tabs
- Selection Cards
- Settings Items
- Icons (Design System)
- Elevations & Shadows
- Atomic Items
- Section Titles
- Order/Expense Items
- Status Badges
- Avatars
- Security Interfaces
- Complex Accordions
- Order Management Tabs
- Media Upload
- Check Lists
- DS Icons Background
- Empty States
- Dividers
- Email Templates
- Receipt
- Selection & Search
- Charts (Bar, Line, Pie, Area, Radar)

---

## Design System Rules

When using this design system in your project, follow these rules (from `implementation-guide.md`):

1. Always use spacing scale values (space-1 through space-13) - never arbitrary values
2. Use only design system radius: small (6px), medium (12px), large (18px), full (50%), pill (1998px)
3. Use semantic color names from colors.json - never hardcode hex values
4. Use exact typography sizes from typography.json (H1: 28px, H2: 22px, Regular: 16px, etc.)
5. Component sizes: 42px (compact), 48px (default), 54px (large), 60px (bars)
6. Minimum 48px touch targets for all interactive elements
7. Dark mode only - all components designed for dark mode

See `implementation-guide.md` for detailed component examples and patterns.

---

## Benefits

- **Complete Package**: Design tokens, component examples, and implementations
- **Reuse Components**: All component examples and implementations for reference
- **Share Design System**: Share with team members including all components
- **Version Control**: Version control design system separately from product code
- **Easy Migration**: Easy migration between Design OS projects
- **Integration**: Integration with external projects using components
- **Documentation**: Includes implementation guide with examples

---

## Support

For questions or issues with this design system package:
- Review the `implementation-guide.md` for detailed rules and examples
- Reference `ComponentExamples.tsx` for usage patterns
- Check component source code in `components/ui/` for implementation details

---

*Exported from Design OS*
