# Daily Expenses Specification

## Overview
Quick daily logging for store costs like supplies, milk, and maintenance with immediate analytics impact. It functions as a "fast lane" for all staff to record expenses as they happen, using a UI identical to the Register but optimized for cost logging instead of sales.

## User Flows
- **Build the Expense List**: Add items by browsing (folders are optional), tapping a 3x3 grid of "Favorites," or searching via a search bar.
- **Log Expense**: Tapping an item immediately opens a price entry modal with a numeric keypad (no default values).
- **Add Optional Note**: Include a text note with an expense entry for additional context during price entry.
- **View Recent Prices**: See recently used prices for a specific template within the entry modal for faster input.
- **Add Custom Expense**: Create ad-hoc entries for one-off costs not found in the templates via a dedicated modal.
- **Manage Today's Entries**: View, edit, or delete any expenses logged during the current day from a live list.

## UI Requirements
- **Register-Style Layout**: A UI identical to the Register (Favorites grid + Inventory browser) but without multi-order tabs.
- **Price Entry Modal**: A numeric keypad modal that appears instantly upon selection, featuring a field for an optional note.
- **Live Daily List**: A list of all expenses recorded today, sorted by time, with prominent edit and delete actions.
- **Today's Total**: A persistent summary widget showing the total expense amount logged for the current day.
- **No Payments/Tabs**: Unlike the Register, this section has no tab management and no payment processing.

## Configuration
- shell: true
