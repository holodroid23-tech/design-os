# Design Replication

You are helping the user replicate their mockup designs using **only** Compost design system tokens and existing UI components.

## Critical mindset (this fixes the “hallucinated layout” failure mode)

**Treat the mockup as a wireframe, not a pixel-perfect spec.**

- The mockup provides **information architecture** (what blocks exist, rough hierarchy, and interaction intent).
- The design system provides **actual layout rules** (spacing, radii, typography, component shapes).
- If the mockup and design system disagree, **the design system wins**.

**Never invent custom layout systems** (absolute positioning, bespoke measurements, one-off subcomponents) to “match the picture”.
If you can’t express something using existing components + tokenized classes, you must simplify to the closest design-system pattern.

## New recommended workflow (two phases)

This command is split conceptually into two phases to prevent “image fixation”:

1. **Phase A — Blueprint (with image)**: produce a structured blueprint describing the screen in terms of existing components/patterns and tokens. **Do not write UI code yet.**
2. **Phase B — Implementation (no image)**: implement from the blueprint only (no mockup), then validate with parity-check.

You can run both phases in one session, but **Phase B must not reference the mockup**.

**Optional (recommended): after Phase A, delete or move the mockup image out of `mocks/`** so the implementation phase cannot “peek” and regress into pixel-chasing.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-roadmap.md` — Sections defined
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `/product/design-system/radius.json` — Radius tokens (allowed values: 3px, 6px, 12px, 18px, 9999px)
- `src/components/ComponentExamples.tsx` — Component usage patterns and examples
- `src/index.css` — Source-of-truth for tokenized utility classes (`bg-layer-*`, `text-onLayer-*`, `text-on-layer-*`, `border-*`, etc.)

**Recommended:**
- `src/components/ui/` — UI component library
- `src/components/ui/index.ts` — What is actually supported via `@/components/ui`
- `src/components/patterns/component-examples/inventory.ts` — Fast map of Design page “example blocks” → extracted components

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

1. `/product/design-system/colors.json` — Design system source tokens (semantic groups like `layer`, `onLayer`, `border`, `button`, etc.)
2. `src/index.css` — **The truth for what tokenized utility classes exist** (e.g. `bg-layer-1`, `bg-layer-info`, `text-foreground`, `text-muted-foreground`, `text-onLayer-primary`, `text-on-layer-success`, `border-border`, `ring-ring`)
3. `/product/design-system/typography.json` — Typography tokens (font families + size styles)
4. `/product/design-system/radius.json` — Radius tokens (allowed values: 3px, 6px, 12px, 18px, 9999px)
5. `src/components/ComponentExamples.tsx` — Study available components and usage patterns (Design page is the reference implementation)
6. `src/components/patterns/component-examples/inventory.ts` — Fast lookup: Design page cards → extracted component paths
7. `/product/sections/[section-id]/spec.md` — Section specification (if exists)
8. `/product/sections/[section-id]/data.json` — Sample data (if exists)

### 5b. Load Mockup Image (Phase A only)

Read the mockup image from `product/sections/[section-id]/mocks/[mockup-name].png`.

### 5c. Generate Component Name

Convert the mockup filename to PascalCase:
- `analytics-cashier-view.png` → `AnalyticsCashierView`
- `expense-list.png` → `ExpenseList`

### 5d. Phase A — Generate a Blueprint (no code yet)

Create a blueprint that ONLY uses:
- components from `@/components/ui`
- settings building blocks from `src/components/settings/*`
- tokenized classes proven to exist (from `src/index.css`)
- allowed radii only: `rounded-[3px|6px|12px|18px|9999px]`

**Blueprint format (write this into the response before coding):**

- Screen name + presentation (`page` | `mobile` | `modal`)
- A hierarchy tree (containers → sections → rows → controls)
- A component mapping table:

| UI block | Component/pattern | Props/data | Tokens/classes |
|---|---|---|---|

**Blueprint constraints:**
- No pixel-precision statements (“8px from the left”, “exactly 13px gap”).
- No absolute positioning unless the same pattern exists in `ComponentExamples.tsx`.
- No new components. If something doesn’t map cleanly, replace it with the nearest pattern.

Save the blueprint into the repo at:
`product/sections/[section-id]/replicated-blueprints/[ComponentName].md`

### 5e. Phase B — Implement from Blueprint (do NOT look at the mockup)

Using **Screen Coding Workflow v4: Design System Reference Mandatory** (below), implement the component.

**Critical Instructions:**

You are implementing a replicated design component. Follow these rules strictly:

1. **Design System Compliance:**
   - Use ONLY **tokenized utility classes that are actually defined in `src/index.css`** (and used in `ComponentExamples.tsx`), e.g.:
     - `bg-layer-0|1|2|3`, `bg-layer-info|warning|danger|success|recent`
     - `text-foreground`, `text-muted-foreground`, `text-onLayer-primary|secondary|tertiary`, `text-on-layer-success|warning|danger|recent`
     - `border-border`, `border-border-primary`, `border-border-secondary`, `ring-ring`
     - `bg-primary`, `text-primary-foreground`, `bg-secondary`, `bg-muted`, `bg-background`
   - Use ONLY allowed radius values: `3px`, `6px`, `12px`, `18px`, `9999px` (e.g., `rounded-[12px]`)
   - Use ONLY typography from `typography.json` via the project’s utility patterns:
     - Use `font-sans` / `font-mono`
     - Prefer the custom typography utilities defined in `src/index.css` when they match: `text-regular-semibold`, `text-small`, `text-support-small`
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

- Understand the semantic groups and names (layer/onLayer/border/button/etc.), **but do not paste hex values into components**
- Your *allowed class names* come from `src/index.css` (Tailwind v4 `@theme` variables), not from guessing token names
- Use tokenized classes only (e.g. `bg-layer-2`, `text-foreground`, `text-onLayer-secondary`, `text-on-layer-success`, `border-border`, `ring-ring`)
- Never use raw values (`#...`, `rgb(...)`) or hardcoded Tailwind palette colors (`bg-blue-500`)

**MANDATORY**: Read and memorize `src/index.css`

- Identify the tokenized utility classes that exist and are parity-safe
- Treat this as the “dictionary” of allowed design tokens for replication work

**MANDATORY**: Read and memorize `product/design-system/radius.json`

- Extract and memorize allowed radius values: **3px, 6px, 12px, 18px, 9999px**
- Use pixel-based radii only (e.g. `rounded-[12px]`) and never `rounded-lg` / `rounded-xl`

**MANDATORY**: Read and memorize `product/design-system/typography.json`

- Extract and memorize the typography system (font families, sizes, line heights)
- Apply typography via the project’s typography utility patterns (as referenced in existing code/examples)

#### Step 2: Catalog component library
**MANDATORY**: Read and memorize `src/components/ComponentExamples.tsx`

- Extract the component inventory and prop patterns
- Prefer importing from `@/components/ui` (see `src/components/ui/index.ts`) so you only use supported exports
- If you import directly from a file under `src/components/ui/*`, confirm it is used elsewhere in the app and still passes parity rules
- Match prop shapes from examples (do not guess new prop names)

#### Step 3: Create working memory index
Create a mapping table (in your working notes) before writing code:

| Mockup element | Component | Props needed | Design tokens |
|---|---|---|---|
| Rounded button | `<Button>` | `variant`, `size`, `onClick` | `bg-primary text-primary-foreground`, `border-border`, `rounded-[12px]` |
| Text input | `<Input>` | `type`, `value`, `onChange` | `bg-layer-1`/`bg-background`, `border-border`, `text-foreground`, `rounded-[6px|12px]` |
| Card surface | `<Card>` | `className` | `bg-layer-1|2`/`bg-card`, `border-border`, `rounded-[12px|18px]` |

#### Step 4: Token extraction for mockup
Analyze the mockup and list the tokens you will use:

- **Colors needed**: pick from the tokenized classes confirmed in `src/index.css` (typically `layer`, `onLayer`, `border`, plus shadcn theme tokens)
- **Radius needed**: choose from allowed values only (3/6/12/18/9999)
- **Typography needed**: heading/body/mono from `typography.json`

### Implementation Phase (after reference complete)

#### Step 5: Component mapping
For each mockup element, reference your memorized inventory and prop patterns (from `ComponentExamples.tsx`).

#### Step 6: Token application
Apply extracted semantic tokens and allowed radii:

- **Colors**: tokenized classes only (e.g. `bg-layer-2 border-border text-foreground`, `bg-layer-success text-on-layer-success`)
- **Radius**: `rounded-[3px|6px|12px|18px|9999px]` only
- **Typography**: use the project’s typography utility approach from references (no guessing)

#### Step 7: Validation against references
Cross-check the implementation:

- ✅ No Tailwind palette color classes (run `npm run parity-check ...`)
- ✅ All color usage is via tokenized utilities that exist in `src/index.css` and/or theme tokens (`bg-background`, `text-foreground`, etc.)
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

### 5f. Validate Implementation

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
- ✅ Parity check passes:
  - Standard: `npm run parity-check -- src/sections/[section-id]/[ComponentName].tsx`
  - **Strict library assembly (recommended for replication work)**: `npm run parity-check -- --strict-components src/sections/[section-id]/[ComponentName].tsx`
- ✅ **Replication Name Parity Check**:
  - The registration file at `product/sections/[section-id]/replicated/[ComponentName].tsx` MUST **exactly match** the PascalCase name of the mockup file (e.g. `settings.png` → `Settings.tsx`).
  - **DO NOT** append suffixes like `Preview` or `Screen` (e.g., `SettingsPreview.tsx` is WRONG).
  - If you created the file with a suffix, **rename it now** to match the mockup name exactly so it registers correctly in the app.

If validation fails, fix the issues before continuing.

### 5g. Report Success

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
- Use **tokenized utility classes** (defined in `src/index.css`) and shadcn theme tokens:
  - Typical surfaces: `bg-layer-0|1|2|3` or `bg-background`, `bg-card`, `bg-muted`
  - Typical text: `text-foreground`, `text-muted-foreground`, `text-onLayer-primary|secondary|tertiary`
  - Status surfaces: `bg-layer-success|warning|danger|info|recent` + `text-on-layer-success|warning|danger|info|recent`
  - Borders/rings: `border-border`, `border-border-primary`, `border-border-secondary`, `ring-ring`
- Never use Tailwind palette colors (e.g. `bg-blue-500`, `text-stone-600`, `border-red-500`) in replicated/exportable files

**Radius:**
- `3px` — small elements (badges, tags)
- `6px` — form inputs
- `12px` — buttons, cards
- `18px` — large containers
- `9999px` — fully rounded (pills, avatars)

**Typography:**
- Use font families from `typography.json`
- Use Tailwind text size utilities (`text-sm`, `text-base`, `text-lg`, etc.)
- Prefer the custom text utilities defined in `src/index.css` when appropriate: `text-regular-semibold`, `text-small`, `text-support-small`

**Components:**
- Check `src/components/ui/` for available components
- Common components: Button, Card, Input, Badge, Avatar, Checkbox, RadioGroup

**Layout:**
- Use Tailwind spacing utilities (`p-4`, `gap-3`, `space-y-4`)
- Use flexbox and grid for layouts
- Make responsive with `sm:`, `md:`, `lg:` prefixes

## Component inventory (fast lookup)

If you’re unsure what to use, start here. Prefer **`@/components/ui`** exports (see `src/components/ui/index.ts`) and copy usage patterns from `src/components/ComponentExamples.tsx`.

**UI primitives (`@/components/ui`)**
- `accordion`: Collapsible content regions (disclosure / FAQ / grouped controls)
- `avatar`: User/profile avatar with fallback + optional “online” state (see examples)
- `badge`: Small status label/pill (variants like destructive, etc.)
- `bottom-menu`: Mobile bottom menu / action drawer pattern
- `button`: Primary interaction element (variants + sizes; use for icons too)
- `calendar`: Calendar grid (used by date picker)
- `card`: Surface container (`Card`, `CardHeader`, `CardContent`, etc.)
- `checkbox`: Checkbox control
- `collapsible`: Low-level collapse primitive (`CollapsibleTrigger`, `CollapsibleContent`)
- `color-picker`: Color picking UI (used in token tooling)
- `color-selector`: Color selection UI (swatches / presets)
- `date-picker`: Date selection UI (wraps calendar + popover)
- `dialog`: Modal dialog content (use for “modal” presentations when applicable)
- `dropdown-menu`: Menu triggered from a button/icon
- `empty-state`: Standard empty state block (icon + title + description + action)
- `input`: Text input
- `label`: Form label
- `numpad`: Numeric keypad input pattern
- `pin-entry`: PIN entry input pattern
- `popover`: Popover primitive (floating panel)
- `radio-button-group`: Styled radio group variant
- `radio-group`: Standard radio group
- `search-input-with-suggestions`: Search box with suggestions dropdown
- `separator`: Divider line / spacer
- `sheet`: Bottom/side sheet overlay pattern
- `skeleton`: Loading skeleton blocks
- `slider`: Slider control
- `sliding-selector`: Sliding selector control (segmented/slider hybrid)
- `sonner`: Toast/snackbar system
- `stepper`: Increment/decrement control
- `switch`: Toggle control
- `table`: Basic table UI
- `tabs`: Tabbed interface

**Settings building blocks (`src/components/settings/*`)**
- `SettingsGroup`: Card-like grouping for settings lists
- `SettingsItem` (+ `SettingsItemIcon/Content/Title/Description/Action`): Standard settings row layout
- `UserProfileRow`: A prebuilt “profile row” variant for settings screens
- `SettingsFooter`: Version/build footer block for settings pages

**Design-page extracted examples (`src/components/patterns/component-examples/*`)**
- Use `src/components/patterns/component-examples/inventory.ts` to quickly locate the right “example card” component by id/title.

## Design Examples map (what lives in which file)

This is the fastest way to jump to the right example implementation when replicating a mockup.

- **`src/components/ComponentExamples.tsx`**
  - The “gallery composer” that renders the example cards in a fixed order.

- **`src/components/patterns/component-examples/inventory.ts`**
  - Source-of-truth index: `Card id` → human title → component pointer string (`file#ExportedComponent`).

- **`src/components/patterns/component-examples/sections/controls-examples.tsx`**
  - Buttons, steppers, sliders (touch-target + sizing patterns).

- **`src/components/patterns/component-examples/sections/controls-more-examples.tsx`**
  - “Heavier” controls: radio button groups (including advanced variants), numeric entry (numpad), security PIN entry, checkboxes, dropdown menus.

- **`src/components/patterns/component-examples/sections/forms-examples.tsx`**
  - Form primitives and form patterns: inputs (including search-with-suggestions), switches, date picker, color picker/selector, tabs, cards, plus basic badge examples.

- **`src/components/patterns/component-examples/sections/menus-examples.tsx`**
  - Mobile-first menus: bottom menu and sliding selector (single + multi-select).

- **`src/components/patterns/component-examples/sections/feedback-examples.tsx`**
  - Feedback patterns: snackbars (toasts), dialogs/modals, sheets, check lists, empty states.

- **`src/components/patterns/component-examples/sections/layout-examples.tsx`**
  - Layout & structure patterns: elevations/shadows, complex accordions, dividers.

- **`src/components/patterns/component-examples/sections/building-blocks-examples.tsx`**
  - Reusable atoms/building blocks: icons/icon tiles, image tiles, avatars, atomic list items, section titles.

- **`src/components/patterns/component-examples/sections/product-expense-examples.tsx`**
  - Domain-shaped examples: product/expense cards and product/expense list items using settings rows + atoms.

- **`src/components/patterns/component-examples/sections/order-examples.tsx`**
  - Domain-shaped examples: order tabs and expandable order summary patterns (with search + item rows).

- **`src/components/patterns/component-examples/sections/settings-examples.tsx`**
  - Settings page building blocks: `SettingsGroup`, `SettingsItem` composition, `UserProfileRow`, `SettingsFooter`.

- **`src/components/patterns/component-examples/sections/exports-examples.tsx`**
  - Export-style UI previews: email template preview, receipt preview.

- **`src/components/patterns/component-examples/sections/media-examples.tsx`**
  - Media upload pattern (upload/take-photo actions).

- **`src/components/patterns/component-examples/sections/badges-examples.tsx`**
  - Badge token variants (default/secondary/destructive/warning/ghost).

## Success Criteria

- Component exists at `product/sections/[section-id]/replicated/[ComponentName].tsx`
- Component passes validation checklist
- Component is viewable in Design OS at `/sections/[section-id]`
- Component strictly follows Compost design system rules
- Component is props-based and portable
