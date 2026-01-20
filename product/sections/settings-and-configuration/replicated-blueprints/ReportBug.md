# ReportBug Blueprint

## Logic Tree
- [Bottom sliding modal] Report bug
  - [Header]
    - [Drag handle indicator] Non-interactive indicator at the top of the modal
    - [Title row]
      - Title: "Report bug"
      - Close control: Dismiss the modal
  - [Body]
    - [Form section]
      - [Field group] Issue details
        - Multiline text input
          - Placeholder: "Describe the bug and how to reproduce it..."
      - [Field group] Attachments
        - [Attachment upload action]
          - Label: "Upload screenshots"
          - Leading icon: Camera
        - [Optional] Attachment preview list (0..n)
  - [Footer]
    - [Primary action] "Report bug"

## Implementation Blocks (The Roadmap)
- [Block 1: Modal scaffold]: Bottom sliding modal root + content scaffold with header/body/footer slots.
- [Block 2: Header controls]: Drag handle indicator, title ("Report bug"), and close control that dismisses the modal.
- [Block 3: Issue details input]: Field label ("Issue details") + multiline textarea with placeholder guidance.
- [Block 4: Attachments]: Field label ("Attachments") + single action to upload screenshots (empty state), plus optional selected attachments preview list.
- [Block 5: Footer action]: Full-width primary submit action ("Report bug").

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal (root) | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal` (Radix `Dialog` props) |
| Modal content scaffold | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModalContent header={...} footer={...} scaffoldProps={...}` |
| Modal title row | `@/components/ui/section-title` | `SectionTitle size="section" trailing={...}` |
| Close control (dismiss) | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` | `BottomSlidingModalClose` wrapping `Button variant="invisible" size="icon" shape="circle"` |
| Drag handle indicator | (primitive) | `div` (non-interactive) |
| Field label: "Issue details" | `@/components/ui/label` | `Label` |
| Multiline input | `@/components/ui/textarea` | `Textarea variant="default" placeholder="Describe the bug and how to reproduce it..."` |
| Field label: "Attachments" | `@/components/ui/label` | `Label` |
| Upload screenshots action | `@/components/ui/button` | `Button variant="ghost"` (click triggers attachment picker) |
| Primary action: "Report bug" | `@/components/ui/button` | `Button variant="default" size="lg"` (layout: full width) |

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

