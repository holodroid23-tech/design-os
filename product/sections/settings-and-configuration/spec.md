## 1. Main Settings Navigation
- **Access Control**: Entering the Settings section **always prompts for a PIN**. **Cashiers are restricted from accessing this section**; it is only accessible to users with the Administrator or Manager role.
- **Polymorphic UI**: The view and available actions are dynamically adjusted based on the role of the user who unlocked the section (Administrator vs. Manager).
- **Navigation Groups**:
    - **Group 1 (Identity)**: User Profile Row showing Initials, Name, Email, and Role badge.
    - **Group 2 (Business Core)**: **Inventory** and **Expenses**.
    - **Group 3 (System)**: General, Users, Payment, Printer, Receipt, and Device Mode.
    - **Group 4 (Feedback)**: Suggest feature and Report bug.
    - **Group 5 (Account)**: **Log out** (red-themed).
- **Versioning**: Static footer showing `VERSION 2.4.1 (BUILD 89)`.

## 2. Inventory Management
- **Optional Folders**: Items can exist at the top level or within folders.
- **New Item Dialog (Fixed Price)**:
    - **Header**: "New Item" with a close button and a **Star/Favorite** toggle.
    - **Name**: Text input with placeholder "e.g. Flat White".
    - **Folder (Optional)**: Dropdown to assign to a folder or leave unassigned.
    - **Price**: Numeric keypad for entering a **fixed retail price**.
    - **Tax**: Segmented control for tax rates (e.g., 0%, 10%, 21%). Defaults to the "defaultly use" tax.
    - **Appearance Tabs**: Switch between **Color** (grid of color circles) and **Image** (Upload/Camera).
    - **Animation Controls (Stroke Style)**: Selection grid for: None, Common, Dashed, Gradient, Holo, and Glow.
- **New Folder Dialog**: Assign name, default tax rate, color, and stroke style for categorized items.

## 3. Expense Management
- **Optional Folders**: Expense templates can be grouped or standalone.
- **New Expense Dialog (Dynamic Price)**:
    - **Header**: "New Expense" with **Star/Favorite** toggle for pinning to the fast-lane UI.
    - **Name**: Text input with placeholder "e.g. Monthly Rent".
    - **Category (Optional)**: Dropdown to assign to a folder/category.
    - **Tax**: Segmented control for tax rates.
    - **No Fixed Price**: Explicitly excludes price input; prices are entered during daily logging.
    - **Appearance & Animation**: Mirrors Inventory exactly (Tabs for Color/Image + **Stroke Style/Animation** selection).

## 4. General & System Settings
- **Store Identity**: Text fields for Store Name, Street, Email, and Website.
- **Localization**: Currency dropdown and Time Format (AM/PM vs. 24h) segmented control.
- **Rules**: "Display Always On" toggle and a "PIN Lock Timer" selection (1m, 2m, 3m, 5m, 10m, Never).
- **Tax Engine**: 
    - **Use Taxes Toggle**: Global switch to enable/disable tax calculations.
    - **Additive List**: Manage multiple tax rules (e.g., VAT 21%, Service Charge 10%).
    - **Default Selection**: Tapping a specific tax in the list sets it as the **"defaultly use"** tax. 
- **Role Restriction**: **Delete Account** is strictly limited to the **Administrator** role. **Managers do not see this button.**

## 5. User Management
- **Staff List**: Displays names and roles with role-specific color coding. Tapping a user opens the "Edit User" flow.
- **Add/Edit User Flow**: 
    - **Role Selection**: Admin, Manager, or Cashier.
    - **Cashier Setup**: Name input + instant auto-generated 4-digit PIN display.
    - **Admin/Manager Setup**: Requires Name and Email for invitation-based setup (password set via email).
- **Role Restrictions & Interlocks**:
    - **Manager Role**: Can view the staff list but attempting to add a new user, remove a user, or regenerate a PIN triggers a mandatory **Administrator PIN prompt**.
    - **Role Guidance**: Side-sheet explaining permissions for each role.

## 6. Payment Settings
- **Payment Methods**: Toggles for Cash, External Terminal, and Tap to Pay.
- **Tap to Pay Checklist**: 4-part progress bar for GPS (System), GPS (App Access), Device Verification, and Account Link requirements.
- **Role Restriction**: **Manager role** can view Stripe account links and configurations but attempting to edit or disconnect triggers a mandatory **Administrator PIN prompt**.
- **Reusability**: This configuration UI (checklist and setup) must be available as a modal in the **Register (POS)** section if a user attempts to pay via Tap to Pay without completing setup.

## 7. Printer Settings
- **Printer Pairing**: Status card (Test Print/Disconnect), Hardware Discovery list, and Paper Size selection (58mm/80mm).
- **Reusability**: The printer discovery and pairing UI must be available as a modal in the **Register (POS)** section if a user attempts to print a receipt without a configured printer.

## 8. Receipt Visuals
- **Configuration Tabs**: Switch between **Design** and **Preview**.
- **Content Controls**: Toggles for Date, Time, Order ID, and Cashier Name.
- **Visuals**: Logo upload, Monospace/Sans Serif font selection, Font size (S/M/L), and Separator style (Dashed, Dotted, Solid).
- **Footer**: Text inputs for Footer Message and Website URL, plus a "Show QR Code" toggle.

## 9. Device Mode & Handover
- **Mode Toggle**: Switch between **Register (POS)** and **Back Office** modes.
- **Takeover Interlock**: Confirmation modals when switching to POS, specifically the "Active Session Detected" warning to prevent dual-POS conflicts.

## 10. Support & Feedback
- **Report Bug**: Bottom sheet overlay with multi-line "Issue details" input, "Upload screenshots" area, and a primary "Report Bug" button.
- **Suggest Feature**: Full-screen modal with "Feature title", "Feature description", optional screenshot attachment, and a primary "Send Suggestion" button.

**Display:** Inside app shell
**Configuration:**
```json
{
  "shell": true
}
```
