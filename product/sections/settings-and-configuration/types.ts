// =============================================================================
// Data Types
// =============================================================================

export type UserRole = 'ADMIN' | 'MANAGER' | 'CASHIER';

export interface StaffUser {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  pin?: string;
}

export interface StoreInfo {
  name: string;
  address: string;
  email: string;
  website: string;
  currency: string;
  timeFormat: '12h' | '24h';
  pinLockTimer: '1m' | '2m' | '3m' | '5m' | '10m' | 'Never';
  version: string;
}

export interface TaxRule {
  id: string;
  label: string;
  rate: number;
  isDefault?: boolean;
}

export interface Printer {
  id: string;
  name: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'SEARCHING';
  paperSize: '58mm' | '80mm';
}

export interface ReceiptConfig {
  showDate: boolean;
  showTime: boolean;
  showOrderId: boolean;
  showCashier: boolean;
  fontFamily: 'Monospace' | 'Sans Serif';
  fontSize: 'S' | 'M' | 'L';
  separatorStyle: 'Dashed' | 'Dotted' | 'Solid';
  footerMessage: string;
  showQrCode: boolean;
  storeName?: string;
  storeAddress?: string;
  storePhone?: string;
}

export interface TapToPayStep {
  id: string;
  label: string;
  completed: boolean;
}

// =============================================================================
// Component Props
// =============================================================================

export interface SettingsProps {
  /** Basic store identity and display settings */
  storeInfo: StoreInfo;
  /** Currently logged in user profile */
  currentUser: { name: string; email: string; role: UserRole; initials: string };
  /** List of all staff members */
  staff: StaffUser[];
  /** Configured tax rules */
  taxes: TaxRule[];
  /** Configured hardware printers */
  printers: Printer[];
  /** Visual settings for receipts */
  receiptConfig: ReceiptConfig;
  /** Tap to Pay integration status */
  paymentSetup: { cashEnabled: boolean; externalCardEnabled: boolean; tapToPay: { status: string; steps: TapToPayStep[] } };
  /** Called when updating store identity */
  onUpdateStoreInfo?: (updates: Partial<StoreInfo>) => void;
  /** Called to invite a new Admin/Manager or add a Cashier */
  onAddUser?: (user: Partial<StaffUser>) => void;
  /** Called to remove a staff member */
  onRemoveUser?: (userId: string) => void;
  /** Called to update a tax rule */
  onUpdateTax?: (taxId: string, updates: Partial<TaxRule>) => void;
  /** Called to pair a new printer */
  onPairPrinter?: () => void;
  /** Called to update receipt design */
  onUpdateReceiptConfig?: (updates: Partial<ReceiptConfig>) => void;
  /** Called to toggle payment methods */
  onTogglePaymentMethod?: (method: string, enabled: boolean) => void;
}
