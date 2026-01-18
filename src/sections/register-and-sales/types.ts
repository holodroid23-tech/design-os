// =============================================================================
// Register & Sales (export-ready) types
// =============================================================================

export interface Product {
  id: string
  name: string
  price: number
  category: string
  isFavorite?: boolean
  taxRate: number
  image?: string
}

export interface ProductFolder {
  id: string
  name: string
  icon?: string
}

export interface OrderLineItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  orderNumber: string
  name: string
  items: OrderLineItem[]
  subtotal: number
  tax: number
  total: number
}

export type PaymentMethod = 'CASH' | 'CARD_TAP' | 'CARD_EXTERNAL'

export interface Payment {
  id: string
  orderId: string
  amount: number
  method: PaymentMethod
  timestamp: string
  transactionId?: string
  status: 'SUCCESS' | 'FAILED'
  failureReason?: string
}

