import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ExpenseFolder {
    id: string
    name: string
}

export interface ExpenseProduct {
    id: string
    name: string
    folderId?: string | null
    defaultPrice?: number
    color?: string
    strokeStyle?: 'none' | 'common' | 'dashed' | 'dotted' | 'double' | 'solid' // Extended for compatibility, but UI might only support subset for now
    icon?: string // Optional icon name
    isFavorite?: boolean
}

interface ExpenseProductsState {
    folders: ExpenseFolder[]
    products: ExpenseProduct[]

    addFolder: (name: string) => string // Returns ID
    updateFolder: (id: string, name: string) => void
    removeFolder: (id: string) => void

    addProduct: (product: Omit<ExpenseProduct, 'id'>) => void
    updateProduct: (id: string, updates: Partial<ExpenseProduct>) => void
    removeProduct: (id: string) => void
    toggleFavorite: (id: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useExpenseProductsStore = create<ExpenseProductsState>()(
    persist(
        (set) => ({
            folders: [
                { id: 'operations', name: 'Operations' },
                { id: 'marketing', name: 'Marketing' },
                { id: 'utilities', name: 'Utilities' },
                { id: 'inventory', name: 'Inventory' },
            ],
            products: [
                { id: "beans", name: "Coffee beans", defaultPrice: 45.00, color: 'surface', folderId: 'inventory', isFavorite: true },
                { id: "milk-oat", name: "Oat milk", defaultPrice: 4.50, color: 'blue', folderId: 'inventory', isFavorite: true },
                { id: "rent", name: "Monthly rent", defaultPrice: 1500.00, color: 'gradient-blue', folderId: 'operations', isFavorite: true },
                { id: "cleaning", name: "Cleaning supplies", defaultPrice: 12.00, color: 'green', folderId: 'operations', isFavorite: true },
                { id: "ads", name: "Social ads", defaultPrice: 50.00, color: 'gradient-orange', folderId: 'marketing', isFavorite: true },
                { id: "electricity", name: "Electricity", defaultPrice: 120.00, color: 'amber', folderId: 'utilities', isFavorite: true },

                // Solid Colors
                { id: "exp-blue", name: "Blue Product", defaultPrice: 10, color: "blue", folderId: 'operations' },
                { id: "exp-green", name: "Green Product", defaultPrice: 10, color: "green", folderId: 'operations' },
                { id: "exp-red", name: "Red Product", defaultPrice: 10, color: "red", folderId: 'operations' },
                { id: "exp-amber", name: "Amber Product", defaultPrice: 10, color: "amber", folderId: 'operations' },
                { id: "exp-purple", name: "Purple Product", defaultPrice: 10, color: "purple", folderId: 'operations' },
                { id: "exp-orange", name: "Orange Product", defaultPrice: 10, color: "orange", folderId: 'marketing' },
                { id: "exp-sky", name: "Sky Product", defaultPrice: 10, color: "sky", folderId: 'marketing' },
                { id: "exp-pink", name: "Pink Product", defaultPrice: 10, color: "pink", folderId: 'marketing' },
                { id: "exp-indigo", name: "Indigo Product", defaultPrice: 10, color: "indigo", folderId: 'utilities' },

                // Gradients
                { id: "exp-grad-blue", name: "Blue Gradient", defaultPrice: 20, color: "gradient-blue", folderId: 'utilities' },
                { id: "exp-grad-green", name: "Green Gradient", defaultPrice: 20, color: "gradient-green", folderId: 'inventory' },
                { id: "exp-grad-purple", name: "Purple Gradient", defaultPrice: 20, color: "gradient-purple", folderId: 'marketing' },
            ],

            addFolder: (name) => {
                const id = generateId()
                set(state => ({ folders: [...state.folders, { id, name }] }))
                return id
            },

            updateFolder: (id, name) => {
                set(state => ({
                    folders: state.folders.map(f => f.id === id ? { ...f, name } : f)
                }))
            },

            removeFolder: (id) => {
                set(state => ({
                    folders: state.folders.filter(f => f.id !== id),
                    // Optional: Remove folderId from products in this folder?
                    products: state.products.map(p => p.folderId === id ? { ...p, folderId: null } : p)
                }))
            },

            addProduct: (product) => {
                const newProduct: ExpenseProduct = {
                    id: generateId(),
                    ...product
                }
                set(state => ({ products: [...state.products, newProduct] }))
            },

            updateProduct: (id, updates) => {
                set(state => ({
                    products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
                }))
            },

            removeProduct: (id) => {
                set(state => ({ products: state.products.filter(p => p.id !== id) }))
            },

            toggleFavorite: (id) => {
                set(state => ({
                    products: state.products.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
                }))
            }
        }),
        {
            name: 'compost-expense-products-storage-v5',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
