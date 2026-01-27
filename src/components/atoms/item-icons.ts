/**
 * Centralized icon definitions for Product Inventory and Expense items.
 * These base icons are used consistently across Settings, Orders, and Daily Expenses.
 */
import { ShoppingBag, Wallet, Folder } from "lucide-react"

/** Base icon for Product Inventory items (used in Orders, Settings) */
export const PRODUCT_ITEM_ICON = ShoppingBag

/** Base icon for Expense items (used in Daily Expenses, Settings) */
export const EXPENSE_ITEM_ICON = Wallet

/** Base icon for Folders (used in both Inventory and Expenses) */
export const FOLDER_ICON = Folder

// Re-export the icons for convenience
export { ShoppingBag, Wallet, Folder }
