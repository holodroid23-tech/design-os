import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ExpenseFolder {
    id: string
    name: string
    color?: string
    isVisible?: boolean
}

export interface ExpenseProduct {
    id: string
    name: string
    folderId?: string | null
    defaultPrice?: number
    lastPrices?: number[] // Keep last 3 prices
    color?: string
    strokeStyle?: 'none' | 'common' | 'dashed' | 'dotted' | 'double' | 'solid'
    icon?: string
    isFavorite?: boolean
    isVisible?: boolean
}

interface ExpenseProductsState {
    folders: ExpenseFolder[]
    products: ExpenseProduct[]

    addFolder: (name: string) => string
    updateFolder: (id: string, updates: Partial<ExpenseFolder>) => void
    removeFolder: (id: string) => void

    addProduct: (product: Omit<ExpenseProduct, 'id'>) => void
    updateProduct: (id: string, updates: Partial<ExpenseProduct>) => void
    updateProductPrices: (id: string, newPrice: number) => void
    removeProduct: (id: string) => void
    toggleFavorite: (id: string) => void
    toggleFolderVisibility: (id: string) => void
    toggleProductVisibility: (id: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useExpenseProductsStore = create<ExpenseProductsState>()(
    persist(
        (set) => ({
            folders: [
                { id: 'operations', name: 'Operations', color: 'purple' },
                { id: 'marketing', name: 'Marketing', color: 'pink' },
                { id: 'utilities', name: 'Utilities', color: 'sky' },
                { id: 'inventory', name: 'Inventory', color: 'indigo' },
            ],
            products: [
                // Inventory
                { id: "paper-cups-8oz", name: "Paper Cups 8oz", defaultPrice: 45.00, color: 'surface', folderId: 'inventory' },
                { id: "paper-cups-12oz", name: "Paper Cups 12oz", defaultPrice: 50.00, color: 'surface', folderId: 'inventory' },
                { id: "paper-cups-16oz", name: "Paper Cups 16oz", defaultPrice: 55.00, color: 'surface', folderId: 'inventory' },
                { id: "lids-universal", name: "Universal Lids", defaultPrice: 40.00, color: 'surface', folderId: 'inventory' },
                { id: "sugar-white", name: "White Sugar", defaultPrice: 15.00, color: 'surface', folderId: 'inventory' },
                { id: "sugar-brown", name: "Brown Sugar", defaultPrice: 18.00, color: 'surface', folderId: 'inventory' },
                { id: "syrup-vanilla", name: "Vanilla Syrup", defaultPrice: 12.00, color: 'amber', folderId: 'inventory' },
                { id: "syrup-caramel", name: "Caramel Syrup", defaultPrice: 12.00, color: 'amber', folderId: 'inventory' },
                { id: "syrup-hazelnut", name: "Hazelnut Syrup", defaultPrice: 12.00, color: 'amber', folderId: 'inventory' },
                { id: "chai-con", name: "Chai Concentrate", defaultPrice: 24.00, color: 'orange', folderId: 'inventory', isFavorite: true },
                { id: "matcha-pow", name: "Matcha Powder", defaultPrice: 60.00, color: 'green', folderId: 'inventory', isFavorite: true },
                { id: "cocoa-pow", name: "Cocoa Powder", defaultPrice: 30.00, color: 'surface', folderId: 'inventory' },
                { id: "napkins", name: "Napkins", defaultPrice: 25.00, color: 'surface', folderId: 'inventory' },
                { id: "stirrers", name: "Wooden Stirrers", defaultPrice: 10.00, color: 'surface', folderId: 'inventory' },
                { id: "trash-bags", name: "Trash Bags", defaultPrice: 18.00, color: 'surface', folderId: 'inventory' },
                { id: "milk-whole", name: "Whole Milk", defaultPrice: 3.50, color: 'blue', folderId: 'inventory' },
                { id: "milk-skim", name: "Skim Milk", defaultPrice: 3.50, color: 'sky', folderId: 'inventory' },
                { id: "milk-soy", name: "Soy Milk", defaultPrice: 4.00, color: 'surface', folderId: 'inventory' },
                { id: "milk-almond", name: "Almond Milk", defaultPrice: 4.50, color: 'surface', folderId: 'inventory' },
                { id: "coffee-filters", name: "Coffee Filters", defaultPrice: 8.00, color: 'surface', folderId: 'inventory' },
                { id: "tea-bags-black", name: "Black Tea Bags", defaultPrice: 12.00, color: 'surface', folderId: 'inventory' },
                { id: "tea-bags-green", name: "Green Tea Bags", defaultPrice: 12.00, color: 'green', folderId: 'inventory' },
                { id: "tea-bags-herbal", name: "Herbal Tea Bags", defaultPrice: 14.00, color: 'pink', folderId: 'inventory' },
                { id: "pastry-croissant", name: "Croissants (Dzn)", defaultPrice: 24.00, color: 'orange', folderId: 'inventory' },
                { id: "pastry-muffin", name: "Muffins (Dzn)", defaultPrice: 22.00, color: 'orange', folderId: 'inventory' },
                { id: "aprons", name: "Aprons", defaultPrice: 15.00, color: 'surface', folderId: 'inventory' },
                { id: "towels", name: "Bar Towels", defaultPrice: 20.00, color: 'surface', folderId: 'inventory' },
                { id: "sanitizer", name: "Sanitizer", defaultPrice: 40.00, color: 'blue', folderId: 'inventory' },
                { id: "gloves", name: "Latex Gloves", defaultPrice: 15.00, color: 'blue', folderId: 'inventory' },
                { id: "receipt-paper", name: "Receipt Paper", defaultPrice: 35.00, color: 'surface', folderId: 'inventory' },

                // Legacy / Existing Items
                { id: "beans", name: "Coffee beans", defaultPrice: 45.00, color: 'surface', folderId: 'inventory', isFavorite: true },
                { id: "milk-oat", name: "Oat milk", defaultPrice: 4.50, color: 'blue', folderId: 'inventory', isFavorite: true },
                { id: "rent", name: "Monthly rent", defaultPrice: 1500.00, color: 'gradient-blue', folderId: 'operations', isFavorite: true },
                { id: "cleaning", name: "Cleaning supplies", defaultPrice: 12.00, color: 'green', folderId: 'operations', isFavorite: true },
                { id: "ads", name: "Social ads", defaultPrice: 50.00, color: 'gradient-orange', folderId: 'marketing', isFavorite: true },
                { id: "electricity", name: "Electricity", defaultPrice: 120.00, color: 'amber', folderId: 'utilities', isFavorite: true },
                { id: "gas", name: "Gas", defaultPrice: 80.00, color: 'red', folderId: 'utilities', isFavorite: true },
                { id: "water", name: "Water", defaultPrice: 60.00, color: 'sky', folderId: 'utilities', isFavorite: true },
                { id: "internet", name: "Internet", defaultPrice: 75.00, color: 'purple', folderId: 'utilities', isFavorite: true },
                { id: "repairs", name: "Repairs", defaultPrice: 200.00, color: 'orange', folderId: 'operations', isFavorite: true },
                { id: "salaries", name: "Salaries", defaultPrice: 3000.00, color: 'gradient-green', folderId: 'operations', isFavorite: true },
                { id: "software", name: "Software Subs", defaultPrice: 100.00, color: 'gradient-purple', folderId: 'operations', isFavorite: true },
                { id: "printing", name: "Printing", defaultPrice: 30.00, color: 'indigo', folderId: 'marketing', isFavorite: true },

                // Operations
                { id: "pest-control", name: "Pest Control", defaultPrice: 85.00, color: 'blue', folderId: 'operations' },
                { id: "waste-disposal", name: "Waste Disposal", defaultPrice: 120.00, color: 'blue', folderId: 'operations' },
                { id: "laundry-towels", name: "Towel Laundry", defaultPrice: 45.00, color: 'sky', folderId: 'operations', isFavorite: true },
                { id: "pos-paper", name: "POS Paper Rolls", defaultPrice: 22.00, color: 'surface', folderId: 'operations' },
                { id: "cleaning-spray", name: "Surface Cleaner", defaultPrice: 8.00, color: 'green', folderId: 'operations' },
                { id: "mop-heads", name: "Mop Heads", defaultPrice: 15.00, color: 'surface', folderId: 'operations' },
                { id: "hand-soap", name: "Hand Soap", defaultPrice: 12.00, color: 'green', folderId: 'operations' },
                { id: "dish-soap", name: "Dish Soap", defaultPrice: 25.00, color: 'green', folderId: 'operations' },
                { id: "sponges", name: "Sponges", defaultPrice: 10.00, color: 'surface', folderId: 'operations' },
                { id: "accountant", name: "Accountant", defaultPrice: 400.00, color: 'purple', folderId: 'operations' },
                { id: "licensing", name: "License Fee", defaultPrice: 150.00, color: 'purple', folderId: 'operations' },
                { id: "insurance", name: "Insurance", defaultPrice: 220.00, color: 'purple', folderId: 'operations' },
                { id: "window-clean", name: "Window Clean", defaultPrice: 60.00, color: 'blue', folderId: 'operations' },
                { id: "equip-maint", name: "Equip Maint", defaultPrice: 150.00, color: 'orange', folderId: 'operations' },

                // Marketing
                { id: "flyers-dist", name: "Flyer Distrib", defaultPrice: 100.00, color: 'orange', folderId: 'marketing' },
                { id: "promo-cards", name: "Loyalty Cards", defaultPrice: 60.00, color: 'orange', folderId: 'marketing' },
                { id: "chalkboard", name: "Chalkboard Art", defaultPrice: 50.00, color: 'surface', folderId: 'marketing' },
                { id: "sponsor", name: "Sponsorship", defaultPrice: 250.00, color: 'gradient-purple', folderId: 'marketing' },
                { id: "insta-boost", name: "IG Boost", defaultPrice: 30.00, color: 'gradient-orange', folderId: 'marketing', isFavorite: true },
                { id: "email-sub", name: "Email Mktg", defaultPrice: 45.00, color: 'blue', folderId: 'marketing' },
                { id: "web-hosting", name: "Web Hosting", defaultPrice: 20.00, color: 'blue', folderId: 'marketing' },
                { id: "domain", name: "Domain Renewal", defaultPrice: 15.00, color: 'blue', folderId: 'marketing' },

                // Utilities
                { id: "phone-bill", name: "Phone Bill", defaultPrice: 45.00, color: 'sky', folderId: 'utilities' },
                { id: "spotify", name: "Spotify Biz", defaultPrice: 35.00, color: 'green', folderId: 'utilities', isFavorite: true },
                { id: "hvac", name: "HVAC Service", defaultPrice: 150.00, color: 'red', folderId: 'utilities' },
                { id: "security-mon", name: "Security Monit", defaultPrice: 50.00, color: 'red', folderId: 'utilities' },

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
                set(state => ({ folders: [...state.folders, { id, name, isVisible: true }] }))
                return id
            },

            updateFolder: (id, updates) => {
                set(state => ({
                    folders: state.folders.map(f => f.id === id ? { ...f, ...updates } : f)
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
                    ...product,
                    isVisible: true
                }
                set(state => ({ products: [...state.products, newProduct] }))
            },

            updateProduct: (id, updates) => {
                set(state => ({
                    products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
                }))
            },

            updateProductPrices: (id, newPrice) => {
                set(state => ({
                    products: state.products.map(p => {
                        if (p.id === id) {
                            const currentPrices = p.lastPrices || []
                            // Add to front, remove duplicates, take first 3
                            const updatedPrices = [newPrice, ...currentPrices.filter(pr => pr !== newPrice)].slice(0, 3)
                            return { ...p, lastPrices: updatedPrices }
                        }
                        return p
                    })
                }))
            },

            removeProduct: (id) => {
                set(state => ({ products: state.products.filter(p => p.id !== id) }))
            },

            toggleFavorite: (id) => {
                set(state => ({
                    products: state.products.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
                }))
            },

            toggleFolderVisibility: (id) => {
                set(state => ({
                    folders: state.folders.map(f => f.id === id ? { ...f, isVisible: f.isVisible === false ? true : false } : f)
                }))
            },

            toggleProductVisibility: (id) => {
                set(state => ({
                    products: state.products.map(p => p.id === id ? { ...p, isVisible: p.isVisible === false ? true : false } : p)
                }))
            }
        }),
        {
            name: 'compost-expense-products-storage-v6',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
