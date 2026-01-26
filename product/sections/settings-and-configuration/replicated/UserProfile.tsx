import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconTile } from "@/components/atoms/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { ChevronLeft, ChevronRight, KeyRound, LockKeyhole } from "lucide-react"

import { useAuthStore } from "@/stores/useAuthStore"
import SettingsSecurityAccesWithPinToEnterSection from "./SettingsSecurityAccesWithPinToEnterSection"

export interface UserProfileProps {
  title?: string
  onBack?: () => void
  user?: {
    fullName: string
    emailAddress: string
    roleTag?: string
  }
  onPressSecurityDestination?: (destinationId: "change-pin" | "change-password") => void
}

export default function UserProfile({
  title = "User profile",
  onBack,
  user: userProp,
  onPressSecurityDestination,
}: UserProfileProps) {
  const { currentUser, unlock } = useAuthStore()
  const [showPinVerify, setShowPinVerify] = React.useState(false)

  const handlePinChangeClick = () => {
    setShowPinVerify(true)
  }

  const user = userProp || {
    fullName: currentUser?.name || "Ghhh",
    emailAddress: currentUser?.email || "holodroid23@gmail.com",
    roleTag: currentUser?.role || "Admin"
  }

  return (
    <div className="flex h-full flex-col bg-background overflow-hidden">
      {/* Block 1: Header bar */}
      <div className="shrink-0 z-10 bg-background px-6 py-4 min-h-[100px] flex items-center border-b">
        <Button
          type="button"
          variant="invisible"
          className="group w-full h-auto p-0 justify-start text-left"
          onClick={onBack}
        >
          <SectionTitle
            interactive
            titleAs="h2"
            leading={
              <ChevronLeft
                aria-hidden="true"
                className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground"
              />
            }
          >
            {title}
          </SectionTitle>
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Block 2: Identity section */}
        <div className="px-6 py-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="fullName" className="text-muted-foreground">
                  Full name
                </Label>
                {user.roleTag ? <Badge variant="ghost" className="font-bold">{user.roleTag}</Badge> : null}
              </div>
              <Input id="fullName" type="text" variant="default" readOnly value={user.fullName} aria-readonly />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="emailAddress" className="text-muted-foreground">
                Email address
              </Label>
              <Input
                id="emailAddress"
                type="email"
                variant="default"
                readOnly
                value={user.emailAddress}
                aria-readonly
              />
            </div>
          </div>
        </div>

        {/* Block 3: Security navigation */}
        <div className="px-6 py-4">
          <div className="flex flex-col gap-3">
            <Label className="text-muted-foreground">Security</Label>
            <SettingsGroup>
              <SettingsItem onPress={handlePinChangeClick}>
                <SettingsItemIcon>
                  <IconTile icon={LockKeyhole} size="small" variant="tile" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Change PIN</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <ChevronRight aria-hidden="true" className="size-5" />
                </SettingsItemAction>
              </SettingsItem>

              <SettingsItem onPress={() => onPressSecurityDestination?.("change-password")}>
                <SettingsItemIcon>
                  <IconTile icon={KeyRound} size="small" variant="tile" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Change password</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <ChevronRight aria-hidden="true" className="size-5" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          </div>
        </div>
      </div>

      {/* Old PIN Verification Modal */}
      {showPinVerify && (
        <SettingsSecurityAccesWithPinToEnterSection
          onClose={() => setShowPinVerify(false)}
          onConfirmPin={(pin) => {
            if (unlock(pin).success) {
              setShowPinVerify(false)
              alert("Current PIN verified! Enabling PIN change...")
              onPressSecurityDestination?.("change-pin")
            } else {
              alert("Incorrect PIN")
            }
          }}
        />
      )}
    </div>
  )
}
