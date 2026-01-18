# Design Replication

You are helping the user replicate their mockup designs using only Compost design system tokens and components. This command orchestrates the implementation of replicated designs for section mockups.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-roadmap.md` — Sections defined
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens

**Recommended:**
- `src/components/ui/` — UI component library

If required files are missing:

"To replicate designs, you need:
- A product roadmap with sections (`/product-roadmap`)
- Design system tokens (`/design-tokens`)

Please complete these first."

Stop here if required files are missing.

## Step 2: Load Sections

Read `/product/product-roadmap.md` to get the list of sections.

For each section, check if it has mockups in `product/sections/[section-id]/mocks/`.

If no sections have mockups:

"No mockups found. Add PNG files to `product/sections/[section-id]/mocks/` for any section, then run this command again."

Stop here if no mockups exist.

## Step 3: Ask User Which Section

Present a numbered list of sections that have mockups:

"Which section would you like to work on?

1. [Section 1 Title] — [N] mockups
2. [Section 2 Title] — [N] mockups
3. [Section 3 Title] — [N] mockups

Enter the number of the section:"

Wait for user input.

## Step 4: Load Section Mockups

Once the user selects a section, load all mockups from `product/sections/[section-id]/mocks/`.

For each mockup, check if a replicated component already exists at `product/sections/[section-id]/replicated/[ComponentName].tsx`.

Present the mockups:

"Found [N] mockups in [Section Title]:

✓ [Mockup 1] — Already replicated
• [Mockup 2] — Pending
• [Mockup 3] — Pending

Which would you like to replicate?

1. [Mockup 1] — Already replicated
2. [Mockup 2]
3. [Mockup 3]
4. All pending mockups ([N] remaining)

Enter your choice (number or 'all'):"

Wait for user input.

## Step 5: Replicate Selected Mockup(s)

For each mockup selected:

### 5a. Read Context Files

Read the following files to gather context:

1. `/product/design-system/colors.json` — Color tokens
2. `/product/design-system/typography.json` — Typography tokens
3. `/product/sections/[section-id]/spec.md` — Section specification (if exists)
4. `/product/sections/[section-id]/data.json` — Sample data (if exists)
5. `/.claude/skills/design analysis - implementation.md` — Screen Coding Workflow v2

### 5b. Load Mockup Image

Read the mockup image from `product/sections/[section-id]/mocks/[mockup-name].png`.

### 5c. Generate Component Name

Convert the mockup filename to PascalCase:
- `analytics-cashier-view.png` → `AnalyticsCashierView`
- `expense-list.png` → `ExpenseList`

### 5d. Implement Component

Using the Screen Coding Workflow v2 from the skills file, implement the component.

**Critical Instructions:**

You are implementing a replicated design component. Follow these rules strictly:

1. **Design System Compliance:**
   - Use ONLY semantic color tokens from `colors.json` (e.g., `bg-layer-primary`, `text-onLayer-primary`)
   - Use ONLY allowed radius values: `3px`, `6px`, `12px`, `18px`, `9999px` (e.g., `rounded-[12px]`)
   - Use ONLY typography from `typography.json`
   - NO hardcoded Tailwind colors (e.g., NO `bg-blue-500`, NO `text-red-600`)
   - NO custom radius values (e.g., NO `rounded-lg`, NO `rounded-xl`)
   - NO inline styles (e.g., NO `style={{}}`)

2. **Component Usage:**
   - Use ONLY existing components from `src/components/ui/`
   - DO NOT create custom components
   - Check available components first before implementing

3. **Text Formatting:**
   - Use sentence case for all text
   - NO ALL CAPS text anywhere

4. **Props-Based Design:**
   - Accept data via props
   - Accept callbacks via props
   - Never import data directly
   - Make the component portable and reusable

5. **Sample Data:**
   - If `data.json` exists, use it to populate the component with realistic sample data
   - Pass sample data via props, not hardcoded

**Implementation Steps:**

1. Analyze the mockup image carefully
2. Identify UI components needed from `src/components/ui/`
3. Map mockup colors to semantic tokens from `colors.json`
4. Implement the layout using Tailwind utilities
5. Ensure mobile responsiveness
6. Support light and dark mode with `dark:` variants
7. Write the component to `product/sections/[section-id]/replicated/[ComponentName].tsx`

**Component Template:**

```tsx
/**
 * [ComponentName] - Replicated design
 * 
 * This component replicates the [mockup-name] mockup using the Compost design system.
 */

