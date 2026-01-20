import * as React from "react"
import { MainNav, type NavItem } from "./MainNav"

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavItem[]
  user: {
    name: string
    avatarUrl?: string
    role?: string
    initials?: string
  }
  onNavigate?: (href: string) => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-stone-900 dark:bg-[#0a0a0a] dark:text-stone-50">
      {/* Content Area */}
      <main className="flex-1 pb-24 animate-fade-in">
        {children}
      </main>

      {/* Navigation Shell */}
      <MainNav
        navigationItems={navigationItems}
        user={user}
        onNavigate={onNavigate}
      />
    </div>
  )
}
