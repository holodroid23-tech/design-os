import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "@/components/ui/bottom-sliding-modal"
import type { ReactNode } from "react"
import {
  SettingsItem,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon } from "@/components/ui/icon"
import { SectionTitle } from "@/components/ui/section-title"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Shield, UserCheck, Users, XCircle, XIcon } from "lucide-react"

function CapabilityItem({ allowed, children }: { allowed: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      {allowed ? (
        <CheckCircle2 className="size-[18px] text-on-layer-success shrink-0" aria-hidden />
      ) : (
        <XCircle className="size-[18px] text-on-layer-danger shrink-0" aria-hidden />
      )}
      <span className="text-sm text-foreground leading-5">{children}</span>
    </div>
  )
}

export const designOS = {
  presentation: "mobile" as const,
}

export default function UsersCreateRoleBreakdown() {
  return (
    <BottomSlidingModal defaultOpen>
      <BottomSlidingModalContent
        header={
          <div className="flex flex-col gap-4">
            {/* Block 2: Header row */}
            <SectionTitle
              titleAs="h2"
              trailing={
                <BottomSlidingModalClose asChild>
                  <Button variant="invisible" size="icon" aria-label="Close">
                    <SystemIcon icon={XIcon} />
                  </Button>
                </BottomSlidingModalClose>
              }
            >
              User roles
            </SectionTitle>
          </div>
        }
      >
        {/* Block 3: Role summaries */}
        <div className="pb-5">
          <SettingsItem element="div">
            <SettingsItemIcon>
              <IconTile icon={Shield} size="medium" variant="tile" tone="recent" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Administrator</SettingsItemTitle>
              <SettingsItemDescription>God mode. Full system access.</SettingsItemDescription>
            </SettingsItemContent>
          </SettingsItem>

          <Separator />

          <SettingsItem element="div">
            <SettingsItemIcon>
              <IconTile icon={Users} size="medium" variant="tile" tone="info" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Manager</SettingsItemTitle>
              <SettingsItemDescription>Daily operations focus.</SettingsItemDescription>
            </SettingsItemContent>
          </SettingsItem>

          {/* Block 4: Capability breakdown cards */}
          <div className="px-5 pt-3">
            <div className="rounded-[18px] border border-border bg-background p-5 space-y-3">
              <CapabilityItem allowed>Update inventory levels & stock alerts</CapabilityItem>
              <CapabilityItem allowed>View operational performance dashboards</CapabilityItem>
              <CapabilityItem allowed>Full access to back office</CapabilityItem>
              <CapabilityItem allowed>Refund yesterday and older orders</CapabilityItem>
              <CapabilityItem allowed>Edit and delete yesterday and older expenses</CapabilityItem>
              <CapabilityItem allowed>Access settings</CapabilityItem>
              <CapabilityItem allowed={false}>
                Restricted from payment, user settings, and account deletion
              </CapabilityItem>
            </div>
          </div>

          <Separator className="mt-5" />

          <SettingsItem element="div">
            <SettingsItemIcon>
              <IconTile icon={UserCheck} size="medium" variant="tile" tone="success" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Cashier</SettingsItemTitle>
              <SettingsItemDescription>
                Register focus. Strictly for processing sales.
              </SettingsItemDescription>
            </SettingsItemContent>
          </SettingsItem>

          {/* Block 4: Capability breakdown cards */}
          <div className="px-5 pt-3">
            <div className="rounded-[18px] border border-border bg-background p-5 space-y-3">
              <CapabilityItem allowed>Refund and edit today's expenses</CapabilityItem>
              <CapabilityItem allowed={false}>No access to back office</CapabilityItem>
              <CapabilityItem allowed={false}>
                Cannot edit or delete yesterday and older expenses
              </CapabilityItem>
              <CapabilityItem allowed={false}>Cannot refund yesterday and older orders</CapabilityItem>
            </div>
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

