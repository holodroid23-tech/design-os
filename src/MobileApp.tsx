import * as React from "react"
import { ShoppingCart, ReceiptText, Activity, Settings } from "lucide-react"
import { AppShell } from "@/shell/components/AppShell"
import { hardwareService } from "@/lib/hardware-service"
import { receiptService } from "@/lib/receipt-service"
import { useOrderStore, type OrderTab } from "@/stores/useOrderStore"
import { useSettingsStore } from "@/stores/useSettingsStore"

// Replicated screens imports using the @product alias
import OrdersMain from "@product/sections/register-and-sales/replicated/OrdersMain"
import TodaysExpenses from "@product/sections/daily-expenses/replicated/TodaysExpenses"
import SettingsRoot from "@product/sections/settings-and-configuration/replicated/SettingsRoot"
import PaymentSuccessAllMethods from "@product/sections/register-and-sales/replicated/PaymentSuccessAllMethods"
import PrinterSettings from "@/sections/settings-and-configuration/PrinterSettings"
import GeneralSettings from "@product/sections/settings-and-configuration/replicated/GeneralSettings"
import ItemManagement from "@product/sections/settings-and-configuration/replicated/ItemManagement"
import UserProfile from "@product/sections/settings-and-configuration/replicated/UserProfile"
import UsersList from "@product/sections/settings-and-configuration/replicated/UsersList"
import DeviceMode from "@product/sections/settings-and-configuration/replicated/DeviceMode"
import ReceiptConfiguration from "@/sections/settings-and-configuration/ReceiptConfiguration"
import PaymentSettings from "@product/sections/settings-and-configuration/replicated/PaymentSettings"
import ExpenseManagement from "@product/sections/settings-and-configuration/replicated/ExpenseManagement"
import SuggestFeature from "@product/sections/settings-and-configuration/replicated/SuggestFeature"
import ReportBug from "@product/sections/settings-and-configuration/replicated/ReportBug"
import CreateExpense from "@product/sections/daily-expenses/replicated/CreateExpense"
import PaymentTerminalProcessing from "@product/sections/register-and-sales/replicated/PaymentTerminalProcessing"

import { useAuthStore } from "@/stores/useAuthStore"
import { AuthGate } from "@/components/auth/AuthGate"
import { DevTools } from "@/components/debug/DevTools"
import ActivityPolymorphicView from "@product/sections/activity-and-reports/replicated/ActivityPolymorphicView"

type AppView = 'orders' | 'expenses' | 'activity' | 'settings' | 'payment-success' | 'payment-terminal' |
    'settings-printer' | 'settings-general' | 'settings-inventory' | 'settings-users' | 'settings-profile' |
    'settings-device-mode' | 'settings-receipt' | 'settings-payment' | 'settings-expenses' |
    'settings-suggest-feature' | 'settings-report-bug'

export interface MobileAppProps {
    isFrame?: boolean
}

