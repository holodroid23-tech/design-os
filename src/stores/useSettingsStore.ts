import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ReceiptConfig } from '@/sections/settings-and-configuration/types'

interface PrinterSettings {
    connectedPrinterId: string | null
    connectedPrinterName: string | null
    printerStatus: 'CONNECTED' | 'DISCONNECTED' | 'SEARCHING' | 'ERROR'
    paperSize: '58mm' | '80mm'
}

interface SettingsState {
    currency: string
    taxRate: number
    taxName: string
    areTaxesEnabled: boolean

    // Printer settings
    printerSettings: PrinterSettings

    // Receipt configuration
    receiptConfig: ReceiptConfig

    // Logo and QR code images (base64)
    logoImage: string | null
    qrCodeImage: string | null

    // Developer/Debug settings
    useSimulatedTapToPay: boolean
    stripeBackendUrl: string
    stripeLocationId: string

    // Currency & Tax actions
    setCurrency: (currency: string) => void
    setTaxRate: (rate: number) => void
    setTaxName: (name: string) => void
    setTaxesEnabled: (enabled: boolean) => void

    // Printer actions
    setConnectedPrinter: (printerId: string | null, printerName: string | null) => void
    disconnectPrinter: () => void
    setPrinterStatus: (status: PrinterSettings['printerStatus']) => void
    setPaperSize: (size: '58mm' | '80mm') => void

    // Receipt configuration actions
    updateReceiptConfig: (updates: Partial<ReceiptConfig>) => void
    setLogoImage: (base64Image: string | null) => void
    setQrCodeImage: (base64Image: string | null) => void

    // Developer/Debug actions
    setSimulatedTapToPay: (enabled: boolean) => void
    setStripeBackendUrl: (url: string) => void
    setStripeLocationId: (id: string) => void
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            currency: 'Kč',
            taxRate: 0.08, // 8% default
            taxName: 'Tax',
            areTaxesEnabled: true,

            // Default printer settings
            printerSettings: {
                connectedPrinterId: null,
                connectedPrinterName: null,
                printerStatus: 'DISCONNECTED',
                paperSize: '58mm',
            },

            // Default receipt configuration
            receiptConfig: {
                showDate: true,
                showTime: true,
                showOrderId: true,
                showCashier: false,
                fontFamily: 'Monospace',
                fontSize: 'M',
                separatorStyle: 'Dashed',
                footerMessage: 'Thank you for visiting!',
                showQrCode: false,
                storeName: 'My Coffee Shop',
                storeAddress: '123 Espresso Lane, Seattle, WA 98101',
                storePhone: '(206) 555-0123',
            },

            logoImage: null,
            qrCodeImage: null,

            // Default to simulated mode for development (set false for production)
            useSimulatedTapToPay: true,
            // Default to the provided ID and a placeholder URL
            stripeBackendUrl: 'https://beatris-unhating-emmaline.ngrok-free.dev',
            stripeLocationId: 'tml_GXNjCAxtrU1n9x',

            setCurrency: (currency) => set({ currency }),
            setTaxRate: (rate) => set({ taxRate: rate }),
            setTaxName: (name) => set({ taxName: name }),
            setTaxesEnabled: (enabled) => set({ areTaxesEnabled: enabled }),

            setConnectedPrinter: (printerId, printerName) =>
                set((state) => ({
                    printerSettings: {
                        ...state.printerSettings,
                        connectedPrinterId: printerId,
                        connectedPrinterName: printerName,
                        printerStatus: printerId ? 'CONNECTED' : 'DISCONNECTED',
                    }
                })),

            disconnectPrinter: () =>
                set((state) => ({
                    printerSettings: {
                        ...state.printerSettings,
                        connectedPrinterId: null,
                        connectedPrinterName: null,
                        printerStatus: 'DISCONNECTED',
                    }
                })),

            setPrinterStatus: (status) =>
                set((state) => ({
                    printerSettings: {
                        ...state.printerSettings,
                        printerStatus: status,
                    }
                })),

            setPaperSize: (size) =>
                set((state) => ({
                    printerSettings: {
                        ...state.printerSettings,
                        paperSize: size,
                    }
                })),

            updateReceiptConfig: (updates) =>
                set((state) => ({
                    receiptConfig: {
                        ...state.receiptConfig,
                        ...updates,
                    }
                })),

            setLogoImage: (base64Image) => set({ logoImage: base64Image }),
            setQrCodeImage: (base64Image) => set({ qrCodeImage: base64Image }),
            setSimulatedTapToPay: (enabled) => set({ useSimulatedTapToPay: enabled }),
            setStripeBackendUrl: (url) => set({ stripeBackendUrl: url }),
            setStripeLocationId: (id) => set({ stripeLocationId: id }),
        }),
        {
            name: 'compost-settings-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
