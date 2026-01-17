export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  isFavorite?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  icon?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g., #402
  name: string; // e.g., Table 4
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export type PaymentMethod = 'CASH' | 'CARD_TAP' | 'CARD_EXTERNAL';

export interface PaymentRecord {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  timestamp: string;
  transactionId?: string;
  status: 'SUCCESS' | 'FAILED';
  failureReason?: string;
}
