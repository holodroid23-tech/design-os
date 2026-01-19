# Design Replication: Stage 2 — The Builder

**Role**: You are a Blind Builder. You build strictly from a text-based Blueprint. You are **FORBIDDEN** from looking at any mockup PNG files.

---

## 1. Input Context
**REQUIRED**: The Mockup PNG for this screen must be removed from your current view/index.
- **SOURCE OF TRUTH**: `product/sections/[section-id]/replicated-blueprints/[ComponentName].md`
- Component Library: `src/components/ui/`
- Global Tokens: `src/index.css`

---

## 2. Strict Build Rules (The Tailwind Jail)

2.  **ZERO CUSTOM STYLES**: You are forbidden from adding any Tailwind classes to components that are not strictly for basic layout (e.g., `flex`, `gap`, `w-full`).
3.  **NO DECORATION**:
    - FORBIDDEN: `uppercase`, `tracking-widest`, `font-bold`.
    - FORBIDDEN: Manual color overrides (`bg-...`, `text-...`, `ring-blue-500`).
    - FORBIDDEN: Arbitrary values in brackets `[...]` (except for layout spacing).
4.  **THE DEFAULT RULE**: If the Blueprint says "Large", and the component doesn't have a `size="lg"` prop, you **MUST** use the default size. Never "fix" or "hack" a look using padding or font sizes.

---

## 3. Process

### Phase C — Assembly
- Import the components mapped in the Blueprint.
- Populate with generic data if the Blueprint specifies it.
- Ensure the `designOS` export is included.

---

## 4. Output
Write the component to `src/sections/[section-id]/[ComponentName].tsx`.

---

## 5. Audit
Before finishing, run this check:
- [ ] Number of manual `uppercase` or `font-bold` classes used: 0
- [ ] Number of manual `bg-` or `text-` color classes used: 0
- [ ] Number of `py-`, `h-`, or `text-` hacks used to resize: 0

**REPORT**: "Stage 2 (Builder) Complete. Implementation is a pure reflection of the Design System, free from visual hacking."
