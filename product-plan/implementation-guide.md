# Implementation Guide

**CRITICAL**: This guide ensures all design system rules are properly applied during implementation. **READ THIS FIRST** before starting any component development.

## Quick Reference - Design System Rules

**These rules MUST be followed for every component:**

1. **Spacing**: Always use spacing scale (space-1 through space-13). Never use arbitrary values like `p-5`, `m-7`.
2. **Radius**: Use only: 3px (3px), small (6px), medium (12px), large (18px), full (50%), pill (1998px)
3. **Colors**: Use semantic color names from colors.json. Never hardcode hex values.
4. **Typography**: Use exact sizes from typography.json (H1: 28px, H2: 22px, Regular: 16px, etc.)
5. **Component Sizes**: 36px (mini), 42px (compact), 48px (default), 54px (large), 60px (bars)
6. **Touch Targets**: Minimum 48px for all interactive elements
7. **Dark Mode Only**: All components designed for dark mode
8. **6px Grid**: All spacing and sizes align with 6px base unit
9. **Form Validation**: Never disable action buttons. Always allow submission and show errors with highlighting and auto-scroll
10. **Elevations**: Use standardized shadow tokens: shadow-xs, shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl, and shadow-inner for pressed states.
11. **Mockups vs. Design System**: Mockups are for layout/flow only. **Always** use Design System styles over mockup visuals (e.g., ignore uppercase labels in mockups if DS uses Sentence case).

**Violating these rules will result in inconsistent UI. Always reference the design system JSON files.**

## Design System Rules Summary

### Colors
- **Source**: `product/design-system/colors.json`
- **System**: ComPOSt Design System (comprehensive semantic colors)
- **Mode**: Dark mode only
- **Usage**: Use semantic color names (e.g., `layer-level-0`, `on-layer-primary`, `border-primary`)

### Typography
- **Source**: `product/design-system/typography.json`
- **Fonts**: System fonts (SF Pro on iOS, Roboto on Android, system-ui on web)
- **Styles**: H1 (28px), H2 (22px), H3 (18px), H4 (14px uppercase), Regular (16px), Small (14px), Support Small (12px)
- **Weights**: Regular (400), Semibold (600)
- **Usage**: Apply exact font sizes, line heights, and weights from typography.json

### Spacing
- **Source**: `product/design-system/spacing.json`
- **Grid**: 6px base unit
- **Scale**: space-1 (3px) through space-13 (120px)
- **Usage**: Always use spacing values from the scale, never arbitrary values
- **Component Sizes**: 42px (compact), 48px (default), 54px (large), 60px (bars)

### Radius
- **Source**: `product/design-system/radius.json`
- **Values**: 3px (3px), Small (6px), Medium (12px), Large (18px), Full (50%), Pill (1998px)
- **Correlation**: Matches spacing grid (3px=space-1, small=space-2, medium=space-4, large=space-5)
- **Usage**: Use radius values that correlate with spacing for consistency

### Elevations & Shadows (Soul Design System)
- **Source**: `product/design-system/elevations.json`
- **Levels**:
  - `shadow-sm` (Shadow 100): Default for cards, widgets, and persistnt containers.
  - `shadow-md` (Shadow 200): Hover states for Level 1 elements.
  - `shadow-lg` (Shadow 300): Elements revealed by user action (popovers, dropdowns).
  - `shadow-xl` (Shadow 400): Floating elements without overlays.
- **Rules**: 
  - Shadows must use multi-layered values to ensure tactile depth.
  - Use `shadow-inner` for pressed/active states.
  - Use `shadow-btn` variants for main action buttons.

### Form Validation & Disabled States

**CRITICAL RULE: Never disable action buttons for validation purposes.**

Disabled buttons create poor user experience, especially on mobile devices where:
- Tooltips don't work to explain why a button is disabled
- Users can't understand what's wrong without clear feedback
- Disabled states block user progress and create frustration

