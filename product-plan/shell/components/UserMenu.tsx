import * as React from "react"
import { Shield, Lock, ChevronRight } from "lucide-react"
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "../../components/ui/avatar"
import {
  BottomMenu,
  BottomMenuContent,
  BottomMenuItem,
  BottomMenuTrigger,
  BottomMenuSeparator,
  BottomMenuSection
} from "../../components/ui/bottom-menu"

interface UserMenuProps {
  user: {
    name: string
    avatarUrl?: string
    role?: string
    initials?: string
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <BottomMenu open={isOpen} onOpenChange={setIsOpen}>
      <BottomMenuTrigger asChild>
        <button className="relative flex items-center justify-center rounded-full transition-transform active:scale-95 focus:outline-hidden">
          <Avatar variant="emerald" size="small">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.initials || user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </BottomMenuTrigger>
      <BottomMenuContent showHeader showCloseButton>
        <div className="flex items-center gap-4 px-2 py-4">
          <Avatar variant="emerald" size="medium">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.initials || user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-foreground">{user.name}</span>
            <span className="text-sm text-muted-foreground">{user.role || 'Staff'}</span>
          </div>
        </div>

        <BottomMenuSeparator />

        <BottomMenuSection title="Session Statistics">
          <div className="mx-2 mb-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-stone-100 p-3 dark:bg-stone-900">
              <span className="block text-xs text-muted-foreground uppercase tracking-wider">Total Sales</span>
              <span className="text-lg font-bold text-foreground">$1,240.50</span>
            </div>
            <div className="rounded-lg bg-stone-100 p-3 dark:bg-stone-900">
              <span className="block text-xs text-muted-foreground uppercase tracking-wider">Transactions</span>
              <span className="text-lg font-bold text-foreground">42</span>
            </div>
          </div>
        </BottomMenuSection>

        <BottomMenuSection title="Account Actions">
          <BottomMenuItem onClick={() => console.log('Change PIN')}>
            <Lock className="size-4 text-stone-500" />
            <span className="flex-1">Change Access PIN</span>
            <ChevronRight className="size-4 text-stone-300" />
          </BottomMenuItem>
          <BottomMenuItem onClick={() => console.log('Lock Screen')}>
            <Shield className="size-4 text-stone-500" />
            <span className="flex-1">Lock Terminal</span>
          </BottomMenuItem>
        </BottomMenuSection>
      </BottomMenuContent>
    </BottomMenu>
  )
}
