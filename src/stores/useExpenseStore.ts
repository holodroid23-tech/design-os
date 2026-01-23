import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ExpenseItem {
    id: string
    name: string
    amount: number
    category?: string
    date: string // ISO string
    imageSrc?: string
    imageAlt?: string
    color?: string
    strokeStyle?: string
}

interface ExpenseState {
    expenses: ExpenseItem[]
    addExpense: (expense: Omit<ExpenseItem, 'id'>) => void
    removeExpense: (id: string) => void
    getTodayExpenses: () => ExpenseItem[]
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useExpenseStore = create<ExpenseState>()(
    persist(
        (set, get) => ({
            expenses: [],

            addExpense: (item) => {
                const newItem: ExpenseItem = {
                    ...item,
                    id: generateId(),
                    date: item.date || new Date().toISOString(),
                }
                set(state => ({ expenses: [...state.expenses, newItem] }))
            },

            removeExpense: (id) => {
                set(state => ({ expenses: state.expenses.filter(e => e.id !== id) }))
            },

            getTodayExpenses: () => {
                const { expenses } = get()
                // Filter by today (simple implementation)
                const today = new Date().toDateString()
                return expenses.filter(e => new Date(e.date).toDateString() === today)
            }
        }),
        {
            name: 'compost-expenses-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
