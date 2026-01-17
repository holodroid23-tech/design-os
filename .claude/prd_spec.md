# Project Specification: Mobile POS System (ComPOSt)

ComPOSt is a modern, mobile-first Point of Sale (POS) system for small businesses (coffee shops, boutiques, retail). It turns any phone or tablet into a sales terminal plus a lightweight back office.

## Core Architecture & Global Rules

- **Platform**: Native Android & iOS (mobile + tablet)
- **Orientation**: Portrait only
- **Language**: English only (EN)
- **Data Strategy**: Offline-first
    - All reads/writes go to a local database
    - Automatic background sync to cloud when internet is available

## Tech Stack & Design System

- **Framework**: React Native 0.81+ + TypeScript
- **UI Components**: Gluestack UI v2
- **Styling**: NativeWind v5 (Tailwind CSS v4 for React Native)
- **Icons**: lucide-react-native
- **Charts**: react-native-gifted-charts (dashboard analytics)
- **Theme**: Dark mode only
- **Tokens**: All colors/spacing/typography/radius come from the ComPOSt Design System files

## Device Roles & Session Control

### Mode A — Register (POS) "Driver"
- Exactly one active POS device per store
- Only the active POS can create/edit orders and payments
- Holds the Active Session Token

### Mode B — Back Office "Observer"
- Unlimited devices
- Full access to Settings and Activity/Dashboard
- Read-only for orders (unless taking over POS)

### Handover (Takeover) Logic
- If a Back Office device requests POS, show a clear warning
- On confirmation:
    - Revoke the old Active Session Token
    - Push the previous POS device to a locked state
    - Transfer order-writing capability to the new device

## Authentication & Onboarding

### Registration (New Store)
- **Create Store flow**:
    - Creates Organization (hidden), Store, and Owner (Admin)
    - Send welcome/summary email (no email confirmation flow)
    - Generate and set up PIN access (fast daily auth)

### Mode Selection (Persisted)
- **User chooses**:
    - **Register (POS)** → opens Register
    - **Back Office** → opens Activity/Dashboard
- Selection is saved locally; next launch uses PIN, not credentials

### Immediate Boot (POS)
- Selecting POS loads the Main Register instantly
- **Smart defaults**:
    - Currency from device locale
    - VAT/Tax default: 0% (tax inclusive)
    - Seed local DB with a Demo Menu (Coffee, Tea, Cake)
- First session auto-logs in the Owner (skip PIN once)

## App Navigation (Bottom Bar)

1. **Orders** (Register)
2. **Expenses** (Today)
3. **Activity** (PIN-gated, role-based)
4. **Settings** (PIN-gated, role-based)

## Orders (Register)

### Tabs (Multi-order)
- Browser-style top tabs for concurrent orders
- `+` creates a new tab
- Tab shows truncated name + item count
- **Tab detail**: rename (e.g., table name), clear, delete

### Favorites (Optional)
- Only shown if favorites exist and are enabled in settings
- 3×3 grid, horizontally scrollable
- Tap adds item; badge shows count; decrement/remove supported

### Inventory Browser
- Loaded from Settings inventory
- Folder-first list, then items (infinite list)
- Includes a first-row action: `+ Custom Item` (ad hoc item via sliding modal)
- Tap on item adds item; badge shows count; decrement/remove supported
- Tap on folder opens folder detail

### Cart UI
- **Minimized**: bottom bar (Spotify/Uber style) showing total + item count + truncated item names. Tap expands.
- **Expanded**:
    - Whisperer search to add items fast
    - Item list with: edit quantity, remove item
    - **Sticky action buttons** (configurable via Settings):
        - Pay Cash
        - Pay Card (Tap to Pay)
        - Record Card Payment (external terminal, not connected)

## Payments

### Cash
- Tap **Pay Cash** → summary → confirm
- On confirm: save to DB + auto-print
- Success screen: Reprint / New Order (clears current)
- **If printing requested but no printer configured**:
    - Open **Connect Printer** modal
    - Auto-scan Bluetooth printers
    - Tap to pair/associate

### Card (Tap to Pay)
- Tap **Pay Card**
- **Preflight checks**:
    - Location permission (GPS)
    - Stripe token/account link
    - Terminal active + device verification
- If ready → start Tap to Pay
- If payment succeeds → save + auto-print → success screen (Reprint / New Order)
- If fails → show error and allow retry or switch method

