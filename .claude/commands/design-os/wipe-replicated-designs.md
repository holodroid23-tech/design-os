# Wipe Replicated Designs

You are helping the user delete **generated replicated design files** so they can re-run design replication from scratch. This command must **never delete or modify** any mock screenshots in `product/sections/[section-id]/mocks/`.

## What This Command Deletes (and What It Never Touches)

**Delete:**
- `product/sections/[section-id]/replicated/*.tsx` (replicated design components / preview hooks)

**Never touch:**
- `product/sections/[section-id]/mocks/*` (PNG mock screenshots)
- `product/sections/[section-id]/spec.md`
- `product/sections/[section-id]/data.json`
- `product/sections/[section-id]/types.ts`

## Step 1: Scan for Replicated Designs

Search for replicated design files using:

- `product/sections/*/replicated/*.tsx`

Build a list grouped by section-id:
- Section ID
- Number of replicated screens found
- Screen/component filenames (without `.tsx`)

If **no replicated designs exist**, respond:

"No replicated designs found. Nothing to wipe."

Stop here if none exist.

## Step 2: Ask the Wipe Scope

Ask the user what they want to wipe:

"What would you like to wipe?

1. One screen (choose a single replicated design)
2. One section (wipe all replicated designs in a section)
3. Everything (wipe all replicated designs in all sections)"

Wait for user choice.

## Step 3A: One Screen

If the user chooses **One screen**:

1. Present a numbered list of sections that have replicated designs:
   - `[Section ID] — [N] replicated screens`
2. Ask which section.
3. List replicated screens in that section (by filename), plus an explicit note:
   - "This will delete only the selected `.tsx` file(s) under `replicated/`. Mocks will remain."
4. Ask which screen to delete.
5. Delete:
   - `product/sections/[section-id]/replicated/[ScreenName].tsx`

## Step 3B: One Section (All Screens in Section)

If the user chooses **One section**:

1. Present a numbered list of sections that have replicated designs:
   - `[Section ID] — [N] replicated screens`
2. Ask which section.
3. Confirm the exact delete set by listing filenames that will be removed.
4. Delete **all**:
   - `product/sections/[section-id]/replicated/*.tsx`

## Step 3C: Everything (All Sections)

If the user chooses **Everything**:

1. Confirm the wipe by listing sections and counts:
   - `[Section ID] — [N] replicated screens`
2. Delete **all**:
   - `product/sections/*/replicated/*.tsx`

## Step 4: Report Result

After deletion, report a concise summary:

"✓ Wiped replicated designs.

- Sections affected: [count]
- Files deleted: [count]
- Mocks untouched: yes"

Then remind the user:

"If the UI still shows old replicated counts, restart the dev server (Vite caches `import.meta.glob` file lists) and hard refresh the page."

## Important Notes

- Only delete `.tsx` files inside `product/sections/[section-id]/replicated/`.
- Do not delete the `replicated/` folder itself (leave it empty if needed).
- Never delete or modify anything inside `mocks/`.

