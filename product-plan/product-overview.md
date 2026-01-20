# ComPOSt — Product Overview

## Description
ComPOSt is a modern, mobile-first Point of Sale (POS) system for small businesses (coffee shops, boutiques, retail). It turns any phone or tablet into a fast sales terminal plus a lightweight back office, designed to work reliably offline with automatic background sync when internet is available—and to stay affordable with a low monthly cost (target: $5–$10/month).

## Problems & Solutions

### Problem 1: Checkout is slow and error-prone on busy shifts
ComPOSt streamlines selling with a Register-first experience: multi-order tabs, favorites, fast item search, and a minimized cart that expands into a focused checkout flow.

### Problem 2: Internet outages break sales and reporting
ComPOSt is offline-first: all reads and writes go to a local database, and the app syncs to the cloud automatically in the background when connectivity returns.

### Problem 3: It’s hard to control which device is the “real register”
ComPOSt enforces exactly one active Register (POS) device per store. Back Office devices can take over with a clear warning, revoking the previous Active Session Token and pushing the old POS device into a locked state.

### Problem 4: Staff need quick daily access without repeated logins
ComPOSt uses fast PIN-based access for daily authentication and prompts for PIN when entering gated areas like Activity and Settings, with role-based views and controls.

### Problem 5: POS systems are too expensive (hardware + subscriptions)
ComPOSt runs on existing phones and tablets and aims for a simple, low-cost subscription (target: $5–$10/month), while still providing essential back office capabilities like PIN-gated Activity/Dashboard, analytics, and export-friendly reporting.

## Key Features
- Low monthly cost target ($5–$10/month) with no proprietary terminal hardware required
- Offline-first local database with automatic background sync
- Device modes: Register (POS Driver) vs Back Office (Observer) with takeover/lockout
- Multi-order tabs, favorites (optional), inventory browsing, and ad hoc custom items
- Cart UX with minimized/expanded states and configurable sticky action buttons
- Payments: Cash, Tap to Pay (card), and external terminal card recording
- Printer pairing, test print, and configurable receipt visuals (logo, paper size, footer, QR)
- Daily Expenses “today-only” fast lane with quick edits and immediate analytics impact
- Activity: PIN-gated, role-based views (Cashier “My Shift” vs Manager/Admin “Command Center”)
- Settings: inventory and expense templates, staff/users, taxes, payments, printers, device mode, and security

## Planned sections

1. **Register & Sales** — Fast checkout flow with multi-order tabs, item search, cart management, and payment processing (cash, card, Tap to Pay).
1. **Daily Expenses** — Quick daily logging for store costs like supplies, milk, and maintenance with immediate analytics impact.
1. **Activity & Reports** — PIN-gated dashboard with role-based views (Cashier "My Shift" vs Manager "Command Center"), sales analytics, and historical record browsing.
1. **Settings & Configuration** — Manage inventory and expense templates, staff/users, taxes, payment methods, printer pairing, and receipt customization.
1. **Onboarding & Security** — The first-run experience: store registration, mode selection (Register vs Back Office), and initial system walkthrough, plus security flows for password and PIN resets.
1. **System Emails** — Transactional email templates for account lifecycle: welcome, password/PIN resets, and role promotions.
