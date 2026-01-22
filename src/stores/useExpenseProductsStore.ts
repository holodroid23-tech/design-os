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
        (set, get) => ({
            folders: [
                { id: 'operations', name: 'Operations' },
                { id: 'rent', name: 'Rent' },
                { id: 'utilities', name: 'Utilities' },
                { id: 'suppliers', name: 'Suppliers' },
            ],
            products: [
                { id: "oat-milk", name: "Oat milk", defaultPrice: 4.50, color: 'blue', strokeStyle: 'common', folderId: 'operations', isFavorite: false },
                { id: "cleaning", name: "Cleaning supplies", defaultPrice: 12.00, color: 'green', strokeStyle: 'common', folderId: 'operations', isFavorite: false },
                { id: "pastry-trays", name: "Pastry trays", defaultPrice: 5.00, color: 'orange', strokeStyle: 'dashed', folderId: 'operations', isFavorite: false },
                { id: "straws", name: "Straws", defaultPrice: 3.50, color: 'purple', strokeStyle: 'common', folderId: 'operations', isFavorite: false },
                { id: "milk", name: "Milk", defaultPrice: 3.00, color: 'blue', strokeStyle: 'common', folderId: 'operations', isFavorite: true },
                { id: "sugar", name: "Sugar", defaultPrice: 2.00, color: 'slate', strokeStyle: 'common', folderId: 'operations', isFavorite: true },
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
            name: 'compost-expense-products-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
