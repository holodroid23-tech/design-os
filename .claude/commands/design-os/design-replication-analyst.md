# Design Replication: Stage 1 — The Analyst

**Role**: You are a Visual Analyst. Your job is to extract the **logical intent** from a design mockup without letting visual bias (casing, colors, sizing hacks) leak into the documentation.

---

## 0. Session naming (Required — do this before anything else)
The user will have many replication chats/agents. For discoverability, you **MUST** name this chat/session/agent using the **exact `section-id` folder name** from `product/sections/`, plus the component name and stage.

- **Derive `section-id`**: the folder name under `product/sections/` (example: `onboarding-and-security`)
- **Derive `ComponentName`**: PascalCase of the mock filename (example: `reset-password.png` → `ResetPassword`)
- **Set the session name to**: `[section-id] — [ComponentName] (Analyst)`

Examples:
- `onboarding-and-security — ResetPassword (Analyst)`
- `activity-and-reports — ActivityAndReportsManagerAdminView (Analyst)`

## 1. Input Context
- Mockup PNG: `product/sections/[section-id]/mocks/[mock-name].png`
- Design Library: `src/components/patterns/component-examples/inventory.ts`
- Global Tokens: `src/index.css`

---

## 2. Process

### Phase 0: Pattern Classification (Choose the Right Family)
Before writing the Blueprint or mapping components, classify each list/row you see into one of these intent patterns. This prevents accidentally building “navigation rows” when the UI is actually “atomic controls”, and vice-versa.

#### Card-looking rows (Important rule)
- **Problem**: Many mobile designs draw destination rows as “cards” (rounded container, inset spacing), even though functionally they are just **atomic rows**.
- **Rule**: If it’s a **single tap target** row (role choice, profile choice, “continue as…”, etc.), treat it as an **item row** and build it with atomic items:
  - Use `@/components/settings/settings-group` + `@/components/settings/settings-item`
  - Use `SettingsItemAction` for chevrons/values/badges
  - Do **not** rebuild these as generic `Card` layouts unless the blueprint intent is truly “card content” (multi-line, multi-control, non-row layout)

#### A) Settings Section Navigation (Destinations)
- **Intent**: Row takes the user to another screen/section (a destination).
- **Signals**:
  - Row has a trailing navigation indicator (e.g., chevron), count badge, language value, etc.
  - Row does **not** contain a direct control like a toggle/stepper/input.
- **Preferred composition**:
  - Container: `@/components/settings/settings-group`
  - Row: `@/components/settings/settings-item`
  - Leading: `IconTile` (from `@/components/atoms/icon`) or `ImageTile` (from `@/components/ui/image-tile`) or `Avatar`
  - Content: `SettingsItemTitle` + optional `SettingsItemDescription`
  - Trailing: chevron/value/badge in `SettingsItemAction`
- **Reference examples**:
  - `src/components/patterns/component-examples/sections/settings-examples.tsx` (`SettingsComponentsExamplesCard`)
  - `src/components/patterns/component-examples/sections/building-blocks-examples.tsx` (navigation-style atomic items: Coffee shop, Invoices, General)

#### B) Atomic Items (Controls inside a Section)
- **Intent**: Row is a **setting/control** the user changes in-place (toggle, action button, status).
- **Signals**:
  - Row contains a direct control: `Switch`, action `Button`, stacked actions, status subtext tones, etc.
  - There is no “go to another screen” expectation for tapping the row (unless explicitly stated).
- **Preferred composition**:
  - Container: `@/components/settings/settings-group`
  - Row: `@/components/settings/settings-item`
  - Content: `SettingsItemTitle` + optional `SettingsItemDescription`
  - Trailing control: `SettingsItemAction` containing `Switch` / `Button` / icons
- **Reference example**:
  - `src/components/patterns/component-examples/sections/building-blocks-examples.tsx` (`AtomicItemsExamplesCard`, especially “Toggle option”)

### Phase 0.5: Multi-mockup Consolidation (Combine Steps into One Stateful Screen)
Sometimes a “flow” is exported as multiple mockups that are clearly the **same screen** with only **state** differences (e.g., tab toggles like “Old/New”, step 1/step 2, error/success states).

When the user provides **multiple mockups for the same flow**, you must:
- **Merge them into one Blueprint** and one eventual component.
- Define an explicit **state model** (e.g., `step: "old" | "new"`).
- Document **what changes per state** (title text, helper text, primary action button, enabled/disabled conditions, auto-advance rules).
- Keep the UI **single-screen**: the toggle/step control changes content *in place*.

In the Blueprint:
- Add a **States** section right after the Logic Tree:
  - List each state and its trigger (toggle press, completion of PIN entry, etc.)
  - List state-specific UI differences (copy, actions, validation)
- In **Component Mapping**, map the state switcher to a real DS component when possible:
  - Prefer `@/components/ui/tabs` (`Tabs`, `TabsList`, `TabsTrigger`) for a two-state toggle.
  - If a suitable DS control does not exist, document the gap instead of inventing a new “segmented control” component.

