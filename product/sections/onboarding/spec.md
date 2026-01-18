# Onboarding & Security Specification

This section covers the entry points of the application, including store registration, user login, PIN setup, and multi-path reset flows for passwords and PINs.

## 1. Authentication (Login & Registration)
- **Tab Switcher**: A segmented control to toggle between "REGISTER" and "LOGIN" views.
- **Login View**: 
    - **Email/Password Fields**: Standard text inputs for user credentials.
    - **Log In Button**: Primary action to authenticate existing users.
    - **Forgot Password Link**: Navigates to the password reset flow.
- **Register View**:
    - **User/Store Fields**: Full Name, Email, Store Name, and Password inputs.
    - **Create Store Button**: Primary action to create a new organization, store, and admin user.

## 2. Post-Registration Welcome
- **Welcome Header**: Branding with the "comPOST" logo and a friendly welcome message.
- **Next Steps Checklist**: A visual list of essential setup tasks. 
    - **Set PIN Item**: High-priority task to secure the account (applicable for Admin or Manager roles).
- **Launch App Button**: Final confirmation to proceed to the mode selection or main interface.

## 3. PIN Security & Setup
- **Create PIN Screen**:
    - **Numeric Entry**: 4-digit input using a custom numeric keypad.
    - **Visibility**: Digits are shown as entered (not masked) to ensure accuracy during setup.
    - **Confirm Action**: Saves the PIN and proceeds.
- **Enter PIN (Lock Screen)**:
    - **Security Mask**: Digits are replaced by dots for privacy during entry.
    - **4-Digit Input**: Visual dots to show entry progress.
    - **Footer Actions**: "Log out", "Change my PIN", and "Forgot PIN?" links at the bottom.
- **Change PIN Flow**:
    - **Step Indicator**: Clear "OLD" and "NEW" labels.
    - **Step 1**: Enter current PIN for verification.
    - **Step 2**: Enter and confirm a new 4-digit PIN.

## 4. Device Mode Selection
- **Mode Selector**: A dedicated choice screen between **Register (POS)** and **Back Office**.
- **Mode Descriptions**: Clear labels explaining that "Register" is for sales on the go, while "Back Office" is for analytics and inventory.

## 5. Password Reset Flow
- **Request Link**: Email entry field to receive a reset link.
- **Check Email**: A confirmation screen with an "Open Email App" deep-link button and a "Resend / Change Email" option.
- **Set New Password**: A secure entry field with a visibility toggle icon and an "Update Password" button.

## 6. PIN Reset Flow (Role-Based)
- **Role Selection**: "What is your role?" screen with options for "I am a Cashier" and "I am an Admin / Manager".
- **Admin/Manager Path**: Initiates an email-based reset flow similar to the password reset.
- **Cashier Path**: Displays a **"Contact Your Admin"** screen with a list of available **Admins** who can assist with the reset. Managers do not have permission to reset PINs.
- **Set New PIN**: The final step for both paths to establish a new 4-digit access code.

## Metadata & State
- **Persistence**: Store identity and user role are persisted locally after the first login.
- **Lock State**: App enters the Lock Screen (PIN entry) after inactivity or manual lock.
- **Role Permissions**: "Admin" role is required to reset others' PINs or change store-wide security settings.

## Navigation
- **Entry Flow**: Splash -> Login/Register -> Welcome -> PIN Setup -> Mode Selection.
- **Recovery Flow**: Forgot Password/PIN -> Verification -> Reset -> Login.
- **Access Control**: PIN entry is a prerequisite for accessing "Activity" and "Settings" from the main shell.

## Configuration
- **shell**: false
