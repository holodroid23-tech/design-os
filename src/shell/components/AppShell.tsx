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
    <div className="flex h-full flex-col bg-background text-foreground overflow-hidden">
      {/* Content Area */}
      <main className="flex-1 pb-20 animate-fade-in relative overflow-hidden">
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
