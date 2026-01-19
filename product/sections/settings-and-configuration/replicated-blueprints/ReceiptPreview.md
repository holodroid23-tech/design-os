# ReceiptPreview Blueprint

## Logic Tree
- [Header / App bar]
  - [Back navigation]: Icon button that returns to previous screen
  - [Title]: "Receipt settings"
- [View mode selection]
  - [Single selection tabs]
    - Tab: "Design"
    - Tab: "Preview" (selected)
- [Primary action]
  - Button: "Test print"
- [Receipt preview]
  - [Receipt document preview container]
    - [Brand block]
      - Brand mark (icon)
      - Brand name: "Compost"
      - Address lines
        - "123 Espresso Lane"
        - "Seattle, WA 98101"
        - "Tel: (206) 555-0123"
    - [Order metadata]
      - "Receipt #": "ORD-2023-892"
      - "Date": "Oct 24, 2023 09:41 AM"
      - "Cashier": "Sarah J."
    - [Line items]
      - "Latte (Large)" — "$6.50"
      - "Croissant" — "$4.00"
      - "Avocado Toast" — "$12.00"
    - [Totals]
      - "Subtotal" — "$22.50"
      - "Tax (8.0%)" — "$1.80"
      - "Total" — "$24.30"
    - [Footer]
      - Message: "Thank you for visiting!"
      - QR code block (scannable code placeholder)
    - [Document end treatment]: Decorative edge indicating receipt tear-off

## Implementation Blocks (The Roadmap)
- [Block 1: Header / app bar]: Back navigation action and centered page title.
- [Block 2: Mode switcher]: Two-option single selection control to switch between "Design" and "Preview".
- [Block 3: Primary action]: One primary action button labeled "Test print".
- [Block 4: Receipt preview container]: A centered document preview region sized for mobile, containing the receipt content.
- [Block 5: Receipt document content]: Brand block, metadata rows, line items, totals, footer message, and QR placeholder.

## Component Mapping (The Map)
| Blueprint Element | Component Path | Variant/Prop Target |
|---|---|---|
| Header title row | `@/components/ui/section-title` | `size="page"`, `leading=<BackButton />` |
| Back navigation action | `@/components/ui/button` | `variant="invisible"`, `size="icon"`, `aria-label="Back"` |
| Mode switcher (tabs) | `@/components/ui/tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| Primary action button | `@/components/ui/button` | `variant="default"`, `size="lg"`, optional leading icon |
| Receipt preview layout | (native) | `div` layout and text elements (no new UI components required) |
| QR placeholder | `lucide-react` | `QrCode` icon (placeholder) |

