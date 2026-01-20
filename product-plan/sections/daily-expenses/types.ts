// =============================================================================
// Data Types
// =============================================================================

export interface ExpenseTemplate {
  id: string;
  name: string;
  icon?: string;
  taxRate: number;
}

export interface ExpenseFolder {
  id: string;
  name: string;
  icon?: string;
}

export interface ExpenseEntry {
  id: string;
  templateId?: string;
  name: string;
  amount: number;
  taxRate: number;
  note?: string;
  timestamp: string;
}

export interface ExpenseSummary {
  subtotal: number;
  tax: number;
  total: number;
}

// =============================================================================
// Component Props
// =============================================================================

export interface DailyExpensesProps {
  /** Pinned expense templates for quick access */
  favorites: ExpenseTemplate[];
  /** Folders for browsing expense categories */
  folders: ExpenseFolder[];
  /** List of expenses logged today */
  todayExpenses: ExpenseEntry[];
  /** Financial summary for today's logging session */
  summary: ExpenseSummary;
  /** Called when a favorite or template is tapped to log */
  onLogExpense?: (templateId: string, amount: number, note?: string) => void;
  /** Called for ad-hoc custom expense entry */
  onLogCustomExpense?: (name: string, amount: number, taxRate: number, note?: string) => void;
  /** Called to edit an existing entry */
  onEditExpense?: (id: string, updates: Partial<ExpenseEntry>) => void;
  /** Called to delete an entry */
  onDeleteExpense?: (id: string) => void;
  /** Called when navigating into a folder */
  onOpenFolder?: (folderId: string) => void;
}
