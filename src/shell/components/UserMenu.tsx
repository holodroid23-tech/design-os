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
  BottomMenuTrigger,
} from "../../components/ui/bottom-menu"
import { UserProfileRow } from "../../components/settings/user-profile-row"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { SettingsGroup } from "../../components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemIcon,
  SettingsItemContent,
  SettingsItemTitle,
  SettingsItemAction
} from "../../components/settings/settings-item"



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
        <button className="group relative flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 pl-1 pr-4 py-1.5 transition-all active:scale-95 focus:outline-hidden hover:bg-white/10 hover:border-white/20">
          <Avatar variant="emerald" size="small" online>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.initials || user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start leading-[1.1]">
            {user.name.split(' ').map((part, i) => (
              <span key={i} className="text-[9px] font-bold text-white tracking-wide uppercase">
                {part}
              </span>
            ))}
          </div>
        </button>
      </BottomMenuTrigger>
      <BottomMenuContent showHeader showCloseButton noPadding>
        <UserProfileRow
          name={user.name}
          email={user.role || 'Admin'}
          src={user.avatarUrl}
          status="online"
          className="bg-transparent hover:bg-muted/10 active:bg-muted/20"
        />

        <div className="px-5 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-transparent gap-3 py-4 shadow-none border-border/50">
              <CardHeader className="pb-2 px-0">
                <CardTitle className="text-base text-muted-foreground font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-0">
                <div className="text-xl font-semibold text-foreground">$1,240.50</div>
              </CardContent>
            </Card>
            <Card className="bg-transparent gap-3 py-4 shadow-none border-border/50">
              <CardHeader className="pb-2 px-0">
                <CardTitle className="text-base text-muted-foreground font-medium">Transactions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-0">
                <div className="text-xl font-semibold text-foreground">42</div>
              </CardContent>
            </Card>
          </div>

          <SettingsGroup className="bg-transparent border-none p-0 overflow-visible rounded-none">
            <SettingsItem className="px-0 py-4 hover:bg-transparent">
              <SettingsItemIcon>
                <Lock className="size-5 text-muted-foreground" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Change Access PIN</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight className="size-5 text-tertiary" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem className="px-0 py-4 border-t border-white/5 hover:bg-transparent">
              <SettingsItemIcon>
                <Shield className="size-5 text-muted-foreground" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Lock Terminal</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight className="size-5 text-tertiary" />
              </SettingsItemAction>
            </SettingsItem>
          </SettingsGroup>
        </div>
      </BottomMenuContent>



    </BottomMenu>
  )
}
