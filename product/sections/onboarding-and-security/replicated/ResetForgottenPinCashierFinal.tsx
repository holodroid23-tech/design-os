import { Info, User, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon } from "@/components/ui/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ResetForgottenPinCashierFinalProps {
  onExit?: () => void
  admins?: Array<{ name: string; onPress?: () => void }>
}

export default function ResetForgottenPinCashierFinal({
  onExit,
  admins = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Michael Scott" },
  ],
}: ResetForgottenPinCashierFinalProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Header dismiss control */}
      <div className="flex items-center justify-end px-6 pt-5">
        <Button
          type="button"
          variant="invisible"
          size="icon"
          aria-label="Close"
          onClick={onExit}
        >
          <SystemIcon icon={XIcon} aria-hidden="true" />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="flex w-full max-w-sm flex-col gap-10">
          {/* Block 2: Message block */}
          <div className="flex flex-col items-center text-center">
            <IconTile icon={Info} tone="info" size="large" variant="tile" />

            <div className="mt-6 flex flex-col gap-2">
              <h1>Contact your admin</h1>
              <p>
                To reset your PIN, please reach out to one of the following administrators:
              </p>
            </div>
          </div>

          {/* Block 3: Administrator list */}
          <div className="flex flex-col gap-4">
            {admins.map((admin) => (
              <SettingsGroup key={admin.name}>
                <SettingsItem element="div" onPress={admin.onPress} interactive={Boolean(admin.onPress)}>
                  <SettingsItemIcon>
                    <IconTile icon={User} tone="neutral" size="small" variant="tile" />
                  </SettingsItemIcon>
                  <SettingsItemContent>
                    <SettingsItemTitle>{admin.name}</SettingsItemTitle>
                  </SettingsItemContent>
                </SettingsItem>
              </SettingsGroup>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

