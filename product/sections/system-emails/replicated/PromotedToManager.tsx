import { Lock } from "lucide-react"

import { EmailTemplate } from "@/components/ui/email-template"

export const designOS = {
  presentation: "page" as const,
}

export interface PromotedToManagerProps {
  title?: string
  body?: string

  ctaLabel?: string
  onCtaPress?: () => void

  footer?: string
}

export default function PromotedToManager({
  title = "Promoted to manager",
  body = "You have been promoted to Manager. You can now access the Back Office dashboard remotely. Please set a password to enable this feature.",
  ctaLabel = "Set password",
  onCtaPress,
  footer = "You received this email because your account status was updated on comPOSt POS.",
}: PromotedToManagerProps) {
  return (
    <div className="flex h-full min-h-full w-full bg-layer-level-0 p-6">
      <div className="mx-auto w-full max-w-[520px]">
        <EmailTemplate
          title={title}
          body={body}
          cta={{
            label: ctaLabel,
            onClick: onCtaPress,
            trailing: <Lock className="size-4" aria-hidden="true" />,
          }}
          footer={footer}
        />
      </div>
    </div>
  )
}

