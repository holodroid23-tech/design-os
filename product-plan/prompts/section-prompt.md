# Section implementation prompt

## Define section variables

- **SECTION_ID**: (folder in `product-plan/sections/`)
- **NN**: milestone number (starts at 03; 01 is foundation, 02 is shell)

---

I need you to implement the **SECTION_ID** section of my React Native app.

## Read first

1. **@product-plan/prd_spec.md**
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md**
3. **@product-plan/sections/SECTION_ID/spec.md**
4. **@product-plan/sections/SECTION_ID/types.ts**
5. **@product-plan/sections/SECTION_ID/sample-data.json**
6. (If present) **@product-plan/sections/SECTION_ID/interactions.md**

## Visual/reference materials

- (If present) **@product-plan/sections/SECTION_ID/mocks/**
- (If present) **@product-plan/sections/SECTION_ID/replicated-blueprints/**
- Optional runnable web reference bundle: **@product-plan/reference-web/**

## Before you start

Ask clarifying questions about:
- How this section connects to other entities
- Required permissions / roles
- Edge cases and empty states
