# Wipe Replicated Designs

You are helping the user delete **generated replicated design files** and **associated section data** so they can re-run design replication from scratch. This command must **never delete or modify** any mock screenshots in `product/sections/[section-id]/mocks/`.

## What This Command Deletes (and What It Never Touches)

**Delete (Deep Clean):**
- `product/sections/[section-id]/replicated/` (Components)
- `product/sections/[section-id]/replicated-blueprints/` (Blueprints)
- `product/sections/[section-id]/spec.md`
- `product/sections/[section-id]/data.json`
- `product/sections/[section-id]/types.ts`
- `product/sections/[section-id]/interactions.md`

**Never touch:**
- `product/sections/[section-id]/mocks/*` (PNG mock screenshots)

## Step 1: Scan for Replicated Designs

Search for replicated design files using:

- `product/sections/*/replicated/*.tsx`
- `product/sections/*/replicated-blueprints/*.md`

Build a list grouped by section-id containing the counts of found assets.

## Step 2: Ask the Wipe Scope

Ask the user what they want to wipe:

"What would you like to wipe?

1. One screen (choose a single replicated design)
2. One section (DEEP CLEAN: deletes all code, blueprints, specs, data, and types for a section)
3. Everything (DEEP CLEAN: deletes everything in all sections except mocks)"

Wait for user choice.

## Step 3A: One Screen

If the user chooses **One screen**:

1. Present a numbered list of sections containing designs.
2. Ask which section.
3. List replicated screens in that section (by filename).
4. Ask which screen to delete.
5. Delete:
   - `product/sections/[section-id]/replicated/[ScreenName].tsx`
   - `product/sections/[section-id]/replicated-blueprints/[ScreenName].md`

## Step 3B: One Section (Deep Clean)

If the user chooses **One section**:

1. Present a numbered list of sections.
2. Ask which section.
3. Warn: "This will delete ALL code, blueprints, specs, data, and types for this section. Only 'mocks/' will be preserved."
4. Delete:
   - `product/sections/[section-id]/replicated/`
   - `product/sections/[section-id]/replicated-blueprints/`
   - `product/sections/[section-id]/spec.md`
   - `product/sections/[section-id]/data.json`
   - `product/sections/[section-id]/types.ts`
   - `product/sections/[section-id]/interactions.md`

## Step 3C: Everything (Deep Clean All)

If the user chooses **Everything**:

1. Warn: "This will delete ALL replicated designs, blueprints, specs, data, and types across ALL sections. Only 'mocks/' folders will be preserved."
2. Delete everything except `mocks` folders in `product/sections/*`.
   - Iterating through each directory in `product/sections/`:
     - Keep `mocks/`
     - Force remove everything else (`replicated/`, `replicated-blueprints/`, `spec.md`, `data.json`, `types.ts`, `interactions.md`, etc.)

## Step 4: Report Result

After deletion, report a concise summary:

"✓ Wiped design artifacts.

- Sections affected: [count]
- Components/Blueprints deleted: [yes]
- Specs/Data/Types deleted: [yes]
- Mocks untouched: yes"

Then remind the user:

"The sections are now in a 'Day 1' state containing only mocks. You can now re-run the design replication workflow."

