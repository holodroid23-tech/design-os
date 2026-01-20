## 1. Main Settings Navigation
- **What this is for**: A secure place to manage store and device configuration.
- **Access rules**:
  - Entering Settings requires PIN verification.
  - Cashiers cannot access Settings.
  - Managers and Admins can access Settings, but some actions are Admin-only (or require an Admin to authorize via PIN).
- **What lives here**:
  - Identity (current user profile and role context)
  - Business core (inventory, expenses)
  - System (general rules, users, payment, printer, receipt, device mode)
  - Feedback (feature suggestions, bug reports)
  - Account (log out)
- **Versioning**:
  - Always expose app version/build so support can troubleshoot reliably.

## 2. Inventory Management
- **What this is for**: Managing the inventory catalog used in Register (POS).
- **Inventory expectations**:
  - Inventory items may be ungrouped or grouped into folders/categories.
  - Each inventory item has:
    - Name
    - Fixed retail price
    - Applied/default tax selection (derived from tax configuration, stored explicitly on the item)
    - Optional appearance metadata (color/image and optional stroke style) used for fast recognition
    - Optional “favorite” flag for rapid access
  - Folders/categories have:
    - Name
    - Optional default tax selection for items created within the folder
    - Optional appearance metadata applied at the folder level
- **Rules**:
  - Staff with permission can create/edit/delete items.
  - Staff with permission can create/rename/delete folders and move items between them.
  - Items can be marked as favorites.
  - Prices must be valid currency amounts.
  - Tax defaults must follow the store’s configured tax rules.

## 3. Expense Management
- **What this is for**: Managing expense templates used for daily logging and reporting.
- **Expense template expectations**:
  - Expense templates may be ungrouped or grouped into folders/categories.
  - Each expense template has:
    - Name
    - Applied/default tax selection
    - No fixed price (amount is captured at logging time)
    - Optional appearance metadata (color/image and optional stroke style)
    - Optional “favorite” flag for rapid access in daily logging
- **Rules**:
  - Templates can be organized into folders/categories.
  - Templates can be marked as favorites for faster daily logging.

## 4. General & System Settings
- **What this is for**: Store identity, localization, device behavior, and tax configuration.
- **Store identity**:
  - Store name, address/street, contact email, and website are editable.
- **Localization**:
  - Currency and time format preferences are configurable.
- **Device rules**:
  - “Keep display awake” can be enabled/disabled.
  - An inactivity lock timer controls when PIN re-verification is required.
- **Tax engine**:
  - Taxes can be enabled/disabled globally.
  - When taxes are **disabled**, everything behaves as “no tax” by default (items/templates can still store a configured tax selection, but it does not apply while taxes are off).
  - Multiple tax rules can exist and may be applied **additively** where configured.
  - A store-wide **default tax selection** exists and is used:
    - When creating a new inventory item or expense template (unless a folder default tax overrides it)
    - For ad-hoc entries that need a tax (e.g., quick item / custom charge)
  - If there is **only one** tax rule, it is the default tax selection automatically.
  - If there are **multiple** tax rules, an Admin/Manager can choose which one is the default.
  - Folders/categories may define a **default tax selection**; items/templates created inside that folder inherit the folder’s default tax (otherwise they inherit the store-wide default).
- **Role restriction**:
  - Destructive store-level operations (like account deletion) are Admin-only.

## 5. User Management
- **What this is for**: Managing staff identities, roles, and access.
- **Roles**:
  - Administrator
  - Manager
  - Cashier
- **Rules**:
  - Staff lists and roles are visible to permitted users.
  - Adding/editing staff:
    - **Cashier**: created with a name and a generated 4-digit PIN (or equivalent provisioning) for device access.
      - PIN creation requires a confirmation step (e.g., “I saved this PIN” or re-entering the PIN) before the cashier account becomes active.
    - **Admin/Manager**: created via invitation (name + email); password setup happens via email.
  - Admins can reset/regenerate cashier PINs and remove users.
  - Managers can view staff, but restricted actions require Admin authorization via PIN.
  - Role capabilities should be explained clearly to prevent misconfiguration.

## 6. Payment Settings
- **What this is for**: Turning payment methods on/off and making sure tap-to-pay is properly set up.
- **Embeddable setup (in Register)**:
  - Payment setup screens must be **embeddable** in a modal/bottom-sheet flow (not only accessible through Settings navigation).
  - If a cashier attempts a **card payment** (tap-to-pay or external terminal flow) and configuration is missing/invalid, show an **in-context setup prompt** and allow completing setup without leaving the sale.
- **Supported methods**:
  - Cash
  - External terminal (out-of-band card processing)
  - Tap to pay (provider-integrated)
- **Rules**:
  - Payment methods can be enabled/disabled at the store/device level.
  - Tap-to-pay requires prerequisites (permissions, device verification, account linking); track these so setup is predictable.
  - If setup is incomplete, don’t allow provider-integrated payments until prerequisites are satisfied.
  - Managers can view provider linkage/config, but editing/disconnecting requires Admin authorization via PIN.
  - If someone tries to use a not-yet-configured method during a sale, they need a way to complete setup from within Register (subject to authorization) and then continue the sale.

## 7. Printer Settings
- **What this is for**: Connecting receipt printers and keeping printing reliable.
- **Embeddable setup (in Register)**:
  - Printer setup screens must be **embeddable** in a modal/bottom-sheet flow (not only accessible through Settings navigation).
  - If a cashier attempts to **print** and no printer is configured (or the configuration is invalid), show an **in-context setup prompt** and allow completing setup, then retry printing.
- **Emergency reconnect permissions**:
  - When printing fails (e.g., Bluetooth printer disconnected), **any user** may:
    - Discover/select a nearby printer
    - Pair/connect the printer
    - Run a test print
  - All other printer settings remain restricted (Manager/Admin or Admin authorization via PIN), especially anything that affects receipt content/formatting or store-wide defaults.
- **Rules**:
  - Printers can be discovered and paired/unpaired.
  - Paper size (e.g., 58mm/80mm) is selected and validated against printer capability.
  - A test print is available.
  - If printing is requested during a sale but no printer is configured, staff should be able to complete setup from Register (subject to authorization) and then retry printing.

## 8. Receipt Visuals
- **What this is for**: Controlling what receipts include and how they look (within printer constraints).
- **Content rules**:
  - Configure whether receipts include fields like date, time, order ID, and cashier name.
- **Branding & formatting**:
  - Configure logo reference, font family, font sizing, and separator style.
  - Configure footer message and website URL display.
  - Configure whether a QR code is included (and what it encodes, if applicable).
- **Constraints**:
  - Receipt output must remain readable on supported paper sizes and printers.

## 9. Device Mode & Handover
- **What this is for**: Switching the device between Register and Back Office, without letting two registers fight over the same active session.
- **Rules**:
  - Device mode (Register vs Back Office) is selectable and persisted for the device/session.
  - If there’s already an active Register session, the product must prevent dual-POS conflicts using an explicit handover/confirmation flow.
  - Session exclusivity rules (what counts as “active”, and how conflicts resolve) must be consistent and auditable.

## 10. Support & Feedback
- **What this is for**: Sending feedback with enough context to actually fix things.
- **Bug report**:
  - Capture issue details and optional attachments (e.g., screenshots).
  - Include environment metadata (app version/build, device identifier if available, timestamps).
- **Feature suggestion**:
  - Capture a title, description, and optional attachments.
  - Include environment metadata (app version/build, device identifier if available, timestamps).

**Display:** Inside app shell
**Configuration:**
```json
{
  "shell": true
}
```
