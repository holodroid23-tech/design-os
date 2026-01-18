# Component Create (Design System–Correct)

You are helping the user **create a new component/element** while staying consistent with the **ComPOSt design system**.

This command is the “always correct workflow” for new UI work.

## Designer-first expectation (read this carefully)

The user is a **designer**, not a programmer. They think in **what they see**.

When the user asks for a change (e.g. “make the avatar bigger”, “increase radius”, “tighten spacing”), they expect:

1. **The real source-of-truth is updated** (tokens and/or shared components), so the change propagates to all future screens that reuse it.
2. **The Design page stays visually identical** to the source-of-truth (Design page is a catalog/demo, not a one-off custom style sandbox).

### Non‑negotiable rule: never “fix it only on the page”

Do **not** implement the change only in `DesignPage.tsx` / demo markup.
If you do that, it becomes a one-off custom tweak and will NOT propagate.

Always implement changes in one (or both) of these places:

- **Design tokens (values)**: `product/design-system/*.json` (colors/typography/spacing/radius/elevations)
- **Shared component library (composition + defaults)**: `src/components/ui/*` and `src/components/patterns/*`

Then update the Design page examples to match.

## Source of Truth (read these first)

**Tokens (the truth for design system values):**
- `product/design-system/colors.json`
- `product/design-system/typography.json`
- `product/design-system/spacing.json`
- `product/design-system/radius.json`
- `product/design-system/elevations.json` (if present)

**Usage patterns (the truth for how components should be used):**
- `src/components/ComponentExamples.tsx` (Design page)
- `src/components/patterns/component-examples/sections/*.tsx` (extracted example cards)
- `src/components/ui/*` (the actual component library)

If token files and the Design page examples disagree, **prefer token files for values** and **prefer Design page examples for composition + class naming conventions**.

## Step 1: Identify the correct “component type”

Pick the target folder based on what you’re making:

- **UI primitive (reusable building block)** → `src/components/ui/`
  - Examples: Button, Input, Tabs, Sheet, Dialog, BottomMenu, etc.
- **Pattern / composition component (reusable “assembled UI”)** → `src/components/patterns/`
  - Examples: Settings row patterns, order tabs pattern, complex cards, etc.
- **Shell component (persistent navigation chrome)** → `src/shell/components/`
- **Section design (feature screens)** → `src/sections/[section-name]/`
- **Replicated mockup component (portable, exported)** → `product/sections/[section-id]/replicated/`

Do **not** put product/section UI primitives inside replicated folders—those should consume `src/components/ui/*` and patterns.

## Step 2: Verify it doesn’t already exist

Before writing anything new:
- Search in `src/components/ui/` and `src/components/patterns/` for an existing component that already matches.
- Check `src/components/ComponentExamples.tsx` for an example card that already demonstrates the pattern.

If it exists, do **not** create a duplicate—use the existing component and only extend it if truly needed.

## Step 3: Follow the styling + token rules (non‑negotiable)

- **Tailwind v4** only (no v3 guidance, no `tailwind.config.js` changes).
- **No custom CSS** (prefer utility classes).
- **No inline styles** (`style={{ ... }}` is forbidden for design-system UI work).
- **Use semantic tokens / semantic classes** as shown in `ComponentExamples`:
  - Text: `text-foreground`, `text-muted-foreground`
  - Surfaces: `bg-background`, `bg-layer-*`
  - Borders: `border-border`
  - Focus: `ring-ring`, `focus-visible:*`
- **Radius must come from `radius.json`** (commonly `rounded-[12px]`, `rounded-[18px]`, `rounded-[9999px]`, etc.).
- **Mobile first**: make touch targets reasonable (common baseline: min height ~48px for primary tap targets).

If you must use a literal value, it must be justified by the design tokens (e.g., radius values).

## Step 4: Component API rules

- **Props-based**: accept data and callbacks via props; no importing sample data into reusable components.
- **Portable**: don’t assume router state, global stores, or filesystem reads.
- **Accessible**: preserve labels, focus states, and keyboard behavior (follow existing `ui/*` patterns).

## Step 5: Implement the component in the right place (source-of-truth)

- If it’s a **UI primitive**, match the conventions in `src/components/ui/*`:
  - `forwardRef` where appropriate
  - `cn()` usage if other ui components use it
  - variants (CVA) only when consistent with existing primitives
- If it’s a **pattern**, implement it as a small composition layer over primitives.

### Special case: “change radius/spacing sizes everywhere”

If the user requests a “global” value change (e.g. radius scale):
- Update the appropriate token file (usually `product/design-system/radius.json` or `spacing.json`) **if that file is the intended source for the scale**.
- Then ensure shared components and examples are using token-compliant classes (e.g. `rounded-[12px]`, `rounded-[18px]`) and not arbitrary values.

## Step 6: Register an example on the Design page (required)

Every new component/pattern must be visible in the Design page examples:

- Prefer adding a new example card to the relevant file under:
  - `src/components/patterns/component-examples/sections/*.tsx`
- Ensure the example `Card` has:
  - a stable `id` (used for reference/search)
  - a title that includes the component name

Then ensure it’s rendered via `src/components/ComponentExamples.tsx` (directly or through the imported section cards).

### Definition of “done” for designers

The change is not done until:
- The new component/pattern exists in the correct shared folder, AND
- It is showcased on the Design page using the same component (no page-only custom styling), AND
- It compiles (`npm run build`).

## Step 7: Verification

- Ensure `npm run build` passes.
- If you changed a shared UI primitive, check the Design page visually in dev.

## How to reference the new component in future prompts

Use: **exported component name + file path**.

Example: “Update `SettingsItem` in `src/components/settings/settings-item.tsx` to add a left accessory slot.”

