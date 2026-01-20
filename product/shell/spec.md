# Application Shell Specification

## Overview
ComPOSt uses a mobile-first bottom navigation shell designed for speed and clarity in a fast-paced retail or cafe environment. The shell provides persistent access to core functional areas while maximizing screen real estate for task-focused views.

## Navigation Structure
- **Orders** → Register & Sales (Core POS interface - create, manage, and complete orders)
- **Expenses** → Edit Expense (Fast Lane: Quick logging of daily costs, Today only)
- **Activity** → Activity & Reports (PIN-gated Hub: Analytics, Orders History, and Master Expense Log)
- **Settings** → Settings & Configuration (Core settings and inventory)
- **User Avatar** (rightmost in bottom nav) → Opens a profile modal with user information, today's statistics, and actions like changing PIN or locking the screen

## User Menu
- **Location:** Rightmost item in the bottom navigation bar.
- **Contents:**
  - User Avatar (Circle with initials or image)
  - Profile Modal:
    - User Name and Role
    - Quick Stats (e.g., "Total Sales Today")
    - "Lock Screen" action
    - "Change PIN" action
    - Logout

## Layout Pattern
- **Bottom Navigation:** A persistent bar at the bottom of the screen (on mobile) or a docked bar (on larger tablets).
- **Content Area:** The main viewport above the navigation bar where section-specific screens are rendered.

## Responsive Behavior
- **Mobile/Small Tablet:** Fixed bottom navigation bar with icons and labels.
- **Large Tablet/Desktop:** Can transition to a side rail or remain a bottom bar depending on orientation, prioritizing thumb reach on handheld devices.

## Design Notes
- Uses the **Stone** palette for the navigation background (`#111114`).
- Active state uses a subtle highlight (`rgba(255,255,255,0.1)`) and primary on-layer color.
- Icons from `lucide-react`: `ShoppingCart` (Orders), `ReceiptText` (Expenses), `Activity` (Activity), `Settings` (Settings).
- Role-based visibility: Certain nav items or sub-actions may be restricted by PIN/role.
