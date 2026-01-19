# ExpenseManagementNewFolder Blueprint

## Logic Tree
- [Modal: Fullscreen]
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
        - [Empty state] No image selection controls shown in this mock
    - [Field group] "Stroke style"
      - [Single selection group] Style
        - Option: "None"
        - Option: "Common"
        - Option: "Dashed"
      - [Single selection group] Finish
        - Option: "Gradient"
        - Option: "Holo"
        - Option: "Glow"
  - [Footer action]
    - [Primary action button] "Save folder"

## Implementation Blocks (The Roadmap)
- Header: Title + close action for a fullscreen modal.
- Name: Labeled text input for folder name.
- Default tax: Single selection group for preset tax percentages.
- Appearance: Tabs switching between "Color" and "Image"; Color tab contains a 12-option single selection grid.
- Stroke style: Two single selection groups (style + finish) with visual previews and labels.
- Footer action: Sticky/pinned primary action button to save.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Fullscreen modal container | `@/components/ui/dialog` | `Dialog` + `DialogContent` (fullscreen modal pattern via `className`, as used in `DialogsExamplesCard`) |
| Close action | `@/components/ui/dialog` | `DialogClose` (or `DialogContent` default close button via `showCloseButton`) |
| Section title | `@/components/ui/section-title` | `SectionTitle` (`titleAs="h1"` recommended; `leading` unused; close can be `trailing` if not using built-in close) |
| Field label | `@/components/ui/label` | `Label` |
| Name input | `@/components/ui/input` | `Input` (`fieldSize="lg"`; `placeholder="e.g. Hot Coffees"`) |
| Default tax selection group (container) | `@/components/ui/radio-button-group` | `RadioButtonGroup` |
| Default tax option buttons | `@/components/ui/radio-button-group` | `RadioButtonGroupItem` (`variant="surface"`, `size="lg"`) |
| Appearance tabs | `@/components/ui/tabs` | `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` |
| Color selection grid (container) | `@/components/ui/color-selector` | `ColorSelector` |
| Color selection item | `@/components/ui/color-selector` | `ColorSelectorItem` (`color` or `gradient` prop; values provided by parent radio group) |
| Stroke style group (container) | `@/components/ui/radio-button-group` | `RadioButtonGroup` (grid layout via `className`) |
| Stroke style option tile | `@/components/ui/radio-button-group` | `RadioButtonGroupItem` (`variant="surface"`; custom children layout for preview + label) |
| Footer primary action | `@/components/ui/button` | `Button` (`variant="default"`, `size="lg"`, `className="w-full"`) |