**Instead, follow this pattern:**

1. **Always allow submission** - Action buttons remain enabled at all times
2. **Show errors on submit** - When user clicks submit with invalid data:
   - Highlight fields with errors using error border colors
   - Display clear error messages below or near the problematic fields
   - Use error text colors from the design system
3. **Auto-scroll to errors** - If error fields are off-screen:
   - Automatically scroll to the first error field
   - Ensure the error message is fully visible
   - Provide smooth scrolling animation
4. **Real-time feedback (optional)** - For better UX, show validation feedback as user types:
   - Show success states for valid fields
   - Show error states only after user attempts to submit or leaves the field
   - Use subtle visual indicators (border colors, icons)

**When to use disabled states:**
- Only for truly unavailable actions (e.g., feature not available, permission denied)
- Never for form validation
- Never for password requirements
- Never for required field validation

**Error Display Pattern:**
- Use `border-danger` or `border-danger-emphasis` for error borders
- Use `on-layer-danger` for error text
- Position error messages directly below the input field
- Keep error messages concise and actionable
- Clear errors when user corrects the input

### Auto-Save Pattern

For settings screens and forms that use auto-save (no explicit "Save" buttons):

- **Auto-save triggers:** Fields save on blur or 500ms after typing stops; modals save on confirmation
- **Save indicator:** Appears in top right of main screen header (not in modals)
  - Success: `[spinner] → [✓] → [Saved] → [fade out]` (2-3s)
  - Error: `[⚠️ Error]` or `[⚠️ 2 errors]` (persists until resolved)
- **Error handling:** Error takes priority; successful saves process silently when errors exist
- **Auto-retry:** System automatically retries failed saves on next user action (no manual retry)
- **Navigation guard:** If errors exist, show confirmation before leaving

**Full details:** See `product/sections/settings-core/spec.md` for complete auto-save pattern rules and examples.

## Component Examples

### Button Component (React Native with NativeWind)

```tsx
import { Button, ButtonText } from '@gluestack-ui/themed'
import { styled } from 'nativewind'

// Default button - 48px height (space-9), medium radius (12px)
const PrimaryButton = styled(Button, {
  className: 'h-12 px-space-4 rounded-medium bg-button-primary',
  // h-12: 48px (default component size, space-9)
  // px-space-4: 12px horizontal padding (space-4)
  // rounded-medium: 12px radius (space-4)
  // bg-button-primary: Semantic color from colors.json
})

// Compact button - 42px height (7 × 6px), small radius (6px)
const CompactButton = styled(Button, {
  className: 'h-[42px] px-space-2 rounded-small bg-button-primary',
  // h-[42px]: 42px (compact size, 7 × 6px grid)
  // rounded-small: 6px radius (space-2)
})

// Large button - 54px height (9 × 6px), large radius (18px)
const LargeButton = styled(Button, {
  className: 'h-[54px] px-space-6 rounded-large bg-button-primary',
  // h-[54px]: 54px (large size, 9 × 6px grid)
  // rounded-large: 18px radius (space-5)
})

// Example usage - Primary button uses white text on blue background for readability
<PrimaryButton>
  <ButtonText className="text-white font-semibold text-base">
    Primary Action
  </ButtonText>
</PrimaryButton>
```

### Card Component (React Native with NativeWind)

```tsx
import { Box } from '@gluestack-ui/themed'
import { styled } from 'nativewind'

// Card with design system spacing and radius
const Card = styled(Box, {
  className: 'bg-layer-level-1 rounded-large p-space-6',
  // bg-layer-level-1: Card background from colors.json
  // rounded-large: 18px radius (space-5, correlated with spacing)
  // p-space-6: 24px padding (space-6, default content padding)
})

// Nested card (higher nesting = larger radius)
const NestedCard = styled(Box, {
  className: 'bg-layer-level-2 rounded-large p-space-4',
  // bg-layer-level-2: Nested card background
  // rounded-large: 18px radius (maintains hierarchy)
  // p-space-4: 12px padding (smaller for nested)
})
```

