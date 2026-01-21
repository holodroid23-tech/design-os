import * as React from "react"
import { ShoppingCart, ReceiptText, Activity, Settings } from "lucide-react"
import { AppShell } from "@/shell/components/AppShell"
import { hardwareService } from "@/lib/hardware-service"

// Replicated screens imports using the @product alias
import OrdersMain from "@product/sections/register-and-sales/replicated/OrdersMain"
import TodaysExpenses from "@product/sections/daily-expenses/replicated/TodaysExpenses"
import SettingsRoot from "@product/sections/settings-and-configuration/replicated/SettingsRoot"
import PaymentSuccessAllMethods from "@product/sections/register-and-sales/replicated/PaymentSuccessAllMethods"
import PrinterSettings from "@product/sections/settings-and-configuration/replicated/PrinterSettings"
import GeneralSettings from "@product/sections/settings-and-configuration/replicated/GeneralSettings"
import ItemManagement from "@product/sections/settings-and-configuration/replicated/ItemManagement"
import UserProfile from "@product/sections/settings-and-configuration/replicated/UserProfile"
import UsersList from "@product/sections/settings-and-configuration/replicated/UsersList"
import DeviceMode from "@product/sections/settings-and-configuration/replicated/DeviceMode"
import ReceiptConfiguration from "@product/sections/settings-and-configuration/replicated/ReceiptConfiguration"
import PaymentSettings from "@product/sections/settings-and-configuration/replicated/PaymentSettings"
import ExpenseManagement from "@product/sections/settings-and-configuration/replicated/ExpenseManagement"
import SuggestFeature from "@product/sections/settings-and-configuration/replicated/SuggestFeature"
import ReportBug from "@product/sections/settings-and-configuration/replicated/ReportBug"
import ActivityAndReportsManagerAdminView from "@product/sections/activity-and-reports/replicated/ActivityAndReportsManagerAdminView"
import CreateExpense from "@product/sections/daily-expenses/replicated/CreateExpense"

type AppView = 'orders' | 'expenses' | 'activity' | 'settings' | 'payment-success' |
    'settings-printer' | 'settings-general' | 'settings-inventory' | 'settings-users' | 'settings-profile' |
    'settings-device-mode' | 'settings-receipt' | 'settings-payment' | 'settings-expenses' |
    'settings-suggest-feature' | 'settings-report-bug'

export interface MobileAppProps {
    isFrame?: boolean
}

export default function MobileApp({ isFrame = true }: MobileAppProps) {
    const [activeView, setActiveView] = React.useState<AppView>('orders')
    const [viewStack, setViewStack] = React.useState<AppView[]>(['orders'])
    const [isCreatingExpenseInActivity, setIsCreatingExpenseInActivity] = React.useState(false)

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
        {
            label: 'Expenses',
            href: 'expenses',
            icon: ReceiptText,
            isActive: activeView === 'expenses'
        },
        {
            label: 'Activity',
            href: 'activity',
            icon: Activity,
            isActive: activeView === 'activity'
        },
        {
            label: 'Settings',
            href: 'settings',
            icon: Settings,
            isActive: activeView === 'settings'
        },
    ]

    const handleNavigate = (href: string) => {
        setActiveView(href as AppView)
        setViewStack([href as AppView]) // Reset stack when using main nav
    }

    // Effect to subscribe to hardware changes (example)
    React.useEffect(() => {
        const unsubscribe = hardwareService.subscribe((devices) => {
            console.log('Hardware devices updated:', devices)
        })
        return () => { unsubscribe() }
    }, [])

    const renderActiveView = () => {
        switch (activeView) {
            case 'orders':
                return (
                    <OrdersMain
                        onPayCash={() => navigateTo('payment-success')}
                        onPayCard={() => navigateTo('payment-success')}
                        onAddOrder={() => console.log('Add Order clicked')}
                    />
                )
            case 'expenses':
                return <TodaysExpenses />
            case 'activity':
                return (
                    <div className="h-full w-full relative">
                        <ActivityAndReportsManagerAdminView
                            onAddExpense={() => setIsCreatingExpenseInActivity(true)}
                        />
                        {isCreatingExpenseInActivity && (
                            <CreateExpense onClose={() => setIsCreatingExpenseInActivity(false)} />
                        )}
                    </div>
                )
            case 'settings':
                return (
                    <SettingsRoot
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
                return <UserProfile onBack={goBack} />
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
                        onClose={() => handleNavigate('orders')}
                        onStartNewOrder={() => handleNavigate('orders')}
                        onPrintReceipt={() => hardwareService.printReceipt('default', {})}
                    />
                )
            default:
                return <OrdersMain />
        }
    }

    const content = (
        <AppShell
            navigationItems={navigationItems}
            user={user}
            onNavigate={handleNavigate}
        >
            <div className="h-full w-full relative">
                {renderActiveView()}
            </div>
        </AppShell>
    )

    if (!isFrame) {
        return <div className="dark h-[100dvh] bg-background">{content}</div>
    }

    return (
        <div className="dark mx-auto w-full max-w-[420px] aspect-[9/19.5] border border-border bg-background shadow-2xl overflow-hidden relative flex flex-col">
            {content}
        </div>
    )
}
