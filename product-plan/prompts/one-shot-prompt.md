# One-shot implementation prompt

I need you to implement a complete **React Native application (Android + iOS)** from the design handoff package in `product-plan/`.

## Source of truth (read first)

1. **@product-plan/prd_spec.md** — Platform + non-negotiable tech stack
2. **@product-plan/product-overview.md** — Product context + section list
3. **@product-plan/instructions/one-shot-instructions.md** — All milestones

## Design assets to reference

- **@product-plan/design-system/** — Tokens (colors/typography/spacing/radius/elevations)
- **@product-plan/data-model/** — Data model vocabulary
- **@product-plan/shell/** — Shell spec + (web) shell components as reference
- **@product-plan/sections/** — Specs, types, sample data, interactions, mockups, and replicated-blueprints

## Important note about replicated TSX

Some sections include `sections/*/replicated/*.tsx` and `reference-web/`. These are **web React reference implementations**, provided only to help you match layout/spacing and interpret mockups. They are **not production React Native code**.

## Before you start

Ask clarifying questions about:
- Authentication / user model
- Local database choice + sync strategy (offline-first)
- Backend stack + hosting
- Permissions / roles
- Printing + payments integrations (Stripe Tap to Pay, etc.)

Then propose an implementation plan (milestones + file structure) before coding.
