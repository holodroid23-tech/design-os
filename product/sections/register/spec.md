# Section Specification: Register

The Register is the primary "Driver" mode of the ComPOSt system. It allows users to manage multiple concurrent orders, browse inventory, and process payments.

## Core Functionality

### 1. Multi-Order Management (Tabs)
- **Tab Bar**: Top-mounted navigation for switching between orders.
- **Dynamic Tabs**: `+` button to create new tabs. Tabs show truncated order name and item count.
- **Tab Actions**: Long-press or menu button to rename (e.g., Table 4), clear, or delete a tab.

### 2. Inventory Browsing
- **Left Sidebar**: Quick access to "Favorites" and "Inventory" (Category folders).
- **Favorites Grid**: 3x3 grid of pinned items for rapid entry.
- **Category Folders**: Grid/List view of items within folders.
- **Custom Item**: Ad-hoc item entry via modal (price, name, tax).

### 3. Cart Management
- **Minimized Cart**: Sticky bottom bar showing Total, Item Count, and preview of items.
- **Expanded Cart**:
    - Full-screen or side-sheet view.
    - Search bar at the top to quickly find and add items.
    - Item list with quantity steppers (+/-) and swipe-to-delete.
    - Breakdown of Subtotal, Tax, and Total.

### 4. Payment Flows
- **Payment Methods**: Cash, Card (Tap to Pay), and Card (External Terminal).
- **Confirmation Dialogs**: Explicit confirmation of amount and method before processing.
- **Success/Failure States**: Detailed feedback with transaction IDs and actionable buttons (Reprint, New Order, Retry).

### UI & Interaction Details
- **Grid Item Badges**: Items in the grid should display a quantity badge (e.g., a small blue circle with the count) when they are already present in the active cart.
- **Quantity Steppers**: Cart items must use a standard `- 1 +` stepper UI for precise quantity control.
- **Destructive Action Grouping**: The "Edit Order" modal (for renaming tabs) should explicitly separate destructive actions (Clear Order, Delete Order Tab) with visual cues (red text/icons).
- **Payment Method Descriptions**: Confirmation dialogs for "External Terminal" must include a note: *"Payment is processed by external terminal"* to clarify that the app only records the transaction.

### Metadata & State
- **Order ID vs Table Name**: Orders should have an auto-generated ID (e.g., #402) but support a user-defined "Table Name" or "Order Name" for better identification in busy environments.
- **Failure Reasons**: Payment failure screens must display the specific reason provided by the provider (e.g., "Card Declined by Bank") rather than a generic error.
- **Success Metadata**: The Success screen should display the Transaction ID and the associated Table/Order name for verification.

### Navigation
- **Back Navigation in Folders**: When browsing a folder (e.g., "Hot Coffees"), a clear back button and title header are required to return to the top-level inventory.
- **Search in Cart**: The search bar in the expanded cart serves as a "Quick Add" feature, filtering the inventory as the user types.

## Design Requirements
- **Theme**: Dark Mode only.
- **Colors**: Use Stone palette for neutrals, Lime for primary actions, Blue for info/badges, and Red for destructive actions.
- **Typography**: DM Sans (Headings/Body).
