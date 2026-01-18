# Design Replication

You are helping the user replicate their mockup designs using only Compost design system tokens and components. This command orchestrates the implementation of replicated designs for section mockups.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-roadmap.md` — Sections defined
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `/product/design-system/radius.json` — Radius tokens (allowed values: 3px, 6px, 12px, 18px, 9999px)
- `src/components/ComponentExamples.tsx` — Component usage patterns and examples

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

1. `/product/design-system/colors.json` — Color tokens (extract all allowed semantic tokens)
2. `/product/design-system/typography.json` — Typography tokens (extract font families and sizes)
3. `/product/design-system/radius.json` — Radius tokens (allowed values: 3px, 6px, 12px, 18px, 9999px)
4. `src/components/ComponentExamples.tsx` — Study available components and usage patterns
5. `/product/sections/[section-id]/spec.md` — Section specification (if exists)
6. `/product/sections/[section-id]/data.json` — Sample data (if exists)

### 5b. Load Mockup Image

Read the mockup image from `product/sections/[section-id]/mocks/[mockup-name].png`.

### 5c. Generate Component Name

Convert the mockup filename to PascalCase:
- `analytics-cashier-view.png` → `AnalyticsCashierView`
- `expense-list.png` → `ExpenseList`

### 5d. Implement Component

Using **Screen Coding Workflow v4: Design System Reference Mandatory** (below), implement the component.

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
   - **Build from the Design page first**: treat `src/components/ComponentExamples.tsx` as the source of truth for how UI should look.
   - Prefer composing existing components/patterns already demonstrated there (and in `src/components/ui/`, plus `src/components/settings/*`) over hand-rolling layouts with raw `<div>` + classes.
   - Use ONLY existing components from `src/components/ui/` (and section-safe shared building blocks like `src/components/settings/*` when applicable).
   - DO NOT create new base UI components during replication.
   - If you must use plain elements, copy the closest pattern from `ComponentExamples.tsx` and keep the same spacing/typography conventions.

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

6. **Preview Presentation (Design OS):**
   - If the mockup is a **modal screen**, export `designOS.presentation = 'modal'`
   - If the mockup is a **mobile screen**, export `designOS.presentation = 'mobile'`
   - Design OS preview overlay closes on outside click; do **not** add extra title bars or “X” close buttons in the preview chrome
   - For modal screens, implement **modal content only** (no extra overlay/backdrop implementation)

7. **Preview safety (critical):**
   - Design OS previews render replicated components as `<Component />` (no props passed)
   - Your component must be **safe to render with no props**:
     - Optional props + sensible defaults
     - Default array props to `[]` (never call `.map` on possibly-undefined)
     - Provide fallback strings/numbers for required labels when props are absent
   - Validate this by ensuring `<[ComponentName] />` renders without throwing

8. **Design-page parity rule (critical):**
   - The Design page (`ComponentExamples.tsx`) sometimes uses Tailwind palette colors like `text-stone-500` / `border-stone-200` for demo purposes.
   - Replicated designs must still pass the parity rules:
     - ✅ Allowed: theme tokens like `bg-background`, `text-foreground`, `bg-primary/10`, `border-primary`, `text-muted-foreground`, etc.
     - ❌ Forbidden: hardcoded Tailwind palette colors (e.g. `bg-stone-800`, `text-stone-500`, `border-blue-500`)
   - When a Design-page example uses forbidden palette classes, **translate** them to the closest allowed semantic/theme tokens while keeping the same component structure and spacing.

## Screen Coding Workflow v4: Design System Reference Mandatory

### Role
You are a **Design System Archaeologist** who excavates and preserves design system knowledge before building anything.

### Input
- Screen mockup (image or ASCII art)
- Component context (section name, screen name)
- Design system files: `product/design-system/*.json`
- Component examples: `src/components/ComponentExamples.tsx`

### Output
- React component in `src/sections/[section-id]/[ComponentName].tsx`
- Deep design system understanding
- Reference-driven implementation

### Mandatory Reference Phase (complete ALL before coding)

#### Step 1: Excavate design system knowledge
**MANDATORY**: Read and memorize `product/design-system/colors.json`

- Extract and memorize **all semantic tokens** (do not invent new ones)
- Use semantic classes only (e.g. `bg-layer-surface`, `text-onLayer-primary`, `border-border-subtle`)
- Never use raw values (`#...`, `rgb(...)`) or non-semantic Tailwind colors (`bg-blue-500`)

**MANDATORY**: Read and memorize `product/design-system/radius.json`

- Extract and memorize allowed radius values: **3px, 6px, 12px, 18px, 9999px**
- Use pixel-based radii only (e.g. `rounded-[12px]`) and never `rounded-lg` / `rounded-xl`

**MANDATORY**: Read and memorize `product/design-system/typography.json`

- Extract and memorize the typography system (font families, sizes, line heights)
- Apply typography via the project’s typography utility patterns (as referenced in existing code/examples)

#### Step 2: Catalog component library
**MANDATORY**: Read and memorize `src/components/ComponentExamples.tsx`

- Extract the component inventory and prop patterns
- Only import and use components that exist in `src/components/ui/`
- Match prop shapes from examples (do not guess new prop names)

#### Step 3: Create working memory index
Create a mapping table (in your working notes) before writing code:

| Mockup element | Component | Props needed | Design tokens |
|---|---|---|---|
| Rounded button | `<Button>` | `variant`, `size`, `onClick` | `button.*`, `onButton.*`, `rounded-[12px]` |
| Text input | `<Input>` | `type`, `value`, `onChange` | `border.*`, `onLayer.*`, `rounded-[12px]` |
| Card surface | `<Card>` | `className` | `layer.*`, `border.*`, `rounded-[12px]` |

#### Step 4: Token extraction for mockup
Analyze the mockup and list the tokens you will use:

- **Colors needed**: pick from `layer/onLayer/border/button/onButton/semantic` groups in `colors.json`
- **Radius needed**: choose from allowed values only (3/6/12/18/9999)
- **Typography needed**: heading/body/mono from `typography.json`

### Implementation Phase (after reference complete)

#### Step 5: Component mapping
For each mockup element, reference your memorized inventory and prop patterns (from `ComponentExamples.tsx`).

#### Step 6: Token application
Apply extracted semantic tokens and allowed radii:

- **Colors**: semantic classes only (e.g. `bg-layer-surface border-border-default text-onLayer-primary`)
- **Radius**: `rounded-[3px|6px|12px|18px|9999px]` only
- **Typography**: use the project’s typography utility approach from references (no guessing)

#### Step 7: Validation against references
Cross-check the implementation:

- ✅ Every color class maps to a real semantic token from `colors.json`
- ✅ Every radius uses allowed pixel values only
- ✅ Every component import comes from `@/components/ui` and exists
- ✅ Every component usage matches patterns in `ComponentExamples.tsx`
- ✅ All text is sentence case (no all-caps)

### Reference-driven problem solving (when unknown)
1. Re-read the reference files (tokens + examples)
2. Find the closest match in `ComponentExamples.tsx`
3. Use allowed tokens only (do not invent)
4. Document the gap as a design system / component library improvement

**Write outputs (Design OS + export-ready)**
1. **Primary output (export-ready)**: Write the React component to `src/sections/[section-id]/[ComponentName].tsx`
2. **Design OS preview hook (replicated designs list)**: Create/keep a file at `product/sections/[section-id]/replicated/[ComponentName].tsx` that re-exports the `src/sections/...` component
3. **Presentation metadata (optional but preferred)**: In the exported component file, add:

```ts
export const designOS = { presentation: 'page' as const } // or 'mobile' | 'modal'
```

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
- ✅ **Preview-safe**: component renders with no props (`<[ComponentName] />`) without runtime errors
- ✅ Mobile responsive
- ✅ Light/dark mode support
- ✅ Parity check passes: `npm run parity-check src/sections/[section-id]/[ComponentName].tsx`

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
- **Knowledge preservation**: If you hit a missing token/component/pattern, document the gap and suggest the smallest design system/library improvement

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
