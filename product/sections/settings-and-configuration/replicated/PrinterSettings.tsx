import { Printer, Search } from "lucide-react"

import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/ui/page-header"

export interface PrinterSettingsProps {
  onBack?: () => void
}

export default function PrinterSettings({ onBack }: PrinterSettingsProps) {
  return (
    <div className="flex h-full flex-col bg-background overflow-hidden">
      <PageHeader title="Printer" onBack={onBack} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Block 2: Printer status */}
        <div className="px-6 py-4">
          <div className="flex flex-col gap-4">
            <Label>Printer status</Label>

            <SettingsGroup>
              <SettingsItem element="div">
                <SettingsItemIcon>
                  <IconTile icon={Printer} size="medium" variant="tile" tone="success" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>mPOP Printer</SettingsItemTitle>
                  <SettingsItemDescription size="tiny" tone="success">
                    Connected
                  </SettingsItemDescription>
                </SettingsItemContent>
                <SettingsItemAction />
              </SettingsItem>

              <SettingsItem element="div">
                <SettingsItemContent>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Button type="button" variant="ghost" size="lg" className="w-full">
                        Test print
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button type="button" variant="destructive" size="lg" className="w-full">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </SettingsItemContent>
                <SettingsItemAction />
              </SettingsItem>
            </SettingsGroup>
          </div>
        </div>

        {/* Block 4: Hardware discovery */}
        <div className="px-6 py-4">
          <div className="flex flex-col gap-4">
            <Label>Hardware discovery</Label>

            <Button type="button" variant="ghost" size="lg" className="w-full justify-center">
              <SystemIcon icon={Search} />
              Search for printers
            </Button>

            <SettingsGroup>
              <SettingsItem element="div">
                <SettingsItemIcon>
                  <SystemIcon icon={Printer} />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>mPOP Printer</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction tone="default">
                  <Button type="button" variant="ghost" size="sm">
                    Pair
                  </Button>
                </SettingsItemAction>
              </SettingsItem>

              <SettingsItem element="div">
                <SettingsItemIcon>
                  <SystemIcon icon={Printer} />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>TM-T88VI Printer</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction tone="default">
                  <Button type="button" variant="ghost" size="sm">
                    Pair
                  </Button>
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

