import * as React from "react"
import { Banknote, ChevronLeft, Link, Lock, MapPin, Receipt, Shield, Smartphone } from "lucide-react"

import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemDescription,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { IconTile } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { SectionTitle } from "@/components/ui/section-title"
import { Stepper } from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export const designOS = {
  presentation: "mobile" as const,
}

export default function PaymentSettings() {
  const [cashEnabled, setCashEnabled] = React.useState(true)
  const [externalTerminalEnabled, setExternalTerminalEnabled] = React.useState(false)
  const [tapToPayEnabled, setTapToPayEnabled] = React.useState(true)

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="sticky top-0 z-10 border-b bg-background px-6 py-4">
        <button type="button" className="group w-full text-left">
          <SectionTitle
            interactive
            titleAs="h2"
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
            }
          >
            Payment
          </SectionTitle>
        </button>
      </div>

      {/* Block 2: Payment methods */}
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4">
          <Label>Payment methods</Label>

          <SettingsGroup>
            <SettingsItem asChild>
              <div>
                <SettingsItemIcon>
                  <IconTile icon={Banknote} size="small" variant="plain" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Cash</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <Switch checked={cashEnabled} onCheckedChange={setCashEnabled} aria-label="Cash" />
                </SettingsItemAction>
              </div>
            </SettingsItem>

            <SettingsItem asChild>
              <div>
                <SettingsItemIcon>
                  <IconTile icon={Receipt} size="small" variant="plain" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>External terminal</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <Switch
                    checked={externalTerminalEnabled}
                    onCheckedChange={setExternalTerminalEnabled}
                    aria-label="External terminal"
                  />
                </SettingsItemAction>
              </div>
            </SettingsItem>

            <SettingsItem asChild>
              <div>
                <SettingsItemIcon>
                  <IconTile icon={Smartphone} size="small" variant="plain" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Tap to pay</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <Switch checked={tapToPayEnabled} onCheckedChange={setTapToPayEnabled} aria-label="Tap to pay" />
                </SettingsItemAction>
              </div>
            </SettingsItem>
          </SettingsGroup>
        </div>
      </div>

      {/* Block 3: Terminal configuration (intro) */}
      <div className="px-6 py-4">
        <div className="flex flex-col gap-3">
          <Label>Terminal configuration</Label>
          <SettingsItemDescription className="text-onLayer-primary">
            All following settings must be enabled to use Tap to Pay.
          </SettingsItemDescription>
          <Stepper value={0} max={4} variant="destructive" mode="segmented" />
        </div>
      </div>

      {/* Block 4: Terminal configuration (requirements) */}
      <div className="px-6 py-4">
        <SettingsGroup>
          <SettingsItem asChild>
            <div>
              <SettingsItemIcon>
                <IconTile icon={MapPin} size="small" variant="plain" tone="danger" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>GPS (System)</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction tone="default">
                <Button variant="ghost" size="sm">
                  Turn on GPS
                </Button>
              </SettingsItemAction>
            </div>
          </SettingsItem>

          <SettingsItem asChild>
            <div>
              <SettingsItemIcon>
                <IconTile icon={Lock} size="small" variant="plain" tone="danger" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>GPS (App access)</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction tone="default">
                <Button variant="ghost" size="sm">
                  Grant permission
                </Button>
              </SettingsItemAction>
            </div>
          </SettingsItem>

          <SettingsItem asChild>
            <div>
              <SettingsItemIcon>
                <IconTile icon={Shield} size="small" variant="plain" tone="danger" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <div className="flex flex-col gap-1">
                  <SettingsItemTitle>Device verification</SettingsItemTitle>
                  <SettingsItemDescription size="tiny" tone="danger" className="text-onLayer-danger">
                    Device integrity failed: rooted device detected
                  </SettingsItemDescription>
                </div>
              </SettingsItemContent>
              <SettingsItemAction tone="default">
                <Button variant="ghost" size="sm">
                  Verify
                </Button>
              </SettingsItemAction>
            </div>
          </SettingsItem>

          <SettingsItem asChild>
            <div>
              <SettingsItemIcon>
                <IconTile icon={Link} size="small" variant="plain" tone="danger" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Account link</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction tone="default">
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </SettingsItemAction>
            </div>
          </SettingsItem>
        </SettingsGroup>
      </div>
    </div>
  )
}

