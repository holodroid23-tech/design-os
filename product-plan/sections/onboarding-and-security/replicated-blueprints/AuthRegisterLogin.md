# AuthRegisterLogin Blueprint

## Logic Tree
- [Screen] Authentication (two-state)
  - [Segmented switch]
    - Tab: "Register"
    - Tab: "Login"
  - [Register form] (shown when "Register" selected)
    - Field label: "Full name"
      - Input placeholder: "John Doe"
    - Field label: "Email address"
      - Input placeholder: "name@example.com"
    - Field label: "Store name"
      - Input placeholder: "My coffee shop"
    - Field label: "Password"
      - Password input (single line)
    - [Primary action]
      - Button: "Create store"
  - [Login form] (shown when "Login" selected)
    - Field label: "Email"
      - Input placeholder: "name@example.com"
    - Field label: "Password"
      - Password input (single line)
    - [Primary action]
      - Button: "Log in"
    - [Secondary action]
      - Link: "Forgot password?"

## Implementation Blocks (The Roadmap)
- [Block 1] Screen shell + container: mobile surface with a centered auth card container.
- [Block 2] Segmented switch: 2-state switch between Register and Login.
- [Block 3] Register form: four labeled fields + primary CTA.
- [Block 4] Login form: two labeled fields + primary CTA + forgot password link.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Segmented switch | `@/components/ui/tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| Field labels | `@/components/ui/label` | `htmlFor` matching each input `id` |
| Text inputs | `@/components/ui/input` | `type="email"` / `type="password"` where applicable |
| Primary actions | `@/components/ui/button` | `variant="default"`, `size="lg"` |
| Secondary link | `@/components/ui/button` | `variant="link"` |

## Notes
- This screen intentionally merges two mock states (`registration.png` and `login.png`) into one component with a tab switch.
- In Design OS previews, these mocks are mapped to this component via `mockComponentAliases` in `src/lib/section-loader.ts`.

