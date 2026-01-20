# Export Product

You are helping the user export their complete product design as a handoff package for implementation. This generates all files needed to build the product in a real codebase.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined

**Recommended (show warning if missing):**
- `/product/data-model/data-model.md` — Global data model
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `src/shell/components/AppShell.tsx` — Application shell

If required files are missing:

"To export your product, you need at minimum:
- A product overview (`/product-vision`)
- A roadmap with sections (`/product-roadmap`)

Please complete these first."

Stop here if required files are missing.

If recommended files are missing, show warnings but continue:

"Note: Some recommended items are missing:
- [ ] Data model — Run `/data-model` for consistent entity definitions
- [ ] Design tokens — Run `/design-tokens` for consistent styling
- [ ] Application shell — Run `/design-shell` for navigation structure

You can proceed without these, but they help ensure a complete handoff."

## Step 2: Gather Export Information

Read all relevant files:

1. `/product/product-overview.md` — Product name, description, features
2. `/product/product-roadmap.md` — List of sections in order
3. `.claude/prd_spec.md` (if exists) — Target platform + tech stack constraints (source of truth for implementation)
3. `/product/data-model/data-model.md` (if exists)
4. `/product/design-system/colors.json` (if exists)
5. `/product/design-system/typography.json` (if exists)
6. `/product/shell/spec.md` (if exists)
7. For each section: `spec.md`, `data.json`, `types.ts`
8. List shell design components in `src/shell/`

## Step 3: Create Export Directory Structure

Create the `product-plan/` directory with this structure:

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary (always provide)
│
├── prompts/                     # Ready-to-use prompts for coding agents
│   ├── one-shot-prompt.md       # Prompt for full implementation
│   └── section-prompt.md        # Prompt template for section-by-section
│
├── instructions/                # Implementation instructions
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/             # For milestone-by-milestone implementation
│       ├── 01-foundation.md
│       ├── 02-[first-section].md
│       ├── 03-[second-section].md
│       └── ...
│
├── design-system/               # Design tokens
│   ├── tokens.css
│   ├── tailwind-colors.md
│   └── fonts.md
│
├── data-model/                  # Data model
│   ├── README.md
│   ├── types.ts
│   └── sample-data.json
│
├── shell/                       # Shell components
│   ├── README.md
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── MainNav.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── screenshot.png (if exists)
│
└── sections/                    # Section specifications and designs
    └── [section-id]/
        ├── spec.md              # Section specification
        ├── types.ts             # TypeScript interfaces
        ├── sample-data.json     # Sample data
        ├── mocks/               # Mockup images (if exist)
        │   └── *.png
        └── replicated/          # Replicated design components (if exist)
            └── *.tsx
```

## Step 4: Generate product-overview.md

Create `product-plan/product-overview.md`:

```markdown
# [Product Name] — Product Overview

## Summary

[Product description from product-overview.md]

## Planned Sections

[Ordered list of sections from roadmap with descriptions]

1. **[Section 1]** — [Description]
2. **[Section 2]** — [Description]
...

## Data Model

[If data model exists: list entity names]
[If not: "Data model to be defined during implementation"]

## Design System

**Colors:**
- Primary: [color or "Not defined"]
- Secondary: [color or "Not defined"]
- Neutral: [color or "Not defined"]

**Typography:**
- Heading: [font or "Not defined"]
- Body: [font or "Not defined"]
- Mono: [font or "Not defined"]

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, and application shell
2. **[Section 1]** — [Brief description]
3. **[Section 2]** — [Brief description]
...

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
```

## Step 5: Generate Milestone Instructions

Each milestone instruction file should begin with the following preamble (adapt the milestone-specific details):

```markdown
---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---
```

### 01-foundation.md

Place in `product-plan/instructions/incremental/01-foundation.md`:

```markdown
# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

[Include the preamble above]

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

[If design tokens exist:]
Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

[If not:]
Define your own design tokens based on your brand guidelines.

### 2. Data Model Types

[If data model exists:]
Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

[If not:]
Define data types as you implement each section.

### 3. Routing Structure

Create placeholder routes for each section:

[List routes based on roadmap sections]

### 4. Application Shell

[If shell exists:]

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

**Wire Up Navigation:**

Connect navigation to your routing:

[List nav items from shell spec]

**User Menu:**

The user menu expects:
- User name
- Avatar URL (optional)
- Logout callback

