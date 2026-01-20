# CheckEmailPasswordResetInstructions Blueprint

## Logic Tree
- [Screen]
  - [Dismiss control]
    - Action: "Close"
  - [Primary message]
    - [Status icon] Icon: lock
    - Title: "Check your email"
    - Description: "We have sent password reset instructions to your email address."
  - [Primary action]
    - Button: "Open email app"
  - [Helper + secondary actions]
    - Text: "Didn't receive it? Check your spam, or"
    - Inline actions: "Resend" / "Change email"

## Implementation Blocks (The Roadmap)
- [Block 1] Dismiss: a single close action that exits this screen.
- [Block 2] Primary message: status icon + title + supporting description.
- [Block 3] Primary action: prominent button to open the email app.
- [Block 4] Secondary assistance: helper sentence + inline resend/change email actions.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Close action (top-right) | `@/components/ui/button` | `variant="invisible"`, `size="icon"` (child icon: `X` from `lucide-react`) |
| Status icon (email) | `@/components/ui/icon` | `IconTile` with `icon={Mail}` (from `lucide-react`), `size="large"` |
| Primary action ("Open email app") | `@/components/ui/button` | `variant="default"`, `size="lg"` |
| Secondary actions ("Resend", "Change email") | `@/components/ui/button` | Two inline `Button` actions using `variant="link"` (size as-needed) |
