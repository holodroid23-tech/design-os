# PaymentSettings Blueprint

## Logic Tree

- **Header Section**
  - Back navigation trigger
  - Page title: "Payment"

- **Payment Methods Block**
  - Section header: "Payment methods"
  - Payment method toggles group:
    - Method row:
      - Leading icon
      - Label: "Cash"
      - Toggle switch (enabled state)
    - Method row:
      - Leading icon
      - Label: "External terminal"
      - Toggle switch (disabled state)
    - Method row:
      - Leading icon
      - Label: "Tap to pay"
      - Toggle switch (enabled state)

- **Terminal Configuration Block**
  - Section header: "Terminal configuration"
  - Helper text: "All following settings must be enabled to use Tap to Pay."
  - Progress indicator:
    - Label: "0/4 steps completed"
    - Segmented progress showing 4 steps
  - Requirements list:
    - Requirement row:
      - Status icon (context: incomplete requirement)
      - Label: "GPS (System)"
      - Action button: "Turn on GPS"
    - Requirement row:
      - Status icon (context: incomplete requirement)
      - Label: "GPS (App access)"
      - Action button: "Grant permission"
    - Requirement row:
      - Status icon (context: incomplete requirement)
      - Label: "Device verification"
      - Status message: "Device integrity failed: rooted device detected"
      - Action button: "Verify"
    - Requirement row:
      - Status icon (context: incomplete requirement)
      - Label: "Account link"
      - Action button: "Configure"

## Implementation Blocks (The Roadmap)

- **Block 1: Header** - Back navigation and page title
- **Block 2: Payment methods** - Three atomic setting rows with toggle switches inside a grouped container
- **Block 3: Terminal configuration (intro)** - Section title, explanatory text, and step progress indicator
- **Block 4: Terminal configuration (requirements)** - Four actionable requirement rows with a leading status icon and trailing action button

## Layout Patterns (The Vibe)

- **Page Container**: Full height layout with vertical stack
- **Header Bar**: Back button + page title
- **Section Stack**: Each section starts with a section header and content below
- **Inset Group**: Grouped list for atomic toggles (payment methods)
- **Card Rows**: Standalone actionable rows for each requirement

## Component Mapping (The Map)

| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Back navigation trigger | @/components/ui/button | variant="invisible", size="icon" |
| Page title | @/components/ui/section-title | size="page", titleAs="h1" |
| Section headers | @/components/ui/section-title | size="section" |
| Payment methods group container | @/components/settings/settings-group | (default) |
| Atomic setting row | @/components/settings/settings-item | (default) |
| Row leading icon | @/components/ui/icon | Component: IconTile, variant="plain", size="small", tone="neutral" |
| Row title | @/components/settings/settings-item | Component: SettingsItemTitle |
| Row description | @/components/settings/settings-item | Component: SettingsItemDescription, tone="danger" |
| Toggle switch | @/components/ui/switch | (default) |
| Step progress | @/components/ui/stepper | value={0}, max={4}, variant="destructive", mode="segmented", showLabel |
| Requirement row container | @/components/ui/card | (default) |
| Requirement action | @/components/ui/button | variant="outline", size="sm" |
| Icon (back) | lucide-react#ChevronLeft | (default) |
| Icon (cash/money) | lucide-react#Banknote | (default) |
| Icon (external terminal) | lucide-react#Receipt | (default) |
| Icon (tap to pay) | lucide-react#Smartphone | (default) |
| Icon (incomplete requirement status) | lucide-react#AlertTriangle | (default) |
