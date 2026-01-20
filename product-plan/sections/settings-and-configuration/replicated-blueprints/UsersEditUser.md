# UsersEditUser Blueprint

## Logic Tree
- [Bottom sliding modal]
  - [Header]
    - [Title] "Edit user"
    - [Action] Close modal
  - [Body]
    - [Row]
      - [Label] "User role"
      - [Action] "Learn more"
    - [Single selection group] User role
      - [Option] "Admin"
      - [Option] "Manager"
      - [Option] "Cashier"
      - [Constraint] When "Cashier" is selected, "Admin" and "Manager" options are disabled
    - [Form field]
      - [Label] "Full name"
      - [Text input] example value: "Sarah Jenkins"
    - [Conditional form field] When role is "Cashier":
      - [Label] "PIN"
      - [Masked PIN input] example value: "••••"
      - [Action] "Regenerate"
      - [Helper note] "For security reasons, we cannot reveal the current PIN. You can regenerate it to create a new one."
    - [Conditional form field] When role is "Admin" or "Manager":
      - [Label] "Email"
      - [Email input] example value: "sarah@compost.com"
  - [Footer]
    - [Secondary destructive action] "Remove user"
    - [Primary action] "Save changes"

## Implementation Blocks (The Roadmap)
- [Block 1 — Modal shell]: Bottom sliding modal container with header/body/footer slots.
- [Block 2 — Header]: Title row + close action.
- [Block 3 — Role selection]: "User role" label row with "Learn more" action and a single-select role control.
- [Block 4 — Form fields]: Full name + conditional field (email for admin/manager, PIN + helper note for cashier).
- [Block 5 — Footer actions]: Remove user + save changes actions.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Bottom sliding modal | @/components/ui/bottom-sliding-modal | `BottomSlidingModal`, `BottomSlidingModalContent` (use `header` + `footer` slots) |
| Title | @/components/ui/section-title | `titleAs="h2"` with children `"Edit user"` |
| Close action | @/components/ui/bottom-sliding-modal | `BottomSlidingModalClose` (wrap a `Button variant="invisible" size="icon"` containing `SystemIcon`) |
| "Learn more" action | @/components/ui/button | `variant="link"` `size="sm"` |
| Single selection group | @/components/ui/radio-button-group | `RadioButtonGroup` |
| Role options | @/components/ui/radio-button-group | `RadioButtonGroupItem` `variant="default"` `size="lg"` (use `disabled` for the cashier constraint) |
| Field label | @/components/ui/label | `Label` |
| Full name input | @/components/ui/input | `Input type="text"` |
| Email input (admin/manager) | @/components/ui/input | `Input type="email"` |
| Masked PIN input (cashier) | @/components/ui/input | `Input type="password"` `readOnly` |
| Regenerate action (cashier) | @/components/ui/button | `variant="ghost"` |
| PIN helper note (cashier) | @/components/settings/settings-item | `SettingsItemDescription` |
| Remove user action | @/components/ui/button | `variant="destructive"` |
| Save changes action | @/components/ui/button | `variant="default"` |

