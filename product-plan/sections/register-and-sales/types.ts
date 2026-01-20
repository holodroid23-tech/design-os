// =============================================================================
// Data Types
// =============================================================================

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  isFavorite?: boolean;
  taxRate: number;
  image?: string;
}

export interface ProductFolder {
  id: string;
  name: string;
  icon?: string;
}

export interface OrderLineItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  name: string;
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export type PaymentMethod = 'CASH' | 'CARD_TAP' | 'CARD_EXTERNAL';

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  timestamp: string;
  transactionId?: string;
  status: 'SUCCESS' | 'FAILED';
  failureReason?: string;
}

// =============================================================================
// Component Props
// =============================================================================

export interface RegisterProps {
  /** List of all available products */
  products: Product[];
  /** List of product folders for navigation */
  productFolders: ProductFolder[];
  /** List of currently active orders (tabs) */
  orders: Order[];
  /** ID of the order currently being viewed/edited */
  activeOrderId: string;
  /** Called when switching between order tabs */
  onSelectOrder?: (orderId: string) => void;
  /** Called when creating a new order tab */
  onCreateOrder?: () => void;
  /** Called when renaming an order tab */
  onRenameOrder?: (orderId: string, newName: string) => void;
  /** Called when deleting an order tab */
  onDeleteOrder?: (orderId: string) => void;
  /** Called when adding an item to the active order */
  onAddItem?: (productId: string) => void;
  /** Called when updating item quantity in the cart */
  onUpdateQuantity?: (lineItemId: string, delta: number) => void;
  /** Called when removing an item from the cart */
  onRemoveItem?: (lineItemId: string) => void;
  /** Called when initiating the payment flow */
  onCheckout?: (orderId: string, method: PaymentMethod) => void;
  /** Called to clear all items from an order */
  onClearOrder?: (orderId: string) => void;
}
