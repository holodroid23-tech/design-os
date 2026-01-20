# UsersAddAdminFocus Blueprint

## Logic Tree
- [Bottom sliding modal]
  - [Header]
    - [Title] "Add new user"
    - [Action] Close modal
  - [Body]
    - [Row]
      - [Label] "User role"
      - [Action] "Learn more"
    - [Single selection group] User role
      - [Option] "Admin" (selected)
      - [Option] "Manager"
      - [Option] "Cashier"
    - [Form field]
      - [Label] "Full name"
      - [Text input] placeholder: "e.g. Jane Doe"
    - [Conditional form field] When role is "Cashier":
      - [Label] "PIN"
      - [Read-only PIN input] example value: "5829"
      - [Action] Copy PIN
      - [Helper note] "Note down this PIN. The cashier will need it to access the system. They can change it later in their profile."
    - [Conditional form field] When role is "Admin" or "Manager":
      - [Label] "Email"
      - [Email input] placeholder: "jane@example.com"
  - [Footer]
    - [Primary action] Label depends on selected role:
      - Admin: "Add administrator"
      - Manager: "Add manager"
      - Cashier: "Add cashier"

## Implementation Blocks (The Roadmap)
- [Block 1 — Modal shell]: Bottom sliding modal container with header/body/footer slots.
- [Block 2 — Header]: Title row for the modal.
- [Block 3 — Role selection]: "User role" label row with "Learn more" action and a single-select role control.
- [Block 4 — Form fields]: Full name + conditional field (email for admin/manager, PIN + helper note for cashier).
- [Block 5 — Footer CTA]: Primary submit action (label changes based on selected role).

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal | @/components/ui/bottom-sliding-modal | `BottomSlidingModal`, `BottomSlidingModalContent` (use `header` + `footer` slots) |
| Title | @/components/ui/section-title | `titleAs="h2"` with children `"Add new user"` |
| Close action | @/components/ui/bottom-sliding-modal | `BottomSlidingModalClose` (wrap a `Button variant="invisible" size="icon"` containing `SystemIcon`) |
| "Learn more" action | @/components/ui/button | `variant="link"` `size="sm"` |
| Single selection group | @/components/ui/radio-button-group | `RadioButtonGroup` |
| Role options | @/components/ui/radio-button-group | `RadioButtonGroupItem` `variant="default"` `size="lg"` |
| Field label | @/components/ui/label | `Label` |
| Full name input | @/components/ui/input | `Input type="text"` `placeholder="e.g. Jane Doe"` |
| Email input (admin/manager) | @/components/ui/input | `Input type="email"` `placeholder="jane@example.com"` |
| PIN input (cashier) | @/components/ui/input | `Input type="text"` `readOnly` (PIN shown for copying) |
| Copy PIN action (cashier) | @/components/ui/button | `variant="ghost"` `size="icon"` (use `SystemIcon` with a copy icon) |
| PIN helper note (cashier) | @/components/settings/settings-item | `SettingsItemDescription` |
| Primary action | @/components/ui/button | `variant="default"` `size="lg"` (typically `className="w-full"`) |

