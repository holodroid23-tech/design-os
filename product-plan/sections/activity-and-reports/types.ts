// =============================================================================
// Data Types
// =============================================================================

export interface SummaryWidget {
  label: string;
  value: number;
  trend?: string;
  count?: number;
  type: 'currency' | 'number' | 'negative';
}

export interface SaleRecord {
  id: string;
  orderNumber: string;
  tableName?: string;
  total: number;
  timestamp: string;
  processedBy: string;
  paymentMethod: string;
  items?: { name: string; quantity: number; price: number }[];
  isRefunded?: boolean;
  refundReason?: string;
}

export interface ExpenseRecord {
  id: string;
  name: string;
  amount: number;
  timestamp: string;
  loggedBy: string;
  category: string;
  hasAudit?: boolean;
}

export interface PerformanceItem {
  name: string;
  value: number;
  revenue: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

// =============================================================================
// Component Props
// =============================================================================

export interface ActivityReportsProps {
  /** Aggregated KPI cards */
  summary: SummaryWidget[];
  /** List of recent sales for the selected period */
  recentSales: SaleRecord[];
  /** List of recent expenses for the selected period */
  recentExpenses: ExpenseRecord[];
  /** Top performing items data for charts */
  topItems: PerformanceItem[];
  /** Hourly revenue data for the line chart */
  hourlyIncome: ChartDataPoint[];
  /** The current user's role (determines view depth) */
  userRole: 'CASHIER' | 'MANAGER' | 'ADMIN';
  /** Called to change the active date range */
  onDateRangeChange?: (range: string) => void;
  /** Called to initiate a refund for a sale */
  onRefundSale?: (saleId: string, reason: string) => void;
  /** Called to export the current view data to CSV */
  onExportData?: () => void;
  /** Called to view detailed audit trail for an expense */
  onViewAudit?: (expenseId: string) => void;
  /** Called to edit a historical expense (within 40-day window) */
  onEditExpense?: (expenseId: string) => void;
}
