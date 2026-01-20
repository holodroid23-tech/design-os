## 1. Multi-order management
- **What this is for**: Handling multiple in-progress orders at once (busy counter / tables / split attention).
- **Key concepts**:
  - **Order ID**: Auto-generated and unique (e.g., `#402`).
  - **Order name**: Optional human label (e.g., “Table 4”) to help staff recognize the right order quickly.
- **Rules**:
  - Staff can start new in-progress orders while keeping other orders open.
  - Switching between orders must keep each order’s cart, totals, and payment status separate.
  - Renaming an order changes the label only, not the underlying order ID.
  - Clearing/deleting an in-progress order removes its draft contents and any uncommitted payment attempts.
  - Clearing/deleting must never affect already-completed orders (historical records).

## 2. Inventory Browsing
- **What this is for**: Choosing items to sell and adding them to the current order.
- **What staff can do**:
  - Browse inventory (optionally organized into folders/categories)
  - Use a favorites subset for speed
  - Add an item to the active order (adding the same item again increases quantity)
  - Create a one-off “custom item” at the moment of sale (name, price, tax) and add it to the order
- **Rules**:
  - Each line item must store the tax selection that was applied (it can default from configuration, but must be saved on the line item for audit).

## 3. Cart Management
- **What this is for**: A clear set of rules for how the cart behaves.
- **Cart rules**:
  - Quantities can be increased/decreased for any line item.
  - Line items can be removed entirely.
  - Items can be quickly added to the active order from the inventory set.
- **Totals**:
  - Subtotal, tax total, and grand total are derived from the cart line items and their tax selections.
  - Totals update immediately when the cart changes.
- **Empty cart**:
  - An order with no items is still a valid in-progress draft; totals should be zero.

## 4. Payment Flows
- **What this is for**: Taking payment and turning an in-progress order into a completed record.
- **Supported payment methods**:
  - Cash
  - Card via tap-to-pay (provider-integrated)
  - Card via external terminal (processed outside the app)
- **Rules**:
  - Before finalizing, staff should explicitly confirm the amount and chosen method.
  - On success, the order becomes “completed” and stores:
    - Order ID + optional order name
    - Payment method
    - Amounts (subtotal/tax/total)
    - Provider transaction IDs (when available)
  - On failure, the order stays in-progress and we keep enough detail to understand what happened and retry:
    - The provider’s failure reason (when available)
    - Any attempt/partial identifiers
  - **External terminal**: the app is recording what happened, not processing it. We record the outcome and any reference IDs staff can provide, but we don’t assume the terminal processed anything automatically.
  - Staff can retry after failure without losing the cart.
  - After a successful payment, staff can start a fresh new order (with a new ID).

## Metadata & State
- **Order ID vs Table Name**: Orders should have an auto-generated ID (e.g., #402) but support a user-defined "Table Name" or "Order Name" for better identification in busy environments.
- **Failure Reasons**: If a payment fails, show the specific provider reason when available (e.g., "Card Declined by Bank"), not a generic message.
- **Success Metadata**: If a payment succeeds, show the transaction ID and the order name/label for quick verification.

## Navigation
- **Inventory scope changes**: Changing the current inventory subset (e.g., moving in/out of a folder/category) must not affect the active order.
- **Quick-add search**: Searching filters what can be selected, but never changes pricing/tax rules for the items themselves.
