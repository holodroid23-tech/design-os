import * as React from "react"
import { Banknote, Link, Lock, MapPin, Receipt, Shield, Smartphone } from "lucide-react"

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
import { Stepper } from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { Switch } from "@/components/ui/switch"

export const designOS = {
  presentation: "mobile" as const,
}

export interface PaymentSettingsProps {
  onBack?: () => void
}

export default function PaymentSettings({ onBack }: PaymentSettingsProps) {
  /**
   * NOTE (design intent / export guidance)
   *
   * This screen is based on the mockup:
   * - Incomplete setup (`payment-settings.png`) -> 0/4 steps completed (red), actionable requirement buttons
   *
   * Product idea: keep ONE screen and switch the requirement "card" states after tap (for demo/preview).
   * For real implementation later (export target), model this as props/state (permissions, device checks, account link),
   * not hardcoded click logic.
   */
  const [cashEnabled, setCashEnabled] = React.useState(true)
  const [externalTerminalEnabled, setExternalTerminalEnabled] = React.useState(false)
  const [tapToPayEnabled, setTapToPayEnabled] = React.useState(true)

  type RequirementId = "gps-system" | "gps-app-access" | "device-verification" | "account-link"

  const [requirementsComplete, setRequirementsComplete] = React.useState<Record<RequirementId, boolean>>({
    "gps-system": false,
    "gps-app-access": false,
    "device-verification": false,
    "account-link": false,
  })

  const stepsCompleted = Object.values(requirementsComplete).filter(Boolean).length
  const allStepsComplete = stepsCompleted === 4

  const setRequirementComplete = (id: RequirementId, value: boolean) => {
    setRequirementsComplete((prev) => ({ ...prev, [id]: value }))
  }

  const toggleRequirement = (id: RequirementId) => {
    setRequirementsComplete((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex h-full min-h-full flex-col bg-background overflow-y-auto">
      <PageHeader title="Payment" onBack={onBack} />

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
          <SettingsItemDescription>
            All following settings must be enabled to use Tap to Pay.
          </SettingsItemDescription>
          <Stepper value={stepsCompleted} max={4} variant={allStepsComplete ? "success" : "destructive"} mode="segmented" />
        </div>
      </div>

      {/* Block 4: Terminal configuration (requirements) */}
      <div className="px-6 py-4">
        <SettingsGroup>
          <SettingsItem
            element="div"
            interactive
            onPress={() => toggleRequirement("gps-system")}
          >
            <SettingsItemIcon>
              <IconTile
                icon={MapPin}
                size="small"
                variant="plain"
                tone={requirementsComplete["gps-system"] ? "success" : "danger"}
              />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>GPS (System)</SettingsItemTitle>
            </SettingsItemContent>
            {!requirementsComplete["gps-system"] ? (
              <SettingsItemAction tone="default">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRequirementComplete("gps-system", true)
                  }}
                >
                  Turn on GPS
                </Button>
              </SettingsItemAction>
            ) : (
              <SettingsItemAction />
            )}
          </SettingsItem>

          <SettingsItem
            element="div"
            interactive
            onPress={() => toggleRequirement("gps-app-access")}
            className={requirementsComplete["gps-app-access"] ? "items-start" : undefined}
          >
            <SettingsItemIcon className={requirementsComplete["gps-app-access"] ? "pt-0.5" : undefined}>
              <IconTile
                icon={Lock}
                size="small"
                variant="plain"
                tone={requirementsComplete["gps-app-access"] ? "success" : "danger"}
              />
            </SettingsItemIcon>
            <SettingsItemContent>
              <div className="flex flex-col gap-1">
                <SettingsItemTitle>GPS (App access)</SettingsItemTitle>
                {requirementsComplete["gps-app-access"] ? (
                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                ) : null}
              </div>
            </SettingsItemContent>
            {!requirementsComplete["gps-app-access"] ? (
              <SettingsItemAction tone="default">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRequirementComplete("gps-app-access", true)
                  }}
                >
                  Grant permission
                </Button>
              </SettingsItemAction>
            ) : (
              <SettingsItemAction />
            )}
          </SettingsItem>

          <SettingsItem
            element="div"
            interactive
            onPress={() => toggleRequirement("device-verification")}
          >
            <SettingsItemIcon>
              <IconTile
                icon={Shield}
                size="small"
                variant="plain"
                tone={requirementsComplete["device-verification"] ? "success" : "danger"}
              />
            </SettingsItemIcon>
            <SettingsItemContent>
              <div className="flex flex-col gap-1">
                <SettingsItemTitle>Device verification</SettingsItemTitle>
                {!requirementsComplete["device-verification"] ? (
                  <SettingsItemDescription size="tiny" tone="danger" className="leading-snug">
                    Device integrity failed: rooted device detected
                  </SettingsItemDescription>
                ) : null}
              </div>
            </SettingsItemContent>
            {!requirementsComplete["device-verification"] ? (
              <SettingsItemAction tone="default">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRequirementComplete("device-verification", true)
                  }}
                >
                  Verify
                </Button>
              </SettingsItemAction>
            ) : (
              <SettingsItemAction />
            )}
          </SettingsItem>

          <SettingsItem
            element="div"
            interactive
            onPress={() => toggleRequirement("account-link")}
            className={requirementsComplete["account-link"] ? "items-start" : undefined}
          >
            <SettingsItemIcon className={requirementsComplete["account-link"] ? "pt-0.5" : undefined}>
              <IconTile
                icon={Link}
                size="small"
                variant="plain"
                tone={requirementsComplete["account-link"] ? "success" : "danger"}
              />
            </SettingsItemIcon>
            <SettingsItemContent className="min-w-0">
              <div className="flex flex-col gap-1">
                <SettingsItemTitle>Account link</SettingsItemTitle>
                {requirementsComplete["account-link"] ? (
                  <SettingsItemDescription size="tiny" tone="default" className="max-w-full truncate">
                    comPOSt Coffee LLC • acct_1G6x…
                  </SettingsItemDescription>
                ) : null}
                {requirementsComplete["account-link"] ? (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setRequirementComplete("account-link", false)
                      }}
                    >
                      Disconnect
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                ) : null}
              </div>
            </SettingsItemContent>
            {!requirementsComplete["account-link"] ? (
              <SettingsItemAction tone="default">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRequirementComplete("account-link", true)
                  }}
                >
                  Configure
                </Button>
              </SettingsItemAction>
            ) : (
              <SettingsItemAction />
            )}
          </SettingsItem>
        </SettingsGroup>
      </div>
    </div>
  )
}

