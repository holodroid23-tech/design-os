# Design Replication — Blueprint Only

You are producing a **blueprint**, not code.

## Goal

Convert a mockup into a design-system-valid plan that can be implemented **without seeing the image again**.

## Input requirement (must ask first)

Before you do anything else, you MUST ask the user to specify **exactly one** mockup to blueprint:

- **section-id**: the folder under `product/sections/` (e.g. `register-and-sales`)
- **mock filename**: the exact PNG name under `product/sections/[section-id]/mocks/` (e.g. `orders-main.png`)

If the user did not provide both values, STOP and ask for them. Do **not** guess, auto-pick, or “choose the most recent” mockup.

## Hard rules

- Treat the mockup as a **wireframe** (IA + hierarchy), not a pixel spec.
- Use **only existing components/patterns**:
  - `@/components/ui/*` exports
  - `src/components/settings/*` building blocks (when relevant)
- Use **only tokenized classes** that exist in `src/index.css` and allowed radii:
  - `rounded-[3px|6px|12px|18px|9999px]`
- Do not invent:
  - custom base components
  - absolute positioning / bespoke measurements
  - “helper” layout utilities

## Output

Write a markdown file to:

`product/sections/[section-id]/replicated-blueprints/[ComponentName].md`

Use this exact template:

```md
# [ComponentName] blueprint

## Presentation
- presentation: page | mobile | modal

## One-line intent
<What the screen is for>

## Hierarchy tree
- Root
  - Header
  - Content
  - Footer/actions

## Component mapping

| UI block | Component/pattern | Props/data | Tokens/classes |
|---|---|---|---|
| ... | ... | ... | ... |

## Data requirements
- <list the props the component will need, default-safe>

## Interaction requirements
- <callbacks, navigation intents>

## Notes / compromises
- <where design system overrides mockup details>
```

## After writing the blueprint

Stop. Do **not** write TSX in this command. Implementation happens via the separate “implement from blueprint” command.

### Optional but recommended: remove the image to prevent regression

If you want maximum reliability, **delete the mockup image after the blueprint is written** (or move it to an archive folder outside `mocks/`). The blueprint is the source-of-truth for implementation.

