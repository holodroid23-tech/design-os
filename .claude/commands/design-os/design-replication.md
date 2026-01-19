# Design Replication

You are helping the user replicate their mockup designs using **only** Compost design system tokens and existing UI components.

## Critical Mindset: The Map is Not the Territory

**Treat the mockup as a wireframe, not a pixel-perfect spec.**

- The mockup provides **information architecture** (what blocks exist, rough hierarchy, and interaction intent).
- The design system provides **actual layout rules** (spacing, radii, typography, component shapes).
- If the mockup and design system disagree, **the design system wins**.

**Never invent custom layout systems** (absolute positioning, bespoke measurements, one-off subcomponents) to “match the picture”.
If you can’t express something using existing components + tokenized classes, you must simplify to the closest design-system pattern.

## Workflow Overview (Debug Mode)

To ensure quality, this process is broken into distinct phases. You must **STOP AND REPORT** after each phase to allow for debugging.

1.  **Phase A — Structural Map (Blueprint)**: Create a purely semantic map. **NO VISUALS.**
2.  **Phase B — Component Scouting (Inspection)**: Find the **exact** existing component code. **VERIFY EXISTENCE.**
3.  **Phase C — Assembly**: Write the code using ONLY the found components. **NO STYLE OVERRIDES.**

---

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-roadmap.md` — Sections defined
- `/product/design-system/colors.json` — Color tokens
- `src/components/ComponentExamples.tsx` — Component usage patterns and examples
- `src/components/patterns/component-examples/inventory.ts` — The "Reference IDs" map
- `src/index.css` — Source-of-truth for tokenized utility classes

## Step 2: Load Sections & Mockups

Read `/product/product-roadmap.md` to get the list of sections.
For each section, check if it has mockups in `product/sections/[section-id]/mocks/`.

## Step 3: Select Mockup

Present sections/mockups and let the user choose.

## Step 4: Replicate Selected Mockup

### 4a. Read Context Files

Read:
- `src/components/patterns/component-examples/inventory.ts`
- `src/components/ComponentExamples.tsx` outline
- `src/index.css`

## The Two-Stage Protocol (Context Isolation)

To eliminate visual hallucinations, hacking, and blue-focus artifacts, the replication process is physically split into two distinct workflows.

### **Stage 1: The Analyst (Vision)**
**File**: `.claude/commands/design-os/design-replication-analyst.md`
- **Agent Requirement**: This agent is allowed to see the mockup.
- **Task**: Map the mockup to the logical intent and the exact component APIs.
- **Goal**: Create a Blueprint that is 100% "visual-free."

---

### **CRITICAL BRIDGE: The Wipe**
Before starting Stage 2, the user or agent **MUST** perform a "Context Wipe":
1.  Move the mockup PNG file out of the `mocks/` folder.
2.  (Optional) Close the current chat/session and start a new one to clear the agent's memory.

---

### **Stage 2: The Builder (Code)**
**File**: `.claude/commands/design-os/design-replication-builder.md`
- **Agent Requirement**: This agent is **BLIND**. It must never see the mockup.
- **Task**: Implement the code using ONLY the Blueprint and the component source files.
- **Goal**: Produce a pure Design System implementation with zero Tailwind hacks.

---

## Commands
Run Stage 1: `Apply design-replication-analyst workflow`
Run Stage 2: `Apply design-replication-builder workflow`


### 4e. Validate

- [ ] Does it compile?
- [ ] Run parity check: `npm run parity-check -- src/sections/[section-id]/[ComponentName].tsx`
- [ ] Ensure `designOS` export exists for visibility.

### 4f. Report

"✓ Created [ComponentName].tsx. Strict adherence to DS tokens was maintained; manual visual overrides were excluded."
