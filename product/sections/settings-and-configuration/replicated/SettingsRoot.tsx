import * as React from "react"
import { IconTile } from "@/components/atoms/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import { SettingsFooter } from "@/components/settings/settings-footer"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { UserProfileRow } from "@/components/settings/user-profile-row"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { Badge } from "@/components/ui/badge"
import {
  Banknote,
  Bug,
  ChevronRight,
  Lightbulb,
  LogOut,
  Music,
  Package,
  Printer,
  Receipt,
  Settings,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useAuthStore } from "@/stores/useAuthStore"
import { useSettingsStore } from "@/stores/useSettingsStore"
import ManagerUsersSecurityRestriction from "./ManagerUsersSecurityRestriction"
import PaymentModificationPinRequest from "./PaymentModificationPinRequest"

export const designOS = {
  presentation: "mobile" as const,
}

export interface SettingsRootProps {
  /**
   * Optional override for the page title.
   */
  title?: string

  /**
   * User identity shown in the profile destination row.
   */
  user?: {
    name: string
    email: string
    badgeText?: string
    status?: "online" | "offline" | "away"
  }

  /**
   * Called when the profile row is pressed.
   */
  onPressProfile?: () => void

  /**
   * Called when a destination row is pressed.
   */
  onPressDestination?: (destinationId: string) => void

  /**
   * Called when the user presses "Log out".
   */
  onPressLogout?: () => void

  /**
   * Footer version text, e.g. "Version 2.4.1".
   */
  footerVersion?: string

  /**
   * Footer build number, e.g. "89".
   */
  footerBuild?: string
}

