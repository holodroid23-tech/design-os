# Design Replication

You are helping the user replicate their mockup designs using **only** Compost design system tokens and existing UI components.

## Critical Mindset: The Map is Not the Territory

**Treat the mockup as a wireframe, not a pixel-perfect spec.**

- The mockup provides **information architecture** (what blocks exist, rough hierarchy, and interaction intent).
- The design system provides **actual layout rules** (spacing, radii, typography, component shapes).
- If the mockup and design system disagree, **the design system wins**.

**Never invent custom layout systems** (absolute positioning, bespoke measurements, one-off subcomponents) to “match the picture”.
If you can’t express something using existing components + tokenized classes, you must simplify to the closest design-system pattern.

## Workflow Overview (Three Phases)

To prevent "hallucinating" styles and to ensure exact component usage, this process is strictly divided into three phases:

1.  **Phase A — Structural Map (Blueprint)**: Create a semantic map of the UI. **NO VISUAL DETAILS.**
2.  **Phase B — Component Scouting (Inspection)**: Inspect the Design System (physically via DOM or via inventory) to find the **exact** existing components that match your map.
3.  **Phase C — Assembly**: Combine the map and the found components to build the screen.

---

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-roadmap.md` — Sections defined
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `/product/design-system/radius.json` — Radius tokens (allowed values: 3px, 6px, 12px, 18px, 9999px)
- `src/components/ComponentExamples.tsx` — Component usage patterns and examples
- `src/components/patterns/component-examples/inventory.ts` — The "Reference IDs" map
- `src/index.css` — Source-of-truth for tokenized utility classes

Stop here if required files are missing.

## Step 2: Load Sections

Read `/product/product-roadmap.md` to get the list of sections.
For each section, check if it has mockups in `product/sections/[section-id]/mocks/`.

If no sections have mockups:
"No mockups found. Add PNG files to `product/sections/[section-id]/mocks/` for any section, then run this command again."
Stop here if no mockups exist.

## Step 3: Select Mockup

Present sections and let the user choose.
Then present mockups within that section.

## Step 4: Replicate Selected Mockup

For each selected mockup:

### 4a. Read Context Files

Read the following files to gather context:
- `src/components/patterns/component-examples/inventory.ts` (This is your PRIMARY map of what exists)
- `src/components/ComponentExamples.tsx` (Use `view_file_outline`)
- `src/index.css` (For valid utility tokens)

### 4b. Load Mockup Image

Read the mockup image from `product/sections/[section-id]/mocks/[mockup-name].png`.

### 4c. Phase A — Structural Blueprint (The Map)

**Goal**: Create a semantic tree structure of the UI.
**STRICT RULE**: Do NOT describe colors, specific pixel sizes, specific radii, or "looks like". Describe **WHAT** it is (Button, List, Input) and **WHERE** it is relative to others (Top, Left, Inside Card).

**Format**:
Save this as `product/sections/[section-id]/replicated-blueprints/[ComponentName].md`.

```markdown
# [ComponentName] Structure

## Layout Tree
- [Root] Container (Page/Modal)
  - [Header]
    - Title: "Text content"
    - Action: Button (Icon: "plus")
  - [Content] Two-column grid
    - [Left] Card
      - Title: "Revenue"
      - Value: "$5,000"
    - [Right] List
      - Item 1...

## Element Identification
- Header Title -> Heading
- Action Button -> Button (Icon variant)
- Revenue Card -> Stats Card Pattern
```

**Generate this blueprint NOW.** Do not proceed until this is done.

### 4d. Phase B — Component Scouting (Inspection)

**Goal**: Find the **exact** component code to use for each element in your Map.

**Instructions**:
1.  **Physical Inspection**:
    - If the user has a dev server running (ask or check), use `browser_subagent` to navigate to the Design System page (usually `/design`).
    - Inspect the page visually to find the components that match your Blueprint.
    - Look for the "Reference IDs" (small code badges like `file • name`) in the DOM/On-screen.
    - Note down the **ID** or **Component Name**.

2.  **Inventory Lookup (Fallback/Complement)**:
    - If you cannot use the browser, use `src/components/patterns/component-examples/inventory.ts`.
    - Search this file for keywords from your Blueprint (e.g., "Stats Card", "Button", "List").
    - Find the corresponding `component` path (e.g., `@/components/patterns/...#StatsCard`).

**Output**:
Update the Blueprint file (`product/sections/[section-id]/replicated-blueprints/[ComponentName].md`) with a new section:

```markdown
## Component Mapping
| Map Element | Exact Component / Reference ID | Import Path |
|---|---|---|
| Revenue Card | Stats Cards Example | @/components/patterns/component-examples/sections/layout-examples#StatsCard |
| Action Button | Button | @/components/ui/button |
```

**Verify**:
- **Do the files actually exist?** Check them.
- **Do they allow props?** Check `view_file` on the source.

### 4e. Phase C — Assembly (The Build)

**Goal**: Write the React code.

**Instructions**:
1.  **Drafting**:
    - Open `src/sections/[section-id]/[ComponentName].tsx`.
    - Import the components identified in Phase B.
    - **Copy/Paste strategy**: If the identified component is an "Example" (from `patterns/component-examples`), read that file. often these "examples" are compositions of atoms. You typically want to **copy the composition logic** into your new component, but import the **atoms** (from `@/components/ui`).
    - **Do NOT** import the "Example" component directly (e.g., `ButtonsExamplesCard`) unless it is explicitly designed to be reused as a whole widget. **Usually, you want to inspect the example code and copy how they used the atoms.**

2.  **Tokens & Styling**:
    - Use **ONLY** tokens found in `src/index.css`.
    - **NO** hardcoded hex values.
    - **NO** arbitrary values (e.g. `w-[350px]`). Use standard grid/layout classes.

3.  **Implementation**:
    - Write the code.
    - Ensure it accepts `props` (data, callbacks).
    - Ensure text is Sentence case.

4.  **Register**:
    - Create/update `product/sections/[section-id]/replicated/[ComponentName].tsx` to export the component for the Design OS.

### 4f. Validate

- [ ] Does it compile?
- [ ] Are there any forbidden styles (arbitrary values, hardcoded colors)?
- [ ] Does it match the Phase A Map structure?
- [ ] Does it use the Phase B Components?

### 4g. Report

"✓ Created [ComponentName].tsx using components: [List of components used]"
