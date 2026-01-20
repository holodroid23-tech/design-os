# ComPOSt — Design handoff (`product-plan/`)

## What’s inside

- `product-overview.md` — Product context + planned sections
- `prd_spec.md` — Target platform + non-negotiable tech stack (if present)
- `design-system/` — Tokens (colors/typography/spacing/radius/elevations)
- `data-model/` — Data model vocabulary (if present)
- `shell/` — Shell spec + (web) reference components (if present)
- `sections/` — Per-section specs, types, sample data, interactions, mocks, and replicated-blueprints
- `instructions/` — Implementation milestones + prompts
- `reference-web/` — Optional runnable web reference bundle (for viewing replicated screens)

## Recommended workflow

1. Use `prompts/one-shot-prompt.md` (or `prompts/section-prompt.md`) with your implementation agent.
2. Implement in milestones under `instructions/incremental/`.
3. Use `reference-web/` only as a visual/layout reference.
