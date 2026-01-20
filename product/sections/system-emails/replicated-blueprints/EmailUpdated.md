# EmailUpdated Blueprint

## Logic Tree
- [Header]
  - Title: Email updated
  - Body copy: Your login email for comPOSt has been updated to this address. Your password remains the same.
- [Primary action]
  - Button: Launch app
  - Action: Open app (deep link), with web fallback
- [Footer]
  - Disclaimer: You received this email because your account information was updated on comPOSt POS.

## Implementation Blocks (The Roadmap)
- Header: Title + supporting body copy.
- Primary action: Single primary CTA button.
- Footer: Small disclaimer line.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Email template shell | `@/components/ui/email-template` | `dark` surface wrapper + slots via props/children |
| Title | `@/components/ui/section-title` | `size="page"`, `titleAs="h1"` |
| Body copy paragraph | Native `p` | (token classes via template) |
| Primary CTA button | `@/components/ui/button` | `variant="default"`, `size="lg"` |
| CTA trailing icon | `lucide-react` | `ExternalLink` (as child of `Button`) |
| Footer disclaimer | `@/components/ui/email-template` | `footer` slot |
