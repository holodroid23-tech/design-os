# System Emails Specification

Transactional emails for the ComPOSt ecosystem. All emails follow a consistent "Hero" layout designed for clarity and brand recognition.

## Master Template (Layout)
- **Header Image**: Full-bleed hero image of the ComPOSt pig with a tablet.
- **Title**: Large, bold heading (e.g., "Welcome to comPOSt").
- **Body**: Concise message explaining the purpose of the email.
- **CTA Button**: Primary action button (e.g., "Launch App", "Reset Password").
- **Footer**: Legal disclaimer and account status update notice.

---

## 1. Welcome / Invitation Email
- **Context**: Sent to the Store Owner immediately after registration, or to a new Admin/Manager when they are invited to join the store.
- **Body**: "Welcome to comPOSt. We're here to help you manage the chaos and power your daily grind. Here is everything you need to get running efficiently."
- **Next Steps List**:
    - **Set PIN**: Secure your access to the terminal.
    - **Explore Dashboard**: View your store's performance.
- **CTA**: "Launch App" or "Setup Account" button.

## 2. Password Reset
- **Context**: Requested from the Login screen.
- **Body**: "You requested a password reset. Hopefully, this wasn't the pig. Click the button below to secure your account and get back to the chaos."
- **CTA**: "Reset Password" button.
- **Note**: Includes a "If you didn't request this, just ignore it" disclaimer.

## 3. PIN Reset
- **Context**: Requested from the Lock screen (Admin/Manager role).
- **Body**: "A PIN reset was requested for your account. To regain access to your POS terminal and secure your administrative settings, please follow the link below."
- **CTA**: "Reset My PIN" button.

## 4. Promoted to Manager
- **Context**: Sent when an Admin changes a user's role to Manager.
- **Body**: "You have been promoted to Manager. You can now access the Back Office dashboard remotely. Please set a password to enable this feature."
- **CTA**: "Set Password" button.

---

## UI & Interaction Details
- **Theme**: Dark mode style (deep blue/black background, white text).
- **CTA Style**: Vibrant blue buttons with high contrast.
- **Next Steps**: Grouped cards with icons (Lock, Package) and chevron indicators.

## Metadata & State
- **Deep Linking**: CTA buttons should deep-link directly into the mobile app when possible.
- **Fallback**: Buttons fall back to a web-based portal if the app is not installed.

## Configuration
- **shell**: false
