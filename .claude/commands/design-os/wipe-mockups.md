# Wipe Mockups (Optional)

You are helping the user delete mockup screenshot files after they have produced blueprints.

This is useful to enforce the “no image in implementation” rule and prevent regression into pixel-chasing.

## What this command deletes (and never touches)

**Delete:**
- `product/sections/[section-id]/mocks/*.png` (and `.jpg`/`.jpeg` if present)

**Never touch:**
- `product/sections/[section-id]/replicated-blueprints/*`
- `product/sections/[section-id]/replicated/*`
- `product/sections/[section-id]/spec.md`
- `product/sections/[section-id]/data.json`
- `product/sections/[section-id]/types.ts`

## Step 1: Scan for mockups

Search for:
- `product/sections/*/mocks/*.{png,jpg,jpeg}`

Group results by section-id:
- Section ID
- Count
- Filenames

If no mockups exist:

"No mockups found. Nothing to wipe."

Stop.

## Step 2: Ask wipe scope

"What would you like to wipe?

1. One mockup (choose a single file)
2. One section (wipe all mockups in a section)
3. Everything (wipe all mockups in all sections)"

Wait for user choice.

## Step 3A: One mockup

1. Present sections with mockup counts: `[Section ID] — [N] mockups`
2. Ask which section.
3. List mockup filenames in that section.
4. Ask which file to delete.
5. Delete only that file under `mocks/`.

## Step 3B: One section

1. Present sections with mockup counts: `[Section ID] — [N] mockups`
2. Ask which section.
3. Confirm by listing filenames to be removed.
4. Delete all files under `product/sections/[section-id]/mocks/` (only images).

## Step 3C: Everything

1. Confirm by listing sections + counts.
2. Delete all mockup images under `product/sections/*/mocks/` (only images).

## Step 4: Report result

"✓ Wiped mockups.

- Sections affected: [count]
- Files deleted: [count]
- Blueprints untouched: yes"