## Expenses (Today)

- Quick daily logging (today only)
- Similar to Orders but no tabs and no payments
- Tap an expense item → modal for custom price entry + recent prices per item
- Supports custom ad hoc items
- Updates analytics immediately
- Today’s entries are fully editable (no audit log required for today in this "fast lane" view)
- Clears automatically next day

## Activity (PIN-Gated, Role-Based)

Entering Activity always prompts for PIN, then loads a view based on the unlocking role. Polymorphic UI.

### Cashier View — "My Shift" (Today Only)
- **Mini dashboard (today)**:
    - Total income
    - Net profit (cash/card breakdown)
    - Expenses total
    - Refunds (count + total)
    - Orders count
- **Orders list**: only orders processed by this user today
- **Each order is an accordion**:
    - **Collapsed**: Order ID/name, time, total, refund badge (if any)
    - **Expanded**: items, quantities, prices + metadata:
        - tab/custom name, payment method
        - created by, payment processed by
        - refunded by + refund reason (if refunded)
- **Actions**: Reprint / Refund for eligible "today" orders (hidden if already refunded)

### Manager/Admin View — "Command Center"
- **Tabs**: Analytics / Orders / Expenses
- Date filtering + CSV export
- **Analytics**: Same core widgets as cashier, plus:
    - hourly income trend
    - top 10 items by revenue
    - top 10 by quantity
- **Orders**: Same order list UI, but for all staff and historical ranges
- **Expenses**:
    - Accordion by date (shows total + count)
    - Each expense expands to show:
        - creator, time, note
        - edit/delete history as an audit trail
        - Edited groups show an "edits count" badge
        - Deletions use soft-delete: strikethrough + still visible for audit
        - Name, note price edits are all logged (who, when)

## Settings

### Profile / User
- Change name
- Change Email
- Change PIN
- Change password

### Inventory Management
- Single-level folder system (folders + items)
- **Items**: name, color, stroke type, animation, price, VAT, optional image (Unsplash/custom)
- Favorites/pins determine Register quick access
- Bulk import via Excel/CSV

### Expense Management
- Mirrors Inventory, but for expense templates
- Folders + expense items (name, color, VAT)
- No fixed prices for expenses.
- Favorites/pins feed the Expenses quick UI
- Bulk import via Excel

### General
- **Store identity**: name, address, email, website
- Currency selection
- Time format (AM/PM vs 24h)
- Display Always On
- PIN lock timer (1m → Never)
- **Tax rules**: enable/disable + multiple taxes (e.g., VAT, service charge) + default
- Delete account (Admin only, destructive confirmation)

### Users (Staff Management)
- Staff list (excluding self) with roles/status
- **Add user flow**:
    - **Admin/Manager**: requires email (password setup via email)
    - **Cashier**: name only + auto-generated PIN (instant use)
- Role guidance sheet (what each role can do)
- **Maintenance**: regenerate PIN, remove user
- Edits + new user creation require Admin PIN; Manager can view only

### Payments
- Toggle methods: Cash / External Terminal / Tap to Pay
- **Tap to Pay setup checklist**:
    - GPS system on
    - app GPS permission
    - device verification (root/jailbreak detection)
    - Stripe account link
- Configure/disconnect Stripe account link
- Manager can view stripe account link but attempt to edit triggers admin PIN

### Printer
- Status (connected/disconnected)
- Search printers, pair button
- Test print, disconnect button

### Receipt Visuals
- Toggle included details: date/time/order ID/cashier name
- Paper size: 58mm / 80mm
- Upload logo (auto dither to B/W)
- **Typography**: monospace or sans + size (S/M/L)
- Separator style: dashed/dotted/solid
- Footer: message + website + optional QR code
- Preview tab + Test Print

### Device Mode
- Switch between Register (POS) and Back Office
- Enforces one active POS device
- "Switch anyway" revokes the other device and takes over the session
- Warning modal if other device operates in POS

### Logout
- Logs out to the credentials/PIN entry screen

## Out of Scope (MVP), but Architecture Must Support

- Organizations & multi-store (Organization → Stores), hidden in MVP
- Multiple active POS registers per store (future scaling)
- Users assigned to multiple stores (regional admin/manager)
- Custom roles / flexible permissions (permission groups become data-driven, not hardcoded)
