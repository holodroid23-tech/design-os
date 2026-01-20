## 1. PIN-Gated Entry (Common)
- **What this is for**: Keeping sensitive business activity behind a PIN, with access based on role.
- **Rules**:
  - Entering Activity requires PIN verification.
  - What you can see and do depends on your role (Cashier vs Manager/Admin).

## 2. Cashier Perspective ("My Shift")
Cashier access is strictly scoped to the current date.

### Analytics (Today's Summary)
- **What this is for**: A quick snapshot of how today’s shift is going.
- **What it includes** (today only):
  - Total income (cash + card)
  - Net profit (with breakdown inputs available for audit)
  - Expense totals
  - Refund totals (amount and count)
  - Cash-in-drawer estimate (based on recorded cash payments and cash refunds)
  - Total orders count

### Orders (Record Browsing)
- **Scope**: All orders recorded today, across all staff members.
- **What you can see per order**:
  - Order identifier, timestamp, totals, payment method
  - Itemization and any captured customer attribution (if applicable)
  - Audit metadata including “created by” and “processed by” identities
  - Refund status and refund history (if refunded)
- **Refund rules**:
  - Refunds require a reason (for audit).
  - Refund method constraints:
    - **Cash orders**: refunds must be recorded as cash refunds.
    - **Tap to pay**: refunds may be processed digitally (provider refund) or recorded as cash, based on policy and capability.
    - **External terminal**: the system records the refund outcome and method, but does not assume provider processing; card refunds may require out-of-band processing.

## 3. Manager & Admin Perspective
Manager/Admin access includes historical records (within retention constraints).

### Global Controls
- **Filtering rules**:
  - Filter analytics and lists by a date range. Presets include: today, yesterday, this week, last week, last month, and last 30 days, plus a custom range.
  - Filtering should apply consistently across analytics and record browsing.
- **Export**:
  - Allow export of the currently filtered dataset as CSV (or an equivalent tabular format).

### Analytics (Performance & Trends)
- **What this includes** (filtered by the selected range):
  - The same core summary metrics as the cashier scope, aggregated over the selected range.
  - Income over time (granularity may vary by range; e.g., hourly for a single day, daily for multi-day ranges).
  - Top items by revenue and by quantity for the selected range.

### Orders (Historical Record Browsing)
- **Scope**: Orders recorded within the selected date range.
- **What managers/admins can do**:
  - Inspect full order details and audit metadata for any order in range.
  - Refund eligible orders in range, subject to payment-method constraints and provider capabilities.

### Expenses (Historical Audit & Entry)
- **What this includes**:
  - Expenses grouped by date with daily totals.
- **Connection to Daily Expenses (two-way)**:
  - Activity and Daily Expenses refer to the same expense records.
  - If an expense is added/edited/deleted here for **today**, it should show up immediately in Daily Expenses.
  - If an expense is added/edited/deleted in Daily Expenses, it should show up immediately here under today’s expenses.
- **Backdating and editing rules**:
  - Managers can create expenses for historical dates up to **40 days** in the past.
  - Managers can edit expenses only within **40 days** of the expense date.
- **Audit trail**:
  - Keep an edit history (who changed what, and when).
  - Support soft deletion while keeping deleted entries available for audit, with a clear deleted status.
- **Per-entry fields**:
  - Amount, applied tax selection, and optional note (same capture as Daily Expenses).

**Display:** Inside app shell
