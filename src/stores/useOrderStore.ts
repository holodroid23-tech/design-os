import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { InventoryItem } from './useInventoryStore'

export interface OrderItem {
    id: string // Helper ID (e.g., productId + details)
    productId: string
    name: string
    unitPrice: number
    qty: number
    imageSrc?: string
    imageAlt?: string
    color?: string
}

export interface OrderTab {
    id: string
    label: string
    items: OrderItem[]
}

interface OrderState {
    tabs: OrderTab[]
    activeTabId: string
    orderCounter: number

    setActiveTab: (id: string) => void
    addTab: (label?: string) => void
    removeTab: (id: string) => void
    updateTabLabel: (id: string, label: string) => void

    addItemToOrder: (tabId: string, product: InventoryItem) => void
    increaseItemQty: (tabId: string, itemId: string) => void
    decreaseItemQty: (tabId: string, itemId: string) => void
    removeItemFromOrder: (tabId: string, itemId: string) => void

    clearOrder: (tabId: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

const DEFAULT_TAB: OrderTab = {
    id: 'default-tab',
    label: 'Table 1',
    items: []
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            tabs: [DEFAULT_TAB],
            activeTabId: 'default-tab',
            orderCounter: 1,

            setActiveTab: (id) => set({ activeTabId: id }),

            addTab: (label) => {
                const newId = generateId()
                set(state => {
                    const currentCount = state.orderCounter
                    const newTab = {
                        id: newId,
                        label: label || `Table ${currentCount}`,
                        items: []
                    }
                    return {
                        tabs: [newTab, ...state.tabs],
                        activeTabId: newId,
                        orderCounter: currentCount + 1
                    }
                })
            },

            removeTab: (id) => {
                set(state => {
                    const newTabs = state.tabs.filter(t => t.id !== id)
                    // If we removed the active tab, switch to the last one available, or create a new default if empty
                    let nextActiveId = state.activeTabId
                    if (id === state.activeTabId) {
                        nextActiveId = newTabs.length > 0 ? newTabs[0].id : 'default-tab'
                    }

                    if (newTabs.length === 0) {
                        return {
                            tabs: [{ ...DEFAULT_TAB, id: 'default-tab' }],
                            activeTabId: 'default-tab'
                        }
                    }

                    return {
                        tabs: newTabs,
                        activeTabId: nextActiveId
                    }
                })
            },

            updateTabLabel: (id, label) => {
                set(state => ({
                    tabs: state.tabs.map(t => t.id === id ? { ...t, label } : t)
                }))
            },

            addItemToOrder: (tabId, product) => {
                set(state => ({
                    tabs: state.tabs.map(tab => {
                        if (tab.id !== tabId) return tab

                        // Check if item already exists
                        const existingItemIndex = tab.items.findIndex(i => i.productId === product.id)
                        if (existingItemIndex > -1) {
                            const newItems = [...tab.items]
                            newItems[existingItemIndex].qty += 1
                            return { ...tab, items: newItems }
                        } else {
                            // Add new
                            const newItem: OrderItem = {
                                id: product.id, // Simple ID mapping for now
                                productId: product.id,
                                name: product.name,
                                unitPrice: product.price,
                                qty: 1,
                                imageSrc: product.imageSrc,
                                imageAlt: product.imageAlt,
                                color: product.color
                            }
                            return { ...tab, items: [...tab.items, newItem] }
                        }
                    })
                }))
            },

            increaseItemQty: (tabId, itemId) => {
                set(state => ({
                    tabs: state.tabs.map(tab => {
                        if (tab.id !== tabId) return tab
                        return {
                            ...tab,
                            items: tab.items.map(item =>
                                item.id === itemId ? { ...item, qty: item.qty + 1 } : item
                            )
                        }
                    })
                }))
            },

            decreaseItemQty: (tabId, itemId) => {
                set(state => ({
                    tabs: state.tabs.map(tab => {
                        if (tab.id !== tabId) return tab
                        return {
                            ...tab,
                            items: tab.items.map(item => {
                                if (item.id === itemId) return { ...item, qty: Math.max(0, item.qty - 1) }
                                return item
                            }).filter(item => item.qty > 0)
                        }
                    })
                }))
            },

            removeItemFromOrder: (tabId, itemId) => {
                set(state => ({
                    tabs: state.tabs.map(tab => {
                        if (tab.id !== tabId) return tab
                        return {
                            ...tab,
                            items: tab.items.filter(item => item.id !== itemId)
                        }
                    })
                }))
            },

            clearOrder: (tabId) => {
                set(state => ({
                    tabs: state.tabs.map(tab => {
                        if (tab.id !== tabId) return tab
                        return { ...tab, items: [] }
                    })
                }))
            }
        }),
        {
            name: 'compost-orders-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