import { Card, Button } from '@/components/ui'

interface [ComponentName]Props {
  // Define props based on the data needed
  data?: any
  onAction?: () => void
}

export default function [ComponentName]({ data, onAction }: [ComponentName]Props) {
  return (
    <div className="p-4 space-y-4">
      {/* Component implementation */}
    </div>
  )
}
```

### 5e. Validate Implementation

After generating the component, validate:

- ✅ No hardcoded colors (only semantic tokens)
- ✅ No custom radius (only 3px, 6px, 12px, 18px, 9999px)
- ✅ No ALL CAPS text
- ✅ No custom components (only from `src/components/ui/`)
- ✅ No inline styles
- ✅ Props-based (accepts data and callbacks)
- ✅ Mobile responsive
- ✅ Light/dark mode support

If validation fails, fix the issues before continuing.

### 5f. Report Success

After successfully creating the component:

"✓ Created [ComponentName].tsx for [mockup-name]

View the replicated design:
1. Restart your dev server (if needed)
2. Navigate to /sections/[section-id]
3. Click on '[Mockup Display Name]' in the Replicated Designs section

[If more mockups pending:]
Would you like to replicate another mockup? (yes/no)"

If user says yes, return to Step 4.

## Step 6: Bulk Processing

If the user selected "All pending mockups" in Step 4:

For each pending mockup, follow Steps 5a-5f in sequence.

After completing all mockups:

"✓ Completed replication for [N] mockups in [Section Title]:

✓ [Mockup 1]
✓ [Mockup 2]
✓ [Mockup 3]

View the replicated designs:
1. Restart your dev server (if needed)
2. Navigate to /sections/[section-id]
3. Browse the Replicated Designs section

All mockups for this section are now replicated!"

## Important Notes

- **One component at a time**: Process each mockup individually to avoid context window issues
- **Strict compliance**: The design system rules are non-negotiable
- **Validation**: Always validate before reporting success
- **Sample data**: Use `data.json` for realistic content when available
- **Error handling**: If component generation fails, report the error and ask if the user wants to retry

## Design System Reference

Always keep these rules in mind:

**Colors:**
- Use semantic tokens only (e.g., `bg-layer-primary`, `text-onLayer-secondary`)
- Map mockup colors to tokens (e.g., blue button → `bg-button-primary`)

**Radius:**
- `3px` — small elements (badges, tags)
- `6px` — form inputs
- `12px` — buttons, cards
- `18px` — large containers
- `9999px` — fully rounded (pills, avatars)

**Typography:**
- Use font families from `typography.json`
- Use Tailwind text size utilities (`text-sm`, `text-base`, `text-lg`, etc.)

**Components:**
- Check `src/components/ui/` for available components
- Common components: Button, Card, Input, Badge, Avatar, Checkbox, RadioGroup

**Layout:**
- Use Tailwind spacing utilities (`p-4`, `gap-3`, `space-y-4`)
- Use flexbox and grid for layouts
- Make responsive with `sm:`, `md:`, `lg:` prefixes

## Success Criteria

- Component exists at `product/sections/[section-id]/replicated/[ComponentName].tsx`
- Component passes validation checklist
- Component is viewable in Design OS at `/sections/[section-id]`
- Component strictly follows Compost design system rules
- Component is props-based and portable
