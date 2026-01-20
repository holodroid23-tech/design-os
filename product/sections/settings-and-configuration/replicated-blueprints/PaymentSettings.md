# PaymentSettings Blueprint

## States (for export + implementation)

This screen is intended to be **one screen with multiple UI states** (see mocks):

- **State A — Incomplete setup** (`payment-settings.png`)
  - Stepper label: **"0/4 steps completed"** (red)
  - Requirement rows show **incomplete** status + clear next actions:
    - GPS (System) → "Turn on GPS"
    - GPS (App access) → "Grant permission"
    - Device verification → shows failure message + "Verify"
    - Account link → "Configure"

- **State B — Completed setup** (`payment-settings-2.png`)
  - Stepper label: **"4/4 steps completed"** (green)
  - Requirement rows show **complete** status.
  - Some rows still expose configuration actions:
    - GPS (App access) can show **"Configure"**
    - Account link shows account summary + **"Disconnect"** + **"Configure"**

### Interaction idea (your plan)

- Tapping a requirement "card" can **toggle** its state between incomplete ↔ complete for preview/demo.
- For real app code later, this should be driven by **props/state** (permissions, device checks, account link status), not hardcoded.

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
    - Label: "0/4 steps completed" (State A) / "4/4 steps completed" (State B)
    - Segmented progress showing 4 steps
  - Requirements list:
    - Requirement row:
      - Status icon (context: incomplete OR complete requirement depending on state)
      - Label: "GPS (System)"
      - Action button: "Turn on GPS" (State A) / none (State B)
    - Requirement row:
      - Status icon (context: incomplete OR complete requirement depending on state)
      - Label: "GPS (App access)"
      - Action button: "Grant permission" (State A) / "Configure" (State B)
    - Requirement row:
      - Status icon (context: incomplete OR complete requirement depending on state)
      - Label: "Device verification"
      - Status message: "Device integrity failed: rooted device detected" (State A only)
      - Action button: "Verify" (State A) / none (State B)
    - Requirement row:
      - Status icon (context: incomplete OR complete requirement depending on state)
      - Label: "Account link"
      - Action button: "Configure" (State A) / "Disconnect" + "Configure" (State B)

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
| Requirement action | @/components/ui/button | variant="ghost", size="sm" |
| Icon (back) | lucide-react#ChevronLeft | (default) |
| Icon (cash/money) | lucide-react#Banknote | (default) |
| Icon (external terminal) | lucide-react#Receipt | (default) |
| Icon (tap to pay) | lucide-react#Smartphone | (default) |
| Icon (incomplete requirement status) | lucide-react#AlertTriangle | (default) |
