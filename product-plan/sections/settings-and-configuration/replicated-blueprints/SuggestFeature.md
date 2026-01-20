# SuggestFeature Blueprint

## Logic Tree
- [Modal: Suggest feature]
  - [Header]
    - Drag handle (non-interactive)
    - Title: "Suggest feature"
    - Close button (dismiss modal)
  - [Body]
    - [Section: Feature details]
      - Label: "Feature details"
      - Multiline text input
      - Placeholder: "Describe the feature and why it would help..."
    - [Section: Attachments]
      - Label: "Attachments"
      - Upload action area (opens attachment picker)
        - Leading icon: camera
        - Text: "Upload screenshots"
  - [Footer]
    - Primary action button: "Send suggestion"

## Implementation Blocks (The Roadmap)
- [Block 1: Modal container]: Bottom sliding modal with scaffolded header/body/footer.
- [Block 2: Header]: Drag handle, title, and close action.
- [Block 3: Body sections]: Feature details textarea + attachments upload action area.
- [Block 4: Primary action]: Sticky full-width submit button.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Modal container | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal` + `BottomSlidingModalContent` |
| Header title | `@/components/ui/section-title` | `titleAs="h1"` + `trailing` close control |
| Close control | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModalClose asChild` wrapping `Button` |
| Close button | `@/components/ui/button` | `variant="ghost"` + `size="icon-lg"` + `shape="circle"` |
| Section labels | `@/components/ui/label` | `Label` |
| Feature details input | `@/components/ui/textarea` | `placeholder="Describe the feature and why it would help..."` |
| Attachments action area (click target) | Primitive | `button` (container element) |
| Attachments icon tile | `@/components/atoms/icon` | `IconTile` (e.g. `icon={Camera}` + `size="medium"`) |
| Primary action button | `@/components/ui/button` | `size="lg"` |

