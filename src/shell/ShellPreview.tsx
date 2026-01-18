import * as React from "react"
import { ShoppingCart, ReceiptText, Activity, Settings } from "lucide-react"
import { AppShell } from "./components/AppShell"

export default function ShellPreview() {
  const [activePath, setActivePath] = React.useState('/orders')

  const navigationItems = [
    { 
      label: 'Orders', 
      href: '/orders', 
      icon: ShoppingCart,
      isActive: activePath === '/orders' 
    },
    { 
      label: 'Expenses', 
      href: '/expenses', 
      icon: ReceiptText,
      isActive: activePath === '/expenses' 
    },
    { 
      label: 'Activity', 
      href: '/activity', 
      icon: Activity,
      isActive: activePath === '/activity' 
    },
    { 
      label: 'Settings', 
      href: '/settings', 
      icon: Settings,
      isActive: activePath === '/settings' 
    },
  ]

  const user = {
    name: 'Alex Morgan',
    role: 'Store Manager',
    avatarUrl: undefined,
    initials: 'AM'
  }

  const handleNavigate = (href: string) => {
    console.log('Navigate to:', href)
    setActivePath(href)
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={handleNavigate}
    >
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-900">
            {activePath === '/orders' && <ShoppingCart className="size-8 text-stone-400" />}
            {activePath === '/expenses' && <ReceiptText className="size-8 text-stone-400" />}
            {activePath === '/activity' && <Activity className="size-8 text-stone-400" />}
            {activePath === '/settings' && <Settings className="size-8 text-stone-400" />}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {navigationItems.find(i => i.href === activePath)?.label} Section
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            This is the content area for the {navigationItems.find(i => i.href === activePath)?.label.toLowerCase()} module. 
            The bottom navigation remains persistent for quick access between core POS functions.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => setActivePath('/orders')}
              className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Back to Register
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
