# Export Product

This project exports a complete implementation handoff package:

- `product-plan/` (folder)
- `product-plan.zip` (zip at repo root, used by the Export page download)

## Prerequisites

**Required:**

- `product/product-overview.md`
- `product/product-roadmap.md`
- At least one section folder in `product/sections/<section-id>/` containing **both**:
  - `spec.md`
  - `data.json`

**Recommended (export warns but continues):**

- `product/design-system/` (tokens)
- `product/data-model/`
- `product/shell/spec.md`
- `src/shell/components/`
- `.claude/prd_spec.md` (React Native target + non‑negotiable stack)

## Run export (cross-platform)

From repo root:

```bash
npm run export-product-plan
```

## What’s included (high level)

- `product-plan/sections/<section-id>/` includes:
  - `spec.md`, `types.ts`, `sample-data.json`
  - `interactions.md` (if present)
  - `mocks/` (if present)
  - `replicated/` (web TSX reference, if present)
  - `replicated-blueprints/` (design rationale / blueprint notes, if present)
- `product-plan/reference-web/` contains an **optional runnable web viewer** for replicated screens.

## Important note about replicated TSX

The target implementation is **React Native** (see `product-plan/prd_spec.md`). Any exported TSX under:

- `product-plan/sections/*/replicated/`
- `product-plan/reference-web/`

is **web-only reference** to help interpret mockups and maintain visual parity. It is not production RN code.

