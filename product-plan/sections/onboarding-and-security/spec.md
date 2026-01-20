# Onboarding & Security Specification

This section covers the entry points of the application, including store registration, user login, PIN setup, and multi-path reset flows for passwords and PINs.

## 1. Authentication (Login & Registration)
- **What this is for**: Letting someone either create a new store account or sign in to an existing one.
- **Inputs**:
  - Email + password (Admin/Manager accounts)
  - Store creation details (store name and the first Admin identity)
- **Rules**:
  - Existing users can sign in with email/password.
  - Password reset is available for email/password accounts.
  - Registration creates a new store (organization) and the first Admin user.
  - Login and reset flows should avoid leaking whether an email exists beyond what’s necessary (prefer generic responses where appropriate).

## 2. Post-Registration Welcome
- **What this is for**: Making sure people know they’re in the right store, with the right role, and finishing first-run setup.
- **Rules**:
  - After registration or invite acceptance, show the store context and the user’s role.
  - If PIN setup is required for the role/device context, guide them through it.
  - Once onboarding is complete, move them into normal operation.

## 3. PIN Security & Setup
- **What this is for**: A quick, in-store access credential that protects sensitive areas on a shared device.
- **Core concept**:
  - **PIN**: A 4-digit device access secret tied to a user + store.
- **Rules**:
  - PIN creation requires confirmation before it becomes active.
  - Protected areas require PIN verification.
  - Changing a PIN requires proving you know the current PIN first.
  - Failed PIN attempts should be rate-limited and may temporarily lock access after repeated failures (exact thresholds can be implementation-defined).
  - PINs must be stored/handled securely.

## 4. Device Mode Selection
- **What this is for**: Choosing how this device is being used right now.
- **Modes**:
  - **Register (POS)**: Sales and order processing.
  - **Back Office**: Analytics, inventory, expenses, and configuration.
- **Rule**:
  - Remember the chosen mode for the current session and route the user into the matching capabilities.

## 5. Password Reset Flow
- **What this is for**: Helping Admin/Manager users get back into their email/password accounts.
- **Rules**:
  - A reset request sends a reset link to the account email.
  - The user can resend the link (and change the email they typed before sending, if needed).
  - Using the link lets them set a new password, and the link becomes invalid after success.
  - Reset links expire after a configured time window.
  - Passwords must meet a minimum policy (to be defined).

## 6. PIN Reset Flow (Role-Based)
- **What this is for**: Recovering access when someone forgets a PIN, without breaking role safety.
- **Admin/Manager recovery**:
  - PIN reset can be initiated via an email-based recovery mechanism.
  - Successful recovery ends with setting a new 4-digit PIN.
- **Cashier recovery**:
  - Cashiers cannot self-reset via email/password (unless the product explicitly provisions such accounts).
  - Cashier PIN resets/regeneration are Admin-controlled.
  - Managers cannot reset other people’s PINs.

## Metadata & State
- **Persistence**: Store identity and user role are kept locally after first login.
- **Lock State**: After inactivity (or a manual lock), PIN re-verification is required.
- **Role Permissions**: Only Admins can reset other people’s PINs or change store-wide security settings.

## Navigation
- **Entry sequence**: Authentication/registration → required security setup (PIN when applicable) → mode selection → operational access.
- **Recovery sequence**: Choose the right recovery path based on what’s being recovered (password vs PIN) and the user’s role.
- **Access control**: On shared devices, PIN verification is required before entering protected areas (e.g., Activity and Settings).

## Configuration
- **shell**: false
