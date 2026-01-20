# SuggestFeature Blueprint

## Logic Tree
- [Modal: Suggest feature]
  - [Header]
    - Title: "Suggest feature"
    - Close button (dismiss modal)
  - [Form]
    - [Field: Feature title]
      - Text input
      - Placeholder: "Short, descriptive name"
    - [Field: Feature description]
      - Multiline text input
      - Placeholder: "What should this feature do?"
    - [Field: Upload screenshot (optional)]
      - Upload action area (choose from files / take photo)
  - [Footer]
    - Primary action button: "Send suggestion"

## Implementation Blocks (The Roadmap)
- [Block 1: Modal container]: Bottom sliding modal with scaffolded header/body/footer.
- [Block 2: Header]: Title + close action.
- [Block 3: Form fields]: Title input, description textarea, media upload.
- [Block 4: Primary action]: Sticky full-width submit button.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Modal container | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal` + `BottomSlidingModalContent` |
| Header title | `@/components/ui/section-title` | `titleAs="h1"` + `trailing` close control |
| Close control | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModalClose asChild` wrapping `Button` |
| Primary action button | `@/components/ui/button` | `size="lg"` + `className="w-full"` |
| Field labels | `@/components/ui/label` | `Label` |
| Feature title input | `@/components/ui/input` | `placeholder="Short, descriptive name"` |
| Feature description input | `@/components/ui/textarea` | `placeholder="What should this feature do?"` |
| Upload screenshot area | `@/components/ui/media-upload` | `chooseFromFilesLabel` / `takePhotoLabel` |

