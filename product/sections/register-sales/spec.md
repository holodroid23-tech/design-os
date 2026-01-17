# Register & Sales Specification

## Overview
The primary interface for handling customer transactions and order management. It enables fast checkout through multi-order tabs, a folder-based inventory browser, and a versatile cart system for processing cash and card payments.

## User Flows
- **Manage Multiple Orders**: Create, switch between, rename (e.g., "Table 5"), and delete browser-style tabs for concurrent customers.
- **Build the Cart**: Add items by browsing (folders are optional), tapping a 3x3 grid of "Favorites," searching via a "whisperer" search bar, or adding ad-hoc custom items via a sliding modal.
- **Edit Order**: Adjust quantities, remove items, or clear the entire cart from the expanded cart view.
- **Process Payment**: Select from configurable payment methods (Cash, Tap to Pay card via Stripe, or External Terminal).
- **Finalize Sale**: View a success state after payment, with options to "Reprint Receipt" or "New Order" (clearing the current tab).
- **Handle Hardware**: Connect or pair a Bluetooth printer on-the-fly if a print is requested but no printer is configured.

## UI Requirements
- **Multi-Order Tabs**: Persistent top bar with + button; tabs show truncated names and item counts.
- **Dual-State Cart**: A "Spotify-style" floating bottom bar when minimized; expands to a full-screen view with sticky action buttons (Pay Cash, Pay Card, etc.).
- **Inventory Browser**: Flat list or optional folder-based organization; includes a "badge" on items already in the cart for quick count visibility.
- **Favorites Grid**: A horizontally scrollable 3x3 grid of pinned items for immediate access.
- **Action Feedbacks**: Clear success/error states for Tap to Pay preflight checks (GPS, Stripe link, device verification).

## Configuration
- shell: true
