# Shape Section

You are helping the user define the specification for a section of their product by analyzing provided wireframes/screenshots and cross-referencing with the PRD specification. This process extracts detailed functionality from visual designs.

## Step 1: Check Prerequisites

First, verify that `/product/product-roadmap.md` exists. If it doesn't:

"I don't see a product roadmap defined yet. Please run `/product-roadmap` first to define your product sections, then come back to shape individual sections."

Stop here if the roadmap doesn't exist.

## Step 2: Identify the Target Section

Read `/product/product-roadmap.md` to get the list of available sections.

If there's only one section, auto-select it. If there are multiple sections, use the AskUserQuestion tool to ask which section the user wants to work on:

"Which section would you like to define the specification for?"

Present the available sections as options.

## Step 3: Request Screenshots/Wireframes

Once the section is identified, ask the user to provide their wireframes/screenshots:

"I need to analyze your wireframes or screenshots for **[Section Title]** to create a comprehensive specification.

Please share your design files - you can upload images directly or provide links to Figma/Miro/etc. Make sure to include all screens/views for this section.

Once you provide the screenshots, I'll analyze them against the PRD requirements and extract all the functionality, UI details, and interactions."

## Step 4: Analyze Screenshots and PRD

Once the user provides screenshots/wireframes:

1. Read the PRD specification from `.claude/prd_spec.md` to understand the overall product context and requirements
2. Analyze each screenshot/wireframe systematically, extracting:
   - All visible UI components and their states
   - User interactions and navigation flows
   - Data display requirements
   - Form inputs and validation patterns
   - Error states and edge cases shown
   - Responsive/adaptive behaviors
   - Any annotations or notes on the designs

3. Cross-reference with PRD to ensure consistency and identify any gaps or conflicts

## Step 5: Ask About Shell Configuration

If a shell design has been created for this project (check if `/src/shell/components/AppShell.tsx` exists), ask the user about shell usage:

"Should this section's screen designs be displayed **inside the app shell** (with navigation header), or should they be **standalone pages** (without the shell)?

Most sections use the app shell, but some pages like public-facing views, landing pages, or embedded widgets should be standalone."

Use AskUserQuestion with options:
- "Inside app shell" - The default for most in-app sections
- "Standalone (no shell)" - For public pages, landing pages, or embeds

If no shell design exists yet, skip this question and default to using the shell.

## Step 6: Present Draft and Refine

Based on the screenshot analysis and PRD cross-reference, present a detailed specification in the format shown in the existing `product/sections/register-and-sales/spec.md` example:

"Based on my analysis of your wireframes and the PRD requirements, here's the comprehensive specification for **[Section Title]**:

## [Feature Area 1]
- **[UI Element]**: [Detailed description of component, states, interactions]
- **[UI Element]**: [Detailed description...]

## [Feature Area 2]
- **[UI Element]**: [Detailed description...]

## UI & Interaction Details
- **[Specific Detail]**: [Description of behavior, styling, or interaction]
- **[Specific Detail]**: [Description...]

## [Additional sections as needed]

**Display:** [Inside app shell / Standalone]

Does this specification accurately capture all the functionality shown in your wireframes? Would you like me to adjust any details or add anything that might be missing from the screenshots?"

Iterate until the user is satisfied. Only include features that are clearly visible in the wireframes or directly supported by the PRD.

## Step 7: Create the Spec File

Once the user approves, create the file at `product/sections/[section-id]/spec.md` using the detailed functional breakdown format from the example in `product/sections/register-and-sales/spec.md`. Structure it as numbered feature areas with detailed UI and interaction descriptions.

The file should follow this pattern:
- **Feature Areas** as numbered sections (## 1. Feature Name)
- **UI Components** described with their behaviors, states, and interactions
- **UI & Interaction Details** section for cross-cutting concerns
- **Metadata & State** section for data handling details
- **Navigation** section for flow and routing details
- **Configuration** section at the end with shell setting

**Important:**
- Set `shell: true` if the section should display inside the app shell (this is the default)
- Set `shell: false` if the section should display as a standalone page without the shell

The section-id is the slug version of the section title (lowercase, hyphens instead of spaces).

## Step 8: Confirm and Next Steps

Let the user know:

"I've created the specification at `product/sections/[section-id]/spec.md`.

You can review the spec on the section page. When you're ready, run `/sample-data` to create sample data for this section."

## Important Notes

- Be methodical in analyzing screenshots - examine each screen/view systematically
- Cross-reference everything with the PRD specification to ensure consistency
- Extract detailed UI behaviors, interactions, and states from the visual designs
- Focus on what the wireframes explicitly show - don't add assumptions or features not visible
- Use the detailed functional breakdown format like the register-and-sales example
- Ask clarifying questions if wireframes are unclear or missing key states
- Only discuss UI/UX details - backend implementation is handled separately
