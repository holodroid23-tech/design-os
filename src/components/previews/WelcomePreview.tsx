
import { ChevronRight, ExternalLink, Lock, Package } from "lucide-react"

import { IconTile } from "@/components/atoms/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { EmailTemplate } from "@/components/ui/email-template"

export default function WelcomePreview() {
  return (
    <div className="w-full h-full bg-background p-6">
      <EmailTemplate
        heroSrc="/mockups/WelcomePreview.png"
        heroAlt="Welcome hero"
        title="Welcome to comPOSt"
        body="Thanks for choosing our POS system. We're excited to help you manage your business more efficiently."
        cta={{
          label: "Launch App",
          trailing: <ExternalLink className="size-4" aria-hidden="true" />,
        }}
        footer="You received this email because you signed up for comPOSt POS."
      >
        <div className="text-left">
          <h2 className="text-regular-semibold text-foreground">Your next steps</h2>
          <div className="mt-3 space-y-3">
            <SettingsGroup className="border-border-inverse" separatorClassName="border-border-inverse">
              <SettingsItem element="div" interactive>
                <SettingsItemIcon>
                  <IconTile icon={Lock} size="small" variant="tile" tone="info" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Set Admin PIN</SettingsItemTitle>
                  <SettingsItemDescription>Secure your manager access</SettingsItemDescription>
                </SettingsItemContent>
                <SettingsItemAction tone="muted">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>

            <SettingsGroup className="border-border-inverse" separatorClassName="border-border-inverse">
              <SettingsItem element="div" interactive>
                <SettingsItemIcon>
                  <IconTile icon={Package} size="small" variant="tile" tone="success" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Add Inventory</SettingsItemTitle>
                  <SettingsItemDescription>Create your first product</SettingsItemDescription>
                </SettingsItemContent>
                <SettingsItemAction tone="muted">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          </div>
        </div>
      </EmailTemplate>
    </div>
  )
}
