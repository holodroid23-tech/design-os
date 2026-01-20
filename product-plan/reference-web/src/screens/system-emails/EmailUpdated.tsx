import { ExternalLink } from "lucide-react"

import { EmailTemplate } from "../../components/ui/email-template"

export const designOS = {
  presentation: "page" as const,
}

export interface EmailUpdatedProps {
  title?: string
  body?: string

  ctaLabel?: string
  onCtaPress?: () => void

  footer?: string
}

export default function EmailUpdated({
  title = "Email updated",
  body = "Your login email for comPOSt has been updated to this address. Your password remains the same.",
  ctaLabel = "Launch app",
  onCtaPress,
  footer = "You received this email because your account information was updated on comPOSt POS.",
}: EmailUpdatedProps) {
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
        />
      </div>
    </div>
  )
}

