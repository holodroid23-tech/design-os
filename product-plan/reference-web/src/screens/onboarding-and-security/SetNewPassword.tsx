import * as React from "react"
import { Eye, EyeOff, Lock, XIcon } from "lucide-react"

import { Button } from "../../components/ui/button"
import { IconTile, SystemIcon } from "../../components/ui/icon"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export const designOS = {
  presentation: "mobile" as const,
}

export interface SetNewPasswordProps {
  title?: string
  description?: string

  passwordLabel?: string
  passwordPlaceholder?: string
  defaultPassword?: string

  submitLabel?: string
  onSubmit?: (payload: { newPassword: string }) => void

  onPasswordChange?: (newPassword: string) => void

  onClose?: () => void
}

export default function SetNewPassword({
  title = "Set New Password",
  description = "Create a new password for your account.",
  passwordLabel = "New password",
  passwordPlaceholder = "••••••••",
  defaultPassword = "",
  submitLabel = "Update Password",
  onSubmit,
  onPasswordChange,
  onClose,
}: SetNewPasswordProps) {
  const [newPassword, setNewPassword] = React.useState(defaultPassword)
  const [isVisible, setIsVisible] = React.useState(false)

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
          <IconTile
            icon={Lock}
            size="large"
            variant="tile"
            tone="neutral"
          />

          <div className="flex flex-col gap-2">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        {/* Block 3: Password field */}
        <div className="mt-10 w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="set-new-password">{passwordLabel}</Label>
            <div className="relative">
              <Input
                id="set-new-password"
                type={isVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder={passwordPlaceholder}
                value={newPassword}
                className="pr-12"
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  onPasswordChange?.(e.target.value)
                }}
              />
              <Button
                type="button"
                variant="invisible"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                aria-label={isVisible ? "Hide password" : "Show password"}
                onClick={() => setIsVisible((v) => !v)}
              >
                <SystemIcon icon={isVisible ? EyeOff : Eye} aria-hidden="true" />
              </Button>
            </div>
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
            onClick={() => onSubmit?.({ newPassword })}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
      <div className="hidden">
        {/* Keep icons referenced for tree-shaking consistency */}
        <SystemIcon icon={Lock} aria-hidden="true" />
        <SystemIcon icon={Eye} aria-hidden="true" />
        <SystemIcon icon={EyeOff} aria-hidden="true" />
      </div>
    </div>
  )
}