### Input Component (React Native with NativeWind)

```tsx
import { Input, InputField } from '@gluestack-ui/themed'
import { styled } from 'nativewind'

// Input with design system sizing - 48px height (default)
const StyledInput = styled(Input, {
  className: 'h-12 rounded-medium border border-border-primary bg-layer-level-1',
  // h-12: 48px height (default component size, space-9, meets touch target)
  // rounded-medium: 12px radius (space-4, correlated with spacing)
  // border-border-primary: Semantic border color
  // bg-layer-level-1: Input background
})

const StyledInputField = styled(InputField, {
  className: 'text-on-layer-primary text-base px-space-4',
  // text-on-layer-primary: Primary text color
  // text-base: 16px (regular body text from typography.json)
  // px-space-4: 12px horizontal padding (space-4)
})

// Input with label (proper spacing)
const InputWithLabel = () => (
  <Box className="space-y-space-2">
    {/* space-y-space-2: 6px vertical spacing (space-2, primary unit) */}
    <Text className="text-on-layer-primary text-sm font-semibold">
      Email Address
    </Text>
    <StyledInput>
      <StyledInputField placeholder="Enter email" />
    </StyledInput>
  </Box>
)
```

### Typography Examples (React Native with NativeWind)

```tsx
// H1 - Main page title (28px/36px, semibold)
<Text className="text-on-layer-primary text-[28px] leading-[36px] font-semibold">
  Welcome to dashboard
</Text>

// H2 - Section heading (22px/30px, semibold)
<Text className="text-on-layer-primary text-[22px] leading-[30px] font-semibold">
  Recent activity
</Text>

// H3 - Subsection heading (18px/26px, semibold)
<Text className="text-on-layer-primary text-[18px] leading-[26px] font-semibold">
  User settings
</Text>

// H4 - Small uppercase heading (14px/20px, semibold, uppercase)
<Text className="text-on-layer-primary text-sm leading-5 font-semibold uppercase">
  CATEGORY LABEL
</Text>

// Regular body text (16px/24px, regular)
<Text className="text-on-layer-primary text-base leading-6 font-normal">
  This is regular body text used for paragraphs.
</Text>

// Regular semibold (16px/24px, semibold)
<Text className="text-on-layer-primary text-base leading-6 font-semibold">
  Emphasized body text
</Text>

// Small text (14px/20px, regular)
<Text className="text-on-layer-secondary text-sm leading-5 font-normal">
  Secondary information, captions
</Text>

// Support small text (12px/16px, regular)
<Text className="text-on-layer-tertiary text-xs leading-4 font-normal">
  Helper text or metadata
</Text>
```

**Note**: React Native uses system fonts automatically. No font files needed.

## Design System Token Mapping

### Spacing to Tailwind
- `space-1` = 3px
- `space-2` = 6px (primary unit)
- `space-4` = 12px
- `space-6` = 24px (default content padding)
- `space-9` = 48px (default component size)
- `space-10` = 60px (bar height)

### Radius to Tailwind
- `rounded-3px` = 3px (space-1)
- `rounded-small` = 6px (space-2)
- `rounded-medium` = 12px (space-4)
- `rounded-large` = 18px (space-5)
- `rounded-full` = 50%
- `rounded-pill` = 1998px

### Colors to Tailwind
All colors from `colors.json` should be mapped to Tailwind theme:
- Semantic colors: `layer-level-0`, `on-layer-primary`, `border-primary`, etc.
- Status colors: `on-layer-success`, `on-layer-warning`, `on-layer-danger`
- Interactive: `on-layer-interactive`, `button-primary`

## Critical Rules

