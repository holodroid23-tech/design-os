# Data Model

This is the shared vocabulary (“nouns”) for **ComPOSt**. It’s intentionally minimal and conceptual (not a database schema).

## Entities

### Organization
A parent account that can own one or more stores. Hidden in MVP, but exists to support future multi-store.

### Store
A single physical business location where sales happen. Stores have staff, devices, products, taxes, printers, and reporting.

### StaffUser
A person who uses the system (cashier/manager/admin/owner). Staff unlock PIN-gated areas and actions based on role.

### Role
A permission tier that controls what a staff user can see/do. In MVP this is a fixed set (for example: Cashier, Manager, Admin). “Owner” is treated as Admin. In the future, roles/permissions may become fully configurable (data-driven).

### Device
A phone/tablet running ComPOSt, associated with a store. A device can be in **Register (POS Driver)** mode or **Back Office (Observer)** mode.

### RegisterSession
The “active POS” lease for a store. In MVP, exactly one register session is active per store at a time and it grants order/payment writing capability. In the future, a store may support multiple active registers.

### ProductFolder
A single-level grouping container used to organize products for browsing.

### Product
A sellable item with pricing and optional tax behavior. Products can be pinned/favorited for quick access on the register.

### Order
An in-progress tab/cart created on the active register. Orders are renamed (for example, “Table 3”), edited, cleared, deleted, and eventually checked out.

### OrderLineItem
A row within an order representing a product (or ad-hoc custom item) with quantity and price-at-time-of-sale.

### Sale
A completed checkout result (a finalized record of what was sold), derived from an order at payment time.

### Payment
A record of how a sale was paid (cash, Tap to Pay card, or “recorded card payment” from an external terminal).

### Refund
A reversal record for a sale (full or partial, depending on product decisions), including who performed it and why.

### ExpenseFolder
A single-level grouping container used to organize expense templates.

### ExpenseTemplate
A reusable “expense type” configured in settings (for example, “Milk”, “Supplies”). Expenses use templates but don’t require fixed prices.

### ExpenseEntry
An expense logged by staff, typically “today-only” for fast entry, with optional note and amount chosen at time of entry.

### Tax
A store-defined rule used to calculate tax (supports multiple taxes and a default). Tax behavior may be tax-inclusive by default.

### Printer
A configured receipt printer target (typically Bluetooth) associated to a store and/or device for printing receipts.

### ReceiptConfig
Store-level receipt visual settings (paper size, logo, footer, QR, typography, included details).

### ReceiptPrintJob
A record of a print attempt (auto-print, reprint, test print), tied to a sale (or to a test action), including success/failure.

### PaymentProviderLink
An integration link/config record for card payments (for example, a Stripe account link / device verification state for Tap to Pay).

### AuditEvent
An append-only log entry for sensitive actions and historical edits (for example, expense edit/delete history, refunds, device takeover, settings changes).

## Relationships

- Organization has many Store
- Store belongs to Organization

- Store has many StaffUser
- StaffUser belongs to Store (MVP); in the future, a StaffUser may be assigned to multiple Store
- StaffUser has one Role

- Store has many Device
- Device belongs to Store

- Store has zero or one active RegisterSession
- RegisterSession belongs to Store
- RegisterSession is held by one Device (the active register)

- Store has many ProductFolder
- ProductFolder belongs to Store
- Store has many Product
- Product belongs to Store
- Product may belong to one ProductFolder

- Store has many Order
- Order belongs to Store
- Order is created/edited by StaffUser (through the active register)
- Order is associated with the active RegisterSession/Device that created it
- Order has many OrderLineItem
- OrderLineItem belongs to Order
- OrderLineItem references a Product or represents an ad-hoc custom item

- Sale belongs to Store
- Sale is created from one Order
- Sale is processed by one StaffUser
- Sale has one or more Payment
- Payment belongs to Sale
- Refund belongs to Sale
- Refund is performed by one StaffUser

- Store has many ExpenseFolder
- ExpenseFolder belongs to Store
- Store has many ExpenseTemplate
- ExpenseTemplate belongs to Store
- ExpenseTemplate may belong to one ExpenseFolder
- Store has many ExpenseEntry
- ExpenseEntry belongs to Store
- ExpenseEntry is created by one StaffUser
- ExpenseEntry may reference one ExpenseTemplate

- Store has many Tax
- Tax belongs to Store

- Store has many Printer
- Printer belongs to Store
- Store has one ReceiptConfig
- ReceiptConfig belongs to Store
- Store has many ReceiptPrintJob
- ReceiptPrintJob belongs to Store
- ReceiptPrintJob may belong to a Sale

- Store has zero or one PaymentProviderLink
- PaymentProviderLink belongs to Store

- Store has many AuditEvent
- AuditEvent belongs to Store
- AuditEvent is performed by one StaffUser (actor) and references a target entity (for example, ExpenseEntry, Refund, RegisterSession, Settings)
