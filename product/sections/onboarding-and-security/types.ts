// =============================================================================
// Data Types
// =============================================================================

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface AdminContact {
  id: string;
  name: string;
  email: string;
}

export type DeviceMode = 'REGISTER' | 'BACK_OFFICE';

// =============================================================================
// Component Props
// =============================================================================

export interface OnboardingAndSecurityProps {
  /** Setup progress checklist items */
  checklist: ChecklistItem[];
  /** List of admins for the "Contact Your Admin" recovery screen */
  admins: AdminContact[];
  /** Current device operating mode */
  currentMode: DeviceMode;
  /** Called during login or registration */
  onAuthenticate?: (data: any, isRegister: boolean) => void;
  /** Called when setting or changing a PIN */
  onSetPin?: (pin: string) => void;
  /** Called when a checklist task is tapped */
  onTaskClick?: (taskId: string) => void;
  /** Called when switching device operating mode */
  onSwitchMode?: (mode: DeviceMode) => void;
  /** Called when requesting a password or PIN reset email */
  onRequestReset?: (email: string, type: 'PASSWORD' | 'PIN') => void;
  /** Called to finalize onboarding and security setup and launch the main app */
  onLaunchApp?: () => void;
}