### Phase A: Structural Blueprint (The Eye)
Convert the visual mockup into a logic-only tree.
**STRICT RULES**:
- **NO VISUALS**: Do not mention "Green", "Caps", "Round", "Pill", "Shadow", "Gray", "Focus", or "Bold".
- **EXACT CONTENT**: Copy the actual text, labels, and placeholders from the mockup verbatim, but ALWAYS convert to **Sentence case** (e.g., "BUSINESS NAME" → "Business name"). Only keep uppercase for acronyms (e.g., "VAT", "PIN"). The replica must match the content intent without inheriting visual casing hacks.
- **HAVE INTENT**: Describe the interaction pattern (e.g., "Single Selection Group", "Action Button Row").
- **DEFINE BLOCKS**: Partition the UI into logical **Implementation Blocks** (e.g., "Header Section", "Main Grid", "Footer Toolbar"). These will serve as checkpoints for the Builder.

### Phase B: Component Mapping (The Scout)
Map logical elements to atomic components from the Design System.

**STRICT RULES**:
- **Atomic Integrity**: Map inputs, buttons, and switches solely to their counterparts in `src/components/ui`. **CRITICAL**: You must view the `.tsx` file of any component you map to verify the `variant` and `size` props exist.
- **THE DEFAULT RULE**: If the Blueprint refers to a prop or variant that doesn't exist in the source code (e.g., `variant="ghost"`), you must FAIL and report the mismatch. Do not attempt to "fake" it with `className` hacks or arbitrary styles.
- **No Manual Component Resizing**: You are forbidden from mapping a Component with a hardcoded padding or font-size override. If a component needs to look "Large", check if `size="lg"` exists. If not, report the limitation.
- **MANDATORY MAPPINGS**:
    - **PIN / Authorization keypad** → MUST map to `@/components/ui/pin-entry` (`PinEntry`). Do **not** rebuild dot indicators or a numeric keypad with primitive buttons.
    - **Dropdowns** → MUST map to `@/components/ui/select-with-sliding` (Prop: `variant="sliding"`).
    - **Radio Lists** → MUST map to `@/components/ui/radio-button-group` (Prop: `variant="default"`).
    - **Section Headers** → MUST map to `@/components/ui/section-title`. (Check for Back Navigation pattern: requires `leading` prop).
    - **Complex accordions (Orders list)** → MUST map each expandable order row to `@/components/ui/order-expandable-card` (`OrderExpandableCard`). Do **not** rebuild “Order #___ expands to line items + details” with raw `Collapsible`/`Accordion` composition in replicated components.
    - **Complex accordions (Expenses list)** → MUST map day groups to `@/components/ui/expense-expandable-accordion` (`ExpenseExpandableGroup`) and each expandable expense row to `ExpenseExpandableRow`. Do **not** rebuild nested expense accordions from raw primitives in replicated components.
    - **Toggles** → Classify the row intent first (Phase 0):
        - **Atomic item rows** (common in settings): default to a trailing `Switch` inside `SettingsItemAction` (Split).
        - **Inline/grouped toggles** (less common): `Label` + `Switch` together in the same inline cluster (Grouped) **only if explicitly indicated** by the blueprint.
    - **Modals** → Identify the type: 
        1. **Simple** (Centered, small, limited actions like Confirm/Cancel) -> *Default for warnings/messages*.
        2. **Complex** (Standard dialog with form fields/content).
        3. **Fullscreen** (Covers entire screen, often for detailed flows).
        4. **Bottom sliding modal** (Slides up from bottom, mobile-first) → MUST map to `@/components/ui/bottom-sliding-modal` (`BottomSlidingModal` + `BottomSlidingModalContent`). Do **not** map bottom sliding modals to `SheetContent side="bottom"`.
    - **Settings Rows** → Decide first: Navigation vs Atomic Item (see Phase 0). Both commonly use `SettingsGroup` + `SettingsItem`, but the trailing element determines intent:
        - Navigation rows: trailing chevron/value/badge.
        - Atomic rows: trailing control like `Switch` / action `Button`.

---

## 3. Output
Save the result to `product/sections/[section-id]/replicated-blueprints/[ComponentName].md`.

### Format Requirement:
```markdown
# [ComponentName] Blueprint

## Logic Tree
- [Header] ...
- [Section] ...

## States (If multi-mockup)
- **State model**: `stateName: "stateA" | "stateB" | ...`
- **State A**: trigger, copy, actions, validation
- **State B**: trigger, copy, actions, validation

## Implementation Blocks (The Roadmap)
- [Block 1 Name]: [Brief description of what's inside]
- [Block 2 Name]: ...

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Selection Group | @/components/ui/radio-button-group | variant="surface" |
```

---

## 4. Final Instruction
Once saved, you must stop. 
**REPORT**: "Stage 1 (Analyst) Complete. Mapping is verified against actual source code props. Roadmap defined for incremental building."
