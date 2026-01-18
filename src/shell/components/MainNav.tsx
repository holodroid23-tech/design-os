import * as React from "react"
import { cn } from "../../lib/utils"
import { UserMenu } from "./UserMenu"

export interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  isActive?: boolean
}

interface MainNavProps {
  navigationItems: NavItem[]
  user: {
    name: string
    avatarUrl?: string
    role?: string
    initials?: string
  }
  onNavigate?: (href: string) => void
}

export function MainNav({ 
  navigationItems, 
  user, 
  onNavigate, 
}: MainNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full items-center justify-around border-t border-white/5 bg-[#111114] px-4 pb-safe">
      {navigationItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-colors focus:outline-hidden",
              item.isActive 
                ? "text-white" 
                : "text-stone-400 hover:text-stone-200"
            )}
          >
            <div className={cn(
              "flex size-12 items-center justify-center rounded-xl transition-all duration-200",
              item.isActive 
                ? "bg-white/10 shadow-sm" 
                : "bg-transparent active:bg-white/5"
            )}>
              <Icon className={cn("size-6", item.isActive ? "stroke-[2.5]" : "stroke-[2]")} />
            </div>
            <span className={cn(
              "text-[10px] font-medium tracking-tight uppercase transition-all duration-200",
              item.isActive ? "opacity-100" : "opacity-70"
            )}>
              {item.label}
            </span>
          </button>
        )
      })}

      <div className="flex flex-1 flex-col items-center justify-center">
        <UserMenu user={user} />
      </div>
    </nav>
  )
}
