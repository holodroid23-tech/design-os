# Export

Design OS exports your planning artifacts into a reproducible, implementation-ready handoff folder: `product-plan/`, plus a downloadable `product-plan.zip`.

## When to export

You’re ready when:

- **Required**: `product/product-overview.md` and `product/product-roadmap.md` exist
- **Required**: at least one section has **both** `spec.md` and `data.json`
- **Recommended**: `product/design-system/`, `product/data-model/`, `product/shell/spec.md`, and `src/shell/components/` exist

## Run the export (cross-platform)

From the repo root:

```bash
npm run export-product-plan
```

This generates:

- `product-plan/` (folder)
- `product-plan.zip` (at repo root)

The Design OS Export page will offer the download when `product-plan.zip` exists.

## What’s included

```
product-plan/
├── README.md
├── product-overview.md
├── prd_spec.md (if present)
├── implementation-guide.md (if present)
├── design-system/ (copied from product/design-system/, if present)
├── data-model/ (copied from product/data-model/, if present)
├── shell/
│   ├── spec.md (if present)
│   └── components/ (copied from src/shell/components/, if present)
├── sections/
│   └── [section-id]/
│       ├── spec.md
│       ├── types.ts
│       ├── sample-data.json
│       ├── interactions.md (if present)
│       ├── mocks/ (if present)
│       ├── replicated/ (web reference TSX, if present)
│       └── replicated-blueprints/ (if present)
├── prompts/
│   ├── one-shot-prompt.md
│   └── section-prompt.md
├── instructions/
│   ├── one-shot-instructions.md
│   └── incremental/
│       ├── 01-foundation.md
│       ├── 02-shell.md
│       └── NN-[section-id].md
└── reference-web/
    └── (optional runnable Vite app to view replicated screens)
```

## About `reference-web/` and replicated TSX

- **Target implementation** is React Native (see `product-plan/prd_spec.md`).
- `sections/*/replicated/*.tsx` and `reference-web/` are **web-only reference implementations** to help interpret mockups and match spacing/layout. They are **not** production RN code.

To run the reference viewer:

```bash
cd product-plan/reference-web
npm install
npm run dev
```
