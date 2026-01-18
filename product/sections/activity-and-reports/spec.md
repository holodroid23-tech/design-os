## 1. PIN-Gated Entry (Common)
- **PIN Authentication**: Accessing Activity always triggers a PIN entry screen. The system uses the PIN to load the appropriate view (Cashier or Manager).

## 2. Cashier Perspective ("My Shift")
This view is strictly for **Today's data**.

### Analytics (Today's Summary)
- **Summary Widgets**: A grid of cards showing:
  - **Total Income** (Cash + Card)
  - **Net Profit** (with breakdown)
  - **Expenses Total** (Today's costs)
  - **Refunds** (Total amount and count)
  - **In Drawer** (Current cash total)
  - **Total Orders** (Total count for today)

### Orders (Record Browsing)
- **Order List**: Displays all orders processed by **all staff members** today.
- **Order Card**: Displays Order ID, time, total, and a **refund badge** (red) if the order has been refunded.
- **Order Detail (Expanded)**: Shows full itemization, customer name, payment method, and detailed metadata (**Created By**, **Processed By**).
- **Refund Action**: 
  - Triggered via "Refund" button. Captures a "Reason for Refund."
  - **Refund Method**: 
    - **Cash Orders**: Cash only.
    - **Tap to Pay**: Choice of "Digital Refund" (Stripe) or "Cash."
    - **External Terminal**: Choice of "Card" or "Cash" with a reminder to process manually.

## 3. Manager & Admin Perspective
This view provides access to full historical records.

### Global Controls
- **Date Range Picker**: Top-level control to filter all data by Today, Yesterday, This Week, Last 30 Days, or a Custom Range.
- **Export Data**: A universal "Export" button to generate CSV reports for the currently selected view and date range.

### Analytics (Performance & Trends)
- **Summary Widgets**: The same set of cards as the cashier view, filtered by the selected date range.
- **Hourly Income Chart**: Line chart showing revenue fluctuations vs. time.
- **Top 10 Items**: Performance bar charts for "Top 10 by Revenue" and "Top 10 by Quantity."

### Orders (Historical Record Browsing)
- **Order List**: Historical list of orders for the selected date range.
- **Order Detail**: Full metadata access (same as Cashier view) for any historical order.
- **Refund Action**: Capabilities for processing refunds on historical orders.

### Expenses (Historical Audit & Entry)
- **History List**: Date-grouped list of all expenses with daily totals.
- **Edit Item**: Each expense item includes a **pencil icon** to trigger the edit flow (restricted to items **no older than 40 days**).
- **Audit Trail**: Expanded expenses show the history of edits (who changed the price/note and when). Soft-deleted items are visible with a strikethrough.
- **Historical Entry**: Managers can create or backdate new expenses for any day up to **40 days in the past**.
- **Expense Entry UI**: Numpad-driven price entry with quick tax toggles (0% Exempt, 10% Reduced, 21% Standard).

**Display:** Inside app shell
