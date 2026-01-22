import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
    currency: string
    taxRate: number
    taxName: string
    areTaxesEnabled: boolean

    setCurrency: (currency: string) => void
    setTaxRate: (rate: number) => void
    setTaxName: (name: string) => void
    setTaxesEnabled: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            currency: '$',
            taxRate: 0.08, // 8% default
            taxName: 'Tax',
            areTaxesEnabled: true,

            setCurrency: (currency) => set({ currency }),
            setTaxRate: (rate) => set({ taxRate: rate }),
            setTaxName: (name) => set({ taxName: name }),
            setTaxesEnabled: (enabled) => set({ areTaxesEnabled: enabled }),
        }),
        {
            name: 'compost-settings-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
