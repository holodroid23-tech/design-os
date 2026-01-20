# ExpenseManagementNewFolder Blueprint

## Logic Tree
- [Bottom sliding modal] New folder
  - [Header row]
    - [Section title] "New folder"
    - [Close action] Close
  - [Form content]
    - [Field group] "Name"
      - [Text input] Placeholder: "e.g. Hot Coffees"
    - [Field group] "Default tax"
      - [Single selection group]
        - Option: "0%"
        - Option: "10%"
        - Option: "21%"
    - [Field group] "Appearance"
      - [Mode tabs]
        - Tab: "Color"
        - Tab: "Image"
      - [Tab panel: Color]
        - [Single selection grid] Color choice (12 options)
      - [Tab panel: Image]
        - [Media upload] Choose from files / Take photo
    - [Field group] "Stroke style"
      - [Single selection group] Style
        - Option: "None"
        - Option: "Common"
        - Option: "Dashed"
  - [Footer action]
    - [Primary action button] "Save folder"

## Implementation Blocks (The Roadmap)
- Header: Title + close action for a bottom sliding modal.
- Name: Labeled text input for folder name.
- Default tax: Single selection group for preset tax percentages.
- Appearance: Tabs switching between "Color" and "Image"; Color tab contains a 12-option single selection grid.
- Stroke style: Single selection group (None/Common/Dashed) with preview tiles.
- Footer action: Primary action button to save.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal container | `@/components/ui/bottom-sliding-modal` | `BottomSlidingModal defaultOpen` + `BottomSlidingModalContent` |
| Close action | `@/components/ui/bottom-sliding-modal` + `@/components/ui/button` + `@/components/ui/icon` | `BottomSlidingModalClose asChild` wrapping `Button variant="invisible" size="icon"` with `SystemIcon icon={XIcon}` |
| Section title | `@/components/ui/section-title` | `SectionTitle` (`titleAs="h1"`; close in `trailing`) |
| Field label | `@/components/ui/label` | `Label` |
| Name input | `@/components/ui/input` | `Input` (`placeholder="e.g. Hot Coffees"`) |
| Default tax selection group (container) | `@/components/ui/radio-button-group` | `RadioButtonGroup` |
| Default tax option buttons | `@/components/ui/radio-button-group` | `RadioButtonGroupItem` (`variant="surface"`, `size="lg"`) |
| Appearance tabs | `@/components/ui/tabs` | `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` |
| Color selection grid (container) | `@/components/ui/color-selector` | `ColorSelector` |
| Color selection item | `@/components/ui/color-selector` | `ColorSelectorItem` (`color` or `gradient` prop; values provided by parent radio group) |
| Image tab content | `@/components/ui/media-upload` | `MediaUpload` |
| Stroke style group (container) | `@/components/ui/radio-button-group` | `RadioButtonGroup` (grid layout via `className`) |
| Stroke style option tile | `@/components/ui/radio-button-group` | `RadioButtonGroupItem` (`variant="default"`; custom children layout for preview + label) |
| Footer primary action | `@/components/ui/button` | `Button` (`variant="default"`, `size="lg"`, `className="w-full"`) |

