import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface InventoryItem {
    id: string
    name: string
    price: number
    categoryId?: string
    imageSrc?: string
    imageAlt?: string
    isFavorite?: boolean
    color?: string
}

interface InventoryState {
    items: InventoryItem[]
    addItem: (item: InventoryItem) => void
    updateItem: (id: string, updates: Partial<InventoryItem>) => void
    deleteItem: (id: string) => void
    toggleFavorite: (id: string) => void
}

const INITIAL_ITEMS: InventoryItem[] = [
    { id: "espresso", name: "Espresso", price: 3.0, color: "surface", isFavorite: true },
    { id: "macchiato", name: "Macchiato", price: 3.25, imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop", color: "surface", isFavorite: true },
    { id: "latte", name: "Latte", price: 4.75, imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=256&auto=format&fit=crop", color: "blue", isFavorite: true },
    { id: "flat-white", name: "Flat White", price: 4.5, imageSrc: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=256&auto=format&fit=crop", color: "orange", isFavorite: true },
    { id: "mocha", name: "Mocha", price: 5.0, imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop", color: "gradient-purple", isFavorite: true },
    { id: "matcha", name: "Matcha", price: 5.25, color: "green", isFavorite: true },
    { id: "taro-latte", name: "Taro Latte", price: 5.5, color: "purple", isFavorite: true },
    { id: "cold-brew", name: "Cold Brew", price: 4.5, imageSrc: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=256&auto=format&fit=crop", color: "sky", isFavorite: true },
    { id: "cortado", name: "Cortado", price: 4.0, color: "gradient-orange", isFavorite: true },

    // Solid Colors
    { id: "blue-item", name: "Blue Item", price: 1.0, color: "blue" },
    { id: "green-item", name: "Green Item", price: 1.0, color: "green" },
    { id: "red-item", name: "Red Item", price: 1.0, color: "red" },
    { id: "amber-item", name: "Amber Item", price: 1.0, color: "amber" },
    { id: "purple-item", name: "Purple Item", price: 1.0, color: "purple" },
    { id: "orange-item", name: "Orange Item", price: 1.0, color: "orange" },
    { id: "sky-item", name: "Sky Item", price: 1.0, color: "sky" },
    { id: "pink-item", name: "Pink Item", price: 1.0, color: "pink" },
    { id: "indigo-item", name: "Indigo Item", price: 1.0, color: "indigo" },
    { id: "lime-item", name: "Lime Item", price: 1.0, color: "lime" },
    { id: "teal-item", name: "Teal Item", price: 1.0, color: "teal" },

    // Gradients
    { id: "grad-blue-item", name: "Blue Gradient", price: 2.0, color: "gradient-blue" },
    { id: "grad-green-item", name: "Green Gradient", price: 2.0, color: "gradient-green" },
    { id: "grad-red-item", name: "Red Gradient", price: 2.0, color: "gradient-red" },
    { id: "grad-amber-item", name: "Amber Gradient", price: 2.0, color: "gradient-amber" },
    { id: "grad-purple-item", name: "Purple Gradient", price: 2.0, color: "gradient-purple" },
    { id: "grad-orange-item", name: "Orange Gradient", price: 2.0, color: "gradient-orange" },
]

export const useInventoryStore = create<InventoryState>()(
    persist(
        (set) => ({
            items: INITIAL_ITEMS,
            addItem: (item) => set((state) => ({ items: [...state.items, item] })),
            updateItem: (id, updates) =>
                set((state) => ({
                    items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
                })),
            deleteItem: (id) =>
                set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            toggleFavorite: (id) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, isFavorite: !i.isFavorite } : i
                    ),
                })),
        }),
        {
            name: 'compost-inventory-storage-v5',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
