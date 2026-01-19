# Design Replication — Implement From Blueprint (No Image)

You are implementing a replicated screen **without seeing the mockup**.

## Inputs

- Blueprint file: `product/sections/[section-id]/replicated-blueprints/[ComponentName].md`
- Design system references:
  - `src/index.css` (allowed tokenized classes)
  - `src/components/ComponentExamples.tsx` (patterns)
  - `src/components/ui/index.ts` (available UI exports)

## Hard rules

- Do not open or reference the mockup image.
- Use only existing UI components; no new base components.
- Use only tokenized classes; no palette colors, no hex/rgb/hsl.
- Allowed radii only: `rounded-[3px|6px|12px|18px|9999px]`
- Must be preview-safe: `<Component />` renders with no props.

## Output files

1. Implementation:
   - `src/sections/[section-id]/[ComponentName].tsx`
2. Preview hook re-export:
   - `product/sections/[section-id]/replicated/[ComponentName].tsx`

## Validation

Run:
- `npm run parity-check -- src/sections/[section-id]/[ComponentName].tsx`
- (recommended) `npm run parity-check -- --strict-components src/sections/[section-id]/[ComponentName].tsx`

If validation fails, fix until it passes.

