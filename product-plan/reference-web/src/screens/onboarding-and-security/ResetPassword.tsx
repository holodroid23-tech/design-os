import * as React from "react"
import { Lock, XIcon } from "lucide-react"

import { Button } from "../../components/ui/button"
import { IconTile, SystemIcon } from "../../components/ui/icon"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ResetPasswordProps {
  title?: string
  description?: string

  emailLabel?: string
  emailPlaceholder?: string
  defaultEmail?: string

  submitLabel?: string
  onSubmit?: (payload: { email: string }) => void

  onEmailChange?: (email: string) => void

  onClose?: () => void
}

export default function ResetPassword({
  title = "Reset password",
  description = "Enter your email address to receive password reset instructions.",
  emailLabel = "Email address",
  emailPlaceholder = "admin@coffeeshop.com",
  defaultEmail = "",
  submitLabel = "Send reset link",
  onSubmit,
  onEmailChange,
  onClose,
}: ResetPasswordProps) {
  const [email, setEmail] = React.useState(defaultEmail)
  const trimmedEmail = email.trim()

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Dismiss */}
      <div className="flex items-center justify-end px-4 pt-4">
        <Button
          type="button"
          variant="invisible"
          size="icon"
          aria-label="Close"
          onClick={onClose}
        >
          <SystemIcon icon={XIcon} aria-hidden="true" />
        </Button>
      </div>

      {/* Block 2: Primary message */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <IconTile icon={Lock} size="large" variant="tile" tone="neutral" />

          <div className="flex flex-col gap-2">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        {/* Block 3: Email field */}
        <div className="mt-10 w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="reset-password-email">{emailLabel}</Label>
            <Input
              id="reset-password-email"
              type="email"
              autoComplete="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                onEmailChange?.(e.target.value)
              }}
            />
          </div>
        </div>
      </div>

      {/* Block 4: Primary action */}
      <div className="px-6 pb-6">
        <div className="mx-auto w-full max-w-sm">
          <Button
            type="button"
            variant="default"
            size="lg"
            className="w-full"
            onClick={() => onSubmit?.({ email: trimmedEmail })}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
      <div className="hidden">
        {/* Keep icons referenced for tree-shaking consistency */}
        <SystemIcon icon={Lock} aria-hidden="true" />
      </div>
    </div>
  )
}

