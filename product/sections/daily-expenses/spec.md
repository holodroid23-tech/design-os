# Daily Expenses

## 1. Fast expense capture (today)
- **What this is for**: Quickly logging expenses against **today**, without having to “set up” a full record first.
- **What can be logged**:
  - An expense based on a saved template (optionally organized into folders/categories)
  - A one-off expense with a custom name
- **How it should behave**:
  - There is a notion of “favorites” so the most common expense templates are easy to use for day-to-day logging.
  - Templates can be browsed by folder/category.
  - If a template is used, the expense name and default tax behavior come from the template; the amount is captured at logging time.
  - If no templates exist (or none are favorited), staff can still log a custom expense.

## 2. Current-day totals summary
- **What this is for**: A quick “where are we at today?” snapshot while expenses are being logged.
- **What it provides**:
  - Running totals for today
  - A compact preview of what’s been logged so far (e.g., recent item names)
- **Rules**:
  - Totals update immediately when an expense is added or edited.

## 3. Review and edit current-day expenses
- **What this is for**: Reviewing what was logged today and fixing mistakes.
- **What staff can do**:
  - Find entries by name (and/or template)
  - See details per entry: name, amount, applied tax selection, notes, and the originating template (when applicable)
  - Edit an entry’s amount, applied tax selection, and notes
- **Rules**:
  - This section only covers **today’s** expenses (see Temporal Logic below).
- **Totals**:
  - Provide today’s subtotal (pre-tax), tax total, and grand total based on recorded entries.

## 4. Create and edit expense entries
- **What gets captured**:
  - Name (from a template or custom)
  - Amount (valid currency)
  - Applied tax selection (options come from configuration)
  - Optional note
- **Rules**:
  - New entries are always recorded for **today** in this section.
  - Editing updates the already-recorded entry (amount/tax/note).
  - If templates carry appearance metadata (thumbnail/color/stroke), entries keep that linkage for consistency and later review.
- **Empty case**:
  - If nothing has been logged today yet, totals should be zero and there should be no entries, but logging must still work normally.

## Metadata & State
- **Temporal Logic**: Everything logged here is “today-only”. The next day, these entries stop appearing in Daily Expenses, but remain available in Activity.
- **Shared expense records (two-way)**: Daily Expenses and Activity reference the same underlying expense records.
  - If you add/edit/delete an expense in Daily Expenses, it should show up immediately in Activity’s expenses history for the same date.
  - If you add/edit/delete an expense in Activity for **today**, it should show up immediately in Daily Expenses.
- **Analytics Sync**: Adding or editing an expense updates profit calculations used in Activity.

## Configuration
shell: true
