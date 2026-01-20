# ExpenseManagementNewItem Blueprint

## Logic Tree
- [Bottom sliding modal] Create expense
  - [Header]
    - [Title] "New expense"
    - [Dismiss action] Close
  - [Form]
    - [Field row] Name + favorite toggle
      - [Label] "Name"
      - [Text input] Placeholder: "e.g. Rent Payment"
      - [Toggle action] Favorite
    - [Field] Category
      - [Label] "Category"
      - [Single select] Current value: "Operations"
    - [Section] Appearance
      - [Tab selection] "Color" | "Image" (single selection; default "Color")
      - [Color selection] Single selection (12 options)
    - [Section] Stroke style
      - [Single selection] "None", "Common", "Dashed" (default "Common")
  - [Footer]
    - [Primary action] "Save expense"

## Implementation Blocks (The Roadmap)
- [Modal container]: Fullscreen container that can be dismissed.
- [Header row]: Title + close action.
- [Name row]: "Name" label, text input, and favorite toggle action.
- [Category row]: "Category" label and single-select control (opens sliding selector).
- [Appearance block]: Tabs ("Color", "Image") with a default color-selection view.
- [Stroke style block]: Single-selection grid of 3 stroke style options.
- [Footer action]: Primary submit button ("Save expense").

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal container | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal defaultOpen` + `BottomSlidingModalContent` |
| Header title row | `@/components/ui/section-title` | `titleAs="h1"` with `trailing` for the close action |
| Close action | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` + `@/components/ui/icon` | `BottomSlidingModalClose asChild` wrapping `Button variant="invisible" size="icon"` with `SystemIcon icon={XIcon}` |
| Field label ("Name", "Category", "Appearance", "Stroke style") | `@/components/ui/label` | `Label` (no variants) |
| Name text input | `@/components/ui/input` | `variant="default"` |
| Favorite toggle action | `@/components/ui/button` | `variant="secondary" size="icon"` (toggles state) |
| Category dropdown | `@/components/ui/select-with-sliding` | `variant="sliding"` with `options`, `value`, `onValueChange` |
| Appearance tabs | `@/components/ui/tabs` | `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` |
| Color selection grid | `@/components/ui/color-selector` | `ColorSelector` + `ColorSelectorItem` (single selection) |
| Stroke style selection | `@/components/ui/stroke-style-selector` | `StrokeStyleSelector value/onValueChange` |
| Primary action ("Save expense") | `@/components/ui/button` | `variant="default" size="lg"` |

