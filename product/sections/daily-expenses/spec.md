# Edit Expense

## 1. Quick Logging Grid
- **Favorites Section**: A 3-column grid of frequently used expense items. Each item is visually represented by its configured thumbnail (image, color, or stroke). Tapping adds it to today's list.
- **Expenses Browser**: 
    - **Folder Navigation**: Displays expense categories (folders) like "Produce" or "Packaging". Tapping a folder opens a detail view with its contents.
    - **Item Selection**: Tapping an item opens the **Expense Entry Modal** with the item's name pre-filled and recent prices shown (as per PRD).
- **Custom Expense Action**: A persistent `+ Custom Expense` button at the start of the list that opens the **Expense Entry Modal** with a blank name field.

## 2. Minimized Summary (Bottom Bar)
- **Status Overlay**: A Spotify-style floating bar at the bottom of the screen.
- **Total Display**: Shows the cumulative total for today (e.g., "$18.50").
- **Item Preview**: Displays a truncated list of the names of items logged so far.
- **Expansion Trigger**: Tapping the bar or the chevron icon slides up the full detailed list.

## 3. Expense Detail View (Expanded)
- **Search Header**: Includes a search input ("Search items...") to quickly filter or find specific logged expenses.
- **Logged Items List**: 
    - Displays each expense with its visual thumbnail (image/color/stroke), name, and recorded cost.
    - **Edit Action**: A pencil icon on each row opens the **Expense Entry Modal** to modify the price, tax, or notes for that specific entry.
- **Financial Summary**: 
    - Displays Subtotal and Tax breakdown.
    - **Grand Total**: Large, prominent display of the final total for today's expenses.

## 4. Expense Entry & Editing (Sliding Modals)
- **Interface**: A sliding bottom sheet (modal) for "Create Expense" or "Edit Expense".
- **Name Field**: Text input for the name of the expense.
- **Price Entry (Numpad)**: 
    - Prominent price display (e.g., "$ 4.50").
    - Custom 3x4 Numpad (numbers 0-9, decimal point, and backspace) for rapid monetary input.
- **Tax Selector**: Horizontal radio-style selection for tax rates (e.g., 0% Exempt, 10% Reduced, 21% Standard).
- **Note Field**: A text area for "Additional details..." to provide context for the expense.
- **Save Action**: A primary full-width button ("Save Expense" or "Save Changes") to commit the entry and close the modal.
- **Dismiss**: An 'X' close button in the top right or a downward swipe to cancel.

## UI & Interaction Details
- **Visual Styles**: Expense tiles support custom background colors and stroke patterns.
- **Automatic Date**: The date is strictly set to "Today" and is not visible or editable in the entry modals, ensuring "fast lane" daily logging.
- **Navigation**: The main screen includes a back button when browsing inside folders to return to the root categories.
- **Empty State**: Shows a clear prompt to "Start logging today's expenses" when no items have been added.

## Metadata & State
- **Temporal Logic**: All entries are pinned to the current date and clear from this view automatically the next day (they are then available in activity section).
- **Analytics Sync**: Every addition or edit triggers an immediate update to the store's net profit calculations in the Activity dashboard.

## Configuration
shell: true
