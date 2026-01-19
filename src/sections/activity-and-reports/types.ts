// =============================================================================
// Activity & Reports - replicated design types
// =============================================================================

export type ActivityRole = 'CASHIER' | 'MANAGER' | 'ADMIN'

export type SummaryWidgetType = 'currency' | 'number' | 'negative'

export interface SummaryWidget {
  label: string
  value: number
  trend?: string
  count?: number
  type: SummaryWidgetType
}

export interface OrderItem {
  name: string
  qty: number
  price: number
  imageUrl?: string
}

export interface OrderRecord {
  id: string
  orderNumber: string
  timeLabel: string
  total: number
  isRefunded?: boolean
  items?: OrderItem[]
  customName?: string
  paymentMethod?: string
  createdBy?: string
  processedBy?: string
  refundedBy?: string
  refundReason?: string
}

export interface ExpenseAuditEvent {
  id: string
  description: string
}

export interface ExpenseItem {
  id: string
  name: string
  amount: number
  createdBy: string
  timeLabel: string
  note?: string
  isDeleted?: boolean
  auditEvents?: ExpenseAuditEvent[]
}

export interface ExpenseDayGroup {
  id: string
  label: string
  count: number
  total: number
  editsCount?: number
  isExpanded?: boolean
  items?: ExpenseItem[]
}

export interface PerformanceItem {
  name: string
  revenue: number
  quantity: number
}

export interface HourlyIncomePoint {
  time: string
  value: number
}

export interface ActivityReportsData {
  role: ActivityRole
  summary: SummaryWidget[]
  cashBreakdown?: { cash: number; card: number }
  hourlyIncome?: HourlyIncomePoint[]
  topRevenue?: PerformanceItem[]
  topQuantity?: PerformanceItem[]
  orders?: OrderRecord[]
  expenses?: ExpenseDayGroup[]
}

export function formatMoney(value: number) {
  return `$${value.toFixed(2)}`
}

export function getDefaultActivityReportsData(): ActivityReportsData {
  return {
    role: 'CASHIER',
    cashBreakdown: { cash: 310, card: 938.5 },
    summary: [
      { label: 'Total income', value: 1248.5, trend: '+15% vs yesterday', type: 'currency' },
      { label: 'Net profit', value: 842.1, trend: '+12% vs yesterday', type: 'currency' },
      { label: 'Expenses', value: 406.4, count: 4, type: 'currency' },
      { label: 'Refunds', value: -24.5, type: 'negative' },
      { label: 'Refunds count', value: 2, type: 'number' },
      { label: 'In drawer', value: 460, type: 'currency' },
      { label: 'Total orders', value: 142, trend: '+18%', type: 'number' },
    ],
    hourlyIncome: [
      { time: '8am', value: 90 },
      { time: '9am', value: 140 },
      { time: '10am', value: 130 },
      { time: '11am', value: 260 },
      { time: '12pm', value: 210 },
      { time: '2pm', value: 310 },
      { time: '3pm', value: 250 },
      { time: '4pm', value: 340 },
    ],
    topRevenue: [
      { name: 'Cappuccino', revenue: 420, quantity: 76 },
      { name: 'Avocado toast', revenue: 315, quantity: 52 },
      { name: 'Iced matcha', revenue: 280, quantity: 34 },
      { name: 'Cold brew', revenue: 240, quantity: 40 },
      { name: 'Flat white', revenue: 210, quantity: 28 },
    ],
    topQuantity: [
      { name: 'Latte', revenue: 0, quantity: 84 },
      { name: 'Cappuccino', revenue: 0, quantity: 76 },
      { name: 'Croissant', revenue: 0, quantity: 62 },
    ],
    orders: [
      { id: 'o403', orderNumber: 'Order #403', timeLabel: '10:45 am', total: 14.5 },
      {
        id: 'o402',
        orderNumber: 'Order #402',
        timeLabel: '10:42 am',
        total: 29.9,
        isRefunded: true,
        items: [
          { name: 'Cappuccino', qty: 1, price: 4.5, imageUrl: 'https://picsum.photos/seed/cappuccino/88' },
          { name: 'Avocado toast', qty: 1, price: 12, imageUrl: 'https://picsum.photos/seed/avocado-toast/88' },
          { name: 'Iced matcha', qty: 1, price: 11, imageUrl: 'https://picsum.photos/seed/iced-matcha/88' },
        ],
        customName: 'Table 1',
        paymentMethod: 'Visa •••• 2422',
        createdBy: 'Sarah Jackson',
        processedBy: 'Karel Martinek',
        refundedBy: 'Mike Ross',
        refundReason: 'Damaged item',
      },
      { id: 'o401', orderNumber: 'Order #401', timeLabel: '10:38 am', total: 8.5, isRefunded: true },
      { id: 'o400', orderNumber: 'Order #400', timeLabel: '10:35 am', total: 12 },
    ],
    expenses: [
      { id: 'today', label: 'Today', count: 3, total: 14.5, isExpanded: false },
      {
        id: 'yesterday',
        label: 'Yesterday',
        count: 3,
        total: 1304.5,
        editsCount: 4,
        isExpanded: true,
        items: [
          {
            id: 'milk',
            name: 'Whole milk',
            amount: 4.5,
            createdBy: 'Sarah Jackson',
            timeLabel: 'Yesterday at 10:42 am',
            note: 'Put some text here',
          },
          {
            id: 'rent',
            name: 'Rent',
            amount: 1250,
            createdBy: 'Freddy Gasper',
            timeLabel: 'Yesterday at 10:50 am',
            note: 'Monthly office rent',
            auditEvents: [
              { id: 'a1', description: 'Freddy Gasper changed name from “Banana” to “Rent” yesterday at 10:50 am' },
            ],
          },
          {
            id: 'coffee',
            name: 'Coffee beans',
            amount: 50,
            createdBy: 'Sarah Jackson',
            timeLabel: 'Yesterday at 09:15 am',
            note: 'Dark roast',
            isDeleted: true,
            auditEvents: [
              { id: 'a1', description: 'Sarah Jackson changed price from $45.00 to $50.00 yesterday at 09:20 am' },
              { id: 'a2', description: 'Sarah Jackson changed note from “Light roast” to “Dark roast” yesterday at 09:20 am' },
              { id: 'a3', description: 'Sarah Jackson deleted expense yesterday at 09:25 am' },
            ],
          },
        ],
      },
      { id: 'oct-24', label: 'Thursday, Oct 24', count: 2, total: 8.5, isExpanded: false },
      { id: 'oct-23', label: 'Wednesday, Oct 23', count: 1, total: 12, isExpanded: false },
    ],
  }
}

