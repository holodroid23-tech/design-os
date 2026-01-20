# ResetPin Blueprint

## Logic Tree
- [Header]
  - Title: Reset your PIN
  - Body copy: A PIN reset was requested for your account. To regain access to your POS terminal and secure your administrative settings, please follow the link below.
- [Primary action]
  - Button: Reset my PIN
  - Action: Open PIN reset flow (deep link), with web fallback
- [Below CTA note]
  - Note: If you didn't request this, you can safely ignore this email.
- [Footer]
  - Disclaimer: You received this email because a security action was initiated for your comPOSt account.

## Implementation Blocks (The Roadmap)
- Header: Title + supporting body copy.
- Primary action: Single primary CTA button.
- Below CTA note: Safety note below the button.
- Footer: Small disclaimer line.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Email template shell | `@/components/ui/email-template` | `dark` surface wrapper + slots via props/children |
| Title | `@/components/ui/section-title` | `size="page"`, `titleAs="h1"` |
| Body copy paragraph | Native `p` | (token classes via template) |
| Primary CTA button | `@/components/ui/button` | `variant="default"`, `size="lg"` |
| Below CTA note | `@/components/ui/email-template` | `belowCta` slot |
| Footer disclaimer | `@/components/ui/email-template` | `footer` slot |
