import * as React from "react"
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

export const designOS = {
  presentation: "page" as const,
}

export type WelcomeNextStepId = "set-admin-pin" | "add-inventory"

export interface WelcomeNextStep {
  id: WelcomeNextStepId
  title: string
  description: string
  onPress?: () => void
}

export interface WelcomeProps {
  title?: string
  body?: string

  stepsHeading?: string
  steps?: WelcomeNextStep[]

  ctaLabel?: string
  onCtaPress?: () => void

  footer?: string
}

export default function Welcome({
  title = "Welcome to comPOSt",
  body = "Thanks for choosing our POS system to power your daily grind. We're excited to help you serve the best coffee in town. Here is everything you need to get your shop running efficiently.",
  stepsHeading = "Your next steps",
  steps = [
    {
      id: "set-admin-pin",
      title: "Set Admin PIN",
      description: "Secure your access",
    },
    {
      id: "add-inventory",
      title: "Add Inventory",
      description: "Create your first product",
    },
  ],
  ctaLabel = "Launch App",
  onCtaPress,
  footer = "You received this email because you signed up for comPOSt POS.",
}: WelcomeProps) {
  const stepToIcon: Record<WelcomeNextStepId, React.ComponentType<React.SVGProps<SVGSVGElement>>> =
    {
      "set-admin-pin": Lock,
      "add-inventory": Package,
    }

  const stepToTone: Record<WelcomeNextStepId, "info" | "success"> = {
    "set-admin-pin": "info",
    "add-inventory": "success",
  }

  return (
    <div className="flex h-full min-h-full w-full bg-layer-level-0 p-6">
      <div className="mx-auto w-full max-w-[520px]">
        <EmailTemplate
          title={title}
          body={body}
          cta={{
            label: ctaLabel,
            onClick: onCtaPress,
            trailing: <ExternalLink className="size-4" aria-hidden="true" />,
          }}
          footer={footer}
        >
          <div className="text-left">
            <h2 className="text-regular-semibold text-foreground">{stepsHeading}</h2>
            <div className="mt-3 space-y-3">
              {steps.map((step) => (
                <SettingsGroup
                  key={step.id}
                  className="border-border-inverse"
                  separatorClassName="border-border-inverse"
                >
                  <SettingsItem element="div" interactive onPress={step.onPress}>
                    <SettingsItemIcon>
                      <IconTile
                        icon={stepToIcon[step.id]}
                        size="small"
                        variant="tile"
                        tone={stepToTone[step.id]}
                      />
                    </SettingsItemIcon>
                    <SettingsItemContent>
                      <SettingsItemTitle>{step.title}</SettingsItemTitle>
                      <SettingsItemDescription>{step.description}</SettingsItemDescription>
                    </SettingsItemContent>
                    <SettingsItemAction tone="muted">
                      <ChevronRight className="size-5" aria-hidden="true" />
                    </SettingsItemAction>
                  </SettingsItem>
                </SettingsGroup>
              ))}
            </div>
          </div>
        </EmailTemplate>
      </div>
    </div>
  )
}

