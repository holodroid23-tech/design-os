import { ChevronRight, Lock, Shield, User, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon } from "@/components/ui/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"

export const designOS = {
  presentation: "mobile" as const,
}

export interface PinResetRoleSelectionProps {
  onClose?: () => void
  onSelectCashier?: () => void
  onSelectAdminManager?: () => void
}

export default function PinResetRoleSelection({
  onClose,
  onSelectCashier,
  onSelectAdminManager,
}: PinResetRoleSelectionProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Dismiss */}
      <div className="flex items-center justify-end px-4 pt-4">
        <Button type="button" variant="invisible" size="icon" aria-label="Close" onClick={onClose}>
          <SystemIcon icon={XIcon} aria-hidden="true" />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
          <IconTile icon={Lock} size="large" variant="tile" tone="neutral" />

          <div className="flex flex-col gap-2">
            <h1>What is your role?</h1>
            <p>Select your role to proceed with PIN recovery.</p>
          </div>

          {/* Block 3: Role selection list */}
          <div className="w-full space-y-4 text-left">
            <SettingsGroup>
              <SettingsItem element="div" interactive onPress={onSelectCashier}>
                <SettingsItemIcon>
                  <IconTile icon={User} size="small" variant="tile" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>I am a Cashier</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <SystemIcon icon={ChevronRight} size="regular" aria-hidden="true" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>

            <SettingsGroup>
              <SettingsItem element="div" interactive onPress={onSelectAdminManager}>
                <SettingsItemIcon>
                  <IconTile icon={Shield} size="small" variant="tile" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>I am an Admin / Manager</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <SystemIcon icon={ChevronRight} size="regular" aria-hidden="true" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

