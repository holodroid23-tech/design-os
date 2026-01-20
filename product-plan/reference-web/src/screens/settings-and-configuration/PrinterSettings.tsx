import { ChevronLeft, Printer, Search } from "lucide-react"

import { SettingsGroup } from "../../components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from "../../components/settings/settings-item"
import { Button } from "../../components/ui/button"
import { IconTile, SystemIcon } from "../../components/ui/icon"
import { Label } from "../../components/ui/label"
import { SectionTitle } from "../../components/ui/section-title"

export const designOS = {
  presentation: "mobile" as const,
}

export default function PrinterSettings() {
  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="sticky top-0 z-10 border-b bg-background px-6 py-4">
        <Button type="button" variant="invisible" className="group w-full h-auto p-0 justify-start text-left">
          <SectionTitle
            interactive
            titleAs="h2"
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
            }
          >
            Printer
          </SectionTitle>
        </Button>
      </div>

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
  )
}

