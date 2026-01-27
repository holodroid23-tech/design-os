import * as React from "react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemDescription,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SystemIcon } from "@/components/ui/icon"
import type { AvatarProps } from "@/components/ui/avatar"
import { ChevronRight, Plus } from "lucide-react"
import UsersAddUser from "./UsersAddUser"
import { FloatingActionButton } from "@/components/ui/floating-action-button"


export const designOS = {
  presentation: "mobile" as const,
}

export interface UsersListProps {
  title?: string
  onBack?: () => void
  users?: Array<{
    id: string
    name: string
    role: string
    avatarVariant?: AvatarProps["variant"]
  }>
  onPressUser?: (userId: string) => void
  pendingInvite?: {
    id: string
    name: string
    role: string
    avatarVariant?: AvatarProps["variant"]
    statusText?: string
    resendText?: string
  }
  onResendInvite?: (inviteId: string) => void
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
  return `${first}${last}`.toUpperCase()
}

const defaultUsers: UsersListProps["users"] = [
  { id: "sarah-jenkins", name: "Sarah Jenkins", role: "Administrator", avatarVariant: "purple" },
  { id: "mike-ross", name: "Mike Ross", role: "Manager", avatarVariant: "blue" },
  { id: "anna-lee", name: "Anna Lee", role: "Cashier", avatarVariant: "emerald" },
  { id: "john-doe", name: "John Doe", role: "Cashier", avatarVariant: "secondary" },
]

const defaultPendingInvite: UsersListProps["pendingInvite"] = {
  id: "david-smith",
  name: "David Smith",
  role: "Cashier",
  avatarVariant: "orange",
  statusText: "Pending",
  resendText: "Resend",
}

export default function UsersList({
  title = "Users",
  onBack,
  users = defaultUsers,
  onPressUser,
  pendingInvite = defaultPendingInvite,
  onResendInvite,
}: UsersListProps) {
  const [isAddingUser, setIsAddingUser] = React.useState(false)

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      <PageHeader title={title} onBack={onBack} />

      {/* Scroll area (Blocks 3-4 live here) */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Block 3: User rows */}
        <div className="flex flex-col gap-4">
          {users?.map((user) => (
            <SettingsGroup key={user.id}>
              <SettingsItem onPress={() => onPressUser?.(user.id)}>
                <SettingsItemIcon>
                  <Avatar size="medium" variant={user.avatarVariant}>
                    <AvatarFallback>{initialsFromName(user.name)}</AvatarFallback>
                  </Avatar>
                </SettingsItemIcon>

                <SettingsItemContent>
                  <SettingsItemTitle>{user.name}</SettingsItemTitle>
                  <SettingsItemDescription>{user.role}</SettingsItemDescription>
                </SettingsItemContent>

                <SettingsItemAction>
                  <SystemIcon icon={ChevronRight} aria-hidden="true" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          ))}

          {/* Block 4: Pending invitation row */}
          {pendingInvite && (
            <SettingsGroup>
              <SettingsItem element="div" interactive={false}>
                <SettingsItemIcon>
                  <Avatar size="medium" variant={pendingInvite.avatarVariant}>
                    <AvatarFallback>{initialsFromName(pendingInvite.name)}</AvatarFallback>
                  </Avatar>
                </SettingsItemIcon>

                <SettingsItemContent>
                  <SettingsItemTitle>{pendingInvite.name}</SettingsItemTitle>
                  <SettingsItemDescription>{pendingInvite.role}</SettingsItemDescription>
                </SettingsItemContent>

                <SettingsItemAction>
                  <Badge variant="warning">{pendingInvite.statusText ?? "Pending"}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onResendInvite?.(pendingInvite.id)}
                  >
                    {pendingInvite.resendText ?? "Resend"}
                  </Button>
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          )}
        </div>
      </div>

      <FloatingActionButton
        actions={[
          {
            label: "Add new user",
            icon: <Plus />,
            onClick: () => setIsAddingUser(true),
          },
        ]}
      />

      {isAddingUser && (
        <UsersAddUser onClose={() => setIsAddingUser(false)} />
      )}
    </div>
  )
}

