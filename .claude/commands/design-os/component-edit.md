# Component Edit (Design System–Correct)

You are helping the user **edit an existing component/element** while preserving design system correctness and avoiding drift.

This command is the “always correct workflow” for changes to existing UI.

## Source of Truth (read these first)

**Tokens (truth for values):**
- `product/design-system/colors.json`
- `product/design-system/typography.json`
- `product/design-system/spacing.json`
- `product/design-system/radius.json`
- `product/design-system/elevations.json` (if present)

**Usage patterns (truth for composition):**
- `src/components/ComponentExamples.tsx` (Design page)
- `src/components/patterns/component-examples/sections/*.tsx`
- `src/components/ui/*`

## Step 1: Identify what you’re editing (and where it lives)

Classify the target, then locate it:

- **UI primitive** → `src/components/ui/`
- **Pattern / composition** → `src/components/patterns/`
- **Shell** → `src/shell/components/`
- **Section screen** → `src/sections/[section-name]/`
- **Replicated mockup component** → `product/sections/[section-id]/replicated/`

Do not move files unless the user explicitly asked for a restructure.

## Step 2: Find every consumer (before changing API)

Before changing props/signatures:
- Search for imports/usages across `src/`.
- Check the Design page examples (`ComponentExamples`) for expected behavior and styling.

If you must break an API, update all callers in the same change.

## Step 3: Design system constraints (do not violate)

- **Tailwind v4** only.
- **No custom CSS** and **no inline styles**.
- Keep using semantic classes (as shown in Design page examples):
  - `bg-background`, `bg-layer-*`
  - `text-foreground`, `text-muted-foreground`
  - `border-border`
  - `ring-ring` / `focus-visible:*`
- **Radius must match `radius.json`**.
- Preserve light/dark compatibility (`dark:*` only when the token system requires it; prefer semantic classes).

If a change introduces hardcoded colors or one-off spacing, it’s wrong—replace with token/semantic equivalents.

## Step 4: Update the Design page examples (required when behavior/styling changes)

If your change affects appearance, interaction, or API:
- Update the relevant example card in `src/components/patterns/component-examples/sections/*.tsx`
- Ensure `src/components/ComponentExamples.tsx` still renders it
- Keep example `Card id="..."` stable (IDs are used for referencing)

## Step 5: Verification

- Ensure `npm run build` passes.
- If the component is user-facing in the Design page, verify in dev.

## How to reference existing components in prompts

Preferred: **exported component name + file path**.

Examples:
- “Modify `BottomMenu` in `src/components/ui/bottom-menu.tsx` to support a `footer` slot.”
- “Update `SettingsItem` in `src/components/settings/settings-item.tsx` to add a `disabled` state.”

If there are multiple similarly named components, include:
- the **exact import path**, and/or
- the Design page example **Card id** where it’s shown.

