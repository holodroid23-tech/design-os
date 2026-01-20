# ReportBug Blueprint

## Logic Tree

- **Bottom sliding modal**
  - **Header**
    - Drag handle indicator
    - Modal title: "Report bug"
    - Close action (dismiss modal)
  - **Issue details section**
    - Section label: "Issue details"
    - Multiline text input
      - Placeholder: "Describe the bug and how to reproduce it..."
  - **Attachments section**
    - Section label: "Attachments"
    - Attachment picker
      - Primary affordance text: "Upload screenshots"
      - Icon indicator (camera)
  - **Primary action (footer)**
    - Button label: "Report bug"

## Implementation Blocks (The Roadmap)

- **Block 1: Modal container** - Bottom sliding modal wrapper and content surface
- **Block 2: Header** - Drag handle, title, and close action
- **Block 3: Issue details** - Label + multiline issue description field
- **Block 4: Attachments** - Label + attachment picker (upload screenshots)
- **Block 5: Footer action** - Primary action button to submit the report

## Component Mapping (The Map)

| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal container | @/components/ui/bottom-sliding-modal | `BottomSlidingModal` + `BottomSlidingModalContent` |
| Modal header title | @/components/ui/section-title | `titleAs="h1"` |
| Modal close action | @/components/ui/bottom-sliding-modal | `BottomSlidingModalClose asChild` |
| Close button | @/components/ui/button | `variant="invisible"`, `size="icon"` |
| Close icon | @/components/ui/icon | `SystemIcon icon={XIcon}` |
| Section labels ("Issue details", "Attachments") | @/components/ui/label | (default) |
| Multiline issue description input | N/A | **Mismatch**: no `@/components/ui/textarea` (or equivalent multiline input) exists in `src/components/ui` |
| Attachment picker | @/components/ui/media-upload | **Partial**: supports camera + actions; to match mock’s single CTA text, use `chooseFromFilesLabel="Upload screenshots"` (component currently renders two actions) |
| Primary action button | @/components/ui/button | `size="lg"`, `className="w-full"` |

