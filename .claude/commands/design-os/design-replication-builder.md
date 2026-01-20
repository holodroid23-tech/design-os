# Design Replication: Stage 2 — The Builder

**Role**: You are a Blind Builder. You build strictly from a text-based Blueprint. You are **FORBIDDEN** from looking at any mockup PNG files.

---

## 1. Input Context
**REQUIRED**: The Mockup PNG for this screen must be removed from your current view/index.
- **SOURCE OF TRUTH**: `product/sections/[section-id]/replicated-blueprints/[ComponentName].md`
- Component Library: `src/components/ui/`
- Global Tokens: `src/index.css`

---

## 2. Strict Build Rules (Standardized Layout)

1.  **COMPONENT PURITY**: You are forbidden from using `className` on a Design System component (e.g., `<Button />`) to change its **internal** CSS properties like `padding`, `font-size`, or `border-radius`. Use the supported `variant` and `size` props.
2.  **LAYOUT COMPOSITION**: You **ARE allowed** to use Tailwind on the **Container Elements** (wrappers, cards, grids) to match the layout intent of the Blueprint. 
    - **Example (ALLOWED)**: `<div className="bg-muted/10 p-6 rounded-2xl"><Input variant="ghost" /></div>` (This achieves a custom-height filled look without hacking the Input).
    - **Example (FORBIDDEN)**: `<Input className="h-14 py-8 rounded-[12px] bg-muted/10" />` (This hacks the component internals).
3.  **TOKENIZED OVERRIDES**:
    - Avoid arbitrary values in brackets `[...]` unless it's a specific grid/spacing requirement from the Layout Pattern. 
    - Use semantic colors like `bg-muted`, `bg-card`, `bg-secondary`.
4.  **THE DEFAULT RULE**: If the Blueprint says "Extra Large", but the component only has `size="lg"`, you **must** use `size="lg"`. You are not allowed to "compensate" by adding font-size or padding to the component.
5.  **MANDATORY PATTERNS**:
    - **Complex accordions (Orders list)**: Use `@/components/ui/order-expandable-card` (`OrderExpandableCard`) for each expandable order row. Do **not** rebuild the pattern from raw `Collapsible`/`Accordion` primitives in replicated components.
    - **Complex accordions (Expenses list)**: Use `@/components/ui/expense-expandable-accordion` (`ExpenseExpandableGroup` + `ExpenseExpandableRow`). Do **not** rebuild nested day/row accordions from raw primitives in replicated components.
    - **Toggles (atomic items vs inline)**:
        - **Atomic item row toggle (default in settings)**: Put the `Switch` in `SettingsItemAction` (trailing). Do **not** use `justify-between` on the row; rely on `SettingsItemContent` + `SettingsItemAction`.
        - **Inline/grouped toggle**: Only place `Label` + `Switch` together (e.g. `flex gap-4 items-center`) if the Blueprint explicitly calls for a grouped alignment.
    - **Headers**: Use `<SectionTitle leading={<ChevronLeft .../>} interactive ...>` for back navigation. Do NOT build manual flex rows with separate Buttons.
    - **Settings rows (choose intent first)**:
        - **Navigation rows (destinations)**: Use `SettingsGroup` + `SettingsItem` composition (leading media/icon + title/description + trailing chevron/value). This is for “sections in settings” that route to another screen.
        - **Atomic items (controls)**: Use the **same** `SettingsGroup` + `SettingsItem` family, but with a trailing **control** (`Switch`, action `Button`, stacked actions). This is for settings that are changed in-place inside a section.
        - **Rule of thumb**: If the row contains a `Switch`, it is almost always an **Atomic item**, not a navigation row.
    - **Radio Groups**: Use `variant="default"`. Avoid manual class overrides on items.
    - **Text Sizing**: Trust the component default sizes (e.g. 18px for SectionTitle). Do not add `text-[size]` classes manually.
    - **Modals**: 
        - **Simple**: Use `className="items-center sm:text-center"` on Header and `className="sm:justify-center"` on Footer. **Default for warnings.**
        - **Complex**: Standard left-aligned Header and right-aligned Footer (default behavior).
        - **Fullscreen**: Use `className="inset-0 top-0 left-0 max-w-none h-[100dvh] w-[100dvw] rounded-none"` on Content.
        - **Bottom sliding modal**: MUST use `@/components/ui/bottom-sliding-modal` (`BottomSlidingModal` + `BottomSlidingModalContent`). Do **not** use `SheetContent side="bottom"` anywhere.
6.  **EXPORT DEFAULT**: You **MUST** use `export default function [ComponentName]() {...}`. Named exports will fail to load in the previewer.

### Practical “When to Choose What” Examples
- **Settings sections (navigation)**: “Inventory”, “Expenses”, “Users”, “General” on a settings root screen → `SettingsGroup` / `SettingsItem` + trailing chevron/value.
  - Reference: `src/components/patterns/component-examples/sections/settings-examples.tsx` (`SettingsComponentsExamplesCard`)
- **Atomic items (controls)**: “Toggle option”, “Receipt printer (offline) + Reconnect”, “Kitchen printer + Test” inside a settings section → `SettingsGroup` / `SettingsItem` + trailing `Switch`/`Button`.
  - Reference: `src/components/patterns/component-examples/sections/building-blocks-examples.tsx` (`AtomicItemsExamplesCard`)

---

## 3. Process

### Phase C — Incremental Assembly (The Block-by-Block Pass)
- **RESPECT THE ROADMAP**: Use the `Implementation Blocks` defined in the Blueprint.
- **BUILD IN BLOCKS**: You must implement the component section by section.
- **WRITE CODE**: For each block, update the `.tsx` file in `product/sections/[section-id]/replicated/[ComponentName].tsx`.
- **USE COMPONENTS AS-IS**: Follow the Component Mapping table. Use only the variants and props verified by the Analyst.
- **STOP & VALIDATE**: After finishing **EACH** block, you MUST STOP and wait for user feedback.
  - **PROMPT**: "Block [X/Y]: [Block Name] is implemented. Does this look correct to you? (Reply 'ok' to proceed to the next block)."
- **ITERATE**: If the user provides feedback, adjust the block before moving forward.
- **CONTINUE**: Only proceed to the next block once the user confirms.

---

## 4. Output
Write the component block-by-block to `product/sections/[section-id]/replicated/[ComponentName].tsx`.

---

## 5. Audit
Before the final report (after all blocks are completed):
- [ ] Number of manual `uppercase` or `font-bold` classes used: 0
- [ ] Number of manual `bg-` or `text-` color classes used: 0
- [ ] Number of `py-`, `h-`, or `text-` hacks used to resize: 0

**REPORT**: "Stage 2 (Builder) Complete. Implementation follows the incremental block-by-block roadmap and is verified by the user."