### ✅ DO
- Use design system spacing values (space-2, space-4, etc.)
- Use design system radius values (small, medium, large)
- Use semantic color names from colors.json
- Apply exact typography sizes and weights
- Follow the 6px spacing grid
- Use 48px as default component height
- Correlate radius with spacing (small=space-2, medium=space-4, large=space-5)
- **Ignore mockup styling if it conflicts with the design system (e.g., uppercase labels)**

### ❌ DON'T
- Use arbitrary spacing values (e.g., `p-5`, `m-7`) - use spacing scale
- Use arbitrary radius values - use design system radius
- Hardcode colors - use semantic color tokens
- Use custom fonts - use system fonts
- Mix light/dark mode - dark mode only
- Ignore touch target sizes - minimum 48px for interactive elements
- **Replicate mockup artifacts like capitalization or exact hex codes blindly**

## Configuration Files Needed

### tailwind.config.js (for NativeWind v5)

```js
// This should be generated from design-system JSON files
export default {
  theme: {
    extend: {
      spacing: {
        // From spacing.json scale
        'space-1': '3px',
        'space-2': '6px',
        'space-3': '9px',
        // ... all spacing values
      },
      borderRadius: {
        // From radius.json
        'small': '6px',
        'medium': '12px',
        'large': '18px',
      },
      colors: {
        // From colors.json semantic colors
        'layer': {
          'level-0': '#111114',
          'level-1': '#24242b',
          // ... all layer colors
        },
        'on-layer': {
          'primary': '#f9f9fa',
          'secondary': '#b5b5b7',
          // ... all on-layer colors
        },
        // ... all semantic color categories
      },
      fontSize: {
        // From typography.json
        'h1': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'h2': ['22px', { lineHeight: '30px', fontWeight: '600' }],
        // ... all typography styles
      },
    },
  },
}
```

## Component Development Checklist

When building any component, verify:

- [ ] Uses design system spacing (space-2, space-4, etc.) - NO arbitrary values
- [ ] Uses design system radius (small, medium, large) - NO arbitrary values
- [ ] Uses semantic colors (layer-level-*, on-layer-*, etc.) - NO hardcoded hex
- [ ] Uses typography styles from typography.json - exact sizes and weights
- [ ] Component height matches design system (42px, 48px, 54px, or 60px)
- [ ] Meets minimum touch target (48px for interactive elements)
- [ ] Follows 6px spacing grid (all values are multiples of 6px)
- [ ] Dark mode compatible (uses dark mode colors)
- [ ] Props-based (no direct data imports)
- [ ] TypeScript types defined
- [ ] Adheres to Design System aesthetics, overriding mockup artifacts

## Verification Examples

### ✅ CORRECT Usage

```tsx
// Correct: Uses design system spacing
<Box className="p-space-6 gap-space-4">
  <Button className="h-12 rounded-medium bg-button-primary">
    <ButtonText className="text-white text-base font-semibold">
      Submit
    </ButtonText>
  </Button>
</Box>
```

### ❌ INCORRECT Usage

```tsx
// WRONG: Arbitrary spacing values
<Box className="p-5 gap-3">
  <Button className="h-10 rounded-lg bg-blue-500">
    <ButtonText className="text-white text-lg font-bold">
      Submit
    </ButtonText>
  </Button>
</Box>
```

**Why it's wrong:**
- `p-5` (20px) - not in spacing scale, should be `p-space-6` (24px)
- `gap-3` (12px) - should be `gap-space-4` (12px) to use design system
- `h-10` (40px) - doesn't meet touch target, should be `h-12` (48px)
- `rounded-lg` (8px) - not design system radius, should be `rounded-medium` (12px)
- `bg-blue-500` - hardcoded color, should be `bg-button-primary`
- `text-white` - While white text is correct for primary buttons, this example uses wrong color token
- `text-lg` (18px) - not typography scale, should be `text-base` (16px) or `text-[18px]` if H3
- `font-bold` (700) - should be `font-semibold` (600) per typography.json