export default function SettingsRoot({
  title = "Settings",
  user: userProp,
  onPressProfile,
  onPressDestination,
  onPressLogout,
  footerVersion = "ComPOSt",
  footerBuild = "89",
}: SettingsRootProps) {
  const { currentUser, verifyAdminAction } = useAuthStore()
  const {
    useSimulatedTapToPay,
    setSimulatedTapToPay,
    stripeBackendUrl,
    setStripeBackendUrl,
    stripeLocationId,
    setStripeLocationId,
    isBeatMachineUnlocked,
    setBeatMachineUnlocked
  } = useSettingsStore()

  const [tapCount, setTapCount] = React.useState(0)

  const [showUsersSecurity, setShowUsersSecurity] = React.useState(false)
  const [showPaymentSecurity, setShowPaymentSecurity] = React.useState(false)

  const isManager = currentUser?.role === 'Manager'

  const handleDestinationPress = (id: string) => {
    if (id === 'users' && isManager) {
      setShowUsersSecurity(true)
      return
    }
    if (id === 'payment' && isManager) {
      setShowPaymentSecurity(true)
      return
    }
    onPressDestination?.(id)
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <PageHeader title={title} sticky={false} />

      {/* Block 2: Profile destination */}
      <div className="px-4 pt-3">
        <SettingsGroup>
          <UserProfileRow
            type="button"
            name={userProp?.name || currentUser?.name || "User"}
            email={userProp?.email || currentUser?.email || ""}
            showBadge={true}
            badgeText={currentUser?.role || "User"}
            status="online"
            onClick={onPressProfile}
          />
        </SettingsGroup>
      </div>

      {/* Block 3: Settings destinations */}
      <div className="px-4 pt-4">
        <div className="flex flex-col gap-4">
          <SettingsGroup>
            <SettingsItem onPress={() => onPressDestination?.("inventory")}>
              <SettingsItemIcon>
                <IconTile icon={Package} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Inventory</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => onPressDestination?.("expenses")}>
              <SettingsItemIcon>
                <IconTile icon={Wallet} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Expenses</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>
          </SettingsGroup>

          <SettingsGroup>
            <SettingsItem onPress={() => handleDestinationPress("general")}>
              <SettingsItemIcon>
                <IconTile icon={Settings} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>General</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => handleDestinationPress("users")}>
              <SettingsItemIcon>
                <IconTile icon={Users} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Users</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => handleDestinationPress("payment")}>
              <SettingsItemIcon>
                <IconTile icon={Banknote} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Payment</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => handleDestinationPress("printer")}>
              <SettingsItemIcon>
                <IconTile icon={Printer} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Printer</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => handleDestinationPress("receipt")}>
              <SettingsItemIcon>
                <IconTile icon={Receipt} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Receipt</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => handleDestinationPress("device-mode")}>
              <SettingsItemIcon>
                <IconTile icon={Smartphone} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Device mode</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>
          </SettingsGroup>

          {isBeatMachineUnlocked && (
            <SettingsGroup className="border-primary/20 bg-primary/5">
              <SettingsItem onPress={() => handleDestinationPress("beat-machine")}>
                <SettingsItemIcon>
                  <IconTile icon={Music} size="small" variant="tile" tone="info" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle className="text-primary font-bold">Beat Machine</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <Badge variant="default" className="bg-primary text-primary-foreground text-[10px] leading-none px-1.5 h-4">NEW</Badge>
                  <ChevronRight aria-hidden className="size-5 text-primary" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          )}

          <SettingsGroup>
            <SettingsItem onPress={() => onPressDestination?.("suggest-feature")}>
              <SettingsItemIcon>
                <IconTile icon={Lightbulb} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Suggest feature</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem onPress={() => onPressDestination?.("report-bug")}>
              <SettingsItemIcon>
                <IconTile icon={Bug} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Report bug</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronRight aria-hidden className="size-5" />
              </SettingsItemAction>
            </SettingsItem>
          </SettingsGroup>

          <SettingsGroup>
            <div className="px-4 py-2">
              <SectionTitle size="group" className="mb-2">Developer</SectionTitle>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Simulated Tap to Pay</span>
                    <span className="text-xs text-muted-foreground">Mock backend & NFC</span>
                  </div>
                  <Switch
                    checked={useSimulatedTapToPay}
                    onCheckedChange={setSimulatedTapToPay}
                  />
                </div>

                {!useSimulatedTapToPay && (
                  <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Stripe Backend URL</span>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={stripeBackendUrl}
                        onChange={(e) => setStripeBackendUrl(e.target.value)}
                        placeholder="https://...ngrok-free.app"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Location ID</span>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={stripeLocationId}
                        onChange={(e) => setStripeLocationId(e.target.value)}
                        placeholder="tml_..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SettingsGroup>
        </div>
      </div>

      {/* Block 4: Session action */}
      <div className="px-4 pt-4">
        <SettingsGroup>
          <SettingsItem onPress={onPressLogout}>
            <SettingsItemIcon>
              <IconTile icon={LogOut} size="small" variant="tile" tone="danger" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle variant="destructive">Log out</SettingsItemTitle>
            </SettingsItemContent>
            <SettingsItemAction>
              <ChevronRight aria-hidden className="size-5" />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>
      </div>

      {/* Block 5: Footer meta */}
      <div className="px-4">
        <SettingsFooter
          version={footerVersion}
          build={footerBuild}
          className="mt-6"
          onClick={() => {
            if (isBeatMachineUnlocked) return
            const newCount = tapCount + 1
            if (newCount >= 10) {
              setBeatMachineUnlocked(true)
              alert("Beat Machine Unlocked! 🎹")
            } else {
              setTapCount(newCount)
            }
          }}
        />
      </div>

      {/* Action Gating Modals for Manager */}
      {showUsersSecurity && (
        <ManagerUsersSecurityRestriction
          onClose={() => setShowUsersSecurity(false)}
          onConfirmPin={(pin) => {
            if (verifyAdminAction(pin)) {
              setShowUsersSecurity(false)
              onPressDestination?.("users")
            } else {
              alert("Invalid Admin PIN")
            }
          }}
        />
      )}

      {showPaymentSecurity && (
        <PaymentModificationPinRequest
          onClose={() => setShowPaymentSecurity(false)}
          onConfirmPin={(pin) => {
            if (verifyAdminAction(pin)) {
              setShowPaymentSecurity(false)
              onPressDestination?.("payment")
            } else {
              alert("Invalid Admin PIN")
            }
          }}
        />
      )}
    </div>
  )
}
