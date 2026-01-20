# ResetPassword Blueprint

## Logic Tree
- [Header]
  - Title: Reset your password
  - Body copy: You requested a password reset. Hopefully, this wasn't the pig. Click the button below to secure your account and get back to the chaos.
- [Primary action]
  - Button: Reset password
  - Action: Open password reset flow (deep link), with web fallback
- [Below CTA note]
  - Note: If you didn't request this, just ignore it. Your account is still safe with us (mostly).
- [Footer]
  - Brand line: comPOSt POS

## Implementation Blocks (The Roadmap)
- Header: Title + supporting body copy.
- Primary action: Single primary CTA button.
- Below CTA note: Safety note below the button.
- Footer: Subtle brand line.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Email template shell | `@/components/ui/email-template` | `dark` surface wrapper + slots via props/children |
| Title | `@/components/ui/section-title` | `size="page"`, `titleAs="h1"` |
| Body copy paragraph | Native `p` | (token classes via template) |
| Primary CTA button | `@/components/ui/button` | `variant="default"`, `size="lg"` |
| CTA trailing icon | `lucide-react` | `ExternalLink` (as child of `Button`) |
| Below CTA note | `@/components/ui/email-template` | `belowCta` slot |
| Footer brand line | `@/components/ui/email-template` | `footer` slot |