export default function MobileApp({ isFrame = false }: MobileAppProps) {
    const [activeView, setActiveView] = React.useState<AppView>('orders')
    const [viewStack, setViewStack] = React.useState<AppView[]>(['orders'])
    const [isCreatingExpenseInActivity, setIsCreatingExpenseInActivity] = React.useState(false)
    const [lastCompletedOrder, setLastCompletedOrder] = React.useState<OrderTab | null>(null)
    const [pendingPaymentOrder, setPendingPaymentOrder] = React.useState<OrderTab | null>(null)

    const { clearOrder } = useOrderStore()
    const { receiptConfig, logoImage, qrCodeImage, printerSettings, currency, taxRate, areTaxesEnabled, stripeBackendUrl, stripeLocationId } = useSettingsStore()
    const { currentUser } = useAuthStore()

    const isCashier = currentUser?.role === 'Cashier'

    React.useEffect(() => {
        // Multi-tap hack for fullscreen
        let tapCount = 0
        let lastTapTime = 0
        const handleTap = () => {
            if (isFrame) return

            const now = Date.now()
            if (now - lastTapTime < 500) {
                tapCount++
            } else {
                tapCount = 1
            }
            lastTapTime = now

            if (tapCount >= 6) {
                toggleFullscreen()
                tapCount = 0
            }
        }

        window.addEventListener('click', handleTap)

        return () => {
            window.removeEventListener('click', handleTap)
        }
    }, [isFrame])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message}`)
            })
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    const navigateTo = (view: AppView) => {
        setActiveView(view)
        setViewStack(prev => [...prev, view])
    }

    const goBack = () => {
        if (viewStack.length > 1) {
            const newStack = [...viewStack]
            newStack.pop() // remove current
            const prevView = newStack[newStack.length - 1]
            setViewStack(newStack)
            setActiveView(prevView)
        }
    }

    // Example user data
    const user = {
        name: 'Alex Morgan',
        role: 'Store Manager',
        initials: 'AM'
    }

    const navigationItems = [
        {
            label: 'Orders',
            href: 'orders',
            icon: ShoppingCart,
            isActive: activeView === 'orders'
        },
        // Expenses hidden for Cashiers
        ...(!isCashier ? [{
            label: 'Expenses',
            href: 'expenses',
            icon: ReceiptText,
            isActive: activeView === 'expenses'
        }] : []),
        {
            label: 'Activity',
            href: 'activity',
            icon: Activity,
            isActive: activeView === 'activity'
        },
        // Settings hidden for Cashiers
        ...(!isCashier ? [{
            label: 'Settings',
            href: 'settings',
            icon: Settings,
            isActive: activeView === 'settings'
        }] : []),
    ]

    const handleNavigate = (href: string) => {
        setActiveView(href as AppView)
        setViewStack([href as AppView]) // Reset stack when using main nav
    }

    // Effect to initialize hardware and subscribe to changes
    React.useEffect(() => {
        // Initialize Stripe Terminal with real Location ID (from dashboard)
        const initHardware = async () => {
            try {
                // Use configured values from settings store
                await hardwareService.setStripeBackendUrl(stripeBackendUrl || 'https://beatris-unhating-emmaline.ngrok-free.dev');
                await hardwareService.setStripeLocationId(stripeLocationId || 'tml_GXNjCAxtrU1n9x');

                console.log('✅ Hardware Service initialized with config:', {
                    url: stripeBackendUrl,
                    locationId: stripeLocationId
                });
            } catch (err) {
                console.error('❌ Failed to initialize Hardware Service:', err);
            }
        }

        initHardware()

        const unsubscribe = hardwareService.subscribe((devices) => {
            console.log('Hardware devices updated:', devices)
        })
        return () => { unsubscribe() }
    }, [])

    const handleOrderPayment = (order: OrderTab, paymentMethod: 'cash' | 'card' = 'card') => {
        if (paymentMethod === 'card') {
            // Navigate to full-screen payment terminal
            setPendingPaymentOrder(order)
            navigateTo('payment-terminal')
        } else {
            // Cash payment - immediate success
            setLastCompletedOrder(order)
            clearOrder(order.id)
            navigateTo('payment-success')
        }
    }

    const handlePaymentSuccess = () => {
        if (pendingPaymentOrder) {
            const orderToFinalize = pendingPaymentOrder;
            setLastCompletedOrder(orderToFinalize)
            clearOrder(orderToFinalize.id)
            setPendingPaymentOrder(null)
            navigateTo('payment-success')

            // Auto-print receipt after a short delay to ensure navigation is complete
            setTimeout(() => {
                handlePrintReceipt(orderToFinalize);
            }, 600);
        }
    }

    const handlePaymentCancel = () => {
        setPendingPaymentOrder(null)
        goBack()
    }

    const calculateTotal = (order: OrderTab | null) => {
        if (!order) return 0
        const subtotal = order.items.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0)
        const tax = areTaxesEnabled ? subtotal * taxRate : 0
        return subtotal + tax
    }

    const handlePrintReceipt = async (orderToPrint?: OrderTab) => {
        const order = orderToPrint || lastCompletedOrder;
        if (!order) {
            console.warn('No order available to print');
            return;
        }

        try {
            const subtotal = order.items.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0)
            const tax = areTaxesEnabled ? subtotal * taxRate : 0
            const total = subtotal + tax

            const receiptData = await receiptService.generateReceipt({
                storeName: receiptConfig.storeName || 'ComPOSt Store',
                storeAddress: receiptConfig.storeAddress || '',
                storePhone: receiptConfig.storePhone || '',
                orderId: order.label,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                cashierName: currentUser?.name || user.name,
                items: order.items.map(i => ({
                    name: i.name,
                    quantity: i.qty,
                    price: i.unitPrice
                })),
                subtotal,
                tax,
                taxRate,
                total,
            }, receiptConfig, logoImage || undefined, qrCodeImage || undefined, printerSettings.paperSize)


            if (printerSettings.connectedPrinterId) {
                const success = await hardwareService.printReceipt(printerSettings.connectedPrinterId, receiptData)
                if (success) {
                    console.log('Receipt printed successfully')
                } else {
                    console.error('Failed to print receipt')
                }
            } else {
                // Try RawBT fallback (Android)
                if (hardwareService.isRawBTAvailable()) {
                    console.log('No printer connected, attempting RawBT...')
                    const success = hardwareService.printViaRawBT(receiptData)
                    if (success) {
                        console.log('Odesláno do RawBT')
                    }
                }
            }
        } catch (error) {
            console.error('Error printing receipt:', error)
        }
    }

    const renderActiveView = () => {
        switch (activeView) {
            case 'orders':
                return (
                    <OrdersMain
                        onPayCash={(order) => handleOrderPayment(order, 'cash')}
                        onPayCard={(order) => handleOrderPayment(order, 'card')}
                        onAddOrder={() => console.log('Add Order clicked')}
                    />
                )
            case 'expenses':
                return (
                    <AuthGate section="expenses">
                        <TodaysExpenses />
                    </AuthGate>
                )
            case 'activity':
                return (
                    <AuthGate section="activity">
                        <div className="h-full w-full relative">
                            <ActivityPolymorphicView />
                            {isCreatingExpenseInActivity && (
                                <CreateExpense onClose={() => setIsCreatingExpenseInActivity(false)} />
                            )}
                        </div>
                    </AuthGate>
                )
            case 'settings':
                return (
                    <AuthGate section="settings">
                        <div className="flex flex-col h-full">
                            <div className="px-6 py-2 bg-muted/30 text-[10px] text-center font-mono opacity-50 uppercase tracking-widest">
                                Build: {hardwareService.getVersion()}
                            </div>
                            <SettingsRoot
                                user={{
                                    name: currentUser?.name || user.name,
                                    email: currentUser?.email || 'holodroid23@gmail.com',
                                    badgeText: currentUser?.role || (user.role === 'Store Manager' ? 'Admin' : 'Staff'),
                                    status: 'online'
                                }}
                                onPressDestination={(id) => {
                                    if (id === 'printer') navigateTo('settings-printer')
                                    if (id === 'general') navigateTo('settings-general')
                                    if (id === 'inventory') navigateTo('settings-inventory')
                                    if (id === 'users') navigateTo('settings-users')
                                    if (id === 'device-mode') navigateTo('settings-device-mode')
                                    if (id === 'receipt') navigateTo('settings-receipt')
                                    if (id === 'payment') navigateTo('settings-payment')
                                    if (id === 'expenses') navigateTo('settings-expenses')
                                    if (id === 'suggest-feature') navigateTo('settings-suggest-feature')
                                    if (id === 'report-bug') navigateTo('settings-report-bug')
                                }}
                                onPressProfile={() => navigateTo('settings-profile')}
                            />
                        </div>
                    </AuthGate>
                )
            case 'settings-printer':
                return <PrinterSettings onBack={goBack} />
            case 'settings-general':
                return <GeneralSettings onBack={goBack} />
            case 'settings-inventory':
                return <ItemManagement onBack={goBack} />
            case 'settings-users':
                return <UsersList onBack={goBack} />
            case 'settings-profile':
                return (
                    <UserProfile
                        user={{
                            fullName: user.name,
                            emailAddress: 'holodroid23@gmail.com',
                            roleTag: user.role === 'Store Manager' ? 'Admin' : 'Staff'
                        }}
                        onBack={goBack}
                    />
                )
            case 'settings-device-mode':
                return <DeviceMode onBack={goBack} />
            case 'settings-receipt':
                return <ReceiptConfiguration onBack={goBack} />
            case 'settings-payment':
                return <PaymentSettings onBack={goBack} />
            case 'settings-expenses':
                return <ExpenseManagement onBack={goBack} />
            case 'settings-suggest-feature':
                return <SuggestFeature onClose={goBack} />
            case 'settings-report-bug':
                return <ReportBug onClose={goBack} />
            case 'payment-success':
                return (
                    <PaymentSuccessAllMethods
                        amount={`${calculateTotal(lastCompletedOrder).toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`}
                        onClose={() => handleNavigate('orders')}
                        onStartNewOrder={() => handleNavigate('orders')}
                        onPrintReceipt={() => handlePrintReceipt()}
                    />
                )
            case 'payment-terminal':
                return (
                    <PaymentTerminalProcessing
                        amount={calculateTotal(pendingPaymentOrder)}
                        onSuccess={handlePaymentSuccess}
                        onCancel={handlePaymentCancel}
                    />
                )
            default:
                return <OrdersMain />
        }
    }


    const content = (
        <>
            <AppShell
                navigationItems={navigationItems}
                user={user}
                onNavigate={handleNavigate}
            >
                <div className="h-full w-full relative">
                    {renderActiveView()}
                </div>
            </AppShell>

            <DevTools />
        </>
    )

    if (!isFrame) {
        return (
            <div className="dark h-[100dvh] bg-background flex flex-col pt-[calc(env(safe-area-inset-top)_+_32px)]">
                <div className="flex-1 overflow-hidden relative">
                    {content}
                </div>
            </div>
        )
    }

    return (
        <div className="dark mx-auto w-full max-w-[420px] aspect-[9/19.5] border border-border bg-background shadow-2xl overflow-hidden relative flex flex-col pt-8">

            <div className="flex-1 overflow-hidden relative">
                {content}
            </div>
        </div>
    )
}
