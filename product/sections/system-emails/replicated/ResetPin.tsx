import { EmailTemplate } from "@/components/ui/email-template"

export const designOS = {
  presentation: "page" as const,
}

export interface ResetPinProps {
  title?: string
  body?: string

  ctaLabel?: string
  onCtaPress?: () => void

  note?: string
  footer?: string
}

export default function ResetPin({
  title = "Reset your PIN",
  body = "A PIN reset was requested for your account. To regain access to your POS terminal and secure your administrative settings, please follow the link below.",
  ctaLabel = "Reset my PIN",
  onCtaPress,
  note = "If you didn't request this, you can safely ignore this email.",
  footer = "You received this email because a security action was initiated for your comPOSt account.",
}: ResetPinProps) {
  return (
    <div className="flex h-full min-h-full w-full bg-layer-level-0 p-6">
      <div className="mx-auto w-full max-w-[520px]">
        <EmailTemplate
          title={title}
          body={body}
          cta={{
            label: ctaLabel,
            onClick: onCtaPress,
          }}
          belowCta={<p className="text-support-small">{note}</p>}
          footer={footer}
        />
      </div>
    </div>
  )
}