[If shell doesn't exist:]

Design and implement your own application shell with:
- Navigation for all sections
- User menu
- Responsive layout

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/screenshot.png` — Shell visual reference

## Done When

- [ ] Design tokens are configured
- [ ] Data model types are defined
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Responsive on mobile
```

### [NN]-[section-id].md (for each section)

Place in `product-plan/instructions/incremental/[NN]-[section-id].md` (starting at 02 for the first section).

Note: Sections only have specs and sample data - no UI components are provided. Implementation is left to the developer.

```markdown
# Milestone [N]: [Section Title]

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, plus any prior section milestones

## Goal

Implement the [Section Title] feature — [brief description from roadmap].

## Overview

[One paragraph describing what this section enables users to do. Focus on the user's perspective and the value they get from this feature. Extract from spec.md overview.]

**Key Functionality:**
- [Bullet point 1 — e.g., "View a list of all projects with status indicators"]
- [Bullet point 2 — e.g., "Create new projects with name, description, and due date"]
- [Bullet point 3 — e.g., "Edit existing project details inline"]
- [Bullet point 4 — e.g., "Delete projects with confirmation"]
- [Bullet point 5 — e.g., "Filter projects by status or search by name"]

[List 3-6 key capabilities that the UI components support and need backend wiring]

## What to Implement

### UI Components

Design and implement the UI based on the section specification.

### Data Layer

Implement the UI using these data shapes:

[Key types from types.ts]

You'll need to:
- Design and build the UI components
- Create API endpoints or data fetching logic
- Connect real data to your components

## Files to Reference

- `product-plan/sections/[section-id]/spec.md` — Section specification
- `product-plan/sections/[section-id]/types.ts` — TypeScript interfaces
- `product-plan/sections/[section-id]/sample-data.json` — Test data

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: [Primary Flow Name — e.g., "Create a New Project"]

1. User [starting action — e.g., "clicks 'New Project' button"]
2. User [next step — e.g., "fills in project name and description"]
3. User [next step — e.g., "clicks 'Create' to save"]
4. **Outcome:** [Expected result — e.g., "New project appears in the list, success message shown"]

### Flow 2: [Secondary Flow Name — e.g., "Edit an Existing Project"]

1. User [starting action — e.g., "clicks on a project row"]
2. User [next step — e.g., "modifies the project details"]
3. User [next step — e.g., "clicks 'Save' to confirm changes"]
4. **Outcome:** [Expected result — e.g., "Project updates in place, changes persisted"]

### Flow 3: [Additional Flow — e.g., "Delete a Project"]

1. User [starting action — e.g., "clicks delete icon on a project"]
2. User [next step — e.g., "confirms deletion in the modal"]
3. **Outcome:** [Expected result — e.g., "Project removed from list, empty state shown if last item"]

[Include 2-4 flows covering the main user journeys in this section. Reference the specific UI elements and button labels from the components.]

## Done When

- [ ] UI components implemented based on specification
- [ ] Components render with real data
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Responsive on mobile
```

## Step 6: Generate one-shot-instructions.md

Create `product-plan/instructions/one-shot-instructions.md` by combining all milestone content into a single document. Include the preamble at the very top:

```markdown
# [Product Name] — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided shell — use it as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement the section UI based on the specifications provided
- The shell components are props-based and ready to integrate

---

[Include product-overview.md content]

---

# Milestone 1: Foundation

[Include 01-foundation.md content WITHOUT the preamble — it's already at the top. This includes design tokens, data model, routing, AND application shell.]

---

# Milestone 2: [First Section Name]

[Include first section handoff content WITHOUT the preamble]

---

# Milestone 3: [Second Section Name]

[Include second section handoff content WITHOUT the preamble]

[Repeat for all sections, incrementing milestone numbers]
```

## Step 7: Copy and Transform Components

### Shell Components

Copy from `src/shell/components/` to `product-plan/shell/components/`:

- Transform import paths from `@/...` to relative paths
- Remove any Design OS-specific imports
- Ensure components are self-contained

### Section Data Files

For each section:
- Copy `product/sections/[section-id]/spec.md` to `product-plan/sections/[section-id]/spec.md`
- Copy `product/sections/[section-id]/types.ts` to `product-plan/sections/[section-id]/types.ts`
- Copy `product/sections/[section-id]/data.json` to `product-plan/sections/[section-id]/sample-data.json`

### Replicated Designs

For each section that has replicated designs:
- Copy all files from `product/sections/[section-id]/replicated/` to `product-plan/sections/[section-id]/replicated/`
- Copy all mockup images from `product/sections/[section-id]/mocks/` to `product-plan/sections/[section-id]/mocks/`
- Transform import paths from `@/...` to relative paths in replicated components
- Ensure components are self-contained and portable

## Step 8: Skip (sections don't need READMEs)

## Step 9: Skip (test instructions removed)

## Step 10: Generate Design System Files

### tokens.css

```css
/* Design Tokens for [Product Name] */

:root {
  /* Colors */
  --color-primary: [Tailwind color];
  --color-secondary: [Tailwind color];
  --color-neutral: [Tailwind color];

  /* Typography */
  --font-heading: '[Heading Font]', sans-serif;
  --font-body: '[Body Font]', sans-serif;
  --font-mono: '[Mono Font]', monospace;
}
```

### tailwind-colors.md

```markdown
# Tailwind Color Configuration

## Color Choices

- **Primary:** `[color]` — Used for buttons, links, key accents
- **Secondary:** `[color]` — Used for tags, highlights, secondary elements
- **Neutral:** `[color]` — Used for backgrounds, text, borders

## Usage Examples

Primary button: `bg-[primary]-600 hover:bg-[primary]-700 text-white`
Secondary badge: `bg-[secondary]-100 text-[secondary]-800`
Neutral text: `text-[neutral]-600 dark:text-[neutral]-400`
```

### fonts.md

```markdown
# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[Heading+Font]&family=[Body+Font]&family=[Mono+Font]&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** [Heading Font]
- **Body text:** [Body Font]
- **Code/technical:** [Mono Font]
```

## Step 11: Generate Prompt Files

Create the `product-plan/prompts/` directory with two ready-to-use prompt files.

### one-shot-prompt.md

Create `product-plan/prompts/one-shot-prompt.md`:

```markdown
# One-Shot Implementation Prompt

I need you to implement a complete **React Native mobile application (Android + iOS)** based on detailed design specifications and UI components I'm providing.

## Target tech stack (non-negotiable)

- **Framework**: React Native 0.81+ + TypeScript
- **UI Components**: Gluestack UI v2
- **Styling**: NativeWind v5
- **Icons**: lucide-react-native
- **Charts**: react-native-gifted-charts (dashboard analytics)
- **Theme**: Dark mode only
- **Tokens**: All colors/spacing/typography/radius come from the ComPOSt Design System files

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary with sections and data model overview
2. **@product-plan/instructions/one-shot-instructions.md** — Complete implementation instructions for all milestones
3. **@product-plan/prd_spec.md** — Platform rules + stack constraints (must be followed)

After reading these, also review:
- **@product-plan/design-system/** — Color and typography tokens
- **@product-plan/data-model/** — Entity types and relationships
- **@product-plan/shell/** — Application shell components
- **@product-plan/sections/** — All section components, types, sample data, and test instructions

## Before You Begin

Please ask me clarifying questions about:

1. **Authentication & Authorization**
   - How should users sign up and log in? (email/password, OAuth providers, magic links?)
   - Are there different user roles with different permissions?
   - Should there be an admin interface?

2. **User & Account Modeling**
   - Is this a single-user app or multi-user?
   - Do users belong to organizations/teams/workspaces?
   - How should user profiles be structured?

3. **Tech Stack Preferences**
   - What backend framework/language should I use?
   - What database do you prefer?
   - Any specific hosting/deployment requirements?

4. **Backend Business Logic**
   - Any server-side logic, validations or processes needed beyond what's shown in the UI?
   - Background processes, notifications, or other processes to trigger?

5. **Any Other Clarifications**
   - Questions about specific features or user flows
   - Edge cases that need clarification
   - Integration requirements

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, create a comprehensive implementation plan before coding.

```

### section-prompt.md

Create `product-plan/prompts/section-prompt.md`:

```markdown
# Section Implementation Prompt

## Define Section Variables

- **SECTION_NAME** = [Human-readable name, e.g., "Invoices" or "Project Dashboard"]
- **SECTION_ID** = [Folder name in sections/, e.g., "invoices" or "project-dashboard"]
- **NN** = [Milestone number, e.g., "02" or "03" — sections start at 02 since 01 is Foundation]

---

I need you to implement the **SECTION_NAME** section of my application.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section
3. **@product-plan/prd_spec.md** — Platform rules + stack constraints (must be followed)

Also review the section assets:
- **@product-plan/sections/SECTION_ID/spec.md** — Section specification
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript interfaces
- **@product-plan/sections/SECTION_ID/sample-data.json** — Test data

## Before You Begin

Please ask me clarifying questions about:

1. **Authentication & Authorization** (if not yet established)
   - How should users authenticate?
   - What permissions are needed for this section?

2. **Data Relationships**
   - How does this section's data relate to other entities?
   - Are there any cross-section dependencies?

3. **Integration Points**
   - How should this section connect to existing features?
   - Any API endpoints already built that this should use?

4. **Backend Business Logic**
   - Any server-side logic, validations or processes needed beyond what's shown in the UI?
   - Background processes, notifications, or other processes to trigger?

5. **Any Other Clarifications**
   - Questions about specific user flows in this section
   - Edge cases that need clarification

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, proceed with implementation.

```

## Step 12: Generate README.md

Create `product-plan/README.md`:

```markdown
# [Product Name] — Design Handoff

This folder contains everything needed to implement [Product Name].

## What's Included

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt template for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section implementation

**Instructions:**
- `product-overview.md` — Product summary (provide with every implementation)
- `instructions/one-shot-instructions.md` — All milestones combined for full implementation
- `instructions/incremental/` — Milestone-by-milestone instructions (foundation, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, design tokens
- `data-model/` — Core entities and TypeScript types
- `shell/` — Application shell components
- `sections/` — All section specifications with types, sample data, mockups, and replicated designs

**About Replicated Designs:**

Some sections may include replicated design components in `sections/[section-id]/replicated/`. These are reference implementations that show how to apply the design system to the mockups. They are:

- Built using the design system tokens and components
- Props-based and portable
- Useful as starting points or examples
- Optional — you can use them as-is or build your own implementations

## How to Use This

### Option A: Incremental (Recommended)

Build your app milestone by milestone for better control:

1. Copy the `product-plan/` folder to your codebase
2. Start with Foundation (`instructions/incremental/01-foundation.md`) — includes design tokens, data model, routing, and application shell
3. For each section:
   - Open `prompts/section-prompt.md`
   - Fill in the section variables at the top (SECTION_NAME, SECTION_ID, NN)
   - Copy/paste into your coding agent
   - Answer questions and implement
4. Review and test after each milestone

### Option B: One-Shot

Build the entire app in one session:

1. Copy the `product-plan/` folder to your codebase
2. Open `prompts/one-shot-prompt.md`
3. Add any additional notes to the prompt
4. Copy/paste the prompt into your coding agent
5. Answer the agent's clarifying questions
6. Let the agent plan and implement everything


## Tips

- **Use the pre-written prompts** — They include important clarifying questions about auth and data modeling.
- **Add your own notes** — Customize prompts with project-specific context when needed.
- **Build on your designs** — Use completed sections as the starting point for future feature development.
- **Review thoroughly** — Check plans and implementations carefully to catch details and inconsistencies.
- **Fill in the gaps** — Backend business logic may need manual additions. Incremental implementation helps you identify these along the way.

---

*Generated by Design OS*
```

## Step 7.5: Copy PRD Spec (if exists)

If `.claude/prd_spec.md` exists, copy it to `product-plan/prd_spec.md` so implementation agents have the same source-of-truth tech stack and platform constraints.

## Step 10: Copy Screenshots

Copy any `.png` files from:
- `product/shell/` → `product-plan/shell/`

## Step 11: Create Zip File

After generating all the export files, create a zip archive of the product-plan folder:

```bash
# Remove any existing zip file
rm -f product-plan.zip

# Create the zip file
cd . && zip -r product-plan.zip product-plan/
```

This creates `product-plan.zip` in the project root, which will be available for download on the Export page.

## Step 12: Confirm Completion

Let the user know:

"I've created the complete export package at `product-plan/` and `product-plan.zip`.

**What's Included:**

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section

**Instructions:**
- `product-overview.md` — Product summary (always provide with instructions)
- `instructions/one-shot-instructions.md` — All milestones combined
- `instructions/incremental/` — [N] milestone instructions (foundation, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, tokens
- `data-model/` — Entity types and sample data
- `shell/` — Application shell components
- `sections/` — [N] section specifications with types, sample data, mockups, and replicated designs

**Download:**

Restart your dev server and visit the Export page to download `product-plan.zip`.

**How to Use:**

1. Copy `product-plan/` to your implementation codebase
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Add any additional notes, then copy/paste into your coding agent
4. Answer the agent's clarifying questions about auth, data modeling, etc.
5. Let the agent implement based on the instructions

The shell components are props-based and portable — they accept data and callbacks, letting your implementation agent handle routing, data fetching, and state management however fits your stack."

## Important Notes

- Always transform import paths when copying components
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important clarifying questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real APIs are built
- The export is self-contained — no dependencies on Design OS
- Shell components are portable — they work with any React setup
