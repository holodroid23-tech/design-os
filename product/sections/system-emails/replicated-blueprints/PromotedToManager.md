# PromotedToManager Blueprint

## Logic Tree
- [Header]
  - Title: Promoted to manager
  - Body copy: You have been promoted to Manager. You can now access the Back Office dashboard remotely. Please set a password to enable this feature.
- [Primary action]
  - Button: Set password
  - Action: Open password setup flow (deep link), with web fallback
- [Footer]
  - Disclaimer: You received this email because your account status was updated on comPOSt POS.

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
| CTA trailing icon | `lucide-react` | `Lock` (as child of `Button`) |
| Footer disclaimer | `@/components/ui/email-template` | `footer` slot |
