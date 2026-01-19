# ExpenseManagementNewItem Blueprint

## Logic Tree
- [Fullscreen modal] Create expense
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
      - [Single selection] "None", "Common", "Dashed", "Gradient", "Holo", "Glow" (default "Common")
  - [Footer]
    - [Primary action] "Save expense"

## Implementation Blocks (The Roadmap)
- [Modal container]: Fullscreen container that can be dismissed.
- [Header row]: Title + close action.
- [Name row]: "Name" label, text input, and favorite toggle action.
- [Category row]: "Category" label and single-select control (opens sliding selector).
- [Appearance block]: Tabs ("Color", "Image") with a default color-selection view.
- [Stroke style block]: Single-selection grid of 6 stroke style options.
- [Footer action]: Primary submit button ("Save expense").

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Fullscreen modal container | `@/components/ui/sheet` | `Sheet open` + `SheetContent side="bottom"` (sliding modal). For Design OS preview: export `designOS.presentation = "modal"` so the preview hides its own overlay, and use `DialogClose` on the header close button to dismiss the preview. |
| Header title row | `@/components/ui/section-title` | `size="page"` with `trailing` for the close action |
| Close action | `@/components/ui/dialog` + `@/components/ui/button` | `DialogClose asChild` wrapping `Button variant="secondary" size="icon" shape="circle"` |
| Field label ("Name", "Category", "Appearance", "Stroke style") | `@/components/ui/label` | `Label` (no variants) |
| Name text input | `@/components/ui/input` | `variant="default"` (optional `fieldSize="default"`) |
| Favorite toggle action | `@/components/ui/button` | `variant="secondary" size="icon"` (toggles state) |
| Category dropdown | `@/components/ui/select-with-sliding` | `variant="sliding"` with `options`, `value`, `onValueChange` |
| Appearance tabs | `@/components/ui/tabs` | `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` |
| Color selection grid | `@/components/ui/color-selector` | `ColorSelector` + `ColorSelectorItem` (single selection) |
| Stroke style selection | `@/components/ui/radio-button-group` | `RadioButtonGroup` + `RadioButtonGroupItem variant="card" size="card"` |
| Primary action ("Save expense") | `@/components/ui/button` | `variant="default" size="lg"` |

