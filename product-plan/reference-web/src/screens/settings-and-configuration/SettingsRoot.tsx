import { IconTile } from "../../components/atoms/icon"
import { SettingsGroup } from "../../components/settings/settings-group"
import { SettingsFooter } from "../../components/settings/settings-footer"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "../../components/settings/settings-item"
import { UserProfileRow } from "../../components/settings/user-profile-row"
import { SectionTitle } from "../../components/ui/section-title"
import {
  Banknote,
  Bug,
  ChevronRight,
  Lightbulb,
  LogOut,
  Package,
  Printer,
  Receipt,
  Settings,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react"

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
  user = { name: "Ghhh", email: "holodroid23@gmail.com", badgeText: "Admin", status: "online" },
  onPressProfile,
  onPressDestination,
  onPressLogout,
  footerVersion = "ComPOSt",
  footerBuild = "89",
}: SettingsRootProps) {
  return (
    <div className="min-h-full w-full">
      <div className="flex flex-col gap-4 px-4 pt-4">
        {/* Block 1: Header */}
        <SectionTitle titleAs="h1">
          {title}
        </SectionTitle>
      </div>

      {/* Block 2: Profile destination */}
      <div className="px-4 pt-3">
        <SettingsGroup>
          <UserProfileRow
            type="button"
            name={user.name}
            email={user.email}
            showBadge={Boolean(user.badgeText)}
            badgeText={user.badgeText}
            status={user.status}
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
            <SettingsItem onPress={() => onPressDestination?.("general")}>
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

            <SettingsItem onPress={() => onPressDestination?.("users")}>
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

            <SettingsItem onPress={() => onPressDestination?.("payment")}>
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

            <SettingsItem onPress={() => onPressDestination?.("printer")}>
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

            <SettingsItem onPress={() => onPressDestination?.("receipt")}>
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

            <SettingsItem onPress={() => onPressDestination?.("device-mode")}>
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
        <SettingsFooter version={footerVersion} build={footerBuild} className="mt-6" />
      </div>
    </div>
  )
}

