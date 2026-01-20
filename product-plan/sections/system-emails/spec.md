# System Emails Specification

Transactional emails for the ComPOSt ecosystem. All emails follow a consistent structure designed for clarity, accessibility, and brand recognition.

## Master Template (Required Elements)
- **Goal**: Every email should be easy to understand in 10 seconds and safe to act on.
- **What every email includes**:
  - **Brand header** (optional): Logo or header image reference, consistent across emails when present.
  - **Subject**: Clear and action-oriented, matching what triggered the email.
  - **Title**: One short line that tells the reader what this is about.
  - **Body**: What happened, why the reader is getting this, and what to do next (if anything).
  - **Primary action link** (only when needed): One clear URL for the main action (e.g., reset password).
  - **Safety note** (when needed): “If you didn’t request this, ignore it.”
  - **Footer**: Legal/compliance text and any relevant store/account context.
- **Accessibility**:
  - The email must still make sense if images don’t load.
  - The primary action must be a normal, copyable link (not only a styled element).

---

## 1. Welcome / Invitation Email
- **Context**: Sent to the Store Owner immediately after registration, or to a new Admin/Manager when they are invited to join the store.
- **Required content**:
  - A welcome message confirming access to the store.
  - A short “next steps” checklist (keep it simple) that includes:
    - Establishing a PIN (required for Admin/Manager access on the device)
    - Getting started with core store operations (e.g., viewing activity or configuring inventory)
- **Primary action**:
  - Prefer opening the app directly when available; otherwise use a web fallback that completes the same acceptance/setup.

## 2. Password Reset
- **Context**: Triggered when a user requests a password reset.
- **Primary action**:
  - A single-use password reset link.
- **Business rules/constraints**:
  - The reset link must expire after a configured time window.
  - The reset link must be invalidated after successful password update.
- **Required content**:
  - A plain explanation that a reset was requested.
  - A clear “ignore this if it wasn’t you” safety note.

## 3. PIN Reset
- **Context**: Triggered when an Admin/Manager initiates a PIN reset via the approved recovery mechanism.
- **Primary action**:
  - A single-use PIN reset link that re-establishes device access credentials.
- **Business rules/constraints**:
  - The reset link must expire after a configured time window.
  - The reset link must be invalidated after successful PIN update.
- **Required content**:
  - A plain explanation that a PIN reset was requested.
  - A clear “ignore this if it wasn’t you” safety note.

## 4. Promoted to Manager
- **Context**: Sent when an Admin changes a user's role to Manager.
- **Required content**:
  - Confirmation that the role is now Manager and what that unlocks.
  - A short explanation of what’s required to enable remote access (set a password).
- **Primary action**:
  - A deep link or web link to set a password (or complete invitation acceptance if not yet accepted).

---

## Metadata & State
- **Deep Linking**: When possible, action links should open the app directly.
- **Fallback**: If the app isn’t installed, action links should land in a web portal that can complete the same action.

## Configuration
- **shell**: false
