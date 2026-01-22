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
}

interface InventoryState {
    items: InventoryItem[]
    addItem: (item: InventoryItem) => void
    updateItem: (id: string, updates: Partial<InventoryItem>) => void
    deleteItem: (id: string) => void
    toggleFavorite: (id: string) => void
}

const INITIAL_ITEMS: InventoryItem[] = [
    {
        id: "cappuccino",
        name: "Cappuccino",
        price: 4.5,
        imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop",
        imageAlt: "Cappuccino",
    },
    {
        id: "macchiato",
        name: "Macchiato",
        price: 3.25,
        imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop",
        imageAlt: "Macchiato",
        isFavorite: true,
    },
    {
        id: "americano",
        name: "Americano",
        price: 4.75,
        imageSrc: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=256&auto=format&fit=crop",
        imageAlt: "Americano",
    },
    { id: "latte", name: "Latte", price: 4.75, imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=256&auto=format&fit=crop", imageAlt: "Latte", isFavorite: true },
    { id: "flat-white", name: "Flat White", price: 4.5, imageSrc: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=256&auto=format&fit=crop", imageAlt: "Flat White", isFavorite: true },
    { id: "mocha", name: "Mocha", price: 5.0, imageSrc: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop", imageAlt: "Mocha", isFavorite: true },
    { id: "espresso", name: "Espresso", price: 3.0, imageAlt: "Espresso", isFavorite: true },
    { id: "cold-brew", name: "Cold Brew", price: 4.5, imageSrc: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=256&auto=format&fit=crop", imageAlt: "Cold Brew", isFavorite: true },
    { id: "matcha", name: "Matcha", price: 5.25, imageAlt: "Matcha", isFavorite: true },
    { id: "cortado", name: "Cortado", price: 4.0, imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop", imageAlt: "Cortado" },
    { id: "drip", name: "Drip", price: 3.0, imageAlt: "Drip" },
    { id: "hot-chocolate", name: "Hot Chocolate", price: 4.25, imageAlt: "Hot Chocolate" },
    { id: "tea", name: "Tea", price: 2.75, imageAlt: "Tea" },
    { id: "taro-latte", name: "Taro Latte", price: 5.5, imageAlt: "Taro Latte", isFavorite: true },
    { id: "iced-matcha", name: "Iced Matcha", price: 5.25, imageAlt: "Iced Matcha" },
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
            name: 'compost-inventory-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
