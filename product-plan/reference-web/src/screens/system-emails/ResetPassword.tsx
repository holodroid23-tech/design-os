import { ExternalLink } from "lucide-react"

import { EmailTemplate } from "../../components/ui/email-template"

export const designOS = {
  presentation: "page" as const,
}

export interface ResetPasswordProps {
  title?: string
  body?: string

  ctaLabel?: string
  onCtaPress?: () => void

  note?: string
  footer?: string
}

export default function ResetPassword({
  title = "Reset your password",
  body = "You requested a password reset. Hopefully, this wasn't the pig. Click the button below to secure your account and get back to the chaos.",
  ctaLabel = "Reset password",
  onCtaPress,
  note = "If you didn't request this, just ignore it. Your account is still safe with us (mostly).",
  footer = "comPOSt POS",
}: ResetPasswordProps) {
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
          belowCta={<p className="text-support-small italic">{note}</p>}
          footer={footer}
        />
      </div>
    </div>
  )
}

